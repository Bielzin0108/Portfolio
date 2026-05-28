import { useTranslation } from "react-i18next";
import { Activity, ExternalLink, Globe2, GraduationCap, Layers3, Rocket } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { learningStack } from "@/data/portfolio";
import { profile } from "@/data/profile";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-shell">
      <Reveal>
        <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} description={t("about.description")} />
      </Reveal>
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <article className="glass-panel rounded-lg p-6 lg:p-8">
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Layers3 className="h-5 w-5" />
            </div>
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">{t("about.paragraph")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-md border border-border bg-background/45 p-4">
                <Rocket className="h-5 w-5 text-primary" />
                <p className="mt-3 font-mono text-sm font-semibold text-foreground">Frontend-first</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">React, Angular, UI systems</p>
              </div>
              <div className="rounded-md border border-border bg-background/45 p-4">
                <Activity className="h-5 w-5 text-lusa-red" />
                <p className="mt-3 font-mono text-sm font-semibold text-foreground">Performance</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">UX, SEO, clean delivery</p>
              </div>
              <div className="rounded-md border border-border bg-background/45 p-4">
                <Globe2 className="h-5 w-5 text-primary" />
                <p className="mt-3 font-mono text-sm font-semibold text-foreground">Fullstack</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">Java, APIs, cloud-native</p>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.12}>
          <aside className="grid gap-6">
            <div className="glass-panel rounded-lg p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-mono text-lg font-semibold text-foreground">{t("about.educationTitle")}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-foreground">{t("about.educationDegree")}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("about.educationInstitution")}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Badge tone="green">{t("about.educationStatus")}</Badge>
                    <Button asChild variant="outline" size="sm">
                      <a href={profile.education.diplomaPath} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        {t("actions.viewDiploma")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-mono text-lg font-semibold text-foreground">{t("about.learningTitle")}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {learningStack.map((item) => (
                  <Badge key={item} tone="green">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-lg p-6">
              <h3 className="font-mono text-lg font-semibold text-foreground">{t("about.languagesTitle")}</h3>
              <div className="mt-5 space-y-3">
                {profile.languages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-background/45 px-3 py-3 font-mono text-sm"
                  >
                    <span>{language}</span>
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
