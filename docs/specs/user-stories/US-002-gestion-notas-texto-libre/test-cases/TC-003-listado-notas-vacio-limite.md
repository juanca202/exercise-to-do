# TC-003 — Dado que no hay notas registradas, Cuando el usuario accede a la sección Notes, Entonces ve el listado vacío

**Perspectiva**: Límite
**Automatización**: Automatizable (Integration)
**Prioridad**: Baja
**Criterio de aceptación**: AC-002 — Acceder a Notes y ver el listado
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- No existen notas guardadas en localStorage (clave de notas vacía o inexistente).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos. |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Hace clic en la opción "Notes" | El sistema navega a la sección Notes. |
| 2 | Usuario | Observa el listado | El listado se muestra vacío, sin errores ni notas. |

## Resultado esperado final

La sección Notes se renderiza correctamente con un listado vacío, sin lanzar errores.

## Observaciones

N/A
