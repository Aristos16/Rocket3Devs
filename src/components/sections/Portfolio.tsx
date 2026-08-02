import { useEffect, useRef, useState } from "react";
import { Coffee, ExternalLink } from "lucide-react";

import type { Language, Translations } from "../../i18n";

const DEMO_DESKTOP_WIDTH = 1280;
const DEMO_PREVIEW_HEIGHT = 320;

function DemoSkeleton() {
  return (
    <div className="grid h-full min-h-[120px] grid-cols-[0.38fr_1fr] gap-2 overflow-hidden rounded-xl bg-[#102d48] p-3 sm:min-h-[180px] sm:grid-cols-[0.3fr_1fr] sm:p-4">
      <div className="rounded-lg border border-white/8 bg-white/[0.035] p-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#d98a50]" />
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded-full bg-white/15" />
          <div className="h-2 w-3/4 rounded-full bg-white/8" />
          <div className="h-2 w-4/5 rounded-full bg-white/8" />
        </div>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="flex flex-col justify-between rounded-lg border border-white/8 bg-white/[0.04] p-3 sm:col-span-2">
          <div className="h-2.5 w-24 rounded-full bg-[#d98a50]/70" />
          <div className="mt-3 h-3 w-4/5 rounded-full bg-white/16" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-white/8" />
        </div>
        <div className="rounded-lg border border-white/8 bg-white/[0.035] p-3">
          <div className="h-10 rounded-md bg-[#d98a50]/12" />
          <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
        </div>
        <div className="rounded-lg border border-white/8 bg-white/[0.035] p-3">
          <div className="h-10 rounded-md bg-[#7898aa]/14" />
          <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

type DemoPreviewProps = {
  href: string;
  title: string;
};

function DemoPreview({ href, title }: DemoPreviewProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    // Scale is written directly to the iframe (no React state) so it tracks
    // the panel width frame-by-frame during the grid-columns toggle animation.
    // A state-driven transform + transition can never catch up to the panel.
    let firstMeasure = true;
    const applyScale = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const scale = Math.min(1, viewport.clientWidth / DEMO_DESKTOP_WIDTH);
      // Height tracks the viewport (smaller on mobile); jsdom-safe fallback.
      const previewHeight = viewport.clientHeight || DEMO_PREVIEW_HEIGHT;
      iframe.style.transform = `scale(${scale})`;
      iframe.style.height = `${Math.round(previewHeight / Math.max(scale, 0.001))}px`;

      if (firstMeasure) {
        firstMeasure = false;
        setReady(true);
      }
    };

    applyScale();
    const observer = new ResizeObserver(applyScale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative h-[260px] overflow-hidden rounded-xl bg-[#102d48] sm:h-[320px]"
    >
      {!loaded && (
        <div className="absolute inset-0">
          <DemoSkeleton />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`${href}?preview=1`}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen"
        onLoad={() => setLoaded(true)}
        className={`absolute left-0 top-0 border-0 bg-white transition-opacity duration-500 ${
          ready && loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: DEMO_DESKTOP_WIDTH,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

type PortfolioProps = {
  t: Translations;
  language: Language;
};

export function Portfolio({ t, language }: PortfolioProps) {
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);

  return (
    <>
      {/* Portfolio */}
      <section
        id="portfolio"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#dfe7e9_0%,#e9eef0_100%)]"
      >
        <div className="ambient-ring pointer-events-none absolute -left-7 top-[20%] h-20 w-20 rounded-full border border-[#7898aa]/16" />
        <div
          className="ambient-dot-reverse pointer-events-none absolute right-[9%] top-[13%] h-3.5 w-3.5 rounded-full bg-[#c97745]/34"
          style={{ animationDelay: "-4s" }}
        />
        <div className="ambient-blob pointer-events-none absolute bottom-[8%] right-[3%] h-24 w-28 border border-[#153351]/8" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
          <div
            data-reveal
            className="mb-9 grid gap-4 sm:mb-12 md:grid-cols-[1fr_0.85fr] md:items-end md:gap-10"
          >
            <div>
              <p className="section-kicker">{t.portfolio.kicker}</p>
              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                {t.portfolio.heading}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-base">
              {t.portfolio.description}
            </p>
          </div>

          <div
            className={`grid gap-5 lg:items-stretch lg:transition-[grid-template-columns] lg:duration-500 lg:ease-out ${
              activePortfolioIndex === 0
                ? "lg:grid-cols-[1.35fr_0.85fr]"
                : "lg:grid-cols-[0.85fr_1.35fr]"
            }`}
          >
            {t.portfolio.items.map((p, index) => {
              const isActive = activePortfolioIndex === index;

              return (
                <article
                  key={p.title}
                  className={`group relative overflow-hidden rounded-[1.75rem] transition-all duration-500 sm:p-7 lg:p-8 ${
                    isActive
                      ? "border border-white/10 bg-[#0b2136] p-5 text-white shadow-[0_24px_70px_rgba(11,33,54,0.18)]"
                      : "border border-[#153351]/10 bg-[#f1f4f4] p-5 shadow-[0_14px_42px_rgba(11,33,54,0.08)] hover:-translate-y-1 hover:border-[#c97745]/42 hover:shadow-[0_20px_48px_rgba(11,33,54,0.12)] lg:min-h-[430px]"
                  }`}
                >
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => setActivePortfolioIndex(index)}
                      aria-label={language === "el" ? `Προβολή ${p.title}` : `View ${p.title}`}
                      className="absolute inset-0 z-20 cursor-pointer rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c97745]/70 focus-visible:ring-inset"
                    >
                      <span className="sr-only">
                        {language === "el" ? `Προβολή ${p.title}` : `View ${p.title}`}
                      </span>
                    </button>
                  )}
                  {isActive ? (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(217,138,80,0.18),transparent_26%),radial-gradient(circle_at_8%_90%,rgba(120,152,170,0.18),transparent_30%)]" />
                      <div className="ambient-ring pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10" />
                      <span className="pointer-events-none absolute right-5 top-2 text-[7rem] font-black leading-none text-white/[0.035] sm:text-[9rem]">
                        0{index + 1}
                      </span>

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full border border-[#d98a50]/25 bg-[#d98a50]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e6a36d]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d98a50] shadow-[0_0_10px_rgba(217,138,80,0.8)]" />
                            {p.tag}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/65">
                            {p.href ? t.portfolio.liveDemo : t.portfolio.comingSoon}
                          </span>
                        </div>

                        <div className="mt-7 max-w-xl sm:mt-9">
                          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {p.title}
                          </h3>
                          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/62 sm:text-base">
                            {p.desc}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {p.features.map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/62"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#07182a] p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:p-3">
                          <div className="mb-2.5 flex items-center gap-1.5 px-1">
                            <span className="h-2 w-2 rounded-full bg-[#d98a50]" />
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="h-2 w-2 rounded-full bg-white/12" />
                            <span className="ml-2 h-4 flex-1 rounded-full bg-white/[0.055]" />
                          </div>

                          {p.href ? (
                            <DemoPreview href={p.href} title={p.title} />
                          ) : (
                            <DemoSkeleton />
                          )}
                        </div>

                        {p.href ? (
                          <a
                            href={p.href}
                            className="mt-6 inline-flex min-h-12 w-full items-center justify-between rounded-xl bg-[#d98a50] px-4 py-3 font-semibold text-[#0b2136] transition-all hover:-translate-y-0.5 hover:bg-[#e6a36d] active:scale-[0.99] sm:w-fit sm:min-w-[190px]"
                          >
                            <span>{t.portfolio.openDemo}</span>
                            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ) : (
                          <div className="mt-6 inline-flex min-h-12 w-full cursor-default items-center justify-between rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 font-semibold text-white/62 sm:w-fit sm:min-w-[190px]">
                            <span>{t.portfolio.comingSoon}</span>
                            <Coffee className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="pointer-events-none absolute right-5 top-2 text-[6rem] font-black leading-none text-[#153351]/[0.035] sm:text-[8rem]">
                        0{index + 1}
                      </span>
                      <div className="ambient-blob pointer-events-none absolute -bottom-10 -right-12 h-40 w-44 border border-[#c97745]/12" />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#95543b]">
                            {p.tag}
                          </span>
                          <span className="rounded-full border border-[#153351]/10 bg-[#dfe7e9] px-3 py-1.5 text-[11px] font-semibold text-[#31526e]">
                            {p.href ? t.portfolio.liveDemo : t.portfolio.comingSoon}
                          </span>
                        </div>

                        <div className="mt-10 grid h-20 w-20 place-items-center rounded-2xl bg-[#153351] text-[#d98a50] shadow-[0_14px_32px_rgba(11,33,54,0.18)] transition-transform duration-300 group-hover:-rotate-4 group-hover:scale-105 sm:h-24 sm:w-24">
                          <p.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                        </div>

                        <h3 className="mt-7 text-2xl font-bold tracking-tight text-[#0b2136]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {p.desc}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-[#153351]/9 bg-[#e5ebed] px-3 py-1.5 text-xs font-medium text-[#31526e]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-8">
                          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(21,51,81,0.12),transparent)]" />
                          <p className="mt-4 text-xs font-medium leading-relaxed text-[#31526e]/75">
                            {language === "el"
                              ? "Πατήστε για προβολή του project."
                              : "Select to view this project."}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-[#e9eef0]">
        <div className="ambient-blob pointer-events-none absolute left-[3%] top-[13%] h-24 w-28 border border-[#153351]/9" />
        <div className="ambient-ring-reverse pointer-events-none absolute left-[11%] bottom-[19%] h-11 w-11 rounded-full border border-[#7898aa]/16" />
        <div className="ambient-dot-reverse pointer-events-none absolute right-[7%] top-[30%] h-4 w-4 rounded-full bg-[#c97745]/28" />
        <div
          className="ambient-dot pointer-events-none absolute bottom-[12%] left-[18%] h-3 w-3 rounded-full bg-[#7898aa]/40"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="ambient-dot pointer-events-none absolute right-[21%] top-[13%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/42"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="ambient-tile pointer-events-none absolute bottom-[13%] right-[14%] h-8 w-8 rounded-xl border border-[#c97745]/14 bg-[#dfe7e9]/25"
          style={{ animationDelay: "-3s" }}
        />
        <div
          data-reveal
          className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24"
        >
          <div className="mb-9 max-w-2xl sm:mb-12 md:mb-14">
            <p className="section-kicker">{t.reasons.kicker}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.reasons.heading}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {t.reasons.items.map((r) => (
              <div
                key={r.title}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-[#153351]/10 bg-[#f1f4f4] p-4 sm:items-start sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#c97745]/15 text-[#95543b] transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <r.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
