# Customer-focused website refinement — 27 October 2026

Direction retained: Colour chapters, seed 261026. This is a refinement of the approved identity. The customer journey is now: recognize the connected offering, choose a starting point, explore relevant capabilities, understand outcomes, and shape an enquiry. Existing factual content, logo, artwork, service scope, contact-preview honesty, and static AI resources are retained.

ROUND 1
Seen in one second: a large headline and connection artwork.
Idea (one sentence): Help visitors recognize their own live-communication project and find the capabilities that support it.
Live thing: Meeting room / Hybrid event / Creator setup explorer.
Layout words by section: hero=convergence / services=index / journey=process / scenarios=choice / industries=columns / approach=split / presence=statement.
Scores: design 7 · usability 7 · creativity 7 · content 8 → overall 7.1 before strict caps.
Caps applied: approved SVG-only scope and exact mobile headline retain Taste's strict 6.5 cap.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. The hero diagram delays the useful choices in artifacts/marketing-site-before.png. Use a compact four-scene composition and move the explorer immediately after the hero.
2. Service links are visually separated from their customer outcomes in the same before capture. Make each service/outcome pair a full-width linked row with clear directional feedback.
3. Repeated diagram headings and long explanation blocks slow the page. Use caption variants where an adjacent heading already introduces the artwork, and give industry examples, company benefits, and FAQs distinct arrangements.

ROUND 2
Seen in one second: a confident connected-service proposition and a clear project action.
Idea (one sentence): Turn the connected delivery model into a useful path from a customer's starting point to an appropriate service enquiry.
Live thing: The early scenario explorer, with keyboard operation and linked examples without JavaScript.
Layout words by section: hero=four-scene overview / explorer=choice / services=editorial index / journey=sequence / industries=examples and participation / approach=benefits and reuse / FAQ=answers / presence=cities / CTA=invitation.
Scores: design 7.5 · usability 8 · creativity 7 · content 8 → overall 7.6 before strict caps.
Caps applied: approved original SVGs and exact three-line mobile headline retain the strict 6.5 cap. Scores are an internal self-assessment, not a jury result or conversion measurement.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. The initial compact phone label “Beyond the room” exceeded its reserved bounds in artifacts/marketing-site-home-375.png. Reduced the small-node wrap threshold; production diagram tests pass at all four widths after the fix.
2. The narrow homepage remains long because it contains all approved service relationships (mobile-page-01.jpg and mobile-page-02.jpg). Customer choices and enquiry actions are now early; full capability lists remain on Services. No required content was removed to shorten the page artificially.
3. Service illustrations remain conceptual rather than customer proof (desktop-page-02.jpg). They describe actual service relationships; no invented projects, testimonials, metrics, or external imagery were added.

## Verification and exceptions

- Type check and static build pass. All 17 browser checks pass across the full run and targeted corrected-diagram rerun.
- All ten routes pass axe and no-overflow checks at 375, 390, 768, and 1440 px. Existing contact, explorer, AI, keyboard, and reduced-motion behavior passes.
- Taste source lint: zero failures, one unchanged “Seamless” service-copy warning.
- Taste production inspector: zero failures, two warnings. Size-count includes responsive headings, city/footer display type, and accessible SVG labels; those roles remain deliberate. No-footage reflects the approved original-artwork scope and lack of supplied customer footage.
- Impeccable detector: two font warnings only. The approved system sans-serif stack is retained.
- Desktop, tablet, and mobile inspector sheets were reviewed, along with 375 px hero/service content, desktop Services/Industries/About/Global Presence/Partnerships/Contact introductions, and the mobile footer. Inspector capture began before the final label-wrap fix; corrected production diagram captures are artifacts/diagrams-*.png.
- Production Lighthouse local lab result: performance 100, accessibility 100, LCP 0.9 s, CLS 0, TBT 0 ms. Report: artifacts/lighthouse-marketing-site.json.

No conversion uplift is claimed without visitor data. The work strengthens hierarchy, relevance, navigation, and the visibility of next steps while preserving the approved factual and technical boundaries.
