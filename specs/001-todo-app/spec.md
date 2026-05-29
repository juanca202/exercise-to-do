# Feature Specification: Aplicación de To-Dos

**Feature Branch**: `001-todo-app`

**Created**: 2026-05-29

**Status**: Draft

**Input**: User description: "Implementa una aplicación simple de to-dos que permita gestionar tareas de forma completa. Flujo por pasos. Incluye: registro y listado de tareas, creación y edición de tareas, eliminación de tareas, ordenamiento por prioridad, marcado de tareas como completadas. Reglas: descripción obligatoria, fecha de vencimiento obligatoria, prioridad alta/media/baja, tareas completadas distinguibles visualmente, listado ordenado por prioridad (alta → media → baja) por defecto. Sin autenticación, persistencia local, sin backend."

## Clarifications

### Session 2026-05-29

- Q: ¿Cómo debe presentarse el formulario de creación y edición de tareas? → A: Mediante una ventana modal.
- Q: ¿Cómo debe visualizarse la prioridad en el listado? → A: Resaltada con un color representativo (alta: rojo, media: ámbar, baja: verde).
- Q: ¿Cómo debe confirmarse la eliminación de una tarea? → A: Mediante una ventana modal de confirmación antes de eliminar.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Crear y listar tareas (Priority: P1)

Como usuario, quiero registrar nuevas tareas con descripción, fecha de vencimiento y prioridad, y verlas en un listado ordenado por prioridad, para tener visibilidad inmediata de lo que debo hacer y en qué orden abordarlo.

**Why this priority**: Es el núcleo de la aplicación. Sin crear y ver tareas, ninguna otra funcionalidad aporta valor. Entrega un MVP usable desde el primer incremento.

**Independent Test**: Se puede probar creando varias tareas con distintas prioridades y verificando que aparecen en el listado ordenadas de alta a media a baja, con descripción y fecha visibles.

**Acceptance Scenarios**:

1. **Given** el usuario está en la pantalla principal sin tareas, **When** abre la ventana modal de creación, completa descripción, fecha de vencimiento y prioridad y confirma, **Then** la modal se cierra y la tarea aparece en el listado como pendiente con todos sus datos visibles y la prioridad resaltada con su color representativo.
2. **Given** existen tareas con prioridades alta, media y baja, **When** el usuario abre o actualiza el listado, **Then** las tareas se muestran ordenadas de alta → media → baja de forma predeterminada.
3. **Given** el usuario tiene abierta la ventana modal de creación, **When** deja la descripción vacía o no indica fecha de vencimiento e intenta guardar, **Then** el sistema impide cerrar la modal con cambios inválidos y muestra un mensaje claro indicando qué campo falta.
4. **Given** el usuario tiene abierta la ventana modal de creación, **When** cancela o cierra sin confirmar, **Then** la modal se cierra sin crear la tarea ni modificar el listado.
5. **Given** el usuario intenta asignar prioridad en la modal, **When** selecciona un valor distinto de alta, media o baja, **Then** el sistema no permite ese valor (solo ofrece las tres opciones válidas).
6. **Given** el usuario creó tareas en una sesión anterior, **When** vuelve a abrir la aplicación, **Then** el listado muestra las tareas previamente guardadas con sus colores de prioridad.

---

### User Story 2 - Editar tareas existentes (Priority: P2)

Como usuario, quiero modificar la descripción, fecha de vencimiento o prioridad de una tarea ya creada, para corregir errores o ajustar mis planes sin tener que eliminar y volver a crear la tarea.

**Why this priority**: La edición es esencial para mantener la lista actualizada en el uso diario, pero depende de que existan tareas creadas (P1).

**Independent Test**: Se puede probar creando una tarea, editando sus campos y verificando que los cambios se reflejan en el listado y persisten al recargar.

**Acceptance Scenarios**:

1. **Given** existe una tarea pendiente en el listado, **When** el usuario abre la ventana modal de edición, modifica descripción, fecha o prioridad y guarda, **Then** la modal se cierra, el listado refleja los nuevos valores con el color de prioridad actualizado y mantiene el orden por prioridad.
2. **Given** el usuario tiene abierta la ventana modal de edición, **When** intenta dejar la descripción vacía o quitar la fecha de vencimiento, **Then** el sistema impide guardar y muestra un mensaje de validación dentro de la modal.
3. **Given** el usuario tiene abierta la ventana modal de edición, **When** cancela o cierra sin confirmar, **Then** la modal se cierra sin aplicar cambios a la tarea.
4. **Given** el usuario edita una tarea completada en la modal, **When** guarda cambios válidos, **Then** la tarea conserva su estado completado salvo que el usuario lo cambie explícitamente en una acción de completado (User Story 4).

