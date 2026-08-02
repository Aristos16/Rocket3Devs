import type { Translations } from "../../i18n";

type ServicesProps = {
  t: Translations;
};

export function Services({ t }: ServicesProps) {
  return (
    <>
      {/* Services */}
      <section
        id="services"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#dfe7e9_0%,#e9eef0_55%,#dfe7e9_100%)]"
      >
        <div className="ambient-blob pointer-events-none absolute right-[5%] top-[10%] h-24 w-28 border border-[#c97745]/14" />
        <div
          className="ambient-ring pointer-events-none absolute right-[14%] top-[24%] h-10 w-10 rounded-full border border-[#7898aa]/22"
          style={{ animationDelay: "-3s" }}
        />
        <div className="ambient-tile pointer-events-none absolute bottom-[16%] left-[5%] h-7 w-7 rounded-xl border border-[#153351]/12 bg-[#d4e0e3]/25" />
        <div
          className="ambient-dot pointer-events-none absolute right-[20%] bottom-[10%] h-3 w-3 rounded-full bg-[#7898aa]/40"
          style={{ animationDelay: "-5s" }}
        />
        <div className="ambient-dot-reverse pointer-events-none absolute left-[12%] top-[14%] h-3.5 w-3.5 rounded-full bg-[#c97745]/26" />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 760"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M980 70 C 1160 150, 1150 280, 1320 350 S 1480 530, 1370 690"
            fill="none"
            stroke="#7898aa"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            className="ambient-path"
          />
          <path
            d="M-100 620 C 140 520, 250 650, 430 560"
            fill="none"
            stroke="#c97745"
            strokeOpacity="0.12"
            strokeWidth="1.4"
            className="ambient-path-reverse"
          />
        </svg>
        <div
          data-reveal
          className="relative mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16 md:py-20"
        >
          <div className="mb-7 flex items-end justify-between gap-6 sm:mb-9">
            <div className="max-w-xl">
              <p className="section-kicker">{t.servicesKicker}</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-4xl">
                {t.servicesHeading}
              </h2>
            </div>
            <div className="hidden h-px flex-1 bg-gradient-to-r from-[#153351]/20 to-transparent md:block" />
          </div>

          <div className="overflow-hidden rounded-[1.4rem] border border-[#153351]/10 bg-[#153351]/10 shadow-[0_16px_45px_rgba(11,33,54,0.08)]">
            <div className="grid grid-cols-2 gap-px md:grid-cols-3">
              {t.services.map((s, index) => (
                <article
                  key={s.title}
                  className="group relative min-h-[142px] bg-[#eef2f2] p-4 transition-colors duration-300 hover:bg-[#f6f7f5] sm:min-h-[168px] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#153351] text-[#d98a50] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-10 sm:w-10">
                      <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-[#7898aa]/70 sm:text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold leading-snug text-[#0b2136] sm:text-base">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#31526e] sm:mt-2 sm:text-sm">
                    {s.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c97745] transition-all duration-300 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative w-full overflow-hidden bg-[#0b2136] text-white shadow-[0_18px_50px_rgba(11,33,54,0.16)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="process-orb-small absolute left-[13%] top-20 h-5 w-5 rounded-full bg-[#d98a50]/65 shadow-[0_0_28px_rgba(240,168,102,0.45)]" />
          <div
            className="process-orb-small absolute bottom-20 right-[17%] h-4 w-4 rounded-full bg-[#91adba]/60"
            style={{ animationDelay: "-3s" }}
          />
          <div
            className="ambient-ring absolute right-[8%] top-[18%] h-10 w-10 rounded-full border border-white/10"
            style={{ animationDelay: "-6s" }}
          />
          <div className="ambient-ring-reverse absolute bottom-[17%] left-[7%] h-8 w-8 rounded-full border border-[#d98a50]/16" />
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 620"
            preserveAspectRatio="none"
          >
            <path
              d="M-80 430 C 210 280, 390 460, 650 325 S 1060 190, 1510 300"
              fill="none"
              stroke="#91adba"
              strokeOpacity="0.10"
              strokeWidth="1.5"
              className="ambient-path"
            />
          </svg>
        </div>

        <div
          data-reveal
          className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="process-kicker section-kicker section-kicker-dark justify-center">
              {t.process.kicker}
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-4xl">
              {t.process.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-4 sm:text-base">
              {t.process.description}
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-[#7898aa]/20 lg:block"
              aria-hidden="true"
            />

            <div className="grid gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
              {t.process.steps.map((p, index) => (
                <article
                  key={p.title}
                  className={`group relative grid grid-cols-[4rem_1fr] items-start gap-4 text-left sm:block sm:text-center ${
                    index < t.process.steps.length - 1
                      ? "border-b border-white/10 pb-6 sm:border-b-0 sm:pb-0"
                      : ""
                  }`}
                >
                  <div
                    className="process-step-icon relative grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-[#153351] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-3 group-hover:border-[#d98a50]/55 group-hover:bg-[#1b405f] sm:mx-auto sm:h-20 sm:w-20"
                    style={{ animationDelay: `${index * -1.2}s` }}
                  >
                    <p.icon className="h-6 w-6 text-[#d98a50] sm:h-7 sm:w-7" />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#d98a50] text-[11px] font-bold text-[#0b2136] shadow-md sm:h-7 sm:w-7 sm:text-xs">
                      {index + 1}
                    </span>
                  </div>

                  <div className="min-w-0 pt-1 sm:pt-0">
                    <h3 className="text-base font-semibold text-white sm:mt-6 sm:text-lg">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-none text-sm leading-relaxed text-white/60 sm:mx-auto sm:mt-3 sm:max-w-[15rem]">
                      {p.desc}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
