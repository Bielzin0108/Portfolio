import { TypeAnimation } from "react-type-animation";
import { Badge } from "@/components/ui/badge";

type TerminalWindowProps = {
  command: string;
  lines: string[];
};

export function TerminalWindow({ command, lines }: TerminalWindowProps) {
  const sequence = lines.flatMap((line) => [line, 1200]);

  return (
    <div className="terminal-shadow scan-line relative overflow-hidden rounded-lg bg-[#050607]/90 p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-lusa-red" />
          <span className="h-3 w-3 rounded-full bg-[#f5c84c]" />
          <span className="h-3 w-3 rounded-full bg-primary" />
        </div>
        <Badge tone="muted">terminal</Badge>
      </div>
      <p className="mb-4 break-words font-code text-xs text-primary sm:text-sm">{command}</p>
      <div className="min-h-24 font-code text-sm leading-7 text-ice sm:text-base">
        <span className="mr-2 text-lusa-red">&gt;</span>
        <TypeAnimation sequence={sequence} wrapper="span" speed={48} repeat={Infinity} />
        <span className="ml-1 inline-block h-5 w-2 translate-y-1 bg-primary animate-blink" />
      </div>
    </div>
  );
}
