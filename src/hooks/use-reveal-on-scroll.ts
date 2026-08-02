import { useEffect, type RefObject } from "react";

type UseRevealOnScrollOptions = {
  selector: string;
  visibleClass?: string;
  threshold?: number;
  rootMargin?: string;
};

export function useRevealOnScroll(
  containerRef: RefObject<HTMLElement | null>,
  {
    selector,
    visibleClass = "is-visible",
    threshold = 0.1,
    rootMargin = "0px",
  }: UseRevealOnScrollOptions,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(visibleClass));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(visibleClass);
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [containerRef, selector, visibleClass, threshold, rootMargin]);
}
