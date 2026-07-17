# ADR-006: GitFlow con commits convencionales

**Estado**: Draft
**Fecha de creación**: 2026-07-16
**Última actualización**: 2026-07-16
**Decisores**: Equipo de desarrollo
**Etiquetas**: git, gitflow, conventional-commits, workflow

## Contexto

El proyecto necesita un lineamiento único sobre cómo se organizan las ramas y cómo se redactan los mensajes de commit, para que el historial sea predecible, el propósito de cada rama sea reconocible por su nombre, y el historial de cambios pueda usarse de forma confiable (p. ej. para generar changelogs o decidir versionado semántico). Sin una convención explícita, cada persona nombra ramas y escribe commits de forma distinta, dificultando el seguimiento del trabajo en curso y la trazabilidad de cambios.

## Decision

El proyecto usa **GitFlow** como estrategia de branching y **Conventional Commits** como convención de mensajes de commit.

Reglas:

- Ramas de larga vida: `main` (producción) y `develop` (integración).
- Ramas de trabajo con prefijo según su propósito: `feature/*`, `release/*`, `hotfix/*` (y `bugfix/*` cuando aplique), creadas desde y fusionadas hacia la rama correspondiente según GitFlow.
- Todo mensaje de commit sigue el formato Conventional Commits (`tipo(scope opcional): descripción`, p. ej. `feat:`, `fix:`, `chore:`, `docs:`).

## Consecuencias

### Positivas

- El nombre de la rama comunica su propósito (nueva funcionalidad, release, corrección urgente) sin necesitar contexto adicional.
- Los mensajes de commit convencionales permiten automatizar changelogs y decidir versionado semántico de forma consistente.

### Negativas / trade-offs

- GitFlow introduce más ramas de larga vida y pasos de merge que un modelo trunk-based más simple.
- Exige disciplina del equipo para nombrar ramas y redactar commits correctamente; sin verificación automática tiende a relajarse con el tiempo.

## Fitness function

<!--
Los commits convencionales ya están verificados automáticamente vía commitlint (hook commit-msg de
Husky). El nombre de rama GitFlow no tenía verificación previa; se creó un script nuevo para ello.
-->
Apto: Sí
Estado: Creada
Herramienta: commitlint (mensajes) + script Node (nombre de rama)
Ubicación: commitlint.config.mjs + .husky/commit-msg (mensajes); scripts/check-branch-name.mjs (rama)
Comando: npx --no -- commitlint --edit <mensaje> (automático en cada commit) · node scripts/check-branch-name.mjs

## Referencias

- [A successful Git branching model (GitFlow)](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
