import type { Language, Translations } from "../../i18n";
import { OrbitDrawing } from "./OrbitDrawing";

type AboutProps = { t: Translations; language: Language };

export function About({ t, language }: AboutProps) {
  const highlight = language === "el" ? "καθαρό design" : "clean visuals";

  return (
    <section id="about" className="home-about scroll-mt-20">
      <div className="home-wrap home-about-layout">
        <div className="home-about-copy">
          <p className="home-eyebrow" data-reveal="rule">
            {t.about.kicker}
          </p>
          <h2 className="home-heading" data-reveal="line">
            {t.about.heading}
          </h2>
          <p className="home-about-intro" data-reveal="rise" data-reveal-delay="100">
            {t.about.intro.split(new RegExp(`(${highlight})`, "i")).map((part, index) =>
              part.toLocaleLowerCase() === highlight.toLocaleLowerCase() ? (
                <span className="home-orange" key={index}>
                  {part}
                </span>
              ) : (
                part
              ),
            )}
          </p>
          <ul
            className="home-values"
            aria-label={language === "el" ? "Οι αξίες μας" : "Our values"}
          >
            {t.about.cards.map((card, index) => (
              <li key={card.title} data-reveal="rise" data-reveal-delay={String(150 + index * 70)}>
                <card.icon aria-hidden="true" />
                <span>{card.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <OrbitDrawing />
      </div>
    </section>
  );
}
