export type PageRoute =
  | '/'
  | '/accommodation'
  | '/experiences'
  | '/our-story'
  | '/contact'
  | '/staff-portal';

export type StaffRole = 'super_admin' | 'reception_staff' | 'management';

export type MediaAssetKey =
  | 'heroCourtyard'
  | 'introLounge'
  | 'standardRoom'
  | 'premiumRoom'
  | 'restaurant'
  | 'swimmingPool'
  | 'barLounge'
  | 'spaWellness'
  | 'conferenceSalon'
  | 'ourStoryColonnade';

export interface MediaAsset {
  key: MediaAssetKey;
  src: string;
  alt: string;
  caption: string;
  aspectClass: string;
  isIllustrativeReference: boolean;
}

export interface RoomCategorySpec {
  id: 'standard' | 'premium';
  name: string;
  roomRange: string;
  roomCount: number;
  nightlyRateNgn: number;
  formattedRate: string;
  maxOccupancy: number;
  bedType: string;
  hasBalcony: boolean;
  spatialDifference: string;
  summary: string;
  highlights: string[];
  imageKey: MediaAssetKey;
}

export interface FacilitySpec {
  id: string;
  indexLabel: string;
  name: string;
  classification: string;
  summary: string;
  detail: string;
  availabilityNote: string;
  imageKey?: MediaAssetKey;
}

export interface InterestRegistrationPayload {
  fullName: string;
  email: string;
  whatsappNumber?: string;
  consentAccepted: boolean;
  sourcePage?: string;
}

export interface InterestRegistrationRecord {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string | null;
  consentAccepted: boolean;
  sourcePage: string;
  createdAt: string;
}

export interface ContactEnquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactEnquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'reviewed';
  createdAt: string;
}

export interface RoomInventoryUnit {
  roomNumber: number;
  category: 'standard' | 'premium';
  nightlyRateNgn: number;
  maxOccupancy: 2;
  hasBalcony: boolean;
  preOpeningStatus: 'pre_opening_preparation';
}

export interface IntegrationReadinessItem {
  area: string;
  currentState: 'active' | 'pending_configuration';
  requirement: string;
}

export interface StaffPortalOverview {
  roleScope: StaffRole;
  registrations: InterestRegistrationRecord[];
  enquiries: ContactEnquiryRecord[];
  inventoryBlueprint: RoomInventoryUnit[];
  integrationReadiness: IntegrationReadinessItem[];
}
