# TC-017 — Orden estable entre tareas de igual prioridad

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-009 — Listado ordenado por defecto por prioridad (alta → media → baja)
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que, cuando varias tareas comparten la misma prioridad, el agrupamiento por prioridad se mantiene correcto y el orden relativo entre ellas es estable y consistente entre recargas.

## Precondiciones

- Existen al menos dos tareas con la misma prioridad (p. ej. ambas Media), creadas en un orden conocido.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Tarea A | Descripción "Media A", prioridad Media [propuesto] | Creada primero |
| Tarea B | Descripción "Media B", prioridad Media [propuesto] | Creada segundo |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Crea la Tarea A y luego la Tarea B, ambas con prioridad Media | Ambas tareas quedan agrupadas bajo prioridad Media en el listado |
| 2 | Usuario | Recarga la aplicación varias veces | El orden relativo entre la Tarea A y la Tarea B se mantiene igual en cada recarga |

## Resultado esperado final

Las tareas de igual prioridad permanecen agrupadas correctamente respecto a las demás prioridades, y su orden relativo interno es estable (no cambia arbitrariamente entre recargas).

## Observaciones

El artefacto no define el criterio de desempate exacto (p. ej. por fecha de creación o de vencimiento); este TC valida solo la estabilidad del orden, no un criterio de desempate específico.
