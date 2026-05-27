# US-001: Gestión básica de tareas

- Estado: Ready
- Fecha de creación: 2026-05-27
- Última actualización: 2026-05-27

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** crear, listar, editar y eliminar mis tareas  
**PARA** registrar y mantener actualizado mi listado personal de pendientes sin depender de un backend

## Referencias

- **Diseño / prototipo:** Ninguna externa; UI mínima funcional acordada (formulario y listado en la misma vista).
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — Cada tarea DEBE tener un título obligatorio; el sistema NO DEBE persistir ni mostrar tareas sin título válido.
- **BR-02** — Cada tarea DEBE tener una prioridad; los valores admitidos SON ÚNICAMENTE **alta**, **media** y **baja**.
- **BR-03** — El usuario DEBE poder crear una tarea indicando título y prioridad.
- **BR-04** — El usuario DEBE poder ver un listado de todas sus tareas registradas.
- **BR-05** — El usuario DEBE poder editar el título y la prioridad de una tarea existente.
- **BR-06** — El usuario DEBE poder eliminar una tarea existente del listado.
- **BR-07** — Las tareas DEBEN persistir entre sesiones del navegador en el dispositivo local del usuario.

### Escenarios

```gherkin
Escenario: SC-01 - Crear tarea con título y prioridad válidos
DADO que el usuario está en la vista principal de to-dos
CUANDO ingresa un título no vacío y selecciona la prioridad "alta"
Y confirma la creación de la tarea
ENTONCES la tarea aparece en el listado
Y conserva el título y la prioridad indicados
```

```gherkin
Escenario: SC-02 - Impedir creación sin título
DADO que el usuario está en la vista principal de to-dos
CUANDO intenta crear una tarea dejando el título vacío o solo con espacios
ENTONCES el sistema NO DEBE registrar la tarea
Y DEBE informar al usuario que el título es obligatorio
```

```gherkin
Escenario: SC-03 - Editar título y prioridad de una tarea
DADO que existe una tarea con título "Comprar leche" y prioridad "media"
CUANDO el usuario edita el título a "Comprar pan" y cambia la prioridad a "alta"
Y confirma los cambios
ENTONCES el listado DEBE mostrar la tarea con el nuevo título y prioridad
```

```gherkin
Escenario: SC-04 - Eliminar una tarea
DADO que existe una tarea visible en el listado
CUANDO el usuario confirma su eliminación
ENTONCES la tarea NO DEBE aparecer en el listado
Y NO DEBE recuperarse tras recargar la página en el mismo navegador
```

```gherkin
Escenario: SC-05 - Persistencia tras recarga
DADO que el usuario ha creado al menos una tarea
CUANDO recarga la página en el mismo navegador
ENTONCES el listado DEBE mostrar las mismas tareas registradas antes de la recarga
```

## Complejidad sugerida

- **Story points:** 5
- **Justificación:** Cubre el modelo de tarea, validaciones, CRUD completo en UI y persistencia local; es la base sobre la que se apoyan el resto de historias.

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                 |
| ----- | ------------- | --------- | --------------------------------------------------------------------- |
| **I** | Independiente | Cumple    | No depende de otras US; entrega valor usable por sí sola.             |
| **N** | Negociable    | Cumple    | Alcance CRUD acotado; detalle de UI negociable dentro de lo mínimo.   |
| **V** | Valiosa       | Cumple    | Permite gestionar tareas de punta a punta sin backend.                |
| **E** | Estimable     | Cumple    | Alcance acotado a formulario, listado y almacenamiento local.       |
| **S** | Pequeña       | Cumple    | Entregable en un sprint corto como fundamento del producto.           |
| **T** | Testeable     | Cumple    | Escenarios verificables por UI y persistencia tras recarga.           |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | Sin dependencias funcionales previas.                                                  |
| Inputs/outputs claros              | Cumple     | Entrada: título y prioridad; salida: listado actualizado y persistido.               |
| Unidades de trabajo definidas      | Cumple     | frontend.                                                                              |
| Sin decisiones técnicas pendientes | Cumple     | Persistencia local acordada; sin autenticación ni backend.                             |
| Referencias de UI                  | No aplica  | UI mínima funcional; sin diseño externo.                                               |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- Las US-002 y US-003 extienden el listado creado aquí; conviene implementar esta historia primero.
- La persistencia local es una restricción técnica acordada; el detalle de implementación corresponde a las tareas `TK-XXX`.