---

### User Story 3 - Eliminar tareas (Priority: P3)

Como usuario, quiero eliminar tareas que ya no necesito, para mantener mi listado limpio y enfocado en lo relevante.

**Why this priority**: Es una operación frecuente pero no bloquea el uso básico de la app; el usuario puede convivir temporalmente con tareas obsoletas.

**Independent Test**: Se puede probar creando una tarea, eliminándola y verificando que desaparece del listado y no reaparece al recargar.

**Acceptance Scenarios**:

1. **Given** existe una tarea en el listado, **When** el usuario solicita eliminarla y confirma en la ventana modal de confirmación, **Then** la modal se cierra y la tarea desaparece del listado de inmediato.
2. **Given** el usuario eliminó una tarea, **When** recarga o reabre la aplicación, **Then** la tarea eliminada no vuelve a aparecer.
3. **Given** el usuario abrió la ventana modal de confirmación de eliminación, **When** cancela o cierra sin confirmar, **Then** la modal se cierra y la tarea permanece sin cambios en el listado.

---

### User Story 4 - Marcar tareas como completadas (Priority: P4)

Como usuario, quiero marcar tareas como completadas y distinguirlas visualmente de las pendientes, para saber de un vistazo qué ya hice y qué falta por hacer.

**Why this priority**: Mejora la experiencia y el seguimiento del progreso, pero la app sigue siendo funcional sin esta distinción si solo se crean y listan tareas.

**Independent Test**: Se puede probar marcando una tarea como completada y verificando que cambia su apariencia visual respecto a las pendientes, y que el estado persiste al recargar.

**Acceptance Scenarios**:

1. **Given** existe una tarea pendiente, **When** el usuario la marca como completada, **Then** la tarea se distingue visualmente de las pendientes (por ejemplo, estilo atenuado, tachado o indicador de completado).
2. **Given** existe una tarea completada, **When** el usuario la marca nuevamente como pendiente, **Then** recupera la apariencia de tarea pendiente.
3. **Given** hay tareas completadas y pendientes mezcladas, **When** el usuario consulta el listado, **Then** puede identificar claramente cuáles están completadas sin ambigüedad visual.
4. **Given** el usuario marcó tareas como completadas, **When** recarga la aplicación, **Then** el estado completado/pendiente se conserva.

---

### Edge Cases

