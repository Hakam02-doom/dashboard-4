---
name: Uplift AI section designs
description: Purpose-built operational sections extending the approved Panze home.
colors:
  primary: '#071f21'
  ink: '#102423'
  supporting: '#566866'
  panel: '#ffffff'
  line: '#d3d9d8'
  peach: '#fff4e9'
  blue: '#edf9ff'
  pink: '#fceefe'
  mint: '#eafff5'
  chart-blue: '#00adf0'
  chart-orange: '#ff9100'
typography:
  section-title:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '18px'
    fontWeight: 400
    letterSpacing: '-0.035em'
  content-title:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '15px'
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: 'DM Sans, sans-serif'
    fontSize: '14px'
    lineHeight: 1.65
rounded:
  panel: '28px'
  content: '23px'
  mobile-panel: '25px'
  control: '999px'
spacing:
  panel: '22px'
  content: '18px'
  column: '16px'
  item: '10px'
---

## Overview

This section system extends the approved home without changing its component or stylesheet. It replaces the prior operational components completely. Runtime entry `main.jsx` imports `SectionPages.jsx`, `section-shell.css` and `section-pages.css` and `compact-layout.css`; it no longer imports ContentSections, ResearchSections, styles.css, sections.css or workspace.css.

## Colors

Keep the home's cool canvas and white panels. Pastel peach, blue, pink and mint group content by workflow state; colored states also have text labels. Teal identifies selection and primary actions. Scope section color utilities to `.rd-section-content` so they cannot recolor home chart dots.

## Typography

DM Sans carries every page. Final density comes from `compact-layout.css`, imported last. Page headings are 30px desktop, 28px tablet and 26px mobile. Panel titles are 18px, content titles are 15px desktop and 16px mobile, and descriptive text is 13–14px. Small metadata stays readable and mobile form inputs use 16px. Cards, controls and padding shrink alongside typography so the interface feels compact rather than zoomed.

## Layout

- Library and Social Studio: collections at left, a central pastel content shelf, and scheduled items/channels at right. Three cards per row from 1400px, two below. Six cards initially; Show more reveals six more. A list toggle provides a compact card arrangement, not the prior data table.
- Calendar: a broad seven-day selector above chronological pastel agenda cards. A compact month picker and state totals sit alongside it. Day and Week views share the same agenda structure.
- Reviews: a portrait queue beside a large pastel brief, publishing facts and review actions. Queue changes and scheduling update shared local content.
- Keywords: rounded search opportunity rows beside one selected topic's planning sheet and numeric context. No inherited four-metric header or dense keyword table.
- AI visibility: a recorded baseline, a panel of pastel audience questions and one next-step panel. No old semicircular gauge.
- Settings, connections, Google Business, activity and help retain their purpose-built workspace panels with the new shared primitives.
- At 1200px library becomes two columns; at 950px major sections stack. At 700px all principal panels use one column, the existing bottom rail remains, and controls wrap.

## Elevation & Depth

White panels and pastel inset content provide separation without shadows. Dialogs and toasts alone use soft elevation. The shared native composer and content dialog retain focus, Escape and backdrop dismissal.

## Shapes

Use 28px panel corners (25px mobile), 23px inset cards, compact desktop icon actions and 44px mobile icon actions and outlined or teal pill controls. These shapes come from the approved home rather than the previous operational UI.

## Components

`SectionPages.jsx` owns library/social collections, card/list controls, CSV export, review queue, publishing agenda, month picker, keyword planner, AI prompt search and the new composer. `main.jsx` owns route state and shared content. The home component and its stylesheet are unchanged by this section rebuild.

Historical source counts and local preview counts remain distinct. Creating, reviewing or scheduling changes this session only and does not publish externally. Existing avatar origins remain in public/avatars/SOURCES.md.

## Do's and Don'ts

Preserve the home shell. Build each section around its actual task. Do not import previous dashboard components or resurrect their metric-row/table structures. Keep the parent Inkwise project independent.
