# UnifiedLive website

A static Astro + TypeScript website. Original Markdown files are retained as reference documents. The supplied AI reference is preserved in `references/ai-agent-content.md` so it cannot shadow the generated `/ai-agent-content.md` endpoint during development.

Diagram copy and relationships are in `content.diagrams` in `src/data/content.ts`; both the website figures and AI Markdown consume them. Wide/narrow geometry lives in `src/lib/diagram-layouts.ts`, rendered by `ConnectionArtwork.astro`. Original customer-facing SVG scenes live in `DiagramScene.astro`; use the existing palette and keep their drawing within the 240 × 144 scene canvas. Keep node and path order aligned with the content model. Run `npm test -- tests/diagrams.spec.ts` after diagram changes. With the dev server running, `node scripts/review-diagrams.mjs` produces a portable HTML review sheet at `artifacts/diagram-review.html` using installed Chrome.

## Run locally

Use a Node.js version supported by Astro 7 and npm (verified here with Node.js 26.8.1).

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Astro. Local builds deliberately use `noindex, nofollow`, omit canonical URLs, and disallow crawling when `SITE_URL` is absent.

```sh
npm run check
npm run build
npm run preview
```

## Release build

Supply the real public origin using a shell environment variable. No domain has been assumed for this project.

```sh
SITE_URL=https://your-real-domain.com npm run build:release
```

The release command fails if the origin is missing or invalid. Deploy the resulting `dist/` directory to a static host that supports clean directory URLs (for example `/services` resolving to `/services/index.html`). Configure that host to use `404.html` for missing routes. Do not rewrite every missing path to the homepage.

`SITE_URL` controls absolute canonical and social-image URLs, Organization schema, robots.txt, and sitemap.xml. `.env.example` documents this setting; the configuration reads the build environment directly. Preview builds intentionally produce an empty sitemap.

Serve `.md` resources as `text/markdown; charset=utf-8` or `text/plain; charset=utf-8`, `.txt` as `text/plain`, and `.xml` as `application/xml` in the hosting configuration. The files remain readable even if the host uses its default MIME mapping. No backend or hosting adapter is required.

## Content and assets

- `src/data/content.ts` is the typed source of truth for company facts, services, capabilities, industries, scenarios, locations, partnerships, FAQs, and contact guidance. Update `lastUpdated` when public content changes.
- `src/data/routes.ts` defines page titles, descriptions, and the public route index.
- `src/lib/markdown.ts` generates the full Markdown document from that content. `/ai` renders that document; `/ai-agent-content.md` serves its raw form; `/llms.txt` indexes it and the site pages.
- Page components provide human-facing presentation and benefit-led introductions. Core facts come from the shared content source. Keep any introductory copy consistent when positioning changes.
- The logo mark and lockups are in `public/brand-mark.svg`, `public/logo.svg`, and `public/logo-on-light.svg`. `Logo.astro` renders the header and footer mark; `DiagramScene.astro` holds the original service illustrations. No external fonts, stock photos, or third-party embeds are loaded.
- Regenerate the social card after changing its design with `node scripts/social-image.mjs`. The generated PNG is in `public/social.png`.

The user’s brief takes precedence over conflicting references. Named-product mentions in the supplied documents have been generalized in public content. No unsupported testimonials, clients, certifications, metrics, addresses, or direct contact details have been added.

## Colour system

The Colour chapters identity uses petrol, off-white, lime, ice, and sky blue. Tokens, components, responsive rules, and reduced-motion behavior live in one stylesheet: `src/styles/global.css`. The former override stylesheet has been removed. `DESIGN.md` documents color roles, artwork, typography, and interaction decisions. Favicon, browser theme color, and social card use this identity.

## Scenario explorer

Edit `content.scenarios` to change the three example configurations. Each scenario references typed `ServiceId` values and an exact contact-interest option. Both `ScenarioExplorer.astro` and the AI Markdown generator consume this source. Update both the scenario and tests when intentionally changing its mapping.

All examples are visible in server-rendered HTML. JavaScript progressively enhances them into tabs supporting Left/Right arrows, Home, End, and ordinary Tab navigation. The selected tab has a contrasting focus ring. No selection is transmitted or persisted; the enquiry link simply carries the existing service query parameter.

## Contact preview

The form validates locally and cannot transmit or save an enquiry. Inputs have no submission names, the form has no delivery endpoint, the validation button is not a submit button, and submission is prevented. Without JavaScript, the button remains disabled and an explanation is visible.

Name, email, service interest, and project details are required. Phone becomes required when the preferred contact method is phone. Organization is optional. Validated entries are not saved to local/session storage. A normal page reload clears entries (browser autofill can still apply the user’s own saved information).

Service and industry links may preselect fields using the `service` and `industry` query parameters. Only matching predefined options are accepted. These links contain no personal information.

Enabling delivery is a separate integration: supply an approved recipient/backend, add server-side validation and abuse protection, and update both shared contact status and form behavior. The current site must not be represented as accepting enquiries.

## Checks

```sh
npx playwright install chromium
npm run build
npm test
```

If Chrome is already installed, you can use `PLAYWRIGHT_CHANNEL=chrome npm test` instead of downloading Chromium.

The test suite checks routes and internal links, content parity, YAML front matter, AI navigation/download/copy fallback, contact validation and absence of network submission, explorer keyboard navigation/preselection/privacy, reduced motion, and no-JavaScript behavior. It checks responsive overflow and axe accessibility across all pages, including 404, at 375, 390, 768, and 1440 pixels. It saves full-page and contact-error screenshots in `artifacts/` and a Playwright report in `playwright-report/`.

To test the built site while the development server remains open, use a separate preview port:

```sh
npm run build
npm run preview -- --port 4322 --ignore-lock
# In another terminal:
TEST_PORT=4322 PLAYWRIGHT_CHANNEL=chrome npm test
```

For a mobile Lighthouse report, with preview running:

```sh
npx lighthouse http://127.0.0.1:4321 --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=artifacts/lighthouse.json
```

Local preview is intentionally not indexable, which affects the SEO score. Use a correctly configured release build when checking production SEO.
