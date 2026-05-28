import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export function SEO() {
  const { t, i18n } = useTranslation();

  return (
    <Helmet htmlAttributes={{ lang: i18n.language === "pt" ? "pt-BR" : i18n.language }}>
      <title>{t("seo.title")}</title>
      <meta name="description" content={t("seo.description")} />
      <meta property="og:title" content={t("seo.title")} />
      <meta property="og:description" content={t("seo.description")} />
      <meta name="twitter:title" content={t("seo.title")} />
      <meta name="twitter:description" content={t("seo.description")} />
      <link rel="canonical" href="https://gabriel-cavalcante-portfolio.vercel.app/" />
    </Helmet>
  );
}
