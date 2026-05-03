---
title: "Ditto — Landing Page Design Spec"
type: spec
project: ditto-landing
domain: design
tags: [ditto, landing-page, design-spec, antigravity-language, react]
created: 2026-05-02
status: draft
source_design_language: /Users/jarvis/clawd/second-brain/reference/design/google-antigravity-design-extraction.md
---

# Ditto — Landing Page Design Spec

## 0. Briefing & Posicionamento

**Empresa:** Ditto — B2B SaaS data intelligence platform, "source of truth" para varejo.

**Tagline canônica:** *Noise in. Clarity out.*

**Os três pilares do produto (eixo narrativo da landing):**
1. **Extract** — auto-captura de reviews (iFood, Google Reviews, Yelp, App Stores).
2. **Understand** — NLP que filtra ruído, identifica sentimento e extrai temas.
3. **Act** — insights acionáveis para franquias e PMEs.

**Audiência dual:**
- **Franquias** — vetor: *escalabilidade* (centenas de unidades, comparabilidade).
- **PMEs** — vetor: *eficiência* (dono operando sozinho, decisão rápida).

**Linguagem visual:** Minimalista, moderna, high-end. Adapta a linguagem do Google Antigravity para o universo de varejo/data, com paleta própria (clarity teal) que reforça a metáfora "ruído → sinal".

---

## 1. Linguagem Visual — Adaptação Antigravity → Ditto

| Antigravity | Ditto | Justificativa |
|---|---|---|
| Fundo `#FFFFFF` puro | Mantém `#FFFFFF` puro | Ressonância "papel em branco" + clareza |
| Áreas pretas como contraste | Áreas `#0A0E14` (ink) — preto quase puro com ligeiro azul | Sutilmente menos brutal, mais "data-tech" |
| Acento azul Google | **Acento teal `#14B8A6` ("Clarity Teal")** | Diferenciação de marca; teal evoca "sinal", "clareza", oposto de "ruído" |
| Cursor piscante azul | Cursor piscante teal | Mesmo elemento icônico, com cor da marca |
| Partículas azuis/roxas estilo constelação | **Partículas duais: "noise" cinza slate + "signal" teal** | Metáfora narrativa: ruído entra, sinal sai |
| Fonte Google Sans Flex (variável) | **Inter Variable** + **JetBrains Mono** | Sans Flex não é livre; Inter Variable cobre o range 400–500 e font-stretch suficiente; JetBrains Mono substitui Sans Code |
| Pill buttons (999px) | Mantém pill buttons | Padrão visual unificador |
| Glass morphism `blur(5px)` | Mantém | Header e dropdowns |
| Footer SVG animado morphing | Footer com **wave morphing** (linha que se transforma de "ruído" → "sinal limpo") | Continuidade da metáfora |

**Princípio-mestre:** toda decisão visual reforça `noise → clarity`. Hover, scroll-reveal, partículas, cursor — todos contribuem para a sensação de *resolução* (algo confuso virando algo nítido).

---

## 2. Design Tokens (CSS Custom Properties)

Tokens globais expostos no `:root`. Naming alinha com Material 3 (familiar a quem leu o source) mas com prefixo `--ditto-*` para evitar colisão.

### 2.1 Cores

