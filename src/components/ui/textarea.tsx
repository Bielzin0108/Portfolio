import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "focus-ring min-h-36 w-full resize-none rounded-md border border-input bg-background/70 px-3 py-3 font-mono text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
