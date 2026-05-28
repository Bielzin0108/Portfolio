export type Locale = "pt" | "en" | "es";

export type Theme = "dark" | "light";

export type SocialKey = "github" | "linkedin" | "instagram" | "tiktok";

export type SocialLink = {
  key: SocialKey;
  label: string;
  href: string;
};

export type SkillCategory = {
  key: string;
  accent: "green" | "red" | "ice";
  skills: string[];
};

export type Experience = {
  key: string;
  company: string;
  role: string;
  period: string;
  technologies: string[];
};

export type Project = {
  key: string;
  name: string;
  category?: string;
  deploy?: string;
  github?: string;
  image: string;
  technologies: string[];
};

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};
