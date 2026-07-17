# Diseño: Feature Notes

**Fecha**: 2026-07-16
**Historia de usuario**: [US-002 — Gestión de notas de texto libre](../../specs/user-stories/US-002-gestion-notas-texto-libre/README.md) (`Estado: Ready`)
**Casos de prueba**: [US-002/test-cases/](../../specs/user-stories/US-002-gestion-notas-texto-libre/test-cases/) (TC-001 a TC-017, ya definidos)

## Contexto

El proyecto (`exercise-todo`, Next.js 16 App Router + React 19 + TypeScript + Zustand + Base UI + Tailwind CSS 4) tiene hoy una única feature, `tasks` (To-do), montada directamente en `src/app/page.tsx` sin navegación compartida. US-002 pide agregar una sección **Notes** (notas de texto libre, CRUD completo) accesible junto a To-do desde una navegación principal de dos opciones.

Este diseño reutiliza al máximo los patrones ya validados en `src/features/tasks/` (estructura de carpetas, store con Zustand `persist`, saneamiento ante `localStorage` corrupto, componentes con Base UI + Tailwind, testing co-localizado) para mantener consistencia arquitectónica, y añade lo mínimo nuevo que exige tener dos secciones: rutas separadas y una navegación compartida.

## Arquitectura

### Rutas (App Router, ADR-007)

- `src/app/todo/page.tsx` — nueva ruta; contiene lo que hoy vive en `src/app/page.tsx` (`<TasksView />` dentro del `<main>` actual).
- `src/app/notes/page.tsx` — nueva ruta; renderiza `<NotesView />`.
- `src/app/page.tsx` — pasa a ser un Server Component que ejecuta `redirect('/todo')` (`next/navigation`). To-do sigue siendo la sección por defecto al abrir la app.

### Navegación compartida

- `src/shared/components/main-nav.tsx` (código transversal → `src/shared/`, no específico de una feature, según ADR-001).
  - Client Component (`"use client"`), usa `usePathname()` de `next/navigation` para resaltar la opción activa.
  - Dos enlaces (`next/link`): "To-do" → `/todo`, "Notes" → `/notes`.
  - `data-testid="main-nav"`, `data-testid="nav-link-todo"`, `data-testid="nav-link-notes"`.
- Se monta en `src/app/layout.tsx`, antes de `{children}`, para aparecer en ambas rutas sin duplicar código.

### Nueva feature `src/features/notes/`

Calcada 1:1 de la estructura de `src/features/tasks/`:

```
src/features/notes/
├── index.ts                          # barrel — único punto de entrada público
├── types.ts                          # tipo Note
├── store.ts (+ store.test.ts)        # Zustand + persist + saneamiento
├── hooks/
│   └── use-notes-hydrated.ts         # evita mismatch SSR/CSR (calco de use-tasks-hydrated.ts)
└── components/
    ├── notes-view.tsx (+ .test.tsx)  # shell: NoteList + Dialog + NoteForm
    ├── note-list.tsx                 # listado + estado vacío
    ├── note-item.tsx                 # preview truncado + Editar/Eliminar
    └── note-form.tsx                 # textarea + Guardar (crear/editar)
```

Respeta la regla de `dependency-cruiser` (`no-cross-feature-imports`): `notes` no importa nada interno de `tasks` ni viceversa; si en el futuro hiciera falta, solo a través del barrel (`@/features/tasks`).

## Modelo de datos y store

```ts
interface Note {
  id: string;
  content: string; // texto libre; PUEDE ser cadena vacía (BR-03 / AC-011)
  createdAt: number;
  updatedAt: number;
}
```

Decisiones:

- **Sin `validation.ts`**: a diferencia de `tasks`, no hay reglas de validación de contenido (AC-011 prohíbe exigir contenido mínimo), así que no aplica ese módulo.
- **Sin trim automático**: el contenido se persiste tal cual lo escribió el usuario (incluye saltos de línea y espacios), para no alterar texto libre multilínea.
- **Store** (`store.ts`), calco del patrón de `tasks/store.ts`:
  ```ts
  interface NotesState {
    notes: Note[];
    addNote: (content: string) => Note;
    updateNote: (id: string, content: string) => boolean;
    deleteNote: (id: string) => void;
  }
  ```
  - Zustand `create` + middleware `persist`, `createJSONStorage` con wrapper `safeLocalStorage` (envuelve `getItem`/`setItem`/`removeItem` en `try/catch`, tolera `localStorage` no disponible o con cuota excedida).
  - Clave versionada: `NOTES_STORAGE_KEY = "notes:v1"`.
  - `partialize` limita lo persistido a `{ notes }`.
  - `merge` reconstruye el estado con `sanitizeNotes(persisted?.notes)`: descarta entradas con shape inválido (id no-string, `content` no-string, `createdAt`/`updatedAt` no numéricos) sin romper la app — cubre AC-010/TC-014 (localStorage corrupto).
  - `addNote`/`updateNote` fijan `updatedAt = Date.now()` (y `createdAt = Date.now()` en `addNote`).
