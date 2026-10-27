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
    <section id="contact" className="home-contact scroll-mt-20">
      <div className="home-wrap">
        <div className="home-contact-layout">
          <div className="home-contact-intro">
            <p className="home-eyebrow" data-reveal="rule">
              {t.contact.kicker}
            </p>
            <h2 className="home-heading" data-reveal="line" data-reveal-delay="70">
              {t.contact.heading}
            </h2>
            <p data-reveal="rise" data-reveal-delay="130">
              {t.contact.description}
            </p>
            <a
              className="home-contact-email"
              href="mailto:rocket3devs@gmail.com"
              data-reveal="rule"
              data-reveal-delay="180"
            >
              <Mail aria-hidden="true" />
              <span>rocket3devs@gmail.com</span>
            </a>
            <div className="home-contact-location" data-reveal="rule" data-reveal-delay="230">
              <MapPin aria-hidden="true" />
              <span>{t.contact.location}</span>
            </div>
          </div>

          <form className="home-contact-form" onSubmit={handleSubmit} data-reveal="paper">
            <div className="home-form-field" data-reveal="field" data-reveal-delay="120">
              <label htmlFor="contact-name">{t.contact.name}</label>
              <input
                id="contact-name"
                required
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </div>
            <div className="home-form-field" data-reveal="field" data-reveal-delay="180">
              <label htmlFor="contact-email">{t.contact.email}</label>
              <input
                id="contact-email"
                required
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>
            <div className="home-form-field" data-reveal="field" data-reveal-delay="240">
              <label htmlFor="contact-message">{t.contact.message}</label>
              <textarea
                id="contact-message"
                required
                name="message"
                rows={4}
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
              />
            </div>
            <button
              className="home-contact-submit"
              type="submit"
              disabled={formStatus === "submitting"}
              data-reveal="rise"
              data-reveal-delay="300"
            >
              <span>{t.contact.send}</span>
              <ArrowRight aria-hidden="true" />
            </button>
            {formStatus === "success" && (
              <p className="home-form-status is-success" role="status">
                {t.contact.successMessage}
              </p>
            )}
            {formStatus === "error" && (
              <p className="home-form-status is-error" role="alert">
                {t.contact.errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
