# TC-005 — Dado que el usuario abre el selector de prioridad en el formulario de tarea, Cuando despliega las opciones disponibles, Entonces solo se muestran los valores alta, media y baja

**Perspectiva**: Límite
**Automatización**: Automatizable (E2E)
**Prioridad**: Media
**Criterio de aceptación**: AC-004 — Restringir la prioridad a alta, media o baja
**Artefacto padre**: US-001
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- Formulario de creación (o edición) de tarea abierto.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | usuario | Despliega el selector de prioridad | El selector muestra la lista de opciones disponibles |
| 2 | usuario | Revisa las opciones listadas | Solo aparecen "Alta", "Media" y "Baja", sin valores adicionales |

## Resultado esperado final

El selector de prioridad expone exactamente tres opciones: alta, media y baja; no es posible seleccionar ni ingresar otro valor desde la interfaz.

## Observaciones

Ninguna.
