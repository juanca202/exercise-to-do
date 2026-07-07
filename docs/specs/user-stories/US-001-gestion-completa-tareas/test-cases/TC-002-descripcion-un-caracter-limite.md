# TC-002 — Creación de tarea con descripción de un solo carácter

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-001 — Descripción obligatoria al crear/editar una tarea
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema acepta el valor mínimo válido del dominio (un carácter no vacío) como descripción, confirmando que la validación de obligatoriedad no exige una longitud mínima mayor a uno.

## Precondiciones

- La aplicación está cargada en el navegador.
- El usuario tiene abierto el formulario de creación de tarea.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "A" | Un único carácter, límite inferior del dominio no vacío |
| Fecha de vencimiento | 2026-07-10 [propuesto] | Válida |
| Prioridad | Alta [propuesto] | Válida |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Completa el formulario con descripción "A", fecha y prioridad válidas | Los campos se completan sin error visible |
| 2 | Usuario | Guarda la tarea | El sistema acepta el guardado sin bloquear por longitud de descripción |

## Resultado esperado final

La tarea se crea y aparece en el listado con la descripción "A", y queda persistida en localStorage.

## Observaciones

Ninguna.
