import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";
import { translations, type Language } from "../i18n";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/sections/Footer";
import { Header } from "../components/sections/Header";
import { Hero } from "../components/sections/Hero";
import { LaunchIntro } from "../components/sections/LaunchIntro";
import { Portfolio } from "../components/sections/Portfolio";
import { Services } from "../components/sections/Services";
import { handleSectionClick, setHomeScrollPaused } from "../components/sections/scroll-to-section";
import { SceneBoundary } from "../components/three/SceneBoundary";
import { RocketFallback } from "../components/three/RocketFallback";
import { useHomeScroll } from "../hooks/use-home-scroll";
import homeStyles from "../styles/home.css?url";
import sectionStyles from "../styles/home-sections.css?url";
import navigationStyles from "../styles/home-navigation.css?url";
import loadingStyles from "../styles/home-loader.css?url";
import portfolioStyles from "../styles/home-portfolio.css?url";
import drawingStyles from "../styles/home-drawing.css?url";

const HomeScene = lazy(() => import("../components/three/HomeScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocket3Dev" },
      { name: "theme-color", content: "#0b2136" },
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
    links: [
      { rel: "stylesheet", href: sectionStyles },
      { rel: "stylesheet", href: navigationStyles },
      { rel: "stylesheet", href: homeStyles },
      { rel: "stylesheet", href: loadingStyles },
      { rel: "stylesheet", href: portfolioStyles },
      { rel: "stylesheet", href: drawingStyles },
    ],
  }),
  component: Index,
});

function Index() {
  const [language, setLanguage] = useState<Language>("el");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [revealing, setRevealing] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const t = translations[language];
  const motionEnabled = !reducedMotion && !paused;
  const completeIntro = useCallback(() => {
    setLoading(false);
    window.requestAnimationFrame(() =>
      rootRef.current?.querySelector<HTMLElement>("#main-content")?.focus({ preventScroll: true }),
    );
  }, []);
  const revealHome = useCallback(() => setRevealing(true), []);
  const handleSceneFailure = useCallback(() => {
    rootRef.current?.removeAttribute("data-scene-ready");
    window.dispatchEvent(new Event("rocket3dev:scene-ready"));
  }, []);

  useHomeScroll();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = root?.querySelector<HTMLElement>(".home-rocket-stage");
    const flight = root?.querySelector<HTMLElement>(".home-rocket-flight");
    if (!root || !stage || !flight) return;
    const positionRocket = () => {
      const target = stage.getBoundingClientRect();
      const origin = root.getBoundingClientRect();
      Object.assign(flight.style, {
        left: `${target.left - origin.left}px`,
        top: `${target.top - origin.top}px`,
        width: `${target.width}px`,
        height: `${target.height}px`,
        visibility: "visible",
      });
    };
    positionRocket();
    const observer = new ResizeObserver(positionRocket);
    observer.observe(stage);
    const composition = root.querySelector(".home-hero-composition");
    if (composition) observer.observe(composition);
    window.addEventListener("resize", positionRocket);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", positionRocket);
    };
  }, [language]);

  useEffect(() => {
    if (!loading) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHomeScrollPaused(true);
    return () => {
      document.body.style.overflow = previousOverflow;
      setHomeScrollPaused(false);
    };
  }, [loading]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let savedLanguage: string | null = null;
    try {
      savedLanguage = window.localStorage.getItem("rocket3dev-language");
    } catch {
      /* Language persistence is optional. */
    }
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
    animated: true,
    disabled: !motionEnabled,
    ready: !loading,
    contentKey: language,
  });

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
    try {
      window.localStorage.setItem("rocket3dev-language", nextLanguage);
    } catch {
      /* Keep language switching available when storage is disabled. */
    }
  }

  return (
    <div
      ref={rootRef}
      className={`rocket-home${motionEnabled ? "" : " motion-paused"}`}
      data-loading={loading}
      data-revealing={revealing}
    >
      <a href="#main-content" className="home-skip-link">
        {language === "el" ? "Μετάβαση στο περιεχόμενο" : "Skip to content"}
      </a>
      {loading && (
        <LaunchIntro language={language} onReveal={revealHome} onComplete={completeIntro} />
      )}
      <div className="home-page-content" inert={loading}>
        <Header t={t} language={language} onChangeLanguage={changeLanguage} />
        <main id="main-content" tabIndex={-1}>
          <Hero
            t={t}
            onSectionClick={handleSectionClick}
            motionEnabled={motionEnabled}
            onToggleMotion={() => setPaused((value) => !value)}
          />
          <Portfolio t={t} />
          <Services t={t} />
          <About t={t} language={language} />
          <Contact t={t} />
        </main>
        <Footer t={t} onSectionClick={handleSectionClick} />
      </div>
      <div className="home-rocket-flight" data-three-anchor="rocket" aria-hidden="true">
        <RocketFallback />
      </div>
      <ClientOnly>
        <SceneBoundary onFailure={handleSceneFailure}>
          <Suspense fallback={null}>
            <HomeScene rootRef={rootRef} motion={motionEnabled && !loading} />
          </Suspense>
        </SceneBoundary>
      </ClientOnly>
    </div>
  );
}
