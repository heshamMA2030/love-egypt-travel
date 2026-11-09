export type Currency = 'USD' | 'EUR' | 'EGP';

export interface ExchangeRates {
  USD: number;
  EUR: number;
  EGP: number;
}

export type TourCategory = 'all' | 'diving' | 'safari' | 'sinai' | 'boat' | 'dahab';

export type TourDifficulty = 'Easy' | 'Moderate' | 'Advanced';

export interface Tour {
  id: string;
  title: string;
  subtitle: string;
  category: TourCategory;
  categoryLabel: string;
  priceUSD: number;
  originalPriceUSD?: number;
  duration: string;
  rating: number;
  reviewsCount: number;
  difficulty: TourDifficulty;
  groupSize: string;
  pickupZones: string[];
  departureTime: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  whatToBring: string[];
  badge?: string;
  coralSpot?: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  selected?: boolean;
}

export interface Booking {
  id: string;
  bookingReference: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  date: string;
  timeSlot: string;
  pickupHotel: string;
  pickupArea: string;
  adults: number;
  children: number;
  currency: Currency;
  basePriceUSD: number;
  totalUSD: number;
  totalPaidFormatted: string;
  addons: { id: string; name: string; priceUSD: number }[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  country: string;
  countryFlag: string;
  tourTitle: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

export interface MarineCondition {
  waterTempC: number;
  waterTempF: number;
  airTempC: number;
  airTempF: number;
  visibilityMeters: number;
  waveCondition: string;
  windSpeedKnots: number;
  windDirection: string;
  uvIndex: number;
  tideStatus: string;
  diveSites: {
    name: string;
    zone: string;
    status: 'Optimal' | 'Very Good' | 'Fair';
    highlight: string;
    depthMeters: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedTourId?: string;
}
