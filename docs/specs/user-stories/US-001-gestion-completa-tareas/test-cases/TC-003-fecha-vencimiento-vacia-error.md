# TC-003 — Intento de creación de tarea sin fecha de vencimiento

Tipo: Error
Prioridad: Alta
Criterio de aceptación: AC-002 — Fecha de vencimiento obligatoria al crear/editar una tarea
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema impide guardar una tarea nueva si el campo fecha de vencimiento está vacío, protegiendo la regla de negocio BR-02.

## Precondiciones

- La aplicación está cargada en el navegador.
- El usuario tiene abierto el formulario de creación de tarea.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "Comprar materiales" [propuesto] | Válida, para aislar el error al campo fecha |
| Fecha de vencimiento | "" (vacío) | Campo obligatorio dejado sin completar |
| Prioridad | Baja [propuesto] | Válida |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Completa descripción y prioridad, deja la fecha de vencimiento vacía e intenta guardar | El sistema impide el guardado |
| 2 | Sistema | Señala el campo fecha de vencimiento como obligatorio | Se muestra un indicador/mensaje de error asociado al campo fecha |

## Resultado esperado final

La tarea no se crea, no aparece en el listado ni se persiste en localStorage, y el campo fecha de vencimiento queda marcado como obligatorio/erróneo.

## Observaciones

Ninguna.
