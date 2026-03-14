# MASTER PROMPT — Cinematic Scroll Landing Page (React 19 + Three.js + GSAP + Tailwind)

## Role

Act as a senior front-end engineer + motion designer. Build a **single-page landing page** that feels **premium, cinematic, and scroll-driven**, using **React 19**, **Three.js** (3D), **GSAP + ScrollTrigger** (animation), and **Tailwind CSS** (styling). Favor **pixel-perfect layout**, **clean component boundaries**, and **performance-first animation**.

You have full creative control over the landing page’s brand and content, **as long as it stays coherent and high quality**.

## Goal

Deliver a production-ready landing page that:
- Looks like a modern award-style product site (high-end, crisp typography, tasteful glow, glass surfaces).
- Uses scroll as the primary storytelling mechanic (reveals, pins, transitions, 3D morphs).
- Includes an interactive 3D hero + one pinned “chapter” section driven by scroll.
- Remains accessible, responsive, and performant.

## Hard Constraints (must follow)

### Tech + Environment
- Use **React 19 + TypeScript** (functional components only).
- Use **Tailwind CSS** for all styling (no custom component CSS except for tiny global utilities if needed).
- Use **GSAP + ScrollTrigger** for scroll animation (no manual scroll listeners for core effects).
- Use **Three.js** for 3D. Recommended integration: `@react-three/fiber` + `@react-three/drei` (allowed and preferred).
- Keep it **Vite** (do not migrate frameworks).

### Quality Bar
- “Pixel-perfect”: consistent grid, spacing scale, typography scale; no random paddings/margins.
- Animation: smooth (target 60fps), never janky; avoid animating layout properties.
- Accessibility: keyboard navigation, visible focus, semantic structure, reduced-motion support.
- Mobile: no pinned sections that trap scrolling; degrade or simplify on small screens.

### Output
- Implement the page in this repo with a clean folder structure (see below).
- Write copy/content as specified in the “Content” section. You may refine wording, but keep the same meaning and structure.

## Project Concept (brand + tone)

### Brand
- **Name:** ORBIT
- **Tagline:** “Scroll-driven product stories with real-time 3D.”
- **Voice:** confident, modern, slightly poetic but still technical; avoid hypey “AI magic” clichés.

### Visual Theme
- Dark, deep-space base with subtle noise + aurora gradients.
- Glass + soft borders + controlled glow; no neon overload.
- Motion feels like “inertia”: ease-out, drift, parallax, subtle overshoot.

## Folder Structure (create + follow)

Use this structure (keep files small and composable):

```
src/
  app/
    App.tsx
  components/
    Container.tsx
    Section.tsx
    Button.tsx
    Badge.tsx
    Card.tsx
    Heading.tsx
    Divider.tsx
    LogoCloud.tsx
  sections/
    Navbar.tsx
    Hero.tsx
    SocialProof.tsx
    Features.tsx
    ScrollChapters.tsx
    HowItWorks.tsx
    Testimonials.tsx
    Pricing.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
  three/
    SceneCanvas.tsx
    OrbitArtifact.tsx
    materials/
      auroraMaterial.ts
  motion/
    gsap.ts
    useReducedMotion.ts
    useIsTouchDevice.ts
    sections/
      heroMotion.ts
      chaptersMotion.ts
      featuresMotion.ts
  content/
    landing.ts
  styles/
    globals.css (Tailwind entry + tiny globals only)
```

Rules:
- Keep *all copy* in `src/content/landing.ts` (single source of truth).
- Keep *all GSAP timelines* in `src/motion/sections/*`.
- Components render markup only; motion files attach animations by targeting `data-` attributes / refs.
- Prefer `data-anim="..."` hooks over brittle class selectors.

## Design System (global rules)

### Layout Grid
- Base spacing unit: **8px**.
- Page gutters:
  - Mobile: 20px
  - Tablet: 28px
  - Desktop: 32px
- Container max width: **1200px** (`max-w-[1200px]`).
- Section vertical padding:
  - Mobile: `py-20`
  - Desktop: `py-28`
- Use a consistent rhythm: headings + supporting text + visual + CTA.

