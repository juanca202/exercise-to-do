# Entidad Todo

Modelo de datos acordado para la aplicación de to-dos (frontend, persistencia en `localStorage`).

## Campos

| Campo         | Tipo                                      | Obligatorio | Notas                                                                 |
| ------------- | ----------------------------------------- | ----------- | --------------------------------------------------------------------- |
| `id`          | `string` (UUID)                           | Sí          | Identificador único generado al crear.                                |
| `description` | `string`                                  | Sí          | Texto de la tarea; cumple el título obligatorio de US-001 (BR-01).    |
| `status`      | `"pending"` \| `"completed"`              | Sí          | Valor por defecto: `"pending"`.                                       |
| `due_at`      | `string` (ISO 8601) \| `null`             | No          | Fecha límite opcional.                                                |
| `priority`    | `"high"` \| `"medium"` \| `"low"`         | Sí          | Valor por defecto: `"medium"`. Equivalente funcional a alta / media / baja en la UI. |
| `created_at`  | `string` (ISO 8601)                       | Sí          | Timestamp de creación; desempate de orden dentro de la misma prioridad. |

## Mapeo UI (español)

| Campo      | Valor almacenado | Etiqueta UI |
| ---------- | ---------------- | ----------- |
| `priority` | `high`           | alta        |
| `priority` | `medium`         | media       |
| `priority` | `low`            | baja        |
| `status`   | `pending`        | pendiente   |
| `status`   | `completed`      | completada  |

## Persistencia

- **Clave `localStorage`:** `todos:v1`
- **Formato:** array JSON de objetos `Todo`
- **Entorno:** solo navegador (`typeof window !== "undefined"`)
