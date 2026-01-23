# Claude Skills Recommendations for Kingside Group Website

**Date:** January 23, 2026
**Branch:** `claude/review-codebase-recommendations-jx32h`

---

## Overview

After reviewing the codebase, documentation, and current development patterns, here are recommended Claude skills that would streamline development workflows and enforce project conventions automatically.

---

## 1. Component Scaffolding Skill

**Purpose:** Automatically generate new section or UI components following project conventions.

**What it does:**
- Creates a new component file in the correct directory (`src/components/sections/` or `src/components/ui/`)
- Uses the standard pattern: TypeScript interface, named export, Tailwind classes
- Applies responsive padding (`px-5 sm:px-6 lg:px-8`) and section structure
- Imports from `@phosphor-icons/react` (not lucide or old phosphor-react)
- Imports animations from `motion/react` (not framer-motion)
- Adds the export to `src/components/index.ts`

**Example trigger:** "Create a new section component called Testimonials"

**Skill template:**
```
When creating a new section component:
1. Use this file template:
   - TypeScript with explicit props interface
   - Import motion from "motion/react"
   - Import icons from "@phosphor-icons/react"
   - Wrap in <section id="kebab-case-name" className="py-24 lg:py-32 px-5 sm:px-6 lg:px-8">
   - Use <div className="mx-auto max-w-7xl"> as inner container
   - Apply responsive typography (text-3xl sm:text-4xl lg:text-5xl for h2)
2. Add export to src/components/index.ts
3. Suggest placement in App.tsx
```

---

## 2. Import Consistency Checker Skill

**Purpose:** Detect and fix inconsistent package imports that currently plague the codebase.

**What it does:**
- Flags any import from `framer-motion` (should be `motion/react`)
- Flags any import from `phosphor-react` (should be `@phosphor-icons/react`)
- Flags any import from `lucide-react` (should use Phosphor)
- Suggests the correct replacement import

**Current issues this would catch:**
- `src/components/sections/WhyKingside.tsx` uses `phosphor-react`
- `src/components/sections/HeroStats.tsx` uses `framer-motion`

**Skill instruction:**
```
Before committing any changes, verify imports:
- motion/animations: use "motion/react", NOT "framer-motion"
- icons: use "@phosphor-icons/react", NOT "phosphor-react" or "lucide-react"
- If you encounter files with wrong imports, fix them as part of any PR touching that file.
```

---

## 3. Design Token Enforcement Skill

**Purpose:** Prevent hardcoded colors, spacing, and typography values that bypass the design system.

**What it does:**
- Flags hex colors in className attributes or inline styles (except in `index.css`)
- Flags arbitrary Tailwind values like `text-[19px]` or `bg-[#abc123]`
- Suggests the correct semantic token (e.g., `bg-accent` instead of `bg-[#20A4F3]`)
- Allows exceptions only for motion transform values and clipPath

**Skill instruction:**
```
When writing or reviewing component code:
- NEVER use hardcoded hex/rgb colors in components. Use semantic classes:
  - Blue accent: bg-accent / text-accent (NOT bg-[#20A4F3])
  - Primary/black: bg-primary / text-foreground (NOT bg-[#111111])
  - Background/white: bg-background (NOT bg-white or bg-[#ffffff])
- NEVER use arbitrary Tailwind values for spacing/sizing in section components
- Inline styles are ONLY allowed for: transform, clipPath, and motion animation values
- Run `npm run lint:design` after making component changes
```

---

## 4. Responsive Design Audit Skill

**Purpose:** Ensure all new or modified components meet mobile-first responsive standards.

**What it does:**
- Checks that section padding uses the full `px-5 sm:px-6 lg:px-8` pattern
- Verifies headings use responsive scaling (e.g., `text-3xl sm:text-4xl lg:text-5xl`)
- Flags fixed widths that could overflow mobile viewport (375px)
- Ensures gaps use responsive variants (`gap-6 md:gap-8 lg:gap-12`)
- Checks for fixed heights without responsive alternatives

**Skill instruction:**
```
After creating or modifying any section component, audit responsive design:
1. Section wrapper: must have py-24 lg:py-32 px-5 sm:px-6 lg:px-8
2. Headings: must scale (text-3xl sm:text-4xl lg:text-5xl for h2)
3. No fixed widths > 300px without sm:/lg: alternatives
4. Gaps should be responsive (gap-6 md:gap-8 or similar)
5. Flex layouts: use flex-col lg:flex-row for content that stacks on mobile
6. Images/decorations: wrap in overflow-hidden if they could extend beyond viewport
```

