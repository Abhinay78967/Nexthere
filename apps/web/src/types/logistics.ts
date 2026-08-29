export interface VehicleCategory {
  id: string;
  name: string;
  badge?: string;
  capacityKg: number;
  dimensions: string; // e.g. "7ft x 4.5ft x 5ft"
  baseFare: number;
  baseKm: number;
  ratePerKm: number;
  etaMinutes: number;
  icon: string;
  description: string;
  popularFor: string;
}

export interface LocationStop {
  id: string;
  address: string;
  landmark?: string;
  floor: number;
  hasElevator: boolean;
  contactName: string;
  contactPhone: string;
}

export interface HelperConfig {
  type: 'none' | 'driver_helper' | 'two_helpers';
  pickupFloor: number;
  dropFloor: number;
  pickupElevator: boolean;
  dropElevator: boolean;
}

export interface LogisticsBooking {
  id: string;
  trackingNumber: string;
  vehicle: VehicleCategory;
  pickup: LocationStop;
  drops: LocationStop[];
  estimatedDistanceKm: number;
  estimatedDurationMins: number;
  baseFare: number;
  distanceFare: number;
  helperFare: number;
  insuranceFare: number;
  discountFare: number;
  totalFare: number;
  goodsType: string;
  declaredValue?: number;
  paymentMethod: 'UPI' | 'CASH' | 'CORPORATE_CREDIT';
  status: 'DRIVER_ASSIGNING' | 'DRIVER_ARRIVING' | 'LOADING' | 'IN_TRANSIT' | 'DELIVERED';
  driver?: {
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
