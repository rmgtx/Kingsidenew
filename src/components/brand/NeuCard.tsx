import * as React from "react";
import { cn } from "@/lib/utils";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  children: React.ReactNode;
}

export function NeuCard({
  variant = "default",
  className,
  children,
  ...props
}: NeuCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card",
        variant === "elevated" && "shadow-lg",
        variant === "default" && "shadow-lg hover:shadow-xl transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
