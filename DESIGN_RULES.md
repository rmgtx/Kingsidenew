## Design Rules (Shadcn-First)

This project is intentionally **shadcn/ui-first**. The goal is a codebase that is easy to extend without accumulating one-off styling.

### Non-negotiables

- **Use shadcn primitives** from `src/components/ui/*` for UI building blocks (Card, Button, Input, Tabs, Sheet, etc.).
- **Phosphor icons only** (`@phosphor-icons/react`). Do not introduce `lucide-react` usage.
- **No hardcoded colors in components** (no `#...`, `rgb(...)`). Use semantic tokens via Tailwind classes (`bg-background`, `text-foreground`, `text-accent`, `border-border`, etc.).
- **No arbitrary Tailwind values** (no `[...]` in classNames) in app components. If shadcn upstream uses them inside `src/components/ui`, that's allowed.
- **No inline visual styles**. Only allow inline styles for **motion transforms** (e.g. `style={{ transform }}`).

### Allowed brand exceptions

- **`BrandButton`** (`src/components/ui/brand-button.tsx`): Wraps shadcn `Button` and adds radial fill hover effect, cursor-follow parallax, sheen sweep, and micro-press animation. Uses `buttonVariants` for baseline sizing/focus/disabled. Inline `clipPath` styles are allowed for motion.
- **Wordmark assets**: static assets placed in `public/` and referenced via `<img src="...">`.

### Canonical layout tokens (use these everywhere)

- **Page container**: `mx-auto max-w-7xl px-6 lg:px-8`
- **Standard section spacing**: `py-24 lg:py-32`
- **Hero spacing**: `pt-32 lg:pt-40 pb-12 lg:pb-16`
- **Card “default”**: `rounded-xl border bg-card shadow-lg`
- **Card content padding**: `p-8 lg:p-10`
- **Button (primary/secondary CTA)**: height `h-10`, padding `px-6`, radius `rounded-md`

### PR checklist (quick)

- [ ] Used shadcn primitives instead of custom wrappers
- [ ] No hex/rgb colors introduced in components
- [ ] No Tailwind arbitrary values introduced in components
- [ ] Phosphor icons only
- [ ] Spacing uses the canonical section/container/card scale
- [ ] `npm run lint:design` passes

