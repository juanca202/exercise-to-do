# ADR-008: Tailwind CSS como framework de presentación

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: css, tailwindcss, estilos, ui

## Contexto

El proyecto necesita un lineamiento único sobre cómo se aplican estilos a los componentes. Sin una convención explícita, conviven distintos enfoques (CSS Modules, CSS-in-JS, frameworks de UI con su propio sistema de estilos) que fragmentan el sistema de diseño y dificultan mantener consistencia visual entre features.

## Decision

El proyecto usa **Tailwind CSS** como framework de presentación para estilar componentes. No se introducen frameworks de estilos alternativos (p. ej. styled-components, Emotion, Bootstrap) para ese mismo propósito.

## Consecuencias

### Positivas

- Un único sistema de utilidades de estilos, consistente entre features y sin duplicar configuración de theming.
- Los estilos quedan colocados junto al markup (clases utilitarias), reduciendo el salto entre archivo de componente y archivo de estilos.

### Negativas / trade-offs

- Curva de aprendizaje de las clases utilitarias para quien no esté familiarizado con Tailwind.
- Introducir otra librería de estilos en el futuro implicaría migrar el markup existente.

## Fitness function

Apto: Sí
Estado: Pendiente
Herramienta: TODO
Ubicación: TODO
Comando: TODO

## Referencias

- [Tailwind CSS](https://tailwindcss.com/)
