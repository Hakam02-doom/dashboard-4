---
version: 1
slug: "src-main-jsx"
primary_target: "src/main.jsx"
related_targets: ["src/ReferenceDashboard.jsx","src/workspace.css"]
---

# Unified content workspace
Mode: Operate. Users: LunchLink content operators.
Scope: all12 destinations within this isolated app. Every section must stay in the shared Panze header, icon rail and heading layout. Switching sections must never render Inkwise or load the parent project.
Authority: original user Panze screenshot for colors, type, controls and home geometry. User requested matching section designs and correction of overlapping projects.
Implementation: independent app at port5180 with package/lock/source/assets inside panze/. Browser hash routes retain current view on reload and support back/forward. Content creation and review share session state across the library, calendar, reviews and home.
Visual: DM Sans, gray-blue field, white rounded panels, dark teal pill/circle controls, pastel rows and cards. Desktop panels adapt to one column; mobile More menu exposes all destinations.
Data: saved source with explicitly illustrative activity. No live sync, publishing or backend.
