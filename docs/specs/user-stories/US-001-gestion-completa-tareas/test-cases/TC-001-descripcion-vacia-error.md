# TC-001 — Intento de creación de tarea sin descripción

Tipo: Error
Prioridad: Alta
Criterio de aceptación: AC-001 — Descripción obligatoria al crear/editar una tarea
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema impide guardar una tarea nueva si el campo descripción está vacío, protegiendo la regla de negocio BR-01.

## Precondiciones

- La aplicación está cargada en el navegador, sin tareas previas o con al menos una tarea existente.
- El usuario tiene abierto el formulario de creación de tarea.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "" (vacío) | Campo obligatorio dejado sin completar |
| Fecha de vencimiento | 2026-07-10 [propuesto] | Válida, para aislar el error al campo descripción |
| Prioridad | Media [propuesto] | Válida, para aislar el error al campo descripción |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre el formulario de creación de tarea | El formulario se muestra con los campos descripción, fecha de vencimiento y prioridad vacíos/por defecto |
| 2 | Usuario | Deja el campo descripción vacío, completa fecha de vencimiento y prioridad, e intenta guardar | El sistema impide el guardado |
| 3 | Sistema | Señala el campo descripción como obligatorio | Se muestra un indicador/mensaje de error asociado al campo descripción |

## Resultado esperado final

La tarea no se crea, no aparece en el listado ni se persiste en localStorage, y el campo descripción queda marcado como obligatorio/erróneo.

## Observaciones

Ninguna.
