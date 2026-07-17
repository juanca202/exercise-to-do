# ADR-002: Política de documentación de código con TSDoc

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: typescript, tsdoc, documentación, calidad de código

## Contexto

El código TypeScript del proyecto carece de una convención uniforme para documentar funciones, clases y tipos. Sin un estándar, la documentación queda librada al criterio de cada persona o se trata como una tarea aparte que se pospone y termina desactualizada respecto al código, o directamente no se escribe. Esto dificulta el entendimiento de lógica no trivial por parte de otras personas del equipo y aumenta el costo de mantenimiento a largo plazo.

## Decision

El proyecto documenta su código TypeScript usando la convención **TSDoc**.

Reglas:

- La documentación se escribe **como parte del desarrollo de la funcionalidad**, no como una tarea diferida posterior.
- Aplica a **toda función o clase no trivial**, sea pública (exportada) o privada/interna al módulo.
- **No es obligatorio** documentar lógica simple o autoevidente (getters triviales, wrappers directos, código cuyo nombre y firma ya comunican su comportamiento).
- Los comentarios de documentación deben seguir sintaxis TSDoc válida (etiquetas como `@param`, `@returns`, `@remarks`, etc.).

## Consecuencias

### Positivas

- La documentación permanece alineada con el código porque se escribe en el mismo momento en que se desarrolla, no después.
- Mejora la legibilidad y el soporte del editor (tooltips, autocompletado) para quien consume la función o clase.
- Reduce la dependencia de conocimiento tácito sobre lógica no trivial.

### Negativas / trade-offs

- Añade overhead al ritmo de desarrollo al escribir documentación junto con el código.
- La distinción entre "lógica simple/trivial" y "no trivial" es subjetiva y puede aplicarse de forma inconsistente entre personas; se resuelve en code review.
- Sintaxis TSDoc inválida o documentación faltante en lógica no trivial no siempre se detecta sin una herramienta de lint activa.

## Fitness function

<!--
Esta decisión combina un aspecto objetivo/automatizable (sintaxis TSDoc válida en los comentarios
existentes, vía eslint-plugin-tsdoc) con aspectos que dependen de criterio humano: si TODA lógica no
trivial está documentada y si la documentación se escribió "durante" el desarrollo y no después. Estos
últimos se validan en code review, no con una regla determinista.
-->
Apto: Sí (parcial)
Estado: Creada
Herramienta: eslint-plugin-tsdoc (regla `tsdoc/syntax`)
Ubicación: eslint.config.mjs
Comando: npm run lint

## Referencias

- [TSDoc](https://tsdoc.org/)
