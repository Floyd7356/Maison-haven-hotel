import { BRAND_INFO, NAVIGATION_ITEMS, getWhatsAppUrl } from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';
import { MaisonHavenWordmark, MonogramMH } from './BrandMark';

interface FooterProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#292824] text-[#F2EDE3] border-t border-[#A58A64]/25">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-10 pb-14 border-b border-[#F2EDE3]/12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-4">
              <MonogramMH className="w-10 h-10 shrink-0" tone="light" />
              <MaisonHavenWordmark tone="light" />
            </div>
            <p className="font-serif italic text-xl text-[#D8C9B5]">
              {BRAND_INFO.tagline}
            </p>
            <p className="text-sm leading-relaxed text-[#F2EDE3]/70 max-w-sm">
              A refined boutique hotel preparing to welcome guests in Maitama, Abuja. Crafted around privacy, serenity, security, and thoughtful hospitality.
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A58A64]">
              {BRAND_INFO.statusLabel} · {BRAND_INFO.location}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64]">
              Explore
            </h2>
            <ul className="space-y-2.5 text-sm">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.route}>
                  <a
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.route);
                    }}
                    className="text-[#F2EDE3]/80 hover:text-[#F2EDE3] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#register-interest"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', '#register-interest');
                  }}
                  className="text-[#D8C9B5] hover:text-[#F2EDE3] transition-colors inline-block py-0.5"
                >
                  Register Your Interest
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64]">
              Pre-Opening Contact
            </h2>
            <dl className="space-y-3 text-sm text-[#F2EDE3]/80">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[#F2EDE3]/50">
                  Location
                </dt>
                <dd className="mt-0.5 text-[#F2EDE3]">{BRAND_INFO.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[#F2EDE3]/50">
                  Telephone
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={BRAND_INFO.telephoneHref}
                    className="text-[#F2EDE3] hover:text-[#D8C9B5] transition-colors tabular-nums"
                  >
                    {BRAND_INFO.telephoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[#F2EDE3]/50">
                  WhatsApp Concierge
                </dt>
                <dd className="mt-0.5">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D8C9B5] hover:text-[#F2EDE3] underline decoration-[#A58A64]/60 underline-offset-4 transition-colors tabular-nums"
                  >
                    {BRAND_INFO.telephoneDisplay} · Chat on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-[#F2EDE3]/50">
                  Email (Planned)
                </dt>
                <dd className="mt-0.5">
                  <span className="text-[#F2EDE3]/85">{BRAND_INFO.plannedEmail}</span>
                  <span className="block text-xs text-[#F2EDE3]/50 mt-0.5">
                    {BRAND_INFO.emailStatusNote}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F2EDE3]/55">
          <p>© {new Date().getFullYear()} Maison Haven, Maitama, Abuja. All rights reserved.</p>
          <p>Official social channels will be published upon launch.</p>
        </div>
      </div>
    </footer>
  );
}
