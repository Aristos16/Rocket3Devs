import { Rocket } from "lucide-react";

import type { Language, Translations } from "../../i18n";

type AboutProps = {
  t: Translations;
  language: Language;
};

function HighlightText({
  text,
  highlights,
  className,
}: {
  text: string;
  highlights: readonly string[];
  className: string;
}) {
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (escaped.length === 0) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = highlights.some(
          (highlight) => part.toLocaleLowerCase() === highlight.toLocaleLowerCase(),
        );

        return isHighlighted ? (
          <span key={`${part}-${index}`} className={className}>
            {part}
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}

export function About({ t, language }: AboutProps) {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#d4e0e3_0%,#dfe7e9_54%,#dfe7e9_100%)]"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-56 w-56 rounded-full bg-[#7898aa]/10 blur-3xl" />
      <div className="ambient-dot pointer-events-none absolute left-[7%] top-[18%] h-4 w-4 rounded-full bg-[#c97745]/35" />
      <div
        className="ambient-dot-reverse pointer-events-none absolute left-[12%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/45"
        style={{ animationDelay: "-5s" }}
      />
      <div className="ambient-blob pointer-events-none absolute right-[5%] top-[20%] h-20 w-24 border border-[#153351]/10" />
      <div className="ambient-ring pointer-events-none absolute right-[10%] top-[42%] h-14 w-14 rounded-full border border-[#c97745]/18" />
      <div
        className="ambient-ring-reverse pointer-events-none absolute bottom-[9%] left-[4%] h-9 w-9 rounded-full border-2 border-[#7898aa]/18"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="ambient-tile pointer-events-none absolute bottom-[13%] right-[18%] h-6 w-6 rounded-lg border border-[#7898aa]/35 bg-[#d4e0e3]/35"
        style={{ animationDelay: "-4s" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
        <div data-reveal className="grid gap-7 sm:gap-9 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="relative overflow-hidden rounded-2xl bg-[#0b2136] p-6 text-white shadow-[0_22px_60px_rgba(11,33,54,0.18)] sm:rounded-3xl sm:p-8 md:p-10">
            <div className="ambient-blob absolute -right-12 -top-10 h-40 w-44 border border-[#7898aa]/18" />
            <div
              className="ambient-tile absolute right-5 top-20 h-16 w-16 rounded-2xl border border-[#c97745]/18"
              style={{ animationDelay: "-5s" }}
            />
            <Rocket className="absolute bottom-7 right-7 h-24 w-24 rotate-12 text-white/[0.05]" />
            <p className="section-kicker section-kicker-dark relative">{t.about.kicker}</p>
            <h2 className="relative mt-4 text-2xl font-bold leading-tight sm:text-4xl">
              <HighlightText
                text={t.about.heading}
                highlights={language === "el" ? ["Άμεση επικοινωνία"] : ["Clear communication"]}
                className="text-[#e6a36d]"
              />
            </h2>
            <p className="relative mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:mt-6 sm:text-base">
              <HighlightText
                text={t.about.intro}
                highlights={
                  language === "el"
                    ? ["responsive ιστοσελίδες", "καθαρό design"]
                    : ["responsive websites", "clean visuals"]
                }
                className="font-semibold text-[#e6a36d]"
              />
            </p>
          </div>

          <div className="text-sm text-[#31526e] sm:text-base">
            <p className="max-w-2xl leading-relaxed">
              <HighlightText
                text={t.about.paragraphOne}
                highlights={
                  language === "el"
                    ? ["τρεις web developers", "άμεσα"]
                    : ["three web developers", "directly"]
                }
                className="font-semibold text-[#b96836]"
              />
            </p>
            <div className="grid gap-3 pt-6 sm:grid-cols-3 sm:gap-4 sm:pt-7">
              {t.about.cards.map((card) => (
                <div
                  key={card.title}
                  className="group flex items-start gap-3 rounded-xl border border-[#153351]/10 bg-[#f1f4f4]/90 p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md sm:block sm:p-4"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#153351] text-[#d98a50] transition-all group-hover:-rotate-6 group-hover:scale-105">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 sm:mt-3">
                    <p className="text-sm font-semibold text-[#0b2136]">{card.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#31526e] sm:text-xs">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
