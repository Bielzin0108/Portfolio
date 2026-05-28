import { motion } from "framer-motion";

export function LoadingScreen({ persistent = false }: { persistent?: boolean }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: persistent ? 0.2 : 0.45, ease: "easeOut" }}
    >
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-md border border-primary/30" />
        <motion.div
          className="absolute inset-4 rounded-md border border-lusa-red/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          animate={{ scale: [1, 1.9, 1], opacity: [1, 0.45, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
