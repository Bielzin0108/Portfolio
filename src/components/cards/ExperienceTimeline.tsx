import { useTranslation } from "react-i18next";
import { BriefcaseBusiness } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/portfolio";

export function ExperienceTimeline() {
  const { t } = useTranslation();

  return (
    <div className="relative mx-auto mt-14 max-w-4xl">
      <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary via-lusa-red to-transparent sm:left-1/2" />
      <div className="space-y-8">
        {experiences.map((experience, index) => {
          const activities = t(`experience.${experience.key}Activities`, { returnObjects: true }) as string[];

          return (
            <article
              key={experience.key}
              className={`relative grid gap-6 pl-14 sm:grid-cols-[1fr_1fr] sm:pl-0 ${index % 2 === 0 ? "" : "sm:[&>div]:col-start-2"}`}
            >
              <span className="absolute left-1.5 top-2 grid h-8 w-8 place-items-center rounded-md border border-primary/30 bg-background text-primary shadow-premium-green sm:left-1/2 sm:-translate-x-1/2">
                <BriefcaseBusiness className="h-4 w-4" />
              </span>
              <div className="glass-panel min-w-0 rounded-lg p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <Badge tone={index === 0 ? "green" : "red"}>{experience.period}</Badge>
                  <span className="font-mono text-xs text-muted-foreground">{experience.company}</span>
                </div>
                <h3 className="font-mono text-lg font-semibold text-foreground">
                  {experience.role} <span className="text-muted-foreground">- {experience.company}</span>
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{t(`experience.${experience.key}`)}</p>

                <div className="mt-5 rounded-md border border-border bg-background/35 p-4">
                  <p className="font-mono text-xs font-semibold uppercase text-primary">
                    {t("experience.activitiesLabel")}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    {activities.map((activity) => (
                      <li key={activity} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {experience.technologies.length > 0 ? (
                  <div className="mt-5">
                    <p className="mb-3 font-mono text-xs font-semibold uppercase text-muted-foreground">
                      {t("experience.technologiesLabel")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} tone="muted">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
