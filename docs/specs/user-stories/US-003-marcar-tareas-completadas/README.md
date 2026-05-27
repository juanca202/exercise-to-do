# US-003: Marcar tareas como completadas

- Estado: Ready
- Fecha de creación: 2026-05-27
- Última actualización: 2026-05-27

## Descripción

**COMO** usuario de la aplicación de to-dos  
**QUIERO** marcar tareas como completadas o volver a dejarlas pendientes  
**PARA** distinguir visualmente lo ya resuelto de lo que aún requiere mi atención

## Referencias

- **Diseño / prototipo:** Ninguna externa; la distinción visual entre completadas y pendientes DEBE cumplir **BR-02** (p. ej. tachado, opacidad reducida o estado de checkbox marcado).
- **Archivo local:** Ninguno por ahora.

## Criterios de aceptación

### Reglas de negocio

- **BR-01** — El usuario DEBE poder marcar una tarea como completada.
- **BR-02** — Las tareas completadas DEBEN distinguirse visualmente de las pendientes en el listado.
- **BR-03** — El usuario DEBE poder revertir una tarea completada a estado pendiente.
- **BR-04** — El estado completado DEBE persistir entre sesiones del navegador junto con el resto de datos de la tarea.
- **BR-05** — Marcar o desmarcar una tarea NO DEBE eliminarla ni alterar su título ni su prioridad.

### Escenarios

```gherkin
Escenario: SC-01 - Marcar tarea como completada
DADO que existe una tarea pendiente visible en el listado
CUANDO el usuario la marca como completada
ENTONCES la tarea DEBE mostrarse con la distinción visual de completada
Y DEBE conservar su título y prioridad
```

```gherkin
Escenario: SC-02 - Revertir tarea a pendiente
DADO que existe una tarea marcada como completada
CUANDO el usuario la marca nuevamente como pendiente
ENTONCES la tarea DEBE perder la distinción visual de completada
Y DEBE mostrarse como pendiente
```

```gherkin
Escenario: SC-03 - Persistencia del estado completado
DADO que el usuario ha marcado una tarea como completada
CUANDO recarga la página en el mismo navegador
ENTONCES la tarea DEBE seguir mostrándose como completada
```

```gherkin
Escenario: SC-04 - Completadas respetan orden por prioridad
DADO que existen tareas completadas y pendientes con distintas prioridades
CUANDO el usuario consulta el listado
ENTONCES el orden por prioridad definido en US-002 DEBE mantenerse
Y las tareas completadas DEBEN seguir distinguiéndose visualmente dentro de su grupo de prioridad
```

## Complejidad sugerida

- **Story points:** 2
- **Justificación:** Añade un atributo de estado, interacción de toggle y estilos diferenciados; baja complejidad sobre la base de US-001 y US-002.

## Unidades de trabajo

- frontend

## Validación

### INVEST

| Letra | Criterio      | Resultado | Notas                                                                                       |
| ----- | ------------- | --------- | ------------------------------------------------------------------------------------------- |
| **I** | Independiente | Parcial   | Requiere listado y modelo de US-001; compatible con US-002 ya implementada o en paralelo.   |
| **N** | Negociable    | Cumple    | Forma concreta de la distinción visual es negociable si cumple **BR-02**.                    |
| **V** | Valiosa       | Cumple    | Cierra el ciclo de gestión permitiendo reflejar avance real del usuario.                    |
| **E** | Estimable     | Cumple    | Toggle de estado y estilos acotados.                                                        |
| **S** | Pequeña       | Cumple    | Incremento acotado sobre el listado existente.                                              |
| **T** | Testeable     | Cumple    | Verificable por interacción, estilo y persistencia tras recarga.                            |

### Definition of Ready (DoR)

| Criterio DoR                       | Estado     | Notas                                                                                  |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------- |
| Dependencias listas                | Cumple     | Depende de US-001; US-002 recomendada antes o en paralelo para SC-04.                  |
| Inputs/outputs claros              | Cumple     | Entrada: acción de completar/descompletar; salida: listado con estados diferenciados.  |
| Unidades de trabajo definidas      | Cumple     | frontend.                                                                              |
| Sin decisiones técnicas pendientes | Cumple     | Persistencia local heredada de US-001.                                                 |
| Referencias de UI                  | No aplica  | Distinción visual acordada funcionalmente en **BR-02**.                                |
| Sin aclaraciones pendientes        | Cumple     | Ninguna.                                                                               |

## Observaciones

- Implementar después de US-001; conviene tener US-002 lista para validar SC-04.
- No se exige ocultar tareas completadas ni reordenarlas al final; permanecen en el listado con distinción visual.
