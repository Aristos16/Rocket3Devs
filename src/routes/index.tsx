import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  Code2,
  Rocket,
  Smartphone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Store,
  User,
  Briefcase,
  Layout,
  RefreshCw,
  Zap,
  Users,
  Heart,
  ExternalLink,
  MessageCircle,
  PencilRuler,
  Dumbbell,
  Coffee,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rocket3Dev" },
      {
        name: "description",
        content:
          "Η Rocket3Dev είναι μια τριμελής ομάδα ανάπτυξης ιστοσελίδων στο Ηράκλειο Κρήτης, που δημιουργεί σύγχρονες ιστοσελίδες για επιχειρήσεις και επαγγελματίες.",
      },
      {
        property: "og:title",
        content: "Rocket3Dev",
      },
      {
        property: "og:description",
        content:
          "Σύγχρονες ιστοσελίδες από τη Rocket3Dev, μια τριμελή ομάδα ανάπτυξης ιστοσελίδων με έδρα το Ηράκλειο Κρήτης.",
      },
    ],
  }),
  component: Index,
});

type Language = "el" | "en";

const navItems = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "services", href: "#services" },
  { id: "portfolio", href: "#portfolio" },
  { id: "contact", href: "#contact" },
] as const;

const translations = {
  el: {
    nav: {
      home: "Αρχική",
      about: "About Us",
      services: "Υπηρεσίες",
      portfolio: "Portfolio",
      contact: "Επικοινωνία",
    },
    menuLabel: "Μενού",
    switchToGreek: "Αλλαγή στα Ελληνικά",
    switchToEnglish: "Switch to English",
    startProject: "Μιλήστε μαζί μας",
    hero: {
      eyebrow: "Web studio με έδρα το Ηράκλειο Κρήτης",
      titleBefore: "Επαγγελματικές ιστοσελίδες από",
      titleHighlight: "Τρεις Web Developers",
      titleAfter: "με έδρα την Κρήτη",
      primaryButton: "Επικοινωνήστε μαζί μας",
      secondaryButton: "Δείτε τις υπηρεσίες μας",
    },
    about: {
      kicker: "About Us",
      heading: "Μικρή ομάδα. Άμεση επικοινωνία. Προσεγμένη δουλειά.",
      intro:
        "Σχεδιάζουμε σύγχρονες, γρήγορες και responsive ιστοσελίδες με καθαρό design και ξεκάθαρη επικοινωνία.",
      paragraphOne:
        "Είμαστε τρεις web developers με έδρα το Ηράκλειο Κρήτης. Ως μικρή ομάδα, συνεργαζόμαστε άμεσα με κάθε πελάτη και αναλαμβάνουμε προσωπικά κάθε project.",
      role: "Co-founder & Web Developer",
    },
    servicesHeading: "Ιστοσελίδες για κάθε ανάγκη.",
    servicesKicker: "Services",
    services: [
      {
        icon: Briefcase,
        title: "Business Websites",
        desc: "Υπηρεσίες, πληροφορίες και επικοινωνία σε ένα καθαρό site.",
      },
      {
        icon: User,
        title: "Portfolios",
        desc: "Η δουλειά και η εμπειρία σας σε σύγχρονη παρουσίαση.",
      },
      {
        icon: Store,
        title: "Εστίαση & Καταστήματα",
        desc: "Μενού, ωράρια, κρατήσεις και τοποθεσία.",
      },
      {
        icon: Layout,
        title: "Landing Pages",
        desc: "Στοχευμένες σελίδες για προϊόντα και καμπάνιες.",
      },
      {
        icon: RefreshCw,
        title: "Website Redesign",
        desc: "Νέα εμφάνιση, καλύτερη ταχύτητα και εμπειρία.",
      },
      {
        icon: Smartphone,
        title: "Responsive Design",
        desc: "Άψογη λειτουργία σε κάθε οθόνη.",
      },
    ],
    process: {
      kicker: "How we work",
      heading: "Από την πρώτη συζήτηση μέχρι το launch, όλα ξεκάθαρα.",
      description:
        "Μια απλή διαδικασία τεσσάρων βημάτων, ώστε να γνωρίζετε πάντα τι ακολουθεί.",
      steps: [
        {
          icon: MessageCircle,
          title: "Μας λέτε τι χρειάζεστε",
          desc: "Μαθαίνουμε τι χρειάζεστε και ποιο ύφος ταιριάζει στην επιχείρησή σας.",
        },
        {
          icon: PencilRuler,
          title: "Σχεδιάζουμε την κατεύθυνση",
          desc: "Οργανώνουμε τη δομή και συμφωνούμε σε ένα ξεκάθαρο οπτικό πλάνο.",
        },
        {
          icon: Code2,
          title: "Χτίζουμε την ιστοσελίδα",
          desc: "Αναπτύσσουμε την ιστοσελίδα και σας ενημερώνουμε για την πρόοδο σε κάθε στάδιο.",
        },
        {
          icon: Rocket,
          title: "Έτοιμοι για launch",
          desc: "Ολοκληρώνουμε τους τελικούς ελέγχους και δημοσιεύουμε την ιστοσελίδα σας.",
        },
      ],
    },
    portfolio: {
      kicker: "Portfolio",
      heading: "Δείτε μερικά demo projects.",
      description:
        "Δύο demo concepts που δείχνουν το ύφος και τις δυνατότητες των ιστοσελίδων που μπορούμε να δημιουργήσουμε.",
      openDemo: "Δείτε το demo",
      liveDemo: "Live demo",
      comingSoon: "Coming soon",
      items: [
        {
          icon: Dumbbell,
          title: "Gym Website Demo",
          tag: "Gym / Fitness",
          desc: "Μια σύγχρονη ιστοσελίδα γυμναστηρίου με προγράμματα, συνδρομές, αξιολογήσεις και φόρμα επικοινωνίας.",
          features: ["Προγράμματα", "Συνδρομές", "Αξιολογήσεις"],
          href: "/gym-demo",
        },
        {
          icon: Coffee,
          title: "Cafe Website Demo",
          tag: "Cafe / Hospitality",
          desc: "Ένα compact concept για καφέ με μενού, τοποθεσία, ωράριο λειτουργίας και στοιχεία επικοινωνίας.",
          features: ["Μενού", "Ωράριο", "Τοποθεσία"],
          href: "/coffee-demo",
        },
      ],
    },
    reasons: {
      kicker: "Why Rocket3Dev",
      heading: "Μικρή ομάδα, άμεση συνεργασία και προσεγμένο αποτέλεσμα.",
      items: [
        { icon: Code2, title: "Ισχυρό τεχνικό υπόβαθρο" },
        { icon: Zap, title: "Μικρή και ευέλικτη ομάδα" },
        { icon: MapPin, title: "Με έδρα το Ηράκλειο" },
        { icon: Heart, title: "Ξεκάθαρη κοστολόγηση" },
        { icon: Smartphone, title: "Mobile-first σχεδιασμός" },
        { icon: Users, title: "Άμεση επικοινωνία" },
        { icon: Rocket, title: "Καθαρό και σύγχρονο design" },
      ],
    },
    contact: {
      kicker: "Contact",
      heading: "Ας μιλήσουμε για το project σας.",
      description:
        "Πείτε μας τι έχετε στο μυαλό σας και θα σας προτείνουμε το κατάλληλο επόμενο βήμα για την online παρουσία της επιχείρησής σας.",
      location: "Ηράκλειο, Κρήτη, Ελλάδα",
      name: "Όνομα",
      email: "Email",
      message: "Μήνυμα",
      send: "Στείλτε το μήνυμα",
      subject: "Νέο αίτημα από την ιστοσελίδα Rocket3Dev",
    },
    footer: {
      location: "Ηράκλειο, Κρήτη · Ελλάδα",
      rights: "Όλα τα δικαιώματα διατηρούνται.",
      builtBy: "Built by Rocket3Dev.",
    },
  },
  en: {
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
      role: "Co-founder & Web Developer",
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
      description:
        "A friendly four-step process that keeps everything clear and easy to follow.",
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
    },
    footer: {
      location: "Heraklion, Crete · Greece",
      rights: "All rights reserved.",
      builtBy: "Built by Rocket3Dev.",
    },
  },
} as const;

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
          (highlight) =>
            part.toLocaleLowerCase() === highlight.toLocaleLowerCase(),
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

