# Improving Rocket3Devs' Mobile Lighthouse Score

Looking at your report together with the actual code in the repo, your score is being dragged down by **three real problems and one measurement problem**: the live demo iframes in the Portfolio section (the main source of your 7.4s main-thread work and TBT), the Google Fonts request chain (the main brake on LCP), render-blocking CSS (~190ms), and a Lighthouse run that's polluted by the React DevTools extension and Cloudflare-injected scripts, which are inflating both the "unused JavaScript" number and your Best Practices warnings.

Desktop shows no issues because Lighthouse mobile simulates a mid-range phone on slow 4G with 4× CPU throttling — the same problems simply cost 4–10× more there.

## Diagnosis at a glance

| Metric | Root cause in your code | Fix | Expected gain |
|---|---|---|---|
| **LCP 4.9s** | `fonts.googleapis.com` CSS (830ms) → 3 chained woff2 files (~790ms each) in `__root.tsx` | Self-host fonts, remove the chain | −1.5 to 2s |
| **TBT 350ms / Main-thread 7.4s** | Two full demo SPAs loaded in iframes on the homepage (`/gym-demo?preview=1` alone costs 1,169ms CPU) + Cloudflare's `jsd/main.js` (723ms) | Lazy-load iframes, drop JSD | TBT → under ~150ms |
| **FCP 2.6s** | Two render-blocking stylesheets (~190ms) + font CSS | Inline critical CSS, merge sheets | −200–400ms |
| **"Unused JS" 140 KiB** | 55.6 KiB is React DevTools' `installHook.js` from the test browser, not your code | Re-run in a clean profile, then analyze the real bundle | Removes ~40% of the finding |
| **Best Practices 77** | Both deprecated-API warnings + console errors come from Cloudflare's injected `jsd/main.js` and `beacon.min.js`, not your bundle | `no-transform` header / disable JSD, clean test browser | Warnings disappear |
| **Cache TTL 4h** | Cloudflare default + `jsd/main.js` | `_headers` file with immutable caching | Faster repeat visits |

---

## Fix 1 — Lazy-load the demo iframes (biggest win)

`DemoPreview` in `src/components/sections/Portfolio.tsx` embeds `/gym-demo` and `/coffee-demo` as live iframes, and both boot a full SSR page + React hydration inside your homepage. That's why `/gym-demo?preview=1` shows up with 1,169ms of CPU time in your own report, and why "Other" main-thread time is 2.1s.

The one-line version — add native lazy loading to the iframe in `DemoPreview`:

```tsx
<iframe
  ref={iframeRef}
  src={href}
  loading="lazy"        // defers the request until near the viewport
  title={title}
  onLoad={() => setLoaded(true)}
  ...
/>
```

Native `loading="lazy"` on iframes defers offscreen iframes until the user scrolls near them, saving data and speeding up initial load — exactly your situation, since Portfolio is far below the fold【turn3search5】.

The better version for mobile: replace the live iframe with a **static screenshot facade** (a scaled image of the demo) plus your existing "Open demo" button, and only mount the real iframe on click or when the section is well inside the viewport. Two full SPAs rendering inside your marketing page is a lot of CPU to spend on mobile before the user ever scrolls there. Your existing `DemoSkeleton` is already a good placeholder — just gate the `<iframe>` behind an IntersectionObserver at ~200px rootMargin instead of rendering it immediately.

## Fix 2 — Self-host the fonts (second biggest win)

In `src/routes/__root.tsx` you load Space Grotesk (4 weights) + Inter (3 weights) from Google Fonts, and your critical path shows the classic chain: HTML → Google CSS (830ms) → three woff2 files (~790ms each). The "unused preconnect" warnings also come from this setup — the hints are being emitted more than once and one set goes unused, so the report flags duplicates. Self-hosting eliminates the whole problem.

```bash
npm i @fontsource-variable/space-grotesk @fontsource-variable/inter
```

```ts
// src/start.ts or src/styles.css — pick one import location
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
```

Then in `styles.css` update your `font-family` stacks to `"Space Grotesk Variable"` / `"Inter Variable"`, and **delete** the Google Fonts `<link>` plus both `preconnect` entries from `__root.tsx`. Vite will fingerprint and serve the woff2 files from your own origin with `font-display: swap`, no cross-origin chain, no render-blocking third-party CSS【turn3search10】. Self-hosted fonts typically improve LCP by a median of ~180ms and remove the cross-origin request chain entirely【turn3search13】【turn3search11】. Since your hero headline likely uses Space Grotesk, that font file gating your LCP now loads from your own CDN on first priority.

