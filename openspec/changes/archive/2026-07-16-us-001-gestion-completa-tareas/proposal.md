## Why

La aplicación de tareas aún no ofrece gestión funcional: el usuario no puede registrar, listar, editar, eliminar ni completar tareas de forma local. Esta historia (US-001) entrega el valor central del producto —organizar el trabajo diario sin backend ni autenticación— y desbloquea el resto del ejercicio.

## What Changes

- Introducir la feature `tasks` con CRUD completo: crear, listar, editar y eliminar tareas.
- Validar campos obligatorios (descripción no vacía tras trim, fecha de vencimiento) y restringir prioridad a alta / media / baja.
- Permitir marcar y desmarcar tareas como completadas, con distinción visual en el listado.
- Ordenar el listado por prioridad de forma predeterminada (alta → media → baja).
- Persistir tareas en `localStorage` y restaurarlas al cargar; degradar de forma segura si el almacenamiento está corrupto.
- Componer la UI en la ruta principal (`src/app`) usando Base UI + Tailwind CSS.

## Capabilities

### New Capabilities

- `task-management`: Gestión completa del ciclo de vida de tareas (crear, listar, editar, eliminar, completar/descompletar), validaciones de negocio, ordenamiento por prioridad y persistencia local en el navegador.

### Modified Capabilities

- Ninguna (no existen specs previas en `openspec/specs/`).

## Impact

- **Código**: nueva feature en `src/features/tasks/` (modelo, store Zustand, componentes, persistencia); composición en `src/app/page.tsx`.
- **Dependencias**: Zustand (ADR-010), Base UI (ADR-009), Tailwind CSS (ADR-008); sin APIs ni backend.
- **Pruebas**: cobertura unitaria (Vitest) y E2E (Playwright) alineada a AC-001…AC-011 y TC-001…TC-019.
- **Specs de producto**: implementa [US-001](../../../docs/specs/user-stories/US-001-gestion-completa-tareas/README.md).
