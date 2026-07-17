# US-001: Gestión completa de tareas

**Estado**: Ready
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16

## Descripción

**COMO** usuario de la aplicación
**QUIERO** gestionar mis tareas de forma completa (registrarlas, listarlas, editarlas, eliminarlas, marcarlas como completadas y verlas ordenadas por prioridad)
**PARA** organizar y priorizar mi trabajo diario sin depender de un backend ni de autenticación

## Fuera de alcance

- Autenticación o gestión de usuarios: la aplicación es de un único usuario local, sin login.
- Sincronización con un backend o servicio remoto: toda la persistencia es local al navegador (localStorage).
- Multiusuario o colaboración entre distintos dispositivos o navegadores: los datos no se comparten ni se sincronizan.

## Reglas de negocio

- **BR-01:** Toda tarea DEBE tener una descripción obligatoria. → verificado por AC-002
- **BR-02:** Toda tarea DEBE tener una fecha de vencimiento obligatoria. → verificado por AC-003
- **BR-03:** La prioridad de una tarea DEBE ser únicamente uno de los siguientes valores: alta, media o baja. → verificado por AC-004
- **BR-04:** Las tareas completadas DEBEN distinguirse visualmente de las pendientes. → verificado por AC-008
- **BR-05:** El listado de tareas DEBE ordenarse por prioridad de forma predeterminada (alta → media → baja). → verificado por AC-009
- **BR-06:** La persistencia de las tareas DEBE realizarse mediante localStorage, sin backend. → verificado por AC-010

## Referencias

- Ninguna por ahora. No hay mockups ni Figma; el equipo de desarrollo define el diseño visual siguiendo el sistema de componentes del proyecto (Base UI + Tailwind CSS, ver [ADR-008](../../../adr/ADR-008-tailwindcss.md) y [ADR-009](../../../adr/ADR-009-base-ui.md)).

## Criterios de aceptación

- **AC-001 (Casos de uso):** El sistema DEBE permitir al usuario crear una nueva tarea indicando descripción, fecha de vencimiento y prioridad.
  Casos de prueba: [TC-001](./test-cases/TC-001-crear-tarea-happy.md)
- **AC-002 (Reglas de negocio):** El sistema NO DEBE permitir guardar una tarea sin descripción.
  Casos de prueba: [TC-002](./test-cases/TC-002-crear-tarea-sin-descripcion-error.md) · [TC-003](./test-cases/TC-003-descripcion-solo-espacios-limite.md)
- **AC-003 (Reglas de negocio):** El sistema NO DEBE permitir guardar una tarea sin fecha de vencimiento.
  Casos de prueba: [TC-004](./test-cases/TC-004-crear-tarea-sin-fecha-error.md)
- **AC-004 (Reglas de negocio):** El sistema DEBE restringir el valor de prioridad de una tarea a únicamente alta, media o baja.
  Casos de prueba: [TC-005](./test-cases/TC-005-selector-prioridad-tres-opciones-limite.md) · [TC-006](./test-cases/TC-006-prioridad-invalida-en-almacenamiento-error.md)
- **AC-005 (Casos de uso):** El sistema DEBE permitir al usuario editar la descripción, la fecha de vencimiento y la prioridad de una tarea existente.
  Casos de prueba: [TC-007](./test-cases/TC-007-editar-tarea-happy.md) · [TC-008](./test-cases/TC-008-editar-tarea-descripcion-vacia-error.md)
- **AC-006 (Casos de uso):** El sistema DEBE permitir al usuario eliminar una tarea existente.
  Casos de prueba: [TC-009](./test-cases/TC-009-eliminar-tarea-happy.md) · [TC-010](./test-cases/TC-010-eliminar-ultima-tarea-limite.md)
- **AC-007 (Casos de uso):** El sistema DEBE permitir al usuario marcar una tarea pendiente como completada y revertir ese estado.
  Casos de prueba: [TC-011](./test-cases/TC-011-marcar-tarea-completada-happy.md) · [TC-012](./test-cases/TC-012-desmarcar-tarea-completada-happy.md)
