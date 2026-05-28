import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/translations/resources";

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("portfolio-language") ?? "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false
  },
  supportedLngs: ["pt", "en", "es"]
});

i18n.on("languageChanged", (language) => {
  localStorage.setItem("portfolio-language", language);
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
});

export default i18n;
