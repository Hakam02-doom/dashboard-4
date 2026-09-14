# Dashboard 4: project identity

- Only edit `/Users/hakam/Documents/ChatGPT/dashboard-4` for Dashboard 4. This is an independent repository; never copy another dashboard's app, styles, assets, dependencies, or Vercel configuration into it.
- Design: Panze-inspired dashboard. Preserve this dashboard's own visual authority and user-approved changes.
- GitHub: `Hakam02-doom/dashboard-4`. Vercel project: `dashboard-4`. Identity is recorded in `dashboard.config.json`.
- Development: `npm run dev` → `http://127.0.0.1:5180/`. Production preview: `npm run preview` → port 4180. Ports are fixed and do not fall back.
- Before work, run `npm run check:project`. Before publishing, run `npm run build` and `npm run test:isolation`. Use `npm run deploy` for an authorized production deployment. Never override the port, working directory, or Vercel target.
- New clones: run `npm install` to install the repository's own dependencies and pre-push guard. Do not share node_modules or use a parent dashboard's installation.
- The old `/Users/hakam/Documents/ChatGPT/dashboard` folder is a routing index, not an application. Do not implement anything there.

# Dashboard 4

This directory is an independent app and repository. The Panze screenshot design is the user's approved visual authority, with Uplift AI content. Use src/ReferenceDashboard.jsx as the single dashboard shell and retain the current section components inside it. Do not import or restore other dashboards' components or styles.

Keep all changes inside this repository. Develop on strict port5180. Run npm run build before publishing. Repository and Vercel project name: dashboard-4. Local preview data must not be presented as live publishing or syncing.

The user requested a compact interface after rejecting oversized typography and cards. src/compact-layout.css is imported last and defines the final density. Preserve 30px desktop / 26px mobile page headings, smaller card padding and fixed desktop sizing; do not restore viewport-driven enlargement. Keep mobile touch targets at least 44px.

Support both light and dark appearances. src/theme.css defines semantic dark tokens; existing light values remain component fallbacks. New surfaces, text, borders, forms and overlays must adapt in both themes. Preserve the header toggle and its localStorage preference.
