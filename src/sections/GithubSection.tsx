import { useTranslation } from "react-i18next";
import { GithubDashboard } from "@/components/cards/GithubDashboard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

export function GithubSection() {
  const { t } = useTranslation();

  return (
    <section id="github" className="section-shell">
      <Reveal>
        <SectionHeading eyebrow={t("github.eyebrow")} title={t("github.title")} description={t("github.description")} />
      </Reveal>
      <Reveal delay={0.1}>
        <GithubDashboard />
      </Reveal>
    </section>
  );
}
