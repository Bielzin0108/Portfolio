import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Github, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { fetchGitHubDashboard, type GitHubDashboardData } from "@/services/github";

const fallbackActivityCells = Array.from({ length: 84 }, () => 0);

export function GithubDashboard() {
  const { i18n, t } = useTranslation();
  const [data, setData] = useState<GitHubDashboardData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let isMounted = true;

    fetchGitHubDashboard("Bielzin0108")
      .then((dashboard) => {
        if (!isMounted) return;
        setData(dashboard);
        setStatus("ready");
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activityCells = data?.activityCells ?? fallbackActivityCells;
  const languages = data?.languages ?? [];
  const lastPushLabel = data?.lastPushAt ? getRelativeDateLabel(data.lastPushAt, i18n.language) : "--";

  return (
    <div className="glass-panel mx-auto mt-14 grid max-w-5xl gap-6 rounded-lg p-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {data?.avatarUrl ? (
              <img
                src={data.avatarUrl}
                alt={data.username}
                className="h-10 w-10 shrink-0 rounded-md border border-border object-cover"
                loading="lazy"
              />
            ) : (
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-secondary/60">
                <Github className="h-5 w-5" />
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate font-mono text-sm font-semibold text-foreground">{data?.username ?? "Bielzin0108"}</p>
              <p className="break-anywhere text-xs text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Badge tone={status === "error" ? "red" : "green"}>
            {status === "loading" ? t("github.loading") : status === "error" ? t("github.unavailable") : t("github.live")}
          </Badge>
        </div>

        <div className="grid grid-cols-12 gap-1">
          {activityCells.map((intensity, index) => (
            <span
              key={index}
              className="aspect-square rounded-sm border border-white/5"
              style={{
                backgroundColor:
                  intensity === 0 ? "rgba(154, 164, 178, 0.12)" : `rgba(45, 242, 140, ${intensity})`
              }}
              aria-hidden
            />
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">{data?.stars ?? "--"}</p>
            <p className="text-sm text-muted-foreground">{t("github.stars")}</p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">{data?.publicRepos ?? "--"}</p>
            <p className="text-sm text-muted-foreground">{t("github.repositories")}</p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-4">
            <p className="font-mono text-2xl font-bold text-foreground">{lastPushLabel}</p>
            <p className="text-sm text-muted-foreground">{t("github.lastUpdate")}</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border bg-background/45 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-mono text-lg font-semibold text-foreground">{t("github.languages")}</h3>
          {status === "loading" ? <RefreshCw className="h-4 w-4 animate-spin text-primary" /> : null}
        </div>

        <div className="mt-6 space-y-4">
          {languages.length > 0 ? (
            languages.map((stat) => (
              <div key={stat.label}>
                <div className="mb-2 flex items-center justify-between gap-2 font-mono text-xs">
                  <span>{stat.label}</span>
                  <span className="text-muted-foreground">{stat.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-4">
              {[72, 54, 38, 22].map((width) => (
                <div key={width}>
                  <div className="mb-2 h-3 w-28 rounded bg-secondary" />
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-muted" style={{ width: `${width}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {data ? (
            <div className="rounded-md border border-border bg-background/35 p-3 font-mono text-xs text-muted-foreground">
              forks={data.forks}<br />
              source=github-public-rest-api<br />
              activity=repository-push-events
            </div>
          ) : null}

          {status === "error" ? <p className="text-sm leading-6 text-muted-foreground">{t("github.error")}</p> : null}
        </div>
      </div>
    </div>
  );
}

function getRelativeDateLabel(dateValue: string, language: string) {
  const diffDays = Math.round((new Date(dateValue).getTime() - Date.now()) / 86_400_000);
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });

  if (Math.abs(diffDays) < 1) return formatter.format(0, "day");
  if (Math.abs(diffDays) < 30) return formatter.format(diffDays, "day");

  return formatter.format(Math.round(diffDays / 30), "month");
}
