# TC-003 — Dado que el usuario está creando una tarea, Cuando ingresa una descripción compuesta únicamente por espacios en blanco, Entonces el sistema la trata como descripción vacía y bloquea el guardado

**Perspectiva**: Límite
**Automatización**: Automatizable (Unit)
**Prioridad**: Media
**Criterio de aceptación**: AC-002 — No permitir guardar una tarea sin descripción
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Formulario de creación de tarea disponible.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| descripción | "   " | Tres espacios en blanco, sin contenido visible. [propuesto] |
| fecha de vencimiento | 2026-07-20 | [propuesto] |
| prioridad | Baja | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Ingresa "   " en el campo descripción | El campo muestra los espacios ingresados |
| 2 | usuario | Completa fecha de vencimiento y prioridad | Los campos aceptan los valores |
| 3 | usuario | Intenta confirmar la creación | El sistema evalúa la descripción como vacía tras eliminar espacios (trim) y bloquea el guardado |

## Resultado esperado final

La tarea no se crea; se muestra el mismo mensaje de validación que para descripción vacía.

## Observaciones

Este caso valida que la regla BR-01 no se evada rellenando el campo solo con espacios.
