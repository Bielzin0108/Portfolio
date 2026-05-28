import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-md border border-input bg-background/70 px-3 font-mono text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";
