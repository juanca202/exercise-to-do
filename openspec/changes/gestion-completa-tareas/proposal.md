## Why

La aplicación actualmente solo cuenta con un store de referencia (`useTaskStore`) con alta, toggle y baja en memoria, sin validaciones, sin fecha de vencimiento, sin prioridad y sin persistencia. US-001 requiere que el usuario pueda gestionar sus tareas personales de punta a punta (crear, editar, eliminar, ordenar por prioridad y marcar como completadas) de forma autónoma, sin backend ni autenticación, conservando los datos entre recargas del navegador.

## What Changes

- Modelo de tarea ampliado: `description` (obligatoria), `dueDate` (obligatoria) y `priority` (`alta` | `media` | `baja`), además del estado `completed`.
- Validación de formulario: bloquear el guardado si falta descripción o fecha de vencimiento; restringir prioridad a los tres valores permitidos.
- Alta y edición de tareas mediante un formulario reutilizable para ambos flujos.
- Eliminación permanente de una tarea del listado.
- Marcado de una tarea como completada y reversión a pendiente.
- Distinción visual de tareas completadas frente a pendientes en el listado.
- Orden predeterminado del listado por prioridad (alta → media → baja), con orden estable entre tareas de igual prioridad.
- Persistencia de tareas en `localStorage` en cada alta, edición, eliminación y cambio de estado; recuperación del estado guardado al cargar la aplicación, con manejo explícito de datos corruptos o inexistentes (primera visita).
- Sin mecanismo de autenticación ni identificación de usuario en ningún flujo.
- **BREAKING**: se reemplaza la interfaz `Task` actual (`id`, `title`, `completed`) por el nuevo modelo (`id`, `description`, `dueDate`, `priority`, `completed`); se elimina `title` en favor de `description`.

## Capabilities

### New Capabilities

- `task-management`: creación, edición, eliminación, marcado de completada/pendiente, validación de campos obligatorios y de prioridad, distinción visual de completadas, orden predeterminado por prioridad, y ausencia de autenticación.
- `task-persistence`: persistencia de tareas en `localStorage`, recuperación del estado tras recarga, manejo de datos corruptos y comportamiento en primera visita sin datos previos.

### Modified Capabilities

_Ninguna: no existen specs previas en `openspec/specs/`._

## Impact

- Código afectado: `src/shared/stores/task-store.ts` (modelo y acciones del store), `src/features/home/components/home-page.tsx` (o un nuevo feature `src/features/tasks/` según ADR-005), `src/shared/ui/` (componentes reutilizables como `checkbox.tsx` y nuevos inputs/formularios).
- Sin impacto en dependencias externas ni APIs de backend (no aplica, la app no tiene backend).
- Pruebas unitarias existentes de `task-store.test.ts` y `home-page.test.tsx` deberán actualizarse o reemplazarse conforme al nuevo modelo.
