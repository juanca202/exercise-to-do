## Context

`src/features/home` es hoy el único módulo bajo `src/features/`, y sigue mostrando el scaffold por defecto de `create-next-app`. No existe ninguna feature de tareas activa. Los únicos restos relacionados con tareas son `src/shared/stores/task-store.ts` (modelo `Task { id, title, completed }`, sin `description`, `dueDate` ni `priority`) y `src/shared/ui/checkbox.tsx`; ninguno tiene consumidores, y la auditoría `docs/adr/audits/audit-2026-07-07.md` ya los señaló como incumplimiento de ADR-005 ("código en `shared` sin ninguna feature consumidora"). Este cambio los reemplaza en lugar de extenderlos, porque el modelo actual no cubre los campos obligatorios del negocio.

El proyecto tuvo un intento previo de esta misma funcionalidad (historias `US-001/002/003`, luego consolidadas en `US-001-gestion-completa-tareas` con 21 casos de prueba, y un `openspec change` homónimo) que fue creado y eliminado intencionalmente el mismo día como reinicio limpio. Ese historial (recuperable con `git show 39073ee` / `git show 603662c`) es una referencia útil de casos límite ya identificados, pero no vinculante.

Restricciones vigentes (ADRs `Accepted`): App Router exclusivo (ADR-001), Tailwind (ADR-002), Base UI (ADR-003), Zustand (ADR-004), arquitectura feature-based (ADR-005), TSDoc (ADR-006), Vitest + Testing Library con cobertura mínima 80% (ADR-007), quality gate de Husky (ADR-009).

## Goals / Non-Goals

**Goals:**
- Definir el modelo de datos de `Task` y dónde vive dentro de `src/features/tasks/`.
- Definir la estrategia de ordenamiento (prioridad + desempate + agrupación de completadas) como una función pura y testeable, separada del store.
- Definir la estrategia de persistencia en `localStorage`, incluyendo el manejo de datos corruptos.
- Definir la UX de alto nivel: listado, formulario/modal de alta y edición, y confirmación de eliminación.
- Dejar `src/shared/` conforme a ADR-005 (sin código sin consumidor).

**Non-Goals:**
- Sincronización multi-dispositivo o backend (fuera de alcance: no hay servidor).
- Autenticación o multiusuario.
- Filtros, búsqueda, etiquetas o subtareas (no pedidos en el alcance actual).
- Reordenamiento manual/drag-and-drop (el orden es siempre derivado de prioridad + fecha de creación).

## Decisions

### Modelo de datos
```ts
type Priority = "alta" | "media" | "baja";

interface Task {
  id: string;
  description: string;   // obligatoria, no vacía tras trim
  dueDate: string;        // ISO date (YYYY-MM-DD), obligatoria
  priority: Priority;
  completed: boolean;
  createdAt: number;      // epoch ms, usado solo para el desempate FIFO
}
```
`createdAt` es un campo interno (no editable por el usuario) que existe únicamente para resolver empates de orden dentro del mismo nivel de prioridad de forma determinística, incluso si dos tareas se crean en el mismo instante lógico de UI.

### Ubicación en `src/features/tasks/`
- `stores/task-store.ts`: store Zustand (`useTaskStore`) con las acciones `addTask`, `updateTask`, `removeTask`, `toggleCompleted`, y el estado `tasks: Task[]`. Es la única fuente de verdad; los componentes no acceden a `localStorage` directamente.
- `lib/sort-tasks.ts`: función pura `sortTasks(tasks: Task[]): Task[]` que aplica el criterio de ordenamiento (ver más abajo). Se testea de forma aislada, sin store ni DOM.
- `lib/validate-task.ts`: validación de `description` y `dueDate` compartida entre el store y el formulario.
- `components/task-list.tsx`, `components/task-item.tsx`, `components/task-form-dialog.tsx`, `components/delete-confirm-dialog.tsx`: UI.
- Se elimina `src/shared/stores/task-store.ts`, `src/shared/stores/task-store.test.ts`, `src/shared/ui/checkbox.tsx`, `src/shared/ui/checkbox.test.tsx` y `src/shared/test/object-mother/task.mother.ts` (se recrea un object mother equivalente dentro de la feature si los tests lo requieren).

