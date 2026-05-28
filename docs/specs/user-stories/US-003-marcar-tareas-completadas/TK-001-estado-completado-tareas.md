# TK-001: Estado completado de tareas

- Estado: Ready
- Historia: [US-003: Marcar tareas como completadas](./README.md)
- Unidad de trabajo: frontend
- Asignado a: juanca202

## Descripción

Permitir marcar y desmarcar tareas como completadas desde el listado, distinguir visualmente las completadas de las pendientes y persistir el cambio de `status` en `localStorage` sin alterar descripción ni prioridad.

## Dependencias

- `lib/todos` — `updateTodo`, `saveTodos`, tipos `Todo` y `TodoStatus` (el campo `status` ya existe en el modelo; US-001 / TK-001).
- `lib/todos/sort.ts` — orden del listado (US-002 / TK-001).
- `components/todo-list.tsx` — ítems del listado (US-001 / TK-003).
- `components/todos-app.tsx` — orquestación de estado y persistencia.

## Referencias

- **Documentación técnica:** [Entidad Todo](../../technical-docs/todo-entity.md)

## Plan de implementación

1. Añadir control de toggle (checkbox o botón) en cada ítem de `components/todo-list.tsx` para alternar entre `pending` y `completed`.
2. Propagar callback `onToggleStatus(id)` hacia `components/todos-app.tsx`.
3. En el handler, localizar la tarea por `id`, aplicar `updateTodo(todo, { status: nuevoEstado })`, actualizar estado React, persistir con `saveTodos` y volver a ordenar con `sortTodosByPriority`.
4. Aplicar estilos visuales diferenciados a ítems completados (p. ej. texto tachado y/o opacidad reducida) mediante clases condicionales en Tailwind; mantener visible la prioridad.
5. Confirmar que marcar/desmarcar no modifica `description`, `priority`, `id`, `created_at` ni `due_at`.
6. Añadir prueba de componente o integración mínima que verifique el cambio de clase/estilo al togglear, si el proyecto ya tiene harness de testing de UI.

## Observaciones

Sin pendientes documentados.
