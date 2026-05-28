# US-001: Gestión básica de tareas

- Estado: Ready
- Fecha de creación: 2026-05-28
- Última actualización: 2026-05-28

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** registrar, consultar, crear, editar y eliminar mis tareas con un título obligatorio y prioridad asignada, guardadas en mi dispositivo  
**PARA** disponer de un listado fiable de pendientes sin cuenta ni servidor, como base del flujo de gestión

## Referencias

- **Diseño / prototipo:** Ninguna externa; aplicar el sistema visual del repositorio en [`DESIGN.md`](../../../../DESIGN.md) para formularios y listado.
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — Cada tarea DEBE tener un título obligatorio; el sistema NO DEBE persistir ni mostrar tareas sin título válido (no vacío ni solo espacios).
- **BR-02** — Cada tarea DEBE tener una prioridad; los valores admitidos SON ÚNICAMENTE **alta**, **media** y **baja**.
- **BR-03** — El usuario DEBE poder crear una tarea indicando título y prioridad.
- **BR-04** — El usuario DEBE poder ver un listado de todas sus tareas registradas.
- **BR-05** — El usuario DEBE poder editar el título y la prioridad de una tarea existente.
- **BR-06** — El usuario DEBE poder eliminar una tarea existente del listado.
- **BR-07** — Las tareas DEBEN persistir entre sesiones del navegador en el dispositivo local del usuario.
- **BR-08** — La aplicación NO DEBE requerir autenticación ni comunicarse con un backend para estas operaciones.

### Escenarios

```gherkin
Escenario: SC-01 - Listar tareas registradas
DADO que el usuario ha creado al menos una tarea con título y prioridad válidos
CUANDO accede a la vista principal de to-dos
ENTONCES el listado DEBE mostrar todas sus tareas
```

```gherkin
Escenario: SC-02 - Crear tarea con título y prioridad válidos
DADO que el usuario está en la vista principal de to-dos
CUANDO ingresa un título no vacío y selecciona la prioridad "media"
Y confirma la creación de la tarea
ENTONCES la tarea aparece en el listado
Y conserva el título y la prioridad indicados
```

```gherkin
Escenario: SC-03 - Impedir creación sin título
DADO que el usuario está en la vista principal de to-dos
CUANDO intenta crear una tarea dejando el título vacío o solo con espacios
ENTONCES el sistema NO DEBE registrar la tarea
Y DEBE informar al usuario que el título es obligatorio
```

```gherkin
Escenario: SC-04 - Editar título y prioridad
DADO que existe una tarea con título "Comprar leche" y prioridad "baja"
CUANDO el usuario edita el título a "Comprar pan" y cambia la prioridad a "alta"
Y confirma los cambios
ENTONCES el listado DEBE mostrar la tarea con el nuevo título y prioridad
```

```gherkin
Escenario: SC-05 - Eliminar una tarea
DADO que existe una tarea visible en el listado
CUANDO el usuario confirma su eliminación
ENTONCES la tarea NO DEBE aparecer en el listado
Y NO DEBE recuperarse tras recargar la página en el mismo navegador
```

```gherkin
Escenario: SC-06 - Persistencia tras recarga
DADO que el usuario ha creado al menos una tarea
CUANDO recarga la página en el mismo navegador
ENTONCES el listado DEBE mostrar las mismas tareas y prioridades que antes de la recarga
```

## Complejidad sugerida

- **Story points:** 5
- **Justificación:** CRUD completo, validación de título, modelo con prioridad y persistencia en `localStorage`. Sin ordenamiento ni estado completado (siguientes US).

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                 |
| ----- | ------------- | --------- | --------------------------------------------------------------------- |
| **I** | Independiente | Cumple    | Valor usable sin US-002 ni US-003; el listado puede mostrarse sin orden ni estilo de completado. |
| **N** | Negociable    | Cumple    | Formulario y confirmación de borrado negociables dentro de **BR-03**–**BR-06**. |
| **V** | Valiosa       | Cumple    | Primer incremento: registro y gestión básica del requerimiento.       |
| **E** | Estimable     | Cumple    | Alcance acotado a CRUD y persistencia local.                            |
| **S** | Pequeña       | Cumple    | Entregable en un sprint como fundación del producto.                  |
| **T** | Testeable     | Cumple    | Verificable por UI y persistencia tras recarga.                       |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | Sin otras US ni sistemas externos.                                                     |
| Inputs/outputs claros              | Cumple     | Entrada: título y prioridad; salida: listado persistido.                             |
| Unidades de trabajo definidas      | Cumple     | `frontend` en `docs/specs/work-units.md`.                                              |
| Sin decisiones técnicas pendientes | Cumple     | `localStorage`, sin auth ni backend; ver `technical-docs/todo-entity.md`.              |
| Referencias de UI                  | Parcial    | Sin Figma; guía en `DESIGN.md`.                                                        |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- El orden del listado por prioridad y la distinción visual de completadas quedan en **US-002** y **US-003**.
- Detalle de implementación (clave `localStorage`, shape JSON): `docs/specs/technical-docs/todo-entity.md`.
