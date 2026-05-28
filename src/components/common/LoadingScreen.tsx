import { motion } from "framer-motion";

export function LoadingScreen({ persistent = false }: { persistent?: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: persistent ? 0.2 : 0.45, ease: "easeOut" }}
    >
      <div className="absolute inset-0 cyber-grid opacity-50" aria-hidden />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative w-full max-w-sm">
        <div className="glass-panel overflow-hidden rounded-lg p-5">
          <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-lusa-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5c84c]" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </div>
            <span className="font-mono text-[11px] uppercase text-muted-foreground">boot</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <motion.span
                className="absolute inset-0 rounded-md border border-primary/20"
                animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-xl font-bold tracking-normal">GC</span>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-sm font-semibold text-foreground">Gabriel Cavalcante</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">loading portfolio interface</p>
            </div>
          </div>

          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-ice to-lusa-red"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>react</span>
            <span>typescript</span>
            <span>motion</span>
          </div>
        </div>

        <motion.div
          className="absolute -bottom-1 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