```css
:root {
  /* Surface */
  --ditto-paper: #FFFFFF;
  --ditto-paper-translucent: rgba(255, 255, 255, 0.85);
  --ditto-ink: #0A0E14;
  --ditto-ink-translucent: rgba(10, 14, 20, 0.92);

  /* Text */
  --ditto-text-primary: #0A0E14;
  --ditto-text-secondary: #475569;     /* slate-600 */
  --ditto-text-tertiary: #94A3B8;      /* slate-400 */
  --ditto-text-on-ink: #F8FAFC;        /* slate-50 */
  --ditto-text-on-ink-secondary: #CBD5E1;

  /* Brand accent — Clarity Teal */
  --ditto-signal-50:  #F0FDFA;
  --ditto-signal-100: #CCFBF1;
  --ditto-signal-300: #5EEAD4;
  --ditto-signal-500: #14B8A6;         /* primary brand */
  --ditto-signal-600: #0D9488;         /* hover */
  --ditto-signal-700: #0F766E;         /* pressed */

  /* Noise palette (used in particles, subtle decoration) */
  --ditto-noise-300: #CBD5E1;
  --ditto-noise-400: #94A3B8;
  --ditto-noise-500: #64748B;

  /* Outline */
  --ditto-outline-variant: rgba(10, 14, 20, 0.08);
  --ditto-outline-strong: rgba(10, 14, 20, 0.16);

  /* Buttons */
  --ditto-button-primary-bg: var(--ditto-ink);
  --ditto-button-primary-fg: var(--ditto-paper);
  --ditto-button-primary-hover: #1E293B;
  --ditto-button-secondary-bg: rgba(10, 14, 20, 0.04);
  --ditto-button-secondary-fg: var(--ditto-ink);
  --ditto-button-accent-bg: var(--ditto-signal-500);
  --ditto-button-accent-fg: #FFFFFF;
  --ditto-button-accent-hover: var(--ditto-signal-600);

  /* Glass surfaces */
  --ditto-glass-bg: rgba(255, 255, 255, 0.85);
  --ditto-glass-blur: 8px;
  --ditto-glass-bg-dark: rgba(10, 14, 20, 0.72);

  /* Modal/overlay */
  --ditto-overlay-soft: rgba(10, 14, 20, 0.06);
  --ditto-overlay-strong: rgba(10, 14, 20, 0.80);
}
```

### 2.2 Espaçamento

Escala 8-pt com extras grandes para padding-block de seção (igual Antigravity, que usa 200–328px entre seções).

```css
:root {
  --ditto-space-2xs: 4px;
  --ditto-space-xs:  8px;
  --ditto-space-sm:  12px;
  --ditto-space-md:  16px;
  --ditto-space-lg:  24px;
  --ditto-space-xl:  32px;
  --ditto-space-2xl: 48px;
  --ditto-space-3xl: 64px;
  --ditto-space-4xl: 96px;
  --ditto-space-5xl: 144px;
  --ditto-space-6xl: 200px;
  --ditto-space-7xl: 288px;

  --ditto-page-margin: clamp(20px, 5vw, 80px);
  --ditto-grid-gutter: 24px;
  --ditto-content-max: 1200px;
  --ditto-prose-max: 720px;
}
```

### 2.3 Border-radius

```css
:root {
  --ditto-corner-sm: 8px;
  --ditto-corner-md: 12px;
  --ditto-corner-lg: 20px;
  --ditto-corner-xl: 32px;
  --ditto-corner-pill: 999px;
}
```

### 2.4 Sombra/elevação

Sombras *muito* sutis — high-end minimalismo não usa drop-shadows óbvias.

```css
:root {
  --ditto-shadow-sm: 0 1px 2px rgba(10, 14, 20, 0.04);
  --ditto-shadow-md: 0 4px 12px rgba(10, 14, 20, 0.06);
  --ditto-shadow-lg: 0 12px 32px rgba(10, 14, 20, 0.08);
  --ditto-shadow-glow-signal: 0 0 32px rgba(20, 184, 166, 0.24);
}
```

### 2.5 Motion

```css
:root {
  --ditto-ease-snap: cubic-bezier(0.2, 0, 0, 1);    /* default snappy */
  --ditto-ease-out:  cubic-bezier(0, 0, 0.2, 1);
  --ditto-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  --ditto-dur-snap: 150ms;       /* button states */
  --ditto-dur-fast: 200ms;
  --ditto-dur-base: 300ms;
  --ditto-dur-slow: 600ms;
  --ditto-dur-reveal: 800ms;     /* scroll-reveal de seção */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --ditto-dur-snap: 0ms;
    --ditto-dur-fast: 0ms;
    --ditto-dur-base: 0ms;
    --ditto-dur-slow: 0ms;
    --ditto-dur-reveal: 0ms;
  }
}
```

---

## 3. Tipografia

