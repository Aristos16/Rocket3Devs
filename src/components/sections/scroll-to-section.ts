import type { MouseEvent } from "react";

let programmaticScrollActive = false;

// Scrolls to the section referenced by `href` using the native smooth
// scrolling behavior. Client-only: safe to call from event handlers only.
export function scrollToSection(href: string): boolean {
  const sectionId = href.replace("#", "");
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const compactHeaderOffset = window.innerWidth >= 768 ? 86 : 70;
  const absoluteTop = window.scrollY + target.getBoundingClientRect().top;
  const targetTop = sectionId === "home" ? 0 : Math.max(0, absoluteTop - compactHeaderOffset);

  programmaticScrollActive = true;
  window.history.replaceState(null, "", href);

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: targetTop,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
  return true;
}

export function isProgrammaticScroll(): boolean {
  return programmaticScrollActive;
}

export function markProgrammaticScrollDone(): void {
  programmaticScrollActive = false;
}

export type SectionClickHandler = (event: MouseEvent<HTMLAnchorElement>, href: string) => void;

// Base handler for anchor links: prevents navigation and scrolls smoothly.
// Components that own extra state (e.g. Header's active section / menu) wrap
// this to also update their local state.
export function handleSectionClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  event.preventDefault();
  scrollToSection(href);
}
