# leshi.dev

Portfolio for Leshi Taiwo Oluwademilade — Next.js 15, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What to fill in before you deploy

1. **Project screenshots / recordings** — each card in `components/Work.tsx` has an `imageSrc` field, currently omitted so the dashed "+ add media" placeholder shows. Drop real images into `public/projects/` (e.g. `public/projects/chatter.png`) and set `imageSrc: "/projects/chatter.png"` on that project.
2. **Real links** — `href` (case study / live link) and `url` (the little browser-bar text) are placeholders (`#`) for all three projects. Update once Chatter is deployed and you have the AIESEC/Zheeta links.
3. **GitHub/LinkedIn hrefs** — search for `href="#"` next to the Github/Linkedin icons in `components/Hero.tsx`, `components/MenuOverlay.tsx`, and `components/Footer.tsx`, and set them to your real profile URLs.
4. **Resume link** — the "resume" button in `components/Nav.tsx` currently points to `#`; point it at your hosted resume PDF once you have one.

## Deploying

Push to GitHub, then import the repo at vercel.com — zero config needed, Next.js is auto-detected. Or run:

```bash
npm i -g vercel
vercel
```

## Notes on the build

- **Motion respects `prefers-reduced-motion`** — Lenis smooth-scroll and the blob/caret CSS animations turn off automatically for anyone with that OS setting.
- **GSAP contexts are scoped and cleaned up** per component (`gsap.context(...).revert()` on unmount), so this is safe to extend with more sections without leaking ScrollTriggers.
- **Colors, fonts, and section order** live in `tailwind.config.ts` and `app/page.tsx` respectively if you want to adjust the design system later.
