## ADDED Requirements

### Requirement: Persistencia de operaciones sobre tareas
El sistema SHALL persistir en localStorage cada creación, edición, eliminación y cambio de estado (completada/pendiente) de una tarea, de manera que los datos se conserven entre recargas de la página.

#### Scenario: Persistencia tras recarga de la página
- **WHEN** el usuario crea, edita, elimina o cambia el estado de una o más tareas y luego recarga la página del navegador
- **THEN** el sistema muestra el mismo estado de las tareas que tenía antes de recargar, leído desde localStorage

### Requirement: Manejo de datos corruptos en localStorage
El sistema SHALL cargar la aplicación de forma controlada cuando el valor almacenado en localStorage bajo la clave de tareas no es un JSON válido.

#### Scenario: Datos corruptos en localStorage
- **WHEN** la clave de localStorage usada para persistir tareas contiene un valor no parseable como JSON
- **THEN** la aplicación carga sin pantalla en blanco ni error no controlado visible, mostrando como mínimo un listado vacío o un estado por defecto

### Requirement: Primera visita sin datos previos
El sistema SHALL cargar correctamente cuando no existe ninguna clave previa de tareas en localStorage.

#### Scenario: Primera visita sin datos en localStorage
- **WHEN** el usuario abre la aplicación por primera vez y no existe ninguna clave previa de tareas en localStorage
- **THEN** el sistema muestra un listado vacío, sin errores en consola, listo para crear la primera tarea
