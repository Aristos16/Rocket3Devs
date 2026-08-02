import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { useMenuOpen } from "../hooks/use-menu-open";
import { useRevealOnScroll } from "../hooks/use-reveal-on-scroll";
import { useVideoAutoplay } from "../hooks/use-video-autoplay";
import "../styles/gym-demo.css";

export const Route = createFileRoute("/gym-demo")({
  head: () => ({
    meta: [
      { title: "BlueCore Gym — Demo by Rocket3Dev" },
      {
        name: "description",
        content:
          "Demo ιστοσελίδας γυμναστηρίου με προγράμματα, συνδρομές, αξιολογήσεις, video και φόρμα επικοινωνίας.",
      },
    ],
  }),
  component: BlueCoreGymDemo,
});

const navLinks = [
  { href: "#home", label: "Αρχική" },
  { href: "#programs", label: "Προγράμματα" },
  { href: "#about", label: "Σχετικά" },
  { href: "#pricing", label: "Συνδρομές" },
  { href: "#reviews", label: "Αξιολογήσεις" },
  { href: "#contact", label: "Επικοινωνία" },
];

const trustItems = [
  { value: "06:00 – 23:00", label: "Καθημερινό ωράριο" },
  { value: "Δωρεάν", label: "Πρώτη δοκιμαστική προπόνηση" },
  { value: "10+", label: "Πιστοποιημένοι trainers" },
];

const programs = [
  {
    icon: "🏋️",
    title: "Μυϊκή ενδυνάμωση",
    description:
      "Προπόνηση με ελεύθερα βάρη και σύγχρονα μηχανήματα για δύναμη και μυϊκή ανάπτυξη.",
  },
  {
    icon: "🔥",
    title: "Cross Training",
    description:
      "Δυναμικές προπονήσεις υψηλής έντασης για αντοχή, ταχύτητα και καλύτερη φυσική κατάσταση.",
  },
  {
    icon: "🧘",
    title: "Yoga & Mobility",
    description: "Ασκήσεις για ευλυγισία, ισορροπία, κινητικότητα και καλύτερη αποκατάσταση.",
  },
];

const plans = [
  {
    name: "Basic",
    price: "25€",
    features: [
      "✓ Πρόσβαση στον χώρο οργάνων",
      "✓ Χρήση αποδυτηρίων",
      "✓ Δωρεάν αρχική αξιολόγηση",
      "✕ Ομαδικά προγράμματα",
    ],
    featured: false,
  },
  {
    name: "Unlimited",
    price: "39€",
    features: [
      "✓ Απεριόριστη πρόσβαση",
      "✓ Όλα τα ομαδικά προγράμματα",
      "✓ Πρόγραμμα προπόνησης",
      "✓ Μηνιαία αξιολόγηση",
    ],
    featured: true,
  },
  {
    name: "Personal",
    price: "69€",
    features: [
      "✓ Όλες οι παροχές Unlimited",
      "✓ Personal training",
      "✓ Εξατομικευμένο πρόγραμμα",
      "✓ Διατροφική καθοδήγηση",
    ],
    featured: false,
  },
];

