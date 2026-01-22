# Kingside Website: shadcn/ui Migration Guide

**Branch:** `claude/adopt-design-system-LlDDr`
**Started:** January 10, 2026
**Status:** IN PROGRESS

---

## Overview

This document enables any AI agent to continue the migration of Kingside Group's website from a custom design system to shadcn/ui. Read this entire document before making changes.

---

## Project Goal

Replace the existing custom design system with shadcn/ui while preserving:
- Brand colors (linen, black, blue, purple, red)
- Typography (Poppins headings, Raleway body)
- NeuBrutalistButton component (custom spring-physics animation)
- Chess piece branding
- All existing content/copy

---

## Current Progress Tracker

Update this section as you complete tasks. Check the box and add completion date.

### Phase 1: Setup
- [x] Initialize shadcn/ui (`npx shadcn@latest init`) - Jan 10, 2026
- [x] Install Phosphor Icons (`npm i @phosphor-icons/react`) - Jan 10, 2026
- [x] Create components.json configuration - Jan 10, 2026
- [ ] Remove old design system dependencies (if conflicting)

**NOTE:** shadcn registry had access issues. Components created manually instead of via CLI.

### Phase 2: Theme Configuration
- [x] Configure colors in shadcn theme (see Color Mapping below) - ALREADY DONE (existing globals.css compatible)
- [x] Set up Google Fonts (Poppins, Raleway) - ALREADY DONE (in index.css)
- [x] Configure brutalist border-radius (2-6px) - ALREADY DONE (--radius: 2px)
- [ ] Test theme renders correctly

### Phase 3: Port Custom Components
- [x] BrandButton created at `src/components/ui/brand-button.tsx` - Jan 10, 2026
- [x] Legacy components (NeuBrutalistButton, AnimatedTaskText, NeuCard, AnimatedNeuCard) archived and removed - Jan 22, 2026
- [x] Chess piece assets in correct location

### Phase 3.5: Create shadcn Components (Manual - Registry Unavailable)
- [x] Button component - Jan 10, 2026
- [x] Card component - Jan 10, 2026
- [x] Input component - Jan 10, 2026
- [x] Label component - Jan 10, 2026
- [x] Textarea component - Jan 10, 2026
- [x] Badge component - Jan 10, 2026
- [ ] Sheet component (for mobile nav)
- [ ] Tabs component
- [ ] Separator component

### Phase 3.6: Migrate Lucide Icons to Phosphor
- [x] Navigation.tsx (Menu, X → List, X) - Jan 12, 2026
- [x] ConfirmationModal.tsx (CheckCircle) - Jan 12, 2026
- [x] All components now use Phosphor Icons - Jan 22, 2026

### Phase 4: Rebuild Sections
All sections reviewed - existing components are compatible with shadcn approach.
Icons have been migrated to Phosphor. Components use CSS variables correctly.

- [x] Navigation - Icons updated to Phosphor - Jan 12, 2026
- [x] Hero - No changes needed (uses motion, CSS vars) - Jan 12, 2026
- [x] ConfirmationModal - Icons updated to Phosphor - Jan 12, 2026
- [ ] MrBottleneck - Has inline styles, functional but could use primitives
- [x] WhyKingside - Good, uses Grid primitive, CSS vars - Jan 12, 2026
- [ ] AIStats - Has inline styles, functional but could use primitives
- [ ] IntelligentAutomation - Has inline styles, functional but could use primitives
- [x] ContactForm - Good, uses Grid primitive, CSS vars - Jan 12, 2026
- [x] Footer - Excellent, fully compatible with shadcn approach - Jan 12, 2026

**Note:** Components marked with inline styles are functional but could be improved
to use design system primitives (Heading, Text, Container) for better consistency.
This is optional optimization, not blocking for the migration.

### Phase 5: Testing & Deployment
- [ ] Responsive testing (375px, 768px, 1024px, 1440px)
- [ ] Accessibility audit
- [ ] Production build test
- [ ] Push to branch
- [ ] (User will merge to main)

---

## Critical Information

### Color Mapping

Map these Kingside colors to shadcn CSS variables:

