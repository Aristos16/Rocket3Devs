import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { Map as LeafletMap } from "leaflet";

import { useIsScrolled } from "../hooks/use-is-scrolled";
import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";
import "../styles/coffee-demo.css";

export const Route = createFileRoute("/coffee-demo")({
  head: () => ({
    meta: [
      { title: "Brewhaus Coffee | Crafted with Intention" },
      {
        name: "description",
        content: "A minimalist coffee shop demo with a full menu, story, and interactive map.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: CoffeeDemo,
});

type MenuItem = {
  name: string;
  category: string;
  description: string;
  price: string;
  popular: boolean;
};

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Menu", id: "menu" },
  { name: "About", id: "about" },
  { name: "Visit", id: "visit" },
];

const features = [
  {
    title: "Ethically Sourced",
    desc: "Direct trade beans from sustainable farms.",
  },
  {
    title: "Roasted In-House",
    desc: "Freshly roasted weekly in our custom facility.",
  },
  {
    title: "Expert Baristas",
    desc: "Trained in the art and science of coffee.",
  },
];

const categories = ["All", "Espresso", "Filter", "Pastries", "Seasonal"];

const menuItems: MenuItem[] = [
  {
    name: "Flat White",
    category: "Espresso",
    description: "Double shot with velvety microfoam.",
    price: "$4.50",
    popular: true,
  },
  {
    name: "Cappuccino",
    category: "Espresso",
    description: "Rich espresso with airy milk foam.",
    price: "$4.00",
    popular: false,
  },
  {
    name: "Latte",
    category: "Espresso",
    description: "Smooth espresso with steamed milk.",
    price: "$4.50",
    popular: false,
  },
  {
    name: "Macchiato",
    category: "Espresso",
    description: "Espresso marked with a dollop of foam.",
    price: "$3.50",
    popular: true,
  },
  {
    name: "Espresso",
    category: "Espresso",
    description: "Single-origin, pulled to perfection.",
    price: "$3.00",
    popular: false,
  },
  {
    name: "Pour Over",
    category: "Filter",
    description: "Single-origin, hand-poured to order.",
    price: "$5.00",
    popular: true,
  },
  {
    name: "Cold Brew",
    category: "Filter",
    description: "18-hour steep for smooth sweetness.",
    price: "$5.00",
    popular: false,
  },
  {
    name: "AeroPress",
    category: "Filter",
    description: "Clean, bright, and full of character.",
    price: "$4.50",
    popular: false,
  },
  {
    name: "Croissant",
    category: "Pastries",
    description: "Buttery, flaky, baked fresh daily.",
    price: "$3.50",
    popular: false,
  },
  {
    name: "Banana Bread",
    category: "Pastries",
    description: "Warm, moist, served with honey butter.",
    price: "$4.00",
    popular: true,
  },
  {
    name: "Brownie",
    category: "Pastries",
    description: "Dark chocolate, sea salt, fudgy center.",
    price: "$3.50",
    popular: false,
  },
  {
    name: "Pumpkin Spice Latte",
    category: "Seasonal",
    description: "Warm spices, real pumpkin, espresso.",
    price: "$5.50",
    popular: true,
  },
  {
    name: "Iced Maple Latte",
    category: "Seasonal",
    description: "Cold brew with maple and oat milk.",
    price: "$5.50",
    popular: false,
  },
  {
    name: "Chai Latte",
    category: "Seasonal",
    description: "House-spiced, steamed oat milk.",
    price: "$5.00",
    popular: false,
  },
];

const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48" fill="none"><path d="M20 0C9 0 0 9 0 20c0 15 20 28 20 28s20-13 20-28C40 9 31 0 20 0z" fill="#4A703C"/><circle cx="20" cy="20" r="7" fill="#FDFCFA"/></svg>`;

function CoffeeDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mapRequested, setMapRequested] = useState(false);
  const scrolled = useIsScrolled(20);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useRevealOnScroll(rootRef, {
    selector: ".coffee-reveal",
    visibleClass: "is-visible",
    threshold: 0.1,
  });

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const isEmbeddedPreview = new URLSearchParams(window.location.search).get("preview") === "1";

    if (isEmbeddedPreview) {
      document.documentElement.classList.add("coffee-demo-preview");
      document.body.classList.add("coffee-demo-preview");
    }

    return () => {
      document.documentElement.classList.remove("coffee-demo-preview");
      document.body.classList.remove("coffee-demo-preview");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let createdMap: LeafletMap | null = null;

    async function initializeMap() {
      const mapElement = mapRef.current;
      if (!mapElement || mapInstanceRef.current) return;

      try {
        const L = await import("leaflet");
        await import("leaflet/dist/leaflet.css");

        const currentMapElement = mapRef.current;
        if (cancelled || !currentMapElement) return;

        const icon = L.icon({
          iconUrl: `data:image/svg+xml,${encodeURIComponent(markerSvg)}`,
          iconSize: [40, 48],
          iconAnchor: [20, 48],
          popupAnchor: [0, -48],
        });

        createdMap = L.map(currentMapElement, {
          center: [35.3387, 25.1442],
          zoom: 15,
          scrollWheelZoom: false,
          zoomControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OSM</a>',
          maxZoom: 19,
        }).addTo(createdMap);

        L.marker([35.3387, 25.1442], { icon })
          .addTo(createdMap)
          .bindPopup("<strong>Brewhaus</strong><br/>25 Avgoustou Street<br/>Heraklion, Crete");

        mapInstanceRef.current = createdMap;
      } catch (error) {
        console.error("Could not load the coffee demo map", error);
      }
    }

    if (!mapRequested) return;

    void initializeMap();

    return () => {
      cancelled = true;
      if (createdMap) createdMap.remove();
      mapInstanceRef.current = null;
    };
  }, [mapRequested]);

  function scrollToSection(event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    event.stopPropagation();

    const section = document.getElementById(sectionId);
    if (!section) return;

    const navHeight = navbarRef.current?.getBoundingClientRect().height ?? 0;
    const target = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div ref={rootRef} className="coffee-demo">
      <nav ref={navbarRef} className={`coffee-navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="coffee-container coffee-nav-container">
          <a
            href="#home"
            className="coffee-logo"
            onClick={(event) => scrollToSection(event, "home")}
          >
            Brewhaus
          </a>

          <ul className="coffee-nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(event) => scrollToSection(event, link.id)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#menu"
            className="coffee-btn coffee-btn-primary coffee-nav-cta"
            onClick={(event) => scrollToSection(event, "menu")}
          >
            Order Now
          </a>

          <button
            type="button"
            className="coffee-mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        <div className={`coffee-mobile-menu ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => scrollToSection(event, link.id)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#menu"
            className="coffee-btn coffee-btn-primary"
            onClick={(event) => scrollToSection(event, "menu")}
          >
            Order Now
          </a>
        </div>
      </nav>

      <main>
        <section id="home" className="coffee-hero">
          <div className="coffee-container coffee-hero-grid">
            <div className="coffee-hero-content coffee-reveal">
              <span className="coffee-eyebrow">Welcome to Brewhaus</span>
              <h1>
                Crafted Coffee,
                <br />
                <span className="coffee-accent-text">Minimalist Soul</span>
              </h1>
              <p>
                Sourced from the finest farms, roasted in-house, and served in a space designed for
                you to slow down.
              </p>
              <div className="coffee-hero-actions">
                <a
                  href="#menu"
                  className="coffee-btn coffee-btn-primary"
                  onClick={(event) => scrollToSection(event, "menu")}
                >
                  Explore Menu
                </a>
                <a
                  href="#about"
                  className="coffee-btn coffee-btn-outline"
                  onClick={(event) => scrollToSection(event, "about")}
                >
                  Our Story
                </a>
              </div>
            </div>

            <div className="coffee-hero-image-wrap coffee-reveal">
              <div className="coffee-hero-image-bg" />
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=82"
                alt="Coffee being poured"
                className="coffee-hero-image"
                width={800}
                height={550}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="coffee-features-strip">
          <div className="coffee-container coffee-features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="coffee-feature-item coffee-reveal"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <h2>{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="menu" className="coffee-menu-section">
          <div className="coffee-container">
            <div className="coffee-section-header coffee-reveal">
              <span className="coffee-eyebrow">Our Offerings</span>
              <h2 className="coffee-section-title">The Menu</h2>
              <p className="coffee-section-subtitle">
                Every drink made to order with precision and care.
              </p>
            </div>

            <div className="coffee-menu-tabs coffee-reveal">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`coffee-menu-tab ${activeCategory === category ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="coffee-menu-items">
              {filteredItems.map((item) => (
                <div className="coffee-menu-item" key={item.name}>
                  <div className="coffee-menu-item-info">
                    <div className="coffee-menu-item-head">
                      <span className="coffee-menu-item-name">{item.name}</span>
                      {item.popular && <span className="coffee-popular-badge">Popular</span>}
                    </div>
                    <p className="coffee-menu-item-desc">{item.description}</p>
                  </div>
                  <span className="coffee-menu-item-price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="coffee-about-section">
          <div className="coffee-container coffee-about-grid">
            <div className="coffee-about-image-wrap coffee-reveal">
              <img
                src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=82"
                alt="Cafe interior"
                width={800}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="coffee-about-content coffee-reveal">
              <span className="coffee-eyebrow">Our Philosophy</span>
              <h2 className="coffee-section-title">Brewed with Intention</h2>
              <p>
                At Brewhaus, we believe that great coffee doesn&apos;t need to be complicated. We
                focus on the essentials: high-quality beans, precise extraction, and a welcoming
                space.
              </p>
              <p>
                Our minimalist approach extends to our cafes—clean lines, natural light, and plenty
                of room to think. We&apos;re not just serving coffee; we&apos;re cultivating a
                moment of pause.
              </p>
              <a
                href="#visit"
                className="coffee-btn coffee-btn-primary coffee-about-button"
                onClick={(event) => scrollToSection(event, "visit")}
              >
                Visit Us
              </a>
            </div>
          </div>
        </section>

        <section id="visit" className="coffee-map-section">
          <div className="coffee-container">
            <div className="coffee-map-grid">
              <div className="coffee-map-info coffee-reveal">
                <span className="coffee-eyebrow">Visit Us</span>
                <h2 className="coffee-section-title">Find Brewhaus</h2>
                <div className="coffee-info-block">
                  <h3>Address</h3>
                  <p>
                    25 Avgoustou Street
                    <br />
                    Heraklion, Crete
                  </p>
                </div>
                <div className="coffee-info-block">
                  <h3>Hours</h3>
                  <p>
                    Mon – Fri: 7am – 5pm
                    <br />
                    Sat – Sun: 8am – 3pm
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=25+Avgoustou+Street+Heraklion+Crete"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coffee-btn coffee-btn-primary coffee-map-button"
                >
                  Open in Maps
                </a>
              </div>

              <div
                className="coffee-map-wrap coffee-reveal"
                onMouseEnter={() => mapInstanceRef.current?.scrollWheelZoom.enable()}
                onMouseLeave={() => mapInstanceRef.current?.scrollWheelZoom.disable()}
              >
                <div ref={mapRef} className="coffee-map-container" />
                {!mapRequested && (
                  <button
                    type="button"
                    className="coffee-map-overlay"
                    onClick={() => setMapRequested(true)}
                  >
                    <svg
                      className="coffee-map-overlay-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Press to load the map</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="coffee-footer">
        <div className="coffee-container">
          <div className="coffee-footer-bottom">
            <p>© {new Date().getFullYear()} Brewhaus Coffee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
