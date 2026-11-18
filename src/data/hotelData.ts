import type { FacilitySpec, PageRoute, RoomCategorySpec } from '../types/hospitality';

export const BRAND_INFO = {
  name: 'MAISON HAVEN',
  displayTitle: 'Maison Haven',
  tagline: 'Where Luxury Finds Its Serenity.',
  location: 'Maitama, Abuja, Nigeria',
  statusLabel: 'COMING SOON',
  telephoneDisplay: '+234 816 752 4467',
  telephoneHref: 'tel:+2348167524467',
  whatsappNumberE164: '2348167524467',
  whatsappPrefill:
    'Hello Maison Haven, I would like to enquire about your upcoming opening in Maitama, Abuja.',
  plannedEmail: 'info@maisonhaven.com',
  emailStatusNote: 'Planned address — pending official launch configuration',
  totalRooms: 25,
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || BRAND_INFO.whatsappPrefill);
  return `https://wa.me/${BRAND_INFO.whatsappNumberE164}?text=${message}`;
}

export const NAVIGATION_ITEMS: Array<{ label: string; route: Exclude<PageRoute, '/staff-portal'> }> = [
  { label: 'Home', route: '/' },
  { label: 'Accommodation', route: '/accommodation' },
  { label: 'Experiences', route: '/experiences' },
  { label: 'Our Story', route: '/our-story' },
  { label: 'Contact', route: '/contact' },
];

export const ROOM_CATEGORIES: RoomCategorySpec[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    roomRange: 'Rooms 1–10',
    roomCount: 10,
    nightlyRateNgn: 50000,
    formattedRate: '₦50,000',
    maxOccupancy: 2,
    bedType: 'Double bed',
    hasBalcony: false,
    spatialDifference: 'Intimate, well-proportioned sanctuary without a balcony',
    summary:
      'Designed for quiet rest and effortless comfort, our ten Standard Rooms offer an understated haven with a double bed, dedicated workspace, and calm interior proportions.',
    highlights: [
      'Rooms 1–10 (10 rooms)',
      '₦50,000 per night',
      'Maximum occupancy: 2 guests',
      'Double bed',
      'Complimentary breakfast at the hotel restaurant',
      'Complimentary Wi-Fi',
      'Private bathroom',
      'Room service via reception',
    ],
    imageKey: 'standardRoom',
  },
  {
    id: 'premium',
    name: 'Premium Room',
    roomRange: 'Rooms 11–25',
    roomCount: 15,
    nightlyRateNgn: 100000,
    formattedRate: '₦100,000',
    maxOccupancy: 2,
    bedType: 'King-size bed',
    hasBalcony: true,
    spatialDifference: 'Larger room layout, private balcony, and elevated interior design',
    summary:
      'Our fifteen Premium Rooms pair a generous floor plan and king-size bed with a private balcony and more spacious, sophisticated interior appointments.',
    highlights: [
      'Rooms 11–25 (15 rooms)',
      '₦100,000 per night',
      'Maximum occupancy: 2 guests',
      'King-size bed',
      'Private balcony',
      'Larger room layout & sophisticated interior design',
      'Complimentary breakfast at the hotel restaurant',
      'Complimentary Wi-Fi',
      'Private bathroom',
      'Room service via reception',
    ],
    imageKey: 'premiumRoom',
  },
];

export const SHARED_IN_ROOM_AMENITIES: string[] = [
  'Air conditioning',
  'Smart television',
  'Refrigerator',
  'Wardrobe',
  'Work desk',
  'Electric kettle',
  'Complimentary toiletries',
  'Private bathroom',
  'In-room safe',
  'Complimentary bottled water',
];

export const BATHROOM_FACILITIES: string[] = [
  'Hot and cold running water',
  'Shower',
  'Toilet',
  'Washbasin',
  'Mirror',
];

export const DINING_AND_ROOM_SERVICE_POLICY = {
  roomServiceNote:
    'Room service for food and drinks is available through reception, with delivery directly to the guest’s room.',
  breakfastNote:
    'Complimentary breakfast is included in both room categories and served exclusively at the hotel restaurant. Breakfast is not delivered to guest rooms.',
};