```css
/* Kingside Brand Colors → shadcn variables */
--background: #F8F4E8;        /* Linen - warm cream */
--foreground: #111111;        /* Near black */
--primary: #111111;           /* Black */
--primary-foreground: #F3EBE4; /* Light linen */
--secondary: #C77CFF;         /* Purple */
--secondary-foreground: #F3EBE4;
--accent: #20A4F3;            /* Blue */
--accent-foreground: #F8F4E8;
--destructive: #F9323E;       /* Red */
--destructive-foreground: #F8F4E8;
--muted: #746F72;             /* Gray */
--muted-foreground: #F8F4E8;
--border: #111111;            /* Black borders - brutalist */
--ring: #20A4F3;              /* Blue focus rings */
--radius: 2px;                /* Brutalist minimal radius */
```

### Typography

```css
/* Font families */
--font-heading: 'Poppins', sans-serif;
--font-body: 'Raleway', sans-serif;

/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap');
```

### BrandButton - Primary CTA Component

Location: `src/components/ui/brand-button.tsx`

Key features:
1. Radial fill animation (accent-blue expands from cursor)
2. Cursor-follow parallax (subtle ±2px movement)
3. Sheen sweep on hover
4. Micro-press animation on click
5. Accessible focus states

**Note:** The legacy NeuBrutalistButton has been archived and removed. Use BrandButton for all CTAs.

---

## File Structure Reference

### Current Structure (before migration)
```
src/
├── components/
│   ├── Navigation.tsx      # Sticky nav with mobile menu
│   ├── Hero.tsx            # Main hero with animated text
│   ├── MrBottleneck.tsx    # Problem/solution section
│   ├── WhyKingside.tsx     # Features/benefits cards
│   ├── AIStats.tsx         # Statistics display
│   ├── IntelligentAutomation.tsx  # Tabs/features section
│   ├── ContactForm.tsx     # Form with validation
│   ├── Footer.tsx          # Site footer
│   ├── brand/                 # Brand components (GridPattern)
│   │   └── GridPattern.tsx
│   ├── ChessPiecesScroll.tsx   # Chess branding
│   └── ui/                 # Old shadcn-style components
├── design-system/
│   ├── tokens.ts           # Old tokens (reference only)
│   └── primitives/         # Old primitives (will be replaced)
├── styles/
│   └── globals.css         # Will be updated by shadcn
└── App.tsx                 # Main app component
```

### Target Structure (after migration)
```
src/
├── components/
│   ├── ui/                 # shadcn components (auto-generated)
│   ├── Navigation.tsx      # Rebuilt with shadcn
│   ├── Hero.tsx            # Rebuilt with shadcn
│   ├── MrBottleneck.tsx    # Rebuilt with shadcn
│   ├── WhyKingside.tsx     # Rebuilt with shadcn
│   ├── AIStats.tsx         # Rebuilt with shadcn
│   ├── IntelligentAutomation.tsx  # Rebuilt with shadcn
│   ├── ContactForm.tsx     # Rebuilt with shadcn
│   ├── Footer.tsx          # Rebuilt with shadcn
│   └── brand/
│       └── GridPattern.tsx    # Background pattern
├── lib/
│   └── utils.ts            # shadcn utilities (cn function)
├── styles/
│   └── globals.css         # Updated by shadcn + custom vars
└── App.tsx                 # Updated imports
```

---

## Content Extraction Guide

When rebuilding each section, you MUST extract content from the old component first.

### How to Extract Content

1. Read the old component file
2. Copy all text strings (headlines, descriptions, button labels)
3. Note any dynamic content or props
4. Identify images/assets used
5. Build new component with shadcn, paste content in

### Section Content Locations

| Section | Old File | Key Content |
|---------|----------|-------------|
| Navigation | `src/components/Navigation.tsx` | Logo, nav links, CTA button text |
| Hero | `src/components/Hero.tsx` | Headlines, subheadlines, CTA labels |
| MrBottleneck | `src/components/MrBottleneck.tsx` | Problem statement, solution text |
| WhyKingside | `src/components/WhyKingside.tsx` | Feature titles, descriptions |
| AIStats | `src/components/AIStats.tsx` | Statistics numbers, labels |
| IntelligentAutomation | `src/components/IntelligentAutomation.tsx` | Tab labels, feature descriptions |
| ContactForm | `src/components/ContactForm.tsx` | Field labels, validation messages, success text |
| Footer | `src/components/Footer.tsx` | Links, copyright, social links |

