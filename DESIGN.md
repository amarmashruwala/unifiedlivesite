# UnifiedLive — Colour chapters

Approved direction: Taste Colour chapters, seed 261026. The central idea is that UnifiedLive’s connected delivery model becomes a journey through rooms, participants, production, distribution, and audiences. The explorer makes the relationships useful: visitors start with a meeting room, hybrid event, or creator setup and see the relevant capabilities.

## Color roles

| Token | Color | Role |
| --- | --- | --- |
| petrol | #132522 | Text, header, hero, presence, footer |
| paper | #F5F6F2 | Editorial reading surface and text on dark fields |
| lime | #D5FF63 | Primary action, scenario chapter, contact invitation |
| ice | #E2EFED | Supporting content, forms, alternate capability sections |
| sky | #85C9DF | Live journey, artwork, control feedback |

These five flat colors make the identity. A separate semantic error color supports form validation; it is not an additional chapter color. No gradients, decorative borders, shadows, or external assets are used. Real fields, tables, and focus outlines retain the boundaries needed for usability.

## Logo

The UnifiedLive symbol is an open U around a live point. Its sides read as people and places joining one connection; the open top leaves room for new participants and channels. The lime stroke and sky point use the established palette. The adjacent typographic name keeps **unified** bold and **live** regular for clear reading at navigation size. The same mark appears in the header, footer, favicon, social image, and the connection illustration. Source assets: `public/brand-mark.svg`, `public/logo.svg` for dark surfaces, and `public/logo-on-light.svg` for light surfaces. The header/footer component is `src/components/Logo.astro`.

## Typography and composition

Arial/Helvetica/system sans-serif; regular 400 and bold 700 only. Display type, reading headings, lead text, body, and utility text form the hierarchy. Responsive component sizes refine those roles; the oversized footer wordmark and city names are intentional exceptions to the ordinary reading scale. Body is 18 px on desktop and 17 px on phones. Utility text stays at least 13 px.

The header is sticky. Phones use a dedicated second row for Human View and AI Agent View. Main sections share responsive outer gutters. The homepage varies its composition: full-width hero, interactive examples, editorial service index, process illustration, industry links, company approach, FAQs, large city names, and contact invitation. Phone chapters use natural content height.

The exact supplied hero headline and support are retained. The headline uses two lines at desktop/tablet widths and three on 375/390 px phones. The six services retain equal placement and weight. Full capability lists and all eleven industries remain on dedicated pages.

## Customer journey refinement

The hero uses a five-scene live-journey overview, with a primary enquiry action and a direct link to the scenario explorer. Audiovisual and conferencing inputs feed live production, followed by multiplatform streaming and AI-powered audience engagement. The explorer follows immediately so visitors can recognize their own starting point. Service rows link as a whole, pairing each service with its customer outcome. Main information pages use a dark introduction and one clear next step; Services presents the outcome before the complete capability list, while Industries provides an eleven-industry jump index.

Supporting artwork sits beside industry examples and content-reuse benefits. Three shared-source FAQ answers help address common questions on Home. The final lime invitation groups the project action with an explicit preview-only note. Chapters use content-driven height, with mobile layouts stacked at readable sizes.

`ConnectionArtwork` accepts `compact` for the rooms overview and `caption="full" | "title" | "none"` to avoid repeating the adjacent heading. Accessible SVG titles and descriptions remain present in every variant. `PageIntro` accepts an optional action with a label and route.

## Artwork

`src/components/ConnectionArtwork.astro` renders five original, labeled SVG diagrams from `content.diagrams`, with geometry in `src/lib/diagram-layouts.ts`. The October 27 marketing refinement turns the architecture boxes into illustrated service stories, using original scenes in `src/components/DiagramScene.astro`:

- Hero live journey: sound, screens, and a microphone represent audiovisual spaces; a two-person call represents conferencing; a camera, stage, and mixing controls represent live production; devices represent multiplatform streaming; an AI voice/chat bubble and people represent audience engagement. Desktop uses five scenes across; narrow screens show two inputs, central production, and two audience-delivery scenes. The complete description and relationships also appear in AI Markdown.

- Rooms and participants: two-way room AV and remote participation meet in video conferencing; a dashed optional route reaches online audiences.
- Production and distribution: on-site cameras and remote feeds are grouped as contributions, followed by production, multi-platform delivery, and the audience. The four scenes simplify the six-node technical diagram without removing service capabilities.
- Audience interaction: the live experience reaches the audience; moderated polls, Q&A, and chat bring participation back.
- Content workflows: production feeds a content library, preparation, and reuse/distribution. A folder holding media, a prepared film frame, and playback across devices make each stage recognizable.

The current marketing direction builds on Diagram Design's connection semantics and Taste's established Colour chapters direction (seed 261026). The UnifiedLive mark becomes the visual meeting point for room and remote participants. Pictures carry the service story; captions express customer benefits. Three or four illustrated scenes replace repeated text boxes. Brand colors, readable system typography, orthogonal paths, unique accessible title/description IDs, and AI parity are retained. Narrow production and content diagrams use two rows to shorten the mobile journey. All capability lists remain intact.

Integration exceptions: these are embedded Astro components rather than standalone website replacements. Wide and narrow SVG layouts retain identical nodes and connections; container queries choose the readable layout without JavaScript. This replaces the skill's horizontally scrolling fixed canvas. No external fonts, decorative backgrounds, new animation controller, or extra color variants are added. A self-contained review sheet of all four rendered figures is available at `artifacts/diagram-review.html`; regenerate with `node scripts/review-diagrams.mjs` while the local server is running. No global skill style guide was modified.

These are conceptual service relationships, not operational dashboards or photographic placeholders. No found images, footage, stock assets, credits, or sample proof are used.

## Interaction and accessibility

The example explorer uses ordinary content as its no-JavaScript baseline, enhanced into ARIA tabs. Color changes are instantaneous to avoid low-contrast interpolation. Focus outlines use petrol on bright/light surfaces and off-white on dark surfaces. A brief hero signal highlight and one-time section entrances are the only movement beyond control feedback. Content is never hidden awaiting script. Reduced motion removes animations and transitions.

Contact remains a local validation preview with conditional phone requirements. AI remains a reading document with visible front matter, raw Markdown, copy/download controls, and selectable fallback. Routes, static resources, metadata, and SITE_URL rules are preserved.

## Taste-specific decisions

The saved draw in `.taste-skill/direction.json` is provenance, not a replacement for the approved plan. No randomized redraws were made. Its name-only hero, photography slots, tiled footer, and scroll scenes were superseded by the user-approved exact headline, original SVGs, oversized wordmark footer, and lightweight motion. Photography, footage, scroll hijacking, pinned scenes, and animation libraries were explicitly excluded.

The final inspector allows only `headline-lines`, `few-pictures`, and `still-page` for those approved constraints. The exact headline is the only homepage heading allowed over two lines on phones. The report retains all other checks. See `.taste-skill/REPORT.md` and `VERIFICATION.md` for measurements, visual review, and remaining limitations.
