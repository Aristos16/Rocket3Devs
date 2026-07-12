import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/gym-demo")({
  head: () => ({
    meta: [
      { title: "BlueCore Gym — Demo by Rocket3Dev" },
      {
        name: "description",
        content:
          "Demo ιστοσελίδα γυμναστηρίου με προγράμματα, συνδρομές, αξιολογήσεις, video και φόρμα επικοινωνίας.",
      },
    ],
  }),
  component: BlueCoreGymDemo,
});

const gymMarkup = String.raw`

  <!-- Header / Μενού -->
  <header class="header">
    <div class="container navbar">

      <a href="#home" class="logo">
        BLUE<span>CORE</span>
      </a>

      <button
        class="menu-button"
        id="menuButton"
        type="button"
        aria-label="Άνοιγμα μενού"
        aria-expanded="false"
      >
        ☰
      </button>

      <nav class="navigation" id="navigation">
        <ul class="nav-list">
          <li><a href="#home">Αρχική</a></li>
          <li><a href="#programs">Προγράμματα</a></li>
          <li><a href="#about">Σχετικά</a></li>
          <li><a href="#pricing">Συνδρομές</a></li>
          <li><a href="#reviews">Αξιολογήσεις</a></li>
          <li><a href="#contact">Επικοινωνία</a></li>
        </ul>
      </nav>

    </div>
  </header>


  <main>

    <!-- Hero Section -->
    <section class="hero" id="home">
      <div class="container hero-content">

        <p class="hero-label">BLUECORE GYM</p>

        <h1>
          Ξεπέρασε τα
          <span>όριά σου</span>
        </h1>

        <p class="hero-text">
          Σύγχρονος εξοπλισμός, έμπειροι trainers και προγράμματα
          που θα σε βοηθήσουν να πετύχεις κάθε στόχο.
        </p>

        <div class="hero-buttons">
          <a href="#pricing" class="button button-primary">
            Ξεκίνα σήμερα
          </a>

          <a href="#programs" class="button button-secondary">
            Δες τα προγράμματα
          </a>
        </div>

      </div>
    </section>

    <!-- Quick Information -->
    <section class="trust-bar" aria-label="Πληροφορίες γυμναστηρίου">
    <div class="container trust-grid">

        <div class="trust-item">
        <strong>06:00 – 23:00</strong>
        <span>Καθημερινό ωράριο</span>
        </div>

        <div class="trust-item">
        <strong>Δωρεάν</strong>
        <span>Πρώτη δοκιμαστική προπόνηση</span>
        </div>

        <div class="trust-item">
        <strong>10+</strong>
        <span>Πιστοποιημένοι trainers</span>
        </div>

    </div>
    </section>


    <!-- Programs Section -->
    <section class="section programs" id="programs">
      <div class="container">

        <div class="section-heading">
          <p class="section-label">ΠΡΟΠΟΝΗΣΗ</p>
          <h2>Τα προγράμματά μας</h2>

          <p>
            Επίλεξε το πρόγραμμα που ταιριάζει στις ανάγκες
            και στους στόχους σου.
          </p>
        </div>

        <div class="program-grid">

          <article class="program-card">
            <div class="program-icon">🏋️</div>

            <h3>Μυϊκή ενδυνάμωση</h3>

            <p>
              Προπόνηση με ελεύθερα βάρη και σύγχρονα μηχανήματα
              για δύναμη και μυϊκή ανάπτυξη.
            </p>

            <a href="#contact">Μάθε περισσότερα →</a>
          </article>


          <article class="program-card">
            <div class="program-icon">🔥</div>

            <h3>Cross Training</h3>

            <p>
              Δυναμικές προπονήσεις υψηλής έντασης για αντοχή,
              ταχύτητα και καλύτερη φυσική κατάσταση.
            </p>

            <a href="#contact">Μάθε περισσότερα →</a>
          </article>


          <article class="program-card">
            <div class="program-icon">🧘</div>

            <h3>Yoga & Mobility</h3>

            <p>
              Ασκήσεις για ευλυγισία, ισορροπία, κινητικότητα
              και καλύτερη αποκατάσταση.
            </p>

            <a href="#contact">Μάθε περισσότερα →</a>
          </article>

        </div>
      </div>
    </section>


    <!-- About Section -->
    <section class="section about" id="about">
      <div class="container about-grid">

        <div class="about-image">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80"
            alt="Άτομο που γυμνάζεται στο γυμναστήριο"
          >
        </div>

        <div class="about-content">

          <p class="section-label">ΣΧΕΤΙΚΑ ΜΕ ΕΜΑΣ</p>

          <h2>
            Ένας χώρος σχεδιασμένος για κάθε στόχο
          </h2>

          <p>
            Στο BlueCore Gym πιστεύουμε ότι η συνέπεια και η σωστή
            καθοδήγηση μπορούν να φέρουν πραγματικά αποτελέσματα.
          </p>

          <p>
            Ο χώρος μας διαθέτει σύγχρονο εξοπλισμό και εξειδικευμένους
            trainers για αρχάριους και προχωρημένους.
          </p>

          <div class="about-stats">

            <div class="stat">
              <strong>500+</strong>
              <span>Μέλη</span>
            </div>

            <div class="stat">
              <strong>10+</strong>
              <span>Trainers</span>
            </div>

            <div class="stat">
              <strong>20+</strong>
              <span>Προγράμματα</span>
            </div>

          </div>

          <a href="#contact" class="button button-primary">
            Επικοινώνησε μαζί μας
          </a>

        </div>
      </div>
    </section>

    <!-- Video Section -->
    <section class="section gym-video-section" id="experience">
      <div class="container video-grid">

        <div class="video-wrapper">

          <video
            id="gymVideo"
            muted
            loop
            playsinline
            preload="none"
          >
            <source src="/Videos/gym.mp4" type="video/mp4">

            Ο browser σου δεν υποστηρίζει βίντεο.
          </video>

          <div class="video-overlay"></div>

          <button
            class="video-button"
            id="videoButton"
            type="button"
            aria-label="Παύση βίντεο"
          >
            Ⅱ
          </button>

          <div class="video-label">
            BLUECORE EXPERIENCE
          </div>

        </div>


        <div class="video-content">

          <p class="section-label">Η ΕΜΠΕΙΡΙΑ BLUECORE</p>

          <h2>
            Ένας χώρος που σε βοηθά να ξεπεράσεις τα όριά σου
          </h2>

          <p>
            Σύγχρονος επαγγελματικός εξοπλισμός, οργανωμένοι χώροι
            και εξειδικευμένοι trainers για κάθε επίπεδο προπόνησης.
          </p>

          <ul class="video-list">
            <li>Επαγγελματικός εξοπλισμός</li>
            <li>Καθαροί και σύγχρονοι χώροι</li>
            <li>Πιστοποιημένοι trainers</li>
            <li>Προγράμματα για κάθε επίπεδο</li>
          </ul>

          <a href="#contact" class="button button-primary">
            Κλείσε δωρεάν δοκιμή
          </a>

        </div>

      </div>
    </section>
    <!-- Pricing Section -->
    <section class="section pricing" id="pricing">
      <div class="container">

        <div class="section-heading">
          <p class="section-label">ΣΥΝΔΡΟΜΕΣ</p>
          <h2>Διάλεξε το πακέτο σου</h2>

          <p>
            Ευέλικτα πακέτα συνδρομών, χωρίς περίπλοκες χρεώσεις.
          </p>
        </div>

        <div class="pricing-grid">

          <article class="pricing-card">
            <h3>Basic</h3>

            <p class="price">
              25€ <span>/ μήνα</span>
            </p>

            <ul>
              <li>✓ Πρόσβαση στον χώρο οργάνων</li>
              <li>✓ Χρήση αποδυτηρίων</li>
              <li>✓ Δωρεάν αρχική αξιολόγηση</li>
              <li>✕ Ομαδικά προγράμματα</li>
            </ul>

            <a href="#contact" class="button button-secondary">
              Επίλεξε πακέτο
            </a>
          </article>


          <article class="pricing-card featured">

            <p class="popular-label">ΔΗΜΟΦΙΛΕΣ</p>

            <h3>Unlimited</h3>

            <p class="price">
              39€ <span>/ μήνα</span>
            </p>

            <ul>
              <li>✓ Απεριόριστη πρόσβαση</li>
              <li>✓ Όλα τα ομαδικά προγράμματα</li>
              <li>✓ Πρόγραμμα προπόνησης</li>
              <li>✓ Μηνιαία αξιολόγηση</li>
            </ul>

            <a href="#contact" class="button button-primary">
              Επίλεξε πακέτο
            </a>
          </article>


          <article class="pricing-card">
            <h3>Personal</h3>

            <p class="price">
              69€ <span>/ μήνα</span>
            </p>

            <ul>
              <li>✓ Όλες οι παροχές Unlimited</li>
              <li>✓ Personal training</li>
              <li>✓ Εξατομικευμένο πρόγραμμα</li>
              <li>✓ Διατροφική καθοδήγηση</li>
            </ul>

            <a href="#contact" class="button button-secondary">
              Επίλεξε πακέτο
            </a>
          </article>

        </div>
      </div>
    </section>
    <!-- Reviews Section -->
    <section class="section reviews" id="reviews">
    <div class="container">

        <div class="section-heading">
        <p class="section-label">ΑΞΙΟΛΟΓΗΣΕΙΣ</p>
        <h2>Τι λένε τα μέλη μας</h2>

        <p>
            Μερικές ενδεικτικές αξιολογήσεις για το demo της ιστοσελίδας.
        </p>
        </div>

        <div class="reviews-grid">

        <article class="review-card">
            <div class="review-stars">★★★★★</div>

            <p class="review-text">
            «Πολύ καθαρός χώρος, σύγχρονα μηχανήματα και εξαιρετική
            καθοδήγηση από τους trainers.»
            </p>

            <div class="review-person">
            <div class="review-avatar">ΜΚ</div>

            <div>
                <h3>Μαρία Κ.</h3>
                <span>Μέλος για 8 μήνες</span>
            </div>
            </div>
        </article>


        <article class="review-card">
            <div class="review-stars">★★★★★</div>

            <p class="review-text">
            «Τα ομαδικά προγράμματα έχουν πολλή ενέργεια και με βοήθησαν
            να αποκτήσω συνέπεια στην προπόνησή μου.»
            </p>

            <div class="review-person">
            <div class="review-avatar">ΝΠ</div>

            <div>
                <h3>Νίκος Π.</h3>
                <span>Μέλος για 1 χρόνο</span>
            </div>
            </div>
        </article>


        <article class="review-card">
            <div class="review-stars">★★★★★</div>

            <p class="review-text">
            «Φιλικό περιβάλλον και πολύ καλή εξυπηρέτηση. Το πρόγραμμα
            προπόνησης προσαρμόστηκε ακριβώς στους στόχους μου.»
            </p>

            <div class="review-person">
            <div class="review-avatar">ΕΔ</div>

            <div>
                <h3>Ελένη Δ.</h3>
                <span>Μέλος για 6 μήνες</span>
            </div>
            </div>
        </article>

        </div>
    </div>
    </section>


    <!-- Contact Section -->
    <section class="section contact" id="contact">
    <div class="container contact-grid">

        <div class="contact-info">

        <p class="section-label">ΕΠΙΚΟΙΝΩΝΙΑ</p>

        <h2>Κλείσε τη δωρεάν δοκιμή σου</h2>

        <p>
            Συμπλήρωσε τη φόρμα και η ομάδα μας θα επικοινωνήσει
            μαζί σου το συντομότερο δυνατό.
        </p>

        <div class="contact-details">

            <p>
            <strong>Διεύθυνση:</strong>
            Πλατεία Ελευθερίας 12, Ηράκλειο Κρήτης
            </p>

            <p>
            <strong>Τηλέφωνο:</strong>
            2810 123 456
            </p>

            <p>
            <strong>Email:</strong>
            info@bluecoregym.gr
            </p>

            <p>
            <strong>Ωράριο:</strong>
            Δευτέρα – Κυριακή, 06:00 – 23:00
            </p>

            <div class="contact-map">
            <iframe
                src="https://www.google.com/maps?q=Πλατεία+Ελευθερίας,+Ηράκλειο,+Κρήτη&output=embed"
                title="Τοποθεσία BlueCore Gym στο Ηράκλειο Κρήτης"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            </div>

        </div>
        </div>


        <form class="contact-form" id="contactForm">

        <div class="form-group">
            <label for="name">Ονοματεπώνυμο</label>

            <input
            type="text"
            id="name"
            name="name"
            placeholder="Γράψε το όνομά σου"
            required
            >
        </div>


        <div class="form-group">
            <label for="email">Email</label>

            <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            required
            >
        </div>


        <div class="form-group">
            <label for="phone">Τηλέφωνο</label>

            <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="69XXXXXXXX"
            >
        </div>


        <div class="form-group">
            <label for="message">Μήνυμα</label>

            <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Πες μας ποιο πρόγραμμα σε ενδιαφέρει"
            ></textarea>
        </div>


        <button type="submit" class="button button-primary">
            Αποστολή μηνύματος
        </button>

        <p class="form-message" id="formMessage"></p>

        </form>

    </div>
    </section>

  </main>


  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-content">

      <a href="#home" class="logo">
        BLUE<span>CORE</span>
      </a>

      <p>
        © <span id="year">2026</span> BlueCore Gym.
        Όλα τα δικαιώματα διατηρούνται.
      </p>

    </div>
  </footer>


  <!-- Σύνδεση με το JavaScript -->
`;
const gymStyles = String.raw`/* =========================
   BLUECORE GYM — FINAL DESIGN
========================= */

:root {
  --bg: #0b0f14;
  --bg-soft: #10161d;
  --surface: #151c24;
  --surface-light: #1a232d;

  /* Ένα βασικό μπλε σε όλη τη σελίδα */
  --accent: #3e7cb1;
  --accent-hover: #4d8cc2;
  --accent-soft: rgba(62, 124, 177, 0.14);

  --text: #f1f2ef;
  --muted: #9da7b1;
  --border: rgba(255, 255, 255, 0.08);

  --header-height: 74px;
  --radius: 10px;
  --shadow: 0 22px 55px rgba(0, 0, 0, 0.36);
}


/* =========================
   Reset
========================= */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--header-height);
}

body {
  min-height: 100vh;
  overflow-x: hidden;

  background:
    radial-gradient(
      circle at 15% 15%,
      rgba(62, 124, 177, 0.055),
      transparent 27%
    ),
    var(--bg);

  color: var(--text);

  font-family:
    Inter,
    "Segoe UI",
    Arial,
    sans-serif;

  line-height: 1.65;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  opacity: 0.2;

  background-image:
    repeating-linear-gradient(
      110deg,
      transparent 0,
      transparent 10px,
      rgba(255, 255, 255, 0.008) 11px
    );
}

img {
  display: block;
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

button,
input,
textarea {
  font: inherit;
}

button {
  border: 0;
}

.container {
  width: min(1120px, calc(100% - 40px));
  margin-inline: auto;
}

.section {
  position: relative;
  padding: 105px 0;
  overflow: hidden;

  border-top: 1px solid rgba(255, 255, 255, 0.035);
}


/* =========================
   Typography
========================= */

h1,
h2,
h3,
.logo {
  font-family:
    Montserrat,
    Inter,
    "Segoe UI",
    sans-serif;
}

h1,
h2,
h3 {
  line-height: 1.15;
}

.section-heading {
  max-width: 700px;
  margin: 0 auto 55px;
  text-align: center;
}

.section-heading h2,
.about-content h2,
.contact-info h2 {
  margin-bottom: 17px;

  color: var(--text);

  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 800;
  letter-spacing: -1.5px;
}

.section-heading > p:last-child,
.about-content > p,
.contact-info > p {
  color: var(--muted);
}

.section-label,
.hero-label {
  display: inline-flex;
  align-items: center;

  padding: 7px 12px;
  margin-bottom: 18px;

  background: var(--accent-soft);
  color: #b7cede;

  border: 1px solid rgba(62, 124, 177, 0.35);
  border-radius: 5px;

  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
}


/* =========================
   Header
========================= */

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;

  background: rgba(9, 13, 18, 0.93);
  border-bottom: 1px solid var(--border);

  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.28);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.navbar {
  min-height: var(--header-height);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: var(--text);

  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.8px;
}

.logo span {
  color: var(--accent);
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 27px;
}

.nav-list a {
  position: relative;

  padding: 9px 0;

  color: #b4bdc5;

  font-size: 0.9rem;
  font-weight: 650;

  transition: color 0.25s ease;
}

.nav-list a::after {
  content: "";

  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;

  width: 0;
  height: 2px;
  margin: auto;

  background: var(--accent);
  border-radius: 10px;

  transition: width 0.25s ease;
}

.nav-list a:hover {
  color: var(--text);
}

.nav-list a:hover::after {
  width: 100%;
}

.menu-button {
  display: none;

  padding: 5px;

  background: transparent;
  color: var(--text);

  font-size: 1.7rem;
  cursor: pointer;
}


/* =========================
   Hero
========================= */

.hero {
  position: relative;
  isolation: isolate;

  min-height: 96vh;

  display: flex;
  align-items: center;

  padding-top: var(--header-height);

  background:
    linear-gradient(
      90deg,
      rgba(6, 9, 12, 0.97) 0%,
      rgba(6, 9, 12, 0.87) 45%,
      rgba(6, 9, 12, 0.36) 100%
    ),
    linear-gradient(
      0deg,
      var(--bg) 0%,
      rgba(11, 15, 20, 0.55) 18%,
      transparent 46%
    ),
    url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1900&q=90")
    center 38% / cover no-repeat;
}

.hero::before {
  content: "";

  position: absolute;
  top: 20%;
  left: -220px;
  z-index: -1;

  width: 500px;
  height: 500px;

  background: rgba(62, 124, 177, 0.08);
  border-radius: 50%;
  filter: blur(110px);
}

.hero-content {
  max-width: 760px;
}

.hero h1 {
  max-width: 800px;
  margin-bottom: 25px;

  color: var(--text);

  font-size: clamp(3.2rem, 7vw, 6.3rem);
  font-weight: 900;
  letter-spacing: -4px;
  line-height: 0.95;

  text-shadow:
    0 15px 40px rgba(0, 0, 0, 0.5);
}

.hero h1 span {
  display: block;
  color: var(--accent);
}

.hero-text {
  max-width: 620px;
  margin-bottom: 34px;

  color: #bec5ca;

  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
}


/* =========================
   Buttons
========================= */

.button {
  position: relative;
  overflow: hidden;

  min-height: 50px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 13px 25px;

  border: 1px solid transparent;
  border-radius: 6px;

  font-size: 0.92rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: var(--accent);
  color: #ffffff;

  box-shadow:
    0 11px 25px rgba(0, 0, 0, 0.28);
}

.button-primary:hover {
  background: var(--accent-hover);

  box-shadow:
    0 15px 32px rgba(0, 0, 0, 0.36);
}

.button-secondary {
  background: rgba(255, 255, 255, 0.025);
  color: var(--text);

  border-color: rgba(255, 255, 255, 0.16);
}

.button-secondary:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
}


/* =========================
   Trust Bar
========================= */

.trust-bar {
  position: relative;
  z-index: 5;

  margin-top: -43px;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  background: rgba(20, 27, 34, 0.96);

  border: 1px solid var(--border);
  border-radius: var(--radius);

  box-shadow: var(--shadow);

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  overflow: hidden;
}

.trust-item {
  padding: 25px;
  text-align: center;
}

.trust-item:not(:last-child) {
  border-right: 1px solid var(--border);
}

.trust-item strong {
  display: block;
  margin-bottom: 3px;

  color: var(--accent);

  font-size: 1.1rem;
}

.trust-item span {
  color: var(--muted);
  font-size: 0.84rem;
}


/* =========================
   Cards
========================= */

.program-card,
.pricing-card,
.review-card,
.contact-form,
.stat {
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.022),
      transparent 40%
    ),
    var(--surface);

  border: 1px solid var(--border);
  border-radius: var(--radius);

  box-shadow:
    0 16px 38px rgba(0, 0, 0, 0.27),
    inset 0 1px 0 rgba(255, 255, 255, 0.025);
}


/* =========================
   Programs
========================= */

.programs {
  background: var(--bg);
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 23px;
}

.program-card {
  padding: 31px;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.program-card:hover {
  transform: translateY(-7px);

  border-color: rgba(62, 124, 177, 0.55);

  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.37);
}

.program-icon {
  width: 57px;
  height: 57px;

  display: grid;
  place-items: center;

  margin-bottom: 22px;

  background: var(--accent-soft);

  border: 1px solid rgba(62, 124, 177, 0.28);
  border-radius: 7px;

  font-size: 1.8rem;

  filter: grayscale(1);
}

.program-card h3 {
  margin-bottom: 12px;
  font-size: 1.25rem;
}

.program-card p {
  margin-bottom: 20px;

  color: var(--muted);
  line-height: 1.75;
}

.program-card a {
  color: var(--accent);
  font-weight: 750;
}


/* =========================
   About — Matte Blue Wall
========================= */

.about {
  background: var(--bg-soft);
}

.about::before {
  content: "";

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  width: 39%;

  background: rgba(62, 124, 177, 0.18);

  box-shadow:
    inset -100px 0 120px var(--bg-soft);

  pointer-events: none;
}

.about-grid {
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  gap: 60px;
}

.about-image {
  position: relative;
  overflow: hidden;

  border-radius: var(--radius);
}

.about-image::before {
  content: "";

  position: absolute;
  inset: 13px;
  z-index: 2;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;

  pointer-events: none;
}

.about-image img {
  height: 520px;
  object-fit: cover;

  filter:
    saturate(0.72)
    contrast(1.08)
    brightness(0.82);

  transition:
    transform 0.7s ease,
    filter 0.5s ease;
}

.about-image:hover img {
  transform: scale(1.045);

  filter:
    saturate(0.8)
    contrast(1.08)
    brightness(0.88);
}

.about-content > p {
  margin-bottom: 17px;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 13px;
  margin: 30px 0;
}

.stat {
  padding: 17px 10px;
  text-align: center;

  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.stat:hover {
  transform: translateY(-4px);
  border-color: rgba(62, 124, 177, 0.45);
}

.stat strong {
  display: block;

  color: var(--accent);

  font-size: 1.65rem;
}

.stat span {
  color: var(--muted);
  font-size: 0.83rem;
}


/* =========================
   Pricing
========================= */

.pricing {
  background: var(--bg);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;

  gap: 23px;
}

.pricing-card {
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 36px;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-6px);

  border-color: rgba(62, 124, 177, 0.4);
}

.pricing-card.featured {
  padding-top: 77px;

  background:
    linear-gradient(
      145deg,
      rgba(62, 124, 177, 0.09),
      transparent 45%
    ),
    var(--surface-light);

  border-color: var(--accent);

  box-shadow:
    0 25px 55px rgba(0, 0, 0, 0.4);
}

.popular-label {
  position: absolute;
  top: 22px;
  left: 50%;

  padding: 7px 18px;

  background: var(--accent);
  color: #ffffff;

  border-radius: 4px;

  font-size: 0.69rem;
  font-weight: 900;
  letter-spacing: 1.5px;
  white-space: nowrap;

  transform: translateX(-50%);
}

.pricing-card h3 {
  margin-bottom: 12px;
  font-size: 1.4rem;
}

.price {
  margin-bottom: 24px;

  color: var(--accent);

  font-size: 2.5rem;
  font-weight: 900;
}

.price span {
  color: var(--muted);

  font-size: 0.9rem;
  font-weight: 400;
}

.pricing-card ul {
  flex-grow: 1;
  margin-bottom: 27px;
}

.pricing-card li {
  margin-bottom: 12px;
  color: var(--muted);
}

.pricing-card .button {
  width: 100%;
}


/* =========================
   Reviews
========================= */

.reviews {
  background: var(--bg-soft);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 23px;
}

.review-card {
  position: relative;
  overflow: hidden;

  padding: 30px;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.review-card::before {
  content: "“";

  position: absolute;
  top: -5px;
  right: 18px;

  color: rgba(62, 124, 177, 0.14);

  font-family: Georgia, serif;
  font-size: 7rem;
  line-height: 1;
}

.review-card:hover {
  transform: translateY(-7px);

  border-color: rgba(62, 124, 177, 0.5);

  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.36);
}

.review-stars {
  margin-bottom: 17px;

  color: var(--accent);

  font-size: 1rem;
  letter-spacing: 3px;
}

.review-text {
  position: relative;
  z-index: 2;

  min-height: 130px;
  margin-bottom: 24px;

  color: var(--muted);

  font-style: italic;
  line-height: 1.75;
}

.review-person {
  display: flex;
  align-items: center;

  gap: 13px;
}

.review-avatar {
  width: 46px;
  height: 46px;

  display: grid;
  place-items: center;
  flex-shrink: 0;

  background: var(--accent);
  color: #ffffff;

  border-radius: 6px;

  font-size: 0.85rem;
  font-weight: 900;
}

.review-person h3 {
  font-size: 0.95rem;
}

.review-person span {
  color: var(--muted);
  font-size: 0.8rem;
}


/* =========================
   Contact — Blue Wall
========================= */

.contact {
  background: var(--bg-soft);
}

.contact::before {
  content: "";

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  width: 41%;

  background: rgba(62, 124, 177, 0.14);

  box-shadow:
    inset -110px 0 130px var(--bg-soft);

  pointer-events: none;
}

.contact-grid {
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 58px;
}

.contact-details {
  margin-top: 27px;
}

.contact-details p {
  margin-bottom: 12px;
  color: var(--muted);
}

.contact-details strong {
  color: var(--text);
}

.contact-form {
  padding: 31px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;

  color: var(--text);

  font-size: 0.88rem;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;

  padding: 13px 14px;

  background: #0e1419;
  color: var(--text);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  outline: none;

  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #66727c;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--accent);

  box-shadow:
    0 0 0 3px rgba(62, 124, 177, 0.13);
}

.form-group textarea {
  resize: vertical;
}

.contact-form .button {
  width: 100%;
}

.form-message {
  margin-top: 14px;

  color: var(--accent);
  text-align: center;
}

.contact-map {
  width: 100%;
  height: 275px;

  margin-top: 27px;
  overflow: hidden;

  border: 1px solid var(--border);
  border-radius: 7px;

  box-shadow:
    0 18px 38px rgba(0, 0, 0, 0.32);
}

.contact-map iframe {
  display: block;

  width: 100%;
  height: 100%;

  border: 0;

  filter:
    grayscale(0.42)
    saturate(0.7)
    contrast(1.04)
    brightness(0.84);
}


/* =========================
   Footer
========================= */

.footer {
  padding: 27px 0;

  background: #080b0f;
  border-top: 1px solid var(--border);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
}

.footer p {
  color: var(--muted);
  font-size: 0.85rem;
}


/* =========================
   Animations
========================= */

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-label {
  opacity: 0;
  animation: fade-up 0.65s ease forwards;
}

.hero h1 {
  opacity: 0;
  animation: fade-up 0.75s ease 0.12s forwards;
}

.hero-text {
  opacity: 0;
  animation: fade-up 0.75s ease 0.24s forwards;
}

.hero-buttons {
  opacity: 0;
  animation: fade-up 0.75s ease 0.36s forwards;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);

  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.show {
  opacity: 1;
  transform: translateY(0);
}


/* =========================
   Tablet / Mobile
========================= */

@media (max-width: 900px) {
  .container {
    width: min(720px, calc(100% - 34px));
  }

  .section {
    padding: 82px 0;
  }

  .menu-button {
    position: relative;
    z-index: 1100;
    display: block;
  }

  .navigation {
    position: fixed;
    top: var(--header-height);
    right: 0;

    display: block;

    width: min(320px, 88%);
    height: calc(100vh - var(--header-height));

    padding: 28px 22px;

    background: rgba(10, 14, 19, 0.99);

    border-left: 1px solid var(--border);

    box-shadow:
      -18px 20px 45px rgba(0, 0, 0, 0.45);

    transform: translateX(105%);
    visibility: hidden;

    transition:
      transform 0.35s ease,
      visibility 0.35s ease;
  }

  .navigation.active {
    transform: translateX(0);
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 3px;
  }

  .nav-list a {
    display: block;

    padding: 14px 10px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .program-grid,
  .pricing-grid,
  .reviews-grid,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured,
  .pricing-card.featured:hover {
    transform: none;
  }

  .about-grid,
  .contact-grid {
    gap: 42px;
  }

  .about::before,
  .contact::before {
    width: 100%;
    height: 260px;
    bottom: auto;

    box-shadow:
      inset 0 -100px 115px var(--bg-soft);
  }

  .about-image {
    order: 2;
  }

  .about-content {
    order: 1;
  }

  .about-image img {
    height: 420px;
  }

  .trust-grid {
    grid-template-columns: 1fr;
  }

  .trust-item:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}


@media (max-width: 600px) {
  :root {
    --header-height: 68px;
  }

  .container {
    width: calc(100% - 28px);
  }

  .section {
    padding: 68px 0;
  }

  .logo {
    font-size: 1.12rem;
  }

  .hero {
    min-height: 90vh;

    padding-top: calc(var(--header-height) + 50px);
    padding-bottom: 65px;

    background:
      linear-gradient(
        90deg,
        rgba(6, 9, 12, 0.95),
        rgba(6, 9, 12, 0.64)
      ),
      linear-gradient(
        0deg,
        var(--bg) 0%,
        transparent 48%
      ),
      url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=86")
      64% center / cover no-repeat;
  }

  .hero h1 {
    font-size: clamp(2.75rem, 15vw, 4.2rem);
    letter-spacing: -2.2px;
  }

  .hero-text {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-buttons .button {
    width: 100%;
  }

  .trust-bar {
    margin-top: -22px;
  }

  .section-heading {
    margin-bottom: 40px;
  }

  .section-heading h2,
  .about-content h2,
  .contact-info h2 {
    font-size: 2rem;
    letter-spacing: -1px;
  }

  .program-card,
  .pricing-card,
  .review-card,
  .contact-form {
    padding: 24px 21px;
  }

  .pricing-card.featured {
    padding-top: 74px;
  }

  .review-text {
    min-height: auto;
  }

  .about-image img {
    height: 330px;
  }

  .about-stats {
    grid-template-columns: 1fr;
  }

  .contact-details p {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .contact-map {
    height: 235px;
  }

  .form-group input,
  .form-group textarea {
    font-size: 16px;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}


/* Απενεργοποίηση hover σε οθόνες αφής */

@media (hover: none) {
  .program-card:hover,
  .pricing-card:hover,
  .review-card:hover,
  .stat:hover {
    transform: none;
  }

  .about-image:hover img {
    transform: none;
  }
}


/* Accessibility */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
/* =========================
   Light Sections
========================= */

.programs,
.experience,
.reviews {
  background: #f3f4f1;
  color: #172027;
}

.programs .section-heading h2,
.experience h2,
.reviews .section-heading h2,
.programs .program-card h3,
.reviews .review-person h3 {
  color: #172027;
}

.programs .section-heading > p:last-child,
.experience-content > p,
.reviews .section-heading > p:last-child,
.programs .program-card p,
.reviews .review-text,
.reviews .review-person span {
  color: #65717a;
}

.programs .section-label,
.experience .section-label,
.reviews .section-label {
  background: rgba(47, 111, 149, 0.1);
  color: var(--accent);
  border-color: rgba(47, 111, 149, 0.25);
}


/* Λευκές κάρτες */

.programs .program-card,
.reviews .review-card {
  background: #ffffff;

  border-color: rgba(23, 32, 39, 0.09);

  box-shadow:
    0 18px 40px rgba(18, 27, 34, 0.08);
}

.programs .program-card:hover,
.reviews .review-card:hover {
  border-color: rgba(47, 111, 149, 0.42);

  box-shadow:
    0 22px 45px rgba(18, 27, 34, 0.13);
}


/* =========================
   Video Experience Section
========================= */

.experience-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 65px;
}

.experience-media {
  position: relative;

  min-height: 570px;
  overflow: hidden;

  background: #11171c;

  border-radius: 10px;

  box-shadow:
    0 28px 65px rgba(16, 24, 30, 0.2);
}

.experience-media::before {
  content: "";

  position: absolute;
  top: 22px;
  right: -14px;
  bottom: -14px;
  left: 22px;
  z-index: -1;

  background: var(--accent);

  border-radius: 10px;
}

.experience-media video {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  filter:
    saturate(0.7)
    contrast(1.07)
    brightness(0.84);
}

.video-shade {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(7, 11, 14, 0.06),
      rgba(7, 11, 14, 0.5)
    );

  pointer-events: none;
}

.video-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;

  width: 45px;
  height: 45px;

  display: grid;
  place-items: center;

  background: rgba(8, 13, 17, 0.72);
  color: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.17);
  border-radius: 50%;

  backdrop-filter: blur(10px);

  font-size: 0.95rem;
  font-weight: 800;

  cursor: pointer;

  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.video-toggle:hover {
  background: var(--accent);
  transform: scale(1.06);
}

.video-caption {
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  z-index: 2;
}

.video-caption span {
  display: inline-flex;

  padding: 8px 12px;

  background: rgba(8, 13, 17, 0.75);
  color: #ffffff;

  border-left: 3px solid var(--accent);

  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.experience-content h2 {
  margin-bottom: 20px;

  font-size: clamp(2.1rem, 4vw, 3.25rem);
  line-height: 1.12;
  letter-spacing: -1.8px;
}

.experience-content > p {
  margin-bottom: 27px;
  line-height: 1.8;
}

.experience-list {
  margin-bottom: 32px;
}

.experience-list li {
  position: relative;

  padding-left: 29px;
  margin-bottom: 14px;

  color: #46535c;
}

.experience-list li::before {
  content: "";

  position: absolute;
  top: 9px;
  left: 0;

  width: 13px;
  height: 7px;

  border-bottom: 2px solid var(--accent);
  border-left: 2px solid var(--accent);

  transform: rotate(-45deg);
}


/* Responsive video section */

@media (max-width: 900px) {
  .experience-grid {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  .experience-media {
    min-height: 480px;
  }

  .experience-media::before {
    display: none;
  }
}

@media (max-width: 600px) {
  .experience-media {
    min-height: 360px;
  }

  .experience-content h2 {
    font-size: 2rem;
    letter-spacing: -1px;
  }

  .video-toggle {
    top: 14px;
    right: 14px;

    width: 41px;
    height: 41px;
  }
}

/* =========================
   Video Section
========================= */

.gym-video-section {
  background-color: #f2f3f1;
  color: #172027;
}

.video-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 65px;
}

.video-wrapper {
  position: relative;
  min-height: 560px;
  overflow: hidden;

  background-color: #11171c;
  border-radius: 10px;

  box-shadow:
    0 28px 65px rgba(16, 24, 30, 0.2);
}

.video-wrapper video {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;

  filter:
    saturate(0.75)
    contrast(1.06)
    brightness(0.82);
}

.video-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      180deg,
      rgba(5, 9, 12, 0.04),
      rgba(5, 9, 12, 0.52)
    );

  pointer-events: none;
}

.video-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;

  width: 46px;
  height: 46px;

  display: grid;
  place-items: center;

  background-color: rgba(7, 12, 16, 0.74);
  color: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;

  font-weight: 800;
  cursor: pointer;

  backdrop-filter: blur(10px);

  transition:
    background-color 0.25s ease,
    transform 0.25s ease;
}

.video-button:hover {
  background-color: var(--accent);
  transform: scale(1.06);
}

.video-label {
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  z-index: 2;

  width: fit-content;
  padding: 9px 13px;

  background-color: rgba(7, 12, 16, 0.78);
  color: #ffffff;

  border-left: 3px solid var(--accent);

  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.video-content h2 {
  margin-bottom: 20px;

  color: #172027;

  font-size: clamp(2.1rem, 4vw, 3.2rem);
  line-height: 1.12;
  letter-spacing: -1.7px;
}

.video-content > p {
  margin-bottom: 26px;

  color: #65717a;
  line-height: 1.8;
}

.video-content .section-label {
  color: var(--accent);
}

.video-list {
  margin-bottom: 32px;
}

.video-list li {
  position: relative;

  padding-left: 29px;
  margin-bottom: 14px;

  color: #46535c;
}

.video-list li::before {
  content: "✓";

  position: absolute;
  top: 0;
  left: 0;

  color: var(--accent);
  font-weight: 900;
}


/* Tablet */

@media (max-width: 900px) {
  .video-grid {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  .video-wrapper {
    min-height: 470px;
  }
}


/* Mobile */

@media (max-width: 600px) {
  .video-wrapper {
    min-height: 350px;
  }

  .video-content h2 {
    font-size: 2rem;
    letter-spacing: -1px;
  }

  .video-button {
    top: 14px;
    right: 14px;

    width: 42px;
    height: 42px;
  }
}
/* Έγχρωμα emoji προγραμμάτων */

.program-icon {
  filter: none !important;

  font-family:
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Noto Color Emoji",
    sans-serif;

  background: rgba(62, 124, 177, 0.12);
}

.program-card:hover .program-icon {
  filter: none !important;
  transform: translateY(-4px) scale(1.06);
}

/* Embedded portfolio preview */
html.bluecore-preview-root,
body.bluecore-preview-root {
  scrollbar-width: none;
  overscroll-behavior: contain;
}

html.bluecore-preview-root::-webkit-scrollbar,
body.bluecore-preview-root::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

body.bluecore-preview-root .header {
  position: sticky;
}

body.bluecore-preview-root .bluecore-back-link {
  display: none;
}

.bluecore-demo-root {
  min-height: 100vh;
}

.bluecore-back-link {
  position: fixed;
  left: 18px;
  bottom: 18px;
  z-index: 1200;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(255,255,255,.13);
  border-radius: 999px;
  background: rgba(8,11,15,.82);
  color: #f1f2ef;
  box-shadow: 0 12px 35px rgba(0,0,0,.3);
  backdrop-filter: blur(12px);
  font-size: .82rem;
  font-weight: 750;
  transition: transform .22s ease, background-color .22s ease;
}

.bluecore-back-link:hover {
  transform: translateY(-2px);
  background: rgba(21,28,36,.94);
}

@media (max-width: 600px) {
  .bluecore-back-link {
    left: 12px;
    bottom: 12px;
    padding: 9px 12px;
    font-size: .76rem;
  }
}
`;

