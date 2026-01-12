import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight design guardrails (shadcn-first).
 *
 * Policy:
 * - No lucide-react imports (Phosphor only).
 * - No hex colors in component source.
 * - No Tailwind arbitrary values in app components (allow in shadcn ui/*).
 * - No inline styles for visual styling (allow motion transform-only styles).
 */

const repoRoot = process.cwd();

const IGNORE_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
]);

// We allow upstream shadcn patterns in ui primitives.
const ALLOW_ARBITRARY_IN_DIRS = [
  path.join(repoRoot, "src", "components", "ui"),
];

// Inline styles are allowed only for motion transforms (and only in these files).
// GridPattern uses CSS variables for 60fps performance optimizations.
const ALLOW_STYLE_FILES = new Set([
  path.join(repoRoot, "src", "components", "brand", "GridPattern.tsx"),
]);

const SOURCE_ROOTS = [
  path.join(repoRoot, "src"),
];

function isInAllowedDir(filePath, allowedDirs) {
  return allowedDirs.some((dir) => filePath.startsWith(dir + path.sep) || filePath === dir);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function isSourceFile(p) {
  return /\.(ts|tsx|js|jsx)$/.test(p);
}

function lintFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const rel = path.relative(repoRoot, filePath);

  const errors = [];

  // 1) Icon library enforcement
  if (/\bfrom\s+["']lucide-react["']/.test(text) || /\blucide-react\b/.test(text)) {
    errors.push("Disallowed icon import: use @phosphor-icons/react (no lucide-react).");
  }

  // 2) Hardcoded colors in components (hex)
  // Allow hex colors in css files (not included here), but never in component source.
  if (/#(?:[0-9a-fA-F]{3}){1,2}\b/.test(text)) {
    errors.push("Hardcoded hex color found. Use semantic tokens (bg-*, text-*, border-*).");
  }

  // 3) Tailwind arbitrary values in className (e.g. w-[300px])
  if (!isInAllowedDir(filePath, ALLOW_ARBITRARY_IN_DIRS)) {
    // We only flag arbitrary *values* that include numeric units (e.g. w-[300px], leading-[1.1], min-h-[400px]).
    // We do NOT flag attribute/selector variants like data-[state=active]:... (these are standard shadcn patterns).
    if (/\bclassName\s*=\s*["'][^"']*\[[^"'\]]*\d[^"'\]]*\][^"']*["']/.test(text)) {
      errors.push("Tailwind arbitrary numeric value found in className. Use the Tailwind scale.");
    }
  }

  // 4) Inline styles (only allow motion transform-only usage in allowlist)
  if (/\bstyle\s*=\s*\{\{/.test(text) && !ALLOW_STYLE_FILES.has(filePath)) {
    // Allow only transform-only (and optional CSS variable) inline styles.
    // IMPORTANT: We must validate the style *object body* only, not the entire file.
    const styleMatches = [...text.matchAll(/\bstyle\s*=\s*\{\{([\s\S]*?)\}\}/g)];

    const disallowedPropRe = /\b(background|color|border|boxShadow|filter|opacity)\b/;
    let hasDisallowedStyle = false;

    for (const m of styleMatches) {
      const styleBodyRaw = m[1] ?? "";
      const styleBody = styleBodyRaw.replace(/\/\*[\s\S]*?\*\//g, "");

      if (disallowedPropRe.test(styleBody)) {
        hasDisallowedStyle = true;
        break;
      }

      // Strip allowed entries:
      // - transform (shorthand or key/value)
      // - clipPath (for motion radial fill effects)
      // - CSS variable assignments (e.g. "--x": ..., --x: ...)
      const stripped = styleBody
        .replace(/\btransform\b\s*(?::[^,}]+)?/g, "")
        .replace(/\bclipPath\b\s*(?::[^,}]+)?/g, "")
        .replace(/["']--[a-zA-Z0-9_-]+["']\s*:\s*[^,}]+/g, "")
        .replace(/\b--[a-zA-Z0-9_-]+\b\s*:\s*[^,}]+/g, "")
        .replace(/[,{}\s]/g, "");

      // If anything identifier-like remains, it's not transform-only.
      if (/[a-zA-Z_$]/.test(stripped)) {
        hasDisallowedStyle = true;
        break;
      }
    }

    if (hasDisallowedStyle) {
      errors.push("Inline styles found. Prefer tokens/classes; allow only transform-only motion styles.");
    }
  }

  return errors.map((e) => `- ${rel}: ${e}`);
}

function main() {
  const allFiles = SOURCE_ROOTS.flatMap((root) => walk(root)).filter(isSourceFile);
  const violations = [];
  for (const f of allFiles) {
    violations.push(...lintFile(f));
  }

  if (violations.length) {
    console.error("design-lint failed:\n" + violations.join("\n"));
    process.exit(1);
  }

  console.log("design-lint passed.");
}

main();

