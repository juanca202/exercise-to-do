# Feature Specification: Gestión de Tareas (To-Do)

**Feature Branch**: `001-todo-management`

**Created**: 2026-06-04

**Status**: Draft

**Input**: User description: "Implementa una aplicación simple de to-dos que permita gestionar tareas de forma completa. Incluye registro y listado, creación y edición, eliminación, ordenamiento por prioridad, marcado como completadas. Reglas: descripción obligatoria; fecha de vencimiento opcional; prioridad alta/media/baja; tareas completadas distinguibles visualmente; listado ordenado por prioridad (alta → media → baja) por defecto. Sin autenticación; persistencia local; sin backend."

## Clarifications

### Session 2026-06-04

- Q: ¿Cómo debe realizarse la creación y edición de tareas? → A: En una ventana modal superpuesta al listado principal.
- Q: ¿Cómo debe mostrarse visualmente la prioridad de cada tarea? → A: Resaltada con un color representativo por nivel (alta, media, baja), complementado siempre con la etiqueta textual de prioridad.
- Q: ¿Cuál debe ser la prioridad predeterminada al crear una tarea nueva? → A: Media.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Crear y listar tareas (Priority: P1)

Como usuario, quiero registrar nuevas tareas desde una ventana modal con descripción y prioridad (y opcionalmente una fecha de vencimiento), y verlas en un listado, para tener un inventario centralizado de lo que debo hacer.

**Why this priority**: Sin crear y ver tareas, la aplicación no entrega valor. Es el núcleo mínimo viable del producto.

**Independent Test**: Se puede verificar creando una tarea válida y comprobando que aparece en el listado con todos sus datos visibles.

**Acceptance Scenarios**:

1. **Given** el usuario está en la pantalla principal, **When** abre la ventana modal de creación, **Then** el campo prioridad muestra **media** como valor predeterminado.
2. **Given** el usuario está en la pantalla principal, **When** abre la ventana modal de creación, completa descripción y confirma sin cambiar la prioridad predeterminada, **Then** la modal se cierra, la tarea aparece en el listado con prioridad media y estado pendiente.
3. **Given** el usuario intenta crear una tarea en la modal, **When** deja la descripción vacía y confirma, **Then** el sistema impide guardar dentro de la modal y muestra un mensaje claro indicando que la descripción es obligatoria.
4. **Given** el usuario crea una tarea sin indicar fecha de vencimiento en la modal, **When** confirma la creación, **Then** la modal se cierra, la tarea se guarda correctamente y el listado indica que no tiene fecha de vencimiento asignada.
5. **Given** el usuario abre la modal de creación, **When** cancela o cierra la modal sin guardar, **Then** no se crea ninguna tarea y el listado permanece sin cambios.
6. **Given** existen tareas registradas, **When** el usuario abre la aplicación, **Then** ve el listado completo de sus tareas persistidas desde la sesión anterior.
7. **Given** el usuario visualiza una tarea en el listado, **When** observa su prioridad, **Then** la prioridad se muestra con un color representativo del nivel (alta, media o baja) junto con su etiqueta textual.

---

### User Story 2 - Editar tareas existentes (Priority: P2)

Como usuario, quiero modificar los datos de una tarea existente desde una ventana modal, para corregir errores o actualizar información cuando cambian mis planes.

**Why this priority**: La edición es esencial para mantener el listado útil sin tener que eliminar y recrear tareas.

**Independent Test**: Se puede verificar editando la descripción, fecha o prioridad de una tarea existente y comprobando que los cambios se reflejan en el listado.

**Acceptance Scenarios**:

1. **Given** existe una tarea en el listado, **When** el usuario abre la modal de edición, modifica uno o más campos y guarda, **Then** la modal se cierra y el listado muestra los valores actualizados.
2. **Given** el usuario está editando una tarea en la modal, **When** intenta guardar sin descripción, **Then** el sistema impide guardar y muestra validación igual que en la creación.
3. **Given** el usuario está editando una tarea con fecha de vencimiento en la modal, **When** elimina la fecha y guarda, **Then** la modal se cierra, la tarea queda sin fecha de vencimiento y el listado lo refleja.
4. **Given** el usuario está editando una tarea en la modal, **When** cancela o cierra la modal sin guardar, **Then** los datos originales permanecen sin cambios en el listado.

---

### User Story 3 - Eliminar tareas (Priority: P3)

Como usuario, quiero eliminar tareas que ya no necesito, para mantener mi listado limpio y enfocado.

**Why this priority**: La eliminación completa el ciclo de vida de una tarea y evita acumulación de entradas obsoletas.

**Independent Test**: Se puede verificar eliminando una tarea y comprobando que desaparece del listado y no reaparece al recargar.

**Acceptance Scenarios**:

