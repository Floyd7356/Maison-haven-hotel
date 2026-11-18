/**
 * Maison Haven — Post-Launch Reservation & Hotel Management Architecture Blueprint
 * -------------------------------------------------------------------------------
 * Pre-Opening Guard: Live booking and payment processing are intentionally inactive
 * until the official hotel opening, verified payment gateway keys, transactional
 * messaging credentials, and managed PostgreSQL / Cloud SQL storage are provisioned.
 */

export type FutureRoomCategory = 'standard' | 'premium';

export type ReservationStatus =
  | 'pending_payment'
  | 'confirmed_paid'
  | 'checked_in'
  | 'checked_out'
  | 'cancelled';

export interface AvailabilityQuery {
  checkInDate: string; // ISO YYYY-MM-DD
  checkOutDate: string; // ISO YYYY-MM-DD
  category: FutureRoomCategory;
  guestCount: 1 | 2; // Strictly enforced max occupancy: 2 guests per room
}

export interface UpfrontBookingQuote {
  category: FutureRoomCategory;
  nights: number;
  nightlyRateNgn: 50000 | 100000;
  totalAmountNgn: number;
  paymentPolicy: '100_percent_upfront';
}

export interface FutureReservationRecord {
  reservationId: string;
  roomNumber: number; // 1-10 for standard, 11-25 for premium
  category: FutureRoomCategory;
  checkInDate: string;
  checkOutDate: string;
  guestCount: 1 | 2;
  primaryGuestName: string;
  primaryGuestEmail: string;
  primaryGuestPhone: string;
  totalPaidNgn: number;
  paymentReference: string;
  paymentVerifiedAt: string;
  status: ReservationStatus;
  notificationChannels: {
    emailSent: boolean;
    whatsappSent: boolean;
    smsSent: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Concurrency & Double-Booking Prevention Contract:
 * 1. Check room availability inside a SERIALIZABLE SQL transaction (or Postgres
 *    daterange EXCLUSION constraint on (room_number, daterange(check_in, check_out, '[)'))).
 * 2. Create a short-lived pending hold during 100% upfront checkout.
 * 3. Confirm reservation strictly upon server-side payment webhook HMAC verification.
 * 4. Release inventory atomically on cancellation or expired unpaid holds.
 */
export const FUTURE_RESERVATION_POLICIES = {
  maxGuestsPerRoom: 2,
  standardRoomNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  premiumRoomNumbers: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  upfrontPaymentPercentage: 100,
  breakfastDeliveryAllowed: false,
  breakfastLocation: 'Hotel Restaurant',
} as const;
