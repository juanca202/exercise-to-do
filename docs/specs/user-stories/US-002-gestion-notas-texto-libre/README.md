# US-002: Gestión de notas de texto libre

**Estado**: Ready
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16

## Descripción

**COMO** usuario de la aplicación
**QUIERO** guardar notas de texto libre en una sección Notes, accesible junto a To-do, y poder crearlas, editarlas y eliminarlas
**PARA** registrar información sin estructura ni campos obligatorios, de forma rápida y sin depender de un backend ni de autenticación

## Fuera de alcance

- Formato de texto enriquecido (negritas, listas, títulos, etc.): el área de texto es de texto plano.
- Búsqueda, filtrado o categorización de notas (etiquetas, carpetas, favoritos).
- Autenticación o gestión de usuarios: la aplicación es de un único usuario local, sin login (mismo alcance que [US-001](../US-001-gestion-completa-tareas/README.md)).
- Sincronización con un backend o servicio remoto: toda la persistencia es local al navegador (localStorage).
- Compartir notas entre distintos dispositivos, navegadores o usuarios.

## Reglas de negocio

- **BR-01:** La navegación principal DEBE ofrecer únicamente dos opciones: To-do y Notes. → verificado por AC-001
- **BR-02:** El contenido de una nota DEBE consistir únicamente en texto libre, sin campos adicionales (sin título, sin categorías, sin metadatos editables). → verificado por AC-004, AC-005
- **BR-03:** El sistema NO DEBE exigir contenido mínimo obligatorio para guardar una nota. → verificado por AC-011
- **BR-04:** La persistencia de las notas DEBE realizarse mediante localStorage, sin backend, de forma consistente con el resto de la aplicación. → verificado por AC-010

## Referencias

- Ninguna por ahora. No hay mockups ni Figma; el equipo de desarrollo define el diseño visual siguiendo el sistema de componentes del proyecto (Base UI + Tailwind CSS, ver [ADR-008](../../../adr/ADR-008-tailwindcss.md) y [ADR-009](../../../adr/ADR-009-base-ui.md)).

## Criterios de aceptación

- **AC-001 (Interacción de usuario):** El sistema DEBE mostrar en la navegación principal únicamente las opciones To-do y Notes.
  Casos de prueba: [TC-001](./test-cases/TC-001-navegacion-principal-todo-notes-happy.md)
- **AC-002 (Casos de uso):** El sistema DEBE permitir al usuario acceder a la sección Notes y ver el listado de notas registradas.
  Casos de prueba: [TC-002](./test-cases/TC-002-listado-notas-con-registros-happy.md) · [TC-003](./test-cases/TC-003-listado-notas-vacio-limite.md)
- **AC-003 (Casos de uso):** El sistema DEBE permitir al usuario crear una nueva nota.
  Casos de prueba: [TC-004](./test-cases/TC-004-crear-nota-happy.md)
- **AC-004 (Interacción de usuario):** La creación de una nota DEBE mostrar únicamente un área de texto libre para ingresar el contenido.
  Casos de prueba: [TC-005](./test-cases/TC-005-creacion-nota-solo-textarea-happy.md)
- **AC-005 (Interacción de usuario):** La edición de una nota DEBE mostrar únicamente un área de texto libre, precargada con el contenido actual de la nota.
  Casos de prueba: [TC-006](./test-cases/TC-006-edicion-nota-textarea-precargada-happy.md)
- **AC-006 (Casos de uso):** El sistema DEBE permitir al usuario editar el contenido de una nota existente y guardar los cambios.
  Casos de prueba: [TC-007](./test-cases/TC-007-editar-nota-happy.md)
- **AC-007 (Casos de uso):** El sistema DEBE permitir al usuario eliminar una nota existente.
  Casos de prueba: [TC-008](./test-cases/TC-008-eliminar-nota-happy.md) · [TC-009](./test-cases/TC-009-eliminar-ultima-nota-limite.md)
- **AC-008 (Flujos de proceso):** Al guardar una nota nueva o los cambios de una nota editada, el sistema DEBE reflejar dicha nota en el listado de forma inmediata.
  Casos de prueba: [TC-010](./test-cases/TC-010-guardar-nota-nueva-reflejo-listado-happy.md) · [TC-011](./test-cases/TC-011-guardar-nota-editada-reflejo-listado-happy.md)
