# Distributive Property Interactive

Vite + React + TypeScript + Tailwind UI for modeling the distributive property. [Standards.md](Standards.md) lists Common Core codes and CK-12 links.

**Live:** https://content-interactives.github.io/distributive_property/

## Requirements

- Node.js 18+  
- npm

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Dependencies |
| `npm run dev` | Vite dev |
| `npm run build` | `dist/` |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build + gh-pages |

## Vite

`vite.config.js` uses `base: '/distributive_property/'` for GitHub Pages.

## Stack

React 19, TypeScript, Vite 7, Tailwind 3, Framer Motion, assorted diagram/arrow helper libraries (see `package.json`).

## Layout

- `src/` — application source  
- `public/` — static assets  
- `index.html` — Vite entry
