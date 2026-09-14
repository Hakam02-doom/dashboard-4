# Dashboard 4

This directory is an independent app and repository. The Panze screenshot design is the user's approved visual authority, with Uplift AI content. Use src/ReferenceDashboard.jsx as the single dashboard shell and retain the current section components inside it. Do not import or restore the parent directory's Inkwise dashboard or styles.

Keep all changes inside this repository. Develop on strict port5180. Run npm run build before publishing. Repository and Vercel project name: dashboard-4. Local preview data must not be presented as live publishing or syncing.

The user requested a compact interface after rejecting oversized typography and cards. src/compact-layout.css is imported last and defines the final density. Preserve 30px desktop / 26px mobile page headings, smaller card padding and fixed desktop sizing; do not restore viewport-driven enlargement. Keep mobile touch targets at least 44px.
