import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';
import { MobileVehicleCategory, MobileLocationStop, MobileHelperConfig, MobileBooking } from '../types';

interface CheckoutModalProps {
  vehicle: MobileVehicleCategory;
  pickup: MobileLocationStop;
  drop: MobileLocationStop;
  distanceKm: number;
  helperConfig: MobileHelperConfig;
  onConfirmBooking: (booking: MobileBooking) => void;
  onBack: () => void;
}

export function CheckoutModal({
  vehicle,
  pickup,
  drop,
  distanceKm,
  helperConfig,
  onConfirmBooking,
  onBack,
}: CheckoutModalProps) {
  const [couponCode, setCouponCode] = useState('NEXTHERE50');
  const [couponApplied, setCouponApplied] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CASH' | 'CORPORATE_CREDIT'>('UPI');

  // Calculation
  const baseFare = vehicle.baseFare;
  const extraKm = Math.max(0, distanceKm - vehicle.baseKm);
  const distanceFare = Math.round(extraKm * vehicle.ratePerKm);

  let helperFare = 0;
  if (helperConfig.type === 'driver_helper') {
    helperFare = 150 + (!helperConfig.pickupElevator ? helperConfig.pickupFloor * 40 : 0) + (!helperConfig.dropElevator ? helperConfig.dropFloor * 40 : 0);
  } else if (helperConfig.type === 'two_helpers') {
    helperFare = 350 + (!helperConfig.pickupElevator ? helperConfig.pickupFloor * 70 : 0) + (!helperConfig.dropElevator ? helperConfig.dropFloor * 70 : 0);
  }

  const insuranceFare = includeInsurance ? 19 : 0;
  const discountFare = couponApplied ? 50 : 0;
  const totalFare = Math.max(vehicle.baseFare, baseFare + distanceFare + helperFare + insuranceFare - discountFare);

  const handlePayAndBook = () => {
    const booking: MobileBooking = {
      id: `NXT-${Math.floor(100000 + Math.random() * 900000)}`,
      trackingNumber: `TRK-${Date.now().toString().slice(-8)}`,
      vehicle,
      pickup,
      drops: [drop],
      distanceKm,
      durationMins: Math.round(distanceKm * 2.8),
      baseFare,
      distanceFare,
      helperFare,
      insuranceFare,
      discountFare,
      totalFare,
      goodsType: 'General Merchandise & Furniture',
      declaredValue: 25000,
      paymentMethod,
      status: 'ASSIGNING',
      driver: {
        name: 'Rajesh Kumar Yadav',
        phone: '+91 94729 57044',
        rating: 4.9,
        tripsCount: 1420,
        vehicleNumber: 'DL 1L AA 4821',
        vehicleModel: `${vehicle.name} (White)`,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      },
      pickupOtp: Math.floor(1000 + Math.random() * 9000).toString(),
      createdAt: new Date().toISOString(),
    };

    onConfirmBooking(booking);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Fare & Payment Summary"
        subtitle={`${vehicle.name} · ${distanceKm} km`}
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promo Code Box */}
        <View style={styles.couponCard}>
          <Text style={styles.couponLabel}>PROMO CODE</Text>
          <View style={styles.couponRow}>
            <TextInput
              style={styles.couponInput}
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
              placeholder="ENTER PROMO"
            />
            <TouchableOpacity style={styles.applyBtn} onPress={() => setCouponApplied(true)}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {couponApplied && (
            <Text style={styles.couponSuccess}>✓ ₹50 Instant Discount Applied!</Text>
          )}
        </View>

        {/* Transit Shield Card */}
        <TouchableOpacity
          style={[styles.shieldCard, includeInsurance && styles.shieldCardActive]}
          onPress={() => setIncludeInsurance(!includeInsurance)}
          activeOpacity={0.8}
        >
          <View style={styles.shieldLeft}>
            <Text style={styles.shieldEmoji}>🛡️</Text>
            <View>
              <Text style={styles.shieldTitle}>1-Click Transit Shield Protection</Text>
              <Text style={styles.shieldSub}>Up to ₹50,000 protection against goods damage</Text>
            </View>
          </View>
          <Text style={styles.shieldPrice}>+₹19</Text>
        </TouchableOpacity>

        {/* Itemized Fare Card */}
        <View style={styles.fareCard}>
          <Text style={styles.fareCardHeader}>ITEMIZED FARE DETAILS</Text>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Base Fare ({vehicle.baseKm} km incl.)</Text>
            <Text style={styles.fareValue}>₹{baseFare}</Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Distance Fare ({extraKm.toFixed(1)} km @ ₹{vehicle.ratePerKm}/km)</Text>
            <Text style={styles.fareValue}>₹{distanceFare}</Text>
          </View>

          {helperFare > 0 && (
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Helper & Stairs Carriage</Text>
              <Text style={styles.fareValue}>₹{helperFare}</Text>
            </View>
          )}

          {insuranceFare > 0 && (
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Transit Insurance</Text>
              <Text style={styles.fareValue}>₹{insuranceFare}</Text>
            </View>
          )}

          {discountFare > 0 && (
            <View style={styles.fareRow}>
              <Text style={styles.discountLabel}>Promo Code Discount</Text>
              <Text style={styles.discountValue}>-₹{discountFare}</Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total Guaranteed Fare</Text>
              <Text style={styles.totalGstNote}>Includes GST & Tolls</Text>
            </View>
            <Text style={styles.totalAmount}>₹{totalFare}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentCard}>
          <Text style={styles.paymentHeading}>SELECT PAYMENT METHOD</Text>
          <View style={styles.paymentOptions}>
            {[
              { id: 'UPI', label: 'UPI / Google Pay', emoji: '⚡' },
              { id: 'CASH', label: 'Cash on Delivery', emoji: '💵' },
              { id: 'CORPORATE_CREDIT', label: 'B2B GST Credit', emoji: '🏢' },
            ].map((pm) => {
              const isSelected = paymentMethod === pm.id;
              return (
                <TouchableOpacity
                  key={pm.id}
                  style={[styles.paymentBtn, isSelected && styles.paymentBtnSelected]}
                  onPress={() => setPaymentMethod(pm.id as any)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.pmEmoji}>{pm.emoji}</Text>
                  <Text style={[styles.pmLabel, isSelected && styles.pmLabelSelected]}>
                    {pm.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.ctaButton} onPress={handlePayAndBook} activeOpacity={0.85}>
          <Text style={styles.ctaButtonText}>
            Confirm & Book {vehicle.name} (₹{totalFare}) →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceMuted,
  },
  content: {
    padding: THEME.spacing.md,
    gap: 14,
  },
  couponCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 8,
  },
  couponLabel: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  couponRow: {
    flexDirection: 'row',
    gap: 8,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: 'monospace',
    fontWeight: '700',
    fontSize: 13,
    backgroundColor: THEME.colors.surface,
  },
  applyBtn: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: 16,
    borderRadius: THEME.borderRadius.sm,
    justifyContent: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  couponSuccess: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.accent,
  },
  shieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
  },
  shieldCardActive: {
    borderColor: THEME.colors.accent,
    backgroundColor: THEME.colors.accentLight,
  },
  shieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  shieldEmoji: {
    fontSize: 22,
  },
  shieldTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  shieldSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  shieldPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.accent,
  },
  fareCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 10,
  },
  fareCardHeader: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
    marginBottom: 4,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fareLabel: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  fareValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  discountLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.accent,
  },
  discountValue: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.accent,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  totalGstNote: {
    fontSize: 10,
    color: THEME.colors.textMuted,
    marginTop: 1,
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
  },
  paymentCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 10,
  },
  paymentHeading: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  paymentOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
    backgroundColor: THEME.colors.surface,
  },
  paymentBtnSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: THEME.colors.primary,
  },
  pmEmoji: {
    fontSize: 16,
  },
  pmLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    textAlign: 'center',
  },
  pmLabelSelected: {
    color: '#FFFFFF',
  },
  ctaButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 16,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 4,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
