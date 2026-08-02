import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";

import type { Translations } from "../../i18n";

type ContactProps = {
  t: Translations;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact({ t }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/rocket3devs@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: t.contact.subject,
          _template: "table",
          _honey: "",
        }),
      });

      if (!response.ok) {
        throw new Error(`FormSubmit responded with ${response.status}`);
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#e9eef0_0%,#dfe7e9_100%)]"
    >
      <div className="ambient-blob pointer-events-none absolute right-[5%] top-[11%] h-24 w-28 border border-[#7898aa]/18" />
      <div className="ambient-ring pointer-events-none absolute right-[14%] bottom-[16%] h-12 w-12 rounded-full border border-[#c97745]/15" />
      <div className="ambient-dot-reverse pointer-events-none absolute bottom-[10%] left-[6%] h-4 w-4 rounded-full bg-[#c97745]/25" />
      <div className="ambient-dot pointer-events-none absolute left-[14%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/44" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M1040 30 C 1210 120, 1170 260, 1340 350 S 1470 520, 1390 650"
          fill="none"
          stroke="#7898aa"
          strokeOpacity="0.14"
          strokeWidth="1.5"
          className="ambient-path-reverse"
        />
      </svg>
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div data-reveal className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="section-kicker">{t.contact.kicker}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.contact.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              {t.contact.description}
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-[#31526e]" />
                <span className="break-all">rocket3devs@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-[#31526e]" />
                <span>{t.contact.location}</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[#153351]/10 bg-[#f1f4f4] p-5 sm:p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                  {t.contact.name}
                </label>
                <input
                  id="contact-name"
                  required
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full min-h-12 rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:min-h-0 sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                  {t.contact.email}
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="w-full min-h-12 rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:min-h-0 sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                  {t.contact.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="w-full resize-none rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c97745] px-6 py-3.5 font-semibold text-[#0b2136] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {t.contact.send}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              {formStatus === "success" && (
                <p className="text-sm font-medium text-emerald-700">{t.contact.successMessage}</p>
              )}
              {formStatus === "error" && (
                <p className="text-sm font-medium text-red-700">{t.contact.errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