1. **Given** existe una tarea en el listado, **When** el usuario solicita eliminarla y confirma la acción, **Then** la tarea desaparece del listado de forma permanente.
2. **Given** el usuario solicita eliminar una tarea, **When** cancela la confirmación, **Then** la tarea permanece en el listado sin cambios.
3. **Given** el listado queda vacío tras eliminar la última tarea, **When** el usuario observa la pantalla, **Then** ve un estado vacío claro que indica que no hay tareas.

---

### User Story 4 - Marcar tareas como completadas (Priority: P4)

Como usuario, quiero marcar tareas como completadas o volver a marcarlas como pendientes, para reflejar mi progreso real.

**Why this priority**: Distinguir pendientes de completadas es clave para usar el listado como herramienta de seguimiento diario.

**Independent Test**: Se puede verificar alternando el estado de una tarea y comprobando el cambio visual y de estado persistido.

**Acceptance Scenarios**:

1. **Given** existe una tarea pendiente, **When** el usuario la marca como completada, **Then** la tarea se muestra con una apariencia visual claramente distinta a las pendientes.
2. **Given** existe una tarea completada, **When** el usuario la marca como pendiente, **Then** recupera la apariencia visual de tarea pendiente.
3. **Given** el usuario marca una tarea como completada, **When** recarga la aplicación, **Then** la tarea conserva su estado completado.

---

### User Story 5 - Ordenamiento por prioridad (Priority: P5)

Como usuario, quiero que el listado muestre primero las tareas más urgentes, para enfocarme en lo prioritario sin reordenar manualmente.

**Why this priority**: El orden por prioridad refuerza la utilidad del campo prioridad y guía la atención del usuario hacia lo más importante.

**Independent Test**: Se puede verificar creando tareas con distintas prioridades y comprobando que el listado las muestra en orden alta → media → baja.

**Acceptance Scenarios**:

1. **Given** existen tareas con prioridades alta, media y baja, **When** el usuario visualiza el listado, **Then** las tareas aparecen ordenadas de mayor a menor prioridad (alta, luego media, luego baja).
2. **Given** existen varias tareas con la misma prioridad, **When** el usuario visualiza el listado, **Then** las tareas del mismo nivel de prioridad se muestran juntas en un orden consistente.
3. **Given** el usuario edita la prioridad de una tarea, **When** guarda el cambio, **Then** el listado se reordena automáticamente según la nueva prioridad y actualiza el color representativo correspondiente.

---

### Edge Cases

- ¿Qué ocurre si el usuario cierra la modal de creación o edición sin guardar (cancelar, tecla Escape o clic fuera)? La modal se cierra sin persistir cambios; el listado permanece intacto.
- ¿Qué ocurre si el usuario tiene dificultad para distinguir colores? La etiqueta textual de prioridad (alta, media, baja) siempre acompaña al resaltado de color para garantizar comprensión.
- ¿Qué ocurre si el usuario intenta seleccionar una prioridad distinta de alta, media o baja? Solo esas tres opciones están disponibles en la modal; no se permite un valor inválido.
- ¿Qué ocurre si el usuario no asigna fecha de vencimiento? La tarea se crea o guarda sin problema; el listado indica claramente la ausencia de fecha.
- ¿Qué ocurre si la fecha de vencimiento es anterior al día actual? Se permite registrar la tarea; puede mostrarse como vencida para alertar al usuario.
- ¿Qué ocurre si la descripción contiene solo espacios en blanco? Se trata como descripción vacía y se rechaza con mensaje de validación.
- ¿Qué ocurre si el almacenamiento local del navegador está lleno o no disponible? Se informa al usuario que no fue posible guardar y se evita pérdida silenciosa de datos.
- ¿Qué ocurre al editar una tarea completada? Se permite editar todos los campos; el estado completado se mantiene salvo que el usuario lo cambie explícitamente.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE permitir crear tareas con descripción, prioridad y estado (pendiente o completada), y opcionalmente con fecha de vencimiento, mediante una ventana modal.
- **FR-018**: Al abrir la modal de creación, el sistema DEBE preseleccionar la prioridad **media** como valor predeterminado; el usuario puede cambiarla antes de guardar.
- **FR-002**: El sistema DEBE exigir descripción no vacía para crear o guardar una tarea.
- **FR-003**: El sistema DEBE permitir crear y guardar tareas sin fecha de vencimiento; la fecha es un campo opcional que el usuario puede agregar, modificar o eliminar en cualquier momento.
- **FR-004**: El sistema DEBE restringir la prioridad a exactamente tres valores: alta, media o baja.
- **FR-017**: El sistema DEBE resaltar visualmente la prioridad de cada tarea con un color representativo: rojo para alta, amarillo/ámbar para media y verde para baja; el color DEBE ir acompañado siempre de la etiqueta textual de prioridad.
- **FR-005**: El sistema DEBE mostrar un listado de todas las tareas del usuario con descripción, prioridad (con color representativo y etiqueta textual) y estado visibles; cuando exista fecha de vencimiento, también debe mostrarse, y cuando no exista, debe indicarse de forma clara.
- **FR-006**: El sistema DEBE permitir editar la descripción, fecha de vencimiento y prioridad de cualquier tarea existente mediante una ventana modal.
- **FR-015**: La creación y edición de tareas DEBEN realizarse en ventanas modales superpuestas al listado; el listado principal permanece visible en segundo plano mientras la modal está abierta.
- **FR-016**: La modal de creación y la modal de edición DEBEN incluir acciones explícitas de confirmar (guardar) y cancelar; cancelar o cerrar la modal sin confirmar no debe persistir cambios.
- **FR-007**: El sistema DEBE permitir eliminar tareas existentes con confirmación previa del usuario.
- **FR-008**: El sistema DEBE permitir marcar una tarea como completada y revertirla a pendiente.
- **FR-009**: El sistema DEBE distinguir visualmente las tareas completadas de las pendientes de forma perceptible sin depender solo del color (p. ej., estilo tipográfico, iconografía o etiqueta de estado).
- **FR-010**: El listado DEBE ordenarse por defecto por prioridad descendente: alta → media → baja.
- **FR-011**: El sistema DEBE persistir todas las tareas entre sesiones del mismo navegador y dispositivo.
- **FR-012**: El sistema DEBE mostrar mensajes de validación claros cuando faltan campos obligatorios o la acción no puede completarse.
- **FR-013**: El sistema DEBE mostrar un estado vacío informativo cuando no existen tareas registradas.
- **FR-014**: El sistema NO DEBE requerir autenticación ni identificación de usuario para acceder a la funcionalidad.

