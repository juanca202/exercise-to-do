# TC-013 — Marcar una tarea pendiente como completada

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-007 — Marcar una tarea como completada y revertir ese estado
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el usuario puede marcar una tarea pendiente como completada y que el cambio se refleja y persiste.

## Precondiciones

- Existe al menos una tarea en estado pendiente.

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Marca la tarea pendiente como completada (p. ej. mediante un checkbox o control equivalente) | La tarea cambia a estado completada inmediatamente |
| 2 | Usuario | Recarga la página | La tarea permanece marcada como completada |

## Resultado esperado final

La tarea queda en estado completada, reflejada en el listado y persistida en localStorage.

## Observaciones

Complementario a TC-014 (revertir a pendiente) y a TC-015 (distinción visual).
