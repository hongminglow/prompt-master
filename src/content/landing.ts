export type NavLink = { label: string; href: string }

export type FeatureItem = {
  title: string
  description: string
}

export type Chapter = {
  title: string
  body: string
  bullets: string[]
}

export type PricingTier = {
  name: string
  price: string
  highlight?: boolean
  for: string
  includes: string[]
  cta: string
  href: string
}

export type FAQItem = {
  question: string
  answer: string
}

export const landing = {
  brand: {
    name: 'ORBIT',
    tagline: 'Scroll-driven product stories with real-time 3D.',
  },
  nav: {
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Chapters', href: '#chapters' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ] satisfies NavLink[],
    cta: { label: 'Get early access', href: '#final' },
  },
  hero: {
    eyebrow: 'React 19 • Three.js • GSAP • Tailwind',
    title: 'Build scroll stories people actually feel.',
    subtitle:
      'ORBIT blends real-time 3D with precise motion so your product narrative unfolds naturally—one scroll at a time.',
    primaryCta: { label: 'Request a demo', href: '#final' },
    secondaryCta: { label: 'See the motion spec', href: '#chapters' },
    bullets: [
      'Pinned chapters without scroll-jank',
      '3D that degrades gracefully',
      'Motion system you can maintain',
    ],
  },
  socialProof: {
    title: 'Trusted by teams who ship polished motion.',
    logos: ['NORTHR', 'KITEWORKS', 'LUMEN', 'ARCWARD', 'HYPERLOOP', 'STUDIO/9'],
    metrics: [
      { value: '+38%', label: 'Average scroll depth' },
      { value: '-22%', label: 'Time-to-first-delight' },
      { value: '2.1×', label: 'Demo-to-signup conversion' },
    ],
  },
  features: {
    title: 'Everything you need to choreograph attention.',
    subtitle:
      'A small system of reusable sections, timelines, and 3D primitives—built to stay fast.',
    items: [
      {
        title: 'Chaptered storytelling',
        description: "Pin, scrub, and transition content without trapping the user.",
      },
      {
        title: 'Artifact-driven branding',
        description: 'A single 3D object becomes your visual signature.',
      },
      {
        title: 'Motion tokens',
        description: 'Durations and easing behave like a design system.',
      },
      {
        title: 'Responsive by default',
        description: 'Desktop cinematic, mobile respectful.',
      },
      {
        title: 'Accessible motion',
        description: "Reduced-motion mode isn’t an afterthought.",
      },
      {
        title: 'Performance guardrails',
        description: 'Transforms only. GPU-friendly. No surprise layouts.',
      },
    ] satisfies FeatureItem[],
  },
  chapters: {
    title: 'Scroll Chapters',
    subtitle:
      'One pinned stage. Three beats. A story that tightens as the user moves.',
    chapters: [
      {
        title: 'Reveal',
        body: 'Your first 3 seconds decide everything. Start with a shape, a shimmer, and a clear statement.',
        bullets: ['Soft entrance', 'No layout shifts', 'Instant hierarchy'],
      },
      {
        title: 'Explain',
        body: 'As the user scrolls, the story tightens—features appear exactly when they’re needed.',
        bullets: ['Scrubbed timelines', 'Pinned content', 'Clear pacing'],
      },
      {
        title: 'Convert',
        body: 'End with confidence. Numbers, testimonials, and a CTA that arrives at the perfect moment.',
        bullets: ['Measured proof', 'Clean CTA', 'Zero friction'],
      },
    ] satisfies Chapter[],
  },
  howItWorks: {
    title: 'From concept to scroll-ready in a week.',
    steps: [
      {
        title: 'Pick a narrative arc',
        body: 'Hero → proof → chapters → conversion.',
      },
      {
        title: 'Define motion tokens',
        body: 'Easing and durations that stay consistent.',
      },
      {
        title: 'Wire the chapters',
        body: 'Pin once, scrub smoothly, and clean up properly.',
      },
      {
        title: 'Polish + ship',
        body: 'Accessibility, performance, and responsive tuning.',
      },
    ],
  },
  testimonials: {
    title: 'Designed to feel expensive.',
    items: [
      {
        quote: "We finally shipped a scroll experience that didn’t feel fragile.",
        name: 'Mina K.',
        role: 'Product Design Lead',
      },
      {
        quote: 'The 3D is tasteful. The motion is precise. Our bounce rate dropped.',
        name: 'Jon R.',
        role: 'Growth Engineer',
      },
      {
        quote: 'Reduced-motion support was the first time I felt truly considered.',
        name: 'Samira D.',
        role: 'Accessibility Advocate',
      },
    ],
  },
  pricing: {
    title: 'Pricing that scales with ambition.',
    tiers: [
      {
        name: 'Starter',
        price: '$29/mo',
        for: 'Indie launches',
        includes: ['Core sections', 'Motion tokens', 'Basic artifact'],
        cta: 'Start Starter',
        href: '#final',
      },
      {
        name: 'Studio',
        price: '$99/mo',
        highlight: true,
        for: 'Teams shipping weekly',
        includes: ['Pinned chapters', 'Advanced artifact states', 'Priority updates'],
        cta: 'Start Studio',
        href: '#final',
      },
      {
        name: 'Enterprise',
        price: "Let’s talk",
        for: 'High-traffic brands',
        includes: ['Custom 3D', 'Performance audits', 'Support SLA'],
        cta: 'Contact sales',
        href: '#final',
      },
    ] satisfies PricingTier[],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'Does this work on mobile?',
        answer: 'Yes. Chapters unpin and layout becomes stacked.',
      },
      {
        question: 'Is it accessible?',
        answer: 'Keyboard-first, semantic headings, and reduced-motion support.',
      },
      {
        question: 'Will it hurt performance?',
        answer:
          'We clamp DPR, avoid layout animation, and keep effects lightweight.',
      },
      {
        question: 'Can I replace the 3D artifact?',
        answer: 'Yes. Swap a component; the motion API stays the same.',
      },
      {
        question: 'Can I use this in my existing site?',
        answer: 'Yes. The sections are composable and isolated.',
      },
    ] satisfies FAQItem[],
  },
  finalCta: {
    id: 'final',
    title: 'Ready to choreograph your next launch?',
    body: "Give us 15 minutes. We’ll map your story into chapters and show what a scroll-driven narrative could look like.",
    primaryCta: { label: 'Request a demo', href: 'mailto:hello@orbit.example' },
    secondaryCta: { label: 'Email us', href: 'mailto:hello@orbit.example' },
    note: 'No spam. One thoughtful email.',
  },
  footer: {
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Contact', href: 'mailto:hello@orbit.example' },
    ] satisfies NavLink[],
  },
} as const

