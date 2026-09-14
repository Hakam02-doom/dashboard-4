# Uplift AI · LunchLink workspace

Platform: React/Vite web app. Scope: the Panze screenshot dashboard and all12 operational destinations.

This app is isolated in `panze/`, with its own package/lockfile, assets, source files and strict dev port5180. The parent dashboard runs independently; do not import its app entry, dashboard components or style sheets. Do not redirect this app to the parent dashboard.

Visual authority: user-provided Screenshot2026-09-14 at1.38.53PM. Cool gray canvas, white large-radius panels, circular dark teal navigation, DM Sans and pastel content. All sections share the same shell.

Content: saved Uplift AI/LunchLink source data. Local content creation, review, filtering, export and scheduling are interactive; changes last for the session. Activity and task assignments are illustrative. Historical counts are separate from local preview counts. No live backend, generation, publishing, account changes or sync.

Sections: Dashboard; Content library; Content calendar; Social media; Reviews; Keyword research; AI visibility; Google Business; Connections; Notifications; Settings; Help.

Navigation: hash routes within this app, active rail, section shortcut pills, desktop tooltips, mobile More menu. Browser back/forward and reload retain route. Every section renders exactly one shared ReferenceDashboard shell.
