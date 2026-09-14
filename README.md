# Dashboard 4


This is the dashboard based on the user's September14 screenshot, extended to every workspace section. It has an independent app entry and dependencies so the parent Inkwise project cannot replace its design.

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

Do not import source files or app shells from the parent project. Its development server and root index belong to a separate design.

Local changes reset on refresh. There is no live publishing or backend connection. Existing demo avatars have provenance in `public/avatars/SOURCES.md`.
