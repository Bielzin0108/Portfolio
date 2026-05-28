import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "green" | "red" | "ice" | "muted";

const tones: Record<BadgeTone, string> = {
  green: "border-primary/30 bg-primary/10 text-primary",
  red: "border-lusa-red/35 bg-lusa-red/10 text-lusa-red",
  ice: "border-ice/20 bg-ice/10 text-foreground",
  muted: "border-border bg-secondary/60 text-muted-foreground"
};

export function Badge({
  className,
  tone = "muted",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
