# TC-014 — Dado que el contenido de localStorage para notas está corrupto, Cuando el usuario accede a la sección Notes, Entonces el sistema maneja el error sin fallar

**Perspectiva**: Error
**Automatización**: Automatizable (Integration)
**Prioridad**: Alta
**Criterio de aceptación**: AC-010 — Persistencia en localStorage tras recargar
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La clave de localStorage usada para notas contiene un valor no parseable (JSON inválido).

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Valor corrupto en localStorage | `"{notas: sin comillas"` | [propuesto], JSON inválido |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Sistema | Intenta leer y parsear el contenido de localStorage al cargar la sección Notes | La lectura falla al ser un JSON inválido. |
| 2 | Sistema | Maneja el error de parseo | La aplicación no se rompe (no queda en pantalla en blanco ni lanza una excepción no controlada); se muestra un listado vacío o un estado de error controlado. |

## Resultado esperado final

La sección Notes se renderiza sin fallos aun con datos corruptos en localStorage, sin pérdida de disponibilidad de la aplicación.

## Observaciones

Mismo patrón que TC-017 de US-001 para tareas con localStorage corrupto.
