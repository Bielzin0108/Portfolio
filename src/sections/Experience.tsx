import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ExperienceTimeline } from "@/components/cards/ExperienceTimeline";

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow={t("experience.eyebrow")}
          title={t("experience.title")}
          description={t("experience.description")}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <ExperienceTimeline />
      </Reveal>
    </section>
  );
}
