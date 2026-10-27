import { useRef } from "react";
import { ArrowDown, ArrowUpRight, ChevronsRight, Pause, Play } from "lucide-react";
import type { Translations } from "../../i18n";
import { scrollToSection, type SectionClickHandler } from "./scroll-to-section";

type HeroProps = {
  t: Translations;
  onSectionClick: SectionClickHandler;
  motionEnabled: boolean;
  onToggleMotion: () => void;
};

type SwipePillProps = {
  label: string;
  href: string;
  revealDelay: string;
};

function SwipePill({ label, href, revealDelay }: SwipePillProps) {
  const pillRef = useRef<HTMLButtonElement | null>(null);
  const thumbRef = useRef<HTMLSpanElement | null>(null);
  const dragRef = useRef<{ left: number; padL: number; halfThumb: number; travel: number } | null>(
    null,
  );

  const paint = (progress: number) => {
    pillRef.current?.style.setProperty("--swipe-progress", progress.toFixed(4));
  };

  const beginDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const pill = pillRef.current;
    const thumb = thumbRef.current;
    if (!pill || !thumb) return;
    const rect = pill.getBoundingClientRect();
    const style = window.getComputedStyle(pill);
    const padL = parseFloat(style.paddingLeft);
    const padR = parseFloat(style.paddingRight);
    const thumbSize = thumb.offsetWidth;
    const travel = Math.max(1, rect.width - padL - padR - thumbSize);
    dragRef.current = { left: rect.left, padL, halfThumb: thumbSize / 2, travel };
    pill.style.setProperty("--swipe-travel", `${travel}px`);
    pill.dataset.dragging = "true";
    pill.setPointerCapture(event.pointerId);
    paint(0);
  };

  const updateDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const progress = Math.min(
      1,
      Math.max(0, (event.clientX - drag.left - drag.padL - drag.halfThumb) / drag.travel),
    );
    paint(progress);
  };

  const reset = () => {
    const pill = pillRef.current;
    if (!pill) return;
    delete pill.dataset.armed;
    pill.style.setProperty("--swipe-progress", "0");
  };

  const fire = () => {
    const pill = pillRef.current;
    if (!pill || pill.dataset.armed) return;
    pill.dataset.armed = "true";
    delete pill.dataset.dragging;
    pill.style.setProperty("--swipe-progress", "1");
    window.setTimeout(() => {
      scrollToSection(href);
      window.setTimeout(reset, 900);
    }, 540);
  };

  const endDrag = () => {
    const pill = pillRef.current;
    if (!pill || !dragRef.current) return;
    dragRef.current = null;
    delete pill.dataset.dragging;
    const progress = parseFloat(pill.style.getPropertyValue("--swipe-progress") || "0");
    if (progress >= 0.9) fire();
    else pill.style.setProperty("--swipe-progress", "0");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    fire();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Synthetic clicks from assistive tech / keyboard report detail 0.
    if (event.detail !== 0) return;
    fire();
  };

  return (
    <button
      ref={pillRef}
      type="button"
      className="home-primary-link home-swipe-pill"
      data-reveal="rise"
      data-reveal-delay={revealDelay}
      onPointerDown={beginDrag}
      onPointerMove={updateDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <span className="home-swipe-fill" aria-hidden="true" />
      <span className="home-swipe-thumb" ref={thumbRef} aria-hidden="true">
        <ArrowUpRight size={20} aria-hidden="true" />
      </span>
      <span className="home-swipe-label">
        {label}
        <ChevronsRight size={15} className="home-swipe-cue" aria-hidden="true" />
      </span>
    </button>
  );
}

export function Hero({ t, onSectionClick, motionEnabled, onToggleMotion }: HeroProps) {
  return (
    <section id="home" className="home-hero home-space">
      <div className="home-hero-inner">
        <div className="home-hero-composition">
          <div className="home-hero-copy">
            <p className="home-hero-eyebrow" data-reveal="rise" data-reveal-delay="0">
              <i />
              {t.hero.eyebrow}
            </p>
            <h1>
              <span className="home-title-line">
                <span data-reveal="headline" data-reveal-delay="140">
                  {t.hero.titleBefore}
                </span>
              </span>
              <span className="home-title-line">
                <span data-reveal="headline" data-reveal-delay="360">
                  {t.hero.titleHighlight}
                </span>
              </span>
            </h1>
            <p className="home-hero-description" data-reveal="rise" data-reveal-delay="640">
              {t.hero.description}
            </p>
            <div className="home-hero-actions">
              <SwipePill label={t.hero.primaryButton} href="#contact" revealDelay="860" />
              <a
                className="home-secondary-link"
                href="#portfolio"
                onClick={(event) => onSectionClick(event, "#portfolio")}
                data-reveal="rise"
                data-reveal-delay="980"
              >
                {t.portfolio.kicker}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="home-rocket-display">
            <svg
              className="home-hero-drawing"
              data-reveal="image"
              data-reveal-delay="1100"
              viewBox="0 0 560 620"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="home-hero-flight-line"
                d="M66 505C-15 288 275 72 445 129c191 64-72 454-219 431C105 540 438 231 490 369"
              />
              <path className="home-hero-spark" d="M463 78v32m-16-16h32M87 393v22m-11-11h22" />
              <circle cx="115" cy="195" r="4" fill="currentColor" />
            </svg>
            <div className="home-rocket-stage" aria-hidden="true" />
            <button
              type="button"
              className="home-motion-toggle"
              onClick={onToggleMotion}
              aria-label={motionEnabled ? t.hero.pauseMotion : t.hero.resumeMotion}
              title={motionEnabled ? t.hero.pauseMotion : t.hero.resumeMotion}
              aria-pressed={!motionEnabled}
              data-reveal="rise"
              data-reveal-delay="1220"
            >
              {motionEnabled ? (
                <Pause size={16} aria-hidden="true" />
              ) : (
                <Play size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <a
          href="#portfolio"
          onClick={(event) => onSectionClick(event, "#portfolio")}
          className="home-scroll-cue"
          aria-label={t.hero.scrollHint}
          data-reveal="rise"
          data-reveal-delay="1320"
        >
          <ArrowDown size={19} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
