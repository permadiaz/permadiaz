# Permadiaz

Personal website for Dias Dzuhry Permadi at https://permadiaz.my.id/.

## Development

Use Node.js 22.6 or newer.

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Built with React, TypeScript, Vite, and Lucide icons. The studio and product visuals use CSS; the presentation is loaded on demand.

## Experiences

- Interactive studio with four project entry points.
- Selected work with explicit demo, concept, and live-product labels.
- Project details and the decisions behind each build.
- Margin Studio: initially empty, tax off by default, configurable tax, and a saved reference that stays fixed as the live scenario changes.
- Fictional sales scenario with an explanation for each choice.
- Five-part personal presentation, including a working pricing demonstration and optional full screen.
- Responsive layouts, native modal dialogs, keyboard navigation, and reduced-motion support.

Pricing uses gross margin, not markup: selling price = cost / (1 − margin). Selling price and tax round to whole rupiah, so displayed totals match the breakdown. Example tax settings are configurable and make no assertion about the rate applicable to a particular transaction. Inputs remain in browser memory and clear on reload.

## Deployment

The production branch is `main`. Cloudflare Workers Builds deploys this repository, using `npm run build` and the `dist` assets configured in `wrangler.jsonc`.

`public/_headers` supplies security and static asset caching headers. `public/social-card.svg` is the editable source for the 1200 × 630 social preview PNG. Canonical metadata, structured person data, robots.txt, and sitemap.xml point to the production domain.

The older printable CV source is retained in the repository and is not linked from the site.
