# Taste design rework — 26 October 2026

Direction: **Colour chapters**, seed **261026**, no randomized redraws. The approved plan takes precedence over incompatible slots on the saved direction sheet: the name-only hero, photo sections, pinned scroll scenes, and tiled footer were replaced with the exact headline, four original SVG compositions, brief entrances, and a large wordmark close. See `../DESIGN.md` for the system and reasons.

Idea: **UnifiedLive’s connected delivery model becomes a visual journey from rooms and remote participants through production, distribution, audiences, and content reuse.**

The live interaction is “What are you connecting?”: three examples derived from actual services. Keyboard navigation, enquiry preselection, static fallback, and AI Markdown parity are tested. No selection is stored or transmitted.

## Before / after measurements

| Check | Before | After |
| --- | --- | --- |
| Source lint | 12 failures, 3 warnings | 0 failures, 1 warning |
| Browser inspector | 13 raw failure findings, 7 warnings | 0 failures, 2 warnings with approved exceptions |
| Inspector failures under the same three exceptions | 7 | 0 |
| Desktop hero | 75.6 px, three lines, split composition | 108 px, two lines, artwork below |
| Tablet hero | 51 px, three lines | 62 px, two lines |
| Main body | 15 px desktop; inspector found 12 px tablet text | 18 px desktop / 17 px phone |
| Decorative thin rules | 23 measured | None reported |
| Homepage phone heading wraps | Several over two lines | Only the exact supplied hero uses three |
| Horizontal page overflow | 0 at sampled widths | 0 across ten pages × four widths |

Before and after JSON and browser sheets are retained in `before/` and `after/`. The initial inspector used the dev server; the final inspector used the static production preview. These findings are stylistic diagnostics, not an accessibility score.

Final inspector command:

```sh
node /Users/amarmash/.codex/skills/taste-skill/scripts/inspect.mjs http://127.0.0.1:4322/ --out .taste-skill/after --widths 1440,768,390,375 --allow headline-lines,few-pictures,still-page
```

The allowlist reflects explicit user decisions: three-line exact hero on phones; SVG artwork instead of a raster-picture quota; lightweight movement instead of an animation quota. It does not suppress contrast, overflow, spacing, or other defects. The final metrics confirm that only the supplied hero exceeds two lines on the homepage.

Remaining warnings:

- `size-count`: the meter counts 19 computed sizes, including navigation, captions, fluid city names, display headings, and the giant footer wordmark. These remain legible and visibly subordinate to the display/body hierarchy; consolidating more sizes is a possible future simplification.
- `no-footage`: original abstract artwork and lightweight motion were explicitly approved, with no photography or video assets required.
- Source lint `copy`: “Seamless” is retained in the supplied AV outcome to preserve factual content during this design task.

No photos or clips were sourced; no licenses or credits are needed. The four SVGs are final conceptual illustrations, not placeholders for fabricated case studies. There is no sample client proof to replace. Contact remains a preview and requires a separate delivery integration before launch.

## Visual critique

ROUND 1

Seen in one second: Large white headline on petrol; lime action and connected-room artwork.

Idea (one sentence): UnifiedLive’s integrated delivery becomes a series of connected color chapters.

Live thing: Choose a meeting room, hybrid event, or creator setup and follow the relevant capabilities.

Layout words by section: hero=wide statement / services=index / journey=process / examples=interactive split / industries=editorial links / approach=paired story / presence=city typography / contact=invitation / footer=wordmark.

Scores against approved brief: design 7.5 · usability 7.5 · creativity 7 · content 8 → overall 7.45.

Caps applied: creativity capped at 7 because the connected-delivery concept can also suit competitors. Taste’s default raster-image and headline caps conflict with the approved brief; they are reported separately below.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. The tablet journey heading wrapped to three lines (`artifacts/sheet-home-768.png` from the initial pass). Give the heading its natural width and let the supporting paragraph flex.
2. Small country labels sat above city headings, and the workflow caption sat close to a following heading (initial inspection). Put countries below city names, put the workflow title before its artwork, and separate the journey illustration from the explanatory steps on phones.
3. The selected tab’s off-white focus outline was weak against lime (manual browser screenshot). Use surface-specific contrasting outlines and remove color interpolation during state changes; axe also caught a transient tab color contrast failure before this fix.

ROUND 2 — final

Seen in one second: A confident headline, visible project action, and one connected communication system.

Idea (one sentence): UnifiedLive’s connected delivery model becomes a visual journey through its six capabilities.

Live thing: Three example configurations with keyboard tabs, linked capabilities, and precise enquiry preselection.

Layout words by section: hero=wide statement / services=index / journey=process / examples=interactive split / industries=editorial links / approach=paired story / presence=city typography / contact=invitation / footer=wordmark.

Scores against approved brief: design 8 · usability 8 · creativity 7 · content 8 → overall 7.8.

Caps applied: creativity remains capped at 7; this is a coherent service-led concept rather than an exclusive brand invention. Under Taste’s *unmodified* photography/headline rules, design is capped at 6.5 and overall at 6.5. The approved no-photography and exact-headline decisions are intentionally preserved rather than optimizing for that incompatible default score. These are self-review scores, not an independent jury assessment.

Top three remaining limitations (most visible first), each with the screenshot it shows in and the fix:

1. The long Services page remains information-dense (`artifacts/services-768.png`). All supplied capabilities must remain; the jump links and alternating editorial fields help readers scan them. A future content strategy could add dedicated service routes if requested.
2. Header navigation and artwork captions are smaller than body copy (`after/desktop-fold.jpg`). Their roles are secondary and they pass contrast checks; the dedicated mobile view row keeps the mode controls usable.
3. Original diagrams explain relationships but cannot provide project proof (`after/desktop-page-01.jpg`). Real approved case studies could strengthen this later; no clients, metrics, photographs, or testimonials were invented.

All final inspector fold/page sheets were opened and reviewed at 1440, 768, 390, and 375 px. Complete Playwright captures cover every page at those widths. Additional close review covered long service capabilities, mobile front matter/tables, error feedback, social artwork, and the other content pages. Full technical results are in `../VERIFICATION.md`.
