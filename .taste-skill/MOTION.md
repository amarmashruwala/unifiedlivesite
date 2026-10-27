# UnifiedLive motion pass — 27 October 2026

The reference was https://layercake.cloud/, observed in the browser. Its changing hero composition and staggered service entrances informed this pass. Browser observation was sufficient; no REA package, competitor code, images, or assets were needed.

Direction retained: **Colour chapters**, seed **261026**, with no redraw. The existing palette, typography, original diagrams, exact headline, and content remain the design foundation.

Idea: UnifiedLive's connected delivery workflow becomes a visible moving signal, carrying attention from AV and conferencing to live production, multiplatform streaming, and AI-powered participation.

## Implemented behavior

- Hero stages highlight every 3.8 seconds, with a corresponding service link sourced from the shared content model.
- The five stage controls support click, Tab, arrow keys, Home, and End. Manual selection holds the chosen stage; the visitor can pause and resume the overall motion.
- Signals follow the existing diagram relationships. Illustrations have audio levels, speaker movement, mixing controls, broadcast waves, and audience response activity.
- Editorial sections arrive in staggered groups. Service rows slide in; illustrations settle into position; the footer wordmark moves subtly with scrolling in supporting browsers.
- Scenario changes, menu opening, FAQ expansion, service hover, and primary actions have short visual feedback.
- Hovering or focusing the hero pauses automatic progression. Animation clocks stop offscreen and when the page is hidden. Reduced motion disables autoplay and travel, including when the system preference changes during a visit.
- Pause controls exist beside the hero and below the footer. Their state is page-local; no preferences or personal data are stored or transmitted.
- Static content is visible by default. No JavaScript means a complete diagram and ordinary links, with playback controls hidden.

## Verification

- `ASTRO_TELEMETRY_DISABLED=1 npm run check`: zero errors, warnings, or hints.
- `ASTRO_TELEMETRY_DISABLED=1 npm run build`: all 10 pages and static resources built.
- `TEST_PORT=4323 PLAYWRIGHT_CHANNEL=chrome npm test`: **20 passed**. Covers existing routes, content parity, enquiry validation/privacy, scenario selection, navigation, no-JavaScript behavior, diagram geometry, keyboard controls, autoplay, pause, offscreen animation, and runtime reduced-motion changes.
- Axe checks passed across the site's routes at 375, 390, 768, and 1440px, with no horizontal page overflow.
- Lighthouse mobile performance on the local production build: **100/100**; FCP **0.9s**, LCP **1.1s**, TBT **0ms**, CLS **0**, speed index **1.4s**. These are local lab results, not field performance.
- Taste source lint: zero failures; one pre-existing copy warning for “Seamless” in the factual service content.
- Taste responsive inspection: zero failures with the explicit `few-pictures,headline-lines` exceptions. The exact headline remains four lines on narrow phones; the requested original SVGs are retained instead of adding photography or footage to satisfy a quota. Remaining warnings concern the inherited responsive font sizes and absence of footage.
- Browser checks found transient text contrast failures during opacity fades and simultaneous foreground/background transitions. Both were corrected by keeping text at full contrast and switching inverted colors together.
- Screenshots: `.taste-skill/motion-after/`; detailed local Lighthouse data: `artifacts/lighthouse-motion.json`.

## Visual review

ROUND 3

Seen in one second: a dark, large-type proposition above a connected set of AV, conferencing, production, streaming, and audience illustrations.

Idea (one sentence): The connected workflow carries a visible signal and shifts the visitor's attention through the five live stages.

Live thing: the selectable, pausable hero journey and the existing scenario explorer.

Layout words by section: hero=connected sequence / explorer=interactive split / services=editorial index / journey=process / industries=asymmetric illustration / approach=two stories / FAQ=disclosure / presence=large city names / CTA=statement / footer=wordmark.

Scores (subjective Taste rubric): design 6.5 · usability 9 · creativity 7 · content 9 → overall 6.5 after rubric caps.

Caps applied: the skill caps scores for a long phone headline and fewer than four raster pictures, both deliberate exceptions to honor the approved brief. The report does not treat those caps as functional defects or replace the brand to raise the score.

Top three observations:

1. The mobile hero is tall (`mobile-page-01.jpg`). Its complete five-stage diagram remains readable, rather than being compressed into tiny labels.
2. The site's type scale has many inherited responsive sizes (`desktop-page-01.jpg`, `tablet-page-01.jpg`). This pass focuses on motion and preserves that hierarchy.
3. The diagrams carry the service story without photography (`desktop-fold.jpg`). The new signal motion gives them activity while retaining their original, factual presentation.

All supplied content remains intact; no sample claims, found imagery, footage, or external credits were added.