- **Orden**: selector `selectRecentNotes(state)` — ordena por `updatedAt` descendente. Crear o editar una nota la sube al tope del listado (AC-008/AC-012).

## Componentes

- **`NotesView`**: shell con estado de UI local (`useState<DialogMode>`, igual que `TasksView`), usa `useNotesHydrated()` para mostrar "Cargando…" antes de leer `localStorage`.
- **`NoteList`**: renderiza `NoteItem` por cada nota (ya ordenadas por el selector); si no hay notas, estado vacío con `data-testid="empty-notes"` y mensaje "No tienes notas registradas todavía".
- **`NoteItem`**: muestra el contenido truncado a ~120 caracteres con `…` si excede; si `content === ""`, muestra un placeholder "Nota vacía". Botones "Editar" y "Eliminar" (`Eliminar` borra directo, sin confirmación — mismo patrón que `TaskItem`, sin modal de confirmación).
- **`NoteForm`**: un único `<textarea>` (sin validación, sin límite de longitud) + botón "Guardar"; recibe `note?: Note` opcional para distinguir crear/editar (mismo patrón que `TaskForm`).
- Dialog de creación/edición con Base UI (`@base-ui/react/dialog`), mismo patrón `Root/Trigger/Portal/Positioner/Popup` que `tasks-view.tsx`. No se usan `Select` ni `Checkbox` (no aplican a Notes).
- `data-testid`s: `note-item`, `note-dialog`, `empty-notes`, `note-content-textarea`, `note-save-button`.
- Estilado 100% Tailwind inline (utilidades, sin CSS aparte), soporte `dark:` en todos los elementos visibles, consistente con ADR-008/ADR-009.

## Manejo de errores

- `localStorage` no disponible (modo privado) o con cuota excedida: `safeLocalStorage` ignora el error de escritura/lectura sin romper la app (igual que en `tasks`).
- `localStorage` con JSON corrupto: `sanitizeNotes` descarta el contenido no parseable/inválido en `merge`, el store cae a `[]` sin lanzar excepción (TC-014).
- No hay otros escenarios de error: al no existir reglas de validación de contenido, no hay estados de error de formulario que manejar en `NoteForm`.

## Testing

- **Unit (Vitest + Testing Library)**, co-localizados junto al código, patrón AAA, cobertura mínima 80% (líneas/funciones/branches/statements, mismo umbral que `tasks`):
  - `store.test.ts`: `addNote`/`updateNote`/`deleteNote`, orden por `updatedAt`, `sanitizeNote`/`sanitizeNotes`, persistencia real y rehidratación, JSON corrupto.
  - `notes-view.test.tsx`: integración (render + `userEvent`), crear/editar/eliminar una nota, reflejo inmediato en el listado, sin mocks de Base UI.
  - Test breve para `MainNav`: ambas opciones (To-do, Notes) se renderizan y navegan a la ruta correcta (cubre AC-001).
- **E2E (Playwright)**: `e2e/notes.spec.ts`, reutilizando como base los 17 `TC-XXX` ya definidos en `docs/specs/user-stories/US-002-gestion-notas-texto-libre/test-cases/` (no se re-derivan criterios, solo se traducen a specs de Playwright referenciando `US-002`/`TC-XXX` en el nombre del test, igual que `e2e/tasks.spec.ts` referencia `US-001`). Se agrega además un caso e2e breve para el redirect `/` → `/todo`.
- `npm run arch:check` (dependency-cruiser) y `npm run router:check` deben seguir pasando sin cambios de configuración — la nueva feature y las nuevas rutas ya cumplen las reglas existentes.

## Fuera de alcance de este diseño

Hereda el "Fuera de alcance" de US-002: sin formato enriquecido, sin búsqueda/filtrado/etiquetas, sin autenticación, sin backend/sincronización remota, sin compartir notas entre dispositivos.
