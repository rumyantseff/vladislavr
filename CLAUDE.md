# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start dev server at http://localhost:3000
- `yarn build` — production build
- `yarn generate` — static site generation
- `yarn preview` — preview production build locally

The repo has both `yarn.lock` and `package-lock.json`; `yarn` is the primary tool. There is no test runner or linter configured.

## Architecture

Nuxt 3 single-page portfolio using Vuetify 3 + SCSS. No backend logic — `server/` only contains a tsconfig, and `pages/` is empty.

Rendering flow: `app.vue` → `NuxtLayout` → `layouts/default.vue`. The default layout is **not** generic — it ignores the `<slot />` and directly composes the page from section components (`TheNavigation`, `TheBanner`, `TheProjects`, `TheServices`, `TheResume`, `TheContacts`, `TheFooter`). Adding a new section means editing `layouts/default.vue`, not adding a route.

Vuetify integration is split across two places that must stay in sync:
- [nuxt.config.ts](nuxt.config.ts) — registers `vite-plugin-vuetify` via a `vite:extendConfig` hook and transpiles `vuetify`.
- [plugins/vuetify.ts](plugins/vuetify.ts) — `createVuetify` with SSR enabled, MDI icons, and the custom `light` theme palette (primary `#CBE86B`, secondary `#F2E9E1`, etc.). Theme color tokens are defined here, not in SCSS.

Global styles live in [assets/main.scss](assets/main.scss), loaded via `nuxt.config.ts` `css`. Component-scoped overrides (e.g., `.v-container` max-width) are in `layouts/default.vue`.

Static assets in `public/` are served at the site root (e.g., `public/portfolio/...`, `public/services/...`, `vr.svg` favicon). The legacy `static/` directory is empty and unused in Nuxt 3.
