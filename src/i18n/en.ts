import {
  Briefcase,
  Code2,
  Coffee,
  Dumbbell,
  Heart,
  Layout,
  MapPin,
  MessageCircle,
  PencilRuler,
  RefreshCw,
  Rocket,
  Smartphone,
  Store,
  User,
  Users,
  Zap,
} from "lucide-react";

import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    contact: "Contact",
  },
  menuLabel: "Menu",
  switchToGreek: "Switch to Greek",
  switchToEnglish: "Switch to English",
  startProject: "Start a project",
  hero: {
    eyebrow: "A small web studio in Heraklion, Crete",
    titleBefore: "Professional Websites Built by",
    titleHighlight: "Three Web Developers",
    titleAfter: "in Crete",
    primaryButton: "Contact Us",
    secondaryButton: "See Our Services",
  },
  about: {
    kicker: "About us",
    heading: "A small team. Clear communication. Thoughtful work.",
    intro:
      "We design modern, fast, responsive websites with clean visuals and clear communication.",
    paragraphOne:
      "We are three web developers based in Heraklion, Crete. As a small team, we work directly with every client and personally handle each project.",
    cards: [
      {
        icon: PencilRuler,
        title: "Modern Design",
        desc: "Clean visuals tailored to the identity and character of your business.",
      },
      {
        icon: Code2,
        title: "Thoughtful Development",
        desc: "Fast, responsive websites built with attention to reliable performance.",
      },
      {
        icon: MessageCircle,
        title: "Direct Communication",
        desc: "You speak directly with the team designing and building your project.",
      },
    ],
  },
  servicesHeading: "Websites for every need.",
  servicesKicker: "Services",
  services: [
    {
      icon: Briefcase,
      title: "Business Websites",
      desc: "Services, information, and contact in one clear website.",
    },
    {
      icon: User,
      title: "Portfolios",
      desc: "Your work and experience presented professionally.",
    },
    {
      icon: Store,
      title: "Restaurants, Cafes & Shops",
      desc: "Menus, hours, bookings, and location.",
    },
    {
      icon: Layout,
      title: "Landing Pages",
      desc: "Focused pages for products and campaigns.",
    },
    {
      icon: RefreshCw,
      title: "Website Redesign",
      desc: "A fresh look, better speed, and easier use.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      desc: "A polished experience on every screen.",
    },
  ],
  process: {
    kicker: "How we work",
    heading: "From idea to website, without the confusion.",
    description: "A friendly four-step process that keeps everything clear and easy to follow.",
    steps: [
      {
        icon: MessageCircle,
        title: "Tell us your idea",
        desc: "We learn what you need and what style fits your business.",
      },
      {
        icon: PencilRuler,
        title: "See the direction",
        desc: "We shape the layout and agree on a clear visual plan.",
      },
      {
        icon: Code2,
        title: "Watch it take shape",
        desc: "We build the site and share progress along the way.",
      },
      {
        icon: Rocket,
        title: "Ready for launch",
        desc: "We complete the final checks and put your website online.",
      },
    ],
  },
  portfolio: {
    kicker: "Portfolio",
    heading: "A couple of demo websites.",
    description:
      "Small examples of the type of modern websites we can create for local businesses.",
    openDemo: "Open demo",
    liveDemo: "Live demo",
    comingSoon: "Demo coming soon",
    items: [
      {
        icon: Dumbbell,
        title: "Gym Website Demo",
        tag: "Gym / Fitness",
        desc: "A modern gym website with programs, memberships, reviews, and a contact form.",
        features: ["Programs", "Memberships", "Reviews"],
        href: "/gym-demo",
      },
      {
        icon: Coffee,
        title: "Cafe Website Demo",
        tag: "Hospitality",
        desc: "A compact cafe concept for menu highlights, location, opening hours, and contact details.",
        features: ["Menu", "Opening hours", "Location"],
        href: "/coffee-demo",
      },
    ],
  },
  reasons: {
    kicker: "Why choose us",
    heading: "Small enough to care. Skilled enough to deliver.",
    items: [
      { icon: Code2, title: "Computer Science background" },
      { icon: Zap, title: "Young and motivated team" },
      { icon: MapPin, title: "Based in Heraklion, Crete" },
      { icon: Heart, title: "Affordable pricing" },
      { icon: Smartphone, title: "Mobile-friendly websites" },
      { icon: Users, title: "Personal communication" },
      { icon: Rocket, title: "Fast and clean design" },
    ],
  },
  contact: {
    kicker: "Contact",
    heading: "Let's build something great.",
    description:
      "Have an idea for a website? Contact us and we will help you turn it into a professional online presence.",
    location: "Heraklion, Crete, Greece",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    subject: "New Rocket3Dev website enquiry",
    successMessage: "Your message was sent successfully. We will get back to you soon.",
    errorMessage: "Something went wrong. Please try again or email rocket3devs@gmail.com.",
  },
  footer: {
    location: "Heraklion, Crete · Greece",
    rights: "All rights reserved.",
    builtBy: "Built by Rocket3Dev.",
  },
};
