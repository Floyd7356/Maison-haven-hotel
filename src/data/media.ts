import type { MediaAsset, MediaAssetKey } from '../types/hospitality';

/**
 * Centralized Pre-Opening Media Registry
 * ---------------------------------------
 * All photographs below are illustrative architectural & hospitality references
 * generated for Maison Haven's pre-opening digital presence.
 * Replace each `src` path with official Maison Haven photography prior to launch.
 */
export const MEDIA_REGISTRY: Record<MediaAssetKey, MediaAsset> = {
  heroCourtyard: {
    key: 'heroCourtyard',
    src: '/src/assets/images/hero_maison_haven_1795039039597.jpg',
    alt: 'Tranquil luxury boutique hotel courtyard pavilion in limestone and warm timber beside a calm reflecting pool',
    caption: 'Illustrative architectural study — Courtyard sanctuary & serene water reflection',
    aspectClass: 'aspect-video',
    isIllustrativeReference: true,
  },
  introLounge: {
    key: 'introLounge',
    src: '/src/assets/images/intro_lounge_interior_1795039039797.jpg',
    alt: 'Warm travertine reception desk and tailored ivory linen armchairs bathed in natural daylight',
    caption: 'Illustrative reference — Reception & arrival lounge atmosphere',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  standardRoom: {
    key: 'standardRoom',
    src: '/src/assets/images/standard_room_double_1795039040669.jpg',
    alt: 'Boutique hotel Standard Room with a double bed in ivory linen, oak headboard, and minimalist writing desk',
    caption: 'Illustrative reference — Standard Room category (Rooms 1–10, Double bed)',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  premiumRoom: {
    key: 'premiumRoom',
    src: '/src/assets/images/premium_room_suite_1795039040602.jpg',
    alt: 'Spacious Premium Room featuring a king-size bed, lounge seating, and glass doors opening onto a private balcony',
    caption: 'Illustrative reference — Premium Room category (Rooms 11–25, King-size bed & private balcony)',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  restaurant: {
    key: 'restaurant',
    src: '/src/assets/images/restaurant_dining_salon_1795039041337.jpg',
    alt: 'Intimate hotel restaurant dining room with travertine tables, linen napkins, and warm morning sunlight',
    caption: 'Illustrative reference — Planned hotel restaurant dining room',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  swimmingPool: {
    key: 'swimmingPool',
    src: '/src/assets/images/swimming_pool_terrace_1795039041942.jpg',
    alt: 'Serene outdoor swimming pool bordered by limestone paving, champagne sun loungers, and palms',
    caption: 'Illustrative reference — Planned swimming pool and terrace',
    aspectClass: 'aspect-video',
    isIllustrativeReference: true,
  },
  barLounge: {
    key: 'barLounge',
    src: '/src/assets/images/bar_lounge_sanctuary_1795039041955.jpg',
    alt: 'Upscale minimalist hotel bar with charcoal stone counter, muted bronze shelving, and boucle seating',
    caption: 'Illustrative reference — Planned bar and evening lounge',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  spaWellness: {
    key: 'spaWellness',
    src: '/src/assets/images/spa_wellness_suite_1795039042115.jpg',
    alt: 'Calm spa sanctuary with carved stone basin, rolled ivory towels, and garden greenery outside',
    caption: 'Illustrative reference — Planned spa and wellness sanctuary',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  conferenceSalon: {
    key: 'conferenceSalon',
    src: '/src/assets/images/conference_event_salon_1795039042995.jpg',
    alt: 'Executive conference and private event salon with dark oak table, tailored seating, and sheer daylight drapery',
    caption: 'Illustrative reference — Planned conference and private event room',
    aspectClass: 'aspect-[4/3]',
    isIllustrativeReference: true,
  },
  ourStoryColonnade: {
    key: 'ourStoryColonnade',
    src: '/src/assets/images/our_story_colonnade_1795039043718.jpg',
    alt: 'Limestone architectural colonnade beside a quiet landscaped garden walkway in soft golden light',
    caption: 'Illustrative architectural study — Serenity, proportion, and natural warmth',
    aspectClass: 'aspect-[3/4]',
    isIllustrativeReference: true,
  },
};
