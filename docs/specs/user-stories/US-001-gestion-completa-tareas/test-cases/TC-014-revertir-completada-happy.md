# TC-014 — Revertir una tarea completada a pendiente

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-007 — Marcar una tarea como completada y revertir ese estado
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el usuario puede revertir una tarea previamente marcada como completada de vuelta al estado pendiente.

## Precondiciones

- Existe al menos una tarea en estado completada (ver TC-013).

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Desmarca la tarea completada (p. ej. destildando el checkbox o control equivalente) | La tarea vuelve a estado pendiente inmediatamente |
| 2 | Usuario | Recarga la página | La tarea permanece en estado pendiente |

## Resultado esperado final

La tarea queda en estado pendiente, reflejada en el listado sin el estilo visual de completada, y persistida en localStorage.

## Observaciones

Depende de que exista una tarea previamente completada, como en TC-013.
