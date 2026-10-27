import { navItems, type Translations } from "../../i18n";
import type { SectionClickHandler } from "./scroll-to-section";

type FooterProps = {
  t: Translations;
  onSectionClick: SectionClickHandler;
};

export function Footer({ t, onSectionClick }: FooterProps) {
  return (
    <footer className="home-footer">
      <svg
        className="home-footer-edge"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 0h1440v12C1040 12 600 74 0 32V0Z" fill="var(--section-blue)" />
      </svg>
      <div className="home-wrap">
        <div className="home-footer-main">
          <a
            href="#home"
            className="home-footer-wordmark"
            onClick={(event) => onSectionClick(event, "#home")}
            aria-label="Rocket3Dev"
            data-reveal="line"
          >
            Rocket3Dev<span aria-hidden="true">.</span>
          </a>
          <nav aria-label="Footer navigation">
            <ul className="home-footer-nav">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => onSectionClick(event, item.href)}
                    data-reveal="rise"
                    data-reveal-delay={String(index * 35)}
                  >
                    {t.nav[item.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="home-footer-meta">
          <p data-reveal="rule">{t.footer.location}</p>
          <p data-reveal="rule" data-reveal-delay="50">
            © {new Date().getFullYear()} Rocket3Dev. {t.footer.rights}
          </p>
          <p data-reveal="rule" data-reveal-delay="100">
            {t.footer.builtBy}
          </p>
          <a href="mailto:rocket3devs@gmail.com" data-reveal="rule" data-reveal-delay="150">
            rocket3devs@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
