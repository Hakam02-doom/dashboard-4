---
name: Panze · Uplift AI
description: Shared visual system for the LunchLink workspace
colors:
  primary: "#071f21"
  canvas: "#edf1f3"
  surface: "#ffffff"
  ink: "#090b0c"
  muted: "#58676b"
  line: "#dce3e2"
  focus: "#087b80"
  mint: "#dcf5e9"
  lavender: "#eee5fb"
  peach: "#fff0dc"
  sky: "#e3f5ff"
typography:
  headline:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  panel: "28px"
  panel-mobile: "25px"
  pill: "999px"
  circle: "50%"
spacing:
  gap: "18px"
  panel: "22px"
  panel-mobile: "19px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
---

# Design System: Panze · Uplift AI

## Overview

A spacious workspace with a cool gray field, rounded white panels, dark teal controls and pastel content. The user-provided Panze screenshot is the visual authority; Uplift AI and LunchLink supply the product content. Every destination keeps the same visual shell.

This system belongs to the independent `dashboard-4/` package, served on strict port 5180. The approved finish review and its desktop (1440px) and mobile (390px) evidence are recorded in `.impeccable/review/finish-review.md`.

## Colors

Dark teal anchors selected pills, circular navigation and primary actions. White panels sit on a subtly graded cool gray field: `linear-gradient(115deg, #f2f3f3 0%, #edf1f4 63%, #e4eff4 100%)`. Mint, lavender, peach and sky distinguish content and status; they are supporting fills, not competing action colors. Muted text and fine gray rules organize dense operational information.

## Appearance

The header moon/sun toggle switches the entire workspace between light and dark. Light remains the default. The choice persists under `dashboard-4-theme` in localStorage, with a guarded pre-render initialization in `index.html` to avoid a light flash. Storage failures never prevent switching.

`src/theme.css` is imported last and defines dark semantic color tokens on `:root[data-theme="dark"]`. Component CSS consumes these tokens with the exact existing light colors as fallbacks. Keep one switching mechanism, including native form `color-scheme`. Do not change component geometry or text sizes between appearances.

Dark canvas is #101a1b, panels #1b292b, raised surfaces #293b3d, primary text #edf4f1 and secondary text #b4c4bf. Pale mint #b5dfd0 marks selected controls and primary actions with dark #122c27 text. Peach, blue, pink and mint cards use darker tinted surfaces. Charts keep their series hues while neutral tracks, markers and tooltips adapt.

The toggle remains visible on desktop, tablet and mobile. Preserve mouse-click outline behavior and keyboard focus visibility in both themes.

## Typography

The user requested a more compact interface after the first font-only reduction still looked zoomed. `src/compact-layout.css`, imported last, is the authority for final density. Use actual font, spacing and component dimensions rather than CSS zoom or transforms.

Use DM Sans throughout. Page headings are 30px on desktop, 28px below 1200px and 26px on mobile. Panel titles are 18px; content card titles are 15px desktop and 16px mobile. Body text is 13–14px and metadata generally 12px. Keep mobile form inputs at 16px. Preserve hierarchy through weight and spacing.

## Layout

All 12 destinations render inside one `ReferenceDashboard` shell. Operational content stays inside `.panze-ui`. The home uses a fixed `--u: 0.7px` plus explicit readable text sizes; do not restore viewport-driven enlargement. Desktop header height is 82px and the introduction is 94px. Main margins are 82px left and 24px right. Panel padding is generally 22px, with 18px inside content cards.

The home retains its original three-column proportions and stacks responsively. Library columns are 200px, flexible content and 250px; content uses three cards per row from 1400px and two below. At 1200px the library has two main columns; at 950px it stacks. At 700px principal panels use one column, page headings become 26px, panel padding is 19–20px, and the fixed bottom rail preserves 44px navigation targets. Mobile actions and form fields retain 44px minimum heights. Tables scroll inside their wrappers; filters wrap. The body has no fixed minimum width. Below 700px, a two-row header grid keeps the brand/profile row and four period controls within the viewport. At 360px and below, task cards become one column and the secondary profile description hides; all sections are verified down to 320px.

## Elevation & Depth

Panels rely on white and pastel surfaces, spacing and occasional thin rules. Keep normal cards flat. Reserve shadows for transient overlays: dialogs use `0 24px 90px #0d303026`; the mobile navigation menu uses `0 10px 40px #113c3c20`. The dialog backdrop is `#09242660` with 3px blur.

## Shapes

Large soft panel corners define the system: panels use 28px and become 25px on mobile; content cards use 23px. Buttons and status chips are pills. Icon controls and avatars are true circles. Keep small internal rows and fields quieter, with 13–20px corners where already implemented.

## Components

Primary actions pair a dark teal pill with a clear text label and a small line icon. Desktop rail buttons are white circles (38px), with the active item filled dark teal; mobile circles are 44px. Desktop tooltips name icon destinations, while the mobile More menu uses text labels.

Search is a thin outlined pill with a transparent input; desktop search height is 42px. Native form fields use 13px corners and a 46px minimum height. Keyboard focus uses a 2px teal outline offset by 4px. Status chips use pastel fills and explicit text. Disabled controls use 0.45 opacity. Reduced-motion preferences disable transitions and animations.

Shared visual sources are `src/reference-dashboard.css`, `src/section-shell.css`, `src/section-pages.css` and the final density overrides in `src/compact-layout.css`; routing and operational views are connected in `src/main.jsx`. Preserve hash navigation and the same shell when adding a section.

## Do's and Don'ts

- Do reuse the shared shell for all 12 sections.
- Do keep dark teal for active navigation and primary actions.
- Do pair pastel status fills with readable text labels.
- Do keep dense tables scrollable within their panel on mobile.
- Don’t import the parent dashboard entry, components or styles.
- Don’t add heavy card shadows or replace the approved rounded geometry.
- Don’t rely on icon shape or color alone to identify navigation and status.
