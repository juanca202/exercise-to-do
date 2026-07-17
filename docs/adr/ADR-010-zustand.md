# ADR-010: Zustand para manejo de estado

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: estado, zustand, react

## Contexto

El proyecto necesita un lineamiento único sobre cómo se maneja el estado global compartido entre componentes, más allá del estado local de React. Sin una convención explícita, conviven distintas librerías de manejo de estado con APIs y modelos mentales incompatibles entre sí, complicando el mantenimiento.

## Decision

El proyecto usa **Zustand** para el manejo de estado global. No se introducen librerías de manejo de estado alternativas (p. ej. Redux, MobX, Recoil, Jotai) para ese mismo propósito.

## Consecuencias

### Positivas

- Un único modelo de estado global, con una API mínima y sin boilerplate de acciones/reducers.
- El estado se puede colocar junto a la feature que lo usa ([ADR-001](ADR-001-feature-based-architecture.md)), sin necesitar un store centralizado obligatorio.

### Negativas / trade-offs

- Menor ecosistema de herramientas de devtools/middleware maduro comparado con Redux.
- Introducir otra librería de estado en el futuro implicaría migrar los stores existentes.

## Fitness function

Apto: Sí
Estado: Pendiente
Herramienta: TODO
Ubicación: TODO
Comando: TODO

## Referencias

- [Zustand](https://github.com/pmndrs/zustand)
- [ADR-001: Arquitectura feature-based](ADR-001-feature-based-architecture.md)
