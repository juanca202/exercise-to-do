# TK-001: Modelo y persistencia de tareas

- Estado: Ready
- Historia: [US-001: Gestión básica de tareas](./README.md)
- Unidad de trabajo: frontend
- Asignado a: juanca202

## Descripción

Definir el tipo `Todo`, las validaciones de dominio y la capa de lectura/escritura en `localStorage` para que las tareas persistan entre sesiones del navegador con los campos acordados.

## Dependencias

- Ninguna dentro de la unidad de trabajo (primera pieza de dominio del frontend).

## Referencias

- **Documentación técnica:** [Entidad Todo](../../technical-docs/todo-entity.md)

## Plan de implementación

1. Crear `lib/todos/types.ts` con el tipo `Todo`, los literales `TodoStatus` (`pending`, `completed`) y `TodoPriority` (`high`, `medium`, `low`), más tipos auxiliares para crear/actualizar tareas.
2. Crear `lib/todos/validation.ts` con funciones puras que validen:
   - `description` no vacía tras recortar espacios (equivale al título obligatorio de la US).
   - `priority` dentro del enum acordado.
   - `status` dentro del enum acordado.
   - `due_at` nulo o cadena ISO 8601 válida.
3. Crear `lib/todos/storage.ts` con la clave `todos:v1`, funciones `loadTodos(): Todo[]` y `saveTodos(todos: Todo[]): void`, manejo seguro cuando `localStorage` no esté disponible (SSR) y parseo tolerante a datos corruptos (devolver array vacío).
4. Crear `lib/todos/factory.ts` con `createTodo(input)` que asigne `id` (`crypto.randomUUID()`), `created_at` (ISO actual), `status: "pending"` y `priority: "medium"` por defecto cuando no se indique prioridad, y valide antes de devolver la entidad.
5. Exportar el API público desde `lib/todos/index.ts`.
6. Añadir pruebas unitarias en `lib/todos/__tests__/` para validación, serialización y round-trip de persistencia (con mock de `localStorage`).

## Observaciones

Sin pendientes documentados.