---

## 5. BrandButton Usage Skill

**Purpose:** Ensure all CTAs use the BrandButton component correctly.

**What it does:**
- Detects when a regular `<button>` or `<a>` tag is styled as a CTA
- Suggests replacing with `<BrandButton>` from `@/components/ui/brand-button`
- Validates correct variant usage (`brand` for primary, `brandOutline` for secondary)
- Ensures `aria-label` is provided for accessibility

**Skill instruction:**
```
For any call-to-action or button that links to a section/page:
- Use <BrandButton> from '@/components/ui/brand-button'
- Primary CTAs: variant="brand" (black bg, blue radial fill on hover)
- Secondary CTAs: variant="brandOutline" (outline, blue fill on hover)
- Always include aria-label with descriptive text
- For navigation links: use href prop (renders as <a>)
- For form actions: omit href, use type="submit" (renders as <button>)
- NEVER create one-off styled buttons or anchor tags for CTAs
```

---

## 6. Pre-Commit Build Validation Skill

**Purpose:** Catch build failures before they reach the deployment pipeline.

**What it does:**
- Runs `npx tsc --noEmit` to check TypeScript types
- Runs `npm run lint:design` to check design system compliance
- Reports issues with specific file paths and line numbers
- Suggests fixes for common type errors

**Skill instruction:**
```
Before committing changes:
1. Run: npx tsc --noEmit (check for type errors)
2. Run: npm run lint:design (check design system compliance)
3. If either fails, fix the issues before committing
4. For TypeScript errors: check prop types, missing imports, and module declarations
5. For design lint errors: replace hardcoded values with semantic tokens
```

---

## 7. Animation Pattern Skill

**Purpose:** Standardize animation implementations across the codebase.

**What it does:**
- Provides correct motion/react import patterns
- Enforces `prefers-reduced-motion` media query respect
- Ensures animations use spring physics with consistent config
- Avoids animations that cause layout shifts or overflow

**Skill instruction:**
```
When implementing animations:
1. Import from "motion/react" (NOT "framer-motion")
2. Use spring transitions: { type: "spring", stiffness: 300, damping: 24 }
3. For scroll-triggered animations: use whileInView with viewport={{ once: true }}
4. Respect reduced motion: add CSS `@media (prefers-reduced-motion: reduce)` overrides
5. Never animate layout properties (width, height) - use transform/opacity only
6. Wrap moving elements in overflow-hidden containers if they leave bounds
7. For hover effects: use whileHover, not onMouseEnter state changes
```

---

## 8. Accessibility Compliance Skill

**Purpose:** Ensure all components meet WCAG 2.1 AA standards.

**What it does:**
- Adds focus-visible ring styles to interactive elements
- Ensures images have alt text
- Validates color contrast for text on backgrounds
- Adds aria-labels to icon-only buttons
- Checks for keyboard navigation support

**Skill instruction:**
```
For every interactive element:
1. Add focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
2. Icon-only buttons: add aria-label describing the action
3. Decorative elements: add aria-hidden="true"
4. Form inputs: associate with <Label> using htmlFor
5. Animated content: add aria-live="polite" for dynamic updates
6. Navigation: ensure tab order follows visual hierarchy
7. Color contrast: text-foreground on bg-background (>= 4.5:1 ratio)
```

---

## 9. CSS Variable Sync Skill

**Purpose:** Keep `index.css` @theme variables in sync when design decisions change.

**What it does:**
- When a color, radius, or font variable is changed in `index.css`
- Verifies the change is intentional and documented
- Checks that component usage of the token still makes sense
- Flags any components using the old value directly

**Skill instruction:**
```
When modifying CSS variables in src/index.css:
1. Document the reason for the change
2. Search the codebase for any hardcoded instances of the old value
3. Verify components using the semantic class still render correctly
4. If changing colors: check contrast ratios with foreground/background pairings
5. If changing radius: verify card, button, and input components look correct
6. Update CLAUDE.md "Quick Reference" section if token values change
```

---

## 10. Dependency Cleanup Skill

**Purpose:** Identify and resolve redundant or conflicting dependencies.

**What it does:**
- Flags when both `motion` and `framer-motion` are imported
- Flags when both `phosphor-react` and `@phosphor-icons/react` are imported
- Suggests package removal commands
- Verifies no remaining imports before removing packages

