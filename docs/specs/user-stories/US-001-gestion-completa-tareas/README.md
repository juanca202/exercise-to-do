# US-001: Gestión completa de tareas personales

Estado: Ready
Fecha de creación: 2026-07-06
Última actualización: 2026-07-06

## Descripción

**COMO** usuario de la aplicación
**QUIERO** registrar, listar, crear, editar, eliminar, ordenar por prioridad y marcar como completadas mis tareas
**PARA** organizar y dar seguimiento a mis pendientes de forma autónoma, sin depender de un backend ni de autenticación

## Reglas de negocio

- **BR-01:** Toda tarea DEBE tener una descripción obligatoria. → verificado por AC-001
- **BR-02:** Toda tarea DEBE tener una fecha de vencimiento obligatoria. → verificado por AC-002
- **BR-03:** La prioridad de una tarea DEBE ser únicamente uno de los valores: alta, media o baja. → verificado por AC-003
- **BR-04:** Las tareas completadas DEBEN distinguirse visualmente de las pendientes. → verificado por AC-008
- **BR-05:** El listado de tareas DEBE ordenarse de forma predeterminada por prioridad, en el orden alta → media → baja. → verificado por AC-009
- **BR-06:** La aplicación NO DEBE requerir autenticación. → verificado por AC-011
- **BR-07:** La persistencia de las tareas DEBE realizarse mediante localStorage, sin backend. → verificado por AC-010

## Referencias

- **Sistema de diseño:** [DESIGN.md](../../../../DESIGN.md) — Tailwind CSS + Base UI ([ADR-002](../../../adr/ADR-002-uso-de-tailwind-css.md), [ADR-003](../../../adr/ADR-003-uso-de-base-ui.md)); no se requieren mockups específicos por historia, el equipo tiene libertad de diseño dentro de este sistema.
- Ninguna otra referencia por ahora.

## Criterios de aceptación

- **AC-001 (Reglas de negocio):** El sistema DEBE exigir una descripción no vacía al crear o editar una tarea, e IMPEDIR guardarla si el campo está vacío.
  Casos de prueba: [TC-001](./test-cases/TC-001-descripcion-vacia-error.md) · [TC-002](./test-cases/TC-002-descripcion-un-caracter-limite.md)
- **AC-002 (Reglas de negocio):** El sistema DEBE exigir una fecha de vencimiento al crear o editar una tarea, e IMPEDIR guardarla si el campo está vacío.
  Casos de prueba: [TC-003](./test-cases/TC-003-fecha-vencimiento-vacia-error.md) · [TC-004](./test-cases/TC-004-fecha-vencimiento-hoy-limite.md)
- **AC-003 (Reglas de negocio):** El sistema DEBE restringir el campo prioridad a únicamente uno de los valores: alta, media o baja.
  Casos de prueba: [TC-005](./test-cases/TC-005-prioridad-valores-validos-happy.md) · [TC-006](./test-cases/TC-006-prioridad-valor-invalido-error.md)
- **AC-004 (Casos de uso):** El sistema DEBE permitir crear una tarea nueva indicando descripción, fecha de vencimiento y prioridad, y agregarla al listado tras guardarla.
  Casos de prueba: [TC-007](./test-cases/TC-007-creacion-tarea-happy.md)
- **AC-005 (Casos de uso):** El sistema DEBE permitir editar la descripción, la fecha de vencimiento y la prioridad de una tarea existente, y reflejar los cambios en el listado.
  Casos de prueba: [TC-008](./test-cases/TC-008-edicion-tarea-happy.md) · [TC-009](./test-cases/TC-009-edicion-descripcion-vacia-error.md) · [TC-010](./test-cases/TC-010-edicion-fecha-hoy-limite.md)
- **AC-006 (Casos de uso):** El sistema DEBE permitir eliminar una tarea existente del listado de forma permanente.
  Casos de prueba: [TC-011](./test-cases/TC-011-eliminacion-tarea-happy.md) · [TC-012](./test-cases/TC-012-eliminacion-unica-tarea-limite.md)
- **AC-007 (Casos de uso):** El sistema DEBE permitir marcar una tarea como completada y revertir ese estado a pendiente.
  Casos de prueba: [TC-013](./test-cases/TC-013-marcar-completada-happy.md) · [TC-014](./test-cases/TC-014-revertir-completada-happy.md)
- **AC-008 (Interacción de usuario):** El sistema DEBE distinguir visualmente las tareas completadas de las pendientes en el listado.
  Casos de prueba: [TC-015](./test-cases/TC-015-distincion-visual-completadas-happy.md)
- **AC-009 (Flujos de proceso):** El sistema DEBE mostrar, al cargar la aplicación, el listado completo de tareas ordenado de forma predeterminada por prioridad en el orden alta → media → baja.
  Casos de prueba: [TC-016](./test-cases/TC-016-orden-listado-prioridad-happy.md) · [TC-017](./test-cases/TC-017-orden-estable-misma-prioridad-limite.md)
