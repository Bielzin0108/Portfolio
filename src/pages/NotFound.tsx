import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="grid min-h-screen place-items-center bg-background px-4 text-center">
      <div className="max-w-md">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">{t("notFound.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("notFound.description")}</p>
        <Button asChild className="mt-8">
          <Link to="/">{t("actions.backHome")}</Link>
        </Button>
      </div>
    </main>
  );
}
