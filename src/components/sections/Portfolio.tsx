import { ArrowUpRight } from "lucide-react";

import type { Translations } from "../../i18n";

type PortfolioProps = { t: Translations };

export function Portfolio({ t }: PortfolioProps) {
  const previewPaths = ["/images/gym-demo-preview.webp", "/images/cafe-demo-preview.webp"];

  return (
    <section id="portfolio" className="home-portfolio scroll-mt-20">
      <div className="home-wrap">
        <header className="home-portfolio-heading">
          <p className="home-eyebrow" data-reveal="rule">
            {t.portfolio.kicker}
          </p>
          <h2 className="home-heading" data-reveal="line" data-reveal-delay="80">
            {t.portfolio.heading}
          </h2>
          <p className="home-portfolio-intro" data-reveal="rise" data-reveal-delay="160">
            {t.portfolio.description}
          </p>
        </header>
        <div className="home-projects">
          {t.portfolio.items.slice(0, 2).map((project, index) => (
            <article className={`home-project home-project--${index + 1}`} key={project.title}>
              <a
                className="home-project-art"
                href={project.href ?? "#portfolio"}
                tabIndex={project.href ? undefined : -1}
                aria-label={`${t.portfolio.openDemo}: ${project.title}`}
                data-reveal="paper"
                data-reveal-delay={String(index * 120)}
              >
                <span className="home-project-frame">
                  <span className="home-project-browser" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{project.tag}</span>
                    <span className="home-project-index">0{index + 1}</span>
                  </span>
                  <span className="home-project-screen">
                    <project.icon className="home-project-fallback" aria-hidden="true" />
                    <img
                      src={previewPaths[index]}
                      width="1200"
                      height="800"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.style.opacity = "0";
                      }}
                    />
                  </span>
                </span>
                <span className="home-project-open" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
              <div
                className="home-project-caption"
                data-reveal="rise"
                data-reveal-delay={String(110 + index * 120)}
              >
                <p>{project.tag}</p>
                <h3>{project.title}</h3>
                {project.href && (
                  <a href={project.href}>
                    {t.portfolio.openDemo}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
                <ul className="home-project-features" aria-label={project.title}>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
