# Casos de prueba — US-001: Gestión completa de tareas

| TC | Perspectiva | Automatización | Prioridad | Criterio de aceptación |
|----|-------------|-----------------|-----------|-------------------------|
| [TC-001](./TC-001-crear-tarea-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-001 |
| [TC-002](./TC-002-crear-tarea-sin-descripcion-error.md) | Error | Automatizable (E2E) | Alta | AC-002 |
| [TC-003](./TC-003-descripcion-solo-espacios-limite.md) | Límite | Automatizable (Unit) | Media | AC-002 |
| [TC-004](./TC-004-crear-tarea-sin-fecha-error.md) | Error | Automatizable (E2E) | Alta | AC-003 |
| [TC-005](./TC-005-selector-prioridad-tres-opciones-limite.md) | Límite | Automatizable (E2E) | Media | AC-004 |
| [TC-006](./TC-006-prioridad-invalida-en-almacenamiento-error.md) | Error | Automatizable (Unit) | Media | AC-004 |
| [TC-007](./TC-007-editar-tarea-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-005 |
| [TC-008](./TC-008-editar-tarea-descripcion-vacia-error.md) | Error | Automatizable (E2E) | Alta | AC-005 |
| [TC-009](./TC-009-eliminar-tarea-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-006 |
| [TC-010](./TC-010-eliminar-ultima-tarea-limite.md) | Límite | Automatizable (E2E) | Media | AC-006 |
| [TC-011](./TC-011-marcar-tarea-completada-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-007 |
| [TC-012](./TC-012-desmarcar-tarea-completada-happy.md) | Happy Path | Automatizable (E2E) | Media | AC-007 |
| [TC-013](./TC-013-distincion-visual-completadas-happy.md) | Happy Path | Automatizable (Visual Test) | Media | AC-008 |
| [TC-014](./TC-014-orden-por-prioridad-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-009 |
| [TC-015](./TC-015-orden-misma-prioridad-limite.md) | Límite | Automatizable (E2E) | Baja | AC-009 |
| [TC-016](./TC-016-persistencia-tras-recarga-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-010 |
| [TC-017](./TC-017-localstorage-corrupto-error.md) | Error | Automatizable (Unit) | Media | AC-010 |
| [TC-018](./TC-018-listar-tareas-al-cargar-happy.md) | Happy Path | Automatizable (E2E) | Alta | AC-011 |
| [TC-019](./TC-019-listado-vacio-limite.md) | Límite | Automatizable (E2E) | Media | AC-011 |
