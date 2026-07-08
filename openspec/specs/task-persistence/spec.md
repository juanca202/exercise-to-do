## Purpose

Persistir el estado de las tareas en `localStorage` sin backend ni autenticación, manteniendo el listado sincronizado entre recargas y sesiones del navegador, y recuperándose de forma segura cuando el valor almacenado es inexistente, corrupto o tiene una forma inesperada.

## Requirements

### Requirement: Persistencia en localStorage
El sistema SHALL persistir el listado completo de tareas en `localStorage` tras cada creación, edición, eliminación o cambio de estado (completada/pendiente), sin requerir backend ni autenticación.

#### Scenario: Persistencia tras recargar la página
- **WHEN** el usuario crea, edita, elimina o marca tareas y luego recarga la página
- **THEN** el listado refleja exactamente el mismo estado (tareas, valores y orden) que tenía antes de recargar

#### Scenario: Persistencia entre sesiones del navegador
- **WHEN** el usuario cierra el navegador y vuelve a abrir la aplicación más tarde, sin haber limpiado el almacenamiento del navegador
- **THEN** el listado de tareas se recupera igual a como quedó en la última sesión

### Requirement: Primera visita sin datos previos
El sistema SHALL mostrar un listado vacío, sin errores, cuando no existe ninguna entrada previa de tareas en `localStorage`.

#### Scenario: Primera visita
- **WHEN** el usuario abre la aplicación por primera vez y no hay ninguna clave de tareas en `localStorage`
- **THEN** el listado se muestra vacío, con el estado de "sin tareas", sin lanzar errores

### Requirement: Recuperación ante datos corruptos en localStorage
El sistema SHALL recuperarse de forma segura si el valor almacenado en `localStorage` bajo la clave de tareas no es JSON válido o no tiene la forma esperada de una lista de tareas, iniciando con un listado vacío en lugar de fallar.

#### Scenario: JSON inválido almacenado
- **WHEN** la clave de tareas en `localStorage` contiene un valor que no es JSON parseable
- **THEN** la aplicación carga sin errores visibles al usuario y el listado inicia vacío, como si fuera la primera visita

#### Scenario: Forma de datos inesperada almacenada
- **WHEN** la clave de tareas en `localStorage` contiene JSON válido pero con una forma distinta a una lista de tareas (por ejemplo, un objeto u otro tipo de dato)
- **THEN** la aplicación carga sin errores visibles al usuario y el listado inicia vacío, como si fuera la primera visita
