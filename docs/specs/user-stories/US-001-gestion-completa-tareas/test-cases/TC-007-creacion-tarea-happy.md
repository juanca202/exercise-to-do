# TC-007 — Creación exitosa de una tarea nueva

Tipo: Happy Path
Prioridad: Alta
Criterio de aceptación: AC-004 — Crear una tarea nueva con descripción, fecha de vencimiento y prioridad
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar el flujo completo de creación de una tarea con datos válidos y su aparición en el listado.

## Precondiciones

- La aplicación está cargada en el navegador, con el listado vacío o con tareas previas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "Enviar reporte mensual" [propuesto] | Válida |
| Fecha de vencimiento | 2026-07-15 [propuesto] | Válida, futura |
| Prioridad | Alta [propuesto] | Válida |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre el formulario de creación de tarea | Se muestran los campos descripción, fecha de vencimiento y prioridad |
| 2 | Usuario | Completa los tres campos con los datos de prueba y guarda | El sistema confirma el guardado sin errores |

## Resultado esperado final

La nueva tarea aparece en el listado con la descripción, fecha de vencimiento y prioridad indicadas, en estado pendiente (no completada), y queda persistida en localStorage.

## Observaciones

Ninguna.
