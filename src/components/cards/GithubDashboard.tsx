import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { githubStats } from "@/data/portfolio";
import { profile } from "@/data/profile";

const contributionCells = Array.from({ length: 84 }, (_, index) => {
  const intensity = [0.12, 0.28, 0.52, 0.82][(index * 7 + 3) % 4];
  return intensity;
});

export function GithubDashboard() {
  const { t } = useTranslation();

  return (
    <div className="glass-panel mx-auto mt-14 grid max-w-5xl gap-6 rounded-lg p-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-border bg-secondary/60">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">Bielzin0108</p>
              <p className="text-xs text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Badge tone="green">mock/api-ready</Badge>
        </div>
        <div className="grid grid-cols-12 gap-1">
          {contributionCells.map((intensity, index) => (
            <span
              key={index}
              className="aspect-square rounded-sm border border-white/5"
              style={{ backgroundColor: `rgba(45, 242, 140, ${intensity})` }}
              aria-hidden
            />
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">120+</p>
            <p className="text-sm text-muted-foreground">{t("github.contributions")}</p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">18</p>
            <p className="text-sm text-muted-foreground">{t("github.repositories")}</p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">14d</p>
            <p className="text-sm text-muted-foreground">{t("github.streak")}</p>
          </div>
        </div>
      </div>
      <div className="rounded-md border border-border bg-background/45 p-5">
        <h3 className="font-mono text-lg font-semibold text-foreground">{t("github.languages")}</h3>
        <div className="mt-6 space-y-4">
          {githubStats.map((stat) => (
            <div key={stat.label}>
              <div className="mb-2 flex items-center justify-between gap-2 font-mono text-xs">
                <span>{stat.label}</span>
                <span className="text-muted-foreground">{stat.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${stat.value}%`, backgroundColor: stat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