### 3.1 Imports (no `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@400;500;700&display=swap"
/>
```

> **Nota:** Inter Variable substitui Google Sans Flex (proprietária). Inter cobre weight 100–900 e tem boa legibilidade em B2B. Se o design exigir font-stretch animável (efeito Antigravity de morphing largura), trocar para **Recursive Variable** (também livre).

### 3.2 Escala fluida

```css
:root {
  --ditto-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --ditto-font-mono: 'JetBrains Mono', 'Menlo', monospace;

  /* Fluid type — clamp(min, vw-based, max) */
  --ditto-text-display:  clamp(3rem, 6vw, 5rem);     /* hero */
  --ditto-text-h1:       clamp(2.25rem, 4.5vw, 3.5rem);
  --ditto-text-h2:       clamp(1.75rem, 3vw, 2.5rem);
  --ditto-text-h3:       clamp(1.25rem, 2vw, 1.625rem);
  --ditto-text-body-lg:  1.125rem;   /* 18px */
  --ditto-text-body:     1rem;       /* 16px */
  --ditto-text-body-sm:  0.875rem;
  --ditto-text-caption:  0.75rem;
  --ditto-text-mono:     0.875rem;
}
```

### 3.3 Hierarquia aplicada

| Elemento | Token | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero display | `--ditto-text-display` | 500 | 1.05 | -0.03em |
| Section H1 | `--ditto-text-h1` | 500 | 1.1 | -0.02em |
| Section H2 | `--ditto-text-h2` | 500 | 1.15 | -0.01em |
| Card title | `--ditto-text-h3` | 600 | 1.25 | 0 |
| Body lead | `--ditto-text-body-lg` | 400 | 1.55 | 0 |
| Body | `--ditto-text-body` | 400 | 1.6 | 0 |
| Caption / eyebrow | `--ditto-text-caption` | 600 | 1 | 0.08em (uppercase) |
| Code / metric | `--ditto-text-mono` | 500 | 1.4 | 0 |
| Button | `--ditto-text-body` | 500 | 1 | 0 |

### 3.4 Eyebrow / kicker pattern

Mini-label sobre H1 de seção, mono ou small-caps. Ex: `EXTRACT · 01`, `UNDERSTAND · 02`. Usa `--ditto-signal-600`.

---

## 4. Estrutura da Página & Component Tree

### 4.1 Mapa de seções (top-down)

```
HEADER (fixed, glass)
├─ Logo + nav links + [Get Demo] CTA

HERO
├─ Background: noise→signal particles canvas
├─ Eyebrow: "Source of truth for retail"
├─ Display: "Noise in." (linha 1) / "Clarity out." (linha 2 com cursor piscante teal no fim)
├─ Body lead: 1 frase explicando o produto
├─ CTA group: [Get Demo] (primary ink) + [See how it works] (secondary)
└─ Trust strip: logos clientes (mute, opacity 60%)

PILLAR ROW (Extract · Understand · Act)
├─ 3 bouncer cards circulares — ícones Material/Lucide animados em sequência
└─ Subtítulo "Three steps from noise to action"

FEATURE — EXTRACT
├─ Layout split: copy à esquerda + UI mockup à direita (com video preview)
├─ Eyebrow "01 — EXTRACT"
└─ Custom cursor pill ao hover do mockup

FEATURE — UNDERSTAND
├─ Layout split invertido (mockup à esquerda)
├─ Eyebrow "02 — UNDERSTAND"
└─ Mostra dashboard de sentimento + temas

FEATURE — ACT
├─ Layout split: copy à esquerda + dashboard de alertas à direita
├─ Eyebrow "03 — ACT"
└─ Inclui exemplo de notificação acionável

USE CASES CAROUSEL
├─ Tabs: [Franquias] [PMEs] (2 segmentos, não 3)
├─ Cada tab carrega: copy + métrica destacada + screenshot
└─ Transição: fade + translateY(30px → 0)

SOCIAL PROOF
├─ Quote grande de cliente
└─ Grid 2×3 de logos

PRICING TEASER (opcional fase 2)
├─ 2 planos lado a lado (PME · Franquia)
└─ CTA para sales

DARK CTA BANNER
├─ Fundo ink com border-radius xl
├─ Partículas signal flutuantes
├─ Headline grande + [Book a demo] (CTA accent teal)
└─ Sub: "30-min walkthrough · sem compromisso"

