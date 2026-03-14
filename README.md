# 🎯 Prompt Master

> **A for-fun platform that tests how well AI-written PROMPTS can generate accurate, high-quality outputs for challenging tasks — like 3D models, scroll-driven animations, and cinematic motion design.**

## What Is This?

Prompt Master is an experimental playground where we push the boundaries of what AI can generate from carefully crafted prompts. Instead of hand-coding everything, we write **detailed master prompts** and let AI do the heavy lifting — then evaluate the results.

The core idea: **Can a well-structured prompt produce production-quality code?**

This project specifically challenges AI with:
- 🧊 **3D Model Generation** — Real-time Three.js icosahedron with vertex displacement, iridescent materials, and organic morphing
- 🎬 **Scroll-Driven Animation** — GSAP ScrollTrigger-powered parallax, pinned chapters, and cinematic reveals
- ✨ **Interactive Motion Design** — Mouse-reactive 3D objects, floating tech cards, particle systems, and glow effects
- 📐 **Pixel-Perfect Layouts** — Consistent design system with glass surfaces, gradient borders, and responsive grids

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework with functional components |
| **TypeScript** | Type-safe development |
| **Three.js** (`@react-three/fiber` + `@react-three/drei`) | 3D rendering and real-time artifact |
| **GSAP + ScrollTrigger** | Scroll-driven animations and cinematic transitions |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Lightning-fast dev server and bundler |

## The Prompt-Driven Approach

The entire landing page was generated from a single **`MASTER_PROMPT.md`** file — a comprehensive prompt document that specifies:

1. **Brand & Visual Identity** — Theme, colors, typography, surfaces
2. **Animation System** — Timing, easing, scroll rules, reduced-motion support
3. **3D System** — Geometry, materials, lighting, interactions
4. **Section-by-Section Layout** — Hero, features, chapters, pricing, FAQ, etc.
5. **Engineering Constraints** — Accessibility, performance, folder structure

The prompt is designed to be **detailed enough** that AI can generate a cohesive, premium-feeling product site without additional manual direction.

## Key Highlights

### 🌀 Interactive 3D Hero
The hero section features a morphing icosahedron with:
- **Vertex displacement** — Organic breathing and noise-based deformation
- **Scroll-reactive behavior** — Grows, shifts emissive color, and intensifies glow as you scroll
- **Mouse parallax** — Subtle rotation follows cursor on desktop
- **Iridescent material** — Physical material with clearcoat, transmission, and dynamic iridescence

### 📜 Scroll-Driven Storytelling
- **Parallax depth** — Text and 3D canvas drift at different speeds
- **Pinned chapters** — Desktop-only GSAP ScrollTrigger pinning with scrubbed timelines
- **Floating elements** — Tech cards and particles drift and bob with varying scroll speeds
- **Ambient glow** — Background orb expands and shifts as you scroll

### ♿ Accessible by Design
- `prefers-reduced-motion` fully respected
- Semantic HTML with proper heading hierarchy
- Keyboard navigation with visible focus rings
- Skip-to-content link

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
  app/           → App shell
  components/    → Reusable UI primitives (Button, Card, Badge, etc.)
  sections/      → Page sections (Hero, Features, Pricing, etc.)
  three/         → Three.js 3D scene, artifact, and materials
  motion/        → GSAP animation system (timelines, scroll triggers)
  content/       → All copy/content (single source of truth)
  styles/        → Global CSS + Tailwind entry
```

## The Experiment

This project is part of an ongoing experiment to answer:

- **How specific must a prompt be** to produce consistent, high-quality results?
- **Where do AI-generated outputs fall short** on challenging creative tasks?
- **Can prompt engineering replace hand-coding** for visual and interactive experiences?

Every iteration improves the master prompt based on what the AI got right — and what it missed.

---

*Built with ☕ and curiosity. Not for production use — just for fun and learning.*
