# ORBIT — Web3 Landing Page Template

A premium, **dependency-free** landing page template for Web3 / crypto
projects. One HTML file, one CSS file, one JS file — no build step, no
framework, no external requests. Open `index.html` and it works.

## What's inside

| Section | What it does |
|---|---|
| Sticky nav | Glass-blur header, mobile hamburger menu, theme toggle |
| Hero | Headline, CTAs, copyable contract address, animated stat counters |
| Chains strip | Multi-chain badges (edit the list in `index.html`) |
| Features | 6-card grid (rent, verification, earnings, privacy, SDKs, governance) |
| Tokenomics | SVG donut chart + allocation bars; click an allocation for details |
| Roadmap | 4-milestone timeline (done / in progress / next) |
| Staking calculator | Interactive sliders — amount + lock period, live APR + rewards |
| FAQ | Accessible `<details>` accordion, 5 questions |
| CTA + footer | Gradient call-to-action card, 3-column footer |

**Interactions (all in `app.js`, zero dependencies):**
dark/light theme persisted in `localStorage`, mobile menu, copy-to-clipboard
with fallback, animated counters, allocation detail panel, staking calculator
with lock-period APR boost, scroll-reveal animations, `prefers-reduced-motion`
support.

## Quick start

```bash
# Option 1 — just open it
open index.html

# Option 2 — local server (recommended, so clipboard + fetch behave normally)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Rebrand in 5 minutes

1. **Name / token:** edit the `CONFIG` object at the top of `app.js`
   (`projectName`, `tokenSymbol`, `baseApr`, `allocations`).
2. **Copy:** search-and-replace `ORBIT` / `ORB` in `index.html`.
3. **Colors:** edit the tokens in `:root` at the top of `styles.css`
   (`--accent`, `--accent-2`, `--bg`, `--text`).
4. **Contract address:** replace the `<code id="contractAddr">` value in
   `index.html`.
5. **Tokenomics:** change the percentages in `index.html` (donut segments
   in `styles.css` use `stroke-dasharray`; circumference for r=80 is
   502.65 — segment length = pct × 5.0265).
6. **Roadmap / FAQ:** edit the list items directly in `index.html`.

## Deploy anywhere

Static files only — deploy to GitHub Pages, Netlify, Vercel, Cloudflare
Pages, IPFS, or any static host. No server, no database, no API keys.

## Tested

- Desktop 1280×720 and mobile 390×844 (Chromium headless, 2026-11-19):
  console clean, no failed network requests, all flows clicked twice
  (theme toggle, copy address, FAQ accordion, allocation details,
  staking sliders, mobile menu).
- Screenshots: `screenshots/desktop-1280x720.png`,
  `screenshots/mobile-390x844.png`.

## License

MIT — see `LICENSE`. You may use it for personal and commercial projects.
Attribution appreciated but not required.
