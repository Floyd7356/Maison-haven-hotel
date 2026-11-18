import { ArrowRight } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { APPROVED_BRAND_STORY, BRAND_INFO } from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';

interface OurStoryPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const HOSPITALITY_PILLARS = [
  {
    index: '01',
    title: 'Peace & Tranquillity',
    description:
      'Calm interior proportions, natural light, and serene surroundings crafted to offer respite from the pace of the city.',
  },
  {
    index: '02',
    title: 'Warm Hospitality',
    description:
      'Service defined by genuine human warmth, attentive listening, and quiet care rather than stiff formality.',
  },
  {
    index: '03',
    title: 'Privacy, Security & Trust',
    description:
      'An intimate twenty-five room sanctuary in Maitama where guests feel completely at ease, valued, and secure.',
  },
];

export function OurStoryPage({ onNavigate }: OurStoryPageProps) {
  return (
    <div>
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-14 border-b border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Our Story · {BRAND_INFO.location}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#292824] text-balance">
              Born From a Genuine Passion for Hospitality.
            </h1>
          </div>
        </div>
      </section>

      {/* Editorial Reading Canvas */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Narrative Column */}
            <div className="lg:col-span-7 space-y-8 max-w-prose">
              <p className="text-lg sm:text-xl leading-[1.8] text-[#292824] first-letter:font-serif first-letter:text-5xl first-letter:font-medium first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none first-letter:text-[#A58A64]">
                {APPROVED_BRAND_STORY.leadParagraph}
              </p>

              <p className="text-base sm:text-lg leading-[1.85] text-[#292824]/85">
                {APPROVED_BRAND_STORY.philosophyParagraph}
              </p>

              <blockquote className="py-8 my-8 border-y border-[#292824]/15 font-serif italic text-2xl sm:text-3xl leading-[1.35] text-[#292824]">
                “At Maison Haven, luxury is not simply what you see; it is what you feel.”
              </blockquote>

              <p className="text-base sm:text-lg leading-[1.85] text-[#292824]/85">
                {APPROVED_BRAND_STORY.locationParagraph}
              </p>

              {/* Hospitality Pillars */}
              <div className="pt-8 space-y-6">
                <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                  Guiding Ethos
                </p>
                <div className="divide-y divide-[#292824]/12 border-t border-[#292824]/12">
                  {HOSPITALITY_PILLARS.map((pillar) => (
                    <div key={pillar.index} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-5 flex items-baseline gap-3">
                        <span className="text-xs font-medium tracking-widest text-[#A58A64] tabular-nums">
                          {pillar.index}.
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#292824]">
                          {pillar.title}
                        </h2>
                      </div>
                      <p className="sm:col-span-7 text-sm leading-relaxed text-[#292824]/78">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-5">
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
                  onClick={() => onNavigate('/accommodation')}
                  className="min-h-[48px] px-7 py-3.5 border border-[#292824]/30 text-[#292824] text-xs font-medium tracking-[0.18em] uppercase hover:border-[#292824] transition-colors cursor-pointer"
                >
                  Preview Accommodation
                </button>
              </div>
            </div>

            {/* Portrait & Study Sidebar */}
            <div className="lg:col-span-5 space-y-10">
              <EditorialImage
                assetKey="ourStoryColonnade"
                showCaption
                className="aspect-[3/4]"
              />
              <EditorialImage
                assetKey="introLounge"
                showCaption
                className="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