- **AC-010 (Procesamiento de datos):** El sistema DEBE persistir en localStorage cada creación, edición, eliminación y cambio de estado (completada/pendiente) de una tarea, de manera que los datos se conserven entre recargas de la página.
  Casos de prueba: [TC-018](./test-cases/TC-018-persistencia-tras-recarga-happy.md) · [TC-019](./test-cases/TC-019-localstorage-corrupto-error.md) · [TC-020](./test-cases/TC-020-primera-visita-sin-datos-limite.md)
- **AC-011 (Seguridad):** El sistema NO DEBE requerir ningún mecanismo de autenticación ni identificación de usuario para acceder o gestionar las tareas.
  Casos de prueba: [TC-021](./test-cases/TC-021-acceso-sin-autenticacion-happy.md)

### Escenarios de comportamiento

```gherkin
Escenario: SC-01 - Intento de creación sin descripción
DADO que el usuario está creando una tarea nueva
CUANDO deja el campo descripción vacío e intenta guardar
ENTONCES el sistema DEBE impedir el guardado y señalar el campo como obligatorio

Escenario: SC-02 - Orden predeterminado del listado
DADO que existen tareas con prioridad alta, media y baja
CUANDO el usuario abre el listado de tareas
ENTONCES el sistema DEBE mostrarlas ordenadas primero las de prioridad alta, luego media, luego baja

Escenario: SC-03 - Persistencia tras recarga
DADO que el usuario creó, editó o completó tareas
CUANDO recarga la página del navegador
ENTONCES el sistema DEBE mostrar el mismo estado de las tareas que tenía antes de recargar, leído desde localStorage
```

---

## Complejidad sugerida

- **Story points:** 5
- **Justificación:** agrupa varios flujos (creación, edición, eliminación, ordenamiento, marcado de completadas) junto con validaciones obligatorias y una capa de persistencia en localStorage. No hay riesgo de integración externa (sin backend, sin autenticación) ni incertidumbre de diseño (DESIGN.md ya define el sistema visual), lo que acota el riesgo pese al número de capacidades.

## Repositorios

- exercise-todo (único repositorio, aplicación frontend sin backend)

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas         |
| ----- | ------------- | --------- | ------------- |
| **I** | Independiente | Cumple    | No depende de otra US ni de sistemas externos; es autocontenida (sin backend, sin autenticación). |
| **N** | Negociable    | Cumple    | El detalle visual queda abierto dentro del sistema de diseño (Tailwind + Base UI); las reglas de negocio son fijas pero la solución técnica no está prescrita. |
| **V** | Valiosa       | Cumple    | Entrega la gestión completa de tareas (CRUD, orden, completado) que el usuario necesita de punta a punta. |
| **E** | Estimable     | Cumple    | Las reglas de negocio y restricciones técnicas (sin backend, localStorage) son suficientes para estimar. |
| **S** | Pequeña       | Parcial   | Agrupa varias capacidades (creación/edición, eliminación, orden, completado, persistencia); cabe en un incremento razonable pero se sugiere dividirla en tareas técnicas más pequeñas en `work-plan`. |
| **T** | Testeable     | Cumple    | Los `AC-XXX` son verificables objetivamente (validaciones, orden resultante, persistencia tras recarga). |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado  | Notas                                                                        |
| ----------------------------------- | ------- | ----------------------------------------------------------------------------- |
| Dependencias listas                | Cumple  | No hay dependencias con otras US ni sistemas externos; no requiere backend ni autenticación. |
| Inputs/outputs claros              | Cumple  | Entradas (descripción, fecha de vencimiento, prioridad) y salidas (listado ordenado, persistencia en localStorage) están definidas. |
| Repositorios definidos             | Cumple  | exercise-todo (único repositorio frontend). |
| Sin decisiones técnicas pendientes | Cumple  | Stack y persistencia ya definidos (ADRs del proyecto + indicación explícita de usar localStorage). |
| Referencias de UI                  | Cumple  | DESIGN.md define el sistema de diseño (Tailwind + Base UI) a aplicar; no se requieren mockups específicos por historia. |
| Sin aclaraciones pendientes        | Cumple  | Ninguna aclaración pendiente tras la ronda de preguntas inicial. |

## Observaciones

- Ninguna dependencia ni prerrequisito pendiente.
- Ninguna aclaración pendiente.
- Se sugiere, al planificar (`work-plan`), dividir la historia en tareas técnicas por capacidad (alta de tarea y edición, eliminación, orden y marcado de completadas, capa de persistencia en localStorage) dado que INVEST marca la dimensión **S** como Parcial.
- Idioma de preferencia (español) persistido en `.agents/MEMORY.md` para futuras historias, tareas y work items.
