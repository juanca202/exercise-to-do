# ADR-009: Base UI como librería de componentes

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: ui, base-ui, componentes, accesibilidad

## Contexto

El proyecto necesita un lineamiento único sobre qué librería provee los componentes de UI no triviales (diálogos, menús, campos accesibles, etc.). Sin una convención explícita, conviven distintas librerías de componentes con APIs y comportamientos de accesibilidad inconsistentes entre sí.

## Decision

El proyecto usa **Base UI** (`@base-ui/react`) como librería de componentes de UI headless. No se introducen librerías de componentes alternativas (p. ej. MUI, Ant Design, Chakra UI, React Bootstrap) para ese mismo propósito.

## Consecuencias

### Positivas

- Un único set de primitivas de componentes headless, estilizadas con Tailwind CSS ([ADR-008](ADR-008-tailwindcss.md)), sin imponer un sistema de estilos propio que compita con el del proyecto.
- Comportamiento de accesibilidad consistente entre componentes, al venir de una única librería.

### Negativas / trade-offs

- Al ser headless, cada componente requiere estilizarse explícitamente con Tailwind; no viene con apariencia predefinida.
- Introducir otra librería de componentes en el futuro implicaría reemplazar los usos existentes de Base UI.

## Fitness function

Apto: Sí
Estado: Pendiente
Herramienta: TODO
Ubicación: TODO
Comando: TODO

## Referencias

- [Base UI](https://base-ui.com/)
- [ADR-008: Tailwind CSS como framework de presentación](ADR-008-tailwindcss.md)
