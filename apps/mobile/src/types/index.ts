export type ScreenName =
  | 'SPLASH'
  | 'LOGIN'
  | 'HOME'
  | 'SELECT_VEHICLE'
  | 'SELECT_HELPER'
  | 'CHECKOUT'
  | 'LIVE_TRACKING'
  | 'ORDER_HISTORY'
  | 'B2B_PORTAL';

export interface MobileVehicleCategory {
  id: string;
  name: string;
  badge?: string;
  capacityKg: number;
  dimensions: string;
  baseFare: number;
  baseKm: number;
  ratePerKm: number;
  etaMinutes: number;
  icon: string;
  description: string;
  popularFor: string;
}

export interface MobileLocationStop {
  id: string;
  address: string;
  landmark?: string;
  floor: number;
  hasElevator: boolean;
  contactName: string;
  contactPhone: string;
}

export interface MobileHelperConfig {
  type: 'none' | 'driver_helper' | 'two_helpers';
  pickupFloor: number;
  dropFloor: number;
  pickupElevator: boolean;
  dropElevator: boolean;
}

export interface MobileBooking {
  id: string;
  trackingNumber: string;
  vehicle: MobileVehicleCategory;
  pickup: MobileLocationStop;
  drops: MobileLocationStop[];
  distanceKm: number;
  durationMins: number;
  baseFare: number;
  distanceFare: number;
  helperFare: number;
  insuranceFare: number;
  discountFare: number;
  totalFare: number;
  goodsType: string;
  declaredValue?: number;
  paymentMethod: 'UPI' | 'CASH' | 'CORPORATE_CREDIT';
  status: 'ASSIGNING' | 'ARRIVING' | 'LOADING' | 'IN_TRANSIT' | 'DELIVERED';
  driver: {
    name: string;
    phone: string;
    rating: number;
    tripsCount: number;
    vehicleNumber: string;
    vehicleModel: string;
    photoUrl: string;
  };
  pickupOtp: string;
  createdAt: string;
}
