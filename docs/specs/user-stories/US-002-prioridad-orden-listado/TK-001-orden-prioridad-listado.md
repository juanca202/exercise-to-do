# TK-001: Orden por prioridad en el listado

- Estado: Ready
- Historia: [US-002: Prioridad y orden del listado](./README.md)
- Unidad de trabajo: frontend
- Asignado a: juanca202

## Descripción

Aplicar el orden predeterminado del listado (alta → media → baja), mantener estabilidad por fecha de creación dentro de la misma prioridad, reordenar automáticamente al cambiar la prioridad de una tarea y mostrar la prioridad de forma visible en cada ítem.

## Dependencias

- `lib/todos` — tipo `Todo`, `TodoPriority` (US-001 / TK-001).
- `components/todo-list.tsx` — listado existente (US-001 / TK-003).
- `components/todos-app.tsx` — estado central de tareas (US-001 / TK-003).

## Referencias

- **Documentación técnica:** [Entidad Todo](../../technical-docs/todo-entity.md)

## Plan de implementación

1. Crear `lib/todos/sort.ts` con `sortTodosByPriority(todos: Todo[]): Todo[]` que ordene por peso de prioridad (`high` → `medium` → `low`) y, a igual prioridad, por `created_at` ascendente (más antigua primero).
2. Exportar `sortTodosByPriority` desde `lib/todos/index.ts`.
3. Añadir pruebas unitarias en `lib/todos/sort.test.ts` con casos de distintas prioridades, empate por prioridad y estabilidad de `created_at`.
4. En `components/todos-app.tsx`, aplicar `sortTodosByPriority` siempre antes de pasar el array a `TodoList` y tras cualquier mutación (crear, editar, eliminar).
5. En `components/todo-list.tsx`, mostrar badge o texto de prioridad en español (`alta`, `media`, `baja`) en cada ítem; usar clases Tailwind diferenciadas por nivel si aplica.
6. Verificar que al editar la prioridad de una tarea el listado se reordena sin recargar la página.

## Observaciones

Sin pendientes documentados.
