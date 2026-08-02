import { Rocket } from "lucide-react";

import { navItems, type Translations } from "../../i18n";
import type { SectionClickHandler } from "./scroll-to-section";

type FooterProps = {
  t: Translations;
  onSectionClick: SectionClickHandler;
};

export function Footer({ t, onSectionClick }: FooterProps) {
  return (
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
                  onClick={(event) => onSectionClick(event, n.href)}
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
  );
}
