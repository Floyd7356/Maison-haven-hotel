import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BRAND_INFO, NAVIGATION_ITEMS, getWhatsAppUrl } from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';
import { MaisonHavenWordmark, MonogramMH } from './BrandMark';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function Navbar({ currentRoute, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentRoute]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (route: Exclude<PageRoute, '/staff-portal'>) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  const handleRegisterClick = () => {
    setMobileOpen(false);
    onNavigate('/', '#register-interest');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F2EDE3]/95 backdrop-blur-sm border-b border-[#292824]/10">
      {/* Subtle pre-opening announcement strip */}
      <div className="bg-[#292824] text-[#F2EDE3] py-1.5 px-4 text-center border-b border-[#A58A64]/20">
        <p className="text-[11px] font-medium tracking-[0.24em] uppercase whitespace-nowrap truncate">
          {BRAND_INFO.location} <span aria-hidden="true" className="mx-2 text-[#A58A64]">·</span>{' '}
          {BRAND_INFO.statusLabel}
        </p>
      </div>

      {/* Strict 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 md:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:outline-offset-4"
          aria-label="Maison Haven Home"
        >
          <MaisonHavenWordmark tone="dark" />
        </a>

        {/* Zone 2: Clean typographic navigation links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
          {NAVIGATION_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-[13px] font-medium tracking-[0.08em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#292824]'
                    : 'text-[#292824]/65 hover:text-[#292824]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#A58A64] transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Pre-Opening CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={handleRegisterClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase bg-[#292824] text-[#F2EDE3] hover:bg-[#3A3832] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Register Interest
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#292824] hover:text-[#A58A64] transition-colors cursor-pointer"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Polished Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-[94px] bottom-0 z-50 bg-[#F2EDE3] border-t border-[#292824]/10 overflow-y-auto px-6 py-8 flex flex-col justify-between"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#292824]/10">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-4 flex items-center justify-between font-serif text-2xl tracking-wide transition-colors ${
                    isActive ? 'text-[#292824] font-medium' : 'text-[#292824]/75 hover:text-[#292824]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#A58A64]">Current</span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-8 mt-8 border-t border-[#292824]/15 space-y-6">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-full min-h-[48px] px-6 py-3.5 text-xs font-medium tracking-[0.16em] uppercase bg-[#292824] text-[#F2EDE3] hover:bg-[#3A3832] transition-colors cursor-pointer"
            >
              Register Your Interest
            </button>

            <div className="flex items-start justify-between gap-4 text-sm text-[#292824]/75">
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#A58A64] mb-1">
                  Pre-Opening Desk
                </p>
                <a
                  href={BRAND_INFO.telephoneHref}
                  className="block py-1 text-[#292824] font-medium tabular-nums"
                >
                  {BRAND_INFO.telephoneDisplay}
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1 text-[#292824]/80 underline decoration-[#A58A64]/60 underline-offset-4"
                >
                  Message on WhatsApp
                </a>
              </div>
              <MonogramMH className="w-9 h-9 shrink-0" tone="dark" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
