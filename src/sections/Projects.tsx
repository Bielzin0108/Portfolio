import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { projects } from "@/data/portfolio";
import { staggerContainer } from "@/lib/motion";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
        />
      </Reveal>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
