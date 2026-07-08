## Why

Hoy la aplicación no tiene ninguna funcionalidad de gestión de tareas: `src/features/home` solo muestra el scaffold por defecto de `create-next-app`. Se necesita una app simple de to-dos que permita registrar, editar, eliminar, priorizar y completar tareas, con persistencia local, sin backend ni autenticación.

## What Changes

- Se agrega la feature `tasks` (`src/features/tasks/`) con el ciclo de vida completo de una tarea: creación, edición, eliminación, listado y marcado de completada.
- Cada tarea exige una descripción y una fecha de vencimiento; la prioridad solo admite los valores `alta`, `media` o `baja`.
- El listado se ordena por defecto por prioridad (alta → media → baja); dentro de un mismo nivel de prioridad, la tarea creada primero aparece primero (FIFO).
- Las tareas completadas se agrupan al final del listado (mismo criterio de orden dentro del bloque) y se distinguen visualmente de las pendientes.
- Crear y editar una tarea se hace mediante un formulario/modal separado del listado; no hay edición inline.
- Eliminar una tarea requiere confirmación previa antes de aplicarse.
- El estado de las tareas persiste en `localStorage` entre recargas y sesiones; datos corruptos o ilegibles en `localStorage` no rompen la app (se recupera con una lista vacía).
- Se elimina el código huérfano existente en `src/shared/stores/task-store.ts` y `src/shared/ui/checkbox.tsx` (modelo incompleto y sin consumidores, señalado por la auditoría `docs/adr/audits/audit-2026-07-07.md` como incumplimiento de ADR-005); se reemplaza por la implementación nueva dentro de la feature.
- **BREAKING**: ninguno (no hay funcionalidad previa expuesta a usuarios ni API pública).

## Capabilities

### New Capabilities
- `task-management`: alta, edición, eliminación (con confirmación), marcado de completada/pendiente, validación de campos obligatorios (descripción, fecha de vencimiento, prioridad) y ordenamiento por defecto del listado.
- `task-persistence`: persistencia del estado de tareas en `localStorage`, recuperación ante datos corruptos y sincronización entre recargas de la página.

### Modified Capabilities
- Ninguna (no existen specs previos en `openspec/specs/`).

## Impact

- Código nuevo: `src/features/tasks/**` (componentes, store Zustand, utilidades de ordenamiento y validación, tests).
- Código eliminado: `src/shared/stores/task-store.ts`, `src/shared/ui/checkbox.tsx` y sus tests asociados.
- `src/features/home` deja de ser la única feature; se usa como referencia para la fitness function de aislamiento de features (ADR-005), que debe seguir en verde.
- Dependencias existentes reutilizadas: Zustand (ADR-004), Base UI (ADR-003), Tailwind (ADR-002) y tokens de `DESIGN.md` ("Precision Focus").
- Sin cambios de infraestructura, backend ni autenticación.
