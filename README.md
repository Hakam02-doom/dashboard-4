## Independent workspace

- Only edit `/Users/hakam/Documents/ChatGPT/dashboard-4` for Dashboard 4. This is an independent repository; never copy another dashboard's app, styles, assets, dependencies, or Vercel configuration into it.
- Design: Panze-inspired dashboard. Preserve this dashboard's own visual authority and user-approved changes.
- GitHub: `Hakam02-doom/dashboard-4`. Vercel project: `dashboard-4`. Identity is recorded in `dashboard.config.json`.
- Development: `npm run dev` → `http://127.0.0.1:5180/`. Production preview: `npm run preview` → port 4180. Ports are fixed and do not fall back.
- Before work, run `npm run check:project`. Before publishing, run `npm run build` and `npm run test:isolation`. Use `npm run deploy` for an authorized production deployment. Never override the port, working directory, or Vercel target.
- New clones: run `npm install` to install the repository's own dependencies and pre-push guard. Do not share node_modules or use a parent dashboard's installation.
- The old `/Users/hakam/Documents/ChatGPT/dashboard` folder is a routing index, not an application. Do not implement anything there.

# Dashboard 4


This is the dashboard based on the user's September14 screenshot, extended to every workspace section. It has an independent app entry and dependencies so the other dashboard projects cannot replace its design.

## Run

From this directory:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5180. Strict port selection prevents Vite from silently opening another project on a different port. Production: `npm run build`; preview: `npm run preview` (port4180).

## Structure

- `src/ReferenceDashboard.jsx`: shared header, rail, mobile menu, headings and home composition.
- `src/main.jsx`: isolated hash navigation, shared content state, dialogs, settings, connections, activity and help.
- `src/ContentSections.jsx`: library, reviews, social, calendar and composer.
- `src/ResearchSections.jsx`: keywords and AI visibility.
- `src/workspace.css`: shared section and overlay theme.

Do not import source files or app shells from sibling projects. Each dashboard owns its own development server, root index, dependencies, and visual design.

Local changes reset on refresh. There is no live publishing or backend connection. Existing demo avatars have provenance in `public/avatars/SOURCES.md`.
