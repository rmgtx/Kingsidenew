import React, { useRef } from 'react';

/**
 * GridPattern Component
 * A high-performance, interactive grid background.
 * - Uses a single SVG element
 * - Updates via CSS variables for 60fps animations
 * - Zero React re-renders on mouse move
 * - Mouse handling is done at the parent level (Hero.tsx)
 */
interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
}

export function GridPattern({
  width = 30,
  height = 30,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  ...props
}: GridPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden bg-background ${className}`}
    >
      <svg
        {...props}
        className="absolute inset-0 h-full w-full stroke-muted-foreground/50"
        style={{
          maskImage: 'radial-gradient(100% 100% at top right, white, transparent)',
          WebkitMaskImage: 'radial-gradient(100% 100% at top right, white, transparent)',
        }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={width}
            height={height}
            x={x}
            y={y}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        
        {/* Active Square Highlight (Dynamic) */}
        {/* We place this before the lines so the lines are drawn ON TOP of the filled square */}
        <rect
          width={width - 1}
          height={height - 1}
          x={x + 1}
          y={y + 1}
          className="fill-muted/80 opacity-0 transition-opacity duration-100"
          style={{
            // Use CSS variables for instant updates without React re-renders
            transform: `translate(var(--grid-x, 0px), var(--grid-y, 0px))`,
          }}
        />

        {/* Base Grid Layer (Static) */}
        <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid-pattern)" />

        {/* Hover Highlight Layer (Dynamic - Radial Spotlight) */}
        <svg x={x} y={y} className="overflow-visible">
          <rect
            strokeWidth={0}
            width="100%"
            height="100%"
            fill="url(#grid-pattern)"
            className="stroke-foreground opacity-0 transition-opacity duration-200"
            style={{
              maskImage: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`,
              WebkitMaskImage: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), black, transparent)`,
            }}
          />
        </svg>
      </svg>
      
      {/* Optional: Add a subtle gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
