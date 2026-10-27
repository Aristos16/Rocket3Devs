import type { MouseEvent } from "react";
import type Lenis from "lenis";

let programmaticScrollActive = false;
let homeScroller: Pick<Lenis, "scrollTo" | "start" | "stop" | "isStopped"> | null = null;

export function setHomeScroller(scroller: typeof homeScroller) {
  homeScroller = scroller;
}

export function setHomeScrollPaused(paused: boolean) {
  if (paused) homeScroller?.stop();
  else homeScroller?.start();
}

export function scrollToSection(href: string): boolean {
  // A stopped Lenis resets its target when restarted, so wait until an overlay
  // has closed before starting a programmatic navigation.
  if (homeScroller?.isStopped) return false;

  const sectionId = href.replace("#", "");
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const headerOffset = window.innerWidth >= 768 ? 86 : 70;
  const documentTop = window.scrollY + target.getBoundingClientRect().top;
  const targetTop = sectionId === "home" ? 0 : Math.max(0, documentTop - headerOffset);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  programmaticScrollActive = true;
  window.history.replaceState(null, "", href);

  if (homeScroller) {
    homeScroller.scrollTo(targetTop, {
      immediate: prefersReducedMotion,
      onComplete: markProgrammaticScrollDone,
    });
  } else {
    window.scrollTo({ top: targetTop, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return true;
}

export function isProgrammaticScroll() {
  return programmaticScrollActive;
}

export function markProgrammaticScrollDone() {
  programmaticScrollActive = false;
}

export type SectionClickHandler = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

export function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  event.preventDefault();
  scrollToSection(href);
}