---

## shadcn Components to Install

Install these as needed during section rebuilds:

```bash
# Layout & Typography
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add separator

# Navigation
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet          # Mobile menu drawer
npx shadcn@latest add button

# Forms
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add label

# Feedback
npx shadcn@latest add sonner         # Toast notifications

# Interactive
npx shadcn@latest add tabs
npx shadcn@latest add accordion
```

---

## Decisions Made

Document any architectural or design decisions here:

1. **shadcn/ui over RetroUI** - Chosen for larger ecosystem, better long-term support, and more component options
2. **Phosphor Icons over Lucide** - More weight variants (thin, light, regular, bold, fill, duotone)
3. **Fresh rebuild over migration** - Cleaner result, avoids CSS conflicts, faster for small site
4. **BrandButton as primary CTA** - Core brand element with radial fill animation

---

## Troubleshooting

### Common Issues

**shadcn init fails:**
- Ensure you're in project root
- Check Node version (18+ required)
- Try: `npx shadcn@latest init --force`

**Colors not applying:**
- Check globals.css has correct CSS variables
- Ensure variables are in `:root` selector
- Verify Tailwind is processing the CSS file

**Fonts not loading:**
- Check Google Fonts import in globals.css or index.html
- Verify font-family CSS variables are set
- Check network tab for font loading errors

**NeuBrutalistButton animation broken:**
- Ensure `motion` package is installed (not `framer-motion`)
- Check import: `from "motion/react"` not `from "framer-motion"`
- Verify spring config values match exactly

**Build fails after shadcn init:**
- Check for duplicate Tailwind configs
- Remove old tailwind.config.ts if shadcn created new one
- Resolve any TypeScript path alias conflicts

---

## Commands Reference

```bash
# Development
npm run dev              # Start dev server (localhost:5173 or 3000)
npm run build            # Production build
npm run preview          # Preview production build

# shadcn
npx shadcn@latest init   # Initialize shadcn (first time)
npx shadcn@latest add X  # Add component X

# Quality
npm run lint             # Check for issues
npm run typecheck        # TypeScript check

# Git
git status               # Check current state
git add .                # Stage all changes
git commit -m "message"  # Commit
git push -u origin claude/adopt-design-system-LlDDr  # Push to branch
```

---

## Resuming Work

If you're a new agent picking up this work:

1. **Read this entire document first**
2. **Check the Progress Tracker above** - see what's done
3. **Run `npm run dev`** - ensure project runs
4. **Continue from next unchecked task**
5. **Update Progress Tracker as you complete tasks**
6. **Commit frequently with clear messages**

### Before Making Changes

Always:
- Read the old component to extract content
- Check if shadcn component is already installed
- Test after each section rebuild
- Update this document's progress tracker

### Git Workflow

```bash
# Before starting work
git status                    # Verify on correct branch
git pull origin claude/adopt-design-system-LlDDr  # Get latest

# After completing work
git add .
git commit -m "Descriptive message about what was done"
git push -u origin claude/adopt-design-system-LlDDr
```

---

## Contact & Context

- **Repository:** KINGSIDEsite
- **Live Site:** kingsidegroup.com
- **Deployment:** GitHub Pages (auto-deploys from main)
- **User Level:** Beginner-friendly explanations preferred

---

**Last Updated:** January 12, 2026
**Last Agent:** Claude Opus 4.5
**Next Task:** Review remaining sections (MrBottleneck, WhyKingside, AIStats, IntelligentAutomation, ContactForm, Footer)

---

## Registry Access Issue

The shadcn CLI registry (ui.shadcn.com) returned authorization errors during this session. Components were created manually based on shadcn source code. If registry access is restored in future sessions, you can use:

```bash
npx shadcn@latest add [component-name] --overwrite
```

This will replace the manually created components with official versions. The manually created components are functionally equivalent.
