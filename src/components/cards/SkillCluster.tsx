import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { SkillCategory } from "@/types";

export function SkillCluster({ category }: { category: SkillCategory }) {
  const { t } = useTranslation();

  return (
    <motion.article
      className="glass-panel group rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/35"
      whileHover={{ rotateX: 2, rotateY: -2 }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-mono text-lg font-semibold text-foreground">{t(`skills.${category.key}`)}</h3>
        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(45,242,140,0.85)]" />
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Badge key={skill} tone={category.accent}>
            {skill}
          </Badge>
        ))}
      </div>
    </motion.article>
  );
}
