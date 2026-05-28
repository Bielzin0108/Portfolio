import { useTranslation } from "react-i18next";
import { Github, Instagram, Linkedin, Music2 } from "lucide-react";
import { profile, socials } from "@/data/profile";
import type { SocialKey } from "@/types";

const icons: Record<SocialKey, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: Music2
};

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/65">
      <div className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-foreground">{profile.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("footer.phrase")}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("footer.made")}</p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((social) => {
            const Icon = icons[social.key];
            return (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring grid h-10 w-10 place-items-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                aria-label={social.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center font-mono text-xs text-muted-foreground">
        © {year} Gabriel Cavalcante Sobreira. All rights reserved.
      </div>
    </footer>
  );
}
