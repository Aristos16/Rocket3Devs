import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

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

type LeafletIconOptions = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
};

type LeafletIcon = {
  options?: unknown;
};

type LeafletMapOptions = {
  center: [number, number];
  zoom: number;
  scrollWheelZoom: boolean;
  zoomControl: boolean;
};

type LeafletMap = {
  remove: () => void;
  scrollWheelZoom: {
    enable: () => void;
    disable: () => void;
  };
};

type LeafletTileOptions = {
  attribution: string;
  maxZoom: number;
};

type LeafletLayer = {
  addTo: (map: LeafletMap) => LeafletLayer;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker & { bindPopup: (html: string) => unknown };
};

type LeafletLib = {
  icon: (options: LeafletIconOptions) => LeafletIcon;
  map: (element: HTMLElement, options: LeafletMapOptions) => LeafletMap;
  tileLayer: (url: string, options: LeafletTileOptions) => LeafletLayer;
  marker: (position: [number, number], options: { icon: LeafletIcon }) => LeafletMarker;
};

function getLeaflet(): LeafletLib | undefined {
  return (window as Window & { L?: LeafletLib }).L;
}

function loadLeaflet(): Promise<LeafletLib> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  const existing = getLeaflet();
  if (existing) return Promise.resolve(existing);

  if (!document.getElementById("coffee-leaflet-css")) {
    const link = document.createElement("link");
    link.id = "coffee-leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }

  return new Promise((resolve, reject) => {
    const oldScript = document.getElementById("coffee-leaflet-script") as HTMLScriptElement | null;

    if (oldScript) {
      oldScript.addEventListener(
        "load",
        () => {
          const leaflet = getLeaflet();
          if (leaflet) resolve(leaflet);
          else reject(new Error("Leaflet failed to load"));
        },
        { once: true },
      );
      oldScript.addEventListener("error", () => reject(new Error("Leaflet failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "coffee-leaflet-script";
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => {
      const leaflet = getLeaflet();
      if (leaflet) resolve(leaflet);
      else reject(new Error("Leaflet failed to load"));
    };
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.body.appendChild(script);
  });
}

function CoffeeDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mapRequested, setMapRequested] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

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

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 },
    );

    rootRef.current
      ?.querySelectorAll(".coffee-reveal")
      .forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.documentElement.classList.remove("coffee-demo-preview");
      document.body.classList.remove("coffee-demo-preview");
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let createdMap: LeafletMap | null = null;

    async function initializeMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      try {
        const L = await loadLeaflet();
        if (cancelled || !mapRef.current) return;

        const icon = L.icon({
          iconUrl: `data:image/svg+xml,${encodeURIComponent(markerSvg)}`,
          iconSize: [40, 48],
          iconAnchor: [20, 48],
          popupAnchor: [0, -48],
        });

        createdMap = L.map(mapRef.current, {
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

    const section = rootRef.current?.querySelector<HTMLElement>(`#${sectionId}`);
    if (!section) return;

    const navHeight =
      rootRef.current?.querySelector(".coffee-navbar")?.getBoundingClientRect().height ?? 0;
    const target = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;

    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div ref={rootRef} className="coffee-demo">
      <style>{coffeeStyles}</style>

      <nav className={`coffee-navbar ${scrolled ? "is-scrolled" : ""}`}>
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

// Demo CSS stays inline (route-scoped) on purpose, matching gym-demo. All
// rules are scoped under `.coffee-*` classes and the preview-root rules only
// target html/body while this route is mounted, so nothing leaks to the rest
// of the site.
const coffeeStyles = `
  html.coffee-demo-preview,
  body.coffee-demo-preview {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  html.coffee-demo-preview::-webkit-scrollbar,
  body.coffee-demo-preview::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  .coffee-demo {
    --coffee-bg: #fdfcfa;
    --coffee-surface: #f7f3ee;
    --coffee-surface-alt: #ede5db;
    --coffee-text: #5c5147;
    --coffee-text-muted: #786d62;
    --coffee-accent: #4a703c;
    --coffee-accent-hover: #7aa36e;
    --coffee-accent-soft: #daebd4;
    --coffee-border: #e8e0d6;
    --coffee-shadow-sm: 0 1px 3px rgba(92,81,71,.05);
    --coffee-shadow-md: 0 10px 15px -3px rgba(92,81,71,.05), 0 4px 6px -2px rgba(92,81,71,.03);
    --coffee-shadow-lg: 0 20px 25px -5px rgba(92,81,71,.06), 0 10px 10px -5px rgba(92,81,71,.02);
    --coffee-radius: 16px;
    min-height: 100vh;
    overflow-x: hidden;
    background: var(--coffee-bg);
    color: var(--coffee-text);
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  .coffee-demo *, .coffee-demo *::before, .coffee-demo *::after { box-sizing: border-box; }
  .coffee-demo h1, .coffee-demo h2, .coffee-demo h3, .coffee-demo h4 {
    margin: 0;
    font-family: "Playfair Display", Georgia, serif;
    font-weight: 600;
    letter-spacing: -.02em;
  }
  .coffee-demo p { margin: 0; }
  .coffee-demo a { color: inherit; text-decoration: none; }
  .coffee-demo button { font: inherit; }
  .coffee-demo img { display: block; max-width: 100%; }
  .coffee-container { width: min(100% - 4rem, 1200px); margin-inline: auto; }

  .coffee-navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(253,252,250,.78);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: background .3s ease, border-color .3s ease, box-shadow .3s ease;
  }
  .coffee-navbar.is-scrolled {
    background: rgba(253,252,250,.96);
    border-bottom-color: var(--coffee-border);
    box-shadow: var(--coffee-shadow-sm);
  }
  .coffee-nav-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    transition: height .3s ease;
  }
  .coffee-navbar.is-scrolled .coffee-nav-container { height: 64px; }
  .coffee-logo { font-family: "Playfair Display", serif; font-size: 1.6rem; font-weight: 700; }
  .coffee-nav-links { display: flex; gap: 2.5rem; margin: 0; padding: 0; list-style: none; }
  .coffee-nav-links a { position: relative; font-size: .95rem; font-weight: 500; transition: color .2s; }
  .coffee-nav-links a:hover { color: var(--coffee-accent); }
  .coffee-nav-links a::after {
    content: ""; position: absolute; left: 0; bottom: -4px; width: 0; height: 2px;
    background: var(--coffee-accent); transition: width .3s ease;
  }
  .coffee-nav-links a:hover::after { width: 100%; }
  .coffee-mobile-toggle { display: none; border: 0; background: transparent; color: var(--coffee-text); cursor: pointer; }
  .coffee-mobile-menu {
    display: none; flex-direction: column; gap: 1.5rem; max-height: 0; overflow: hidden;
    padding: 0 2rem; background: var(--coffee-bg); border-bottom: 1px solid var(--coffee-border);
    transition: max-height .3s ease, padding .3s ease;
  }
  .coffee-mobile-menu.is-open { max-height: 360px; padding: 2rem; }

  .coffee-btn {
    display: inline-flex; align-items: center; justify-content: center; padding: .9rem 2rem;
    border: 1px solid transparent; border-radius: 999px; cursor: pointer; font-size: .95rem;
    font-weight: 600; transition: transform .3s ease, background .3s ease, border-color .3s ease, color .3s ease, box-shadow .3s ease;
  }
  .coffee-btn-primary { background: var(--coffee-accent); color: #fff !important; }
  .coffee-btn-primary:hover { background: var(--coffee-accent-hover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(74,112,60,.22); }
  .coffee-btn-outline { border-color: var(--coffee-border); background: transparent; color: var(--coffee-text); }
  .coffee-btn-outline:hover { border-color: var(--coffee-accent); background: var(--coffee-accent-soft); color: var(--coffee-accent); }

  .coffee-reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
  .coffee-reveal.is-visible { opacity: 1; transform: translateY(0); }
  .coffee-eyebrow {
    display: inline-block; margin-bottom: 1rem; color: var(--coffee-accent); font-size: .875rem;
    font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
  }
  .coffee-section-title { margin-bottom: 1rem !important; font-size: clamp(2rem,4vw,3rem); }
  .coffee-section-subtitle { max-width: 500px; color: var(--coffee-text-muted); font-size: 1.1rem; }
  .coffee-section-header { margin-bottom: 2.5rem; text-align: center; }
  .coffee-section-header .coffee-section-subtitle { margin-inline: auto; }

  .coffee-hero { padding: 5rem 0 2rem; overflow: hidden; }
  .coffee-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .coffee-hero-content h1 { margin-bottom: 1.5rem; font-size: clamp(2.5rem,5vw,4rem); line-height: 1.1; }
  .coffee-accent-text { color: var(--coffee-accent); font-style: italic; }
  .coffee-hero-content > p { max-width: 500px; margin-bottom: 2.5rem; color: var(--coffee-text-muted); font-size: 1.2rem; }
  .coffee-hero-actions { display: flex; flex-wrap: wrap; gap: 1rem; }
  .coffee-hero-image-wrap { position: relative; height: 550px; border-radius: var(--coffee-radius); }
  .coffee-hero-image-bg { position: absolute; inset: 20px -20px -20px 20px; border-radius: var(--coffee-radius); background: var(--coffee-accent-soft); }
  .coffee-hero-image { position: relative; width: 100%; height: 100%; border-radius: var(--coffee-radius); object-fit: cover; box-shadow: var(--coffee-shadow-lg); }

  .coffee-features-strip { padding: 4rem 0; border-block: 1px solid var(--coffee-border); background: var(--coffee-surface); }
  .coffee-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; }
  .coffee-feature-item h2 { margin-bottom: .5rem; font-size: 1.2rem; }
  .coffee-feature-item p { color: var(--coffee-text-muted); font-size: .95rem; }

  .coffee-menu-section { padding: 6rem 0; background: var(--coffee-bg); }
  .coffee-menu-tabs { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-bottom: 3rem; }
  .coffee-menu-tab {
    padding: .6rem 1.5rem; border: 1px solid var(--coffee-border); border-radius: 999px;
    background: transparent; color: var(--coffee-text-muted); cursor: pointer; font-size: .9rem;
    font-weight: 500; transition: all .3s ease;
  }
  .coffee-menu-tab:hover { border-color: var(--coffee-accent); color: var(--coffee-accent); }
  .coffee-menu-tab.is-active { border-color: var(--coffee-accent); background: var(--coffee-accent); color: #fff; }
  .coffee-menu-items { display: flex; max-width: 680px; margin: 0 auto; flex-direction: column; gap: .25rem; }
  .coffee-menu-item {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem;
    padding: 1.25rem 1.5rem; border-radius: 12px; transition: background .3s ease;
  }
  .coffee-menu-item:hover { background: var(--coffee-surface); }
  .coffee-menu-item:not(:last-child) { border-bottom: 1px solid var(--coffee-border); }
  .coffee-menu-item-info { flex: 1; }
  .coffee-menu-item-head { display: flex; align-items: center; gap: .75rem; margin-bottom: .3rem; }
  .coffee-menu-item-name { font-family: "Playfair Display", serif; font-size: 1.15rem; font-weight: 600; }
  .coffee-popular-badge {
    padding: .15rem .6rem; border-radius: 999px; background: var(--coffee-accent-soft);
    color: var(--coffee-accent); font-size: .65rem; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;
  }
  .coffee-menu-item-desc { color: var(--coffee-text-muted); font-size: .9rem; }
  .coffee-menu-item-price { padding-top: .15rem; color: var(--coffee-text); font-size: 1.1rem; font-weight: 700; white-space: nowrap; }

  .coffee-about-section { padding: 6rem 0; border-block: 1px solid var(--coffee-border); background: var(--coffee-surface); }
  .coffee-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .coffee-about-image-wrap img { width: 100%; height: 500px; border-radius: var(--coffee-radius); object-fit: cover; box-shadow: var(--coffee-shadow-md); }
  .coffee-about-content { display: flex; flex-direction: column; }
  .coffee-about-content p { margin-bottom: 1.5rem; color: var(--coffee-text-muted); font-size: 1.1rem; }
  .coffee-about-button { align-self: flex-start; margin-top: 1rem; }

  .coffee-map-section { padding: 6rem 0; border-bottom: 1px solid var(--coffee-border); background: var(--coffee-surface); }
  .coffee-map-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .coffee-map-info { display: flex; flex-direction: column; gap: 1.5rem; }
  .coffee-map-info .coffee-eyebrow { margin-bottom: -.75rem; }
  .coffee-map-info .coffee-section-title { max-width: 300px; }
  .coffee-info-block h3 {
    margin-bottom: .4rem; color: var(--coffee-accent); font-family: "Inter",sans-serif;
    font-size: .8rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase;
  }
  .coffee-info-block p { color: var(--coffee-text); font-size: 1rem; line-height: 1.7; }
  .coffee-map-button { align-self: flex-start; }
  .coffee-map-wrap { position: relative; overflow: hidden; aspect-ratio: 4/3; border: 1px solid var(--coffee-border); border-radius: var(--coffee-radius); box-shadow: var(--coffee-shadow-lg); }
  .coffee-map-container { width: 100%; height: 100%; z-index: 1; }
  .coffee-map-container .leaflet-control-attribution { opacity: .55; font-size: .6rem; }
  .coffee-map-container .leaflet-control-zoom { display: none; }
  .coffee-map-overlay {
    position: absolute; inset: 0; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .9rem;
    background: linear-gradient(180deg, #e8e4df 0%, #d9d4ce 100%);
    color: #6b655f;
    border: none; cursor: pointer;
    transition: background .25s ease, color .25s ease;
  }
  .coffee-map-overlay:hover { background: linear-gradient(180deg, #e2ded8 0%, #d2ccc5 100%); color: #554f49; }
  .coffee-map-overlay:focus-visible { outline: 2px solid var(--coffee-accent); outline-offset: -2px; }
  .coffee-map-overlay-icon { width: 34px; height: 34px; opacity: .7; }
  .coffee-map-overlay span {
    font-family: "Inter", sans-serif; font-size: .85rem; font-weight: 600;
    letter-spacing: .04em; text-transform: uppercase;
  }

  .coffee-footer { padding: 2rem 0; background: var(--coffee-bg); }
  .coffee-footer-bottom { padding-top: 2rem; border-top: 1px solid var(--coffee-border); text-align: center; }
  .coffee-footer-bottom p { color: var(--coffee-text-muted); font-size: .85rem; }

  @media (max-width: 900px) {
    .coffee-hero-grid, .coffee-about-grid, .coffee-map-grid { grid-template-columns: 1fr; }
    .coffee-hero-image-wrap { height: 400px; margin-top: 2rem; }
    .coffee-features-grid { grid-template-columns: 1fr; gap: 2rem; }
    .coffee-map-grid { gap: 2rem; }
    .coffee-map-wrap { aspect-ratio: 16/10; }
  }
  @media (max-width: 768px) {
    .coffee-container { width: min(100% - 2rem, 1200px); }
    .coffee-nav-links, .coffee-nav-cta { display: none; }
    .coffee-mobile-toggle { display: block; }
    .coffee-mobile-menu { display: flex; }
    .coffee-hero { padding-top: 3.5rem; }
    .coffee-menu-section, .coffee-about-section, .coffee-map-section { padding: 4.5rem 0; }
  }
  @media (max-width: 600px) {
    .coffee-hero-image-wrap { height: 330px; }
    .coffee-hero-image-bg { inset: 12px -12px -12px 12px; }
    .coffee-hero-actions .coffee-btn { width: 100%; }
    .coffee-menu-item { padding: 1.1rem 0; }
    .coffee-menu-item-desc { padding-right: .5rem; }
    .coffee-about-image-wrap img { height: 360px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .coffee-demo *, .coffee-demo *::before, .coffee-demo *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
    .coffee-reveal { opacity: 1; transform: none; }
  }
`;
