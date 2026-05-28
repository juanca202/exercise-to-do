# TK-002: Formulario de creación y edición de tareas

- Estado: Ready
- Historia: [US-001: Gestión básica de tareas](./README.md)
- Unidad de trabajo: frontend
- Asignado a: juanca202

## Descripción

Implementar el formulario de la vista principal para crear tareas nuevas y editar tareas existentes, con validación de descripción obligatoria, selector de prioridad (alta, media, baja) con valor por defecto **media**, y persistencia inmediata en `localStorage` mediante el módulo `lib/todos`.

## Dependencias

- `lib/todos` — tipos, validación, `createTodo`, `loadTodos`, `saveTodos` (TK-001).
- `react` / `react-dom` — componentes cliente del formulario.

## Referencias

- **Documentación técnica:** [Entidad Todo](../../technical-docs/todo-entity.md)

## Plan de implementación

1. Crear `components/todo-form.tsx` como Client Component con campos:
   - `description` (input texto, etiqueta «Descripción» / «Título»).
   - `priority` (select con opciones alta / media / baja mapeadas a `high` / `medium` / `low`; default `medium`).
2. Modo **crear**: al enviar, validar con `lib/todos`, crear entidad con `createTodo`, añadir al array cargado de `loadTodos` y persistir con `saveTodos`; limpiar el formulario tras éxito.
3. Modo **editar**: recibir la tarea seleccionada vía props; precargar campos; al enviar, actualizar la entidad en memoria (conservar `id`, `created_at`, `status`, `due_at`) y persistir con `saveTodos`; emitir callback `onSaved` / `onCancel`.
4. Mostrar mensaje de error inline cuando la descripción esté vacía o solo contenga espacios (no persistir).
5. Integrar el formulario en `app/page.tsx` (o contenedor cliente dedicado) sin implementar aún el listado completo de TK-003; basta exponer callbacks para que la página padre actualice su estado local de tareas.
6. Asegurar accesibilidad mínima: labels asociados, botones «Guardar» y «Cancelar» en modo edición.

## Observaciones

Sin pendientes documentados.
