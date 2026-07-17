## Why

El formulario de crear/editar tareas está siempre visible en la página y compite con el listado. Moverlo a un diálogo modal deja el listado como superficie principal y aclara el modo create vs edit sin cambiar las reglas de negocio de US-001.

## What Changes

- Reemplazar el formulario inline de la home por un único modal (Base UI Dialog) usado tanto para crear como para editar.
- Añadir un CTA “Nueva tarea” que abre el modal en modo creación; “Editar” abre el mismo modal en modo edición.
- Al cerrar (Cancelar, Escape o clic en backdrop), descartar el borrador del formulario **sin** confirmación.
- Actualizar tests unitarios y E2E para abrir el modal antes de interactuar con el formulario.
- **No** cambia validaciones, persistencia, ordenación ni el modelo de tarea.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `task-management`: la presentación de crear/editar pasa de formulario siempre visible a diálogo modal; el comportamiento de negocio (campos, validaciones, CRUD) se mantiene.

## Impact

- **Código**: `TasksView` (estado del diálogo + CTA), reutiliza `TaskForm`; posible wrapper fino alrededor de Base UI `Dialog`.
- **Dependencias**: `@base-ui/react` Dialog (ya en el stack, ADR-009).
- **Pruebas**: ajustar `tasks-view.test.tsx` y `e2e/tasks.spec.ts` al flujo modal.
- **Diseño previo**: revoca la decisión #5 de `us-001-gestion-completa-tareas` que descartaba modales.
