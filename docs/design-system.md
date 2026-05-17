# Design System

## Philosophy
Linear/Stripe/Vercel-level restraint. Nothing decorates for the sake of decorating.
Every element earns its place. Hierarchy comes from size and opacity, not drama.

## Color Tokens (globals.css)
Background:   #0d0d0d   — near black
Surface:      #141414   — one step up
Surface-2:    #1a1a1a   — elevated panels
Border:       rgba(255,255,255,0.04)  — barely there
Text:         #ededed   — primary
Text-muted:   #4d4d4d   — secondary
Text-faint:   #333      — placeholders, captions
Accent:       #4f8ef7   — single blue, used sparingly

## Spacing System (4px base)
4px   — micro (icon to label)
8px   — tight internal
12px  — component internal
16px  — standard padding
24px  — section gaps
32px  — large breathing room
48px  — page-level separation

## Typography
- Font: Inter (Google Fonts)
- 11px / 400 — status labels
- 12px / 400 — captions, meta
- 13px / 400 — secondary body
- 14px / 500 — primary body, inputs
- 15px / 500 — logo, nav brand
- 20px / 600 — page headings

## Component Rules
- Border radius: 7–8px for inputs/buttons, 10px+ for cards
- Borders: rgba(255,255,255,0.04–0.08) only
- Shadows: soft, never dramatic
- Hover states: color shift only, no scale except buttons
- Active nav: rgba(255,255,255,0.05) background + #ededed text
- No gradients on backgrounds
- No colored orbs or glow effects
- Glassmorphism: used selectively, subtle blur only

## Inspirations
Linear, Stripe Dashboard, Vercel, Notion, Raycast, Framer