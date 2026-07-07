# TC-015 — Distinción visual entre tareas completadas y pendientes

Tipo: Happy Path
Prioridad: Media
Criterio de aceptación: AC-008 — Distinción visual entre tareas completadas y pendientes
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el listado muestra un estilo visual diferenciado para las tareas completadas frente a las pendientes cuando ambas coexisten.

## Precondiciones

- Existen al menos dos tareas en el listado: una en estado pendiente y otra en estado completada.

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Observa el listado con una tarea pendiente y otra completada | Ambas tareas son visibles simultáneamente |
| 2 | Usuario | Compara el estilo visual de ambas tareas | La tarea completada presenta un estilo distinto (p. ej. tachado, opacidad reducida o color diferenciado) respecto a la pendiente |

## Resultado esperado final

La tarea completada es visualmente distinguible de la pendiente sin necesidad de leer un indicador de texto adicional, cumpliendo BR-04.

## Observaciones

El artefacto no prescribe el estilo visual exacto (tachado, opacidad, color); este TC valida que exista una diferenciación perceptible, dejando el estilo concreto a criterio de implementación dentro de DESIGN.md.
