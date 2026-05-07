# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — start dev server at http://localhost:3000
- `yarn build` — production build
- `yarn generate` — static site generation
- `yarn preview` — preview production build locally

The repo uses `yarn` as the primary tool. There is no test runner or linter configured.

## Architecture

Nuxt 4 single-page portfolio using Tailwind CSS v4. No backend logic — `server/` only contains a tsconfig.

Source code lives under `app/` (Nuxt 4 default `srcDir`). The `~/` alias resolves to `app/`.

Rendering flow: `app/app.vue` → `NuxtLayout` → `app/layouts/default.vue` → `<slot />` → `app/pages/index/index.vue`. The layout wraps every page with `<SectionsNavigation />` and `<SectionsFooter />`; the homepage composes the rest of the sections in `pages/index/index.vue`. Adding a new page means creating `app/pages/<page-name>/index.vue` (each page lives in its own folder, sheron-style).

### Component layout

Files use **kebab-case** names (no `The` prefix). Nuxt 4 auto-imports them with PascalCase'd path-prefixed names:

- `app/components/app/` — small reusable UI building blocks. e.g. `logo.vue` → `<AppLogo />`.
- `app/components/app/icons/` — SVG icons as plain `<template>`-only Vue components (no `<script>`, no props). Sized via Tailwind (`size-5`, `size-6`) and colored via `currentColor`. e.g. `heart.vue` → `<AppIconsHeart />`. To add an icon: drop a `.vue` file with an inline `<svg>` here.
- `app/components/sections/` — full page sections. e.g. `banner.vue` → `<SectionsBanner />`, `footer.vue` → `<SectionsFooter />`.

The navigation passes icon components into a data array (`quickLinks`, `items`) and renders them with `<component :is="...">`. Because Nuxt's auto-import only resolves names used directly in templates, those icon components are imported explicitly via `import X from '~/components/app/icons/<name>.vue'` in `<script setup>` of [app/components/sections/navigation.vue](app/components/sections/navigation.vue).

### Styling

Global styles in [app/assets/main.css](app/assets/main.css), loaded via `nuxt.config.ts` `css`. Tailwind v4 is configured CSS-first via `@import "tailwindcss"` and `@theme` (no `tailwind.config.js`). Theme tokens defined there:
- Colors: `--color-primary` (`#CBE86B`), `--color-secondary`, `--color-blacker`, `--color-error`, `--color-primary-font`, `--color-secondary-font`, `--color-tertiary-font` — used as `bg-primary`, `text-primary-font`, etc.
- `@utility container-x` — page container (max-width 1170px, centered). Use this on every section's inner wrapper.

Tailwind is wired into Vite via `@tailwindcss/vite` plugin in [nuxt.config.ts](nuxt.config.ts).

Static assets in `public/` are served at the site root (e.g., `public/portfolio/...`, `public/services/...`, `vr.svg` favicon).
