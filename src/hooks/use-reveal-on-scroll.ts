import { useLayoutEffect, type RefObject } from "react";

type UseRevealOnScrollOptions = {
  selector: string;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
  animated?: boolean;
  disabled?: boolean;
  ready?: boolean;
  contentKey?: string;
};

export function useRevealOnScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    selector,
    visibleClass = "is-visible",
    threshold = 0.1,
    rootMargin = "0px",
    animated = false,
    disabled = false,
    ready = true,
    contentKey = "",
  }: UseRevealOnScrollOptions,
) {
  useLayoutEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window) || disabled) {
      elements.forEach((element) => element.classList.add(visibleClass));
      return;
    }

    const animations: Animation[] = [];
    container.classList.add("home-reveals-active");
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const alreadyVisible = element.classList.contains(visibleClass);
          entry.target.classList.add(visibleClass);
          if (animated && !alreadyVisible && typeof element.animate === "function") {
            const preset = element.dataset.reveal || "rise";
            const frames = revealFrames[preset] || revealFrames.rise;
            element.style.transformOrigin = "50% 0%";
            animations.push(
              element.animate(frames, {
                duration:
                  preset === "paper" || preset === "rocket" || preset === "headline"
                    ? 1100
                    : preset === "image" || preset === "fold" || preset === "line"
                      ? 850
                      : 650,
                delay: Math.min(Number(element.dataset.revealDelay) || 0, 1600),
                easing: "cubic-bezier(0.23, 1, 0.32, 1)",
                fill: "backwards",
              }),
            );
          }
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let element = event.target.closest<HTMLElement>(selector);
      while (element && container.contains(element)) {
        element.classList.add(visibleClass);
        element.getAnimations().forEach((animation) => animation.finish());
        observer.unobserve(element);
        element = element.parentElement?.closest<HTMLElement>(selector) ?? null;
      }
    };
    container.addEventListener("focusin", revealFocused);
    elements.forEach((element) => observer.observe(element));
    return () => {
      container.removeEventListener("focusin", revealFocused);
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      container.classList.remove("home-reveals-active");
    };
  }, [
    containerRef,
    selector,
    visibleClass,
    threshold,
    rootMargin,
    animated,
    disabled,
    ready,
    contentKey,
  ]);
}

const revealFrames: Record<string, Keyframe[]> = {
  headline: [
    { opacity: 0, transform: "translateY(105%) rotate(3deg)" },
    { opacity: 1, transform: "translateY(0) rotate(0)" },
  ],
  drawing: [{ opacity: 0 }, { opacity: 1 }],
  rise: [
    { opacity: 0, transform: "translateY(22px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  line: [
    { opacity: 0, transform: "translateY(38px) rotate(1deg)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  fold: [
    { opacity: 0, transform: "perspective(1000px) translateY(20px) rotateX(4deg)" },
    { opacity: 1, transform: "perspective(1000px) translateY(0) rotateX(0)" },
  ],
  paper: [
    {
      opacity: 0,
      transform: "perspective(1400px) translateY(38px) rotateX(9deg) rotateZ(-0.6deg)",
    },
    { opacity: 1, transform: "perspective(1400px) translateY(0) rotateX(0) rotateZ(0)" },
  ],
  field: [
    { opacity: 0, transform: "translateY(12px)" },
    { opacity: 1, transform: "translateY(0)" },
  ],
  turn: [
    { opacity: 0, transform: "translateY(10px) rotate(-12deg)" },
    { opacity: 1, transform: "translateY(0) rotate(0)" },
  ],
  image: [
    { opacity: 0, transform: "translateY(24px) scale(.985)" },
    { opacity: 1, transform: "translateY(0) scale(1)" },
  ],
  rocket: [
    { opacity: 0, transform: "translateY(28px) rotate(-3deg)" },
    { opacity: 1, transform: "translateY(0) rotate(0)" },
  ],
  rule: [
    { opacity: 0, transform: "translateX(-16px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
  slide: [
    { opacity: 0, transform: "translateX(24px)" },
    { opacity: 1, transform: "translateX(0)" },
  ],
};