**Current cleanup needed:**
```bash
# After fixing all imports to use the correct packages:
npm uninstall framer-motion phosphor-react
```

**Skill instruction:**
```
When reviewing or modifying package.json:
- Preferred packages:
  - Animations: "motion" (not "framer-motion")
  - Icons: "@phosphor-icons/react" (not "phosphor-react" or "lucide-react")
- Before removing a package: grep the entire src/ for any remaining imports
- After removing: verify npm run build still succeeds
```

---

## 11. Section Content Accuracy Skill

**Purpose:** Ensure section content matches the approved copy from FRESH_START_GUIDE.md.

**What it does:**
- Cross-references section text with the canonical content in FRESH_START_GUIDE.md
- Flags any drift in headlines, body copy, or CTA text
- Ensures stat numbers and claims are accurate

**Skill instruction:**
```
When modifying section content (headlines, body text, CTAs):
1. Check FRESH_START_GUIDE.md for the canonical content for that section
2. Do not change approved copy without explicit user permission
3. If content differs from guide, flag it and ask which version is correct
4. CTA button text must match the approved copy exactly
```

---

## 12. Form Integration Testing Skill

**Purpose:** Validate ContactForm webhook integration works correctly.

**What it does:**
- Verifies the webhook URL is configured correctly
- Tests form validation logic
- Checks success/error state handling
- Validates the ConfirmationModal appears on success

**Skill instruction:**
```
When modifying the ContactForm component:
1. Webhook URL: https://n8n.kingsidegroup.com/webhook/kingside-contact
2. Required fields: firstName, lastName, businessName, email, phone
3. On success: show ConfirmationModal, reset form, show toast
4. On error: show error toast, keep form data intact
5. Validate email format before submission
6. All inputs must use shadcn Input/Label components
```

---

## Implementation Priority

| Priority | Skill | Impact | Effort |
|----------|-------|--------|--------|
| **P0** | Import Consistency Checker (#2) | Fixes existing bugs | Low |
| **P0** | Pre-Commit Build Validation (#6) | Prevents deploy failures | Low |
| **P1** | Design Token Enforcement (#3) | Prevents design drift | Medium |
| **P1** | Responsive Design Audit (#4) | Ensures mobile quality | Medium |
| **P1** | BrandButton Usage (#5) | Enforces brand consistency | Low |
| **P2** | Component Scaffolding (#1) | Speeds up development | Medium |
| **P2** | Animation Pattern (#7) | Standardizes animations | Medium |
| **P2** | Accessibility Compliance (#8) | Meets WCAG standards | Medium |
| **P3** | CSS Variable Sync (#9) | Prevents token drift | Low |
| **P3** | Dependency Cleanup (#10) | Reduces bundle size | Low |
| **P3** | Section Content Accuracy (#11) | Maintains copy fidelity | Low |
| **P3** | Form Integration Testing (#12) | Validates integrations | Low |

---

## How to Implement These Skills

These skills can be implemented in several ways within Claude Code:

### Option A: Add to CLAUDE.md (Simplest)
Add a "Skills" section to the existing CLAUDE.md with the skill instructions above. Claude will follow these as part of its general project knowledge.

### Option B: Create .claude/skills/ directory
Create individual skill files that can be loaded contextually:
```
.claude/
  skills/
    component-scaffolding.md
    import-checker.md
    design-tokens.md
    responsive-audit.md
    ...
```

### Option C: Combine with Design Lint Script
Extend `scripts/design-lint.mjs` to programmatically enforce skills #2, #3, #4, and #5 as automated checks that run on `npm run lint:design`.

### Recommended Approach
Start with **Option A** (add to CLAUDE.md) for immediate benefit, then migrate high-value skills to **Option C** (automated linting) for enforcement without AI involvement.

---

## Immediate Actions Needed

Beyond skills, the codebase exploration revealed these issues that should be fixed:

1. **Fix build failure** - Missing type definitions preventing `npm run build`
2. **Consolidate motion imports** - Replace `framer-motion` with `motion/react` in HeroStats
3. **Fix phosphor import** - Replace `phosphor-react` with `@phosphor-icons/react` in WhyKingside
4. **Remove unused packages** - `framer-motion` and `phosphor-react` after fixing imports
5. **Update CLAUDE.md** - Remove references to non-existent files (design-system/tokens.ts, primitives/, SOURCE_OF_TRUTH.md)
6. **Resolve design spec mismatch** - Current colors/radius differ from FRESH_START_GUIDE specs (intentional?)
