# GEMINI.md - Context & Instructions for Kingside Group Website

**Last Updated:** January 22, 2026
**Project:** Kingside Group Website (KINGSIDEsite)
**Type:** Modern React SPA with shadcn/ui
**Focus:** AI Consulting Agency Portfolio

---

## 1. Project Overview

This is a **React 19 + TypeScript + Vite 7** project utilizing **Tailwind CSS 4** and **shadcn/ui** components. The design aesthetic is "Modern SaaS" with Neubrutalist touches (colored shadows, bold borders). The project enforces a strict "shadcn-first" approach, avoiding custom one-off CSS or components in favor of standardized primitives.

### Core Tech Stack
*   **Framework:** React 19 (TypeScript)
*   **Build Tool:** Vite 7
*   **Styling:** Tailwind CSS 4, shadcn/ui (using CSS variables)
*   **Icons:** `@phosphor-icons/react` (**Strictly enforced**, no Lucide)
*   **Animation:** Motion (formerly Framer Motion)

---

## 2. Building & Running

| Action | Command | Description |
| :--- | :--- | :--- |
| **Start Dev Server** | `npm run dev` | Starts Vite at http://localhost:5173 (or similar) |
| **Build for Prod** | `npm run build` | Runs `tsc` (typecheck) then builds to `dist/` |
| **Preview Build** | `npm run preview` | Previews the production build locally |
| **Lint Code** | `npm run lint` | Runs ESLint |
| **Lint Design** | `npm run lint:design` | Checks for unauthorized inline styles/classes |

---

## 3. Directory Structure

*   **`src/components/ui/`**: **Standard shadcn primitives.** Modify these sparingly.
*   **`src/components/sections/`**: Page sections (Hero, Footer, etc.).
*   **`src/components/brand/`**: Brand-specific components (GridPattern, etc.).
*   **`src/design-system/tokens.ts`**: **SINGLE SOURCE OF TRUTH** for design values (colors, spacing).
*   **`src/lib/utils.ts`**: Utility functions (`cn`, etc.).
*   **`src/imports/`**: Asset imports (SVG paths, etc.).
*   **`public/`**: Static assets (images, wordmarks).

---

## 4. Development Conventions (CRITICAL)

### Design & Styling
*   **Shadcn-First:** Use primitives from `src/components/ui/` (Card, Button, Input) for all UI building blocks.
*   **No Arbitrary Values:** ❌ `w-[500px]`, `bg-[#123456]` | ✅ `w-full max-w-lg`, `bg-primary`.
*   **Colors:** Use semantic tokens only: `bg-background`, `text-foreground`, `border-border`, `bg-accent`.
*   **Icons:** Use **Phosphor Icons** only. Do NOT use Lucide.

### Component Patterns
*   **BrandButton:** Use `BrandButton` (`src/components/ui/brand-button.tsx`) for **ALL** CTAs. It handles the specific hover animations.
    *   Primary: `variant="brand"`
    *   Secondary: `variant="brandOutline"`
*   **Section Padding:** STRICTLY enforce this responsive pattern for all sections:
    *   `py-24 lg:py-32` (Vertical spacing)
    *   `px-5 sm:px-6 lg:px-8` (Horizontal spacing)
*   **Container:** `mx-auto max-w-7xl`.
*   **Grid:** Use the `Grid` primitive or standard Tailwind grid classes that respect breakpoints.

### Responsiveness (Mobile First)
*   **Navigation:** Mobile menu must be accessible and functional.
*   **Typography:** Scale headings using breakpoints (e.g., `text-4xl sm:text-5xl lg:text-6xl`).
*   **Overflow:** Prevent horizontal overflow on mobile (375px min-width).

### Accessibility
*   **Interactive Elements:** Must have focus states (`focus-visible:ring-2`).
*   **Images:** Must have descriptive `alt` text.

---

## 5. Workflow Instructions

1.  **Analyze First:** Read `CLAUDE.md` and `DESIGN_RULES.md` if unsure about a pattern.
2.  **Check Tokens:** Before changing a color or spacing, check `src/design-system/tokens.ts`.
3.  **Use Primitives:** Do not create a new button/card component if a shadcn primitive exists.
4.  **Verify:** Run `npm run lint:design` after styling changes to catch non-standard usage.