FOOTER
├─ SVG animado (wave morphing — ruído→sinal contínuo)
├─ Sitemap (Product · Use cases · Company · Legal)
├─ Newsletter inline form
└─ Copyright + social links
```

### 4.2 Component tree (React)

```
src/
├─ App.tsx
│
├─ components/
│  ├─ layout/
│  │  ├─ Header.tsx                # fixed glass, scroll hide/show
│  │  ├─ Footer.tsx
│  │  └─ Section.tsx               # wrapper com padding-block padronizado
│  │
│  ├─ primitives/
│  │  ├─ Button.tsx                # variants: primary | secondary | accent | ghost
│  │  ├─ Pill.tsx                  # tag pill
│  │  ├─ Eyebrow.tsx
│  │  └─ Container.tsx
│  │
│  ├─ effects/
│  │  ├─ ParticleCanvas.tsx        # main particles (noise→signal blend)
│  │  ├─ MorphingParticles.tsx     # CTA dark section
│  │  ├─ BlinkingCursor.tsx        # cursor teal hero
│  │  ├─ CustomCursor.tsx          # pill cursor sobre vídeos
│  │  └─ AnimatedFooterSVG.tsx     # wave morphing
│  │
│  ├─ sections/
│  │  ├─ Hero.tsx
│  │  ├─ PillarRow.tsx             # 3 bouncer cards
│  │  ├─ FeatureExtract.tsx
│  │  ├─ FeatureUnderstand.tsx
│  │  ├─ FeatureAct.tsx
│  │  ├─ UseCaseCarousel.tsx       # tabs + slide
│  │  ├─ SocialProof.tsx
│  │  ├─ DarkCTABanner.tsx
│  │  └─ Footer Newsletter inline
│  │
│  └─ media/
│     ├─ VideoPreview.tsx          # com custom cursor
│     └─ Mockup.tsx                # screenshot wrapper
│
├─ hooks/
│  ├─ useScrollDirection.ts        # header hide/show
│  ├─ useScrollReveal.ts           # IntersectionObserver wrapper
│  ├─ useReducedMotion.ts
│  ├─ useParallax.ts
│  └─ usePointerOver.ts            # custom cursor toggle
│
├─ lib/
│  ├─ particles/
│  │  ├─ ParticleSystem.ts         # core simulation
│  │  ├─ boxMuller.ts              # gaussian distribution
│  │  └─ noiseToSignal.ts          # blend mode logic
│  └─ tokens.ts                    # type-safe acesso a CSS vars (opcional)
│
├─ styles/
│  ├─ tokens.css                   # :root vars
│  ├─ reset.css
│  ├─ typography.css
│  └─ globals.css
│
└─ content/
   └─ copy.ts                      # strings da landing centralizadas (i18n-ready)
