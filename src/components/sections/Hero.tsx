import { ArrowRight, Rocket } from "lucide-react";

import type { Translations } from "../../i18n";
import type { SectionClickHandler } from "./scroll-to-section";

type HeroProps = {
  t: Translations;
  onSectionClick: SectionClickHandler;
};

export function Hero({ t, onSectionClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative scroll-mt-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 82% 18%, rgba(224,151,89,0.25), transparent 25%), radial-gradient(circle at 12% 88%, rgba(127,166,187,0.30), transparent 34%), linear-gradient(135deg, #07182a 0%, #0b2136 42%, #24445f 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-[#7898aa]/20 hero-orbit" />
        <div className="absolute right-8 top-12 h-[280px] w-[280px] rounded-full border border-[#c97745]/15 hero-orbit" />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7898aa" stopOpacity="0" />
              <stop offset="45%" stopColor="#91adba" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#c97745" stopOpacity="0.88" />
            </linearGradient>
          </defs>
          <path
            d="M-120 650 C 250 430, 540 560, 790 350 S 1180 80, 1540 170"
            fill="none"
            stroke="url(#trailGradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="rocket-trail"
          />
          <path
            d="M80 740 C 420 520, 680 700, 950 470 S 1280 260, 1510 320"
            fill="none"
            stroke="#7898aa"
            strokeOpacity="0.22"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="rocket-trail-slow"
          />
          <path
            d="M940 70 C 1110 160, 1160 290, 1070 410 C 1010 490, 1110 585, 1420 620"
            fill="none"
            stroke="#c97745"
            strokeOpacity="0.17"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="rocket-trail-slow"
          />
        </svg>

        <div className="hero-rocket absolute right-[10%] top-[18%] hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm lg:block">
          <Rocket className="h-20 w-20 text-[#d98a50] drop-shadow-[0_10px_25px_rgba(224,151,89,0.35)]" />
        </div>
        <div className="absolute right-[6%] top-[48%] hidden text-[220px] font-black leading-none text-white/[0.025] lg:block">
          3
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 md:pb-40 md:pt-32">
        <div className="max-w-3xl animate-fade-up text-center sm:text-left">
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#c97745]/35 bg-white/5 px-3 py-1 text-xs font-medium text-[#d4e0e3] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c97745] shadow-[0_0_12px_rgba(224,151,89,0.9)]" />
            {t.hero.eyebrow}
          </div>
          <h1 className="text-[clamp(2.35rem,11vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            {t.hero.titleBefore} <span className="text-[#d98a50]">{t.hero.titleHighlight}</span>{" "}
            {t.hero.titleAfter}
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contact"
              onClick={(event) => onSectionClick(event, "#contact")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#c97745] px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-[#0b2136] shadow-[0_12px_35px_rgba(224,151,89,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98]"
            >
              {t.hero.primaryButton} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              onClick={(event) => onSectionClick(event, "#services")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#7898aa]/50 bg-white/5 px-6 py-3.5 sm:w-auto sm:py-3 font-medium text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
            >
              {t.hero.secondaryButton}
            </a>
          </div>

          {/* Mobile/tablet rocket — kept inside the hero flow so it never covers text or buttons */}
          <div
            className="mt-9 flex justify-center sm:justify-end sm:pr-8 lg:hidden"
            aria-hidden="true"
          >
            <div className="hero-rocket rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm">
              <Rocket className="h-12 w-12 text-[#d98a50] drop-shadow-[0_10px_25px_rgba(224,151,89,0.4)] sm:h-14 sm:w-14" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
