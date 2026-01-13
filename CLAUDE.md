# CLAUDE.md - AI Assistant Guide for Kingside Group Website

**Last Updated:** January 13, 2026
**Repository:** KINGSIDEsite
**Project Type:** Modern React SPA with shadcn/ui Design System
**Target User Level:** Beginner-friendly

---

## ⚠️ IMPORTANT: Fresh Start Initiative

**This codebase is being rebuilt using shadcn/ui as the design foundation.**

Before making any changes, read these documents first:

| Document | Location | Purpose |
|----------|----------|---------|
| **FRESH_START_GUIDE.md** | Root directory | Complete rebuild guide, all content, architecture |
| **BRAND_COMPONENTS.md** | Root directory | Legacy component code (NeuBrutalistButton deprecated, use BrandButton) |

### Key Changes from Old Approach

| Old Way | New Way |
|---------|---------|
| Lucide icons | **Phosphor Icons** (`@phosphor-icons/react`) |
| Custom design-system/tokens.ts | **shadcn CSS variables** |
| Custom primitives (Section, Grid, etc.) | **Tailwind classes + shadcn components** |
| One-off custom components | **shadcn components with brand colors** |

### What to Preserve

1. **Brand colors** (white background, black text, blue accent)
2. **Fonts** (Poppins headings, Raleway body)
3. **BrandButton** (radial fill + parallax animation)
4. **Logo components** (wordmark SVGs)
5. **All content/copy**

### Philosophy

> "I'm really trying to abandon any 'one off' rules we've had to develop to make this site work vs fully adopting a robust library. If adopting shadcn forces us to use new component styling – I'm 100% ok with that."