```

---

## 5. Animation Choreography

A animação é o vetor narrativo da landing — não é decoração. O usuário deve *sentir* "noise → clarity" ao percorrer.

### 5.1 Hero — Noise to Signal

**Timing zero:** ao carregar, partículas spawn em estado de "ruído" (alta dispersão, cinza slate, movimento browniano).

**T+0ms a T+800ms:**
- Display "Noise in." aparece com fade-up (translateY 16px → 0, opacity 0 → 1, dur 400ms ease-out, delay 200ms).
- Display "Clarity out." aparece com mesmo padrão, delay 500ms.
- Cursor piscante teal aparece ao final de "Clarity out." em T+1200ms, começa loop de blink.

**T+1500ms+:**
- Sistema de partículas inicia transição: 30% das partículas migram para cor `--ditto-signal-500`, ganham padrão de movimento mais ordenado (drift coerente em vez de browniano). O efeito é gradual e contínuo (não termina) — passa a sensação de "ruído sendo destilado".

**Cursor piscante:**
```css
@keyframes ditto-blink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
.ditto-cursor {
  display: inline-block;
  width: 0.6ch;
  height: 1em;
  background: var(--ditto-signal-500);
  margin-left: 0.08em;
  vertical-align: -0.05em;
  animation: ditto-blink 1s steps(2, jump-none) infinite;
  transform: translateY(0.05em);
}
```
> Diferença vs Antigravity: usa box CSS em vez de PNG (mais limpo, escalável, theme-aware).

### 5.2 Header — scroll behavior

```ts
// useScrollDirection.ts
let lastY = 0;
let lastDir: 'up' | 'down' = 'up';

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const dir = y > lastY ? 'down' : 'up';
  if (dir !== lastDir && Math.abs(y - lastY) > 8) {
    lastDir = dir;
    setHidden(dir === 'down' && y > 80);
  }
  setOpaque(y > 12);
  lastY = y;
});
```

CSS:
```css
.header { transition: transform 300ms var(--ditto-ease-snap), background 200ms; }
.header[data-hidden="true"]  { transform: translateY(-100%); }
.header[data-opaque="true"]  { background: var(--ditto-paper); border-bottom: 1px solid var(--ditto-outline-variant); }
.header[data-opaque="false"] { background: var(--ditto-glass-bg); backdrop-filter: blur(var(--ditto-glass-blur)); }
```

### 5.3 Pillar Row — Sequential Bounce

3 cards circulares (Extract · Understand · Act), 120px desktop / 80px mobile.

```css
@keyframes ditto-bounce-in {
  0%   { transform: translateY(40px) scale(0.8); opacity: 0; }
  60%  { transform: translateY(-8px) scale(1.04); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}

.pillar-card {
  opacity: 0;
  animation: ditto-bounce-in 600ms var(--ditto-ease-snap) forwards;
}
.pillar-card:nth-child(1) { animation-delay: 0ms; }
.pillar-card:nth-child(2) { animation-delay: 120ms; }
.pillar-card:nth-child(3) { animation-delay: 240ms; }
```

Trigger via IntersectionObserver: animation-delay aplica só quando seção entra no viewport (usar classe `.in-view` que libera).

### 5.4 Feature sections — Scroll Reveal

Cada FeatureSection tem dois "slots" (copy + media). Reveal escalonado:

```ts
// useScrollReveal.ts
// IntersectionObserver com threshold 0.2
// quando entra: adiciona [data-revealed="true"]
```

```css
.reveal { opacity: 0; transform: translateY(24px); transition: 600ms var(--ditto-ease-out); }
.reveal[data-revealed="true"] { opacity: 1; transform: translateY(0); }
.reveal-1 { transition-delay: 0ms; }
.reveal-2 { transition-delay: 120ms; }
.reveal-3 { transition-delay: 240ms; }
```

### 5.5 Use Case Carousel

```css
.usecase-panel { opacity: 0; visibility: hidden; transform: translateY(30px); transition: 400ms var(--ditto-ease-out); }
.usecase-panel[data-active="true"] { opacity: 1; visibility: visible; transform: translateY(0); }
```

Tab switch: 400ms total. Aria-roles: `tablist` / `tab` / `tabpanel`. Keyboard: ←/→ alternam.

### 5.6 Custom Video Cursor

Ao passar mouse sobre `.video-preview`:
- Cursor original `cursor: none`
- Pill custom segue mouse via `transform: translate(x, y)` (não `top/left`, performance)
- Conteúdo: ícone `Play` (Lucide) + label "Play"

```tsx
<div className="custom-cursor" style={{ transform: `translate(${x}px, ${y}px)` }}>
  <div className="cursor-content">
    <Play size={16} /> <span>Play</span>
  </div>
</div>
```

```css
.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 100;
  will-change: transform;
  transition: opacity 200ms;
}
.cursor-content {
  background: var(--ditto-paper);
  color: var(--ditto-ink);
  padding: 8px 16px 8px 12px;
  border-radius: var(--ditto-corner-pill);
  display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--ditto-outline-variant);
  box-shadow: var(--ditto-shadow-md);
  transform: translate(-50%, -50%);  /* aplicado em wrapper extra */
}
```

### 5.7 Dark CTA — Morphing Particles

Background `--ditto-ink` com `border-radius: var(--ditto-corner-xl)`, padding-block 200px desktop / 120px mobile.

Partículas teal flutuando (variant `MorphingParticles`) — comportamento mais lento e ondulante que o hero.

CTA accent: `--ditto-button-accent-bg` (teal 500), com `--ditto-shadow-glow-signal` no hover.

### 5.8 Footer Wave SVG

SVG wave que morpha entre dois paths: um "ruidoso" (alta frequência) e um "limpo" (sinusoidal puro).

```tsx
<svg viewBox="0 0 1200 200">
  <path d={animatedPath} fill="none" stroke="currentColor" strokeWidth="1.5" />
