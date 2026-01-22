# Kingside Brand Patterns Reference

This document provides reference patterns for Kingside's brand styling. These patterns can be applied using shadcn/ui components and Tailwind CSS.

---

## Current Component: BrandButton

The primary CTA component is `BrandButton` located at `src/components/ui/brand-button.tsx`.

```tsx
import { BrandButton } from '@/components/ui/brand-button';

// Primary CTA (black with blue radial fill on hover)
<BrandButton href="#contact" variant="brand" size="lg">
  Book a Call
</BrandButton>

// Secondary CTA (outline with blue fill on hover)
<BrandButton href="#services" variant="brandOutline" size="lg">
  Learn More
</BrandButton>

// Form submit button
<BrandButton type="submit" variant="brand">
  Send Message
</BrandButton>
```

**Features:**
- Radial fill animation (accent-blue expands from cursor on hover)
- Cursor-follow parallax (subtle ±2px movement)
- Sheen sweep on hover
- Micro-press animation on click
- Accessible focus states

---

## Brand Patterns

### 1. Neubrutalist Card Shadow

Used for feature cards and content blocks:

```tsx
<div className="relative">
  {/* Shadow layer - offset 8px right and down */}
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

**Shadow Color Options:**
- `var(--accent)` - Blue (#20A4F3)
- `var(--secondary)` - Purple (#C77CFF)
- `var(--destructive)` - Red (#F9323E)

### 2. Spring Physics Animation Config

For hover animations that need the brand's signature feel:

```typescript
const SPRING_OPTIONS = {
  mass: 1.5,
  stiffness: 500,
  damping: 100,
};
```

### 3. Text Slide Animation

For text that slides up on hover:

```tsx
<span className="relative overflow-hidden">
  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
    {children}
  </span>
  <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
    {children}
  </span>
</span>
```

---

## Color Palette Quick Reference

```css
--background: #F8F4E8;        /* Linen */
--foreground: #111111;        /* Near black */
--primary: #111111;           /* Black */
--primary-foreground: #F3EBE4;
--secondary: #C77CFF;         /* Purple */
--accent: #20A4F3;            /* Blue */
--destructive: #F9323E;       /* Red */
--muted: #746F72;             /* Gray */
--border: #111111;            /* Black borders */
```

---

## Typography

```css
--font-heading: 'Poppins', sans-serif;
--font-body: 'Raleway', sans-serif;
```

---

## Chess Piece SVG Paths

Located in `src/imports/svg-s90zob6txr.ts`:
- King (blue accent)
- Queen (red destructive)
- Rook (purple secondary)

Used in WhyKingside cards.

---

## ConfirmationModal

The success modal for form submission is in `src/components/ConfirmationModal.tsx`.

Features:
- Spring-animated entrance/exit
- Neubrutalist shadow styling
- Blue accent icon

---

**Document Version:** 2.0
**Last Updated:** January 22, 2026
**Note:** Legacy components (NeuBrutalistButton, AnimatedTaskText, NeuCard, AnimatedNeuCard) have been archived and removed from the codebase. Use BrandButton and shadcn/ui components instead.
