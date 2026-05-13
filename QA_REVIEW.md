---
title: "Ditto Landing — QA Review"
type: review
project: ditto-landing
reviewer: claude-acp (4 parallel review lanes)
spec: /Users/jarvis/jarvis-hub/projects/ditto-landing/DESIGN_SPEC.md
date: 2026-05-02
status: pass-with-blockers
---

# Ditto Landing — QA Review

## SUMMARY

Implementation covers all sections in DESIGN_SPEC §4.1 and exceeds the §11 fallback floor: Header, Hero, PillarRow, 3× FeatureSection, UseCaseCarousel, SocialProof, PricingTeaser, DarkCTABanner, animated Footer SVG, custom video cursor, modal video preview. Build passes, TypeScript strict, CSS Modules clean, skip link + tablist ARIA + heading hierarchy in place. **However, two narrative-defining behaviors from spec §5.1 are wrong or missing — the noise→signal particle migration is static rather than time-evolving, and the blinking cursor's rhythm is wrong (0.5s smooth fade instead of 1s hard 2-step). These two flaws gut-shoot the "ruído → clareza" thesis the entire visual language is engineered around.** Token plumbing has small but value-bearing drifts (`corner-xl`, `glass-blur`, h1↔h2 size inversion, missing negative letter-spacing). Code quality is solid but has a self-retriggering `useEffect` in ParticleCanvas that resets particle state on every viewport toggle, plus a few a11y/spec gaps (Home/End keys missing on carousel, footer mailto hijacks SPA, anchor-without-href Button primitive). Recommend addressing CRITICAL items before any external preview.

---

## CRITICAL (blocking — fix before preview)

1. **Noise→signal particle transition is absent — narrative core broken.**
   - `src/lib/particles/ParticleSystem.ts:91-107` — `createParticle` assigns `signal = cta || index % 4 === 0` statically. There is no time tracking, no scheduled migration, no transition.
   - Spec §5.1: *"T+1500ms+: 30% das partículas migram para `--ditto-signal-500`, ganham padrão drift coerente. O efeito é gradual e contínuo (não termina) — passa a sensação de ruído sendo destilado."*
   - Implementation gives a static 25% signal mix from frame 0. The whole "noise → clarity" promise of the page never plays.
   - Related: `src/lib/particles/noiseToSignal.ts` is missing entirely (spec §4.2 named it).

2. **BlinkingCursor: wrong duration and wrong keyframe shape.**
   - `src/components/effects/BlinkingCursor.module.css:2,12-22` — uses `animation: blink 0.5s infinite` (linear) with keyframes `0%→0, 10%→1, 100%→0` (a fast flash, half the spec period).
   - Spec §5.1 mandates `1s steps(2, jump-none) infinite` with `0%,49% opacity:1; 50%,100% opacity:0` — crisp 0.5s on / 0.5s off square wave (terminal-cursor feel, the Antigravity signature).
   - Currently it pulses/throbs instead of blinking.
   - Same wrong animation duplicated in `src/components/layout/Header.module.css:40-44, 112-122`.

