# TC-004 — Creación de tarea con fecha de vencimiento igual a hoy

Tipo: Límite
Prioridad: Media
Criterio de aceptación: AC-002 — Fecha de vencimiento obligatoria al crear/editar una tarea
Artefacto padre: US-001
Estado: Ready
Creado por: juanca202
Fecha: 2026-07-06

## Objetivo

Validar que el sistema acepta como válida una fecha de vencimiento igual a la fecha actual (límite inferior típico de un vencimiento aún no pasado).

## Precondiciones

- La aplicación está cargada en el navegador.
- Se conoce la fecha actual del sistema (referencia: 2026-07-06).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Descripción | "Pagar factura" [propuesto] | Válida |
| Fecha de vencimiento | 2026-07-06 (fecha actual) | Límite: coincide con "hoy" |
| Prioridad | Media [propuesto] | Válida |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Completa el formulario con fecha de vencimiento igual a la fecha actual | El campo acepta el valor sin marcarlo como inválido |
| 2 | Usuario | Guarda la tarea | El sistema acepta el guardado |

## Resultado esperado final

La tarea se crea con fecha de vencimiento igual a la fecha actual, aparece en el listado y queda persistida en localStorage.

## Observaciones

El artefacto no define una regla de negocio sobre fechas pasadas; este TC solo valida el límite "hoy" como aceptado.
