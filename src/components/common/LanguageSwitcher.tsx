import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

const languages: Locale[] = ["pt", "en", "es"];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-background/50 p-1">
      <Languages className="ml-2 h-4 w-4 text-muted-foreground" aria-hidden />
      {languages.map((language) => (
        <Button
          key={language}
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-2 uppercase",
            i18n.language === language && "bg-primary text-primary-foreground hover:bg-primary"
          )}
          onClick={() => i18n.changeLanguage(language)}
          aria-pressed={i18n.language === language}
        >
          {language}
        </Button>
      ))}
    </div>
  );
}
