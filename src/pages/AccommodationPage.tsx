import { ArrowRight, Check, Minus } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import {
  BATHROOM_FACILITIES,
  BRAND_INFO,
  DINING_AND_ROOM_SERVICE_POLICY,
  ROOM_CATEGORIES,
  SHARED_IN_ROOM_AMENITIES,
} from '../data/hotelData';
import type { PageRoute } from '../types/hospitality';

interface AccommodationPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const COMPARISON_ROWS = [
  {
    feature: 'Room Numbers',
    standard: 'Rooms 1–10 (10 rooms)',
    premium: 'Rooms 11–25 (15 rooms)',
  },
  {
    feature: 'Nightly Rate',
    standard: '₦50,000 per night',
    premium: '₦100,000 per night',
  },
  {
    feature: 'Maximum Occupancy',
    standard: '2 guests',
    premium: '2 guests',
  },
  {
    feature: 'Bed Configuration',
    standard: 'Double bed',
    premium: 'King-size bed',
  },
  {
    feature: 'Private Balcony',
    standard: 'Not included',
    premium: 'Included — Private balcony',
  },
  {
    feature: 'Spatial Layout & Design',
    standard: 'Refined, well-proportioned room',
    premium: 'Larger layout with more spacious, sophisticated interior design',
  },
  {
    feature: 'Complimentary Breakfast',
    standard: 'Included (served at the hotel restaurant)',
    premium: 'Included (served at the hotel restaurant)',
  },
  {
    feature: 'Wi-Fi & Room Service',
    standard: 'Complimentary Wi-Fi & room service via reception',
    premium: 'Complimentary Wi-Fi & room service via reception',
  },
];

export function AccommodationPage({ onNavigate }: AccommodationPageProps) {
  return (
    <div>
      {/* Editorial Header */}
      <section className="pt-16 sm:pt-24 pb-14 border-b border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-5">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Accommodation · {BRAND_INFO.totalRooms} Rooms · {BRAND_INFO.statusLabel}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-[#292824] text-balance">
              Thoughtfully Appointed Rooms in Maitama.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-[#292824]/80">
              Maison Haven comprises twenty-five private guest rooms across two distinct categories—Standard Rooms and Premium Rooms—each designed for privacy, rest, and understated comfort.
            </p>
            <p className="text-xs tracking-wide text-[#292824]/65 pt-2">
              Pre-Opening Notice: Live room bookings and availability calendars will be activated upon official opening. You may register your interest or contact our pre-opening desk below.
            </p>
          </div>
        </div>
      </section>

      {/* Two Room Categories — Detailed Architectural Presentation */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-24">
          {ROOM_CATEGORIES.map((room, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                key={room.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
              >
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : ''}`}>
                  <EditorialImage
                    assetKey={room.imageKey}
                    showCaption
                    className="aspect-[4/3]"
                  />
                </div>

                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="space-y-2 border-b border-[#292824]/15 pb-5">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#A58A64] tabular-nums">
                      {room.roomRange} · Maximum {room.maxOccupancy} Guests
                    </p>
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
                        {room.name}
                      </h2>
                      <p className="font-serif text-3xl text-[#292824] tabular-nums">
                        {room.formattedRate}
                        <span className="font-sans text-xs text-[#292824]/60 ml-1">/ night</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-[#292824]/82">
                    {room.summary}
                  </p>

                  <dl className="divide-y divide-[#292824]/10 border-y border-[#292824]/10 text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#292824]/60">Bed</dt>
                      <dd className="font-medium text-[#292824] text-right">{room.bedType}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#292824]/60">Private Balcony</dt>
                      <dd className="font-medium text-[#292824] text-right">
                        {room.hasBalcony ? 'Included' : 'Not included'}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#292824]/60">Room Allocation</dt>
                      <dd className="font-medium text-[#292824] text-right tabular-nums">
                        {room.roomRange}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#292824]/60">Occupancy Limit</dt>
                      <dd className="font-medium text-[#292824] text-right tabular-nums">
                        Max {room.maxOccupancy} guests
                      </dd>
                    </div>
                  </dl>

                  <ul className="space-y-2 pt-1">
                    {room.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#292824]/85">
                        <Check className="w-4 h-4 text-[#A58A64] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('/', '#register-interest')}
                      className="min-h-[46px] px-6 py-3 bg-[#292824] text-[#F2EDE3] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[#3A3832] transition-colors cursor-pointer"
                    >
                      Register Your Interest
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('/contact')}
                      className="min-h-[46px] px-6 py-3 border border-[#292824]/30 text-[#292824] text-xs font-medium tracking-[0.16em] uppercase hover:border-[#292824] transition-colors cursor-pointer"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Clear Side-by-Side Comparison */}
      <section className="py-16 sm:py-24 bg-[#EAE2D3] border-y border-[#292824]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
              Category Comparison
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#292824]">
              Comparing Standard & Premium Rooms.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#292824]/25">
                  <th className="py-4 pr-6 text-xs font-medium tracking-[0.18em] uppercase text-[#292824]/60">
                    Specification
                  </th>
                  <th className="py-4 px-6 font-serif text-2xl font-normal text-[#292824]">
                    Standard Room
                  </th>
                  <th className="py-4 pl-6 font-serif text-2xl font-normal text-[#292824]">
                    Premium Room
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292824]/12 text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="py-4 pr-6 font-medium text-[#292824]">{row.feature}</td>
                    <td className="py-4 px-6 text-[#292824]/80 tabular-nums">
                      {row.standard === 'Not included' ? (
                        <span className="inline-flex items-center gap-2 text-[#292824]/55">
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          Not included
                        </span>
                      ) : (
                        row.standard
                      )}
                    </td>
                    <td className="py-4 pl-6 text-[#292824] font-medium tabular-nums">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Shared In-Room Amenities, Bathroom Facilities & Breakfast Policy */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Shared In-Room Amenities */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Included Across All 25 Rooms
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#292824]">
                Shared In-Room Amenities
              </h2>
              <ul className="divide-y divide-[#292824]/10 border-t border-[#292824]/10">
                {SHARED_IN_ROOM_AMENITIES.map((amenity) => (
                  <li key={amenity} className="py-3 text-sm text-[#292824]/85">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bathroom Facilities */}
            <div className="lg:col-span-3 space-y-5">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Private En-Suite
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#292824]">
                Bathroom Facilities
              </h2>
              <ul className="divide-y divide-[#292824]/10 border-t border-[#292824]/10">
                {BATHROOM_FACILITIES.map((item) => (
                  <li key={item} className="py-3 text-sm text-[#292824]/85">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Room Service & Breakfast Policy */}
            <div className="lg:col-span-4 space-y-6 bg-[#EAE2D3] p-7 sm:p-9 border border-[#292824]/12 self-start">
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#A58A64]">
                Dining & Service Policy
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#292824]">
                Breakfast & Room Service
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[#292824]/85">
                <p>{DINING_AND_ROOM_SERVICE_POLICY.breakfastNote}</p>
                <p className="pt-4 border-t border-[#292824]/12">
                  {DINING_AND_ROOM_SERVICE_POLICY.roomServiceNote}
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/', '#register-interest')}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-[#292824] hover:text-[#A58A64] underline underline-offset-8 decoration-[#A58A64] cursor-pointer"
                >
                  <span>Register Pre-Opening Interest</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