function Index() {
  const [open, setOpen] = useState(false);
  const [menuRendered, setMenuRendered] = useState(false);
  const [language, setLanguage] = useState<Language>("el");
  const [activeSection, setActiveSection] = useState("home");
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [portfolioPreviewReady, setPortfolioPreviewReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const portfolioSectionRef = useRef<HTMLElement | null>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollAnimationFrame = useRef<number | null>(null);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("rocket3dev-language");
    if (savedLanguage === "el" || savedLanguage === "en") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = "el";
    }
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    setOpen(false);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("rocket3dev-language", nextLanguage);
  }

  useEffect(() => {
    const section = portfolioSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPortfolioPreviewReady(true);
        observer.disconnect();
      },
      { rootMargin: "350px 0px", threshold: 0.01 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    let ticking = false;

    const updateNavigationState = () => {
      ticking = false;

      const nextScrolled = window.scrollY > 28;
      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );

      if (isProgrammaticScroll.current) return;

      const marker = window.scrollY + (window.innerWidth >= 768 ? 132 : 108);
      let currentSection = "home";

      for (const section of sections) {
        if (section.offsetTop <= marker) currentSection = section.id;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 24) {
        currentSection = "contact";
      }

      setActiveSection((current) =>
        current === currentSection ? current : currentSection,
      );
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const cancelRunningScroll = () => {
      if (scrollAnimationFrame.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrame.current);
        scrollAnimationFrame.current = null;
        isProgrammaticScroll.current = false;
      }
    };

    window.addEventListener("wheel", cancelRunningScroll, { passive: true });
    window.addEventListener("touchstart", cancelRunningScroll, {
      passive: true,
    });

    return () => {
      cancelRunningScroll();
      window.removeEventListener("wheel", cancelRunningScroll);
      window.removeEventListener("touchstart", cancelRunningScroll);
    };
  }, []);

  function animateScrollTo(targetTop: number) {
    if (scrollAnimationFrame.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrame.current);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || Math.abs(distance) < 2) {
      window.scrollTo(0, targetTop);
      isProgrammaticScroll.current = false;
      scrollAnimationFrame.current = null;
      return;
    }

    const duration = Math.min(760, Math.max(420, Math.abs(distance) * 0.42));
    const startTime = window.performance.now();
    isProgrammaticScroll.current = true;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      window.scrollTo(0, startTop + distance * eased);

      if (progress < 1) {
        scrollAnimationFrame.current = window.requestAnimationFrame(step);
        return;
      }

      window.scrollTo(0, targetTop);
      scrollAnimationFrame.current = null;
      isProgrammaticScroll.current = false;
    };

    scrollAnimationFrame.current = window.requestAnimationFrame(step);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  useEffect(() => {
    if (open || !menuRendered) return;

    const timeout = window.setTimeout(() => {
      setMenuRendered(false);
    }, 380);

    return () => window.clearTimeout(timeout);
  }, [open, menuRendered]);

  function toggleMobileMenu() {
    if (open) {
      setOpen(false);
      return;
    }

    setMenuRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOpen(true));
    });
  }

  function handleSectionClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    event.preventDefault();

    const sectionId = href.replace("#", "");
    const target = document.getElementById(sectionId);
    if (!target) return;

    const compactHeaderOffset = window.innerWidth >= 768 ? 86 : 70;
    const absoluteTop = window.scrollY + target.getBoundingClientRect().top;
    const targetTop =
      sectionId === "home" ? 0 : Math.max(0, absoluteTop - compactHeaderOffset);

    isProgrammaticScroll.current = true;
    setActiveSection(sectionId);
    setOpen(false);
    window.history.replaceState(null, "", href);
    animateScrollTo(targetTop);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#dfe7e9] text-[#0b2136]">
      <style>{`
        html { scroll-behavior: auto; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-menu-shell {
          opacity: 0;
          transition: opacity 260ms ease;
          will-change: opacity;
        }

        .mobile-menu-shell.is-open {
          opacity: 1;
        }

        .mobile-menu-shell.is-closing {
          opacity: 0;
          transition-duration: 240ms;
        }

        .mobile-menu-panel {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
          transition:
            opacity 300ms ease,
            transform 460ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .mobile-menu-shell.is-open .mobile-menu-panel {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .mobile-menu-shell.is-closing .mobile-menu-panel {
          opacity: 0;
          transform: translateY(-10px) scale(0.992);
          transition-duration: 210ms, 320ms;
        }

        .mobile-menu-item {
          opacity: 0;
          transform: translateX(-18px);
          transition:
            opacity 320ms ease,
            transform 430ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mobile-menu-shell.is-open .mobile-menu-item {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-menu-shell.is-closing .mobile-menu-item {
          opacity: 0;
          transform: translateX(-8px);
          transition-delay: 0ms !important;
          transition-duration: 150ms, 210ms;
        }

        .mobile-menu-orbit {
          animation: mobileMenuOrbit 12s linear infinite;
          transform-origin: center;
        }

        .mobile-menu-dot {
          animation: mobileMenuDot 7s ease-in-out infinite;
        }

        .site-header {
          padding: 0;
          transition: padding 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: padding;
        }

        .site-header.is-compact {
          padding: 0.75rem 0.75rem 0;
        }

        .site-nav {
          width: 100%;
          max-width: 100%;
          margin-inline: auto;
          border: 0 solid rgba(255, 255, 255, 0.55);
          border-bottom: 1px solid rgba(21, 51, 81, 0.10);
          border-radius: 0;
          background: rgba(233, 238, 240, 0.96);
          box-shadow: 0 5px 18px rgba(11, 33, 54, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: translateZ(0);
          transition:
            max-width 720ms cubic-bezier(0.22, 1, 0.36, 1),
            border-radius 620ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 520ms ease,
            background-color 520ms ease,
            box-shadow 620ms cubic-bezier(0.22, 1, 0.36, 1),
            backdrop-filter 520ms ease;
          will-change: max-width, border-radius, box-shadow;
        }

        .site-nav.is-compact {
          max-width: 72rem;
          border-width: 1px;
          border-radius: 1rem;
          background: rgba(233, 238, 240, 0.88);
          box-shadow: 0 12px 40px rgba(11, 33, 54, 0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .site-nav-inner {
          max-width: 80rem;
          padding: 0.875rem 1.25rem;
          transition:
            max-width 720ms cubic-bezier(0.22, 1, 0.36, 1),
            padding 620ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .site-nav-inner.is-compact {
          max-width: 72rem;
          padding: 0.5rem 0.75rem;
        }

        @media (min-width: 640px) {
          .site-nav-inner {
            padding-inline: 1.75rem;
          }

          .site-nav-inner.is-compact {
            padding-inline: 1rem;
          }
        }

        .rocket-trail {
          stroke-dasharray: 18 22;
          animation: trailFlow 14s linear infinite;
        }

        .rocket-trail-slow {
          stroke-dasharray: 8 18;
          animation: trailFlow 22s linear infinite reverse;
        }

        .hero-rocket {
          animation: rocketFloat 5s ease-in-out infinite;
        }

        .hero-orbit {
          animation: orbitPulse 7s ease-in-out infinite;
          transform-origin: center;
        }

        .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: #31526e;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .section-kicker::before {
          content: "";
          width: 1.65rem;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #c97745, #d98a50);
          box-shadow: 0 0 18px rgba(224, 151, 89, 0.28);
        }

        .section-kicker-dark {
          color: #d98a50;
        }

        .section-kicker-dark::before {
          background: linear-gradient(90deg, #d98a50, #91adba);
        }

        .process-orb-small {
          animation: orbSmallDrift 9s ease-in-out infinite;
        }

        .process-step-icon {
          animation: stepFloat 6s ease-in-out infinite;
        }

        .ambient-dot {
          animation: ambientDotDrift 11s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-dot-reverse {
          animation: ambientDotDriftReverse 14s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-blob {
          animation: ambientBlobDrift 16s ease-in-out infinite;
          border-radius: 58% 42% 66% 34% / 42% 58% 42% 58%;
          will-change: transform, border-radius;
        }

        .ambient-tile {
          animation: ambientTileFloat 13s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-ring {
          animation: ambientRingDrift 15s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-ring-reverse {
          animation: ambientRingDriftReverse 18s ease-in-out infinite;
          will-change: transform;
        }

        .ambient-path {
          stroke-dasharray: 7 18;
          animation: ambientPathFlow 24s linear infinite;
        }

        .ambient-path-reverse {
          stroke-dasharray: 4 15;
          animation: ambientPathFlow 30s linear infinite reverse;
        }

        .process-kicker::before {
          display: none;
        }

        @keyframes trailFlow {
          to { stroke-dashoffset: -320; }
        }

        @keyframes rocketFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(12deg); }
          50% { transform: translate3d(8px, -14px, 0) rotate(16deg); }
        }

        @keyframes orbitPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.03); }
        }

        @keyframes orbSmallDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(12px, -18px, 0); }
        }

        @keyframes stepFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes ambientDotDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          40% { transform: translate3d(13px, -16px, 0); }
          72% { transform: translate3d(-7px, 9px, 0); }
        }

        @keyframes ambientDotDriftReverse {
          0%, 100% { transform: translate3d(0, 0, 0); }
          38% { transform: translate3d(-15px, 10px, 0); }
          74% { transform: translate3d(8px, -12px, 0); }
        }

        @keyframes ambientBlobDrift {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg);
            border-radius: 58% 42% 66% 34% / 42% 58% 42% 58%;
          }
          45% {
            transform: translate3d(12px, -14px, 0) rotate(4deg);
            border-radius: 42% 58% 37% 63% / 58% 42% 61% 39%;
          }
          75% {
            transform: translate3d(-6px, 8px, 0) rotate(-1deg);
          }
        }

        @keyframes ambientTileFloat {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(7deg); }
          50% { transform: translate3d(-10px, -12px, 0) rotate(-5deg); }
        }

        @keyframes ambientRingDrift {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          45% { transform: translate3d(14px, -12px, 0) rotate(11deg); }
          75% { transform: translate3d(-5px, 8px, 0) rotate(5deg); }
        }

        @keyframes ambientRingDriftReverse {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          40% { transform: translate3d(-12px, 10px, 0) rotate(-10deg); }
          72% { transform: translate3d(7px, -8px, 0) rotate(-4deg); }
        }

        @keyframes ambientPathFlow {
          to { stroke-dashoffset: -280; }
        }

        @keyframes mobileMenuOrbit {
          to { transform: rotate(360deg); }
        }

        @keyframes mobileMenuDot {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(8px, -12px, 0); }
        }

        @media (max-width: 767px) {
          html { scroll-padding-top: 4.5rem; }

          body {
            overflow-x: hidden;
            -webkit-text-size-adjust: 100%;
          }

          a, button, input, textarea {
            -webkit-tap-highlight-color: transparent;
          }

          a, button { touch-action: manipulation; }

          [data-reveal] {
            transform: translateY(18px);
            transition-duration: 560ms;
          }

          .site-header.is-compact {
            padding: 0.5rem 0.5rem 0;
          }

          .site-nav-inner {
            min-height: 4rem;
            padding: 0.7rem 1rem;
          }

          .site-nav-inner.is-compact {
            min-height: 3.5rem;
            padding: 0.45rem 0.6rem;
          }

          .section-kicker {
            gap: 0.5rem;
            font-size: 0.69rem;
            letter-spacing: 0.12em;
          }

          .section-kicker::before { width: 1.1rem; }

          .ambient-path,
          .ambient-path-reverse {
            opacity: 0.48;
          }

          .ambient-blob,
          .ambient-ring,
          .ambient-ring-reverse,
          .ambient-tile {
            opacity: 0.72;
          }

          .hero-orbit { opacity: 0.58; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          [data-reveal] { opacity: 1; transform: none; }
        }
      `}</style>
      {/* Nav */}
      <header
        className={`site-header sticky top-0 z-50 ${isScrolled ? "is-compact" : ""}`}
      >
        <nav
          data-nav-bar
          className={`site-nav relative z-20 ${isScrolled ? "is-compact" : ""}`}
        >
          <div
            className={`site-nav-inner mx-auto flex w-full items-center justify-between ${
              isScrolled ? "is-compact" : ""
            }`}
          >
            <a
              href="#home"
              onClick={(event) => handleSectionClick(event, "#home")}
              className="group flex items-center gap-2.5 rounded-xl px-1 py-1 font-semibold tracking-tight"
            >
              <span
                className={`grid place-items-center rounded-xl bg-[#153351] text-[#d98a50] shadow-sm transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-105 ${
                  isScrolled ? "h-8 w-8" : "h-10 w-10"
                }`}
              >
                <Rocket
                  className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isScrolled ? "h-4 w-4" : "h-5 w-5"
                  }`}
                />
              </span>
              <span
                className={`font-bold tracking-tight text-[#153351] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isScrolled ? "text-base" : "text-xl"
                }`}
              >
                Rocket<span className="text-[#c97745]">3</span>Dev
              </span>
            </a>

            <ul
              className={`hidden items-center gap-1 rounded-full border border-[#153351]/8 bg-[#dbe4e6]/75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
                isScrolled ? "p-1" : "p-1.5"
              }`}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => handleSectionClick(event, item.href)}
                      className={`flex items-center gap-2 rounded-full text-sm transition-[background-color,color,box-shadow,padding] duration-300 ${
                        isScrolled ? "px-3.5 py-1.5" : "px-[18px] py-2"
                      } ${
                        isActive
                          ? "bg-[#153351] text-white shadow-[0_8px_22px_rgba(11,33,54,0.22)]"
                          : "text-[#31526e] hover:bg-white/70 hover:text-[#0b2136]"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-[#d98a50] shadow-[0_0_9px_rgba(217,138,80,0.8)] transition-all duration-300 ${
                          isActive
                            ? "scale-100 opacity-100"
                            : "scale-50 opacity-0"
                        }`}
                      />
                      {t.nav[item.id]}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-2 md:flex">
              <div
                className="flex items-center rounded-full border border-[#153351]/10 bg-[#dbe4e6]/80 p-1 shadow-sm"
                role="group"
                aria-label={
                  language === "el" ? t.switchToEnglish : t.switchToGreek
                }
              >
                {(["el", "en"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide transition-all ${
                      language === code
                        ? "bg-[#153351] text-white shadow-sm"
                        : "text-[#31526e] hover:bg-white/70"
                    }`}
                    aria-pressed={language === code}
                  >
                    {code === "el" ? "ΕΛ" : "EN"}
                  </button>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(event) => handleSectionClick(event, "#contact")}
                className={`group hidden items-center gap-2 rounded-full lg:inline-flex bg-[#c97745] text-sm font-semibold text-[#0b2136] shadow-[0_8px_24px_rgba(201,119,69,0.22)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98] ${
                  isScrolled ? "px-3.5 py-1.5" : "px-5 py-2.5"
                }`}
              >
                {t.startProject}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <button
              onClick={toggleMobileMenu}
              className={`relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border transition-all duration-300 active:scale-95 md:hidden ${
                open
                  ? "rotate-0 border-[#153351] bg-[#153351] text-white shadow-[0_8px_24px_rgba(11,33,54,0.26)]"
                  : "border-[#153351]/10 bg-[#dbe4e6]/80 text-[#153351]"
              }`}
              aria-label={t.menuLabel}
              aria-expanded={open}
            >
              <Menu
                className={`absolute h-5 w-5 transition-all duration-300 ${
                  open
                    ? "rotate-90 scale-50 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                className={`absolute h-5 w-5 transition-all duration-300 ${
                  open
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-50 opacity-0"
                }`}
              />
            </button>
          </div>
        </nav>

        {menuRendered && (
          <div
            className={`mobile-menu-shell fixed inset-0 z-10 overflow-hidden bg-[#0b2136] md:hidden ${
              open ? "is-open" : "is-closing"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={t.menuLabel}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(217,138,80,0.22),transparent_25%),radial-gradient(circle_at_8%_72%,rgba(120,152,170,0.18),transparent_28%),linear-gradient(145deg,#0b2136_0%,#102d48_55%,#0b2136_100%)]" />

            <div className="mobile-menu-orbit pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full border border-white/10">
              <span className="absolute left-7 top-7 h-3 w-3 rounded-full bg-[#d98a50] shadow-[0_0_22px_rgba(217,138,80,0.75)]" />
            </div>
            <div className="pointer-events-none absolute -left-20 bottom-24 h-52 w-52 rounded-full border border-[#7898aa]/15" />
            <span className="mobile-menu-dot pointer-events-none absolute left-[12%] top-[28%] h-2.5 w-2.5 rounded-full bg-[#d98a50]/80" />
            <span
              className="mobile-menu-dot pointer-events-none absolute bottom-[18%] right-[16%] h-4 w-4 rounded-full border border-white/20"
              style={{ animationDelay: "-2.8s" }}
            />

            <div className="mobile-menu-panel relative flex h-full overflow-y-auto px-5 pb-7 pt-24">
              <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
                <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d98a50]">
                      Rocket3Dev
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
                      {language === "el" ? "Πλοήγηση" : "Navigation"}
                    </p>
                  </div>

                  <div
                    className="flex rounded-full border border-white/10 bg-white/[0.06] p-1"
                    role="group"
                    aria-label={
                      language === "el" ? t.switchToEnglish : t.switchToGreek
                    }
                  >
                    {(["el", "en"] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => changeLanguage(code)}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                          language === code
                            ? "bg-[#d98a50] text-[#0b2136] shadow-sm"
                            : "text-white/55 hover:text-white"
                        }`}
                        aria-pressed={language === code}
                      >
                        {code === "el" ? "ΕΛ" : "EN"}
                      </button>
                    ))}
                  </div>
                </div>

                <ul className="grid gap-1">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);

                    return (
                      <li
                        key={item.href}
                        className="mobile-menu-item"
                        style={{
                          transitionDelay: open ? `${80 + index * 48}ms` : "0ms",
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={(event) =>
                            handleSectionClick(event, item.href)
                          }
                          className={`group flex min-h-16 items-center gap-4 rounded-2xl px-3 py-3 transition-all duration-300 ${
                            isActive
                              ? "bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                              : "text-white/72 hover:bg-white/[0.055] hover:text-white"
                          }`}
                          aria-current={isActive ? "location" : undefined}
                        >
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[11px] font-bold transition-all ${
                              isActive
                                ? "border-[#d98a50] bg-[#d98a50] text-[#0b2136]"
                                : "border-white/12 bg-white/[0.035] text-white/45 group-hover:border-white/20 group-hover:text-white/70"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-left text-xl font-semibold tracking-tight">
                            {t.nav[item.id]}
                          </span>
                          <span
                            className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 ${
                              isActive
                                ? "border-[#d98a50]/40 bg-[#d98a50]/10 text-[#d98a50]"
                                : "border-white/10 text-white/35 group-hover:translate-x-0.5 group-hover:border-white/20 group-hover:text-white"
                            }`}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto pt-7">
                  <a
                    href="#contact"
                    onClick={(event) => handleSectionClick(event, "#contact")}
                    className="group flex min-h-14 w-full items-center justify-between rounded-2xl bg-[#d98a50] px-5 py-4 font-bold text-[#0b2136] shadow-[0_16px_40px_rgba(217,138,80,0.2)] transition-all active:scale-[0.985]"
                  >
                    <span>{t.startProject}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2136] text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>

                  <div className="mt-5 flex items-center justify-between text-[11px] text-white/38">
                    <span>rocket3devs@gmail.com</span>
                    <span>
                      {language === "el"
                        ? "Ηράκλειο, Κρήτη"
                        : "Heraklion, Crete"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative scroll-mt-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(224,151,89,0.25), transparent 25%), radial-gradient(circle at 12% 88%, rgba(127,166,187,0.30), transparent 34%), linear-gradient(135deg, #07182a 0%, #0b2136 42%, #24445f 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-[#7898aa]/20 hero-orbit" />
          <div className="absolute right-8 top-12 h-[280px] w-[280px] rounded-full border border-[#c97745]/15 hero-orbit" />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 760"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="trailGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7898aa" stopOpacity="0" />
                <stop offset="45%" stopColor="#91adba" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#c97745" stopOpacity="0.88" />
              </linearGradient>
            </defs>
            <path
              d="M-120 650 C 250 430, 540 560, 790 350 S 1180 80, 1540 170"
              fill="none"
              stroke="url(#trailGradient)"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="rocket-trail"
            />
            <path
              d="M80 740 C 420 520, 680 700, 950 470 S 1280 260, 1510 320"
              fill="none"
              stroke="#7898aa"
              strokeOpacity="0.22"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="rocket-trail-slow"
            />
            <path
              d="M940 70 C 1110 160, 1160 290, 1070 410 C 1010 490, 1110 585, 1420 620"
              fill="none"
              stroke="#c97745"
              strokeOpacity="0.17"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="rocket-trail-slow"
            />
          </svg>

          <div className="hero-rocket absolute right-[10%] top-[18%] hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm lg:block">
            <Rocket className="h-20 w-20 text-[#d98a50] drop-shadow-[0_10px_25px_rgba(224,151,89,0.35)]" />
          </div>
          <div className="absolute right-[6%] top-[48%] hidden text-[220px] font-black leading-none text-white/[0.025] lg:block">
            3
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-20 md:pb-40 md:pt-32">
          <div className="max-w-3xl animate-fade-up text-center sm:text-left">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#c97745]/35 bg-white/5 px-3 py-1 text-xs font-medium text-[#d4e0e3] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c97745] shadow-[0_0_12px_rgba(224,151,89,0.9)]" />
              {t.hero.eyebrow}
            </div>
            <h1 className="text-[clamp(2.35rem,11vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              {t.hero.titleBefore}{" "}
              <span className="text-[#d98a50]">{t.hero.titleHighlight}</span>{" "}
              {t.hero.titleAfter}
            </h1>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href="#contact"
                onClick={(event) => handleSectionClick(event, "#contact")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#c97745] px-6 py-3.5 sm:w-auto sm:py-3 font-semibold text-[#0b2136] shadow-[0_12px_35px_rgba(224,151,89,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.98]"
              >
                {t.hero.primaryButton} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#services"
                onClick={(event) => handleSectionClick(event, "#services")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#7898aa]/50 bg-white/5 px-6 py-3.5 sm:w-auto sm:py-3 font-medium text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
              >
                {t.hero.secondaryButton}
              </a>
            </div>

            {/* Mobile/tablet rocket — kept inside the hero flow so it never covers text or buttons */}
            <div
              className="mt-9 flex justify-center sm:justify-end sm:pr-8 lg:hidden"
              aria-hidden="true"
            >
              <div className="hero-rocket rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.24)] backdrop-blur-sm">
                <Rocket className="h-12 w-12 text-[#d98a50] drop-shadow-[0_10px_25px_rgba(224,151,89,0.4)] sm:h-14 sm:w-14" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
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
          <div
            data-reveal
            className="grid gap-7 sm:gap-9 md:grid-cols-[0.9fr_1.1fr] md:items-start"
          >
            <div className="relative overflow-hidden rounded-2xl bg-[#0b2136] p-6 text-white shadow-[0_22px_60px_rgba(11,33,54,0.18)] sm:rounded-3xl sm:p-8 md:p-10">
              <div className="ambient-blob absolute -right-12 -top-10 h-40 w-44 border border-[#7898aa]/18" />
              <div
                className="ambient-tile absolute right-5 top-20 h-16 w-16 rounded-2xl border border-[#c97745]/18"
                style={{ animationDelay: "-5s" }}
              />
              <Rocket className="absolute bottom-7 right-7 h-24 w-24 rotate-12 text-white/[0.05]" />
              <p className="section-kicker section-kicker-dark relative">
                {t.about.kicker}
              </p>
              <h2 className="relative mt-4 text-2xl font-bold leading-tight sm:text-4xl">
                <HighlightText
                  text={t.about.heading}
                  highlights={
                    language === "el"
                      ? ["Άμεση επικοινωνία"]
                      : ["Clear communication"]
                  }
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
                {[
                  "Aristotelis Moulas",
                  "Giannis Zaroliagkis",
                  "Thodoris Nickaris",
                ].map((name) => (
                  <div
                    key={name}
                    className="group flex items-center gap-3 rounded-xl border border-[#153351]/10 bg-[#f1f4f4]/90 p-3 shadow-sm transition-all hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md sm:block sm:p-4"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#153351] text-white transition-transform group-hover:scale-105">
                      {name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 sm:mt-3">
                      <p className="truncate text-sm font-semibold text-[#0b2136] sm:whitespace-normal">
                        {name}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-[#31526e] sm:text-xs">
                        {t.about.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
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

      {/* Portfolio */}
      <section
        ref={portfolioSectionRef}
        id="portfolio"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#dfe7e9_0%,#e9eef0_100%)]"
      >
        <div className="ambient-ring pointer-events-none absolute -left-7 top-[20%] h-20 w-20 rounded-full border border-[#7898aa]/16" />
        <div
          className="ambient-dot-reverse pointer-events-none absolute right-[9%] top-[13%] h-3.5 w-3.5 rounded-full bg-[#c97745]/34"
          style={{ animationDelay: "-4s" }}
        />
        <div className="ambient-blob pointer-events-none absolute bottom-[8%] right-[3%] h-24 w-28 border border-[#153351]/8" />

        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
          <div
            data-reveal
            className="mb-9 grid gap-4 sm:mb-12 md:grid-cols-[1fr_0.85fr] md:items-end md:gap-10"
          >
            <div>
              <p className="section-kicker">{t.portfolio.kicker}</p>
              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                {t.portfolio.heading}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-base">
              {t.portfolio.description}
            </p>
          </div>

          <div
            className={`grid gap-5 lg:items-stretch lg:transition-[grid-template-columns] lg:duration-500 lg:ease-out ${
              activePortfolioIndex === 0
                ? "lg:grid-cols-[1.35fr_0.85fr]"
                : "lg:grid-cols-[0.85fr_1.35fr]"
            }`}
          >
            {t.portfolio.items.map((p, index) => {
              const isActive = activePortfolioIndex === index;

              return (
                <article
                  key={p.title}
                  className={`group relative overflow-hidden rounded-[1.75rem] transition-all duration-500 sm:p-7 lg:p-8 ${
                    isActive
                      ? "border border-white/10 bg-[#0b2136] p-5 text-white shadow-[0_24px_70px_rgba(11,33,54,0.18)]"
                      : "border border-[#153351]/10 bg-[#f1f4f4] p-5 shadow-[0_14px_42px_rgba(11,33,54,0.08)] hover:-translate-y-1 hover:border-[#c97745]/42 hover:shadow-[0_20px_48px_rgba(11,33,54,0.12)] lg:min-h-[430px]"
                  }`}
                >
                  {!isActive && (
                    <button
                      type="button"
                      onClick={() => setActivePortfolioIndex(index)}
                      aria-label={
                        language === "el"
                          ? `Προβολή ${p.title}`
                          : `View ${p.title}`
                      }
                      className="absolute inset-0 z-20 cursor-pointer rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c97745]/70 focus-visible:ring-inset"
                    >
                      <span className="sr-only">
                        {language === "el"
                          ? `Προβολή ${p.title}`
                          : `View ${p.title}`}
                      </span>
                    </button>
                  )}
                  {isActive ? (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(217,138,80,0.18),transparent_26%),radial-gradient(circle_at_8%_90%,rgba(120,152,170,0.18),transparent_30%)]" />
                      <div className="ambient-ring pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10" />
                      <span className="pointer-events-none absolute right-5 top-2 text-[7rem] font-black leading-none text-white/[0.035] sm:text-[9rem]">
                        0{index + 1}
                      </span>

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full border border-[#d98a50]/25 bg-[#d98a50]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e6a36d]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d98a50] shadow-[0_0_10px_rgba(217,138,80,0.8)]" />
                            {p.tag}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold text-white/65">
                            {p.href
                              ? t.portfolio.liveDemo
                              : t.portfolio.comingSoon}
                          </span>
                        </div>

                        <div className="mt-7 max-w-xl sm:mt-9">
                          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {p.title}
                          </h3>
                          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/62 sm:text-base">
                            {p.desc}
                          </p>
                          <div className="mt-5 flex flex-wrap gap-2">
                            {p.features.map((feature) => (
                              <span
                                key={feature}
                                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-white/62"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#07182a] p-2.5 shadow-[0_18px_45px_rgba(0,0,0,0.22)] sm:p-3">
                          <div className="mb-2.5 flex items-center gap-1.5 px-1">
                            <span className="h-2 w-2 rounded-full bg-[#d98a50]" />
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="h-2 w-2 rounded-full bg-white/12" />
                            <span className="ml-2 h-4 flex-1 rounded-full bg-white/[0.055]" />
                          </div>

                          {p.href && isActive && portfolioPreviewReady ? (
                            <div className="relative h-[230px] overflow-hidden rounded-xl bg-white sm:h-[300px] lg:h-[330px]">
                              <iframe
                                src={`${p.href}?preview=1`}
                                title={`${p.title} interactive preview`}
                                loading="lazy"
                                allow="autoplay; fullscreen"
                                className="absolute left-0 top-0 h-[720px] w-[312.5%] origin-top-left scale-[0.32] border-0 bg-white sm:w-[240%] sm:scale-[0.4167] lg:w-[218.2%] lg:scale-[0.4583]"
                              />
                            </div>
                          ) : (
                            <div className="grid min-h-[150px] grid-cols-[0.38fr_1fr] gap-2 overflow-hidden rounded-xl bg-[#102d48] p-3 sm:min-h-[180px] sm:grid-cols-[0.3fr_1fr] sm:p-4">
                              <div className="rounded-lg border border-white/8 bg-white/[0.035] p-2.5">
                                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#d98a50] text-[#0b2136]">
                                  <p.icon className="h-[18px] w-[18px]" />
                                </div>
                                <div className="mt-4 space-y-2">
                                  <div className="h-2 rounded-full bg-white/15" />
                                  <div className="h-2 w-3/4 rounded-full bg-white/8" />
                                  <div className="h-2 w-4/5 rounded-full bg-white/8" />
                                </div>
                              </div>
                              <div className="grid gap-2.5 sm:grid-cols-2">
                                <div className="flex flex-col justify-between rounded-lg border border-white/8 bg-white/[0.04] p-3 sm:col-span-2">
                                  <div className="h-2.5 w-24 rounded-full bg-[#d98a50]/70" />
                                  <div className="mt-3 h-3 w-4/5 rounded-full bg-white/16" />
                                  <div className="mt-2 h-2 w-3/5 rounded-full bg-white/8" />
                                </div>
                                <div className="rounded-lg border border-white/8 bg-white/[0.035] p-3">
                                  <div className="h-10 rounded-md bg-[#d98a50]/12" />
                                  <div className="mt-2 h-2 w-3/4 rounded-full bg-white/10" />
                                </div>
                                <div className="rounded-lg border border-white/8 bg-white/[0.035] p-3">
                                  <div className="h-10 rounded-md bg-[#7898aa]/14" />
                                  <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {p.href ? (
                          <a
                            href={p.href}
                            className="mt-6 inline-flex min-h-12 w-full items-center justify-between rounded-xl bg-[#d98a50] px-4 py-3 font-semibold text-[#0b2136] transition-all hover:-translate-y-0.5 hover:bg-[#e6a36d] active:scale-[0.99] sm:w-fit sm:min-w-[190px]"
                          >
                            <span>{t.portfolio.openDemo}</span>
                            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        ) : (
                          <div className="mt-6 inline-flex min-h-12 w-full cursor-default items-center justify-between rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 font-semibold text-white/62 sm:w-fit sm:min-w-[190px]">
                            <span>{t.portfolio.comingSoon}</span>
                            <Coffee className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="pointer-events-none absolute right-5 top-2 text-[6rem] font-black leading-none text-[#153351]/[0.035] sm:text-[8rem]">
                        0{index + 1}
                      </span>
                      <div className="ambient-blob pointer-events-none absolute -bottom-10 -right-12 h-40 w-44 border border-[#c97745]/12" />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] font-bold uppercase tracking-[0.17em] text-[#95543b]">
                            {p.tag}
                          </span>
                          <span className="rounded-full border border-[#153351]/10 bg-[#dfe7e9] px-3 py-1.5 text-[11px] font-semibold text-[#31526e]">
                            {p.href
                              ? t.portfolio.liveDemo
                              : t.portfolio.comingSoon}
                          </span>
                        </div>

                        <div className="mt-10 grid h-20 w-20 place-items-center rounded-2xl bg-[#153351] text-[#d98a50] shadow-[0_14px_32px_rgba(11,33,54,0.18)] transition-transform duration-300 group-hover:-rotate-4 group-hover:scale-105 sm:h-24 sm:w-24">
                          <p.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                        </div>

                        <h3 className="mt-7 text-2xl font-bold tracking-tight text-[#0b2136]">
                          {p.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {p.desc}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.features.map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-[#153351]/9 bg-[#e5ebed] px-3 py-1.5 text-xs font-medium text-[#31526e]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-8">
                          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(21,51,81,0.12),transparent)]" />
                          <p className="mt-4 text-xs font-medium leading-relaxed text-[#31526e]/75">
                            {language === "el"
                              ? "Πατήστε για προβολή του project."
                              : "Select to view this project."}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="relative overflow-hidden bg-[#e9eef0]">
        <div className="ambient-blob pointer-events-none absolute left-[3%] top-[13%] h-24 w-28 border border-[#153351]/9" />
        <div className="ambient-ring-reverse pointer-events-none absolute left-[11%] bottom-[19%] h-11 w-11 rounded-full border border-[#7898aa]/16" />
        <div className="ambient-dot-reverse pointer-events-none absolute right-[7%] top-[30%] h-4 w-4 rounded-full bg-[#c97745]/28" />
        <div
          className="ambient-dot pointer-events-none absolute bottom-[12%] left-[18%] h-3 w-3 rounded-full bg-[#7898aa]/40"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="ambient-dot pointer-events-none absolute right-[21%] top-[13%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/42"
          style={{ animationDelay: "-2s" }}
        />
        <div
          className="ambient-tile pointer-events-none absolute bottom-[13%] right-[14%] h-8 w-8 rounded-xl border border-[#c97745]/14 bg-[#dfe7e9]/25"
          style={{ animationDelay: "-3s" }}
        />
        <div
          data-reveal
          className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24"
        >
          <div className="mb-9 max-w-2xl sm:mb-12 md:mb-14">
            <p className="section-kicker">{t.reasons.kicker}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              {t.reasons.heading}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {t.reasons.items.map((r) => (
              <div
                key={r.title}
                className="group flex min-h-16 items-center gap-3 rounded-lg border border-[#153351]/10 bg-[#f1f4f4] p-4 sm:items-start sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c97745]/60 hover:shadow-md"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#c97745]/15 text-[#95543b] transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <r.icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium">{r.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden bg-[linear-gradient(180deg,#e9eef0_0%,#dfe7e9_100%)]"
      >
        <div className="ambient-blob pointer-events-none absolute right-[5%] top-[11%] h-24 w-28 border border-[#7898aa]/18" />
        <div className="ambient-ring pointer-events-none absolute right-[14%] bottom-[16%] h-12 w-12 rounded-full border border-[#c97745]/15" />
        <div className="ambient-dot-reverse pointer-events-none absolute bottom-[10%] left-[6%] h-4 w-4 rounded-full bg-[#c97745]/25" />
        <div className="ambient-dot pointer-events-none absolute left-[14%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#7898aa]/44" />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1040 30 C 1210 120, 1170 260, 1340 350 S 1470 520, 1390 650"
            fill="none"
            stroke="#7898aa"
            strokeOpacity="0.14"
            strokeWidth="1.5"
            className="ambient-path-reverse"
          />
        </svg>
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:py-24">
          <div data-reveal className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <p className="section-kicker">{t.contact.kicker}</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                {t.contact.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
                {t.contact.description}
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-[#31526e]" />
                  <span className="break-all">rocket3devs@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-[#31526e]" />
                  <span>{t.contact.location}</span>
                </div>
              </div>
            </div>
            <form
              action="https://formsubmit.co/rocket3devs@gmail.com"
              method="POST"
              className="rounded-xl border border-[#153351]/10 bg-[#f1f4f4] p-5 sm:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t.contact.name}
                  </label>
                  <input
                    id="contact-name"
                    required
                    name="name"
                    autoComplete="name"
                    className="w-full min-h-12 rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:min-h-0 sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t.contact.email}
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full min-h-12 rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:min-h-0 sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-md border border-[#153351]/15 bg-[#e8edef] px-3 py-3 text-base sm:py-2.5 sm:text-sm outline-none transition-colors focus:border-[#c97745]"
                  />
                </div>
                <input
                  type="hidden"
                  name="_subject"
                  value={t.contact.subject}
                />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <button
                  type="submit"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#c97745] px-6 py-3.5 font-semibold text-[#0b2136] transition-all hover:-translate-y-0.5 hover:bg-[#d98a50] active:scale-[0.99]"
                >
                  {t.contact.send}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#7898aa]/20 bg-[#0b2136] text-white/70">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-center sm:text-left">
            <div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-white/10 text-[#c97745]">
                  <Rocket className="h-4 w-4" />
                </span>
                Rocket3Dev
              </div>
              <p className="mt-1.5 text-xs">{t.footer.location}</p>
            </div>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:justify-end">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(event) => handleSectionClick(event, n.href)}
                    className="transition-colors hover:text-white"
                  >
                    {t.nav[n.id]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-center text-[11px] sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} Rocket3Dev. {t.footer.rights}
            </p>
            <p>{t.footer.builtBy}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