</svg>
```

Animação via `requestAnimationFrame`, interpolando entre dois arrays de pontos em loop infinito (10s/ciclo). Cor: `--ditto-signal-500` com opacity 0.6.

Margin-block negativo (`-60px -120px`) para overlap com seção anterior, igual Antigravity.

### 5.9 Tabela-resumo de timings

| Elemento | Duração | Ease | Trigger |
|---|---|---|---|
| Button hover | 150ms | snap | hover |
| Header hide/show | 300ms | snap | scroll dir |
| Header opaque toggle | 200ms | out | scrollY > 12 |
| Hero text fade-up | 400ms | out | mount |
| Cursor blink | 1000ms (2 steps) | linear | sempre |
| Pillar bounce (per card) | 600ms | snap | in-view |
| Pillar stagger | 120ms entre cards | — | — |
| Section reveal | 600ms | out | in-view |
| Carousel switch | 400ms | out | tab click |
| Custom cursor follow | instant (RAF) | — | hover |
| Modal backdrop | 200ms | out | open |
| Modal content | 400ms | out | open |
| Footer wave loop | 10s | linear | sempre |

---

## 6. Responsive Breakpoints

Mobile-first. Min-width queries.

| Breakpoint | Min width | Uso |
|---|---|---|
| `xs` | 0px (default) | mobile portrait |
| `sm` | 640px | mobile landscape / phablet |
| `md` | 768px | tablet portrait |
| `lg` | 1024px | tablet landscape / laptop pequeno |
| `xl` | 1280px | desktop |
| `2xl` | 1536px | desktop large |

### 6.1 Adaptações chave por seção

| Seção | < 768px | 768–1024px | ≥ 1024px |
|---|---|---|---|
| Header | hambúrguer menu | links visíveis | links + CTA |
| Hero display | 3rem, text-align center | 4rem center | 5rem left |
| Hero CTA | empilhado (column) | empilhado | inline |
| Pillar Row | scroll horizontal snap | grid 3-col | grid 3-col larger gap |
| Feature split | empilhado, mockup abaixo | empilhado | 50/50 split (alterna lado) |
| UseCase tabs | tabs scrolláveis | tabs centralizadas | tabs centralizadas |
| Dark CTA | padding 120px | 160px | 200px |
| Footer | 1 col → 2 col | 3 col | 4 col |

### 6.2 Particle density (perf)

```ts
const particleCount =
  width < 640  ? 40 :
  width < 1024 ? 80 :
  width < 1536 ? 140 : 200;
```

Em `prefers-reduced-motion: reduce` → desativa partículas (renderiza fallback estático com gradient SVG).

---

## 7. Particle System — Especificação Técnica

### 7.1 Arquitetura

```ts
// lib/particles/ParticleSystem.ts
interface Particle {
  x: number; y: number;       // posição
  vx: number; vy: number;     // velocidade
  size: number;
  alpha: number;
  hue: 'noise' | 'signal';    // determina cor
  mode: 'brownian' | 'drift'; // determina padrão de movimento
}

class ParticleSystem {
  init(count: number): void;
  step(dt: number): void;     // chamado por RAF loop
  render(ctx: CanvasRenderingContext2D): void;
  resize(w: number, h: number): void;
  destroy(): void;
}
```

**Distribuição inicial:** Box-Muller transform (gaussiana centrada no canvas), igual Antigravity.

```ts
function gaussianRandom(mean = 0, stdDev = 1): number {
  const u1 = 1 - Math.random();
  const u2 = Math.random();
  return mean + stdDev * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}