### Typography (Tailwind classes)
- Headings: tight tracking, high contrast.
  - H1: `text-[44px] leading-[1.02] tracking-[-0.04em] md:text-[72px]`
  - H2: `text-[32px] leading-[1.08] tracking-[-0.03em] md:text-[48px]`
  - H3: `text-[22px] leading-[1.15] tracking-[-0.02em] md:text-[28px]`
- Body: readable, slightly muted.
  - Body: `text-[16px] leading-[1.6] md:text-[18px]`
  - Small: `text-[13px] leading-[1.45]`
- Maximum text width for long paragraphs: **62ch**.

### Color Tokens (implement via CSS variables + Tailwind utilities)

Use a dark theme with tokens (example values; adjust slightly if needed, but keep intent):
- `--bg`: `#070A12`
- `--surface`: `rgba(255,255,255,0.06)`
- `--surface-strong`: `rgba(255,255,255,0.10)`
- `--border`: `rgba(255,255,255,0.10)`
- `--text`: `#EAF0FF`
- `--muted`: `rgba(234,240,255,0.72)`
- `--muted-2`: `rgba(234,240,255,0.56)`
- `--brand-a`: `#7C5CFF` (iris)
- `--brand-b`: `#2EE9A6` (aurora mint)
- `--brand-c`: `#56A8FF` (nebula blue)

Gradients:
- Primary glow: `from-[var(--brand-a)] via-[var(--brand-c)] to-[var(--brand-b)]`

### Surfaces + Effects
- Cards: glass surface with subtle border + noise.
  - Base: `bg-[color:var(--surface)]`
  - Hover: `bg-[color:var(--surface-strong)]`
  - Border: `border border-[color:var(--border)]`
  - Radius: `rounded-2xl` (16px) for cards, `rounded-full` for pills.
  - Shadow: soft only (`shadow-[0_0_0_1px_rgba(255,255,255,0.05)]` + mild glow on hover).
- Avoid heavy drop shadows; use borders + glow instead.

### Buttons
Primary button:
- Gradient fill + subtle highlight line.
- Hover: raise brightness slightly; add soft glow; no layout shift.
Secondary button:
- Transparent with border; hover increases surface opacity.

### Icons
- Use a consistent icon set (recommended: `lucide-react`).
- Icon size: 20–24px; align with text baseline.

## Animation System (global rules)

### Motion Principles
- Animate **transform + opacity** only for main transitions.
- Use GSAP `context()` and cleanup on unmount.
- Prefer `useLayoutEffect` for timeline creation (avoid flicker).
- Use `ScrollTrigger` for all scroll-driven effects (no raw scroll handlers).

### Timing + Easing
- Default durations:
  - Micro: 0.18–0.24s
  - UI hover: 0.22–0.30s
  - Section reveal: 0.6–1.0s
  - Chapter transitions: 0.8–1.4s
- Easing set:
  - `power2.out` for UI
  - `power3.out` for reveals
  - `expo.out` for hero wow moments (sparingly)

### Reduced Motion
- Respect `prefers-reduced-motion: reduce`.
- When reduced motion is on:
  - Disable scroll scrubbing and pinning.
  - Keep content visible (no hidden-by-default).
  - Allow minimal fades only (≤ 200ms).

### Scroll Rules
- Do not pin on small screens (`< md`) or touch devices; use a stacked layout instead.
- Avoid scroll-jacking: no custom smooth scroll libraries unless explicitly requested.
- Keep pinned chapters to **one** main section (the “Scroll Chapters”).

## 3D System (Three.js)

### 3D Artifact (the hero object)
Create a single iconic abstract artifact called **“Orbit Artifact”**:
- Geometry: icosahedron or torus-knot (medium poly) with subtle deformation.
- Material: glassy / iridescent look (use physical material or a lightweight custom shader).
- Lighting: 1 key + 1 rim + subtle ambient; background remains dark.
- Interaction:
  - Slight parallax on mouse move (desktop only).
  - Rotation and “energy” intensity respond to scroll progress in the chapters section.

### Performance Rules
- Clamp DPR (`dpr={[1, 1.5]}` or equivalent).
- Freeze expensive effects on background tabs; avoid heavy postprocessing on mobile.
- Canvas should not exceed ~40–45% of viewport height on mobile; allow it to collapse.

## Landing Page Layout (sections + content)

Implement the sections in this order. Use anchors so navbar links scroll to sections.

