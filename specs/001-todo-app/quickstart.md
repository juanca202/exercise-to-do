# Quickstart: Aplicación de To-Dos

**Feature**: `001-todo-app` | **Branch**: `001-todo-app`

## Prerequisites

- Node.js 20+
- npm (o pnpm/yarn según lockfile del repo)

## Setup

```bash
cd /Users/juanca202/Documents/repos/exercise-to-do
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Feature layout (target)

```text
src/
├── app/
│   ├── layout.tsx          # Shell global
│   └── page.tsx            # Importa TodosPage (Client)
├── features/todos/
│   ├── components/
│   │   ├── todos-page.tsx
│   │   ├── todo-list.tsx
│   │   ├── todo-list-item.tsx
│   │   ├── task-form-modal.tsx
│   │   └── delete-confirm-modal.tsx
│   ├── store/
│   │   └── todo-store.ts
│   ├── lib/
│   │   ├── validation.ts
│   │   ├── sort.ts
│   │   └── types.ts
│   ├── testing/
│   │   └── todo-mothers.ts
│   └── index.ts
├── lib/
│   └── storage/local-storage.ts
└── components/             # Wrappers Base UI reutilizables (Modal, Button, etc.)
```

## Manual verification checklist

### P1 — Crear y listar

1. Abrir app → estado vacío visible.
2. Click "Nueva tarea" → modal de creación.
3. Completar descripción, fecha y prioridad → Guardar.
4. Tarea aparece en listado con badge de color correcto.
5. Crear tareas alta/media/baja → orden alta → media → baja.
6. Recargar página → tareas persisten.

### P2 — Editar

1. Editar tarea existente vía modal → cambiar campos → Guardar.
2. Listado y color de prioridad actualizados.
3. Cancelar modal → sin cambios.

### P3 — Eliminar

1. Eliminar → modal de confirmación → Confirmar → tarea desaparece.
2. Cancelar confirmación → tarea permanece.
3. Recargar → eliminación persistida.

### P4 — Completar

1. Marcar tarea completada → estilo visual distinto (tachado/atenuado).
2. Desmarcar → vuelve a pendiente.
3. Recargar → estado conservado.

### Validación

1. Intentar guardar sin descripción o fecha → mensaje de error en modal.

## Run tests

```bash
npm run test:run
```

Tests críticos esperados (co-located):

- `validation.test.ts` — reglas VR-001 a VR-005
- `sort.test.ts` — orden prioridad + desempate createdAt
- `todo-store.test.ts` — CRUD + persistencia mock localStorage
- `task-form-modal.test.tsx` — validación UI
- `todo-list-item.test.tsx` — colores prioridad, estado completada

## localStorage inspection

En DevTools → Application → Local Storage:

- **Key**: `todos:v1`
- **Value**: JSON array of `Todo` objects

Para reset manual: borrar la clave y recargar.

## Related docs

- [spec.md](./spec.md) — requisitos funcionales
- [plan.md](./plan.md) — plan de implementación
- [data-model.md](./data-model.md) — entidades y validación
- [contracts/ui-contracts.md](./contracts/ui-contracts.md) — contratos UI/store
- [research.md](./research.md) — decisiones técnicas

## Next step

Generar tareas ejecutables:

```text
/speckit-tasks
```
