import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Github, Instagram, Linkedin, Mail, MessageCircle, Music2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile, socials } from "@/data/profile";
import { sendContactEmail } from "@/services/email";
import type { ContactFormValues, SocialKey } from "@/types";

const icons: Record<SocialKey, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  tiktok: Music2
};

export function ContactForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactFormValues>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle");

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    try {
      await sendContactEmail(values);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof Error && error.message === "missing-emailjs-config") {
        const subject = encodeURIComponent(`Contato pelo portfólio - ${values.name}`);
        const body = encodeURIComponent(`${values.message}\n\nContato: ${values.email}`);
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setStatus("fallback");
        return;
      }

      setStatus("error");
    }
  };

  return (
    <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="glass-panel min-w-0 rounded-lg p-5 sm:p-6">
        <div className="grid h-12 w-12 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="break-anywhere mt-6 max-w-full font-mono text-base font-semibold leading-relaxed text-foreground sm:text-xl">
          {profile.email}
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{profile.city}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 min-[420px]:grid-cols-[minmax(0,1.6fr)_repeat(4,2.75rem)]">
          <Button
            asChild
            className="bg-[#25D366] text-white shadow-[0_18px_50px_rgba(37,211,102,0.24)] hover:bg-[#1ebe5d]"
          >
            <a href={profile.whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              {t("actions.whatsapp")}
            </a>
          </Button>
          {socials.map((social) => {
            const Icon = icons[social.key];
            return (
              <a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="focus-ring grid h-11 min-w-0 place-items-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                aria-label={social.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </aside>
      <form className="glass-panel rounded-lg p-6" onSubmit={submit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="font-mono text-sm text-foreground">
            {t("contact.name")}
            <Input
              required
              className="mt-2"
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              placeholder={t("contact.namePlaceholder")}
            />
          </label>
          <label className="font-mono text-sm text-foreground">
            {t("contact.email")}
            <Input
              required
              type="email"
              className="mt-2"
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              placeholder={t("contact.emailPlaceholder")}
            />
          </label>
        </div>
        <label className="mt-4 block font-mono text-sm text-foreground">
          {t("contact.message")}
          <Textarea
            required
            className="mt-2"
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            placeholder={t("contact.messagePlaceholder")}
          />
        </label>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-h-5 text-sm text-muted-foreground" role="status">
            {status === "success" ? t("contact.success") : null}
            {status === "fallback" ? t("contact.fallback") : null}
            {status === "error" ? t("contact.error") : null}
          </p>
          <Button type="submit" disabled={status === "sending"}>
            <Send className="h-4 w-4" />
            {status === "sending" ? t("actions.sending") : t("actions.send")}
          </Button>
        </div>
      </form>
    </div>
  );
}