- **AC-008 (Interacción de usuario):** El sistema DEBE distinguir visualmente las tareas completadas de las pendientes en el listado.
  Casos de prueba: [TC-013](./test-cases/TC-013-distincion-visual-completadas-happy.md)
- **AC-009 (Flujos de proceso):** El sistema DEBE ordenar el listado de tareas por prioridad de forma predeterminada, mostrando primero las de prioridad alta, luego media y por último baja.
  Casos de prueba: [TC-014](./test-cases/TC-014-orden-por-prioridad-happy.md) · [TC-015](./test-cases/TC-015-orden-misma-prioridad-limite.md)
- **AC-010 (Fiabilidad):** El sistema DEBE persistir las tareas en el almacenamiento local del navegador (localStorage) de modo que la información se mantenga disponible tras recargar la página.
  Casos de prueba: [TC-016](./test-cases/TC-016-persistencia-tras-recarga-happy.md) · [TC-017](./test-cases/TC-017-localstorage-corrupto-error.md)
- **AC-011 (Casos de uso):** El sistema DEBE listar todas las tareas registradas al cargar la aplicación.
  Casos de prueba: [TC-018](./test-cases/TC-018-listar-tareas-al-cargar-happy.md) · [TC-019](./test-cases/TC-019-listado-vacio-limite.md)

---

## Complejidad sugerida

- **Story points:** 5
- **Justificación:** el alcance abarca un CRUD completo (crear, editar, eliminar, listar), reglas de validación obligatorias, ordenamiento por prioridad y persistencia en localStorage con distinción visual de estado. El riesgo técnico es bajo (sin backend, sin autenticación, sin integraciones externas), pero el volumen de reglas de negocio y de criterios verificables supera el de una tarea trivial.

## Repositorios

- exercise-todo (frontend Next.js — único repositorio del proyecto; no existe backend)

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas         |
| ----- | ------------- | --------- | ------------- |
| **I** | Independiente | Cumple | No depende de otra US ni de sistemas externos; no hay autenticación ni backend que la condicionen. |
| **N** | Negociable    | Cumple | El diseño visual y el detalle de implementación quedan abiertos al equipo de desarrollo; solo las reglas de negocio están cerradas. |
| **V** | Valiosa       | Cumple | Permite al usuario gestionar sus tareas de principio a fin, que es el valor central de la aplicación. |
| **E** | Estimable     | Cumple | Las reglas de negocio y el stack están definidos; se pudo asignar story points con justificación clara. |
| **S** | Pequeña       | Parcial | Agrupa varias capacidades (CRUD, orden, persistencia, estado visual) en una sola historia por tratarse de una aplicación de ejercicio acotada; en un backlog de producto real se recomendaría dividirla. |
| **T** | Testeable     | Cumple | Cada AC-XXX describe un comportamiento observable y verificable. |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado    | Notas |
| ----------------------------------- | --------- | ----- |
| Dependencias listas                | Cumple    | No existen dependencias con otras US ni con sistemas externos. |
| Inputs/outputs claros              | Cumple    | Entradas (descripción, fecha de vencimiento, prioridad) y salidas (listado ordenado, estado visual) están definidas en los AC-XXX. |
| Repositorios definidos             | Cumple    | Único repositorio: exercise-todo. |
| Sin decisiones técnicas pendientes | Cumple    | No hay decisiones técnicas abiertas que condicionen el alcance funcional; el detalle de implementación se define en TK-XXX. |
| Referencias de UI                  | No aplica | Sin mockups ni Figma; el equipo de desarrollo define el diseño visual con el sistema de componentes del proyecto. |
| Sin aclaraciones pendientes        | Cumple    | Sin aclaraciones abiertas con el usuario. |

## Observaciones

Ninguna.
