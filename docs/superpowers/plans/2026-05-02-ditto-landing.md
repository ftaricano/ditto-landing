# Ditto Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the full Ditto landing page in Vite, React 18, strict TypeScript, and CSS Modules from the provided Antigravity-inspired design spec.

**Architecture:** Keep content in `src/content/copy.ts`, interaction hooks in `src/hooks`, canvas simulations in `src/lib/particles`, and UI in focused component folders. Use CSS custom properties in `src/styles/tokens.css`, CSS Modules for component styling, and semantic section wrappers for reveal/a11y.

**Tech Stack:** Vite, React 18, TypeScript strict, CSS Modules, Lucide React, Framer Motion, Vitest, React Testing Library, ESLint.

---

### Task 1: Scaffold And Verification Harness

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `.eslintrc.cjs`, `src/test/setup.ts`, `src/App.test.tsx`

- [ ] **Step 1: Write failing structure tests**

Create tests that assert the Ditto wordmark, the canonical tagline, all top-level sections, use-case tabs, and newsletter form are rendered.

- [ ] **Step 2: Run tests and verify RED**

Run `npm test -- --run`. Expected: fail because `src/App.tsx` does not exist yet.

- [ ] **Step 3: Add Vite/React/TypeScript/lint scaffold**

Create strict config and scripts: `dev`, `build`, `lint`, `test`.

### Task 2: Tokens, Copy, Hooks, And Particle Core

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/reset.css`, `src/styles/typography.css`, `src/styles/globals.css`, `src/content/copy.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useScrollDirection.ts`, `src/hooks/useScrollReveal.ts`, `src/hooks/useCustomCursor.ts`, `src/lib/particles/boxMuller.ts`, `src/lib/particles/ParticleSystem.ts`

- [ ] **Step 1: Define Ditto design tokens exactly from spec**
- [ ] **Step 2: Centralize production copy without lorem ipsum**
- [ ] **Step 3: Implement reduced-motion, scroll direction, reveal, cursor, and canvas simulation primitives**

### Task 3: Layout, Effects, Media, And Primitives

**Files:**
- Create: `src/main.tsx`, `src/App.tsx`, layout/effects/media/primitives components and CSS Modules.

- [ ] **Step 1: Implement Header, Section, Footer, Container, Button, Eyebrow, Pill**
- [ ] **Step 2: Implement ParticleCanvas, MorphingParticles, BlinkingCursor, CustomCursor, AnimatedFooterSVG**
- [ ] **Step 3: Implement Mockup and VideoPreview with custom hover cursor**

### Task 4: Landing Sections

**Files:**
- Create: all `src/components/sections/*` components and CSS Modules.

- [ ] **Step 1: Implement Hero with particles, staggered text, cursor, CTAs, and trust strip**
- [ ] **Step 2: Implement Pillar Row and three feature split sections**
- [ ] **Step 3: Implement Use Case Carousel, Social Proof, Pricing Teaser, Dark CTA, and Footer integration**

### Task 5: Validation And Review

**Files:**
- Modify as needed based on verification.

- [ ] **Step 1: Run `npm install`**
- [ ] **Step 2: Run `npm test -- --run`**
- [ ] **Step 3: Run `npm run lint`**
- [ ] **Step 4: Run `npm run build`**
- [ ] **Step 5: Run `npm run dev -- --host 127.0.0.1` and verify localhost renders**
- [ ] **Step 6: Request review and fix blockers**