```

### 7.2 Variants

| Variant | Hero | Dark CTA | Tipo |
|---|---|---|---|
| Cor predominante | mix slate + teal | teal puro | — |
| Movimento | brownian → drift | wave drift | — |
| Densidade | média | baixa | — |
| Background | branco | ink | — |

### 7.3 Performance

- RAF loop com `dt` capped em 33ms (evita jumps).
- Pause quando canvas sai do viewport (IntersectionObserver).
- `canvas.willReadFrequently = false`.
- Devicepixelratio aplicado mas capped em 2.
- Off-screen canvas para sprites pré-renderizados (círculo blur).
- Em `prefers-reduced-motion` → não monta canvas, mostra `<div class="static-fallback">` com radial-gradient.

---

## 8. Acessibilidade (a11y)

Não-negociável (B2B high-end pressupõe a11y compliance).

| Item | Requisito |
|---|---|
| Contraste | WCAG AA — todos os pares texto/fundo. Verificado: ink (#0A0E14) sobre paper (#FFF) = 19.5:1 ✓; signal-500 (#14B8A6) sobre paper = 2.8:1 ⚠ → **só usar em text > 18pt ou bold + 14pt**, ou trocar para `--ditto-signal-700` (#0F766E = 4.7:1) em texto pequeno |
| Foco | `:focus-visible` outline ring 2px signal-500 com offset 2px |
| ARIA | tablist/tab/tabpanel no carousel; `aria-current` na nav; `role="dialog"` modal video |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` desativa particles, fade, parallax |
| Heading hierarchy | 1× H1 (hero), H2 por seção, H3 dentro |
| Alt text | Todos mockups com alt descritivo |
| Keyboard nav | Tab order natural, Esc fecha modal, ←/→ no carousel |
| Skip link | `<a class="skip-link">Skip to content</a>` no topo |
| Form (newsletter) | Label visível, error inline, aria-describedby |

---

## 9. Stack Técnico Recomendado

| Camada | Escolha | Justificativa |
|---|---|---|
| Bundler | **Vite** | Familiar ao referencial Antigravity, fast dev, chunk splitting bom |
| Framework | **React 18+** | Solicitação do task ("componentes React"); ecossistema maduro |
| Linguagem | **TypeScript strict** | high-end B2B = type safety |
| Styling | **CSS Modules + tokens.css** (não Tailwind) | Antigravity é CSS puro com vars; manter mesmo padrão; Tailwind embaralharia tokens. Alternativa aceitável: Tailwind com `@theme` mapeado aos vars |
| Animations | **CSS animations + Framer Motion (selectivo)** | Maioria CSS (perf); Framer só para sequencing complexo (carousel, scroll reveal coordenado) |
| Icons | **Lucide React** | Open-source, estilo aproximado Material Symbols |
| Forms | **react-hook-form + zod** | newsletter, demo request |
| Analytics | **Plausible** ou **PostHog** | leve, GDPR-friendly |
| Deploy | **Vercel** ou **Cloudflare Pages** | edge, fast |
| i18n | **react-i18next** (preparado, não obrigatório no MVP) | Ditto fala BR + EN potencialmente |

### Estrutura de pastas final

```
ditto-landing/
├─ public/
│  ├─ fonts/                    # se hostar local
│  ├─ video/                    # mockup videos
│  └─ favicon.svg
├─ src/
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ components/               # ver §4.2
│  ├─ hooks/
│  ├─ lib/
│  ├─ styles/
│  └─ content/copy.ts
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
├─ package.json
└─ DESIGN_SPEC.md               # este doc
```

---

## 10. Implementation Plan — Fases

Cada fase é um milestone validável. Não pular fases.

### Fase 0 — Scaffold & Tokens (estimado: 0.5 dia)
- Vite + React + TS strict.
- `styles/tokens.css` completo (cores, espaçamento, motion, typography vars).
- `styles/reset.css` + `typography.css`.
- Imports de Inter Variable + JetBrains Mono.
- Layout base: Header (sem scroll behavior ainda), Footer placeholder.
- **Critério de aceite:** página em branco com tipografia correta, tokens acessíveis via DevTools.

### Fase 1 — Hero estático + cursor (1 dia)
- `Hero.tsx` com display copy, CTA group, eyebrow.
- `BlinkingCursor.tsx` com animação CSS.
- Trust strip (logos placeholder).
- **Critério:** hero sem partículas mas com tipografia, layout e cursor blink funcional.

### Fase 2 — Particle system (1.5 dia)
- `ParticleSystem.ts` core (Box-Muller, RAF loop, resize, destroy).
- `ParticleCanvas.tsx` componente React wrapper.
- Variant noise→signal blend.
- IntersectionObserver pause.
- Reduced-motion fallback.
- **Critério:** hero com partículas funcionais, perf > 55fps em mobile mid-range, fallback ativo.

### Fase 3 — Pillar Row + Header scroll (0.5 dia)
- `PillarRow.tsx` com 3 bouncer cards e ícones Lucide.
- Sequencial bounce-in com IntersectionObserver.
- `useScrollDirection.ts` + Header hide/show + opaque transition.
- **Critério:** scroll esconde/mostra header; pillars aparecem com bounce ao entrar viewport.

