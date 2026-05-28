import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { BackgroundEffects } from "@/components/common/BackgroundEffects";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";

export function MainLayout({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>{loading ? <LoadingScreen /> : null}</AnimatePresence>
      <BackgroundEffects />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
