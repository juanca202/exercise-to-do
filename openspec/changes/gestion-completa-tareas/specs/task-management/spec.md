## ADDED Requirements

### Requirement: Descripción obligatoria
El sistema SHALL exigir una descripción no vacía al crear o editar una tarea, e IMPEDIR guardarla si el campo está vacío.

#### Scenario: Intento de guardado con descripción vacía
- **WHEN** el usuario deja el campo descripción vacío e intenta guardar (crear o editar)
- **THEN** el sistema impide el guardado y señala el campo como obligatorio

#### Scenario: Descripción de un solo carácter es válida (límite)
- **WHEN** el usuario ingresa una descripción de un único carácter y guarda
- **THEN** el sistema acepta el guardado sin error de validación

### Requirement: Fecha de vencimiento obligatoria
El sistema SHALL exigir una fecha de vencimiento al crear o editar una tarea, e IMPEDIR guardarla si el campo está vacío.

#### Scenario: Intento de guardado sin fecha de vencimiento
- **WHEN** el usuario deja el campo fecha de vencimiento vacío e intenta guardar
- **THEN** el sistema impide el guardado y señala el campo como obligatorio

#### Scenario: Fecha de vencimiento igual a hoy es válida (límite)
- **WHEN** el usuario ingresa la fecha actual como fecha de vencimiento y guarda
- **THEN** el sistema acepta el guardado sin error de validación

### Requirement: Prioridad restringida a valores válidos
El sistema SHALL restringir el campo prioridad a únicamente uno de los valores: alta, media o baja.

#### Scenario: Valores válidos aceptados
- **WHEN** el usuario selecciona alta, media o baja como prioridad y guarda
- **THEN** el sistema acepta el guardado con el valor de prioridad seleccionado

#### Scenario: Valor inválido rechazado
- **WHEN** se intenta guardar una tarea con un valor de prioridad distinto de alta, media o baja
- **THEN** el sistema impide el guardado

### Requirement: Creación de tarea
El sistema SHALL permitir crear una tarea nueva indicando descripción, fecha de vencimiento y prioridad, y agregarla al listado tras guardarla.

#### Scenario: Creación exitosa de una tarea
- **WHEN** el usuario completa descripción, fecha de vencimiento y prioridad válidas y guarda
- **THEN** la nueva tarea aparece en el listado como pendiente

### Requirement: Edición de tarea
El sistema SHALL permitir editar la descripción, la fecha de vencimiento y la prioridad de una tarea existente, y reflejar los cambios en el listado.

#### Scenario: Edición exitosa de una tarea existente
- **WHEN** el usuario modifica descripción, fecha de vencimiento o prioridad de una tarea existente y guarda
- **THEN** el listado refleja los nuevos valores para esa tarea

#### Scenario: Edición con descripción vacía bloqueada
- **WHEN** el usuario vacía el campo descripción de una tarea existente e intenta guardar la edición
- **THEN** el sistema impide el guardado y señala el campo como obligatorio

#### Scenario: Edición con fecha de vencimiento igual a hoy (límite)
- **WHEN** el usuario edita la fecha de vencimiento de una tarea existente y la establece en la fecha actual
- **THEN** el sistema acepta el guardado sin error de validación

### Requirement: Eliminación de tarea
El sistema SHALL permitir eliminar una tarea existente del listado de forma permanente.

#### Scenario: Eliminación exitosa de una tarea
- **WHEN** el usuario elimina una tarea existente del listado
- **THEN** la tarea deja de aparecer en el listado de forma permanente

#### Scenario: Eliminación de la única tarea existente (límite)
- **WHEN** el usuario elimina la única tarea presente en el listado
- **THEN** el listado queda vacío sin errores

### Requirement: Marcado de completada y reversión a pendiente
El sistema SHALL permitir marcar una tarea como completada y revertir ese estado a pendiente.

#### Scenario: Marcar una tarea como completada
- **WHEN** el usuario marca una tarea pendiente como completada
- **THEN** el estado de la tarea cambia a completada

#### Scenario: Revertir una tarea completada a pendiente
- **WHEN** el usuario desmarca una tarea previamente completada
- **THEN** el estado de la tarea vuelve a pendiente

### Requirement: Distinción visual de tareas completadas
El sistema SHALL distinguir visualmente las tareas completadas de las pendientes en el listado.

#### Scenario: Distinción visual en el listado
- **WHEN** el listado contiene al menos una tarea completada y una pendiente
- **THEN** la tarea completada se muestra con un estilo visual distinto al de las tareas pendientes

### Requirement: Orden predeterminado del listado por prioridad
El sistema SHALL mostrar, al cargar la aplicación, el listado completo de tareas ordenado de forma predeterminada por prioridad en el orden alta → media → baja.

#### Scenario: Orden del listado por prioridad
- **WHEN** existen tareas con prioridad alta, media y baja y el usuario abre el listado
- **THEN** el sistema las muestra ordenadas primero las de prioridad alta, luego media, luego baja

#### Scenario: Orden estable entre tareas de igual prioridad (límite)
- **WHEN** existen dos o más tareas con la misma prioridad, creadas en un orden conocido
- **THEN** el orden relativo entre ellas se mantiene igual entre recargas, sin alterar el agrupamiento por prioridad

### Requirement: Acceso sin autenticación
El sistema SHALL NOT requerir ningún mecanismo de autenticación ni identificación de usuario para acceder o gestionar las tareas.

#### Scenario: Acceso y gestión sin autenticación
- **WHEN** el usuario abre la aplicación y realiza cualquier operación de gestión de tareas (crear, editar, eliminar, completar)
- **THEN** el sistema permite la operación sin solicitar login ni identificación de usuario
