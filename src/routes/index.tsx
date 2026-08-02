import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";
import { translations, type Language } from "../i18n";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { Portfolio } from "../components/sections/Portfolio";
import { Services } from "../components/sections/Services";
import { handleSectionClick } from "../components/sections/scroll-to-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocket3Dev" },
      {
        name: "description",
        content:
          "Η Rocket3Dev είναι μια τριμελής ομάδα ανάπτυξης ιστοσελίδων στο Ηράκλειο Κρήτης, που δημιουργεί σύγχρονες ιστοσελίδες για επιχειρήσεις και επαγγελματίες.",
      },
      {
        property: "og:title",
        content: "Rocket3Dev",
      },
      {
        property: "og:description",
        content:
          "Σύγχρονες ιστοσελίδες από τη Rocket3Dev, μια τριμελή ομάδα ανάπτυξης ιστοσελίδων με έδρα το Ηράκλειο Κρήτης.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [language, setLanguage] = useState<Language>("el");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("rocket3dev-language");
    if (savedLanguage === "el" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = "el";
    }
  }, []);

  useRevealOnScroll(rootRef, {
    selector: "[data-reveal]",
    visibleClass: "is-visible",
    threshold: 0.14,
  });

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("rocket3dev-language", nextLanguage);
  }

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-clip bg-[#dfe7e9] text-[#0b2136]">
      <Header t={t} language={language} onChangeLanguage={changeLanguage} />
      <main>
        <Hero t={t} onSectionClick={handleSectionClick} />
        <About t={t} language={language} />
        <Services t={t} />
        <Portfolio t={t} language={language} />
        <Contact t={t} />
      </main>
      <Footer t={t} onSectionClick={handleSectionClick} />
    </div>
  );
}
