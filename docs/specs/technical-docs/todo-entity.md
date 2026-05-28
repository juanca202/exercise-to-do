# Entidad: Tarea (Todo)

Documentación técnica de referencia. No forma parte de la descripción funcional de las historias de usuario.

## Atributos

| Campo       | Tipo    | Obligatorio | Notas                                      |
| ----------- | ------- | ----------- | ------------------------------------------ |
| `id`        | string  | Sí          | Identificador único estable en el cliente  |
| `title`     | string  | Sí          | No vacío ni solo espacios                  |
| `priority`  | enum    | Sí          | `alta` \| `media` \| `baja`                |
| `completed` | boolean | Sí          | Por defecto `false`                        |
| `createdAt` | number  | Sí          | Marca de tiempo para orden estable         |

## Persistencia

- Almacenamiento en `localStorage` del navegador.
- Sin autenticación ni backend.
- Clave y forma JSON: definir en las tareas `TK-XXX` de implementación.
