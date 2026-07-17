# TC-001 — Dado que el usuario está en la vista de listado de tareas, Cuando completa descripción, fecha de vencimiento y prioridad y confirma la creación, Entonces la tarea se guarda y aparece en el listado

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-001 — Crear tarea con descripción, fecha de vencimiento y prioridad
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La aplicación está cargada en el navegador (`npm run dev`).
- El usuario tiene acceso al formulario de creación de tareas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| descripción | "Comprar materiales para el taller" | Texto libre, no vacío. [propuesto] |
| fecha de vencimiento | 2026-07-20 | Fecha válida. [propuesto] |
| prioridad | Alta | Uno de: alta, media, baja. [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Abre el formulario de creación de tarea | Se muestran los campos descripción, fecha de vencimiento y prioridad |
| 2 | usuario | Completa el campo descripción con "Comprar materiales para el taller" | El campo acepta el texto ingresado |
| 3 | usuario | Selecciona la fecha de vencimiento 2026-07-20 | El campo acepta la fecha seleccionada |
| 4 | usuario | Selecciona la prioridad "Alta" | El campo refleja la prioridad seleccionada |
| 5 | usuario | Confirma la creación (botón Guardar/Crear) | El formulario se cierra o limpia sin errores |

## Resultado esperado final

La nueva tarea aparece en el listado con la descripción, fecha de vencimiento y prioridad ingresadas, en estado pendiente (no completada).

## Observaciones

Ninguna.
