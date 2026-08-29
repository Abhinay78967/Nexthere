'use client';

import React, { useState, useEffect } from 'react';
import { VEHICLE_FLEET, GOODS_TYPES, calculateFare } from '@/lib/logistics-data';
import { VehicleCategory, LocationStop, HelperConfig, LogisticsBooking } from '@/types/logistics';
import {
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Users,
  CheckCircle2,
  Phone,
  Navigation,
  Share2,
  Copy,
  ChevronRight,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

export function InteractiveBookingApp() {
  // Mode
  const [tripType, setTripType] = useState<'city' | 'intercity'>('city');

  // Address State
  const [pickup, setPickup] = useState<LocationStop>({
    id: 'pickup-1',
    address: 'Connaught Place, Central Delhi, New Delhi',
    landmark: 'Near Inner Circle Block B',
    floor: 0,
    hasElevator: true,
    contactName: 'Rahul Sharma',
    contactPhone: '+91 98765 43210',
  });

  const [drops, setDrops] = useState<LocationStop[]>([
    {
      id: 'drop-1',
      address: 'Sector 62, Noida, Uttar Pradesh',
      landmark: 'Near IT Park Tower 2',
      floor: 2,
      hasElevator: true,
      contactName: 'Amit Verma',
      contactPhone: '+91 98111 22334',
    },
  ]);

  const [distanceKm, setDistanceKm] = useState<number>(18.5);

  // Selected Vehicle
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(VEHICLE_FLEET[3]); // Default Tata Ace

  // Helper / Labour Configuration
  const [helperConfig, setHelperConfig] = useState<HelperConfig>({
    type: 'driver_helper',
    pickupFloor: 0,
    dropFloor: 2,
    pickupElevator: true,
    dropElevator: true,
  });

  // Goods & Insurance
  const [goodsType, setGoodsType] = useState<string>(GOODS_TYPES[0]);
  const [declaredValue, setDeclaredValue] = useState<number>(25000);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Coupon & Payment
  const [couponCode, setCouponCode] = useState<string>('NEXTHERE50');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CASH' | 'CORPORATE_CREDIT'>('UPI');

  // Booking Flow State
  const [currentStep, setCurrentStep] = useState<'DETAILS' | 'CONFIRMED'>('DETAILS');
  const [activeBooking, setActiveBooking] = useState<LogisticsBooking | null>(null);
  const [tripProgress, setTripProgress] = useState<number>(15);
  const [tripStatusIndex, setTripStatusIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate live fare
  const fare = calculateFare({
    vehicle: selectedVehicle,
    distanceKm,
    helperConfig,
    includeInsurance,
    declaredValue,
    couponCode: couponApplied ? couponCode : undefined,
  });

  // Add Multi-drop Stop
  const addDropStop = () => {
    if (drops.length >= 5) return;
    setDrops([
      ...drops,
      {
        id: `drop-${drops.length + 1}`,
        address: `Sector ${18 + drops.length * 4}, Gurugram, Haryana`,
        landmark: 'Commercial Hub',
        floor: 1,
        hasElevator: true,
        contactName: 'Receiver Name',
        contactPhone: '+91 99999 88888',
      },
    ]);
    setDistanceKm(prev => Math.round((prev + 12.5) * 10) / 10);
  };

  // Remove Stop
  const removeDropStop = (id: string) => {
    if (drops.length <= 1) return;
    setDrops(drops.filter(d => d.id !== id));
    setDistanceKm(prev => Math.max(5, Math.round((prev - 12.5) * 10) / 10));
  };

  // Submit Booking
  const handleConfirmBooking = () => {
    const booking: LogisticsBooking = {
      id: `NXT-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingNumber: `TRK-${Date.now().toString().slice(-8)}`,
      vehicle: selectedVehicle,
      pickup,
      drops,
      estimatedDistanceKm: distanceKm,
      estimatedDurationMins: Math.round(distanceKm * 2.8),
      baseFare: fare.baseFare,
      distanceFare: fare.distanceFare,
      helperFare: fare.helperFare,
      insuranceFare: fare.insuranceFare,
      discountFare: fare.discountFare,
      totalFare: fare.totalFare,
      goodsType,
      declaredValue,
      paymentMethod,
      status: 'DRIVER_ASSIGNING',
      driver: {
        name: 'Rajesh Kumar Yadav',
        phone: '+91 94729 57044',
        rating: 4.9,
        tripsCount: 1420,
        vehicleNumber: 'DL 1L AA 4821',
        vehicleModel: `${selectedVehicle.name} (White)`,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toISOString(),
    };

    setActiveBooking(booking);
    setCurrentStep('CONFIRMED');
    setTripStatusIndex(0);
    setTripProgress(15);
  };

  // Simulation timer for live trip status progression
  useEffect(() => {
    if (currentStep !== 'CONFIRMED') return;

    const interval = setInterval(() => {
      setTripStatusIndex(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      setTripProgress(prev => Math.min(100, prev + 25));
    }, 8000);

    return () => clearInterval(interval);
  }, [currentStep]);

  const STATUS_STEPS = [
    { title: 'Driver Assigned', desc: 'Rajesh Kumar is on the way to pickup location', eta: '3 mins' },
    { title: 'Arrived at Pickup', desc: 'Driver is at your premises. Loading in progress.', eta: '10 mins' },
    { title: 'In Transit to Drop', desc: 'Consignment moving smoothly towards Noida Hub', eta: '25 mins' },
    { title: 'Delivered (POD Verified)', desc: 'OTP & Signature verified by receiver', eta: 'Completed' },
  ];

  const handleCopyTracking = () => {
    if (!activeBooking) return;
    navigator.clipboard.writeText(`https://nexthere-web.vercel.app/logistics?track=${activeBooking.trackingNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Top Banner Tabs */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              NextHere On-Demand Logistics
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold">
                Guaranteed SLA
              </span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Intra-city & Inter-city commercial transport with live GPS tracking
            </p>
          </div>
        </div>

        {/* Trip Type Selector */}
        <div className="flex items-center bg-muted p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTripType('city')}
            className={`px-4 py-2 rounded-lg transition-all ${
              tripType === 'city' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            City Express (Local)
          </button>
          <button
            type="button"
            onClick={() => setTripType('intercity')}
            className={`px-4 py-2 rounded-lg transition-all ${
              tripType === 'intercity' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Inter-City (All India)
          </button>
        </div>
      </div>

      {currentStep === 'DETAILS' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background border border-border border-t-0 rounded-b-2xl p-6 lg:p-8 shadow-sm">
          
          {/* Left Column: Address & Vehicle Configuration (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Address Route Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> 1. Pickup & Delivery Locations
                </h3>
                <span className="text-xs text-muted-foreground font-medium">
                  Est. Route: <strong className="text-foreground">{distanceKm} km</strong> (~{Math.round(distanceKm * 2.8)} mins)
                </span>
              </div>

              {/* Pickup Box */}
              <div className="p-4 rounded-xl border border-border bg-surface space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                      Pickup Address
                    </label>
                    <input
                      type="text"
                      value={pickup.address}
                      onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter pickup house/building, street, area..."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        value={pickup.landmark || ''}
                        onChange={(e) => setPickup({ ...pickup, landmark: e.target.value })}
                        className="px-3 py-1.5 bg-background border border-input rounded-md"
                        placeholder="Landmark (e.g. Near Metro Gate 2)"
                      />
                      <input
                        type="text"
                        value={pickup.contactPhone}
                        onChange={(e) => setPickup({ ...pickup, contactPhone: e.target.value })}
                        className="px-3 py-1.5 bg-background border border-input rounded-md"
                        placeholder="Sender Phone Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Drop Stops Box */}
              {drops.map((drop, idx) => (
                <div key={drop.id} className="p-4 rounded-xl border border-border bg-surface space-y-3 relative">
                  <div className="flex items-start gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-red-600 block">
                          Drop Location {drops.length > 1 ? `#${idx + 1}` : ''}
                        </label>
                        {drops.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDropStop(drop.id)}
                            className="text-xs text-red-500 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove Stop
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={drop.address}
                        onChange={(e) => {
                          const updated = [...drops];
                          updated[idx].address = e.target.value;
                          setDrops(updated);
                        }}
                        className="w-full px-3.5 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter drop destination address..."
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={drop.contactName}
                          onChange={(e) => {
                            const updated = [...drops];
                            updated[idx].contactName = e.target.value;
                            setDrops(updated);
                          }}
                          className="px-3 py-1.5 bg-background border border-input rounded-md"
                          placeholder="Receiver Name"
                        />
                        <input
                          type="text"
                          value={drop.contactPhone}
                          onChange={(e) => {
                            const updated = [...drops];
                            updated[idx].contactPhone = e.target.value;
                            setDrops(updated);
                          }}
                          className="px-3 py-1.5 bg-background border border-input rounded-md"
                          placeholder="Receiver Phone Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Multi-Drop Add Stop Button */}
              <button
                type="button"
                onClick={addDropStop}
                className="w-full py-2.5 border border-dashed border-primary/40 rounded-xl text-xs font-bold text-primary hover:bg-primary/5 flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Multi-Drop Stop (+ Optimized Delivery Route)
              </button>
            </div>

            {/* 2. Vehicle Selector Carousel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" /> 2. Choose Commercial Vehicle
                </h3>
                <span className="text-xs text-muted-foreground font-semibold">
                  {VEHICLE_FLEET.length} Categories Available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_FLEET.map((v) => {
                  const isSelected = selectedVehicle.id === v.id;
                  const vFare = calculateFare({
                    vehicle: v,
                    distanceKm,
                    helperConfig,
                    includeInsurance,
                    declaredValue,
                    couponCode: couponApplied ? couponCode : undefined,
                  });

                  return (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicle(v)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                          : 'border-border bg-surface hover:border-primary/40 hover:bg-surface-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{v.icon}</span>
                          <div>
                            <p className="font-bold text-sm text-foreground flex items-center gap-2">
                              {v.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              Payload: <strong>{v.capacityKg} kg</strong> · {v.dimensions}
                            </span>
                          </div>
                        </div>
                        {v.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {v.badge}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{v.etaMinutes} mins away</span>
                        </div>
                        <p className="text-base font-extrabold text-foreground">
                          ₹{vFare.totalFare}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Transparent Helper & Labour Add-On */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> 3. Loading & Unloading Assistance (No Cash Hassle)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'none', title: 'Driver Only', desc: 'No loading assistance', price: '₹0' },
                  { id: 'driver_helper', title: 'Driver + 1 Helper', desc: 'Assistance for heavy cartons', price: '₹150+' },
                  { id: 'two_helpers', title: '2 Full Labour Helpers', desc: 'Complete house/goods moving', price: '₹350+' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setHelperConfig({ ...helperConfig, type: opt.id as any })}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      helperConfig.type === opt.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary font-medium'
                        : 'border-border bg-surface hover:bg-surface-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-foreground">{opt.title}</p>
                      <span className="text-xs font-semibold text-primary">{opt.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                ))}
              </div>

              {helperConfig.type !== 'none' && (
                <div className="p-4 bg-surface-muted rounded-xl border border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1">Pickup Floor (Stairs Surcharge)</label>
                    <select
                      value={helperConfig.pickupFloor}
                      onChange={(e) => setHelperConfig({ ...helperConfig, pickupFloor: Number(e.target.value) })}
                      className="w-full p-2 bg-background border border-input rounded-md"
                    >
                      <option value={0}>Ground Floor / Lift Available (₹0 extra)</option>
                      <option value={1}>1st Floor (Stairs)</option>
                      <option value={2}>2nd Floor (Stairs)</option>
                      <option value={3}>3rd Floor (Stairs)</option>
                      <option value={4}>4th Floor+ (Stairs)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">Drop Floor (Stairs Surcharge)</label>
                    <select
                      value={helperConfig.dropFloor}
                      onChange={(e) => setHelperConfig({ ...helperConfig, dropFloor: Number(e.target.value) })}
                      className="w-full p-2 bg-background border border-input rounded-md"
                    >
                      <option value={0}>Ground Floor / Lift Available (₹0 extra)</option>
                      <option value={1}>1st Floor (Stairs)</option>
                      <option value={2}>2nd Floor (Stairs)</option>
                      <option value={3}>3rd Floor (Stairs)</option>
                      <option value={4}>4th Floor+ (Stairs)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Goods Type & Transit Shield */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> 4. Cargo Category & 1-Click Transit Shield
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Goods Category</label>
                  <select
                    value={goodsType}
                    onChange={(e) => setGoodsType(e.target.value)}
                    className="w-full p-2.5 text-xs bg-surface border border-input rounded-xl text-foreground"
                  >
                    {GOODS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div
                  onClick={() => setIncludeInsurance(!includeInsurance)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between ${
                    includeInsurance ? 'border-emerald-500 bg-emerald-500/5' : 'border-border bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className={`w-5 h-5 ${includeInsurance ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-xs font-bold text-foreground">Transit Shield Cover</p>
                      <p className="text-[11px] text-muted-foreground">Up to ₹50,000 damage/loss protection</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">+₹19</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Transparent Fare Summary & Checkout (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-surface space-y-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Selected Vehicle</p>
                  <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span>{selectedVehicle.icon}</span> {selectedVehicle.name}
                  </h4>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
                  ⚡ Driver in {selectedVehicle.etaMinutes}m
                </span>
              </div>

              {/* Promo Code Box */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" /> Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs uppercase font-mono font-bold bg-background border border-input rounded-lg"
                    placeholder="NEXTHERE50"
                  />
                  <button
                    type="button"
                    onClick={() => setCouponApplied(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ₹{fare.discountFare} coupon applied successfully!
                  </p>
                )}
              </div>

              {/* Fare Itemized Breakdown */}
              <div className="space-y-3 pt-2 text-xs border-t border-border">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Base Fare ({selectedVehicle.baseKm} km included)</span>
                  <span className="font-semibold text-foreground">₹{fare.baseFare}</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Distance Charge ({Math.max(0, distanceKm - selectedVehicle.baseKm).toFixed(1)} extra km @ ₹{selectedVehicle.ratePerKm}/km)</span>
                  <span className="font-semibold text-foreground">₹{fare.distanceFare}</span>
                </div>
                {fare.helperFare > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Standard Helper Charge (Stairs included)</span>
                    <span className="font-semibold text-foreground">₹{fare.helperFare}</span>
                  </div>
                )}
                {fare.insuranceFare > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Transit Shield Insurance</span>
                    <span className="font-semibold text-foreground">₹{fare.insuranceFare}</span>
                  </div>
                )}
                {fare.discountFare > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span>Promo Code Discount</span>
                    <span>-₹{fare.discountFare}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-border flex items-baseline justify-between">
                  <div>
                    <span className="text-sm font-bold text-foreground">Total Guaranteed Fare</span>
                    <p className="text-[10px] text-muted-foreground">Inclusive of GST & Tolls</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-foreground">₹{fare.totalFare}</span>
                  </div>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-center">
                  {[
                    { id: 'UPI', label: 'UPI / GPay' },
                    { id: 'CASH', label: 'Cash on Delivery' },
                    { id: 'CORPORATE_CREDIT', label: 'B2B GST Credit' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2.5 rounded-lg border transition-all ${
                        paymentMethod === pm.id
                          ? 'border-primary bg-primary text-primary-foreground font-bold shadow-sm'
                          : 'border-border bg-background text-foreground hover:bg-surface-muted'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Mini-Truck CTA */}
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Book {selectedVehicle.name} Now <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground pt-1">
                <span>🛡️ Zero Cancellation Fee</span>
                <span>•</span>
                <span>⚡ 24x7 Customer Desk</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* STEP 2: Real-time Live Tracking & Booking Active View */
        activeBooking && (
          <div className="bg-background border border-border border-t-0 rounded-b-2xl p-6 lg:p-8 space-y-8 shadow-sm">
            
            {/* Top Success Banner */}
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-foreground">
                    Booking Confirmed! Trip ID: #{activeBooking.id}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your {activeBooking.vehicle.name} has been dispatched. Share pickup OTP with driver upon arrival.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-background border border-border px-4 py-2 rounded-xl text-center flex-1 sm:flex-initial">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Pickup OTP</p>
                  <p className="text-xl font-mono font-black text-primary tracking-widest">{activeBooking.pickupOtp}</p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyTracking}
                  className="px-4 py-3 bg-surface border border-border rounded-xl text-xs font-bold text-foreground hover:bg-surface-muted flex items-center gap-2 transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied' : 'Share Tracking'}
                </button>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary flex items-center gap-2">
                  <Navigation className="w-4 h-4 animate-pulse" /> Live Trip Status: {STATUS_STEPS[tripStatusIndex].title}
                </span>
                <span className="text-muted-foreground font-mono">
                  {tripProgress}% Completed
                </span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-700 rounded-full"
                  style={{ width: `${tripProgress}%` }}
                />
              </div>
            </div>

            {/* Main Driver & Map Simulation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Driver Card & Stepper (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Driver Partner Card */}
                {activeBooking.driver && (
                  <div className="p-6 rounded-2xl border border-border bg-surface space-y-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Assigned Driver Partner
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={activeBooking.driver.photoUrl}
                        alt={activeBooking.driver.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                      />
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground">{activeBooking.driver.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-bold text-amber-500 flex items-center gap-0.5">
                            ★ {activeBooking.driver.rating}
                          </span>
                          <span>•</span>
                          <span>{activeBooking.driver.tripsCount} Completed Trips</span>
                        </div>
                        <p className="text-xs font-mono font-bold text-primary mt-1">
                          {activeBooking.driver.vehicleNumber} ({activeBooking.driver.vehicleModel})
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <a
                        href={`tel:${activeBooking.driver.phone}`}
                        className="py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                      >
                        <Phone className="w-4 h-4" /> Call Driver
                      </a>
                      <a
                        href={`https://wa.me/919472957044?text=Hi%20NextHere%2C%20tracking%20trip%20${activeBooking.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl border border-border bg-background text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-muted transition-colors"
                      >
                        <Share2 className="w-4 h-4" /> WhatsApp Help
                      </a>
                    </div>
                  </div>
                )}

                {/* Status Stepper */}
                <div className="p-6 rounded-2xl border border-border bg-surface space-y-4">
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Milestone Tracking
                  </h4>
                  <div className="space-y-4 text-xs">
                    {STATUS_STEPS.map((step, i) => {
                      const isPast = i < tripStatusIndex;
                      const isCurrent = i === tripStatusIndex;
                      return (
                        <div key={step.title} className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                            isPast ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-primary text-primary-foreground animate-bounce' : 'bg-muted text-muted-foreground'
                          }`}>
                            {isPast ? '✓' : i + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`font-bold ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                              {step.title}
                            </p>
                            <p className="text-muted-foreground mt-0.5">{step.desc}</p>
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground">{step.eta}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: Live GPS Route Simulation (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="h-[420px] rounded-2xl border border-border bg-slate-950 relative overflow-hidden flex flex-col justify-between p-6 text-white">
                  
                  {/* Map Grid Decorative Background */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Top Map HUD */}
                  <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold">GPS Live Telematics Active</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Speed: 38 km/h</span>
                  </div>

                  {/* Route Visualizer Centerpiece */}
                  <div className="relative z-10 my-auto py-8">
                    <div className="flex items-center justify-between relative">
                      {/* Connecting Route Line */}
                      <div className="absolute left-6 right-6 top-1/2 h-1 bg-white/20 -translate-y-1/2" />
                      <div
                        className="absolute left-6 top-1/2 h-1 bg-emerald-400 -translate-y-1/2 transition-all duration-700 shadow-[0_0_12px_#34d399]"
                        style={{ width: `${Math.max(10, tripProgress)}%` }}
                      />

                      {/* Pickup Pin */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center shadow-lg border-2 border-white">
                          P
                        </div>
                        <span className="text-[11px] font-semibold mt-2 text-gray-300">Connaught Place</span>
                      </div>

                      {/* Moving Truck Pin */}
                      <div
                        className="relative z-10 flex flex-col items-center transition-all duration-700"
                        style={{ transform: `translateX(${tripProgress * 1.8 - 90}px)` }}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-2xl border-2 border-emerald-400 animate-pulse">
                          {activeBooking.vehicle.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold mt-1 text-emerald-400 bg-black/80 px-2 py-0.5 rounded-full border border-white/10">
                          {activeBooking.driver?.vehicleNumber}
                        </span>
                      </div>

                      {/* Drop Pin */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-red-500 text-white font-black flex items-center justify-center shadow-lg border-2 border-white">
                          D
                        </div>
                        <span className="text-[11px] font-semibold mt-2 text-gray-300">Noida Sector 62</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Map Info */}
                  <div className="relative z-10 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider">Destination</p>
                      <p className="font-bold text-white">{activeBooking.drops[0].address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider">Total Billed</p>
                      <p className="text-base font-black text-emerald-400 font-mono">₹{activeBooking.totalFare}</p>
                    </div>
                  </div>
                </div>

                {/* Reset / Book Another Mini-Truck */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('DETAILS');
                      setActiveBooking(null);
                    }}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    ← Book Another Mini-Truck or Courier
                  </button>
                </div>
              </div>

            </div>

          </div>
        )
      )}
    </div>
  );
}