### Fase 4 — Feature sections (1.5 dia)
- 3 seções (`FeatureExtract`, `FeatureUnderstand`, `FeatureAct`) com layout split alternado.
- `Mockup.tsx` + `VideoPreview.tsx` placeholders.
- `CustomCursor.tsx` ao hover de vídeos.
- Scroll reveal (600ms stagger).
- **Critério:** 3 seções renderizando, custom cursor pill funciona ao hover.

### Fase 5 — Use case carousel + Social proof (1 dia)
- `UseCaseCarousel.tsx` com 2 tabs (Franquias · PMEs), keyboard nav, ARIA correto.
- Fade + translateY no panel switch.
- `SocialProof.tsx` com quote + logos.
- **Critério:** tabs funcionam com teclado e mouse, transição suave.

### Fase 6 — Dark CTA + Footer animado (1 dia)
- `DarkCTABanner.tsx` com `MorphingParticles`.
- `Footer.tsx` com newsletter inline form (validação zod).
- `AnimatedFooterSVG.tsx` — wave morphing path interpolation.
- **Critério:** seção CTA dark com partículas teal funcionais; wave SVG anima em loop.

### Fase 7 — Polish & a11y (1 dia)
- Auditoria a11y: contraste, foco, keyboard, ARIA, alt text.
- Lighthouse pass (target: ≥ 95 em todas as categorias).
- Reduced-motion review (todos os elementos respondendo).
- Cross-browser: Chrome, Safari, Firefox + iOS Safari + Chrome Android.
- Copy pass final em `content/copy.ts`.
- **Critério:** Lighthouse mobile ≥ 95/95/100/100, axe-core sem violations.

### Fase 8 — Conteúdo real & assets (0.5 dia)
- Substituir todas placeholders por copy/imagens reais.
- Mockups de produto reais (do dashboard Ditto).
- Logos clientes reais (com permissão).
- **Critério:** zero "Lorem ipsum", zero placeholders.

**Total estimado: ~8 dias** de trabalho focado por 1 dev sênior. Parte 0–6 entrega MVP visual; 7–8 entrega versão production.

---

## 11. Fallback (FALLBACK_IF_BLOCKED simplificação)

Se a fase de implementação for bloqueada por escopo/tempo, simplificar para **3 seções essenciais**, mantendo a linguagem visual:

```
HEADER (fixed, glass)
HERO (com partículas + cursor blink)
PILLAR ROW (Extract · Understand · Act)
DARK CTA (book a demo)
FOOTER (sem wave SVG; estático)
```

Cortes aceitáveis: Feature sections detalhadas, UseCase carousel, social proof, footer animado, custom cursor sobre vídeo. Não cortar: hero particles, blinking cursor, pillar bounce, dark CTA — são os elementos que carregam a linguagem visual.

---

## 12. Open Questions / Decisões pendentes para Ferd

1. **Brand color final:** confirmar Clarity Teal `#14B8A6` ou Ditto tem palette pré-definida em algum brand kit?
2. **Logo Ditto:** existe asset SVG? Se não, gerar wordmark Inter 600 com cursor teal embutido?
3. **Tagline:** "Noise in. Clarity out." vai literal no hero ou Ferd quer testar variações (PT-BR: "Ruído entra. Clareza sai.")?
4. **Idioma do MVP:** PT-BR, EN, ou bilíngue desde o lançamento?
5. **Mockups reais:** existem screenshots do dashboard Ditto ou usamos figmas/placeholders nesta primeira pass?
6. **Domínio & deploy:** Vercel + `ditto.com.br`?
7. **Pricing teaser:** entra no MVP ou fica para v2?

Resolver estes antes da Fase 0 evita retrabalho.

---

## 13. Referências

- **Source design language:** `/Users/jarvis/clawd/second-brain/reference/design/google-antigravity-design-extraction.md`
- **Antigravity live:** https://antigravity.google/
- **Inter Variable:** https://rsms.me/inter/
- **Lucide:** https://lucide.dev/
- **WCAG contrast checker:** https://webaim.org/resources/contrastchecker/

---

*Spec finalizado. Próximo passo: revisão pelo Ferd → invocar `superpowers:writing-plans` para detalhar implementation plan task-by-task.*
