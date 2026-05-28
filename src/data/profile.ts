import type { Locale, SocialLink } from "@/types";

export const profile = {
  name: "Gabriel Cavalcante Sobreira",
  professionalName: "Gabriel Cavalcante Sobreira",
  role: "Software Engineer | Fullstack",
  city: "São Paulo/SP",
  email: "gabrielcavalcante0108@gmail.com",
  whatsappUrl: "https://wa.me/5511934906444?text=Ol%C3%A1%20Gabriel%2C%20vim%20pelo%20seu%20portf%C3%B3lio.",
  cvPaths: {
    pt: "/GabrielCavalcante_CV_PTBR.pdf",
    en: "/GabrielCavalcante_CV_EN.pdf",
    es: "/GabrielCavalcante_CV_ES.pdf"
  } satisfies Record<Locale, string>,
  education: {
    degree: "Análise e Desenvolvimento de Sistemas",
    institution: "Centro Universitário SENAC",
    status: "Superior completo",
    diplomaPath: "/Diploma.pdf"
  },
  languages: ["Português (Nativo)", "Inglês (Intermediário)", "Espanhol (Básico)"]
} as const;

export const socials: SocialLink[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Bielzin0108"
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gabriel-cavalcante-sobreira-ba9538263"
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/dev__biel/"
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@dev__biel"
  }
];
