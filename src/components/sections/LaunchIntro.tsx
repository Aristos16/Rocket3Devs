import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Language } from "../../i18n";
import { introRocketTransform } from "../three/scene-layout";

export function LaunchIntro({
  language,
  onReveal,
  onComplete,
}: {
  language: Language;
  onReveal: () => void;
  onComplete: () => void;
}) {
  const [leaving, setLeaving] = useState(false);
  const exitStarted = useRef(false);
  const skipRef = useRef<HTMLButtonElement>(null);
  const flightRef = useRef<Animation | null>(null);
  const finish = useCallback(() => {
    if (exitStarted.current) return;
    exitStarted.current = true;
    const rocket = document.querySelector<HTMLElement>(".home-rocket-flight");
    onReveal();
    setLeaving(true);
    if (!rocket) {
      onComplete();
      return;
    }
    // The same canvas and camera fly into place; there is no model swap at docking.
    const flight = rocket.animate(
      [
        { transform: getComputedStyle(rocket).transform },
        { transform: "translate3d(0, 0, 0) rotate(0deg) scale(1)" },
      ],
      { duration: 1250, easing: "cubic-bezier(0.77, 0, 0.175, 1)", fill: "both" },
    );
    flightRef.current = flight;
    flight.onfinish = () => {
      rocket.style.transform = "none";
      flight.cancel();
      flightRef.current = null;
      onComplete();
    };
  }, [onReveal, onComplete]);

  useEffect(() => {
    if (!leaving) return;
    // Also release the page if hot reload or a browser interruption cancels the flight.
    const timeout = window.setTimeout(() => {
      const flight = flightRef.current;
      if (flight && flight.playState !== "idle") flight.finish();
      else onComplete();
    }, 1450);
    return () => window.clearTimeout(timeout);
  }, [leaving, onComplete]);

  useLayoutEffect(() => {
    const rocket = document.querySelector<HTMLElement>(".home-rocket-flight");
    const target = document.querySelector(".home-rocket-stage");
    if (!rocket || !target) return;
    const positionRocket = () => {
      if (exitStarted.current) {
        flightRef.current?.finish();
        return;
      }
      rocket.style.transform = introRocketTransform(
        target.getBoundingClientRect(),
        window.innerWidth,
        window.innerHeight,
      );
    };
    positionRocket();
    const observer = new ResizeObserver(positionRocket);
    observer.observe(target);
    const composition = document.querySelector(".home-hero-composition");
    if (composition) observer.observe(composition);
    window.addEventListener("resize", positionRocket);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", positionRocket);
      rocket.style.transform = "none";
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handlePreference = () => {
      if (preference.matches) {
        onReveal();
        onComplete();
      }
    };
    if (preference.matches) {
      handlePreference();
      return;
    }
    const sceneReady = Boolean(document.querySelector('.rocket-home[data-scene-ready="true"]'));
    let launch = sceneReady ? window.setTimeout(finish, 1800) : undefined;
    const handleReady = () => {
      window.clearTimeout(maximum);
      window.clearTimeout(launch);
      // Give the rocket its entrance even when shader preparation takes longer.
      launch = window.setTimeout(finish, 1800);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus();
      }
    };
    // If the scene stalls, open the page instead of launching an invisible rocket.
    const maximum = window.setTimeout(() => {
      exitStarted.current = true;
      onReveal();
      onComplete();
    }, 8000);
    const focus = window.requestAnimationFrame(() =>
      skipRef.current?.focus({ preventScroll: true }),
    );
    window.addEventListener("rocket3dev:scene-ready", handleReady);
    preference.addEventListener("change", handlePreference);
    document.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(launch);
      window.clearTimeout(maximum);
      flightRef.current?.cancel();
      window.cancelAnimationFrame(focus);
      window.removeEventListener("rocket3dev:scene-ready", handleReady);
      preference.removeEventListener("change", handlePreference);
      document.removeEventListener("keydown", handleKey);
    };
  }, [finish, onReveal, onComplete]);

  return (
    <div
      className={`home-launch${leaving ? " is-leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={language === "el" ? "Φόρτωση Rocket3Dev" : "Loading Rocket3Dev"}
    >
      <div className="home-launch-backdrop home-space" aria-hidden="true" />
      <div className="home-launch-topline" aria-hidden="true">
        <span>Independent web studio</span>
        <span>{language === "el" ? "Ηράκλειο · Κρήτη" : "Heraklion · Crete"}</span>
      </div>
      <div className="home-launch-signature">
        <div className="home-launch-wordmark" aria-label="Rocket3Dev">
          <span>Rocket</span>
          <span className="home-launch-number">3</span>
          <span>Dev</span>
          <span className="home-launch-point">.</span>
        </div>
        <p className="home-launch-caption">Design. Development. Lift-off.</p>
      </div>
      <div className="home-launch-footer">
        <p className="home-launch-status" role="status">
          <i aria-hidden="true" />
          {language === "el" ? "Ετοιμάζουμε την απογείωση" : "Getting ready for lift-off"}
        </p>
        <button ref={skipRef} className="home-launch-skip" type="button" onClick={finish}>
          {language === "el" ? "Μπείτε στο site" : "Enter the site"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}
