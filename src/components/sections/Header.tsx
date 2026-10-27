import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { ArrowUpRight, Menu, Rocket, X } from "lucide-react";

import { navItems, type Language, type Translations } from "../../i18n";
import {
  isProgrammaticScroll,
  markProgrammaticScrollDone,
  scrollToSection,
  setHomeScrollPaused,
} from "./scroll-to-section";

type HeaderProps = {
  t: Translations;
  language: Language;
  onChangeLanguage: (language: Language) => void;
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header({ t, language, onChangeLanguage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateCompactHeader = () => {
      const nextIsScrolled = window.scrollY > 24;
      if (scrolledRef.current !== nextIsScrolled) {
        scrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }
      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 24) {
        setActiveSection("contact");
      }
    };
    updateCompactHeader();
    window.addEventListener("scroll", updateCompactHeader, { passive: true });
    window.addEventListener("resize", updateCompactHeader);

    const sectionVisibility = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => sectionVisibility.set(entry.target, entry));
        if (isProgrammaticScroll()) return;

        const visibleSections = [...sectionVisibility.values()]
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0, 0.25, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    const cancelProgrammaticScroll = () => markProgrammaticScrollDone();
    window.addEventListener("wheel", cancelProgrammaticScroll, { passive: true });
    window.addEventListener("touchstart", cancelProgrammaticScroll, { passive: true });
    window.addEventListener("scrollend", cancelProgrammaticScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateCompactHeader);
      window.removeEventListener("resize", updateCompactHeader);
      window.removeEventListener("wheel", cancelProgrammaticScroll);
      window.removeEventListener("touchstart", cancelProgrammaticScroll);
      window.removeEventListener("scrollend", cancelProgrammaticScroll);
      markProgrammaticScrollDone();
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setHomeScrollPaused(true);

    const focusableElements = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []).filter(
        (element) => element.getClientRects().length > 0,
      );

    const focusFrame = window.requestAnimationFrame(() => {
      focusableElements()[0]?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus({ preventScroll: true });
        return;
      }

      if (event.key !== "Tab") return;
      const elements = focusableElements();
      const first = elements[0];
      const last = elements.at(-1);

      if (!first || !last) return;
      if (!menuRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
        document
          .querySelector<HTMLElement>(".rocket-home-nav__links a")
          ?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      setHomeScrollPaused(false);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (open || !pendingHref) return;
    scrollToSection(pendingHref);
    setPendingHref(null);
  }, [open, pendingHref]);

  function closeMenu() {
    setOpen(false);
  }

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    setActiveSection(href.slice(1));
    if (open) setPendingHref(href);
    else scrollToSection(href);
    closeMenu();
    if (window.innerWidth < 768) menuButtonRef.current?.focus({ preventScroll: true });
  }

  function handleLanguageChange(nextLanguage: Language) {
    onChangeLanguage(nextLanguage);
    closeMenu();
    if (window.innerWidth < 768) menuButtonRef.current?.focus({ preventScroll: true });
  }

  function handleMenuButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" && open) {
      event.preventDefault();
      menuRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();
    }
  }

  return (
    <header className={`rocket-home-nav ${isScrolled ? "is-scrolled" : ""}`}>
      <nav
        className="rocket-home-nav__inner"
        aria-label={language === "el" ? "Κύρια πλοήγηση" : "Main navigation"}
      >
        <a
          href="#home"
          className="rocket-home-nav__brand"
          onClick={(event) => handleSectionClick(event, "#home")}
          aria-label="Rocket3Dev, home"
          data-reveal="rise"
        >
          <span className="rocket-home-nav__mark" aria-hidden="true">
            <Rocket />
          </span>
          <span>
            Rocket<span className="rocket-home-nav__brand-accent">3</span>Dev
          </span>
        </a>

        <ul className="rocket-home-nav__links" data-reveal="rise" data-reveal-delay="50">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => handleSectionClick(event, item.href)}
                  aria-current={isActive ? "location" : undefined}
                >
                  {t.nav[item.id]}
                  {isActive && <span className="rocket-home-nav__active-mark" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="rocket-home-nav__actions" data-reveal="rise" data-reveal-delay="100">
          <LanguageSwitcher language={language} onChangeLanguage={handleLanguageChange} t={t} />
          <a
            href="#contact"
            className="rocket-home-nav__cta"
            onClick={(event) => handleSectionClick(event, "#contact")}
          >
            {t.startProject}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="rocket-home-nav__toggle"
          onClick={() => setOpen((current) => !current)}
          onKeyDown={handleMenuButtonKeyDown}
          aria-label={open ? (language === "el" ? "Κλείσιμο μενού" : "Close menu") : t.menuLabel}
          aria-expanded={open}
          aria-controls="rocket-home-mobile-menu"
          data-reveal="rise"
          data-reveal-delay="100"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div
        ref={menuRef}
        id="rocket-home-mobile-menu"
        className="rocket-home-menu"
        hidden={!open}
        inert={!open}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? t.menuLabel : undefined}
      >
        <div className="rocket-home-menu__head">
          <p>{language === "el" ? "Πλοήγηση" : "Navigation"}</p>
          <LanguageSwitcher language={language} onChangeLanguage={handleLanguageChange} t={t} />
        </div>
        <ul className="rocket-home-menu__links">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href} style={{ "--menu-index": index } as CSSProperties}>
                <a
                  href={item.href}
                  className={isActive ? "is-active" : ""}
                  onClick={(event) => handleSectionClick(event, item.href)}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span className="rocket-home-menu__number">0{index + 1}</span>
                  <span>{t.nav[item.id]}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="rocket-home-menu__cta"
          onClick={(event) => handleSectionClick(event, "#contact")}
        >
          {t.startProject}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <p className="rocket-home-menu__location">
          {language === "el" ? "Ηράκλειο, Κρήτη" : "Heraklion, Crete"}
        </p>
      </div>
    </header>
  );
}

function LanguageSwitcher({
  language,
  onChangeLanguage,
  t,
}: {
  language: Language;
  onChangeLanguage: (language: Language) => void;
  t: Translations;
}) {
  return (
    <div
      className="rocket-home-language"
      role="group"
      aria-label={language === "el" ? t.switchToEnglish : t.switchToGreek}
    >
      {(["el", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChangeLanguage(code)}
          aria-pressed={language === code}
        >
          {code === "el" ? "ΕΛ" : "EN"}
        </button>
      ))}
    </div>
  );
}
