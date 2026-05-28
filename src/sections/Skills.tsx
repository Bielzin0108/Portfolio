import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SkillCluster } from "@/components/cards/SkillCluster";
import { skillCategories } from "@/data/portfolio";
import { staggerContainer } from "@/lib/motion";

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionHeading eyebrow={t("skills.eyebrow")} title={t("skills.title")} description={t("skills.description")} />
      </Reveal>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-5 md:grid-cols-2"
      >
        {skillCategories.map((category) => (
          <SkillCluster key={category.key} category={category} />
        ))}
      </motion.div>
    </section>
  );
}
