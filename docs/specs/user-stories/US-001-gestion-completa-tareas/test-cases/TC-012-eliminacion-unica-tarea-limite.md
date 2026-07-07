# TC-012 — Eliminación de la única tarea existente

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-006 — Eliminar una tarea existente del listado de forma permanente
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar el comportamiento del listado cuando se elimina la última tarea existente, dejando el estado vacío (caso límite de cardinalidad cero).

## Precondiciones

- Existe exactamente una tarea en el listado.

## Datos de prueba

N/A

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Elimina la única tarea existente | La tarea desaparece del listado |

## Resultado esperado final

El listado queda vacío, mostrando un estado vacío coherente (sin errores en consola ni elementos rotos), y localStorage refleja la ausencia de tareas.

## Observaciones

El artefacto no define un mensaje específico de "listado vacío"; este TC valida que el estado se maneje sin errores, dejando el mensaje exacto a criterio de implementación.
