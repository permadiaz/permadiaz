# Release validation — 5 October 2026

Production: https://permadiaz.my.id/

- TypeScript and Vite production build passed. Initial JavaScript: approximately 57 KB gzip; the presentation loads separately.
- Five pricing tests passed: input validation, gross margin, whole-rupiah rounding, tax, and unsafe-number rejection.
- Live calculator checked with a saved reference, changes to cost/margin/tax, an empty custom tax rate, and reset. The saved reference stayed fixed.
- Project filtering, project details, behind-the-build view, fictional sales feedback, and email copy checked in Chrome.
- All five presentation slides checked, including project selection and the working calculator. Arrow keys on the margin slider did not advance the slide.
- Modal Tab boundaries and Escape checked. Focus returns to the triggering button.
- Responsive layout checked at 320, 390, and 768 pixel frame widths. No horizontal document overflow after correcting the decorative studio shapes. Mobile navigation and large calculator amounts checked.
- No application console errors observed. Browser extension messages were excluded.

Responsive checks used desktop Chrome with constrained frames, not physical Android/iOS devices. Full-screen behavior depends on browser support and has a fallback message. This is a functional and visual check, not a measured Lighthouse or Core Web Vitals score.

The temporary responsive-check page was removed after validation.
