import type { Translations } from "../../i18n";

type ServicesProps = { t: Translations };

export function Services({ t }: ServicesProps) {
  const featured = [t.services[0], t.services[2], t.services[3]];

  return (
    <section id="services" className="home-services scroll-mt-20">
      <svg
        className="home-services-edge home-services-edge--top"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0h1440v12C1050 12 700 78 0 32V0Z" fill="var(--section-paper)" />
      </svg>
      <div className="home-wrap">
        <div className="home-services-heading">
          <p className="home-eyebrow home-eyebrow--light" data-reveal="rule">
            {t.servicesKicker}
          </p>
          <h2
            className="home-heading home-heading--light"
            data-reveal="line"
            data-reveal-delay="80"
          >
            {t.servicesHeading}
          </h2>
        </div>
        <div className="home-service-grid">
          {featured.map((service, index) => (
            <article
              className={`home-service home-service--${index + 1}`}
              key={service.title}
              data-reveal="paper"
              data-reveal-delay={String(index * 100)}
            >
              <span className="home-service-number">0{index + 1}</span>
              <service.icon
                aria-hidden="true"
                className="home-service-icon"
                data-reveal="turn"
                data-reveal-delay={String(100 + index * 60)}
              />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
