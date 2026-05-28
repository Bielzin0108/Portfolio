import type { Experience, Project, SkillCategory } from "@/types";

export const navItems = [
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" }
] as const;

export const metrics = [
  { key: "frontend", value: "Frontend", tone: "green" },
  { key: "stack", value: "Fullstack", tone: "red" },
  { key: "cloud", value: "Cloud-ready", tone: "ice" }
] as const;

export const skillCategories: SkillCategory[] = [
  {
    key: "frontend",
    accent: "green",
    skills: ["React", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"]
  },
  {
    key: "backend",
    accent: "red",
    skills: ["Java", "Spring Boot", "REST APIs"]
  },
  {
    key: "tools",
    accent: "ice",
    skills: ["Git", "GitHub", "Vercel", "VSCode", "Postman", "Figma", "Docker básico", "Kubernetes básico"]
  },
  {
    key: "soft",
    accent: "green",
    skills: ["Comunicação", "Trabalho em equipe", "Aprendizado rápido", "Organização", "Adaptabilidade"]
  }
];

export const experiences: Experience[] = [
  {
    key: "first",
    company: "F1RST Digital Services",
    role: "Engenheiro de Software | Fullstack",
    period: "2025 - Atual",
    technologies: ["React", "Angular", "TypeScript", "JavaScript", "Spring Boot", "Kubernetes"]
  },
  {
    key: "santander",
    company: "Santander Brasil",
    role: "Estagiário",
    period: "2023 - 2025",
    technologies: ["Java", "Spring Boot", "Angular", "JavaScript", "HTML", "CSS"]
  },
  {
    key: "santander-apprentice",
    company: "Santander Brasil",
    role: "Jovem Aprendiz",
    period: "2022 - 2023",
    technologies: []
  }
];

export const projects: Project[] = [
  {
    key: "bartie",
    name: "Bartie",
    category: "Confeitaria Gourmet",
    deploy: "https://bartie-gourmet.vercel.app/",
    github: "https://github.com/Bielzin0108/Barty-Gourmet",
    image: "/assets/projects/bartie.png",
    technologies: ["React", "Tailwind", "JavaScript"]
  },
  {
    key: "portuguesa",
    name: "Portuguesa Banespa",
    category: "Projeto pessoal",
    deploy: "https://portuguesa-v2.vercel.app/",
    github: "https://github.com/Bielzin0108/portuguesa-react",
    image: "/assets/projects/portuguesa.png",
    technologies: ["React", "CSS", "JavaScript"]
  },
  {
    key: "banespa",
    name: "Banespa Championship",
    category: "Projeto pessoal",
    deploy: "https://banespa.vercel.app/",
    github: "https://github.com/Bielzin0108/Banespa",
    image: "/assets/projects/banespa.png",
    technologies: ["React", "CSS", "JavaScript"]
  },
  {
    key: "pokedex",
    name: "Pokedex",
    category: "Projeto pessoal",
    deploy: "https://pokedex-dev-biel.vercel.app/",
    github: "https://github.com/Bielzin0108/Pokedex",
    image: "/assets/projects/pokebola.png",
    technologies: ["React", "JavaScript", "CSS", "PokeAPI"]
  },
  {
    key: "hamburgueria",
    name: "HamburgueRia",
    category: "Projeto acadêmico",
    github: "https://github.com/Bielzin0108/HamburgueRia",
    image: "/assets/projects/burguer.png",
    technologies: ["React", "JavaScript", "CSS"]
  },
  {
    key: "airplanning",
    name: "Air Planning",
    category: "Projeto acadêmico",
    github: "https://github.com/Bielzin0108/air-planning",
    image: "/assets/projects/air-planning.png",
    technologies: ["Java", "JSP", "Servlets", "Maven", "H2", "HTML", "CSS"]
  }
];

export const learningStack = ["System Design", "Micro frontends", "Cloud-native UX", "Testing strategy"] as const;
