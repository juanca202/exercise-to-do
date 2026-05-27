# US-002: Prioridad y orden del listado

- Estado: Ready
- Fecha de creación: 2026-05-27
- Última actualización: 2026-05-27

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** que mis tareas se muestren ordenadas por prioridad de forma predeterminada  
**PARA** identificar de un vistazo qué pendientes requieren atención antes que el resto

## Referencias

- **Diseño / prototipo:** Ninguna externa; la prioridad DEBE ser perceptible en cada ítem del listado (etiqueta, badge o texto equivalente).
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — El listado DEBE ordenarse por prioridad de forma predeterminada en el orden **alta → media → baja**.
- **BR-02** — Cada ítem del listado DEBE mostrar de forma visible la prioridad asignada a la tarea.
- **BR-03** — Cuando una tarea cambie de prioridad, el listado DEBE reordenarse automáticamente según la regla de **BR-01** sin acción adicional del usuario.
- **BR-04** — Entre tareas con la misma prioridad, el orden DEBE mantenerse estable según el orden de creación (más antigua primero).

### Escenarios

```gherkin
Escenario: SC-01 - Orden predeterminado por prioridad
DADO que existen tareas con prioridades "baja", "alta" y "media"
CUANDO el usuario consulta el listado
ENTONCES las tareas DEBEN aparecer en el orden: primero "alta", luego "media" y después "baja"
```

```gherkin
Escenario: SC-02 - Reorden al editar prioridad
DADO que existe una tarea "Revisar correo" con prioridad "baja" visible al final del listado
CUANDO el usuario cambia su prioridad a "alta"
ENTONCES la tarea DEBE repositionarse entre las tareas de prioridad "alta"
Y el listado DEBE respetar el orden **alta → media → baja**
```

```gherkin
Escenario: SC-03 - Prioridad visible en cada ítem
DADO que existe al menos una tarea en el listado
CUANDO el usuario consulta el listado
ENTONCES cada ítem DEBE mostrar claramente si su prioridad es "alta", "media" o "baja"
```

```gherkin
Escenario: SC-04 - Estabilidad dentro de la misma prioridad
DADO que existen dos tareas "A" y "B", ambas con prioridad "media", creadas en ese orden
CUANDO el usuario consulta el listado
ENTONCES "A" DEBE aparecer antes que "B"
```

## Complejidad sugerida

- **Story points:** 2
- **Justificación:** Lógica de ordenamiento y presentación visual de prioridad sobre el listado ya existente; alcance acotado y bajo riesgo.

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                                  |
| ----- | ------------- | --------- | -------------------------------------------------------------------------------------- |
| **I** | Independiente | Parcial   | Depende de US-001 para existir listado y modelo de prioridad; valor incremental claro. |
| **N** | Negociable    | Cumple    | Criterio de desempate dentro de la misma prioridad es negociable si se mantiene estable. |
| **V** | Valiosa       | Cumple    | Prioriza visualmente el trabajo según urgencia declarada.                              |
| **E** | Estimable     | Cumple    | Reglas de orden explícitas y acotadas.                                                 |
| **S** | Pequeña       | Cumple    | Cambio focalizado en orden y presentación.                                             |
| **T** | Testeable     | Cumple    | Orden verificable con datos de prueba de distintas prioridades.                        |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | Depende de US-001; dependencia identificada y acordada.                                |
| Inputs/outputs claros              | Cumple     | Entrada: tareas con prioridad; salida: listado ordenado y etiquetado.                  |
| Unidades de trabajo definidas      | Cumple     | frontend.                                                                              |
| Sin decisiones técnicas pendientes | Cumple     | Orden predeterminado fijado en reglas de negocio.                                      |
| Referencias de UI                  | No aplica  | Indicador de prioridad definido funcionalmente en BR-02.                               |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- Implementar después de US-001.
- El criterio de desempate (BR-04) no estaba en el requerimiento original; se añade para garantizar un orden determinista y testeable.
