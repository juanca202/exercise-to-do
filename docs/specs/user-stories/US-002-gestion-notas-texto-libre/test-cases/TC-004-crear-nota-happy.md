# TC-004 — Dado que el usuario está en la sección Notes, Cuando crea una nueva nota con contenido válido y guarda, Entonces la nota se registra en el sistema

**Perspectiva**: Happy Path
**Automatización**: Automatizable (E2E)
**Prioridad**: Alta
**Criterio de aceptación**: AC-003 — Crear una nueva nota
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- El usuario está en la sección Notes. Puede haber cero o más notas previas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| Contenido de la nota | "Revisar correo de proveedores" | [propuesto] |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Hace clic en la opción para crear una nueva nota | Se abre el formulario de creación de nota. |
| 2 | Usuario | Escribe el contenido en el área de texto | El área de texto refleja el contenido ingresado. |
| 3 | Usuario | Guarda la nota | El sistema registra la nota y regresa al listado. |

## Resultado esperado final

La nueva nota queda registrada en el sistema con el contenido ingresado.

## Observaciones

La visibilidad inmediata en el listado se valida en AC-008 (TC-010).
