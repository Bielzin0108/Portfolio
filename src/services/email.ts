import emailjs from "@emailjs/browser";
import type { ContactFormValues } from "@/types";

export async function sendContactEmail(values: ContactFormValues) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("missing-emailjs-config");
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: values.name,
      reply_to: values.email,
      message: values.message
    },
    {
      publicKey
    }
  );
}
