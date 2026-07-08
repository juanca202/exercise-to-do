## Purpose

Gestionar el ciclo de vida completo de una tarea: alta, edición, eliminación (con confirmación previa), marcado de completada/pendiente, validación de los campos obligatorios (descripción, fecha de vencimiento y prioridad) y ordenamiento por defecto del listado.

## Requirements

### Requirement: Registro de una tarea
El sistema SHALL permitir crear una tarea nueva con descripción, fecha de vencimiento y prioridad, agregándola al listado como pendiente.

#### Scenario: Creación exitosa
- **WHEN** el usuario completa descripción, fecha de vencimiento y prioridad válidas y confirma el formulario de alta
- **THEN** la tarea se agrega al listado como pendiente, con esos valores, y el formulario se cierra

#### Scenario: Descripción vacía
- **WHEN** el usuario intenta confirmar el formulario de alta con la descripción vacía o compuesta solo de espacios
- **THEN** el sistema rechaza el envío, muestra un error de validación en el campo de descripción y no crea la tarea

#### Scenario: Descripción de un carácter
- **WHEN** el usuario completa la descripción con un único carácter no vacío, junto con fecha de vencimiento y prioridad válidas
- **THEN** la tarea se crea correctamente (un carácter es el límite mínimo válido)

#### Scenario: Fecha de vencimiento vacía
- **WHEN** el usuario intenta confirmar el formulario de alta sin seleccionar fecha de vencimiento
- **THEN** el sistema rechaza el envío, muestra un error de validación en el campo de fecha y no crea la tarea

#### Scenario: Fecha de vencimiento anterior a hoy
- **WHEN** el usuario selecciona una fecha de vencimiento anterior a la fecha actual
- **THEN** el sistema rechaza el envío, muestra un error de validación en el campo de fecha y no crea la tarea

#### Scenario: Fecha de vencimiento igual a hoy
- **WHEN** el usuario selecciona como fecha de vencimiento la fecha actual (hoy)
- **THEN** la tarea se crea correctamente (hoy es el límite mínimo válido)

#### Scenario: Prioridad con valor inválido
- **WHEN** el formulario intenta enviarse con un valor de prioridad distinto de `alta`, `media` o `baja`
- **THEN** el sistema rechaza el envío y no crea la tarea

### Requirement: Edición de una tarea existente
El sistema SHALL permitir editar la descripción, fecha de vencimiento y prioridad de una tarea existente mediante el mismo formulario/modal usado para el alta, precargado con sus valores actuales.

#### Scenario: Edición exitosa
- **WHEN** el usuario abre el formulario de edición sobre una tarea existente, modifica uno o más campos con valores válidos y confirma
- **THEN** la tarea se actualiza con los nuevos valores, conserva su `id` y su estado de completada, y el formulario se cierra

#### Scenario: Edición con descripción vacía
- **WHEN** el usuario, durante la edición, deja la descripción vacía o solo con espacios y confirma
- **THEN** el sistema rechaza el envío, muestra el error de validación correspondiente y la tarea conserva sus valores previos

#### Scenario: Edición con fecha de vencimiento igual a hoy
- **WHEN** el usuario, durante la edición, cambia la fecha de vencimiento a la fecha actual (hoy)
- **THEN** la edición se acepta (hoy es el límite mínimo válido, igual que en la creación)

### Requirement: Eliminación de una tarea con confirmación
El sistema SHALL requerir una confirmación explícita del usuario antes de eliminar definitivamente una tarea; ninguna acción de eliminación se aplica sin ese paso.

#### Scenario: Eliminación confirmada
- **WHEN** el usuario solicita eliminar una tarea y confirma la eliminación en el diálogo de confirmación
- **THEN** la tarea se elimina del listado de forma definitiva

#### Scenario: Eliminación cancelada
- **WHEN** el usuario solicita eliminar una tarea pero cancela o cierra el diálogo de confirmación sin confirmar
- **THEN** la tarea permanece sin cambios en el listado

#### Scenario: Eliminación de la única tarea existente
- **WHEN** el usuario elimina (con confirmación) la única tarea presente en el listado
- **THEN** el listado queda vacío y se muestra el estado de "sin tareas"

### Requirement: Marcado de tarea como completada o pendiente
El sistema SHALL permitir alternar el estado de una tarea entre completada y pendiente, y SHALL distinguir visualmente las tareas completadas de las pendientes.

#### Scenario: Marcar como completada
- **WHEN** el usuario marca como completada una tarea que estaba pendiente
- **THEN** la tarea cambia su estado a completada y se muestra con la distinción visual de completada (p. ej. tachado y estilo atenuado)

#### Scenario: Revertir a pendiente
- **WHEN** el usuario desmarca una tarea que estaba completada
- **THEN** la tarea vuelve al estado pendiente y pierde la distinción visual de completada

### Requirement: Ordenamiento por defecto del listado
El sistema SHALL ordenar el listado de tareas, de forma predeterminada, primero por estado (pendientes antes que completadas), luego por prioridad (`alta` → `media` → `baja`) dentro de cada estado, y luego por orden de creación ascendente (FIFO) entre tareas del mismo estado y prioridad.

#### Scenario: Orden por prioridad entre tareas pendientes
- **WHEN** existen tareas pendientes con prioridades `alta`, `media` y `baja` mezcladas
- **THEN** el listado las muestra agrupadas en el orden `alta`, luego `media`, luego `baja`

#### Scenario: Orden estable ante empate de prioridad
- **WHEN** dos o más tareas pendientes comparten la misma prioridad pero se crearon en momentos distintos
- **THEN** se muestran en el orden en que fueron creadas, la más antigua primero

#### Scenario: Tareas completadas agrupadas al final
- **WHEN** el listado contiene tareas pendientes y completadas de distintas prioridades
- **THEN** todas las tareas pendientes se muestran antes que todas las tareas completadas, independientemente de la prioridad individual de estas últimas
