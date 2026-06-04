# Quickstart: Gestión de Tareas (To-Do)

**Feature**: `001-todo-management` | **Branch**: `001-todo-management`

## Prerequisites

- Node.js 20+
- Dependencias instaladas: `npm install`

## Development

```bash
# Servidor de desarrollo
npm run dev
# → http://localhost:3000
```

## Quality gates (Constitution IV)

```bash
npm run lint
npm run test:run
npm run build
```

## Manual verification checklist

Tras implementar la feature, verificar contra [spec.md](./spec.md):

### P1 — Crear y listar

1. Abrir app → estado vacío visible si no hay tareas.
2. Clic en acción "Nueva tarea" → modal de creación.
3. Guardar sin descripción → mensaje de validación; modal permanece abierta.
4. Crear tarea con descripción + prioridad (sin fecha) → modal cierra; tarea en listado con badge de prioridad + etiqueta textual.
5. Recargar navegador → tareas persistidas.

### P2 — Editar

1. Abrir modal de edición en una tarea existente.
2. Modificar descripción/prioridad/fecha → guardar → cambios reflejados.
3. Quitar fecha → listado muestra "Sin fecha".
4. Cancelar edición → sin cambios.

### P3 — Eliminar

1. Eliminar tarea → diálogo de confirmación.
2. Confirmar → tarea desaparece y no vuelve tras recargar.
3. Cancelar confirmación → tarea permanece.

### P4 — Completar

1. Marcar pendiente como completada → estilo distinto (tachado + checkbox + etiqueta).
2. Revertir a pendiente → estilo normal.
3. Recargar → estado conservado.

### P5 — Ordenamiento

1. Crear tareas con prioridades alta, media, baja en orden aleatorio.
2. Verificar listado: alta → media → baja.
3. Cambiar prioridad en edición → listado se reordena y badge actualiza color.

## localStorage inspection

```javascript
// DevTools → Console
JSON.parse(localStorage.getItem("todos:v1"));
```

## Test focus areas (TDD)

| Module              | Test file (co-located)   | Covers                        |
| ------------------- | ------------------------ | ----------------------------- |
| `validateTask.ts`   | `validateTask.test.ts`   | VR-001–004, SC-002            |
| `sortTasks.ts`      | `sortTasks.test.ts`      | FR-010, SC-004                |
| `storage.ts`        | `storage.test.ts`        | FR-011, migration             |
| `todoStore.ts`      | `todoStore.test.ts`      | CRUD actions                  |
| `TaskFormModal.tsx` | `TaskFormModal.test.tsx` | Modal create/edit, FR-015/016 |
| `TaskList.tsx`      | `TaskList.test.tsx`      | Empty state, ordering, badges |

## Next step

Generar tareas ejecutables:

```text
/speckit-tasks
```
