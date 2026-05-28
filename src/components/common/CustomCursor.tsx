import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 420, damping: 34 });
  const springY = useSpring(mouseY, { stiffness: 420, damping: 34 });

  useEffect(() => {
    const canUseCursor = window.matchMedia("(pointer: fine)").matches;
    setEnabled(canUseCursor);

    if (!canUseCursor) return;

    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX - 16);
      mouseY.set(event.clientY - 16);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 rounded-full border border-primary/50 mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
}
