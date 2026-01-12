# Kingside Website: Fresh Start with shadcn/ui

**Branch:** `claude/adopt-design-system-LlDDr`
**Created:** January 12, 2026
**Purpose:** Complete rebuild using shadcn/ui + Phosphor Icons as the design foundation

---

## Executive Summary

This document provides everything needed to rebuild the Kingside website from scratch using shadcn/ui components, while preserving the brand identity (colors, typography, button animations, chess pieces).

**Why fresh start?**
- Current codebase has inconsistent styling (inline styles mixed with CSS variables)
- Custom design system became unmaintainable
- shadcn/ui provides a scalable, well-documented foundation
- Easier for vibe-coding and AI-assisted development

---

## CRITICAL: Design Philosophy

### shadcn Rules First, Always

**The entire point of this rebuild is to ADOPT shadcn/ui fully.** Do not create custom one-off solutions when shadcn has a pattern or component for it.

| Situation | Wrong Approach | Right Approach |
|-----------|----------------|----------------|
| Need a card | Create custom Card component | Use shadcn `Card` |
| Need form inputs | Style inputs from scratch | Use shadcn `Input`, `Label` |
| Need tabs | Build custom tab system | Use shadcn `Tabs` |
| Need dark mode | Create custom toggle | Use shadcn's built-in dark mode support |
| Need typography | Create custom Text/Heading primitives | Use Tailwind classes with shadcn conventions |

### What to Preserve (Brand Only)

Only preserve these brand-specific elements:
1. **Colors** - Our specific palette (linen, black, blue, purple, red)
2. **Fonts** - Poppins headings, Raleway body
3. **NeuBrutalistButton** - The spring-physics floating shadow animation
4. **Logo** - Company logo components
5. **Content** - All text/copy from the current site

### What to Replace with shadcn

Everything else should use shadcn patterns:
- Cards → shadcn Card (add neubrutalist shadow as a variant if desired)
- Form inputs → shadcn Input, Label, Textarea
- Tabs → shadcn Tabs
- Mobile menu → shadcn Sheet
- Dividers → shadcn Separator
- Dark mode → shadcn's theming approach
- Typography → Tailwind prose classes or simple utility classes

### If in Doubt

If you're unsure whether to create a custom solution or use shadcn:
1. Check if shadcn has a component for it → Use shadcn
2. Check if shadcn has a pattern for it → Follow the pattern
3. Only create custom if it's brand-critical (like NeuBrutalistButton)

---

## Things to Simplify or Remove

### Remove Completely

| Item | Location | Reason |
|------|----------|--------|
| Debug logging | Hero.tsx, various `useEffect` with `fetch()` to localhost | Dead code from debugging sessions |
| Old design-system primitives | `src/design-system/primitives/` | Replace with shadcn components |
| tokens.ts | `src/design-system/tokens.ts` | Replace with shadcn CSS variables |

### Simplify

| Item | Current State | New Approach |
|------|---------------|--------------|
| ChessPiecesScroll | Complex animated scroll | Simple static display or basic CSS animation |
| ShiftHighlightTabs | Custom tab implementation | Use shadcn `Tabs` with custom styling |
| AnimatedNeuCard | Custom spring-physics cards | Use shadcn `Card` with hover shadow via CSS |
| Grid primitive | Custom Grid component | Use Tailwind grid classes directly |

### Keep as Placeholders (Fix Later)

| Item | Current Value | Notes |
|------|---------------|-------|
| Social links | `#` | Will add real URLs later |
| Privacy Policy | `#` | Will create page later |
| Terms of Service | `#` | Will create page later |

---

## Table of Contents