- **AC-009 (Flujos de proceso):** Al eliminar una nota, el sistema DEBE removerla del listado de forma inmediata.
  Casos de prueba: [TC-012](./test-cases/TC-012-eliminar-nota-reflejo-listado-happy.md)
- **AC-010 (Fiabilidad):** El sistema DEBE persistir las notas en el almacenamiento local del navegador (localStorage), de modo que la información se mantenga disponible tras recargar la página.
  Casos de prueba: [TC-013](./test-cases/TC-013-persistencia-tras-recarga-happy.md) · [TC-014](./test-cases/TC-014-localstorage-corrupto-error.md)
- **AC-011 (Reglas de negocio):** El sistema NO DEBE exigir contenido mínimo obligatorio para guardar una nota (PUEDE guardarse con el área de texto vacía).
  Casos de prueba: [TC-015](./test-cases/TC-015-crear-nota-contenido-vacio-limite.md) · [TC-016](./test-cases/TC-016-editar-nota-contenido-vacio-limite.md)
- **AC-012 (Casos de uso):** El sistema DEBE listar todas las notas registradas al ingresar a la sección Notes.
  Casos de prueba: [TC-017](./test-cases/TC-017-listar-todas-notas-al-ingresar-happy.md)

---

## Complejidad sugerida

- **Story points:** 3
- **Justificación:** CRUD acotado a un único campo de texto libre (crear, listar, editar, eliminar), sin reglas de validación de formato, sin ordenamiento ni estados adicionales. Agrega una opción a la navegación principal, que hoy no existe como componente (US-001 renderiza la vista de tareas directamente), por lo que implica introducirla. Riesgo técnico bajo: sin backend, sin autenticación, sin integraciones externas.

## Repositorios

- exercise-todo (frontend Next.js — único repositorio del proyecto; no existe backend)

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas         |
| ----- | ------------- | --------- | ------------- |
| **I** | Independiente | Cumple | No depende de otra US incompleta; [US-001](../US-001-gestion-completa-tareas/README.md) (tareas) ya está en `Ready` e implementada. Comparte la navegación principal con To-do, pero no depende de trabajo pendiente de esa historia. |
| **N** | Negociable    | Cumple | El diseño visual del listado y del formulario de nota queda abierto al equipo de desarrollo; solo las reglas de negocio (navegación, contenido libre, persistencia) están cerradas. |
| **V** | Valiosa       | Cumple | Da al usuario un espacio para registrar información libre, sin la rigidez de las tareas estructuradas de To-do. |
| **E** | Estimable     | Cumple | Las reglas de negocio y el stack están definidos; se pudo asignar story points con justificación clara. |
| **S** | Pequeña       | Cumple | El alcance es un CRUD simple de un único campo de texto libre, sin reglas de validación complejas ni ordenamiento. |
| **T** | Testeable     | Cumple | Cada AC-XXX describe un comportamiento observable y verificable. |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado    | Notas |
| ----------------------------------- | --------- | ----- |
| Dependencias listas                | Cumple    | No hay dependencias con otras US o sistemas externos; comparte la navegación principal con US-001, ya implementada. |
| Inputs/outputs claros              | Cumple    | Entrada (contenido de texto libre) y salidas (listado de notas, reflejo inmediato de guardado/eliminación) están definidas en los AC-XXX. |
| Repositorios definidos             | Cumple    | Único repositorio: exercise-todo. |
| Sin decisiones técnicas pendientes | Cumple    | No hay decisiones técnicas abiertas que condicionen el alcance funcional; el detalle de implementación se define en TK-XXX. |
| Referencias de UI                  | No aplica | Sin mockups ni Figma; el equipo de desarrollo define el diseño visual con el sistema de componentes del proyecto. |
| Sin aclaraciones pendientes        | Cumple    | Sin aclaraciones abiertas con el usuario; ver Observaciones para las asunciones tomadas por defecto. |

## Observaciones

- El requerimiento no especifica una regla de contenido mínimo para guardar una nota; se asumió que el área de texto PUEDE guardarse vacía (BR-03/AC-011), consistente con la idea de "texto libre". Si se requiere una validación distinta, ajustar BR-03 y AC-011.
- El requerimiento no menciona el mecanismo de persistencia; se asumió localStorage sin backend, por consistencia con [US-001](../US-001-gestion-completa-tareas/README.md) y con la arquitectura actual del proyecto (repositorio único, sin backend).
