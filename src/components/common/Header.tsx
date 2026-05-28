import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { navItems } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";
import { cn, scrollToHash } from "@/lib/utils";

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.href.replace("#", "")), []);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href: string) => {
    scrollToHash(href);
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        isScrolled ? "border-border/80 bg-background/78 shadow-panel backdrop-blur-xl" : "border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("#hero")}
          className="focus-ring flex min-w-0 items-center gap-3 rounded-md"
          aria-label="Gabriel Cavalcante Sobreira"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary/35 bg-primary/10 text-primary">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="hidden min-w-0 flex-col text-left sm:flex">
            <span className="truncate font-mono text-sm font-semibold text-foreground">Gabriel C. Sobreira</span>
            <span className="truncate font-mono text-xs text-muted-foreground">{profile.role}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <Button
                key={item.key}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.href)}
                className={cn(
                  "text-muted-foreground",
                  activeId === id && "bg-secondary text-foreground"
                )}
                aria-current={activeId === id ? "page" : undefined}
              >
                {t(`nav.${item.key}`)}
              </Button>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <Button type="button" variant="outline" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="red" size="sm">
            <a href="#contact" onClick={(event) => { event.preventDefault(); navigate("#contact"); }}>
              <Mail className="h-4 w-4" />
              {t("actions.contact")}
            </a>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label="Abrir menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        className={cn(
          "container grid transition-all duration-300 lg:hidden",
          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="glass-panel flex flex-col gap-2 rounded-lg p-3">
            {navItems.map((item) => (
              <Button
                key={item.key}
                type="button"
                variant="ghost"
                className="justify-start"
                onClick={() => navigate(item.href)}
              >
                {t(`nav.${item.key}`)}
              </Button>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <LanguageSwitcher />
              <Button type="button" variant="outline" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button type="button" variant="red" onClick={() => navigate("#contact")}>
                <Mail className="h-4 w-4" />
                {t("actions.contact")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
