import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Download, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { TerminalWindow } from "@/components/common/TerminalWindow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { metrics } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  const { t, i18n } = useTranslation();
  const roles = t("hero.animatedRoles", { returnObjects: true }) as string[];
  const terminalLines = t("hero.terminal.lines", { returnObjects: true }) as string[];
  const roleSequence = roles.flatMap((role) => [role, 1400]);
  const currentLanguage = i18n.language.startsWith("en") ? "en" : i18n.language.startsWith("es") ? "es" : "pt";
  const cvPath = profile.cvPaths[currentLanguage];

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="container grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Badge tone="green">{t("hero.eyebrow")}</Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="balanced mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {t("hero.titlePrefix")} <span className="text-gradient-tech">{profile.name}</span>
          </motion.h1>
          <motion.div
            variants={fadeInUp}
            className="mt-5 min-h-10 font-mono text-xl font-semibold text-primary sm:text-2xl"
          >
            <TypeAnimation sequence={roleSequence} wrapper="span" speed={45} repeat={Infinity} />
          </motion.div>
          <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {t("hero.description")}
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/45 px-3 py-2 font-mono">
              <MapPin className="h-4 w-4 text-lusa-red" />
              {profile.city}
            </span>
            <span className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-2 font-mono text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              {t("hero.status")}
            </span>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#projects">
                <ArrowDown className="h-4 w-4" />
                {t("actions.viewProjects")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={cvPath} download={`Gabriel-Cavalcante-Sobreira-CV-${currentLanguage.toUpperCase()}.pdf`}>
                <Download className="h-4 w-4" />
                {t("actions.downloadCv")}
              </a>
            </Button>
            <Button asChild variant="red" size="lg">
              <a href="#contact">
                <Send className="h-4 w-4" />
                {t("actions.contact")}
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <TerminalWindow command={t("hero.terminal.command")} lines={terminalLines} />
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.key} className="glass-panel rounded-lg p-4">
                <p className="font-mono text-xs uppercase text-muted-foreground">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{t(`metrics.${metric.key}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
