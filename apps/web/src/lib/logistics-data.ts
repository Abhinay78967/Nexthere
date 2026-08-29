import { VehicleCategory, HelperConfig } from '@/types/logistics';

export const VEHICLE_FLEET: VehicleCategory[] = [
  {
    id: '2w',
    name: '2-Wheeler (Bike Courier)',
    badge: 'Fastest',
    capacityKg: 20,
    dimensions: '40cm x 40cm x 40cm',
    baseFare: 45,
    baseKm: 2,
    ratePerKm: 8.5,
    etaMinutes: 3,
    icon: '🛵',
    description: 'Instant delivery for documents, parcels, food & small retail boxes.',
    popularFor: 'eCommerce, Samples, Pharmacy, Documents',
  },
  {
    id: '3w',
    name: '3-Wheeler (Tempo/Piaggio)',
    badge: 'Popular',
    capacityKg: 500,
    dimensions: '5.5ft x 4ft x 4ft',
    baseFare: 160,
    baseKm: 2,
    ratePerKm: 15.0,
    etaMinutes: 4,
    icon: '🛺',
    description: 'Ideal for small shop inventory, carton shifting, and appliances.',
    popularFor: 'Retail Cartons, Crates, Small Electronics',
  },
  {
    id: '3w-ev',
    name: '3-Wheeler Electric (EV)',
    badge: '🌱 Eco Saver',
    capacityKg: 500,
    dimensions: '5.5ft x 4ft x 4.5ft',
    baseFare: 150,
    baseKm: 2,
    ratePerKm: 13.5,
    etaMinutes: 5,
    icon: '⚡',
    description: 'Zero emission city deliveries with reduced carbon footprint.',
    popularFor: 'Eco-conscious FMCG & City Logistics',
  },
  {
    id: 'tata-ace',
    name: 'Tata Ace (Chota Hathi)',
    badge: '⭐ Most Popular',
    capacityKg: 750,
    dimensions: '7ft x 4.5ft x 5ft',
    baseFare: 230,
    baseKm: 2,
    ratePerKm: 19.0,
    etaMinutes: 4,
    icon: '🚛',
    description: 'The standard choice for house shifting, furniture, and wholesale goods.',
    popularFor: '1-BHK Shifting, Plywood, Furniture, Hardware',
  },
  {
    id: 'pickup-8ft',
    name: 'Pickup 8ft (Bolero Maxi)',
    badge: 'Heavy Duty',
    capacityKg: 1200,
    dimensions: '8ft x 4.5ft x 5.5ft',
    baseFare: 320,
    baseKm: 2,
    ratePerKm: 23.0,
    etaMinutes: 6,
    icon: '🛻',
    description: 'Heavy construction material, machinery, and larger commercial cargo.',
    popularFor: 'Steel Pipes, Heavy Machinery, 2-BHK Moving',
  },
  {
    id: 'tata-407',
    name: 'Tata 407 (10ft)',
    badge: 'Industrial',
    capacityKg: 2500,
    dimensions: '9.5ft x 5.5ft x 6ft',
    baseFare: 550,
    baseKm: 3,
    ratePerKm: 32.0,
    etaMinutes: 8,
    icon: '🚚',
    description: 'Industrial warehouse relocations, bulk event logistics, and heavy freight.',
    popularFor: 'Factory Logistics, Full Office Shifting',
  },
  {
    id: 'container-14ft',
    name: '14ft / 19ft Container Truck',
    badge: 'Interstate',
    capacityKg: 5000,
    dimensions: '14ft x 6ft x 7ft',
    baseFare: 1200,
    baseKm: 5,
    ratePerKm: 42.0,
    etaMinutes: 15,
    icon: '🚛',
    description: 'Covered container transport for inter-city goods distribution and heavy cargo.',
    popularFor: 'Intercity Cargo, Industrial Manufacturing',
  },
];

export const GOODS_TYPES = [
  'General Merchandise & Cartons',
  'Home Furniture & Appliances',
  'Electronic Equipment & Computers',
  'Hardware, Steel & Construction Material',
  'Textiles, Garments & Fabrics',
  'Industrial Machinery & Parts',
  'FMCG & Packaged Food',
  'Documents & Small Items',
];

export function calculateFare({
  vehicle,
  distanceKm,
  helperConfig,
  includeInsurance,
  declaredValue,
  couponCode,
}: {
  vehicle: VehicleCategory;
  distanceKm: number;
  helperConfig: HelperConfig;
  includeInsurance: boolean;
  declaredValue?: number;
  couponCode?: string;
}) {
  const baseFare = vehicle.baseFare;
  const extraKm = Math.max(0, distanceKm - vehicle.baseKm);
  const distanceFare = Math.round(extraKm * vehicle.ratePerKm);

  // Helper calculation
  let helperFare = 0;
  if (helperConfig.type === 'driver_helper') {
    helperFare = 150;
    // Floor surcharge if no elevator
    if (!helperConfig.pickupElevator && helperConfig.pickupFloor > 0) {
      helperFare += helperConfig.pickupFloor * 40;
    }
    if (!helperConfig.dropElevator && helperConfig.dropFloor > 0) {
      helperFare += helperConfig.dropFloor * 40;
    }
  } else if (helperConfig.type === 'two_helpers') {
    helperFare = 350;
    if (!helperConfig.pickupElevator && helperConfig.pickupFloor > 0) {
      helperFare += helperConfig.pickupFloor * 70;
    }
    if (!helperConfig.dropElevator && helperConfig.dropFloor > 0) {
      helperFare += helperConfig.dropFloor * 70;
    }
  }

  // Insurance calculation
  let insuranceFare = 0;
  if (includeInsurance) {
    if (declaredValue && declaredValue > 50000) {
      insuranceFare = 49;
    } else {
      insuranceFare = 19;
    }
  }

  // Discount
  let discountFare = 0;
  if (couponCode && couponCode.toUpperCase() === 'NEXTHERE50') {
    discountFare = 50;
  } else if (couponCode && couponCode.toUpperCase() === 'FIRSTLOG') {
    discountFare = Math.min(100, Math.round((baseFare + distanceFare) * 0.15));
  }

  const subtotal = baseFare + distanceFare + helperFare + insuranceFare;
  const totalFare = Math.max(vehicle.baseFare, subtotal - discountFare);

  return {
    baseFare,
    distanceFare,
    helperFare,
    insuranceFare,
    discountFare,
    totalFare,
  };
}
