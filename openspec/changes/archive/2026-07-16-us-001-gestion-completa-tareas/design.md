## Context

La app Next.js (App Router) está en estado inicial: `src/app/page.tsx` renderiza un contenedor vacío y no existe `src/features/`. US-001 define el CRUD de tareas con persistencia local. El stack y la arquitectura ya están decididos en ADRs: feature-based (ADR-001), Zustand (ADR-010), Base UI (ADR-009), Tailwind (ADR-008), Vitest (ADR-003) y Playwright (ADR-004).

## Goals / Non-Goals

**Goals:**

- Entregar la feature `tasks` con modelo de dominio, store, UI y persistencia en `localStorage`.
- Cumplir AC-001…AC-011 (validaciones, CRUD, completar, orden por prioridad, distinción visual, listado al cargar).
- Exponer la feature desde la página principal vía composición en `src/app`.

**Non-Goals:**

- Autenticación, multiusuario o sincronización remota.
- Backend, API routes o base de datos.
- Filtros avanzados, etiquetas, subtareas o notificaciones.
- Diseño visual cerrado por mockups/Figma (el equipo define UI con Base UI + Tailwind).

## Decisions

### 1. Feature `tasks` bajo `src/features/tasks/`

- **Decisión**: Agrupar tipos, validación, store Zustand (con persist middleware hacia `localStorage`), componentes y tests de la feature en un solo módulo; `src/app/page.tsx` solo compone.
- **Por qué**: Cumple ADR-001 y mantiene el dominio localizable.
- **Alternativa**: Carpetas globales por tipo (`components/`, `hooks/`) — rechazada por ADR-001.

### 2. Modelo de tarea

- **Decisión**: Cada tarea tiene `id` (string único), `description` (string trimmeado no vacío), `dueDate` (fecha obligatoria, ISO date), `priority` (`'high' | 'medium' | 'low'` en código; etiquetas UI en español: alta / media / baja), `completed` (boolean), y opcionalmente `createdAt` para desempate estable al ordenar.
- **Por qué**: Cubre BR-01…BR-03 y facilita ordenamiento determinista (AC-009 / TC-015).
- **Alternativa**: Prioridad numérica — menos legible en UI y tests.

### 3. Estado con Zustand + `persist`

- **Decisión**: Store de feature con acciones `addTask`, `updateTask`, `deleteTask`, `toggleComplete`; middleware `persist` con clave versionada (p. ej. `tasks:v1`); al hidratar, validar/sanitizar el payload y, si está corrupto o hay prioridades inválidas, degradar a lista vacía (o descartar ítems inválidos) sin romper la UI (AC-010, TC-017, TC-006).
- **Por qué**: ADR-010; evita I/O manual disperso; versionado alinea con buenas prácticas de `localStorage`.
- **Alternativa**: `useState` + efectos manuales — más propenso a inconsistencias y peor testabilidad del dominio.

### 4. Ordenamiento derivado en render / selector

- **Decisión**: No persistir el orden; derivar `sortedTasks` (alta → media → baja; mismo nivel por `createdAt` ascendente u orden de inserción estable).
- **Por qué**: Una sola fuente de verdad; cumple AC-009 y TC-015.
- **Alternativa**: Reordenar el array en cada mutación — más frágil ante ediciones de prioridad.

### 5. UI: formulario + listado en la home

- **Decisión**: Formulario de alta/edición (descripción, fecha, selector de prioridad con exactamente tres opciones), listado con acciones editar / eliminar / completar; tareas completadas con estilo distintivo (p. ej. tachado u opacidad). Primitivas Base UI + utilidades Tailwind.
- **Por qué**: ADR-008/009; sin mockups, UI mínima y semántica.
- **Alternativa**: Diálogos modales para todo — innecesario para el alcance del ejercicio.

### 6. Validación en dominio antes de mutar el store

- **Decisión**: Funciones puras de validación rechazan descripción vacía/solo espacios y fecha ausente; la UI muestra feedback de error; el selector de prioridad no permite valores fuera del enum.
- **Por qué**: AC-002…AC-004 y tests unitarios sin DOM.

### 7. Hidratación SSR / client

- **Decisión**: Componentes de la feature como Client Components; evitar mismatch de hidratación mostrando el listado tras montar/hidratar el store (o estado vacío hasta `persist` rehydrate).
- **Por qué**: `localStorage` no existe en SSR; Next.js App Router lo exige.

## Risks / Trade-offs

- **[Riesgo] Mismatch SSR vs `localStorage`** → Mitigación: Client Components + espera de rehidratación antes de pintar datos persistidos.
- **[Riesgo] Datos corruptos o prioridad inválida en storage** → Mitigación: schema/guards al cargar; descartar payload inválido y arrancar vacío (TC-006, TC-017).
- **[Riesgo] US agrupa mucho alcance (CRUD + orden + persistencia)** → Mitigación: tareas OpenSpec por capa (modelo → store → UI → tests) para entregas incrementales.
- **[Trade-off] Sin backend = sin sync entre dispositivos** → Aceptado explícitamente en fuera de alcance de US-001.

## Migration Plan

- No hay datos de producción previos.
- Clave `tasks:v1` permite evolucionar el schema en cambios futuros.
- Rollback: revertir el change; limpiar la clave en `localStorage` del navegador si hace falta.

## Open Questions

- Ninguna que bloquee implementación: textos de error y detalle visual quedan a criterio del equipo dentro de Base UI + Tailwind.