1. [Brand Preservation Requirements](#1-brand-preservation-requirements)
2. [Page Structure & Content](#2-page-structure--content)
3. [Component Architecture](#3-component-architecture)
4. [Implementation Guide](#4-implementation-guide)
5. [shadcn Components to Install](#5-shadcn-components-to-install)
6. [Critical Assets](#6-critical-assets)

---

## 1. Brand Preservation Requirements

### 1.1 Color Palette (MUST KEEP EXACTLY)

```css
/* Light Mode */
--background: #F8F4E8;        /* Linen - warm cream background */
--foreground: #111111;        /* Near black - primary text */
--primary: #111111;           /* Black - buttons, borders */
--primary-foreground: #F3EBE4; /* Light linen - text on black */
--secondary: #C77CFF;         /* Purple - creativity, premium */
--secondary-foreground: #F3EBE4;
--accent: #20A4F3;            /* Blue - trust, intelligence */
--accent-foreground: #F8F4E8;
--destructive: #F9323E;       /* Red - warnings, emphasis */
--destructive-foreground: #F8F4E8;
--muted: #746F72;             /* Gray - subtle elements */
--muted-foreground: #F8F4E8;
--border: #111111;            /* Black borders - brutalist */
--ring: #20A4F3;              /* Blue focus rings */

/* Chart/Accent Colors (for animated text) */
--chart-1: #20A4F3;  /* Blue */
--chart-2: #F9323E;  /* Red */
--chart-3: #FF9F1C;  /* Orange */
--chart-4: #C7E171;  /* Green */
--chart-5: #F5A6E6;  /* Pink */
```

### 1.2 Typography (MUST KEEP)

```css
/* Font Families */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Raleway', sans-serif;

/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap');

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 1.3 Border Radius (Brutalist Style)

```css
--radius: 2px;        /* Base brutalist radius */
--radius-sm: 1px;
--radius-md: 2px;
--radius-lg: 4px;     /* Buttons */
--radius-xl: 6px;     /* Cards */
--radius-2xl: 16px;   /* Large cards */
```

### 1.4 NeuBrutalistButton Animation (CRITICAL - PRESERVE EXACTLY)

This is the signature brand element. The animation logic MUST be preserved.

**Spring Physics Config:**
```typescript
const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};
```

**Animation Behavior:**
1. **Resting state:** Button sits flat
2. **Mouse move:** Button floats 6-12px based on cursor position, revealing colored shadow beneath
3. **Mouse leave:** Spring physics animate button back to rest
4. **Text slide:** On hover, text slides up and duplicate slides in from below
5. **Arrow transition:** Arrow slides in, transitioning from accent color to text color

**Shadow Colors:**
- Primary variant: Blue (#20A4F3) shadow
- Secondary variant: Purple (#C77CFF) shadow

**Full Component Source:** See `src/components/NeuBrutalistButton.tsx` in current codebase.

### 1.5 Neubrutalist Card Pattern

Used throughout the site - colored shadow offset behind card:

```tsx
<div className="relative">
  {/* Shadow layer - static, offset 8px right and down */}
  <div
    className="absolute inset-0 rounded-xl border-2 border-border"
    style={{
      backgroundColor: 'var(--accent)', // or --secondary, --destructive
      transform: 'translate(8px, 8px)',
    }}
  />
  {/* Main card layer */}
  <div className="relative rounded-xl border-2 border-border bg-background p-6">
    {/* Content */}
  </div>
</div>
```

### 1.6 Chess Piece Icons

SVG paths stored in `src/imports/svg-s90zob6txr.ts`:
- King (blue accent)
- Queen (red destructive)
- Rook (purple secondary)

Used in WhyKingside cards. Preserve these SVG paths.

### 1.7 Logo Components

- `src/imports/KsLogoPrimary-44-266.tsx` - Primary logo (navigation)
- `src/imports/KsLogoPrimary-86-200.tsx` - Footer logo variant

---

## 2. Page Structure & Content

### 2.1 Section Order (App.tsx)

```
1. Navigation (fixed top)
2. Hero
3. MrBottleneck
4. WhyKingside
5. AIStats
6. IntelligentAutomation
7. ContactForm
8. Footer
9. Toaster (for notifications)
```

### 2.2 Navigation Content

**Nav Items:**
- Services → #services
- About → #about

**CTA Button:** "Book a Call" → #contact

**Mobile:** Hamburger menu with same items

### 2.3 Hero Content

**Headlines:**
```
PUT YOUR
[ANIMATED ROTATING TEXT]
IN CHECK
```

**Animated Text Rotation (2 second interval):**
1. BUSY WORK (foreground color)
2. PAPERWORK (blue accent)
3. FOLLOW-UPS (purple secondary)
4. QUOTES (red destructive)
5. INVOICING (orange chart-3)
6. DATA ENTRY (green chart-4)
7. SCHEDULING (pink chart-5)

**Body Copy:**
> Kingside helps small business owners cut the busywork and scale smarter with digital solutions that actually work for you.

**CTAs:**
- "Learn More" (primary) → #stats
- "Book a Call" (secondary) → #contact

**Chess Pieces Scroll:** Animated horizontal scroll of chess pieces

### 2.4 MrBottleneck Content

**Headlines:**
```
You're the boss,
the strategist,
the fixer...
and the bottleneck. (in red/destructive)
```

**Body Copy:**
> Every minute lost to admin is a minute stolen from growth. You didn't build your business to manage chaos– so stop doing it.

**Image:** `src/assets/MrBottleneck2.webp`
- Alt: "Business professional in contemplation representing the bottleneck challenge faced by business owners"

**Card Style:** Red (destructive) shadow

### 2.5 WhyKingside Content

**Section Title:**
```
Your next move…
INTELLIGENT AUTOMATION (blue accent on "INTELLIGENT")
```

**Three Cards:**

**Card 1 - Purple (Rook icon):**
- Title: "Reclaim your time"
- Description: "Every founder knows the grind — endless admin work and scattered tools that drain your focus. Kingside cuts through the chaos with intelligent systems that give you back your most valuable resource: time to grow, create, and lead."

**Card 2 - Red (Queen icon):**
- Title: "Compete like a giant"
- Description: "AI isn't just for the tech giants anymore. Kingside gives small and midsize teams access to the same strategic automation and intelligence tools — empowering every business to operate smarter, scale faster, and compete with clarity."

**Card 3 - Blue (King icon):**
- Title: "Execute with precision"
- Description: "We don't just talk transformation — we deliver it. Kingside turns your strategic plans into daily progress with AI-driven automations that keep your business moving forward, one smart step at a time."

**Animation:** Cards have same spring-physics hover effect as buttons (float to reveal shadow)

### 2.6 AIStats Content

**Section Title:**
> AI IS TRANSFORMING SMALL BUSINESS PERFORMANCE — REAL IMPACT, REAL RESULTS (blue accent on second part)

**Stats:**

| Number | Suffix | Description | Source |
|--------|--------|-------------|--------|
| 91 | % | of SMBs using AI say it boosts revenue | Salesforce SMB Trends Report 2025 |
| 87 | % | of SMBs report higher productivity with AI | Service Direct Small Business AI Report 2025 |
| 13 | h | average hours saved per week by AI-powered teams | ActiveCampaign AI Productivity Study 2025 (via Forbes) |

**Animation:** Numbers count up from 0 when scrolled into view (2.5s duration)

### 2.7 IntelligentAutomation Content

**Section Title:**
```
Make automation your
COMPETITIVE ADVANTAGE (blue accent on "COMPETITIVE")
```

**Body Copy:**
> We partner with you to uncover where automation can create the most impact, then build intelligent AI systems that work independently to elevate your business.

**Tabs (ShiftHighlightTabs):**
1. Marketing
2. Sales
3. Operations
4. Customer Service

**Tab Content:**

**Marketing:**
> Create personalized campaigns that truly connect with your audience. Drive better results and get a greater return on your marketing spend. We help you turn insights into action with AI-driven strategies that adapt and improve with every interaction.

**Sales:**
> Automate lead qualification and follow-ups to close more deals, faster. Let your team focus on building relationships, not busywork. With AI-powered sales systems that learn from every interaction, you'll accelerate pipelines and turn opportunities into consistent growth.

**Operations:**
> Streamline workflows and eliminate bottlenecks with intelligent automation. We analyze your operations to identify opportunities where AI can boost efficiency, reduce costs, and free your team to focus on strategic initiatives that drive growth.

**Customer Service:**
> Deliver exceptional support experiences that build lasting customer relationships. Our AI-powered solutions enable faster response times, consistent quality, and personalized assistance at scale while empowering your team to handle complex issues.

**Images:** Lazy-loaded feature images for each tab

### 2.8 ContactForm Content

**Section Title:**
> Ready to make your move?

**Body Copy:**
> Every winning strategy starts with a smart first move. Reach out today for a straightforward conversation about where your business is and where our digital solutions can take it. No jargon, just a clear plan to cut the busywork.

**Form Fields:**
- First name (required)
- Last name (required)
- Business name (required)
- Email (required)
- Phone (required)

**Submit Button:** "Send message" / "Sending..."

**Webhook URL:** `https://goodhelpai.app.n8n.cloud/webhook/kingside/contactus`

**Success Modal:**
- Icon: CheckCircle (blue)
- Title: "Message Sent!"
- Description: "Thanks for reaching out — our team at Kingside will contact you soon."
- Button: "Close"

### 2.9 Footer Content

**Tagline:** "Put your busy work in check. ♔"

**Locations:**
- Fort Worth, TX
- Lehi, UT

**Quick Links:**
- About → #about
- Services → #services
- Why AI → #stats
- Contact → #contact

**Social Links:** Facebook, Instagram, LinkedIn (icons from imports)

**Email:** hello@kingsidegroup.com

**Legal Links:**
- Privacy Policy
- Terms of Service

**Copyright:** © [current year] Kingside. All rights reserved.

---

## 3. Component Architecture

### 3.1 shadcn Components to Create/Use

| Component | Purpose | Notes |
|-----------|---------|-------|
| `Button` | Standard buttons | Already created |
| `Card` | Card containers | Already created |
| `Input` | Form inputs | Already created |
| `Label` | Form labels | Already created |
| `Textarea` | Multiline input | Already created |
| `Badge` | Tags/labels | Already created |
| `Separator` | Dividers | Need to create |
| `Tabs` | Tab navigation | Need to create |
| `Sheet` | Mobile nav drawer | Need to create |

### 3.2 Custom Components (Preserve/Recreate)

| Component | Source | Notes |
|-----------|--------|-------|
| `NeuBrutalistButton` | Keep exactly | Signature brand animation |
| `NeuCard` | Create new | Wrapper for neubrutalist shadow pattern |
| `AnimatedTaskText` | Keep exactly | Hero rotating text |
| `ChessPiecesScroll` | Review | May simplify |
| `ShiftHighlightTabs` | Keep | Custom tab styling |
| `ConfirmationModal` | Keep | Success modal with spring animation |

### 3.3 Recommended File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── tabs.tsx
│   │   └── sheet.tsx
│   ├── brand/                 # Custom brand components
│   │   ├── NeuBrutalistButton.tsx
│   │   ├── NeuCard.tsx
│   │   └── AnimatedTaskText.tsx
│   ├── sections/              # Page sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── MrBottleneck.tsx
│   │   ├── WhyKingside.tsx
│   │   ├── AIStats.tsx
│   │   ├── IntelligentAutomation.tsx
│   │   ├── ContactForm.tsx
│   │   └── Footer.tsx
│   └── ConfirmationModal.tsx
├── lib/
│   └── utils.ts               # cn() utility
├── assets/                    # Images
├── imports/                   # Logo, icons, SVG paths
└── styles/
    └── globals.css            # CSS variables, Tailwind config
```

---

## 4. Implementation Guide

### Phase 1: Project Setup

```bash
# 1. Create fresh Vite project (or clean existing)
npm create vite@latest kingside-v2 -- --template react-ts

# 2. Install dependencies
npm install tailwindcss @tailwindcss/vite motion clsx class-variance-authority tailwind-merge @phosphor-icons/react sonner

# 3. Initialize shadcn
npx shadcn@latest init

# 4. Add shadcn components
npx shadcn@latest add button card input label textarea badge separator tabs sheet
```

### Phase 2: Configure Theme

1. Copy CSS variables from Section 1.1 into `globals.css`
2. Add Google Fonts import
3. Set `--radius: 2px` for brutalist style
4. Configure Tailwind to use CSS variables

### Phase 3: Create Brand Components

**Order:**
1. `NeuBrutalistButton` - Copy from current codebase, update to Phosphor icons
2. `NeuCard` - Create wrapper for shadow pattern
3. `AnimatedTaskText` - Copy from current codebase

### Phase 4: Build Sections

**Order (build in this sequence):**
1. Navigation (simple, establishes layout)
2. Footer (simple, establishes layout)
3. Hero (test AnimatedTaskText)
4. MrBottleneck (test NeuCard)
5. WhyKingside (test animated cards)
6. AIStats (test count animation)
7. IntelligentAutomation (test tabs)
8. ContactForm (test form + modal)

### Phase 5: Testing

1. Responsive: 375px, 768px, 1024px, 1440px
2. Animations: Verify spring physics work
3. Forms: Test submission to webhook
4. Accessibility: Keyboard nav, focus states

---

## 5. shadcn Components to Install

```bash
# Core layout
npx shadcn@latest add card
npx shadcn@latest add separator

# Navigation
npx shadcn@latest add sheet
npx shadcn@latest add button

# Forms
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea

# Interactive
npx shadcn@latest add tabs
npx shadcn@latest add badge

# Feedback (already using sonner)
# sonner is installed via npm, not shadcn
```

---

## 6. Critical Assets

### 6.1 Images

| File | Location | Usage |
|------|----------|-------|
| MrBottleneck2.webp | src/assets/ | MrBottleneck section |
| KS - marketing.webp | src/assets/ | IntelligentAutomation tab |
| KS - sales.webp | src/assets/ | IntelligentAutomation tab |
| KS - operations.webp | src/assets/ | IntelligentAutomation tab |
| KS - customer service.webp | src/assets/ | IntelligentAutomation tab |

### 6.2 Logo Components

- `src/imports/KsLogoPrimary-44-266.tsx`
- `src/imports/KsLogoPrimary-86-200.tsx`

### 6.3 Social Icons

- `src/imports/Group6-86-97.tsx` (Facebook)
- `src/imports/Group7.tsx` (Instagram)
- `src/imports/Group8.tsx` (LinkedIn)

### 6.4 Chess Piece SVGs

- `src/imports/svg-s90zob6txr.ts` (contains path data)

---

## 7. Webhook Integration

**Contact Form Webhook:**
```
URL: https://goodhelpai.app.n8n.cloud/webhook/kingside/contactus
Method: POST
Content-Type: application/json

Body:
{
  "firstName": "string",
  "lastName": "string",
  "businessName": "string",
  "email": "string",
  "phone": "string"
}
```

---

## 8. Deployment

**Platform:** GitHub Pages
**Build output:** `docs/` directory
**Domain:** kingsidegroup.com

**GitHub Actions:** `.github/workflows/deploy.yml` handles automatic deployment on push to main.

---

## Agent Instructions

### Primary Directive: ADOPT SHADCN FULLY

The owner explicitly stated: **"I'm really trying to abandon any 'one off' rules we've had to develop to make this site work vs fully adopting a robust library with many of these things handled. If adopting shadcn forces us to use new component styling – I'm 100% ok with that."**

This means:
- When shadcn does something differently than the current site → **Use shadcn's way**
- When in doubt about styling → **Check shadcn docs first**
- Don't recreate the old site exactly → **Build a new site using shadcn patterns**

### Implementation Order

1. **Read this entire document first**
2. **Read the shadcn documentation** - understand their patterns
3. **Set up project with shadcn CLI** - let it configure things its way
4. **Add brand colors to shadcn's CSS variables**
5. **Add brand fonts**
6. **Copy NeuBrutalistButton** - this is the ONE custom component
7. **Build sections using shadcn components**
8. **Use shadcn Tabs** for IntelligentAutomation (not custom tabs)
9. **Use shadcn Sheet** for mobile nav (not custom drawer)
10. **Simplify ChessPiecesScroll** - static or simple CSS animation

### Don't:
- Modify NeuBrutalistButton animation logic
- Change brand colors
- Use Lucide icons (use Phosphor)
- Create custom components when shadcn has an equivalent
- Add inline styles - use Tailwind classes
- Recreate the old design-system primitives (Section, Container, Grid, etc.)
- Keep debug logging code (fetch to localhost)
- Over-engineer animations when CSS transitions suffice

### Do:
- Use `cn()` utility for conditional classes
- Use shadcn's CSS variable naming conventions
- Use responsive Tailwind classes (sm:, md:, lg:)
- Keep components simple and composable
- Follow shadcn patterns for consistency
- Use shadcn's built-in dark mode support
- Let shadcn handle accessibility (focus states, ARIA)

### Brand-Only Customizations

Only these should deviate from shadcn defaults:
1. Colors → Our linen/black/blue/purple/red palette
2. Fonts → Poppins headings, Raleway body
3. Border radius → 2px base (brutalist)
4. NeuBrutalistButton → Keep the spring physics animation

Everything else → **shadcn defaults are fine**

---

**Document Version:** 1.1
**Last Updated:** January 12, 2026
**Author:** Claude Opus 4.5