export const FACILITIES_AND_EXPERIENCES: FacilitySpec[] = [
  {
    id: 'restaurant',
    indexLabel: '01',
    name: 'Restaurant',
    classification: 'Culinary & Morning Dining',
    summary:
      'An intimate dining room welcoming guests for complimentary daily breakfast and unhurried seasonal meals.',
    detail:
      'Designed around warm natural light and quiet table spacing, the restaurant will serve complimentary breakfast each morning for all residing guests alongside curated lunch and evening dining once open.',
    availabilityNote: 'Planned to welcome guests upon official opening',
    imageKey: 'restaurant',
  },
  {
    id: 'swimming-pool',
    indexLabel: '02',
    name: 'Swimming Pool',
    classification: 'Outdoor Leisure',
    summary:
      'A serene outdoor pool terrace framed for quiet morning laps and unhurried afternoon repose.',
    detail:
      'Set within sheltered greenery away from the bustle of the city, the swimming pool terrace is conceived as a peaceful sanctuary for hotel residents.',
    availabilityNote: 'Planned to welcome guests upon official opening',
    imageKey: 'swimmingPool',
  },
  {
    id: 'bar-lounge',
    indexLabel: '03',
    name: 'Bar and Lounge',
    classification: 'Evening Hospitality',
    summary:
      'A discreet, atmospheric gathering space for quiet conversation, aperitifs, and late-evening relaxation.',
    detail:
      'Crafted with tactile stone, warm bronze details, and comfortable lounge seating, offering guests an inviting alternative to formal city venues.',
    availabilityNote: 'Planned to welcome guests upon official opening',
    imageKey: 'barLounge',
  },
  {
    id: 'conference-events',
    indexLabel: '04',
    name: 'Conference and Event Facilities',
    classification: 'Private Gatherings & Meetings',
    summary:
      'Thoughtfully proportioned meeting and private event spaces tailored for diplomatic briefings, executive retreats, and intimate occasions.',
    detail:
      'Equipped for discreet hospitality with attentive reception coordination and refined daylight-lit interiors.',
    availabilityNote: 'Planned to welcome guests upon official opening',
    imageKey: 'conferenceSalon',
  },
  {
    id: 'spa-wellness',
    indexLabel: '05',
    name: 'Spa and Wellness Centre',
    classification: 'Restorative Care',
    summary:
      'A calm wellness retreat created to help guests unwind and restore balance during their stay in Abuja.',
    detail:
      'Focused on tranquillity, sensory calm, and unhurried restorative rituals in a private setting.',
    availabilityNote: 'Planned to welcome guests upon official opening',
    imageKey: 'spaWellness',
  },
  {
    id: 'gym-fitness',
    indexLabel: '06',
    name: 'Gym and Fitness Centre',
    classification: 'Daily Movement',
    summary:
      'A dedicated fitness space enabling guests to maintain their personal exercise routines in privacy and comfort.',
    detail:
      'Planned with climate-controlled comfort and essential conditioning equipment for residents.',
    availabilityNote: 'Planned to welcome guests upon official opening',
  },
  {
    id: 'laundry-service',
    indexLabel: '07',
    name: 'Laundry Service',
    classification: 'Guest Care',
    summary:
      'Attentive garment care and pressing coordinated seamlessly through reception for effortless business and leisure stays.',
    detail:
      'Designed to ensure guests are always prepared with fresh, carefully tended attire throughout their visit.',
    availabilityNote: 'Planned to welcome guests upon official opening',
  },
  {
    id: 'secure-parking',
    indexLabel: '08',
    name: 'Secure Parking',
    classification: 'Arrival & Security',
    summary:
      'Dedicated on-site parking with controlled access, providing residents and visitors peace of mind from arrival to departure.',
    detail:
      'Integrated into Maison Haven’s commitment to privacy, safety, and discreet arrival.',
    availabilityNote: 'Planned to welcome guests upon official opening',
  },
  {
    id: 'complimentary-wifi',
    indexLabel: '09',
    name: 'Complimentary Wi-Fi',
    classification: 'Seamless Connectivity',
    summary:
      'Reliable high-speed wireless connectivity throughout guest rooms and shared hotel spaces at no additional charge.',
    detail:
      'Supporting remote work, diplomatic correspondence, and effortless personal communication.',
    availabilityNote: 'Planned to welcome guests upon official opening',
  },
  {
    id: 'room-service',
    indexLabel: '10',
    name: 'Room Service',
    classification: 'In-Room Dining Delivery',
    summary:
      'Food and beverage service coordinated directly through reception and delivered thoughtfully to your room.',
    detail:
      'Please note that complimentary breakfast is served exclusively in the hotel restaurant and is not delivered to guest rooms.',
    availabilityNote: 'Planned to welcome guests upon official opening',
  },
];

export const APPROVED_BRAND_STORY = {
  leadParagraph:
    'Maison Haven was born from a personal dream and a genuine passion for hospitality — the desire to create a place where comfort, elegance and exceptional service come together.',
  philosophyParagraph:
    'Every detail is guided by a simple philosophy: guests deserve more than accommodation. They deserve an experience defined by warmth, serenity and thoughtful attention.',
  locationParagraph:
    'Located in Maitama, Abuja, Maison Haven aspires to offer a refined hospitality experience where every stay feels welcoming, peaceful and memorable.',
};

export const SEO_BY_ROUTE: Record<PageRoute, { title: string; description: string }> = {
  '/': {
    title: 'Maison Haven | Luxury Boutique Hotel in Maitama, Abuja',
    description:
      'Where Luxury Finds Its Serenity. Maison Haven is an upcoming luxury boutique hotel in Maitama, Abuja, Nigeria. Register your interest ahead of our opening.',
  },
  '/accommodation': {
    title: 'Accommodation | Maison Haven Maitama, Abuja',
    description:
      'Preview Standard Rooms (₦50,000/night) and Premium Rooms with private balconies (₦100,000/night) at Maison Haven, Maitama, Abuja. Opening soon.',
  },
  '/experiences': {
    title: 'Experiences & Facilities | Maison Haven Abuja',
    description:
      'Explore the planned restaurant, swimming pool, bar and lounge, spa, gym, and private event facilities awaiting guests at Maison Haven, Maitama.',
  },
  '/our-story': {
    title: 'Our Story | Maison Haven Boutique Hotel Abuja',
    description:
      'Discover the philosophy behind Maison Haven in Maitama, Abuja—where warmth, serenity, privacy, and thoughtful attention define every stay.',
  },
  '/contact': {
    title: 'Contact & Enquiries | Maison Haven Maitama, Abuja',
    description:
      'Connect with Maison Haven in Maitama, Abuja via telephone or WhatsApp (+234 816 752 4467), or submit a pre-opening enquiry.',
  },
  '/staff-portal': {
    title: 'Private Management Portal | Maison Haven',
    description: 'Private pre-opening management workspace for authorized Maison Haven personnel.',
  },
};
