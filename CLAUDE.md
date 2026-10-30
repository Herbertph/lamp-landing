# Lamp landing page

Marketing site for Lamp, a desktop app where an AI team (Analyst, Developer, QA) turns a
request into a tested pull request. One page, in English, aimed at developers and QA people
who might join the early access list.

Live site: https://herbertph.github.io/lamp-landing/

## Stack

- Static HTML, CSS and a small amount of vanilla JavaScript. No framework, no bundler, no build step.
- Hosted on GitHub Pages, served from `main` (the repository root). `.nojekyll` keeps Jekyll out of the way.
- Fonts come from Google Fonts (Fraunces and Figtree) via `<link>` in `index.html`.
- The only third-party runtime dependency is the Kit (ConvertKit) form endpoint for early access sign-ups.

## Commands

Run from the repository root.

| What | Command |
|------|---------|
| Serve locally | `python -m http.server 8000` then open http://localhost:8000 |
| Deploy | merge to `main`; GitHub Pages publishes automatically |
| Tests | none yet (see "Definition of done") |

There is nothing to install and nothing to compile. Any static file server works
(`npx serve .` is fine too); opening `index.html` directly with `file://` also renders the
page, but the early access form will not post correctly from `file://`.

## Structure

```
index.html     the whole page: header, hero, film, how it works, what you get, early access, footer
styles.css     all styling, organised by section in the same order as index.html
site.js        early access form: posts with fetch, shows a status message
assets/        lamp-film.mp4 (14 MB promo film), film-poster.jpg, og.png (social image), lamp.svg (favicon)
.nojekyll      tells GitHub Pages not to run Jekyll
README.md      short project note for humans
docs/          specs, test cases and test reports written by the team
```

Largest files: `styles.css` (~11 KB) and `index.html` (~10 KB). Both are single files; keep
them that way rather than splitting the page into components.

### Page sections and anchors

`index.html` is one document with these anchors, which the top navigation links to:
`#film`, `#how`, `#inside`, `#early`, plus `#main` for the skip link. Renaming a section id
breaks navigation and any external links that point at it.

The lamp drawing is an inline SVG `<symbol id="lamp">` near the end of `index.html`, reused by
`<use href="#lamp">` in the header, hero and early access block. Change it in one place only.

## Conventions

- **The live URLs are public and must not change.** `assets/lamp-film.mp4`, `assets/film-poster.jpg`,
  `assets/og.png` and `assets/lamp.svg` are referenced by `index.html` and the social meta tags,
  and may be linked from elsewhere. Rename them only with a redirect or a coordinated update.
- **The Kit form is live.** `index.html` posts to `https://app.kit.com/forms/10112020/subscriptions`
  with field name `email_address`. Changing the form id, the field name or the `action` silently
  loses real sign-ups. Without JavaScript the form still submits natively, so keep the `action`,
  `method` and `name` attributes on the form even if the JS path changes.
- **`site.js` must degrade gracefully.** It returns early when the form or `fetch` is missing, and
  the status element `#early-status` is `role="status" aria-live="polite"`. Keep both.
- **Copy is user-facing and deliberate.** Headlines, the "built by a QA lead" quote and the
  early access promise are the product owner's words; do not rewrite them for style. Ask first.
- **Accessibility basics are already in place** and should stay: skip link, `:focus-visible`
  outline, `prefers-reduced-motion` handling for the smoke animation, alt/aria attributes on
  decorative SVGs, and a visible label (`.visually-hidden`) on the email input.
- **Style:** CSS custom properties in `:root` for colours and fonts; section comments in
  `styles.css` mirror the section order in `index.html`; two-space indentation in HTML/CSS/JS.
- **Language:** all copy on the page is English. Commits, specs and issues are English too.

## Definition of done

A change is done when:

1. It works at http://localhost:8000 on a desktop width and at 375 px wide, with no console errors.
2. Keyboard navigation and the skip link still work, and focus outlines are visible.
3. The early access form still posts to Kit (or, if it was touched, its native fallback still does).
4. No public URL or asset filename changed without updating every reference.
5. The page still passes a quick manual check with JavaScript disabled for content and form fallback.
6. The work is on a feature branch with a PR that lists what changed and how to check it.

The project has no automated tests yet. The first feature that touches `site.js` or the form
should add a smoke test suite (Playwright) that loads the page and submits the form against a
mocked endpoint.