**Alternativa considerada**: mantener el store en `shared` "adelantado" para una futura segunda feature. Se descarta porque ADR-005 exige promoción a `shared` solo cuando hay más de un consumidor real, y hoy solo existiría uno.

### Ordenamiento
`sortTasks` aplica, en este orden de prioridad de criterios:
1. Estado: pendientes (`completed === false`) antes que completadas (`completed === true`). Esto agrupa las completadas al final del listado completo, sin importar su prioridad individual.
2. Dentro de cada grupo (pendientes / completadas), por `priority`: `alta` → `media` → `baja`.
3. Dentro del mismo grupo y prioridad, por `createdAt` ascendente (FIFO: la tarea más antigua primero).

Es una función pura sobre una copia del array (no muta `tasks` original), para que sea trivialmente testeable con distintos escenarios de empate.

**Alternativa considerada**: intercalar completadas con pendientes según prioridad, cambiando solo el estilo visual. Se descarta por decisión explícita: las completadas deben agruparse al final para que el listado priorice visualmente lo pendiente.

### Persistencia
- Se usa un middleware de `zustand/middleware` (`persist`) apuntando a `localStorage`, con una clave de storage dedicada (p. ej. `tasks-storage`).
- Al hidratar, si `localStorage` contiene JSON inválido o un valor que no matchea la forma esperada de `Task[]`, el store arranca con `tasks: []` (no rompe la app; se trata como "primera visita sin datos").
- Cada mutación (`addTask`, `updateTask`, `removeTask`, `toggleCompleted`) persiste el estado completo inmediatamente después de aplicarse.

**Alternativa considerada**: serialización manual con `useEffect` + `localStorage.setItem`. Se descarta en favor de `persist` de Zustand (ya es una dependencia aceptada por ADR-004) para reducir código propio y superficie de bugs.

### UX de alta/edición/borrado
- **Alta y edición**: un diálogo modal (`task-form-dialog.tsx`, construido sobre el primitivo `Dialog` de Base UI) con tres campos: descripción (texto), fecha de vencimiento (date picker nativo `<input type="date">`), prioridad (select con las tres opciones). Mismo formulario para alta y edición, cambiando solo el modo y los valores iniciales.
- **Eliminación**: un segundo diálogo de confirmación (`delete-confirm-dialog.tsx`) antes de invocar `removeTask`. No hay eliminación directa desde la fila.
- **Distinción visual de completadas**: texto tachado + opacidad reducida + badge de prioridad atenuado, usando los tokens de `DESIGN.md` ("Precision Focus": `secondary`/mint para estado completado, `on-surface-variant` para texto atenuado).

## Risks / Trade-offs

- [Riesgo] `localStorage` puede no estar disponible (modo privado estricto en algunos navegadores, o `SSR` durante el render inicial de Next.js) → Mitigación: acceder a `localStorage` solo en efectos de cliente (`"use client"` + hidratación diferida de Zustand `persist`), nunca durante el render del servidor.
- [Riesgo] Corrupción de datos en `localStorage` (JSON inválido o forma inesperada) → Mitigación: `validate`/`merge` del middleware `persist` cae a estado inicial vacío ante error de parseo, sin lanzar excepción visible al usuario.
- [Trade-off] Usar `createdAt` como campo interno agrega un dato que el usuario no ve ni edita → se acepta porque es la forma más simple de garantizar un orden determinístico y estable ante empates de prioridad.
- [Riesgo] Eliminar `src/shared/stores/task-store.ts` y `checkbox.tsx` sin verificar si algún otro trabajo en curso los referencia → Mitigación: se confirmó por `grep` (ver auditoría) que no tienen consumidores actuales; se vuelve a verificar en el momento de implementación antes de borrar.

## Open Questions

- Reglas exactas de validación de longitud mínima de `description` y si `dueDate` admite fechas pasadas o solo hoy en adelante: se definen en `specs/task-management/spec.md`, retomando como referencia (no como copia literal) los casos límite ya explorados en el intento anterior (`TC-001`..`TC-021`, recuperables vía `git show`).
