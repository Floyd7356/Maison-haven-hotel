import { ArrowRight } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { InterestRegistrationForm } from '../components/InterestRegistrationForm';
import {
  BRAND_INFO,
  FACILITIES_AND_EXPERIENCES,
  ROOM_CATEGORIES,
} from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';

interface HomePageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const scrollToIntroduction = () => {
    const el = document.getElementById('introduction');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* 1. IMMERSIVE FULL-WIDTH HERO */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-end overflow-hidden bg-[#292824]">
        <div className="absolute inset-0">
          <EditorialImage
            assetKey="heroCourtyard"
            priority
            className="w-full h-full bg-[#292824]"
            imgClassName="w-full h-full object-cover object-center group-hover:scale-100"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#292824]/88 via-[#292824]/38 to-[#292824]/18"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-20 pt-32">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.26em] uppercase text-[#D8C9B5]">
              {BRAND_INFO.location} <span aria-hidden="true" className="mx-2 text-[#A58A64]">·</span>{' '}
              {BRAND_INFO.statusLabel}
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.06] tracking-[-0.01em] text-[#F2EDE3] text-balance">
              Where Luxury Finds Its Serenity.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[#F2EDE3]/88 max-w-xl">
              A refined expression of comfort, elegance and exceptional hospitality awaits you in Abuja.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={scrollToIntroduction}
                className="inline-flex items-center gap-3 min-h-[48px] px-7 py-3.5 bg-[#F2EDE3] text-[#292824] text-xs font-medium tracking-[0.18em] uppercase hover:bg-[#D8C9B5] transition-colors duration-200 cursor-pointer"
              >
                <span>Discover Maison Haven</span>
                <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              </button>

              <a
                href="#register-interest"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('register-interest')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-medium tracking-[0.18em] uppercase text-[#D8C9B5] hover:text-[#F2EDE3] underline underline-offset-8 decoration-[#A58A64] transition-colors py-2"
              >
                Register Your Interest
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section id="introduction" className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Maison Haven · Maitama
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292824] text-balance">
                A Place to Feel at Home.
              </h2>
              <p className="text-base sm:text-[17px] leading-[1.75] text-[#292824]/82 max-w-prose">
                At Maison Haven, luxury is not simply what you see; it is what you feel. From the warmth of our welcome to the comfort of your surroundings, every detail is designed to make you feel valued, relaxed, secure and at home.
              </p>

              <div className="pt-4 border-t border-[#292824]/12 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-[#292824] tabular-nums">25</p>
                  <p className="mt-1 text-xs tracking-wide text-[#292824]/65">Private Rooms</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-[#292824]">Maitama</p>
                  <p className="mt-1 text-xs tracking-wide text-[#292824]/65">Abuja District</p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl text-[#292824]">Soon</p>
                  <p className="mt-1 text-xs tracking-wide text-[#292824]/65">Opening Status</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <EditorialImage
                assetKey="introLounge"
                showCaption
                className="aspect-[4/3] lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOMMODATION PREVIEW */}
      <section className="py-20 sm:py-28 border-t border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#292824]/10">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Accommodation Preview
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#292824] text-balance">
                Restful Rooms Designed for Privacy & Comfort.
              </h2>
            </div>

            <a
              href="/accommodation"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/accommodation');
              }}
              className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] uppercase text-[#292824] hover:text-[#A58A64] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
            </a>
          </div>

          <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {ROOM_CATEGORIES.map((room) => (
              <article key={room.id} className="flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  <EditorialImage
                    assetKey={room.imageKey}
                    showCaption
                    className="aspect-[4/3]"
                  />

                  <div className="space-y-3">
                    <p className="text-xs tracking-[0.16em] uppercase text-[#292824]/60 tabular-nums">
                      {room.roomRange} <span aria-hidden="true" className="mx-1.5">·</span>{' '}
                      {room.bedType} <span aria-hidden="true" className="mx-1.5">·</span> Max{' '}
                      {room.maxOccupancy} Guests
                      {room.hasBalcony ? ' · Private Balcony' : ''}
                    </p>

                    <div className="flex items-baseline justify-between gap-4 border-b border-[#292824]/10 pb-3">
                      <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#292824]">
                        {room.name}
                      </h3>
                      <p className="font-serif text-2xl text-[#292824] tabular-nums whitespace-nowrap">
                        {room.formattedRate}
                        <span className="font-sans text-xs text-[#292824]/60 ml-1">/ night</span>
                      </p>
                    </div>

                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#292824]/80">
                      {room.summary}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="/accommodation"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/accommodation');
                    }}
                    className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-[#292824] hover:text-[#A58A64] underline underline-offset-8 decoration-[#A58A64]/60 transition-colors"
                  >
                    <span>View {room.name} Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCES & FACILITIES PREVIEW */}
      <section className="py-20 sm:py-28 bg-[#EAE2D3] border-y border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Experiences & Facilities
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#292824] text-balance">
                Thoughtful Amenities Planned for Your Stay.
              </h2>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#292824]/80">
                From calm morning dining to restorative wellness and private executive gatherings, all ten hotel facilities are planned to welcome guests when Maison Haven officially opens.
              </p>

              <EditorialImage
                assetKey="swimmingPool"
                showCaption
                className="aspect-video mt-4"
              />

              <div className="pt-2">
                <a
                  href="/experiences"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/experiences');
                  }}
                  className="inline-flex items-center gap-3 min-h-[44px] px-6 py-3 border border-[#292824] text-xs font-medium tracking-[0.16em] uppercase text-[#292824] hover:bg-[#292824] hover:text-[#F2EDE3] transition-colors"
                >
                  <span>Explore Planned Experiences</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#292824]/15">
                {FACILITIES_AND_EXPERIENCES.map((facility) => (
                  <div
                    key={facility.id}
                    className="py-5 sm:px-5 border-b border-[#292824]/15 space-y-1.5"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-medium tracking-widest text-[#A58A64] tabular-nums">
                        {facility.indexLabel}.
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#292824]">
                        {facility.name}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed text-[#292824]/70 pl-7">
                      {facility.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR STORY PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <EditorialImage
                assetKey="ourStoryColonnade"
                showCaption
                className="aspect-[3/4]"
              />
            </div>

            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Our Story
              </p>
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.3] text-[#292824] text-balance">
                “Guests deserve more than accommodation. They deserve an experience defined by warmth, serenity and thoughtful attention.”
              </blockquote>
              <p className="text-base leading-[1.75] text-[#292824]/80 max-w-prose">
                Maison Haven was born from a personal dream and a genuine passion for hospitality — the desire to create a place in Maitama, Abuja where comfort, elegance and exceptional service come together.
              </p>
              <div className="pt-2">
                <a
                  href="/our-story"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/our-story');
                  }}
                  className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] uppercase text-[#292824] hover:text-[#A58A64] underline underline-offset-8 decoration-[#A58A64]/60 transition-colors"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMING SOON & PRE-OPENING REGISTRATION */}
      <section
        id="register-interest"
        className="py-20 sm:py-28 bg-[#292824] text-[#F2EDE3] border-t border-[#A58A64]/25"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#A58A64]">
                {BRAND_INFO.statusLabel} · {BRAND_INFO.location}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.12] text-[#F2EDE3] text-balance">
                A New Expression of Hospitality is Coming to Abuja.
              </h2>
              <p className="text-base leading-relaxed text-[#F2EDE3]/80">
                Maison Haven is preparing to welcome you to a more refined hospitality experience in Maitama, Abuja.
              </p>
              <p className="text-xs leading-relaxed text-[#D8C9B5]/70 pt-2 border-t border-[#F2EDE3]/12">
                Online room reservations and live availability will open upon official launch. Register below to receive priority opening announcements.
              </p>
            </div>

            <div className="lg:col-span-7">
              <InterestRegistrationForm tone="dark" sourcePage="/" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