function BlueCoreGymDemo() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const preview =
      window.self !== window.top ||
      new URLSearchParams(window.location.search).get("preview") === "1";

    if (preview) {
      document.documentElement.classList.add("bluecore-preview-root");
      document.body.classList.add("bluecore-preview-root");
    }

    const cleanup: Array<() => void> = [];

    const animatedElements = Array.from<HTMLElement>(
      root.querySelectorAll<HTMLElement>(
        [
          ".section-heading",
          ".program-card",
          ".about-image",
          ".about-content",
          ".video-wrapper",
          ".video-content",
          ".pricing-card",
          ".review-card",
          ".trust-item",
          ".contact-info",
          ".contact-form",
        ].join(",")
      )
    );

    animatedElements.forEach((element) => element.classList.add("reveal"));

    root
      .querySelectorAll<HTMLElement>(
        ".program-grid, .pricing-grid, .reviews-grid, .trust-grid"
      )
      .forEach((grid) => {
        Array.from(grid.children).forEach((item, index) => {
          (item as HTMLElement).style.transitionDelay = `${index * 120}ms`;
        });
      });

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("show");
            currentObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      animatedElements.forEach((element) => observer?.observe(element));
    } else {
      animatedElements.forEach((element) => element.classList.add("show"));
    }

    const menuButton = root.querySelector<HTMLButtonElement>("#menuButton");
    const navigation = root.querySelector<HTMLElement>("#navigation");

    const closeMenu = () => {
      navigation?.classList.remove("active");
      menuButton?.setAttribute("aria-expanded", "false");
      if (menuButton) menuButton.textContent = "☰";
      document.body.style.overflow = "";
    };

    const toggleMenu = () => {
      if (!menuButton || !navigation) return;
      const menuIsOpen = navigation.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", String(menuIsOpen));
      menuButton.textContent = menuIsOpen ? "✕" : "☰";
      document.body.style.overflow = menuIsOpen ? "hidden" : "";
    };

    menuButton?.addEventListener("click", toggleMenu);
    cleanup.push(() => menuButton?.removeEventListener("click", toggleMenu));

    const handleResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    cleanup.push(() => window.removeEventListener("resize", handleResize));

    root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      const handleAnchor = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        const targetId = link.getAttribute("href")?.slice(1);
        if (!targetId) return;

        const target = root.querySelector<HTMLElement>(`#${targetId}`);
        if (!target) return;

        closeMenu();

        // Scroll only this demo document. scrollIntoView can also move the
        // parent Rocket3Dev page when the demo is rendered inside an iframe.
        const headerHeight =
          root.querySelector<HTMLElement>(".header")?.getBoundingClientRect()
            .height ?? 0;
        const targetTop =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });
      };
      link.addEventListener("click", handleAnchor);
      cleanup.push(() => link.removeEventListener("click", handleAnchor));
    });

    const gymVideo = root.querySelector<HTMLVideoElement>("#gymVideo");
    const videoButton = root.querySelector<HTMLButtonElement>("#videoButton");

    if (gymVideo) {
      gymVideo.muted = true;
      gymVideo.defaultMuted = true;
      gymVideo.playsInline = true;
    }

    const tryAutoplayVideo = async () => {
      if (!gymVideo || document.visibilityState === "hidden") return;
      try {
        await gymVideo.play();
      } catch {
        // Some browsers still require a user gesture. The play button remains available.
      }
    };

    const updateVideoButton = () => {
      if (!gymVideo || !videoButton) return;
      const paused = gymVideo.paused;
      videoButton.textContent = paused ? "▶" : "Ⅱ";
      videoButton.setAttribute(
        "aria-label",
        paused ? "Αναπαραγωγή βίντεο" : "Παύση βίντεο"
      );
    };

    const toggleVideo = async () => {
      if (!gymVideo) return;
      if (gymVideo.paused) {
        if (gymVideo.preload === "none") {
          gymVideo.preload = "metadata";
          gymVideo.load();
        }
        try {
          await gymVideo.play();
        } catch {
          // Autoplay/play can be blocked by the browser. The control remains usable.
        }
      } else {
        gymVideo.pause();
      }
      updateVideoButton();
    };

    let videoIsVisible = false;
    let videoObserver: IntersectionObserver | null = null;

    const prepareAndPlayVideo = async () => {
      if (!gymVideo) return;
      if (gymVideo.preload === "none") {
        gymVideo.preload = "metadata";
        gymVideo.load();
      }
      await tryAutoplayVideo();
    };

    const handleVisibilityChange = () => {
      if (!gymVideo) return;
      if (document.visibilityState === "hidden") {
        gymVideo.pause();
      } else if (videoIsVisible) {
        void prepareAndPlayVideo();
      }
    };

    if (gymVideo && "IntersectionObserver" in window) {
      videoObserver = new IntersectionObserver(
        ([entry]) => {
          videoIsVisible = Boolean(entry?.isIntersecting);
          if (videoIsVisible) {
            void prepareAndPlayVideo();
          } else {
            gymVideo.pause();
          }
        },
        { rootMargin: "180px 0px", threshold: 0.08 },
      );
      videoObserver.observe(gymVideo);
    }

    videoButton?.addEventListener("click", toggleVideo);
    gymVideo?.addEventListener("play", updateVideoButton);
    gymVideo?.addEventListener("pause", updateVideoButton);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    cleanup.push(() => videoButton?.removeEventListener("click", toggleVideo));
    cleanup.push(() => gymVideo?.removeEventListener("play", updateVideoButton));
    cleanup.push(() => gymVideo?.removeEventListener("pause", updateVideoButton));
    cleanup.push(() => videoObserver?.disconnect());
    cleanup.push(() =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    );
    updateVideoButton();

    const form = root.querySelector<HTMLFormElement>("#contactForm");
    const formMessage = root.querySelector<HTMLElement>("#formMessage");
    const submitDemoForm = (event: Event) => {
      event.preventDefault();
      if (formMessage) {
        formMessage.textContent =
          "Το μήνυμα καταχωρήθηκε επιτυχώς για το demo.";
      }
      form?.reset();
    };
    form?.addEventListener("submit", submitDemoForm);
    cleanup.push(() => form?.removeEventListener("submit", submitDemoForm));

    const year = root.querySelector<HTMLElement>("#year");
    if (year) year.textContent = String(new Date().getFullYear());

    return () => {
      observer?.disconnect();
      cleanup.forEach((fn) => fn());
      document.body.style.overflow = "";
      document.documentElement.classList.remove("bluecore-preview-root");
      document.body.classList.remove("bluecore-preview-root");
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gymStyles }} />
      <div
        ref={rootRef}
        className="bluecore-demo-root"
        dangerouslySetInnerHTML={{ __html: gymMarkup }}
      />
      <a className="bluecore-back-link" href="/">
        ← Rocket3Dev
      </a>
    </>
  );
}
