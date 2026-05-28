import { SEO } from "@/components/common/SEO";
import { MainLayout } from "@/components/layouts/MainLayout";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Experience } from "@/sections/Experience";
import { GithubSection } from "@/sections/GithubSection";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";

export default function Home() {
  return (
    <MainLayout>
      <SEO />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GithubSection />
      <Contact />
    </MainLayout>
  );
}
