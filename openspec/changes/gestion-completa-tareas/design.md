## Context

El proyecto ya define su stack y arquitectura vía ADRs ([ADR-002](../../../docs/adr/ADR-002-uso-de-tailwind-css.md) Tailwind, [ADR-003](../../../docs/adr/ADR-003-uso-de-base-ui.md) Base UI, [ADR-004](../../../docs/adr/ADR-004-uso-de-zustand.md) Zustand, [ADR-005](../../../docs/adr/ADR-005-arquitectura-feature-based.md) feature-based, [ADR-007](../../../docs/adr/ADR-007-estrategia-pruebas-unitarias.md) Vitest/Testing Library). El estado actual del código es un scaffold de referencia:

- `src/shared/stores/task-store.ts`: store Zustand con `Task { id, title, completed }`, sin validación, sin `dueDate`/`priority`, sin persistencia y sin orden.
- `src/features/home/components/home-page.tsx`: página placeholder del template de Next.js, no relacionada con gestión de tareas.
- `src/shared/ui/checkbox.tsx`: único primitivo de UI compartido, envoltorio de Base UI + Tailwind.

No existe backend ni capa de autenticación en el proyecto (aplicación 100% cliente), lo cual es una restricción, no una decisión de este cambio.

## Goals / Non-Goals

**Goals:**

- Definir el modelo de datos `Task` ampliado (`description`, `dueDate`, `priority`, `completed`) y su ubicación en el código según ADR-005.
- Definir cómo se valida el formulario de alta/edición (descripción y fecha obligatorias, prioridad restringida a un enum).
- Definir la estrategia de persistencia en `localStorage` compatible con Server Components / SSR de Next.js App Router (evitar mismatches de hidratación).
- Definir el criterio de orden predeterminado (alta → media → baja) y su estabilidad ante prioridades iguales.
- Definir el manejo de datos corruptos o inexistentes en `localStorage`.

**Non-Goals:**

- No se diseña backend, sincronización remota ni multi-dispositivo (BR-06/BR-07 lo excluyen explícitamente).
- No se diseña autenticación ni gestión de usuarios (AC-011).
- No se introduce una librería de formularios o de fechas externa: se resuelve con TypeScript/React nativo, dado que no hay una decisión técnica previa que la habilite y el alcance no la justifica.

## Decisions

### Modelo de datos

```ts
type Priority = "alta" | "media" | "baja";

interface Task {
  id: string; // crypto.randomUUID()
  description: string; // BR-01, no vacía
  dueDate: string; // BR-02, formato ISO yyyy-mm-dd (input type="date"), no vacía
  priority: Priority; // BR-03
  completed: boolean;
}
```

Se reemplaza el `Task` actual (`title`) por este modelo. `id` se genera con `crypto.randomUUID()` (Web Crypto API nativa del navegador), sin dependencias nuevas.

**Alternativa considerada:** librería externa de validación (p. ej. zod) para el enum de prioridad y campos obligatorios. Se descarta por no estar en el stack decidido ([ADR consultados](../../../docs/adr/)) y por ser innecesaria dado el tamaño acotado de las reglas (3 validaciones simples).

### Ubicación del código (feature-based, ADR-005)

- Se crea el feature `src/features/tasks/` que agrupa componentes (formulario, listado, item de tarea), el store Zustand y las funciones de validación/orden propias de la gestión de tareas.
- El store se mueve de `src/shared/stores/` a `src/features/tasks/` porque es estado específico de una única feature, no transversal (criterio de ADR-005: promover a `shared` solo si lo usa más de una feature).
- `src/shared/ui/checkbox.tsx` se mantiene y se reutiliza para marcar tareas como completadas; nuevos primitivos de formulario (input de texto, input de fecha, select de prioridad) que sean genéricos y reutilizables se añaden a `src/shared/ui/`.
- `src/features/home/` (placeholder del template) se reemplaza por el feature `tasks` como contenido de `src/app/page.tsx`.

### Persistencia y SSR

- Se usa el middleware `persist` de Zustand con `createJSONStorage(() => localStorage)`.
- Dado que Next.js App Router renderiza en servidor (sin `localStorage`) y luego hidrata en cliente, se usa `skipHydration: true` en la config de `persist` y se dispara la rehidratación manualmente en un `useEffect` del componente raíz del feature (`useTaskStore.persist.rehydrate()`), evitando mismatches de hidratación entre servidor y cliente.
- Mientras la rehidratación no concluyó, el listado se considera "cargando" (no se debe interpretar un array vacío inicial como "sin tareas" de forma prematura), satisfaciendo AC-010/TC-020 (primera visita sin datos) sin falsos positivos.
- Manejo de datos corruptos (TC-019): el `storage` custom envuelve `JSON.parse` en try/catch; si falla, se descarta el valor corrupto y se continúa con una lista vacía, sin romper la carga de la aplicación.

**Alternativa considerada:** leer/escribir `localStorage` manualmente en cada acción del store sin `persist`. Se descarta porque el middleware ya resuelve serialización, versionado y rehidratación de forma consistente con ADR-004 (uso de Zustand), reduciendo código a medida.

### Orden predeterminado

- Cada `Priority` se mapea a un rango numérico (`alta: 0, media: 1, baja: 2`).
- El listado se deriva del estado del store con `[...tasks].sort((a, b) => rank(a.priority) - rank(b.priority))`.
- `Array.prototype.sort` es estable desde ES2019 (garantizado por el motor de JS usado en navegadores modernos), por lo que las tareas con igual prioridad conservan su orden relativo de inserción sin lógica adicional (BR-05, TC-017).

### Validación de formulario

- Funciones puras de validación (`validateDescription`, `validateDueDate`, `validatePriority`) co-ubicadas en el feature `tasks`, sin dependencia externa.
- El formulario bloquea el `submit` y muestra el error asociado al campo si la validación falla, reutilizando el mismo componente de formulario para creación y edición.

## Risks / Trade-offs

- [Riesgo] Mismatch de hidratación de Next.js si el listado se renderiza distinto en servidor vs. cliente antes de rehidratar `localStorage` → Mitigación: `skipHydration` + rehidratación manual en `useEffect` + estado de "cargando" explícito antes de pintar el listado real.
- [Riesgo] Corrupción de `localStorage` (JSON inválido o esquema antiguo con `title` en lugar de `description`) → Mitigación: parseo defensivo con try/catch y fallback a lista vacía; no se diseña migración automática de datos antiguos porque el store previo es un scaffold sin datos de usuarios reales.
- [Riesgo] Mover el store de `shared` a `features/tasks` es un cambio de ubicación de archivo que puede afectar imports existentes en `home-page.tsx` y sus tests → Mitigación: se actualizan imports y tests en el mismo cambio (ver tasks.md).

## Migration Plan

1. Crear el feature `src/features/tasks/` con modelo, store, validaciones y componentes.
2. Migrar `useTaskStore` desde `src/shared/stores/` hacia `src/features/tasks/`, actualizando el modelo `Task` y agregando `persist`.
3. Reemplazar el contenido de `src/app/page.tsx` para renderizar el feature `tasks` en lugar de `HomePage` del template.
4. Eliminar o reemplazar `src/features/home/` y sus pruebas asociadas al placeholder.
5. Actualizar/crear pruebas unitarias (Vitest + Testing Library) y el object mother de tareas (`src/shared/test/object-mother/task.mother.ts`) para el nuevo modelo.

No aplica rollback más allá de revertir el commit/rama: no hay datos de producción ni backend involucrados.

## Open Questions

- Ninguna pendiente: el alcance, stack y persistencia ya están definidos en la US y en los ADRs vigentes.