### 1) Navbar (sticky / floating)
Layout:
- Floating pill navbar on desktop: `fixed top-4 left-0 right-0 z-50`.
- Inside: logo left, links center, CTA right.
Links: “Features”, “Chapters”, “Pricing”, “FAQ”.
CTA: “Get early access”.

Animation:
- On scroll down: shrink slightly + increase blur/surface opacity.
- On scroll up: restore.

### 2) Hero (with 3D)
Headline:
- “Build scroll stories people actually feel.”
Subhead:
- “ORBIT blends real-time 3D with precise motion so your product narrative unfolds naturally—one scroll at a time.”
Primary CTA: “Request a demo”
Secondary CTA: “See the motion spec”
Supporting line (small):
- “React 19 • Three.js • GSAP • Tailwind”

Layout:
- 2-column on desktop:
  - Left: text + CTAs + 3 small proof bullets
  - Right: 3D canvas artifact
- Proof bullets (short):
  - “Pinned chapters without scroll-jank”
  - “3D that degrades gracefully”
  - “Motion system you can maintain”

Animation:
- Page load: hero text rises in (stagger), artifact fades + rotates in.
- Subtle continuous drift on artifact (desktop only).

### 3) Social Proof (logo cloud + metrics)
Heading:
- “Trusted by teams who ship polished motion.”
Logos (use text-based placeholders if no assets):
- “NORTHR”, “KITEWORKS”, “LUMEN”, “ARCWARD”, “HYPERLOOP”, “STUDIO/9”
Metrics (3 cards):
- “+38%” — “Average scroll depth”
- “-22%” — “Time-to-first-delight”
- “2.1×” — “Demo-to-signup conversion”

Animation:
- Fade/slide-in on enter; subtle counter-up for metrics (no excessive bounce).

### 4) Features (grid)
Heading:
- “Everything you need to choreograph attention.”
Subhead:
- “A small system of reusable sections, timelines, and 3D primitives—built to stay fast.”

Feature cards (6):
1. **Chaptered storytelling** — “Pin, scrub, and transition content without trapping the user.”
2. **Artifact-driven branding** — “A single 3D object becomes your visual signature.”
3. **Motion tokens** — “Durations and easing behave like a design system.”
4. **Responsive by default** — “Desktop cinematic, mobile respectful.”
5. **Accessible motion** — “Reduced-motion mode isn’t an afterthought.”
6. **Performance guardrails** — “Transforms only. GPU-friendly. No surprise layouts.”

Animation:
- Stagger reveal with slight y + opacity; card hover has glow + lift (`translateY(-2px)` only).

### 5) Scroll Chapters (pinned on desktop)
Purpose:
- This is the main scroll “wow” section: **one pinned stage** with **three chapters**.

Structure:
- Left column: chapter list + text (updates per chapter).
- Right column: pinned 3D artifact (or stays centered).
- Chapters (3):
  1) **Reveal** — “Introduce the artifact and your promise.”
  2) **Explain** — “Show how chapters map to product narrative.”
  3) **Convert** — “Land the value with proof + CTA.”

Per-chapter copy:
- Chapter 1 title: “Reveal”
  - Body: “Your first 3 seconds decide everything. Start with a shape, a shimmer, and a clear statement.”
  - Bullets: “Soft entrance • No layout shifts • Instant hierarchy”
- Chapter 2 title: “Explain”
  - Body: “As the user scrolls, the story tightens—features appear exactly when they’re needed.”
  - Bullets: “Scrubbed timelines • Pinned content • Clear pacing”
- Chapter 3 title: “Convert”
  - Body: “End with confidence. Numbers, testimonials, and a CTA that arrives at the perfect moment.”
  - Bullets: “Measured proof • Clean CTA • Zero friction”

GSAP + ScrollTrigger spec:
- Pin the section on desktop only.
- Create a master timeline scrubbed from 0 → 1 across the pinned distance.
- At each chapter:
  - Transition left copy (fade out/in + slight y).
  - Morph artifact state:
    - Chapter 1: slow rotation + low emissive
    - Chapter 2: increases complexity (deform/scale pulses)
    - Chapter 3: brightens glow + resolves to stable pose
- Add a progress indicator (thin vertical bar) reflecting chapter progress.

Mobile behavior:
- Unpinned stacked chapters; artifact becomes a smaller inline canvas at top.

