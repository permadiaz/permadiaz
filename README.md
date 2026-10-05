# permadiaz

Source for **permadiaz.my.id** — personal portfolio and printable CV for Dias Dzuhry Permadi.

## Branches

- `main` — archived baseline of the old static portfolio.
- `v2` — current redesign and deploy target.

## v2 stack

- Vite
- React
- TypeScript
- Framer Motion
- Lucide React
- Static deployment target: Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Cloudflare build settings:

- Production branch: `v2`
- Build command: `npm run build`
- Build output directory: `dist`

## Product direction

The site is intentionally designed as an interactive personal operating system rather than a conventional online CV. Core ideas include:

- Business / Builder perspective switching
- Motion-rich but restrained dark visual system
- Project exploration modals
- Interactive Margin Studio mini-playground
- Career timeline
- Command palette via Cmd/Ctrl + K
- Responsive mobile experience
- Reduced-motion accessibility fallback

The printable CV remains available at `/cv.html`.
