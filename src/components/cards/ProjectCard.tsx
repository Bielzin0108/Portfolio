import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Github, Globe2, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 260, damping: 24 });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    rotateX.set(((y / rect.height) - 0.5) * -8);
    rotateY.set(((x / rect.width) - 0.5) * 8);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      style={{ transform }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="glass-panel group flex h-full flex-col overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border/80 bg-black">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-[1.035] sm:p-8 md:p-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        {project.deploy ? (
          <a
            href={project.deploy}
            target="_blank"
            rel="noreferrer"
            className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-black/45 text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            aria-label={`${project.name} site`}
          >
            <Globe2 className="h-4 w-4" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="absolute right-4 top-4 grid h-10 w-10 cursor-not-allowed place-items-center rounded-md border border-white/10 bg-black/35 text-white/35 backdrop-blur-md"
            aria-label={t("actions.siteUnavailable")}
          >
            <Globe2 className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4">
          {project.category ? <Badge tone="red">{project.category}</Badge> : null}
          <h3 className="mt-4 font-mono text-xl font-semibold text-foreground">{project.name}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(`projects.${project.key}`)}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} tone="muted">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          {project.github ? (
            <Button asChild size="sm" variant="outline">
              <a href={project.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                {t("actions.repository")}
              </a>
            </Button>
          ) : (
            <Button type="button" size="sm" variant="outline" disabled title={t("actions.repositoryUnavailable")}>
              <Github className="h-4 w-4" />
              {t("actions.repository")}
            </Button>
          )}
          {project.deploy ? (
            <Button asChild size="sm">
              <a href={project.deploy} target="_blank" rel="noreferrer">
                <Globe2 className="h-4 w-4" />
                {t("actions.site")}
              </a>
            </Button>
          ) : (
            <Button type="button" size="sm" disabled title={t("actions.siteUnavailable")}>
              <Globe2 className="h-4 w-4" />
              {t("actions.site")}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-[420px]:col-span-2"
            onClick={() => setExpanded((current) => !current)}
          >
            <Info className="h-4 w-4" />
            {expanded ? t("actions.close") : t("actions.details")}
          </Button>
        </div>
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 p-3 font-mono text-xs leading-6 text-muted-foreground">
            responsive-ui=true<br />
            repository={project.github ? "github" : "private"}<br />
            deployment={project.deploy ? "vercel" : "not-published"}<br />
            focus=performance + ux
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
