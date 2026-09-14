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
    fontSize: "clamp(33px, 2.999vw, 55px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "25px"
    fontWeight: 400
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  panel: "36px"
  panel-mobile: "28px"
  pill: "999px"
  circle: "50%"
spacing:
  gap: "18px"
  panel: "36px"
  panel-mobile: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "17px 25px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel}"
---

# Design System: Panze · Uplift AI

## Overview

A spacious workspace with a cool gray field, rounded white panels, dark teal controls and pastel content. The user-provided Panze screenshot is the visual authority; Uplift AI and LunchLink supply the product content. Every destination keeps the same visual shell.

This system belongs to the independent `panze/` package, served on strict port 5180. The approved finish review and its desktop (1440px) and mobile (390px) evidence are recorded in `.impeccable/review/finish-review.md`.

## Colors

Dark teal anchors selected pills, circular navigation and primary actions. White panels sit on a subtly graded cool gray field: `linear-gradient(115deg, #f2f3f3 0%, #edf1f4 63%, #e4eff4 100%)`. Mint, lavender, peach and sky distinguish content and status; they are supporting fills, not competing action colors. Muted text and fine gray rules organize dense operational information.

## Typography

The user requested a subtle size reduction: headings, content titles and regular text above 13px are approximately 8% smaller, rounded to half-pixel steps. Preserve small metadata and form inputs. Home type that scales with `--u` preserves already-small text and floors reductions at 13px; the layout scale, spacing, weights and line heights are unchanged.

Use DM Sans throughout. Headings are light and tightly tracked, with medium weight reserved for names and emphasis. Operational body text generally uses 14–16px; labels use 12–14px. The headline drops to 33px at 1200px and 31.5px at 700px. Workspace panel titles drop from 25px to 22px on mobile. Preserve readable text in dense tables rather than scaling the entire page down.

## Layout

All 12 destinations render inside one `ReferenceDashboard` shell: shared header, shortcut pills, navigation rail and introductory area. Operational content remains inside the scoped `.panze-ui` boundary. The home’s geometry uses `--u: clamp(0.72px, 0.0543478261vw, 1.18px)`; its desktop grid proportions are 356:888:440, with main margins of 116u left and 26u right. Operational panels use an 18px gap; workspace two-column layouts use a 1.6:1 split with a 300px minimum secondary column.

At 1200px operational padding tightens. At 1150px the home becomes two columns with a 255px task column. At 1000px workspace, library and calendar layouts stack; summary cards retain two columns. At 700px the home stacks, main margins become 16px, the rail becomes a fixed 67px bottom bar, and the More menu exposes the remaining destinations. Reserve 82px below content. Tables scroll within their own wrappers; filters wrap and search takes a full row. Body minimum width is 360px. Above 2172px the shell caps at 2300px and centers.

## Elevation & Depth

Panels rely on white and pastel surfaces, spacing and occasional thin rules. Keep normal cards flat. Reserve shadows for transient overlays: dialogs use `0 24px 90px #0d303026`; the mobile navigation menu uses `0 10px 40px #113c3c20`. The dialog backdrop is `#09242660` with 3px blur.

## Shapes

Large soft panel corners define the system: home panels use 52u and become 30px on mobile; operational panels use 36px and become 28px. Buttons and status chips are pills. Icon controls and avatars are true circles. Keep small internal rows and fields quieter, with 13–20px corners where already implemented.

## Components

Primary actions pair a dark teal pill with a clear text label and a small line icon. Desktop rail buttons are white circles (54u), with the active item filled dark teal; mobile circles are 44px. Desktop tooltips name icon destinations, while the mobile More menu uses text labels.

Search is a thin outlined pill with a transparent input; operational search height is 46px. Native form fields use 13px corners and a 46px minimum height. Keyboard focus uses a 2px teal outline offset by 4px. Status chips use pastel fills and explicit text. Disabled controls use 0.45 opacity. Reduced-motion preferences disable transitions and animations.

Shared visual sources are `src/reference-dashboard.css` and `src/workspace.css`; routing and operational views are connected in `src/main.jsx`. Preserve hash navigation and the same shell when adding a section.

## Do's and Don'ts

- Do reuse the shared shell for all 12 sections.
- Do keep dark teal for active navigation and primary actions.
- Do pair pastel status fills with readable text labels.
- Do keep dense tables scrollable within their panel on mobile.
- Don’t import the parent dashboard entry, components or styles.
- Don’t add heavy card shadows or replace the approved rounded geometry.
- Don’t rely on icon shape or color alone to identify navigation and status.