3. **ParticleCanvas re-initializes on every viewport entry/exit.**
   - `src/components/effects/ParticleCanvas.tsx:65` — `useEffect` deps include `visible`. Every IntersectionObserver toggle re-runs the effect: `system.destroy()` clears all particles, then `init()` repopulates them with fresh Box-Muller positions.
   - Even if the temporal noise→signal migration is added (CRITICAL #1), it would reset every time the user scrolls the hero out and back in.
   - Fix: keep `visible` in a ref read inside `frame`; do not include it in deps.

4. **Hero text reveal timing & cursor delay missing.**
   - `src/components/sections/Hero.tsx` — no staged fade-up sequence (spec §5.1: line 1 at 200ms, line 2 at 500ms, cursor appears at 1200ms then starts blink loop).
   - Cursor renders inline immediately on mount; both display lines appear together. The choreographed entrance is absent.

---

## MAJOR (should fix)

5. **Token value drift in `src/styles/tokens.css`.**
   - `tokens.css:31` — `--ditto-glass-blur: 6px` ≠ spec §2.1 `8px` (header glass weaker than designed).
   - `tokens.css:56` — `--ditto-corner-xl: 48px` ≠ spec §2.3 `32px` (DarkCTA + cards visibly more pillowy).
   - `tokens.css:30` — `--ditto-glass-bg` opacity `0.86` vs spec `0.85` (cosmetic, but inconsistent with `--ditto-paper-translucent: 0.85`).

6. **Typography hierarchy collapsed.**
   - `src/styles/typography.css:8-13, 16-21` — `h1 { font-size: var(--ditto-text-display) }` and `h2 { font-size: var(--ditto-text-h1) }`. Section H2s render at H1 size (clamp 2.25–3.5rem instead of 1.75–2.5rem). Visual rhythm of section titles is inflated.
   - `typography.css:11, 18, 25` — `letter-spacing: 0` on h1/h2/h3 explicit. Spec §3.3 mandates `-0.03em / -0.02em / -0.01em`. Negative tracking is the Antigravity display signature; without it Inter looks generic.

7. **AnimatedFooterSVG uses CSS `@keyframes` on `d` attribute — Firefox-broken.**
   - `src/components/effects/AnimatedFooterSVG.module.css:33-41` — animates SVG `d` attribute via CSS keyframes. Works only in Chromium 125+ / Safari TP.
   - Spec §5.8 explicitly called for `requestAnimationFrame` + JS path interpolation precisely to avoid this. In Firefox the wave will be static or jump between paths.

8. **Pillar bounce triggers at mount, not in-view.**
   - `src/components/sections/PillarRow.module.css:19` + `PillarRow.tsx:17` — `.card { animation: bounceIn 600ms ... both }` runs immediately on mount.
   - Spec §5.3 mandates IntersectionObserver gating (`.in-view` class releases the animation). Section is below the fold; bounce keyframes will play out invisibly before the user scrolls there. Section-level reveal still fades the wrapper, but the choreographed bounce is wasted.

9. **Reduced-motion does not silence most animations.**
   - `BlinkingCursor.module.css`, `PillarRow.module.css`, `UseCaseCarousel.module.css`, `AnimatedFooterSVG.module.css` use literal durations (`0.5s`, `600ms`, `400ms`, `10s linear infinite`) instead of `var(--ditto-dur-*)`. Spec §2.5 zeros the duration tokens under `prefers-reduced-motion: reduce`, but these modules don't consume them.
   - Fix: route through duration tokens or wrap in `@media (prefers-reduced-motion: no-preference)`.

10. **ParticleSystem hardcodes RGB instead of reading tokens.**
    - `src/lib/particles/ParticleSystem.ts:20-23` — raw `148, 163, 184` and `20, 184, 166`. Spec §9 requires token-driven palette. Fix: read via `getComputedStyle(document.documentElement).getPropertyValue('--ditto-signal-500')`.

11. **UseCaseCarousel missing Home/End keys.**
    - `src/components/sections/UseCaseCarousel.tsx:24-31` — handles only `ArrowLeft`/`ArrowRight`. Spec §8 a11y row "Keyboard nav" implies WAI-ARIA tablist pattern, which mandates Home/End to jump to first/last tab.

12. **Footer.tsx — unsafe parse + SPA hijack on submit.**
    - `src/components/layout/Footer.tsx:21` — `JSON.parse(localStorage.getItem(...))` cast to `string[]` without validation. Corrupt storage throws and crashes submit.
    - `src/components/layout/Footer.tsx:25` — `window.location.href = 'mailto:...'` after setting success state navigates away; success message never visible. Likely scope creep — spec §10 Phase 6 mentioned only zod validation.

13. **Button primitive renders `<a>` without `href`.**
    - `src/components/primitives/Button.tsx:14` — anchor without href is non-interactive and not focusable.
    - `src/components/layout/Footer.tsx:50` bypasses Button entirely and renders raw `<button>` for the newsletter submit — inconsistent contract. Add polymorphic `as` prop or sibling `<button>` primitive.

14. **Component tree drift vs spec §4.2.**
    - `lib/particles/noiseToSignal.ts` missing (related to CRITICAL #1).
    - `hooks/useParallax.ts` missing — no parallax behavior anywhere.
    - 3 separate `Feature{Extract,Understand,Act}.tsx` collapsed to single `FeatureSection.tsx` driven by data array — acceptable simplification, but `App.tsx:23` uses `reversed={index === 1}` which is brittle (relies on array order in `copy.ts`; reorder breaks layout silently). Move `reversed` into the data model.

---

## MINOR (nice to fix)

15. **Hero.module.css:5,92 — hardcoded `144px / 72px / 120px / 56px`** bypass `--ditto-space-*` tokens.

16. **PillarRow.module.css:33-35 — hardcoded rgba** for icon backgrounds (`rgba(20, 184, 166, 0.18)`, `rgba(183, 191, 217, 0.09)`); the slate triplet doesn't match any `--ditto-noise-*` token.

17. **Header mobile menu button** (`src/components/layout/Header.tsx:30`) lacks explicit `aria-label`; relies on srOnly text. Prefer `aria-label="Toggle navigation"` for unambiguous SR announcement.

18. **`useScrollDirection.ts`** — RAF id is not cancelled on unmount; setState may fire on unmounted component if unmount races a scroll tick.

19. **Footer links all `href="#hero"`** (`src/components/layout/Footer.tsx:61`) — dead/placeholder anchors.

20. **`tsconfig.json`** has strict on but lacks `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. Recommended for landing-grade rigor (e.g., `tabRefs.current[index]` is typed as nullable only because the array element type allows null).

21. **`src/lib/particles/ParticleSystem.ts:43`** — magic numbers (`0.018`, `0.988`, etc.) undocumented; extract to named constants.

22. **`src/content/copy.ts`** — copy is plausible but invented (`'42k reviews'`, `'87% clarity score'`, `'NOVA MART'` logos all placeholder-grade). Spec §10 Phase 8 explicitly calls this out as remaining work.

23. **`PricingTeaser` implemented** though spec §11 fallback omits it. Not a defect; flagging for scope visibility.

---

## SCORES

### VISUAL_FIDELITY_SCORE: **6.5 / 10**
Token architecture and component composition are clean and largely token-driven, but value drifts in `--ditto-corner-xl` and `--ditto-glass-blur`, the wrong cursor blink rhythm, the typography hierarchy inversion (h2 sized as h1), and absent negative letter-spacing flatten the high-end Antigravity display feel the spec was designed to deliver.

### ANIMATION_SCORE: **5 / 10**
Plumbing is mostly correct (RAF loop, IntersectionObserver, DPR cap, Box-Muller, ARIA, transform-driven custom cursor, header scroll behavior). But the two narrative-defining animations — the cursor blink rhythm and the time-evolving noise→signal particle migration — are wrong or absent, and the ParticleCanvas re-init bug means the system state is destroyed every viewport toggle. Also the SVG wave morphing relies on `d`-attribute CSS keyframes, which are Firefox-broken; spec specifically required RAF interpolation to avoid this.

### CODE_QUALITY_SCORE: **6.5 / 10**
Solid React fundamentals, clean CSS Modules discipline, TypeScript strict on, Lucide imports tree-shake-safe, skip link present, ARIA tablist correct on UseCaseCarousel, no dead code or stray console statements. Held back by: ParticleCanvas effect-dep bug (CRITICAL), missing Home/End keyboard nav, unsafe `localStorage` parse, `mailto:` SPA hijack, anchor-without-href Button primitive, hardcoded particle palette, and missing rAF cleanup in `useScrollDirection`.

---

## TL;DR for the implementer

If picking up only one thing: fix the `ParticleSystem` to add temporal noise→signal migration (`elapsedMs += dt`; after 1500ms, gradually flip ~30% of `noise/brownian` particles to `signal/drift` over a window), and fix `BlinkingCursor` to `1s steps(2, jump-none)` with the spec keyframes. Those two changes restore the "noise → clarity" narrative the entire page is engineered around. Everything else is tightening.

SKILLS_USADAS: superpowers:using-superpowers; code-review:code-review (adapted from PR-flow to local QA review since no PR exists); 4× parallel Code Reviewer subagents (visual fidelity / animation / code quality / spec gaps).