const reviews = [
  {
    initials: "ΜΚ",
    name: "Μαρία Κ.",
    meta: "Μέλος για 8 μήνες",
    text: "«Πολύ καθαρός χώρος, σύγχρονα μηχανήματα και εξαιρετική καθοδήγηση από τους trainers.»",
  },
  {
    initials: "ΝΠ",
    name: "Νίκος Π.",
    meta: "Μέλος για 1 χρόνο",
    text: "«Τα ομαδικά προγράμματα έχουν πολλή ενέργεια και με βοήθησαν να αποκτήσω συνέπεια στην προπόνησή μου.»",
  },
  {
    initials: "ΕΔ",
    name: "Ελένη Δ.",
    meta: "Μέλος για 6 μήνες",
    text: "«Φιλικό περιβάλλον και πολύ καλή εξυπηρέτηση. Το πρόγραμμα προπόνησης προσαρμόστηκε ακριβώς στους στόχους μου.»",
  },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const emptyForm: FormData = { name: "", email: "", phone: "", message: "" };

function BlueCoreGymDemo() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [menuOpen, setMenuOpen] = useMenuOpen();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useRevealOnScroll(rootRef, {
    selector: ".reveal",
    visibleClass: "show",
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  });
  useVideoAutoplay(videoRef);

  useEffect(() => {
    const preview =
      window.self !== window.top ||
      new URLSearchParams(window.location.search).get("preview") === "1";

    if (preview) {
      document.documentElement.classList.add("bluecore-preview-root");
      document.body.classList.add("bluecore-preview-root");
    }

    return () => {
      document.documentElement.classList.remove("bluecore-preview-root");
      document.body.classList.remove("bluecore-preview-root");
    };
  }, []);

  function handleSectionClick(event: ReactMouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    event.stopPropagation();

    const target = document.getElementById(sectionId);
    if (!target) return;

    setMenuOpen(false);

    // Scroll only this demo document. scrollIntoView can also move the parent
    // Rocket3Dev page when the demo is rendered inside an iframe.
    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  }

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (video.preload === "none") {
        video.preload = "metadata";
        video.load();
      }
      void video.play().catch(() => {
        // Autoplay/play can be blocked by the browser. The control remains usable.
      });
    } else {
      video.pause();
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
    setFormData(emptyForm);
  }

  return (
    <div ref={rootRef} className="gym-demo-root">
      <header ref={headerRef} className="header">
        <div className="container navbar">
          <a href="#home" className="logo" onClick={(event) => handleSectionClick(event, "home")}>
            BLUE<span>CORE</span>
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={`navigation${menuOpen ? " active" : ""}`} aria-label="Κύρια πλοήγηση">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleSectionClick(event, link.href.slice(1))}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <p className="hero-label">BLUECORE GYM</p>

            <h1>
              Ξεπέρασε τα <span>όριά σου</span>
            </h1>

            <p className="hero-text">
              Σύγχρονος εξοπλισμός, έμπειροι trainers και προγράμματα που θα σε βοηθήσουν να
              πετύχεις κάθε στόχο.
            </p>

            <div className="hero-buttons">
              <a
                href="#pricing"
                className="button button-primary"
                onClick={(event) => handleSectionClick(event, "pricing")}
              >
                Ξεκίνα σήμερα
              </a>

              <a
                href="#programs"
                className="button button-secondary"
                onClick={(event) => handleSectionClick(event, "programs")}
              >
                Δες τα προγράμματα
              </a>
            </div>
          </div>
        </section>

        <section className="trust-bar" aria-label="Πληροφορίες γυμναστηρίου">
          <div className="container trust-grid">
            {trustItems.map((item, index) => (
              <div
                key={item.label}
                className="trust-item reveal"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section programs" id="programs">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-label">ΠΡΟΠΟΝΗΣΗ</p>
              <h2>Τα προγράμματά μας</h2>

              <p>Επίλεξε το πρόγραμμα που ταιριάζει στις ανάγκες και στους στόχους σου.</p>
            </div>

            <div className="program-grid">
              {programs.map((program, index) => (
                <article
                  key={program.title}
                  className="program-card reveal"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="program-icon">{program.icon}</div>

                  <h3>{program.title}</h3>

                  <p>{program.description}</p>

                  <a href="#contact" onClick={(event) => handleSectionClick(event, "contact")}>
                    Μάθε περισσότερα →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container about-grid">
            <div className="about-image reveal">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80"
                alt="Άτομο που γυμνάζεται στο γυμναστήριο"
              />
            </div>

            <div className="about-content reveal">
              <p className="section-label">ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ</p>

              <h2>Ένας χώρος σχεδιασμένος για κάθε στόχο</h2>

              <p>
                Στο BlueCore Gym πιστεύουμε ότι η συνέπεια και η σωστή καθοδήγηση μπορούν να φέρουν
                πραγματικά αποτελέσματα.
              </p>

              <p>
                Ο χώρος μας διαθέτει σύγχρονο εξοπλισμό και εξειδικευμένους trainers για αρχάριους
                και προχωρημένους.
              </p>

              <div className="about-stats">
                <div className="stat">
                  <strong>500+</strong> <span>Μέλη</span>
                </div>

                <div className="stat">
                  <strong>10+</strong> <span>Trainers</span>
                </div>

                <div className="stat">
                  <strong>20+</strong> <span>Προγράμματα</span>
                </div>
              </div>

              <a
                href="#contact"
                className="button button-primary"
                onClick={(event) => handleSectionClick(event, "contact")}
              >
                Επικοινώνησε μαζί μας
              </a>
            </div>
          </div>
        </section>

        <section className="section gym-video-section" id="experience">
          <div className="container video-grid">
            <div className="video-wrapper reveal">
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="none"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
              >
                <source src="/Videos/gym.mp4" type="video/mp4" />Ο browser σου δεν υποστηρίζει
                βίντεο.
              </video>

              <div className="video-overlay" />

              <button
                className="video-button"
                type="button"
                aria-label={videoPlaying ? "Παύση βίντεο" : "Αναπαραγωγή βίντεο"}
                onClick={toggleVideo}
              >
                {videoPlaying ? "Ⅱ" : "▶"}
              </button>

              <div className="video-label">BLUECORE EXPERIENCE</div>
            </div>

            <div className="video-content reveal">
              <p className="section-label">Η ΕΜΠΕΙΡΙΑ BLUECORE</p>

              <h2>Ένας χώρος που σε βοηθά να ξεπεράσεις τα όριά σου</h2>

              <p>
                Σύγχρονος επαγγελματικός εξοπλισμός, οργανωμένοι χώροι και εξειδικευμένοι trainers
                για κάθε επίπεδο προπόνησης.
              </p>

              <ul className="video-list">
                <li>Επαγγελματικός εξοπλισμός</li>
                <li>Καθαροί και σύγχρονοι χώροι</li>
                <li>Πιστοποιημένοι trainers</li>
                <li>Προγράμματα για κάθε επίπεδο</li>
              </ul>

              <a
                href="#contact"
                className="button button-primary"
                onClick={(event) => handleSectionClick(event, "contact")}
              >
                Κλείσε δωρεάν δοκιμή
              </a>
            </div>
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-label">ΣΥΝΔΡΟΜΕΣ</p>
              <h2>Διάλεξε το πακέτο σου</h2>

              <p>Ευέλικτα πακέτα συνδρομών, χωρίς περίπλοκες χρεώσεις.</p>
            </div>

            <div className="pricing-grid">
              {plans.map((plan, index) => (
                <article
                  key={plan.name}
                  className={`pricing-card reveal${plan.featured ? " featured" : ""}`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {plan.featured && <p className="popular-label">ΔΗΜΟΦΙΛΕΣ</p>}

                  <h3>{plan.name}</h3>

                  <p className="price">
                    {plan.price} <span>/ μήνα</span>
                  </p>

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`button ${plan.featured ? "button-primary" : "button-secondary"}`}
                    onClick={(event) => handleSectionClick(event, "contact")}
                  >
                    Επίλεξε πακέτο
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews" id="reviews">
          <div className="container">
            <div className="section-heading reveal">
              <p className="section-label">ΑΞΙΟΛΟΓΗΣΕΙΣ</p>
              <h2>Τι λένε τα μέλη μας</h2>

              <p>Μερικές ενδεικτικές αξιολογήσεις για το demo της ιστοσελίδας.</p>
            </div>

            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <article
                  key={review.name}
                  className="review-card reveal"
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <div className="review-stars">★★★★★</div>

                  <p className="review-text">{review.text}</p>

                  <div className="review-person">
                    <div className="review-avatar">{review.initials}</div>

                    <div>
                      <h3>{review.name}</h3>
                      <span>{review.meta}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container contact-grid">
            <div className="contact-info reveal">
              <p className="section-label">ΕΠΙΚΟΙΝΩΝΙΑ</p>

              <h2>Κλείσε τη δωρεάν δοκιμή σου</h2>

              <p>
                Συμπλήρωσε τη φόρμα και η ομάδα μας θα επικοινωνήσει μαζί σου το συντομότερο δυνατό.
              </p>

              <div className="contact-details">
                <p>
                  <strong>Διεύθυνση:</strong> Πλατεία Ελευθερίας 12, Ηράκλειο Κρήτης
                </p>

                <p>
                  <strong>Τηλέφωνο:</strong> 2810 123 456
                </p>

                <p>
                  <strong>Email:</strong> info@bluecoregym.gr
                </p>

                <p>
                  <strong>Ωράριο:</strong> Δευτέρα – Κυριακή, 06:00 – 23:00
                </p>

                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps?q=Πλατεία+Ελευθερίας,+Ηράκλειο,+Κρήτη&amp;output=embed"
                    title="Τοποθεσία BlueCore Gym στο Ηράκλειο Κρήτης"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ονοματεπώνυμο</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Γράψε το όνομά σου"
                  required
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Τηλέφωνο</label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="69XXXXXXXX"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Μήνυμα</label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Πες μας ποιο πρόγραμμα σε ενδιαφέρει"
                  value={formData.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </div>

              <button type="submit" className="button button-primary">
                Αποστολή μηνύματος
              </button>

              {formSubmitted && (
                <p className="form-message">Το μήνυμα καταχωρήθηκε επιτυχώς για το demo.</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <a href="#home" className="logo" onClick={(event) => handleSectionClick(event, "home")}>
            BLUE<span>CORE</span>
          </a>

          <p>© {new Date().getFullYear()} BlueCore Gym. Όλα τα δικαιώματα διατηρούνται.</p>
        </div>
      </footer>

      <a className="bluecore-back-link" href="/">
        ← Rocket3Dev
      </a>
    </div>
  );
}
