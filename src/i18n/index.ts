import { el } from "./el";
import { en } from "./en";
import type { Language, Translations } from "./types";

export type { Language, Translations };

export const translations: Record<Language, Translations> = { el, en };

export const navItems = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "services", href: "#services" },
  { id: "portfolio", href: "#portfolio" },
  { id: "contact", href: "#contact" },
] as const;