If you'd rather keep Google Fonts, then: keep exactly one `preconnect` to `fonts.googleapis.com` **without** `crossorigin` and one to `fonts.gstatic.com` **with** `crossorigin` — font fetches are CORS requests, so the `crossorigin` attribute must match on the gstatic hint【turn3search0】 — and find why they're rendered twice. But honestly, self-hosting is the cleaner fix here.

## Fix 3 — CSS: render-blocking + the 2.5s of Style & Layout

Your two stylesheets (`styles-C03B7f7K.css` 12.9 KiB + `index-BWXZqW84.css` 7.9 KiB) are both render-blocking, worth ~190ms. Since you're doing SSR, you can't just defer them without a flash of unstyled content — but ~21KB is already lean (Tailwind v4 with your `@source` setup is doing its job). The practical moves:

- **Merge the two stylesheets** if the second one is small/route-agnostic, so only one render-blocking request remains, and inline the truly above-the-fold rules (header + hero) into the document head if you want to squeeze the last ~150ms.
- **Cut the Style & Layout time (2,468ms)** — this is the surprising number in your report. Add `content-visibility: auto` with a `contain-intrinsic-size` to your below-fold sections (`#about`, `#services`, `#portfolio`, `#contact`) so the browser skips laying them out until needed:

```css
#about, #services, #portfolio, #contact {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}
```

- Your ambient animations (`ambient-ring`, `ambient-blob`, the dots) run **infinitely** and keep the compositor/main thread busy on mobile, and `lg:transition-[grid-template-columns]` animating grid tracks is layout-expensive. Wrap the ambient animations in `@media (prefers-reduced-motion: no-preference)` and consider pausing them when offscreen.

## Fix 4 — JavaScript payload: separate signal from noise

Two things are inflating this audit:

- **55.6 KiB of the 140 KiB "unused JavaScript" is `chrome-extension://…/installHook.js` — that's React DevTools running in the browser you tested with.** Re-run Lighthouse in a clean Chrome profile or incognito with extensions disabled; this alone will clean up a third of the finding.
- For the real ~52 KiB unused in `index-Cjqrt4Xm.js`, run `npx vite-bundle-visualizer` after a build to see exactly what's inside. Your route splitting is already working (`gym-demo-COARqAwQ.js` is a separate chunk — good). Check that `leaflet` (heavy, and only needed on the demo pages) isn't pulled into the entry bundle, and remember your i18n files import ~16 lucide icons which all land in the main chunk — fine, since the homepage renders them all, but the visualizer will confirm nothing else is sneaking in.

## Fix 5 — Best Practices 77: it's (almost) all Cloudflare, not you

The two deprecated-API warnings (`StorageType.persistent`, Protected Audience) are triggered by `main.js:1` — that's Cloudflare's **JavaScript Detections (JSD)** script (`/cdn-cgi/challenge-platform/scripts/jsd/main.js`) which gets auto-injected into your HTML, not your bundle【turn6search8】. It's also the request with the 4h cache TTL and ~700ms of CPU time in your performance report. Per Cloudflare's own docs, JSD is **not injected if your response carries a `Cache-Control: no-transform` directive** — add that header in your `server.ts` middleware or Nitro route rules and the script (plus its warnings and CPU cost) disappears【turn6search0】. Alternatively, disable Bot Fight Mode / JavaScript Detections in the Cloudflare dashboard.

The `beacon.min.js` `ERR_BLOCKED_BY_CLIENT` console errors are simply an ad blocker (e.g. uBlock Origin) in the testing browser blocking Cloudflare Web Analytics' beacon script — it's a client-side block, not a problem with your site【turn8search1】. Either accept it, or turn off Cloudflare Web Analytics if you don't need it; and definitely run Lighthouse without extensions for clean results.

## Fix 6 — Caching for repeat visits

Your `/assets/*` files are content-hashed, so they can be cached forever. Add a `_headers` file at the root of your Cloudflare Pages project:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

This won't change a cold-cache Lighthouse run, but it fixes the "efficient cache lifetimes" audit and makes repeat visits dramatically faster.

---

## Re-testing properly

Run Lighthouse 3–5 times in **mobile mode, in a clean Chrome profile with zero extensions**, and average the results — a single run with React DevTools and an ad blocker active will keep producing phantom findings like the ones above. Cross-check with PageSpeed Insights, since it also shows real-user field data (CrUX), which is what actually affects your search ranking.

With the iframes lazy-loaded, fonts self-hosted, and JSD gone, you should realistically see LCP drop from 4.9s to roughly 2.5–3s, TBT fall well under 150ms, and the mobile performance score move into the high 80s–90s — with CLS staying at its current perfect 0, since you're not changing anything that affects layout stability.
