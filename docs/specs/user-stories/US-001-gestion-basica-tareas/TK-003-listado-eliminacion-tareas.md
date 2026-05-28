# TK-003: Listado y eliminación de tareas

- Estado: Ready
- Historia: [US-001: Gestión básica de tareas](./README.md)
- Unidad de trabajo: frontend
- Asignado a: juanca202

## Descripción

Implementar el listado de tareas registradas en la vista principal y la acción de eliminar una tarea, reflejando los cambios de forma inmediata en pantalla y persistiéndolos en `localStorage`.

## Dependencias

- `lib/todos` — `loadTodos`, `saveTodos`, tipo `Todo` (TK-001).
- `components/todo-form.tsx` — callbacks de creación/edición provistos por TK-002.
- `react` / `react-dom` — estado local del listado y componentes cliente.

## Referencias

- **Documentación técnica:** [Entidad Todo](../../technical-docs/todo-entity.md)

## Plan de implementación

1. Crear `components/todo-list.tsx` como Client Component que reciba `todos: Todo[]`, `onEdit(todo)` y `onDelete(id)`.
2. Renderizar cada ítem con al menos: descripción y prioridad (etiqueta en español); botones o enlaces «Editar» y «Eliminar» accesibles.
3. Crear contenedor cliente `components/todos-app.tsx` (o equivalente) que:
   - Al montar, cargue tareas con `loadTodos`.
   - Mantenga el array en estado React.
   - Conecte `TodoForm` (TK-002) para crear/editar y actualice el estado + `saveTodos`.
   - Pase handlers al listado para editar (seleccionar tarea en el formulario) y eliminar.
4. Implementar eliminación: filtrar por `id`, actualizar estado local y persistir con `saveTodos`; la tarea eliminada no debe reaparecer tras recargar.
5. Integrar el contenedor en `app/page.tsx`, reemplazando el contenido placeholder de la plantilla Next.js.
6. Confirmar que crear, editar y eliminar comparten la misma fuente de verdad en memoria antes de cada `saveTodos`.

## Observaciones

Sin pendientes documentados.
