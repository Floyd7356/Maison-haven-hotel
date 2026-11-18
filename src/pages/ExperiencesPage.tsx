import { ArrowRight } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { BRAND_INFO, FACILITIES_AND_EXPERIENCES } from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';

interface ExperiencesPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function ExperiencesPage({ onNavigate }: ExperiencesPageProps) {
  const featuredFacilities = FACILITIES_AND_EXPERIENCES.filter((f) => Boolean(f.imageKey));
  const supportingServices = FACILITIES_AND_EXPERIENCES.filter((f) => !f.imageKey);

  return (
    <div>
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-14 border-b border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Experiences & Facilities · {BRAND_INFO.statusLabel}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#292824] text-balance">
              Spaces Planned for Serenity, Dining & Gathering.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#292824]/80">
              Every shared environment at Maison Haven is curated to extend the calm of your private room—whether dining in the morning sunlight, resting beside the pool, or hosting a discreet meeting in Maitama.
            </p>
            <p className="text-xs tracking-wide text-[#292824]/65 pt-2">
              Pre-Opening Notice: Maison Haven is preparing to open. All facilities below are planned to welcome guests upon official launch.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Editorial Spaces (With Dedicated Photography) */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-24">
          {featuredFacilities.map((facility, idx) => {
            const reverse = idx % 2 === 1;
            const isWidePool = facility.id === 'swimming-pool';
            return (
              <article
                key={facility.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
                  {facility.imageKey && (
                    <EditorialImage
                      assetKey={facility.imageKey}
                      showCaption
                      className={isWidePool ? 'aspect-video' : 'aspect-[4/3]'}
                    />
                  )}
                </div>

                <div className={`lg:col-span-5 space-y-5 ${reverse ? 'lg:order-1' : ''}`}>
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64] tabular-nums">
                    {facility.indexLabel} <span aria-hidden="true" className="mx-1.5">/</span>{' '}
                    {facility.classification}
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
                    {facility.name}
                  </h2>
                  <p className="text-base leading-relaxed text-[#292824]/85">
                    {facility.summary}
                  </p>
                  <p className="text-sm leading-relaxed text-[#292824]/70">
                    {facility.detail}
                  </p>
                  <p className="pt-3 border-t border-[#292824]/12 text-xs tracking-wide text-[#292824]/60">
                    Status: {facility.availabilityNote}.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Additional Essential Facilities & Guest Services Ledger */}
      <section className="py-16 sm:py-24 bg-[#EAE2D3] border-y border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Essential Guest Services
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
              Fitness, Care & Seamless Convenience.
            </h2>
            <p className="text-sm leading-relaxed text-[#292824]/75">
              Each supporting service below is designed around privacy, reliability, and effortless comfort once Maison Haven opens its doors.
            </p>
          </div>

          <div className="divide-y divide-[#292824]/15 border-y border-[#292824]/15">
            {supportingServices.map((service) => (
              <div
                key={service.id}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
              >
                <div className="md:col-span-4 flex items-baseline gap-4">
                  <span className="text-xs font-medium tracking-[0.18em] text-[#A58A64] tabular-nums">
                    {service.indexLabel}.
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#292824]">
                      {service.name}
                    </h3>
                    <p className="text-xs tracking-[0.14em] uppercase text-[#292824]/55 mt-1">
                      {service.classification}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-2">
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#292824]/85">
                    {service.summary}
                  </p>
                  <p className="text-xs leading-relaxed text-[#292824]/68">
                    {service.detail}
                  </p>
                </div>

                <div className="md:col-span-3 md:text-right">
                  <span className="text-xs text-[#292824]/60">
                    {service.availabilityNote}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-12 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('/', '#register-interest')}
              className="inline-flex items-center gap-3 min-h-[48px] px-7 py-3.5 bg-[#292824] text-[#F2EDE3] text-xs font-medium tracking-[0.18em] uppercase hover:bg-[#3A3832] transition-colors cursor-pointer"
            >
              <span>Register Your Interest</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="min-h-[48px] px-7 py-3.5 border border-[#292824]/30 text-[#292824] text-xs font-medium tracking-[0.18em] uppercase hover:border-[#292824] transition-colors cursor-pointer"
            >
              Enquire With Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
