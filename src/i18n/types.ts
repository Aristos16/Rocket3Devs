import type { LucideIcon } from "lucide-react";

export type Language = "el" | "en";

export type Translations = {
  nav: Record<"home" | "about" | "services" | "portfolio" | "contact", string>;
  menuLabel: string;
  switchToGreek: string;
  switchToEnglish: string;
  startProject: string;
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    primaryButton: string;
    secondaryButton: string;
  };
  about: {
    kicker: string;
    heading: string;
    intro: string;
    paragraphOne: string;
    cards: { icon: LucideIcon; title: string; desc: string }[];
  };
  servicesHeading: string;
  servicesKicker: string;
  services: { icon: LucideIcon; title: string; desc: string }[];
  process: {
    kicker: string;
    heading: string;
    description: string;
    steps: { icon: LucideIcon; title: string; desc: string }[];
  };
  portfolio: {
    kicker: string;
    heading: string;
    description: string;
    openDemo: string;
    liveDemo: string;
    comingSoon: string;
    items: {
      icon: LucideIcon;
      title: string;
      tag: string;
      desc: string;
      features: string[];
      href: string;
    }[];
  };
  reasons: {
    kicker: string;
    heading: string;
    items: { icon: LucideIcon; title: string }[];
  };
  contact: {
    kicker: string;
    heading: string;
    description: string;
    location: string;
    name: string;
    email: string;
    message: string;
    send: string;
    subject: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: {
    location: string;
    rights: string;
    builtBy: string;
  };
};