- ¿Qué ocurre si el usuario introduce una fecha de vencimiento en el pasado? Se permite guardar la tarea; la fecha pasada se muestra tal cual (no se bloquea ni se corrige automáticamente).
- ¿Qué ocurre si dos tareas tienen la misma prioridad? Se mantienen agrupadas bajo esa prioridad; dentro del grupo, el orden es el de creación (más reciente al final o al inicio de forma consistente).
- ¿Qué ocurre si no hay tareas? El listado muestra un estado vacío claro invitando a crear la primera tarea.
- ¿Qué ocurre si la descripción es muy larga? Se muestra completa o truncada con forma de ver el texto completo, sin perder datos al guardar.
- ¿Qué ocurre si el almacenamiento local del navegador está lleno o no disponible? Se informa al usuario con un mensaje comprensible y la acción no se pierde silenciosamente.
- ¿Qué ocurre al eliminar la última tarea? El listado vuelve al estado vacío.
- ¿Qué ocurre si el usuario cierra la modal de creación/edición con cambios sin guardar? Los cambios se descartan y la tarea permanece en su estado anterior.
- ¿Qué ocurre si el usuario cancela la modal de eliminación? La tarea no se elimina y el listado permanece intacto.
- ¿Qué ocurre si una tarea completada conserva su color de prioridad? El color de prioridad permanece visible; la distinción de completada se superpone mediante el estilo de tarea completada (p. ej. atenuado o tachado).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: El sistema DEBE permitir crear tareas con descripción obligatoria, fecha de vencimiento obligatoria y prioridad.
- **FR-002**: El sistema DEBE restringir la prioridad a exactamente tres valores: alta, media y baja.
- **FR-003**: El sistema DEBE mostrar un listado de todas las tareas con descripción, fecha de vencimiento, prioridad y estado (pendiente/completada).
- **FR-004**: El listado DEBE ordenarse por prioridad de forma predeterminada: alta primero, luego media, luego baja.
- **FR-005**: El sistema DEBE permitir editar la descripción, fecha de vencimiento y prioridad de una tarea existente, aplicando las mismas validaciones que en la creación.
- **FR-006**: El sistema DEBE permitir eliminar tareas del listado, mostrando previamente una ventana modal de confirmación con acciones explícitas de confirmar y cancelar.
- **FR-007**: El sistema DEBE permitir marcar tareas como completadas y revertirlas a pendientes.
- **FR-008**: Las tareas completadas DEBEN distinguirse visualmente de las pendientes de forma perceptible para el usuario.
- **FR-009**: El sistema DEBE persistir todas las tareas (incluido estado completado) entre sesiones en el mismo navegador y dispositivo.
- **FR-010**: El sistema DEBE validar campos obligatorios antes de guardar y mostrar mensajes claros cuando falte información.
- **FR-011**: El sistema NO DEBE requerir autenticación ni identificación de usuario para usar la aplicación.
- **FR-012**: El sistema DEBE mostrar un estado vacío informativo cuando no existan tareas.
- **FR-013**: La creación y edición de tareas DEBEN realizarse en una ventana modal que concentre el formulario (descripción, fecha de vencimiento, prioridad) y acciones de guardar/cancelar.
- **FR-014**: Cada prioridad DEBE resaltarse visualmente con un color representativo en el listado: alta (rojo), media (ámbar), baja (verde).
- **FR-015**: Al cancelar o cerrar la modal sin confirmar, el sistema NO DEBE aplicar cambios ni crear tareas parciales.

### Key Entities _(include if feature involves data)_

- **Tarea**: Representa una acción pendiente o completada. Atributos: identificador único, descripción (texto obligatorio), fecha de vencimiento (fecha obligatoria), prioridad (alta | media | baja), estado (pendiente | completada), fecha de creación (para orden secundario dentro de la misma prioridad).

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Un usuario nuevo puede crear su primera tarea y verla en el listado en menos de 1 minuto sin instrucciones externas.
- **SC-002**: El 100% de las tareas creadas con datos válidos aparecen en el listado ordenadas correctamente por prioridad (alta → media → baja).
- **SC-003**: Tras recargar la aplicación, el 100% de las tareas previamente guardadas reaparecen con su estado y datos intactos.
- **SC-004**: Un usuario puede identificar tareas completadas vs. pendientes en el listado en menos de 3 segundos sin leer el texto completo de cada ítem.
- **SC-005**: Las operaciones de crear, editar, eliminar y marcar completada se completan con retroalimentación visible al usuario en menos de 2 segundos en condiciones normales de uso.
- **SC-006**: El 100% de los intentos de guardar una tarea sin descripción o sin fecha de vencimiento son rechazados con un mensaje comprensible.
- **SC-007**: Un usuario puede identificar la prioridad de cada tarea en el listado por su color representativo en menos de 2 segundos sin leer la etiqueta textual de prioridad.

## Assumptions

- La aplicación es de un solo usuario por navegador/dispositivo; no hay cuentas ni sincronización entre dispositivos.
- No se requiere autenticación ni control de acceso.
- La persistencia es local en el navegador del usuario; los datos no se comparten con un servidor.
- No existe backend ni API externa; toda la lógica y el almacenamiento ocurren en el cliente.
- Una sola pantalla o vista principal es suficiente para el flujo completo (crear, listar, editar, eliminar, completar).
- La fecha de vencimiento acepta cualquier fecha calendario válida, incluidas fechas pasadas.
- El idioma de la interfaz será español, acorde al contexto del proyecto.
- No se requieren categorías, etiquetas, subtareas ni recordatorios en esta versión.
- Los colores de prioridad siguen convención semáforo: rojo = alta urgencia, ámbar = atención moderada, verde = baja urgencia.
- Crear, editar y eliminar usan ventanas modales; la modal de edición precarga los datos actuales de la tarea seleccionada y la modal de eliminación requiere confirmación explícita antes de borrar.
