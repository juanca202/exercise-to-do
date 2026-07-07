# TC-008 — Edición exitosa de una tarea existente

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-005 — Editar descripción, fecha de vencimiento y prioridad de una tarea existente
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que editar los tres campos de una tarea existente actualiza correctamente el listado y la persistencia.

## Precondiciones

- Existe al menos una tarea creada previamente: descripción "Enviar reporte mensual", fecha 2026-07-15, prioridad Alta.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Nueva descripción | "Enviar reporte mensual revisado" [propuesto] | Distinta a la original |
| Nueva fecha de vencimiento | 2026-07-20 [propuesto] | Distinta a la original |
| Nueva prioridad | Media [propuesto] | Distinta a la original |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la tarea existente en modo edición | El formulario se precarga con los valores actuales de la tarea |
| 2 | Usuario | Modifica descripción, fecha de vencimiento y prioridad con los nuevos valores, y guarda | El sistema confirma el guardado sin errores |

## Resultado esperado final

El listado muestra la tarea con la nueva descripción, fecha de vencimiento y prioridad, y los cambios quedan persistidos en localStorage.

## Observaciones

Depende de que exista previamente la tarea creada en TC-007 o una equivalente.