**When in doubt: Use shadcn's way, not a custom solution.**

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Repository Structure](#repository-structure)
4. [Design System Architecture](#design-system-architecture)
5. [Development Workflow](#development-workflow)
6. [Key Conventions](#key-conventions)
7. [Component Patterns](#component-patterns)
8. [Git & Deployment](#git--deployment)
9. [Common Tasks](#common-tasks)
10. [Important Files Reference](#important-files-reference)
11. [Communication Guidelines](#communication-guidelines)
12. [Watch Out For](#watch-out-for)

---

## Project Overview

The **Kingside Group Website** is a modern single-page application (SPA) showcasing an AI consulting agency. The design follows a **modern SaaS aesthetic** using shadcn/ui, featuring:

- Clean typography with Poppins headings and Raleway body
- BrandButton with radial fill hover animation
- Clean white background with black text
- Blue accent color (#20A4F3)
- Chess-inspired branding with King wordmark
- Mobile-first responsive design
- Accessibility-first approach (WCAG 2.1 AA minimum)

**Primary Audience:** The codebase user has beginner-level technical knowledge. All documentation should be clear, simple, and include analogies when helpful.

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI component library (TypeScript/TSX) |
| **TypeScript** | 5.3.3 | Type-safe JavaScript |
| **Vite** | 6.3.5 | Build tool and dev server |
| **Tailwind CSS** | 4.0.0 | Utility-first CSS framework |
| **Motion** | 12.23.24 | Animation library (formerly Framer Motion) |

### Key Dependencies

- **class-variance-authority** (0.7.1) - Component variant handling
- **clsx** (2.1.1) - Conditional className utilities
- **lucide-react** (0.487.0) - Icon library
- **next-themes** (0.4.6) - Dark mode support
- **sonner** (2.0.3) - Toast notifications

### Development Tools

- **ESLint** - Code linting with TypeScript, React, and accessibility rules
- **Prettier** - Code formatting with Tailwind class sorting
- **TypeScript Compiler** - Type checking

---

## Repository Structure

```
KINGSIDEsite/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment workflow
├── .vscode/                        # VS Code settings and extensions
├── documentation/                  # Comprehensive project documentation
│   ├── guides/
│   │   ├── Claude.md              # Detailed Claude guide (original)
│   │   ├── APPLICATION_OVERVIEW.md
│   │   ├── SOURCE_OF_TRUTH.md     # Design system source of truth
│   │   ├── FIGMA_MAKE_WORKFLOW.md # Figma Make integration guide
│   │   └── MERGE_GUIDE.md
│   └── archive/                    # Historical documentation
├── public/                         # Static assets (images, icons)
├── src/
│   ├── assets/                     # Image and media assets
│   ├── components/                 # React components
│   │   ├── ui/                    # Reusable UI primitives (shadcn-style)
│   │   ├── figma/                 # Figma-imported components
│   │   ├── brand-button.tsx       # BrandButton with radial fill animation
│   │   ├── Hero.tsx               # Hero section with animated text
│   │   ├── Navigation.tsx         # Site navigation
│   │   ├── Footer.tsx             # Site footer
│   │   ├── ContactForm.tsx        # Contact form with validation
│   │   └── index.ts               # Component exports
│   ├── design-system/
│   │   ├── tokens.ts              # **SINGLE SOURCE OF TRUTH** for design
│   │   ├── primitives/            # Base layout/typography components
│   │   │   ├── Section.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Stack.tsx
│   │   │   ├── Grid.tsx           # Standardized grid component
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   └── README.md              # Design system usage guide
│   ├── lib/                       # Utility functions
│   ├── styles/
│   │   └── globals.css            # Global styles, CSS variables, fonts
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Entry point
│   ├── DESIGN_SYSTEM.md           # Complete design system specification
│   └── Attributions.md            # Asset attributions
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── vite.config.ts                 # Vite configuration
├── tailwind.config.ts             # Tailwind theme (imports from tokens.ts)
├── tsconfig.json                  # TypeScript configuration
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc.json               # Prettier configuration
├── README.md                       # Project README
└── CLAUDE.md                       # This file

```

---

## Design System Architecture

### Token-Based Design System

The project uses a **single source of truth** architecture for all design values:

```
┌─────────────────────────────────────────────────────────────┐
│         src/design-system/tokens.ts                         │
│         SINGLE SOURCE OF TRUTH                              │
│   (Colors, Typography, Spacing, Shadows, etc.)              │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ├─────────────────────┐
                   │                     │
                   ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ tailwind.config  │  │  globals.css     │
        │      .ts         │  │   (CSS vars)     │
        │                  │  │                  │
        │ ✅ Auto-imports  │  │ ⚠️ Manual sync   │
        │    tokens.ts     │  │    required      │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌──────────────────┐
                 │   Components     │
                 │                  │
                 │ Use Tailwind     │
                 │ utility classes  │
                 └──────────────────┘
```

### Key Principle: Single Source of Truth

**`src/design-system/tokens.ts`** is the primary source for ALL design values.

**When making design changes:**
1. ✅ **ALWAYS** edit `tokens.ts` first
2. ⚠️ Manually sync `globals.css` to match (currently manual, should be auto-generated)
3. ✅ `tailwind.config.ts` automatically uses tokens.ts (no changes needed)

### Design Tokens Categories

- **Colors**: Semantic color system (primary, secondary, accent, destructive, muted, chart colors)
- **Typography**: Font families (Poppins, Raleway), sizes, weights, line heights, letter spacing
- **Spacing**: 4px base unit system (Tailwind standard)
- **Border Radius**: Brutalist minimal (2px base, max 6px)
- **Shadows**: Neubrutalist colored shadows, elevation
- **Breakpoints**: Mobile-first responsive (640px, 768px, 1024px, 1280px, 1536px)
- **Container**: Max-widths, padding, responsive gutters
- **Animations**: Spring physics parameters, timing functions

---

## Development Workflow

### Daily Development

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start development server
npm run dev
# Opens at http://localhost:3000 with hot reload

# 3. Make changes in Cursor/VS Code
# Files auto-reload in browser on save

# 4. Run linting (optional)
npm run lint

# 5. Format code (optional, can auto-format on save)
npm run format

# 6. Type check (optional)
npm run typecheck

# 7. Test production build before deploying
npm run build
npm run preview
```

### Git Workflow

```bash
# Check current status
git status

# View changes
git diff

# Stage changes
git add .

# Create commit
git commit -m "Descriptive commit message"

# Push to remote
git push
```

**Deployment:** Automatic deployment to GitHub Pages on push to `main` branch via GitHub Actions.

### Code Quality Tools

| Tool | Command | Purpose |
|------|---------|---------|
| ESLint | `npm run lint` | Find code issues |
| ESLint (fix) | `npm run lint:fix` | Auto-fix code issues |
| Prettier | `npm run format` | Format code |
| Prettier (check) | `npm run format:check` | Check formatting |
| TypeScript | `npm run typecheck` | Type checking |
| Design System Audit | `npm run ds:audit` | Check for inline styles |

---

## Key Conventions

### 1. Styling Approach

**✅ DO:**
```tsx
// Use Tailwind utility classes with design tokens
<div className="bg-background text-foreground border-border">
<button className="bg-primary text-primary-foreground px-8 py-4">
<h1 className="font-heading text-h1 font-bold">
```

**❌ DON'T:**
```tsx
// Don't use inline styles or hardcoded values
<div style={{ backgroundColor: '#F8F4E8', color: '#111111' }}>
<div className="bg-[#F8F4E8] text-[#111111]">  // No arbitrary values
<div style={{ padding: '13px' }}>  // Use Tailwind spacing
```

### 2. Component Structure

**Standard Component Pattern:**
```tsx
import { ComponentType } from 'react';

interface ComponentNameProps {
  // Props with clear types
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

export const ComponentName: ComponentType<ComponentNameProps> = ({
  title,
  description,
  variant = 'primary'
}) => {
  return (
    <div className="tailwind-classes">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
```

### 3. Component Organization

**Component Placement:**
- Figma-generated → `src/components/figma/`
- Custom reusable → `src/components/`
- Design system primitives → `src/design-system/primitives/`
- UI components (shadcn-style) → `src/components/ui/`

**Naming Conventions:**
- Components: `PascalCase.tsx` (e.g., `Hero.tsx`, `ContactForm.tsx`)
- Figma imports: `Ks[Name]-[ID].tsx` (e.g., `KsButton-123-456.tsx`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)

### 4. Import/Export Pattern

**Export from index.ts:**
```tsx
// src/components/index.ts
export { Hero } from './Hero';
export { Navigation } from './Navigation';
export { Footer } from './Footer';

// Import in other files
import { Hero, Navigation, Footer } from '@/components';
```

### 5. Responsive Design & Mobile Standards

**Mobile-First Approach:**
```tsx
// Base styles apply to mobile (< 640px)
// Add breakpoint prefixes for larger screens
<div className="px-5 sm:px-6 lg:px-8">  // Responsive padding
<div className="flex-col lg:flex-row">  // Stack mobile, row desktop
<h1 className="text-4xl lg:text-6xl">  // Responsive typography
```

#### ⚠️ CRITICAL: Section Padding Standard

**ALL section containers MUST use this exact padding pattern:**
```tsx
// Standard section padding (REQUIRED)
<section className="py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    {/* content */}
  </div>
</section>
```

| Breakpoint | Padding | Pixels |
|------------|---------|--------|
| Mobile (default) | `px-5` | 20px |
| Tablet (sm: 640px+) | `sm:px-6` | 24px |
| Desktop (lg: 1024px+) | `lg:px-8` | 32px |

#### Mobile Typography Scaling

**Text must scale responsively:**
```tsx
// Headings - scale up on larger screens
<h1 className="text-4xl sm:text-5xl lg:text-6xl">  // Hero headline
<h2 className="text-3xl sm:text-4xl lg:text-5xl">  // Section headline
<h3 className="text-2xl lg:text-3xl">              // Card title

// Eyebrow text
<p className="text-xs sm:text-sm">                 // Scales on tablet+

// Body text
<p className="text-base sm:text-lg">               // Standard body
<p className="text-lg sm:text-xl">                 // Large body
```

#### Mobile Overflow Prevention

**NEVER use fixed widths that exceed mobile viewport (375px):**
```tsx
// ❌ DON'T - Fixed width can overflow
<div className="w-[600px]">

// ✅ DO - Responsive widths
<div className="w-[300px] sm:w-[400px] lg:w-[600px]">
```

**Wrap decorative animations in overflow containers:**
```tsx
// ✅ DO - Contain animations that move off-screen
<div className="hidden lg:block overflow-hidden">
  <motion.div animate={{ x: [0, -200] }} />
</div>
```

**Global overflow protection is in `index.css`:**
```css
html { overflow-x: hidden; }
body { overflow-x: hidden; width: 100%; }
```

#### Mobile Height Constraints

**Use responsive heights instead of fixed values:**
```tsx
// ❌ DON'T - Fixed height on all screens
<div className="h-96">

// ✅ DO - Responsive heights
<div className="h-72 sm:h-80 lg:h-96">
```

**Use responsive min-heights for sections:**
```tsx
// ❌ DON'T - Large fixed min-height
<section className="min-h-[700px]">

// ✅ DO - Responsive min-heights
<section className="min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
```

#### Mobile Gap/Spacing

**Gaps should be responsive:**
```tsx
// ❌ DON'T - Same gap on all screens
<div className="gap-12">

// ✅ DO - Responsive gaps
<div className="gap-8 md:gap-12">
```

### 6. Accessibility Requirements

**Focus States:**
```tsx
// All interactive elements need focus indicators
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
```

**ARIA Labels:**
```tsx
// Descriptive labels for screen readers
<button aria-label="Learn more about Kingside services">Learn More</button>
<div aria-hidden="true">Decorative element</div>
<div aria-live="polite" aria-atomic="true">Animated content</div>
```

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Tab order follows visual hierarchy
- Enter/Space activates buttons

---

## Component Patterns

### 1. BrandButton (Required for CTAs)

**⚠️ CRITICAL:** All primary and secondary CTAs MUST use `BrandButton` component.

```tsx
import { BrandButton } from '@/components/ui/brand-button';

// Primary CTA (black with blue radial fill on hover)
<BrandButton
  href="#contact"
  variant="brand"
  size="lg"
  aria-label="Try it firsthand"
>
  Try it firsthand
</BrandButton>

// Secondary CTA (outline with blue fill on hover)
<BrandButton
  href="#why-kingside"
  variant="brandOutline"
  size="lg"
  aria-label="Schedule a demo"
>
  Schedule a demo
</BrandButton>

// As a button (not a link)
<BrandButton type="submit" variant="brand">
  Send message
</BrandButton>
```

**Features:**
- Radial fill animation (liquid accent-blue expands from cursor on hover)
- Cursor-follow parallax (subtle ±2px movement)
- Sheen sweep on hover
- Micro-press animation on click
- Accessible focus states (shadcn baseline)
- Supports `href` (renders as `<a>`) or no href (renders as `<button>`)

**DO NOT use:**
- Standard anchor tags styled as buttons
- The deprecated `NeuBrutalistButton` component
- Custom one-off button implementations

### 2. Grid Layout (Required for Grids)

**⚠️ CRITICAL:** All grid layouts MUST use the `Grid` component.

```tsx
import { Grid } from '@/design-system/primitives';

// 3-column responsive grid
<Grid cols={{ base: 1, lg: 3 }} gap={6}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>

// Simple responsive grid
<Grid cols={3} gap={6} responsive>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Grid>
```

**DO NOT use:**
- Manual `grid grid-cols-*` Tailwind classes
- Inline grid styles
- Custom grid implementations

### 3. Design System Primitives

**Use primitives for consistent structure:**

```tsx
import { Section, Container, Heading, Text, Stack } from '@/design-system/primitives';

<Section id="features" variant="default">
  <Heading level="h2" variant="section" className="mb-12">
    Our Features
  </Heading>
  <Text size="lg" className="max-w-prose mx-auto mb-16">
    Body copy with consistent typography
  </Text>
  <Stack direction="vertical" gap="8">
    <FeatureCard />
    <FeatureCard />
  </Stack>
</Section>
```

### 4. Neubrutalist Cards

**Card with colored shadow:**
```tsx
<div className="relative">
  {/* Shadow layer (beneath) */}
  <div className="absolute inset-0 bg-accent border-2 border-accent"
       style={{ transform: 'translate(8px, 8px)' }} />

  {/* Card layer (on top) */}
  <div className="relative bg-background border-2 border-border rounded-xl p-8">
    <h3 className="font-heading text-h3 font-semibold mb-4">Card Title</h3>
    <p className="text-base">Card content here</p>
  </div>
</div>
```

---

## Git & Deployment

### GitHub Pages Deployment

**Automatic Deployment:**
- Triggered on push to `main` branch
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Build output: `docs/` directory
- Custom domain: `kingsidegroup.com`
- Live site: https://kingsidegroup.com

**Manual Deployment:**
- Can be triggered via GitHub Actions UI

**Build Configuration:**
- Base path: `/` (configured in `vite.config.ts`)
- Output directory: `docs/`
- `.nojekyll` file created automatically

### Git Commit Guidelines

**Commit Message Format:**
```bash
# Good commit messages
git commit -m "Add responsive navigation menu"
git commit -m "Fix button hover animation on mobile"
git commit -m "Update design tokens for brand refresh"
git commit -m "Refactor ContactForm validation logic"

# Bad commit messages
git commit -m "Update"
git commit -m "Fix stuff"
git commit -m "WIP"
```

**Git Safety:**
- NEVER force push to main/master
- NEVER skip hooks unless explicitly requested
- NEVER update git config without permission
- Always verify changes with `git status` and `git diff` before committing

---

## Common Tasks

### Task 1: Change Brand Color

**Files to modify:**
1. `src/design-system/tokens.ts` - Update color token
2. `src/styles/globals.css` - Manually sync CSS variable

```typescript
// 1. tokens.ts
export const colors = {
  accent: {
    DEFAULT: '#20A4F3',  // Change this
    foreground: '#F8F4E8',
  },
};

// 2. globals.css
:root {
  --accent: #20A4F3;  /* Manually update to match */
}
```

**Result:** Color automatically flows to all components using `bg-accent`, `text-accent`, etc.

### Task 2: Add New Component

**Steps:**
1. Create component file in `src/components/ComponentName.tsx`
2. Use design system primitives and Tailwind utilities
3. Export from `src/components/index.ts`
4. Import and use in `App.tsx` or parent component

```tsx
// 1. src/components/NewFeature.tsx
import { Section, Heading, Text } from '@/design-system/primitives';

export const NewFeature = () => {
  return (
    <Section id="new-feature" variant="default">
      <Heading level="h2" variant="section">New Feature</Heading>
      <Text size="lg">Feature description</Text>
    </Section>
  );
};

// 2. src/components/index.ts
export { NewFeature } from './NewFeature';

// 3. src/App.tsx
import { NewFeature } from './components';

export default function App() {
  return (
    <div>
      {/* ... other components */}
      <NewFeature />
    </div>
  );
}
```

### Task 3: Modify Typography

**Files to modify:**
1. `src/design-system/tokens.ts` - Update fontSize or fontWeight tokens
2. `src/styles/globals.css` - Manually sync CSS variables

### Task 4: Add Responsive Breakpoint

**Use existing breakpoints from design system:**
```tsx
// Mobile: default (no prefix)
// Tablet: sm: (640px+)
// Desktop: lg: (1024px+)
// Large: xl: (1280px+)

<div className="px-5 sm:px-6 lg:px-8 xl:px-10">
```

### Task 5: Fix Accessibility Issue

**Common fixes:**
```tsx
// Add focus states
<button className="focus-visible:ring-2 focus-visible:ring-ring">

// Add ARIA labels
<button aria-label="Close menu">X</button>

// Ensure color contrast
// Check DESIGN_SYSTEM.md for approved color combinations

// Add keyboard navigation
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}
```

---

## Important Files Reference

### Essential Files (Read First)

| File | Purpose | When to Reference |
|------|---------|-------------------|
| `src/design-system/tokens.ts` | Single source of truth for all design values | Before making any design changes |
| `src/DESIGN_SYSTEM.md` | Complete design system specification | For design decisions, component patterns |
| `documentation/guides/SOURCE_OF_TRUTH.md` | Explains design system architecture | Understanding token flow |
| `src/App.tsx` | Main application structure | Understanding page composition |
| `tailwind.config.ts` | Tailwind theme configuration | Understanding utility classes |

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build and dev server config |
| `tsconfig.json` | TypeScript compiler options |
| `.eslintrc.json` | ESLint rules and plugins |
| `.prettierrc.json` | Code formatting rules |
| `package.json` | Dependencies and scripts |

### Documentation Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | This file - AI assistant guide |
| `documentation/guides/Claude.md` | Detailed original Claude guide |
| `DEVELOPMENT_SETUP.md` | Development environment setup |
| `documentation/guides/APPLICATION_OVERVIEW.md` | Application architecture |
| `documentation/guides/FIGMA_MAKE_WORKFLOW.md` | Figma integration workflow |
| `documentation/guides/MERGE_GUIDE.md` | Git merge strategies |
| `src/components/BUTTON_USAGE_GUIDE.md` | Button component usage |

### Design System Files

| File | Purpose |
|------|---------|
| `src/design-system/tokens.ts` | Design tokens (SSOT) |
| `src/design-system/README.md` | Design system usage guide |
| `src/design-system/primitives/` | Base components (Section, Container, Heading, etc.) |
| `src/styles/globals.css` | Global styles and CSS variables |

---

## Communication Guidelines

### When Working with Users

The primary user has **beginner-level technical knowledge**. Follow these guidelines:

1. **Explain before implementing** - Users need to understand what changes will do
2. **Use simple language** - Avoid jargon or explain technical terms
3. **Use analogies** - "React components are like LEGO blocks you can reuse"
4. **Show file paths** - Always clarify which file you're modifying
5. **Explain impacts** - "Changing tokens.ts affects all components that use this color"
6. **Offer context** - Explain why a solution works, not just what to do
7. **Be patient** - Provide educational value, not just solutions
8. **Use examples** - Show code examples with comments

### Response Style

**Good response:**
```
I'll add a new button to the Hero section. This button will use the
BrandButton component (located at src/components/ui/brand-button.tsx)
which gives it the radial fill hover effect you see on other buttons.

I'm adding it to src/components/sections/Hero.tsx, right after the
existing CTA button. This keeps both buttons together in a row on
desktop and stacks them on mobile.

The button will automatically inherit the design system colors and spacing,
so it'll match the rest of the site perfectly.
```

**Bad response:**
```
Updated Hero component with new CTA.
```

---

## Watch Out For

### ⚠️ Critical Don'ts

**1. Breaking Single Source of Truth**
```tsx
// ❌ DON'T hardcode values that should be tokens
<div style={{ color: '#111111', fontSize: '16px' }}>

// ✅ DO use design tokens via Tailwind
<div className="text-foreground text-base">
```

**2. Using Wrong Button Component**
```tsx
// ❌ DON'T use regular buttons for CTAs
<button className="...">Click Me</button>

// ✅ DO use BrandButton
<BrandButton variant="brand" href="#contact">Click Me</BrandButton>
```

**3. Creating Custom Grids**
```tsx
// ❌ DON'T use manual grid classes
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

// ✅ DO use Grid component
<Grid cols={{ base: 1, lg: 3 }} gap={6}>
```

**4. Ignoring Responsive Design**
```tsx
// ❌ DON'T use fixed sizes
<div className="px-8">  // Same padding on all screens

// ✅ DO use responsive utilities
<div className="px-5 sm:px-6 lg:px-8">  // Responsive padding
```

**5. Skipping Accessibility**
```tsx
// ❌ DON'T forget focus states and ARIA
<button>Click Me</button>

// ✅ DO add accessibility features
<button
  className="focus-visible:ring-2 focus-visible:ring-ring"
  aria-label="Descriptive action"
>
  Click Me
</button>
```

**6. Modifying globals.css Without tokens.ts**
```
// ❌ DON'T update globals.css first
// This creates drift between source of truth and CSS

// ✅ DO update tokens.ts first, then sync globals.css
```

**7. Using Arbitrary Values**
```tsx
// ❌ DON'T use arbitrary Tailwind values
<div className="px-[13px] text-[19px] rounded-[3px]">

// ✅ DO use design system values
<div className="px-3 text-lg rounded-sm">
```

**8. Breaking Mobile Layouts**
```tsx
// ❌ DON'T forget mobile testing
// Always test on mobile, tablet, and desktop

// ✅ DO use mobile-first responsive design
<div className="flex-col lg:flex-row">  // Stack on mobile
```

**9. Causing Horizontal Scroll on Mobile**
```tsx
// ❌ DON'T use fixed widths > 375px without responsive alternatives
<div className="w-[600px]">
<div className="min-h-[700px] pb-[400px]">

// ✅ DO use responsive widths and heights
<div className="w-[300px] sm:w-[400px] lg:w-[600px]">
<div className="min-h-[500px] md:min-h-[600px] lg:min-h-[700px] pb-64 md:pb-80 lg:pb-96">
```

**10. Animations Overflowing Viewport**
```tsx
// ❌ DON'T let animations extend beyond container bounds
<motion.div animate={{ x: [0, -240] }} />  // Can overflow left

// ✅ DO wrap in overflow-hidden or hide on mobile
<div className="hidden lg:block overflow-hidden">
  <motion.div animate={{ x: [0, -240] }} />
</div>
```

**11. Wrong Section Padding**
```tsx
// ❌ DON'T skip mobile padding step
<section className="px-6 lg:px-8">  // Missing px-5 and sm:px-6

// ✅ DO use the full responsive pattern
<section className="px-5 sm:px-6 lg:px-8">
```

### Common Pitfalls

1. **Not exporting components from index.ts** - Components won't be importable
2. **Mixing inline styles with Tailwind** - Inconsistent styling approach
3. **Ignoring TypeScript errors** - Run `npm run typecheck` regularly
4. **Not testing production build** - Use `npm run preview` before deploying
5. **Hardcoding colors/fonts** - Always use design tokens
6. **Creating component-specific spacing** - Use design system spacing scale
7. **Forgetting dark mode** - Design system supports dark mode via CSS variables
8. **Not testing on mobile** - Always test on 375px viewport before deploying
9. **Using fixed dimensions** - Replace `w-[600px]` with responsive `w-[300px] sm:w-[400px] lg:w-[600px]`
10. **Skipping sm: breakpoint in padding** - Always use full `px-5 sm:px-6 lg:px-8` pattern

---

## Quick Reference

### Color Classes

```tsx
// Background colors
bg-background      // #F8F4E8 (linen)
bg-primary         // #111111 (black)
bg-accent          // #20A4F3 (blue)
bg-secondary       // #C77CFF (purple)
bg-destructive     // #F9323E (red)
bg-muted           // #746F72 (gray)

// Text colors
text-foreground    // #111111 (black)
text-primary-foreground  // #F3EBE4 (light linen)
text-accent        // #20A4F3 (blue)
text-muted-foreground    // Muted text

// Border colors
border-border      // #111111 (black)
border-accent      // #20A4F3 (blue)
```

### Typography Classes

```tsx
// Font families
font-heading       // Poppins
font-body          // Raleway

// Font sizes
text-h1           // 48.83px
text-h2           // 39.06px
text-h3           // 31.25px
text-h4           // 25px
text-base         // 16px
text-label        // 12.8px

// Font weights
font-normal       // 400
font-medium       // 500
font-semibold     // 600
font-bold         // 700
```

### Spacing Scale

```tsx
// Padding/margin
p-4   // 16px
p-5   // 20px
p-6   // 24px
p-8   // 32px
p-10  // 40px
p-12  // 48px
p-16  // 64px

// Gap
gap-4   // 16px
gap-6   // 24px
gap-8   // 32px
gap-12  // 48px
```

### Border Radius

```tsx
rounded-sm     // 1px
rounded        // 2px (default brutalist)
rounded-md     // 2px
rounded-lg     // 4px (buttons)
rounded-xl     // 6px (cards)
```

---

## Version History

- **v1.0** - January 10, 2026 - Comprehensive AI assistant guide created
- **v0.1** - November 13, 2025 - Original Claude.md in documentation/guides/

---

## Additional Resources

### Internal Documentation
- 📚 [Complete Design System](src/DESIGN_SYSTEM.md)
- 🎨 [Design System README](src/design-system/README.md)
- 🔧 [Button Usage Guide](src/components/BUTTON_USAGE_GUIDE.md)
- 🎯 [Source of Truth Guide](documentation/guides/SOURCE_OF_TRUTH.md)
- 🖼️ [Figma Make Workflow](documentation/guides/FIGMA_MAKE_WORKFLOW.md)
- 📱 [Application Overview](documentation/guides/APPLICATION_OVERVIEW.md)

### External Resources
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Questions to Ask Before Making Changes

1. **Does this change affect design tokens?**
   - If yes, update `tokens.ts` first, then sync `globals.css`

2. **Is this component reusable or page-specific?**
   - Reusable → `src/components/`
   - Page-specific → Keep in page component

3. **Are we maintaining consistency with existing patterns?**
   - Check similar components for patterns
   - Use design system primitives when possible

4. **Does this need to be responsive?**
   - Always design mobile-first
   - Test on multiple screen sizes

5. **Is this accessible?**
   - Keyboard navigation?
   - Focus states?
   - ARIA labels?
   - Color contrast?

6. **Am I using the right component?**
   - CTAs → BrandButton
   - Grids → Grid component
   - Layout → Design system primitives

7. **Am I following the single source of truth?**
   - No hardcoded colors, fonts, or spacing
   - All values from design tokens

---

## Contact & Support

For questions about this codebase:
1. Review this CLAUDE.md file
2. Check the design system documentation
3. Review existing components for patterns
4. Consult the development team if needed

---

**This guide is maintained to help AI assistants effectively work on the Kingside Group website. When in doubt, prioritize design system consistency, accessibility, and user education.**
