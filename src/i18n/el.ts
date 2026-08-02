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

export const el: Translations = {
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
    cards: [
      {
        icon: PencilRuler,
        title: "Σύγχρονο Design",
        desc: "Καθαρή αισθητική προσαρμοσμένη στην ταυτότητα της επιχείρησής σας.",
      },
      {
        icon: Code2,
        title: "Προσεγμένο Development",
        desc: "Γρήγορες και responsive ιστοσελίδες με έμφαση στη σωστή λειτουργία.",
      },
      {
        icon: MessageCircle,
        title: "Άμεση Επικοινωνία",
        desc: "Μιλάτε απευθείας με την ομάδα που σχεδιάζει και υλοποιεί το project σας.",
      },
    ],
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
    description: "Μια απλή διαδικασία τεσσάρων βημάτων, ώστε να γνωρίζετε πάντα τι ακολουθεί.",
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
    successMessage: "Το μήνυμά σας στάλθηκε επιτυχώς. Θα επικοινωνήσουμε σύντομα μαζί σας.",
    errorMessage: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε email στο rocket3devs@gmail.com.",
  },
  footer: {
    location: "Ηράκλειο, Κρήτη · Ελλάδα",
    rights: "Όλα τα δικαιώματα διατηρούνται.",
    builtBy: "Built by Rocket3Dev.",
  },
};
