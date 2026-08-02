import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, Menu, Rocket, X } from "lucide-react";

import { navItems, type Language, type Translations } from "../../i18n";
import {
  isProgrammaticScroll,
  markProgrammaticScrollDone,
  scrollToSection,
} from "./scroll-to-section";

type HeaderProps = {
  t: Translations;
  language: Language;
  onChangeLanguage: (language: Language) => void;
};

export function Header({ t, language, onChangeLanguage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    let ticking = false;

    const updateNavigationState = () => {
      ticking = false;

      const nextScrolled = window.scrollY > 28;
      setIsScrolled((current) => (current === nextScrolled ? current : nextScrolled));

      if (isProgrammaticScroll()) return;

      const marker = window.scrollY + (window.innerWidth >= 768 ? 132 : 108);
      let currentSection = "home";

      for (const section of sections) {
        if (section.offsetTop <= marker) currentSection = section.id;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 24) {
        currentSection = "contact";
      }

      setActiveSection((current) => (current === currentSection ? current : currentSection));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const cancelProgrammaticScroll = () => {
      markProgrammaticScrollDone();
    };

    window.addEventListener("scrollend", cancelProgrammaticScroll);
    window.addEventListener("wheel", cancelProgrammaticScroll, { passive: true });
    window.addEventListener("touchstart", cancelProgrammaticScroll, {
      passive: true,
    });

    return () => {
      cancelProgrammaticScroll();
      window.removeEventListener("scrollend", cancelProgrammaticScroll);
      window.removeEventListener("wheel", cancelProgrammaticScroll);
      window.removeEventListener("touchstart", cancelProgrammaticScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (open || !menuRendered) return;

    const timeout = window.setTimeout(() => {
      setMenuRendered(false);
    }, 380);

    return () => window.clearTimeout(timeout);
  }, [open, menuRendered]);

  function toggleMobileMenu() {
    if (open) {
      setOpen(false);
      return;
    }

    setMenuRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOpen(true));
    });
  }

  function handleChangeLanguage(nextLanguage: Language) {
    onChangeLanguage(nextLanguage);
    setOpen(false);
  }

  function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    scrollToSection(href);
    setActiveSection(href.replace("#", ""));
    setOpen(false);
  }

  return (
    <header className={`site-header sticky top-0 z-50 ${isScrolled ? "is-compact" : ""}`}>
      <nav data-nav-bar className={`site-nav relative z-20 ${isScrolled ? "is-compact" : ""}`}>
        <div
          className={`site-nav-inner mx-auto flex w-full items-center justify-between ${
            isScrolled ? "is-compact" : ""
          }`}
        >
          <a
            href="#home"
            onClick={(event) => handleSectionClick(event, "#home")}
            className="group flex items-center gap-2.5 rounded-xl px-1 py-1 font-semibold tracking-tight"
          >
            <span
              className={`grid place-items-center rounded-xl bg-[#153351] text-[#d98a50] shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-105 ${
                isScrolled ? "h-8 w-8" : "h-10 w-10"
              }`}
            >
              <Rocket
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isScrolled ? "h-4 w-4" : "h-5 w-5"
                }`}
              />
            </span>
            <span
              className={`font-bold tracking-tight text-[#153351] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isScrolled ? "text-base" : "text-xl"
              }`}
            >
              Rocket<span className="text-[#c97745]">3</span>Dev
            </span>
          </a>

          <ul
            className={`hidden items-center gap-1 rounded-full border border-[#153351]/8 bg-[#dbe4e6]/75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
              isScrolled ? "p-1" : "p-1.5"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => handleSectionClick(event, item.href)}
                    className={`flex items-center gap-2 rounded-full text-sm transition-[background-color,color,box-shadow,padding] duration-300 ${
                      isScrolled ? "px-3.5 py-1.5" : "px-[18px] py-2"
                    } ${
                      isActive
                        ? "bg-[#153351] text-white shadow-[0_8px_22px_rgba(11,33,54,0.22)]"
                        : "text-[#31526e] hover:bg-white/70 hover:text-[#0b2136]"
                    }`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#d98a50] shadow-[0_0_9px_rgba(217,138,80,0.8)] transition-all duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                    {t.nav[item.id]}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <div
              className="flex items-center rounded-full border border-[#153351]/10 bg-[#dbe4e6]/80 p-1 shadow-sm"
              role="group"
              aria-label={language === "el" ? t.switchToEnglish : t.switchToGreek}
            >
              {(["el", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleChangeLanguage(code)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-all ${
                    language === code
                      ? "bg-[#153351] text-white shadow-sm"
                      : "text-[#31526e] hover:bg-white/70"
                  }`}
                  aria-pressed={language === code}
                >
                  {code === "el" ? "ΕΛ" : "EN"}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(event) => handleSectionClick(event, "#contact")}
              className={`group hidden items-center gap-2 rounded-full lg:inline-flex bg-[#c97745] text-sm font-semibold text-[#0b2136] shadow-[0_8px_24px_rgba(201,119,69,0.22)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98] ${
                isScrolled ? "px-3.5 py-1.5" : "px-5 py-2.5"
              }`}
            >
              {t.startProject}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            onClick={toggleMobileMenu}
            className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border transition-all duration-300 active:scale-95 md:hidden ${
              open
                ? "rotate-0 border-[#153351] bg-[#153351] text-white shadow-[0_8px_24px_rgba(11,33,54,0.26)]"
                : "border-[#153351]/10 bg-[#dbe4e6]/80 text-[#153351]"
            }`}
            aria-label={t.menuLabel}
            aria-expanded={open}
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
              }`}
            />
          </button>
        </div>
      </nav>

      {menuRendered && (
        <div
          className={`mobile-menu-shell fixed inset-0 z-10 overflow-hidden bg-[#0b2136] md:hidden ${
            open ? "is-open" : "is-closing"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={t.menuLabel}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(217,138,80,0.22),transparent_25%),radial-gradient(circle_at_8%_72%,rgba(120,152,170,0.18),transparent_28%),linear-gradient(145deg,#0b2136_0%,#102d48_55%,#0b2136_100%)]" />

          <div className="mobile-menu-orbit pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full border border-white/10">
            <span className="absolute left-7 top-7 h-3 w-3 rounded-full bg-[#d98a50] shadow-[0_0_22px_rgba(217,138,80,0.75)]" />
          </div>
          <div className="pointer-events-none absolute -left-20 bottom-24 h-52 w-52 rounded-full border border-[#7898aa]/15" />
          <span className="mobile-menu-dot pointer-events-none absolute left-[12%] top-[28%] h-2.5 w-2.5 rounded-full bg-[#d98a50]/80" />
          <span
            className="mobile-menu-dot pointer-events-none absolute bottom-[18%] right-[16%] h-4 w-4 rounded-full border border-white/20"
            style={{ animationDelay: "-2.8s" }}
          />

          <div className="mobile-menu-panel relative flex h-full overflow-y-auto px-5 pb-7 pt-24">
            <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
              <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d98a50]">
                    Rocket3Dev
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                    {language === "el" ? "Πλοήγηση" : "Navigation"}
                  </p>
                </div>

                <div
                  className="flex rounded-full border border-white/10 bg-white/[0.06] p-1"
                  role="group"
                  aria-label={language === "el" ? t.switchToEnglish : t.switchToGreek}
                >
                  {(["el", "en"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleChangeLanguage(code)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                        language === code
                          ? "bg-[#d98a50] text-[#0b2136] shadow-sm"
                          : "text-white/55 hover:text-white"
                      }`}
                      aria-pressed={language === code}
                    >
                      {code === "el" ? "ΕΛ" : "EN"}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="grid gap-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);

                  return (
                    <li
                      key={item.href}
                      className="mobile-menu-item"
                      style={{
                        transitionDelay: open ? `${80 + index * 48}ms` : "0ms",
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(event) => handleSectionClick(event, item.href)}
                        className={`group flex min-h-16 items-center gap-4 rounded-2xl px-3 py-3 transition-all duration-300 ${
                          isActive
                            ? "bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                            : "text-white/72 hover:bg-white/[0.055] hover:text-white"
                        }`}
                        aria-current={isActive ? "location" : undefined}
                      >
                        <span
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[11px] font-bold transition-all ${
                            isActive
                              ? "border-[#d98a50] bg-[#d98a50] text-[#0b2136]"
                              : "border-white/12 bg-white/[0.035] text-white/45 group-hover:border-white/20 group-hover:text-white/70"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-left text-xl font-semibold tracking-tight">
                          {t.nav[item.id]}
                        </span>
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 ${
                            isActive
                              ? "border-[#d98a50]/40 bg-[#d98a50]/10 text-[#d98a50]"
                              : "border-white/10 text-white/35 group-hover:translate-x-0.5 group-hover:border-white/20 group-hover:text-white"
                          }`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-7">
                <a
                  href="#contact"
                  onClick={(event) => handleSectionClick(event, "#contact")}
                  className="group flex min-h-14 w-full items-center justify-between rounded-2xl bg-[#d98a50] px-5 py-4 font-bold text-[#0b2136] shadow-[0_16px_40px_rgba(217,138,80,0.2)] transition-all active:scale-[0.985]"
                >
                  <span>{t.startProject}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2136] text-white transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>

                <div className="mt-5 flex items-center justify-between text-[11px] text-white/38">
                  <span>rocket3devs@gmail.com</span>
                  <span>{language === "el" ? "Ηράκλειο, Κρήτη" : "Heraklion, Crete"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
