import { useTranslation } from "react-i18next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          description={t("contact.description")}
        />
      </Reveal>
      <Reveal delay={0.1}>
        <ContactForm />
      </Reveal>
    </section>
  );
}
