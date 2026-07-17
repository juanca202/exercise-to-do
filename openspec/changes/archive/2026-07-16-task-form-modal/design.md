## Context

US-001 dejó el create/edit como formulario inline siempre visible en `TasksView`. El diseño de ese change descartó modales por alcance. El producto ya tiene `TaskForm` reutilizable, Base UI en el stack (`Dialog` disponible) y tests que asumen el formulario en la página.

## Goals / Non-Goals

**Goals:**

- Presentar create y edit en un único `Dialog` de Base UI.
- Listado como superficie principal; CTA “Nueva tarea” para abrir create.
- Cerrar sin confirmación (Cancelar / Escape / backdrop) y descartar el borrador.
- Adaptar pruebas al nuevo flujo de apertura.

**Non-Goals:**

- Cambiar validaciones, store, persistencia u ordenación.
- Confirmación al descartar borrador.
- Drawer, página dedicada o edición inline en la fila.
- Nuevas dependencias de UI fuera de Base UI.

## Decisions

### 1. Un Dialog para create y edit

- **Decisión**: Un solo diálogo controlado por estado (`closed` | `create` | `edit` con `Task`). Título “Nueva tarea” / “Editar tarea”. Reutilizar `TaskForm` sin lógica de negocio nueva.
- **Por qué**: Un solo camino de UX; menos duplicación.
- **Alternativa**: Modal solo para edit — rechazada (decisión de producto: ambos).

### 2. Base UI Dialog

- **Decisión**: `@base-ui/react/dialog` (Portal + Backdrop + Popup), estilizado con Tailwind.
- **Por qué**: ADR-009; focus trap y a11y incluidos.
- **Alternativa**: Modal ad hoc — peor a11y; Drawer — overkill.

### 3. Descarte sin confirmación

- **Decisión**: `onOpenChange(false)` / Cancelar resetea el modo a `closed` y desmonta el form (p. ej. `key` por modo/id) para limiar estado local.
- **Por qué**: Acordado explícitamente; evita fricción en un formulario corto.
- **Alternativa**: `alert-dialog` de confirmación — fuera de alcance.

### 4. CTA en cabecera; listado sin formulario permanente

- **Decisión**: Quitar la sección de formulario inline; botón “Nueva tarea” en el header; “Editar” abre el mismo Dialog con la tarea.
- **Por qué**: Listado protagonista.
- **Alternativa**: FAB flotante — no alineado al layout actual.

### 5. Select dentro del Dialog

- **Decisión**: Mantener Base UI Select en el form; verificar portales anidados en E2E.
- **Por qué**: Ya implementado; Dialog + Select es patrón soportado.
- **Mitigación**: Si hay z-index/focus issues, ajustar `Positioner` / capas Tailwind.

## Risks / Trade-offs

- **[Riesgo] Portales anidados Select ⊂ Dialog** → Mitigación: E2E de create con cambio de prioridad; ajustar z-index si falla.
- **[Riesgo] Tests rotos** → Mitigación: helper `openCreateModal` / click Editar antes de rellenar campos.
- **[Trade-off] Sin confirmación al cerrar** → Aceptado; se pierden datos no guardados.

## Migration Plan

- Cambio solo de UI; sin migración de `localStorage`.
- Rollback: restaurar formulario inline en `TasksView`.

## Open Questions

- Ninguna bloqueante (copy CTA/títulos acordados: “Nueva tarea” / “Editar tarea”).