### 6) How It Works (timeline)
Heading:
- “From concept to scroll-ready in a week.”
Steps (4):
1. “Pick a narrative arc” — “Hero → proof → chapters → conversion.”
2. “Define motion tokens” — “Easing and durations that stay consistent.”
3. “Wire the chapters” — “Pin once, scrub smoothly, and clean up properly.”
4. “Polish + ship” — “Accessibility, performance, and responsive tuning.”

Animation:
- Timeline line draws in as it enters; steps reveal with stagger.

### 7) Testimonials
Heading:
- “Designed to feel expensive.”
Testimonials (3):
- “We finally shipped a scroll experience that didn’t feel fragile.” — **Mina K., Product Design Lead**
- “The 3D is tasteful. The motion is precise. Our bounce rate dropped.” — **Jon R., Growth Engineer**
- “Reduced-motion support was the first time I felt truly considered.” — **Samira D., Accessibility Advocate**

Animation:
- Cards parallax slightly (desktop only), enter reveal on scroll.

### 8) Pricing
Heading:
- “Pricing that scales with ambition.”
Tiers (3):
- **Starter** — `$29/mo`
  - For: “Indie launches”
  - Includes: “Core sections, motion tokens, basic artifact”
- **Studio** (highlight) — `$99/mo`
  - For: “Teams shipping weekly”
  - Includes: “Pinned chapters, advanced artifact states, priority updates”
- **Enterprise** — “Let’s talk”
  - For: “High-traffic brands”
  - Includes: “Custom 3D, performance audits, support SLA”

CTA buttons:
- Starter: “Start Starter”
- Studio: “Start Studio”
- Enterprise: “Contact sales”

Animation:
- Pricing cards scale-in slightly (≤ 1.02) on enter; highlight tier has subtle gradient border.

### 9) FAQ
Heading:
- “FAQ”
Questions (5):
1. “Does this work on mobile?” — “Yes. Chapters unpin and layout becomes stacked.”
2. “Is it accessible?” — “Keyboard-first, semantic headings, and reduced-motion support.”
3. “Will it hurt performance?” — “We clamp DPR, avoid layout animation, and keep effects lightweight.”
4. “Can I replace the 3D artifact?” — “Yes. Swap a component; the motion API stays the same.”
5. “Can I use this in my existing site?” — “Yes. The sections are composable and isolated.”

Animation:
- Accordion open/close uses height animation with GSAP but keep durations short and respect reduced motion.

### 10) Final CTA
Heading:
- “Ready to choreograph your next launch?”
Body:
- “Give us 15 minutes. We’ll map your story into chapters and show what a scroll-driven narrative could look like.”
Primary CTA: “Request a demo”
Secondary CTA: “Email us”
Small note:
- “No spam. One thoughtful email.”

Animation:
- CTA background glow blooms slightly as it enters.

### 11) Footer
Content:
- Logo + short line: “ORBIT — scroll-driven product stories.”
- Links: “Privacy”, “Terms”, “Contact”
- Copyright:
  - “© {current year} ORBIT. All rights reserved.”

## Implementation Rules (engineering)

- Use strict semantic heading hierarchy: one H1 (Hero), then H2 per major section.
- Use `aria-label` on icon-only buttons.
- Ensure skip-to-content link exists (top of page).
- Ensure focus rings are visible (`focus-visible:outline` styles).
- Keep Tailwind classes readable: group by layout → spacing → color → effects.
- Use `React.Suspense` + lazy loading for the 3D scene if beneficial.
- Do not hardcode copy in components; pull from `src/content/landing.ts`.

## Definition of Done (acceptance checklist)

- Landing page renders correctly at 375px / 768px / 1024px / 1440px.
- Navbar anchors scroll to sections with correct offsets.
- One pinned ScrollTrigger section on desktop only; no scroll traps on mobile.
- Reduced-motion mode disables pin/scrub and keeps content visible.
- 3D artifact renders and responds to scroll state changes.
- No layout shift on animations; hover states do not move content unexpectedly.
- Lighthouse basics: good contrast, semantic structure, no broken links.

## Optional Enhancements (only if time remains)

- Add subtle grain/noise overlay (CSS-only) and a radial background gradient per section.
- Add a small “scroll progress” indicator in the sidebar on desktop.
- Add an easter-egg: artifact briefly “locks” into a logo-like silhouette near the final CTA (desktop only).

