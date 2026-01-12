import * as React from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

const SPRING = { mass: 0.9, stiffness: 420, damping: 40 }
const FILL_SPRING = { mass: 0.8, stiffness: 260, damping: 26 }

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  /** Icon to display after the text */
  rightIcon?: React.ReactNode
  /** Disable all motion effects */
  disableMotion?: boolean
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

export type BrandButtonProps = ButtonAsButton | ButtonAsAnchor

/**
 * BrandButton (shadcn-first)
 * - Uses shadcn buttonVariants for baseline sizing/variants/focus/disabled.
 * - Adds: radial fill on hover (accent), cursor-follow parallax, sheen, micro-press.
 * - Works as <button> or <a href>.
 */
export const BrandButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BrandButtonProps
>((props, ref) => {
  const {
    className,
    variant = "brand",
    size = "default",
    rightIcon,
    disableMotion = false,
    children,
    disabled,
    ...rest
  } = props

  const reduceMotion = useReducedMotion()
  const motionEnabled = !disableMotion && !reduceMotion && !disabled

  // Cursor-follow parallax (very subtle ±2px)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, SPRING)
  const ySpring = useSpring(y, SPRING)
  const transform = useMotionTemplate`translate3d(${xSpring}px, ${ySpring}px, 0)`

  // Radial fill (liquid accent hover effect)
  const fillX = useMotionValue(0)
  const fillY = useMotionValue(0)
  const fillR = useMotionValue(0)
  const fillRSpring = useSpring(fillR, FILL_SPRING)
  const fillClipPath = useMotionTemplate`circle(${fillRSpring}px at ${fillX}px ${fillY}px)`

  const handleEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled) return
    if (e.pointerType === "touch") return

    const el = e.currentTarget
    const r = el.getBoundingClientRect()

    // Start fill from center on initial hover (prevents "jump")
    fillX.set(r.width / 2)
    fillY.set(r.height / 2)

    // Expand to a radius that covers the entire button
    const radius = Math.hypot(r.width, r.height) / 2 + 24
    fillR.set(radius)
  }

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!motionEnabled) return
    if (e.pointerType === "touch") return

    const el = e.currentTarget
    const r = el.getBoundingClientRect()

    // Parallax (normalized -0.5..0.5 → ±2px)
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    x.set(px * 2)
    y.set(py * 2)

    // Track fill origin to cursor position
    const localX = e.clientX - r.left
    const localY = e.clientY - r.top
    fillX.set(localX)
    fillY.set(localY)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
    fillR.set(0)
  }

  // Determine the element type
  const isLink = "href" in rest && rest.href !== undefined

  // Build the inner content
  const innerContent = (
    <>
      {/* Radial fill layer (accent) — liquid hover effect */}
      <motion.span
        aria-hidden="true"
        style={{ clipPath: fillClipPath }}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-md",
          "bg-accent",
          "opacity-0 group-hover:opacity-100",
          "will-change-[clip-path]"
        )}
      />

      {/* Soft sheen sweep on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-md",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}
      >
        <span
          className={cn(
            "absolute -left-1/2 top-0 h-full w-[200%]",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "translate-x-[-40%]",
            "transition-transform duration-500 ease-out",
            "group-hover:translate-x-[40%]"
          )}
        />
      </span>

      {/* Thin highlight ring on hover for depth */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-md",
          "ring-1 ring-inset ring-white/10",
          "mix-blend-overlay",
          "opacity-0 transition-opacity duration-200",
          "group-hover:opacity-100"
        )}
      />

      {/* Text content (z-10 so it's above fill layers) */}
      <span className="relative z-10 inline-flex items-center gap-2">
        <span
          className={cn(
            "transition-transform duration-200",
            "group-hover:-translate-y-0.5",
            "group-active:translate-y-0"
          )}
        >
          {children}
        </span>
        {rightIcon ? (
          <span
            className={cn(
              "inline-flex items-center",
              "transition-transform duration-200",
              "group-hover:translate-x-0.5",
              "group-active:translate-x-0"
            )}
          >
            {rightIcon}
          </span>
        ) : null}
      </span>
    </>
  )

  const sharedClassName = cn(
    buttonVariants({ variant, size }),
    "relative overflow-hidden",
    disabled && "pointer-events-none opacity-50",
    className
  )

  return (
    <motion.div
      className="group inline-flex"
      style={motionEnabled ? { transform } : undefined}
      onPointerEnter={handleEnter}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      onPointerCancel={reset}
      whileTap={motionEnabled ? { scale: 0.985 } : undefined}
    >
      {isLink ? (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={sharedClassName}
          aria-disabled={disabled}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </a>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={sharedClassName}
          disabled={disabled}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  )
})

BrandButton.displayName = "BrandButton"
