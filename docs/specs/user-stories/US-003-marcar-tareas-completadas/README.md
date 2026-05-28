# US-003: Marcar tareas como completadas

- Estado: Ready
- Fecha de creación: 2026-05-28
- Última actualización: 2026-05-28

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** marcar y desmarcar tareas como completadas con una distinción visual clara en el listado  
**PARA** distinguir lo ya hecho de lo pendiente sin perder el historial de mis tareas

## Referencias

- **Diseño / prototipo:** Ninguna externa; estados completado/pendiente según [`DESIGN.md`](../../../../DESIGN.md).
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — El usuario DEBE poder marcar una tarea como completada y revertirla a pendiente.
- **BR-02** — Las tareas completadas DEBEN distinguirse visualmente de las pendientes en el listado.
- **BR-03** — Marcar o desmarcar una tarea NO DEBE eliminarla ni alterar su título ni su prioridad.
- **BR-04** — El estado completado DEBE persistir entre sesiones del navegador junto con el resto de datos de la tarea.
- **BR-05** — Las tareas completadas DEBEN permanecer en el listado (no se exige ocultarlas); el orden por prioridad de **US-002** DEBE seguir aplicándose.

### Escenarios

```gherkin
Escenario: SC-01 - Marcar tarea como completada
DADO que existe una tarea pendiente visible en el listado
CUANDO el usuario la marca como completada
ENTONCES la tarea DEBE mostrarse con la distinción visual de completada
Y DEBE conservar su título y prioridad
```

```gherkin
Escenario: SC-02 - Revertir a pendiente
DADO que existe una tarea marcada como completada
CUANDO el usuario la marca nuevamente como pendiente
ENTONCES la tarea DEBE perder la distinción visual de completada
Y DEBE conservar su título y prioridad
```

```gherkin
Escenario: SC-03 - Persistencia del estado completado
DADO que el usuario marcó al menos una tarea como completada
CUANDO recarga la página en el mismo navegador
ENTONCES las tareas completadas DEBEN seguir mostrándose como completadas
Y las pendientes como pendientes
```

```gherkin
Escenario: SC-04 - Completada no elimina ni cambia prioridad
DADO que existe una tarea con título "Informe" y prioridad "alta"
CUANDO el usuario la marca como completada
ENTONCES la tarea sigue en el listado con título "Informe" y prioridad "alta"
Y NO es eliminada
```

## Complejidad sugerida

- **Story points:** 2
- **Justificación:** Toggle de estado, estilos de completado y persistencia del flag; bajo acoplamiento si **US-001** y **US-002** existen.

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                 |
| ----- | ------------- | --------- | --------------------------------------------------------------------- |
| **I** | Independiente | Parcial   | Requiere listado y modelo de **US-001**; compatible con orden de **US-002**. |
| **N** | Negociable    | Cumple    | Estilo concreto de completado negociable dentro de **BR-02**.         |
| **V** | Valiosa       | Cumple    | Cierra el flujo «marcado de completadas» del requerimiento.           |
| **E** | Estimable     | Cumple    | Comportamiento acotado y testeable en UI.                               |
| **S** | Pequeña       | Cumple    | Incremento reducido.                                                  |
| **T** | Testeable     | Cumple    | Verificable por estilos, toggle y recarga.                            |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | **US-001** obligatoria; **US-002** recomendada para validar **BR-05** en integración. |
| Inputs/outputs claros              | Cumple     | Entrada: acción marcar/desmarcar; salida: listado con estados visibles y persistidos.  |
| Unidades de trabajo definidas      | Cumple     | `frontend` en `docs/specs/work-units.md`.                                              |
| Sin decisiones técnicas pendientes | Cumple     | Flag `completed` en entidad; ver `technical-docs/todo-entity.md`.                    |
| Referencias de UI                  | Parcial    | Sin Figma; guía en `DESIGN.md`.                                                        |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- Prerrequisito funcional: **US-001** implementada.
- Para validar orden con tareas completadas, conviene tener **US-002** integrada; no bloquea el toggle ni la distinción visual.
