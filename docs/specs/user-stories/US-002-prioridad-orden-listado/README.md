# US-002: Prioridad y orden del listado

- Estado: Ready
- Fecha de creación: 2026-05-28
- Última actualización: 2026-05-28

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** que el listado muestre la prioridad de cada tarea y se ordene de forma predeterminada de mayor a menor urgencia  
**PARA** atender primero lo más importante sin tener que reordenar manualmente

## Referencias

- **Diseño / prototipo:** Ninguna externa; aplicar indicadores de prioridad según [`DESIGN.md`](../../../../DESIGN.md).
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — El listado DEBE ordenarse por prioridad de forma predeterminada en el orden **alta → media → baja**.
- **BR-02** — Entre tareas de la misma prioridad, el orden DEBE mantenerse estable según el orden de creación (más antigua primero).
- **BR-03** — Cada ítem del listado DEBE mostrar de forma visible la prioridad asignada (**alta**, **media** o **baja**).
- **BR-04** — Cuando una tarea cambie de prioridad (creación o edición), el listado DEBE reordenarse automáticamente según **BR-01** sin acción adicional del usuario.
- **BR-05** — La prioridad de cada tarea DEBE seguir limitándose a **alta**, **media** o **baja** (coherente con **US-001**).

### Escenarios

```gherkin
Escenario: SC-01 - Orden predeterminado por prioridad
DADO que existen tareas con prioridades "baja", "alta" y "media" creadas en ese orden
CUANDO el usuario consulta el listado
ENTONCES las tareas DEBEN aparecer en el orden: primero "alta", luego "media" y después "baja"
```

```gherkin
Escenario: SC-02 - Prioridad visible en cada ítem
DADO que existe una tarea con prioridad "media" en el listado
CUANDO el usuario consulta el listado
ENTONCES el ítem DEBE mostrar de forma visible la prioridad "media"
```

```gherkin
Escenario: SC-03 - Reorden al cambiar prioridad en edición
DADO que existen tareas "A" con prioridad "baja" y "B" con prioridad "alta"
CUANDO el usuario edita "A" y cambia su prioridad a "alta"
Y confirma los cambios
ENTONCES "A" DEBE aparecer antes que las tareas de prioridad "media" y "baja"
Y el orden relativo entre tareas de prioridad "alta" DEBE respetar **BR-02**
```

```gherkin
Escenario: SC-04 - Orden estable dentro de la misma prioridad
DADO que el usuario creó primero la tarea "Uno" y después "Dos", ambas con prioridad "media"
CUANDO consulta el listado
ENTONCES "Uno" DEBE aparecer antes que "Dos"
```

```gherkin
Escenario: SC-05 - Persistencia del orden tras recarga
DADO que el listado muestra tareas ordenadas según alta → media → baja
CUANDO el usuario recarga la página en el mismo navegador
ENTONCES el listado DEBE conservar el mismo orden por prioridad
```

## Complejidad sugerida

- **Story points:** 3
- **Justificación:** Lógica de ordenamiento y presentación de prioridad sobre el modelo ya existente; riesgo bajo si **US-001** está integrada.

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                 |
| ----- | ------------- | --------- | --------------------------------------------------------------------- |
| **I** | Independiente | Parcial   | Requiere tareas y prioridad de **US-001**; aporta valor de orden sin US-003. |
| **N** | Negociable    | Cumple    | Forma de mostrar prioridad (badge, color) negociable dentro de **BR-03**. |
| **V** | Valiosa       | Cumple    | Cubre el criterio de ordenamiento del requerimiento.                  |
| **E** | Estimable     | Cumple    | Reglas de orden deterministas y escenarios acotados.                  |
| **S** | Pequeña       | Cumple    | Incremento acotado a listado y reglas de orden.                       |
| **T** | Testeable     | Cumple    | Verificable por orden visible en UI y tras recarga.                   |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | Depende de **US-001** (modelo y listado base).                                         |
| Inputs/outputs claros              | Cumple     | Entrada: prioridad en tareas; salida: listado ordenado y etiquetado.                   |
| Unidades de trabajo definidas      | Cumple     | `frontend` en `docs/specs/work-units.md`.                                              |
| Sin decisiones técnicas pendientes | Cumple     | Orden en cliente; sin backend.                                                         |
| Referencias de UI                  | Parcial    | Sin Figma; guía en `DESIGN.md`.                                                        |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- Prerrequisito funcional: **US-001** en estado implementado o al menos modelo y listado disponibles.
- No introduce el estado completado; ver **US-003**.
