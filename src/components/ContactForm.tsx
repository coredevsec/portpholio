import { useState } from "react";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

const emailjsServiceId = import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined;
const emailjsTemplateId = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined;
const emailjsPublicKey = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please enter your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please write at least 10 characters" })
    .max(2000, { message: "Message must be under 2000 characters" }),
});

type Fields = z.infer<typeof contactSchema>;
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", message: "" };

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground/70";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Fields) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSent(false);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
      toast.error("Email service is not configured yet.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
        },
        {
          publicKey: emailjsPublicKey,
        },
      );

      setValues(empty);
      setErrors({});
      setSent(true);
      toast.success("Thanks · your message has been sent.");
    } catch (error) {
      console.error("EmailJS send failed", error);
      toast.error(
        "EmailJS rejected the message. Check your EmailJS service/template IDs and the template variables: {{name}}, {{email}}, {{message}}.",
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="layer-3d max-w-xl space-y-4">
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          value={values.name}
          onChange={(e) => update("name")(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={fieldClass}
          placeholder="Your full name"
        />
        {errors.name ? (
          <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-destructive">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={255}
          value={values.email}
          onChange={(e) => update("email")(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={fieldClass}
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          maxLength={2000}
          value={values.message}
          onChange={(e) => update("message")(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${fieldClass} resize-y`}
          placeholder="Tell me about the role, project or opportunity."
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {values.message.trim().length}/2000 characters
        </p>
        {errors.message ? (
          <p id="contact-message-error" role="alert" className="mt-1 text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        <Send size={15} aria-hidden="true" />
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-muted-foreground">
        Your details are sent over an encrypted connection and stored privately · only I can read
        them.
      </p>
    </form>
  );
}
