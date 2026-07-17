# TC-001 — Dado que el usuario abre la aplicación, Cuando observa la navegación principal, Entonces ve únicamente las opciones To-do y Notes

**Perspectiva**: Happy Path
**Automatización**: Automatizable (Integration)
**Prioridad**: Media
**Criterio de aceptación**: AC-001 — Navegación principal con dos opciones
**Artefacto padre**: US-002
**Estado**: Ready
**Creado por**: juanca202
**Fecha**: 2026-07-16

## Precondiciones

- La aplicación está cargada en el navegador (entorno de desarrollo local, `npm run dev`). No requiere notas ni tareas previamente registradas.

## Datos de prueba

| Campo | Valor | Notas |
|-------|-------|-------|
| N/A | N/A | No aplican datos de prueba específicos. |

## Pasos de ejecución

| # | Actor | Acción | Resultado esperado del paso |
|---|-------|--------|-----------------------------|
| 1 | Usuario | Abre la aplicación en la URL local | Se carga la página principal. |
| 2 | Usuario | Observa el componente de navegación principal | Se muestran dos opciones de navegación: "To-do" y "Notes", sin ninguna opción adicional. |

## Resultado esperado final

La navegación principal contiene exactamente dos opciones visibles: To-do y Notes.

## Observaciones

N/A