### Key Entities

- **Tarea**: Representa una acción pendiente o completada del usuario. Atributos: identificador único, descripción (texto obligatorio), fecha de vencimiento (opcional), prioridad (alta | media | baja; valor predeterminado al crear: media), estado (pendiente | completada), fecha de creación (para orden secundario consistente dentro de la misma prioridad).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Un usuario puede abrir la modal, crear una tarea válida y verla en el listado en menos de 30 segundos desde que abre la aplicación.
- **SC-002**: El 100% de los intentos de guardado sin descripción muestran feedback de validación comprensible sin perder los demás datos ya ingresados (prioridad, fecha opcional, etc.).
- **SC-003**: El 95% de los usuarios identifican correctamente el estado completado vs. pendiente en una prueba de reconocimiento visual de 5 segundos por tarea.
- **SC-004**: En un listado con al menos 3 tareas de distinta prioridad, el orden mostrado coincide con alta → media → baja en el 100% de las visualizaciones.
- **SC-007**: El 95% de los usuarios identifican correctamente el nivel de prioridad (alta, media, baja) en una prueba de reconocimiento visual de 5 segundos por tarea, gracias al color representativo y la etiqueta textual.
- **SC-005**: Las tareas registradas permanecen disponibles tras cerrar y reabrir el navegador en el mismo dispositivo, con tasa de recuperación del 100% en condiciones normales de almacenamiento.
- **SC-006**: Un usuario puede completar el flujo crear → editar → marcar completada → eliminar una tarea sin asistencia externa en una sola sesión.

## Assumptions

- La aplicación es de un solo usuario por navegador/dispositivo; no hay cuentas ni sincronización entre dispositivos.
- La persistencia es local en el navegador del usuario; no existe servidor ni backend.
- No se requiere autenticación ni control de acceso.
- La creación y edición de tareas se realiza en ventanas modales; el listado es la vista principal de la aplicación.
- Cada nivel de prioridad tiene un color representativo fijo: alta = rojo, media = amarillo/ámbar, baja = verde; el color nunca sustituye a la etiqueta textual.
- La eliminación de tareas requiere confirmación explícita para evitar borrados accidentales.
- La fecha de vencimiento es opcional; solo la descripción es obligatoria al crear o editar una tarea.
- Al crear una tarea nueva, la prioridad predeterminada es **media**; en edición se conserva la prioridad existente de la tarea.
- Las fechas de vencimiento pasadas están permitidas; pueden indicarse visualmente como vencidas.
- Dentro de la misma prioridad, el orden secundario es por fecha de creación (más recientes al final o al inicio de forma consistente).
- No se incluye en esta versión: categorías, etiquetas, subtareas, recordatorios, búsqueda, filtros avanzados ni exportación de datos.
- El idioma de la interfaz y los mensajes será español, acorde al contexto del proyecto.
