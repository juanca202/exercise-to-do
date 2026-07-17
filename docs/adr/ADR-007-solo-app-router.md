# ADR-007: Uso exclusivo de App Router

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: nextjs, app-router, routing

## Contexto

Next.js soporta dos sistemas de enrutamiento (App Router y Page Router) que pueden convivir en el mismo proyecto. Permitir ambos simultáneamente duplica convenciones de layout, data fetching y manejo de errores, y genera confusión sobre dónde debe vivir una nueva ruta.

## Decision

El proyecto usa **exclusivamente App Router** (`src/app`) para el enrutamiento. No se introduce un directorio `pages/` (Page Router); toda ruta nueva se implementa bajo `src/app`.

## Consecuencias

### Positivas

- Un único modelo de enrutamiento, layouts y convenciones de data fetching (React Server Components) en todo el proyecto.
- Evita la ambigüedad de decidir, ruta por ruta, bajo qué router implementarla.

### Negativas / trade-offs

- Librerías o ejemplos que asuman Page Router requieren adaptación a las convenciones de App Router.

## Fitness function

Apto: Sí
Estado: Creada
Herramienta: script Node
Ubicación: scripts/check-app-router-only.mjs
Comando: node scripts/check-app-router-only.mjs

## Referencias

- [Next.js — App Router](https://nextjs.org/docs/app)
