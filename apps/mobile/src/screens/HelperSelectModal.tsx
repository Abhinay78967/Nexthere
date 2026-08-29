import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';
import { MobileVehicleCategory, MobileHelperConfig } from '../types';

interface HelperSelectModalProps {
  vehicle: MobileVehicleCategory;
  onConfirmHelper: (config: MobileHelperConfig) => void;
  onBack: () => void;
}

export function HelperSelectModal({ vehicle, onConfirmHelper, onBack }: HelperSelectModalProps) {
  const [helperType, setHelperType] = useState<'none' | 'driver_helper' | 'two_helpers'>('driver_helper');
  const [pickupFloor, setPickupFloor] = useState<number>(0);
  const [dropFloor, setDropFloor] = useState<number>(2);
  const [pickupElevator, setPickupElevator] = useState<boolean>(true);
  const [dropElevator, setDropElevator] = useState<boolean>(true);

  const HELPER_OPTIONS = [
    {
      id: 'none',
      title: 'Driver Only (No Labour)',
      price: '₹0',
      description: 'You or your team will handle complete loading & unloading.',
      emoji: '👤',
    },
    {
      id: 'driver_helper',
      title: 'Driver + 1 Helper',
      price: '+₹150',
      description: 'Assistance for heavy boxes, medium furniture & appliances.',
      emoji: '👥',
    },
    {
      id: 'two_helpers',
      title: '2 Full Dedicated Labourers',
      price: '+₹350',
      description: 'Complete loading, stairs carriage & unloading for full house/office shifting.',
      emoji: '🚛👥',
    },
  ];

  const handleProceed = () => {
    onConfirmHelper({
      type: helperType,
      pickupFloor,
      dropFloor,
      pickupElevator,
      dropElevator,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Loading / Unloading Labour"
        subtitle="100% Standardized · Zero Cash Bargaining"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.guaranteeBox}>
          <Text style={styles.guaranteeTitle}>🛡️ NextHere Fair-Labour Guarantee</Text>
          <Text style={styles.guaranteeText}>
            All helper and stair charges are pre-calculated and itemized in your digital invoice. Drivers are strictly prohibited from demanding cash on spot.
          </Text>
        </View>

        <View style={styles.optionsList}>
          {HELPER_OPTIONS.map((opt) => {
            const isSelected = helperType === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => setHelperType(opt.id as any)}
                activeOpacity={0.8}
              >
                <View style={styles.optionHeaderRow}>
                  <View style={styles.optionLeft}>
                    <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                    <View>
                      <Text style={styles.optionTitle}>{opt.title}</Text>
                      <Text style={styles.optionPrice}>{opt.price}</Text>
                    </View>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </View>
                <Text style={styles.optionDesc}>{opt.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Floor and Elevator Configuration */}
        {helperType !== 'none' && (
          <View style={styles.floorCard}>
            <Text style={styles.floorHeading}>FLOOR & ELEVATOR DETAILS</Text>

            {/* Pickup Floor */}
            <View style={styles.floorRow}>
              <View style={styles.floorInfo}>
                <Text style={styles.floorLabel}>Pickup Location Floor</Text>
                <Text style={styles.floorSub}>{pickupElevator ? 'Elevator Available (₹0 extra)' : `Stairs (Floor ${pickupFloor})`}</Text>
              </View>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[styles.elevatorToggle, pickupElevator && styles.elevatorToggleActive]}
                  onPress={() => setPickupElevator(true)}
                >
                  <Text style={[styles.toggleText, pickupElevator && styles.toggleTextActive]}>🛗 Lift</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.elevatorToggle, !pickupElevator && styles.elevatorToggleActive]}
                  onPress={() => setPickupElevator(false)}
                >
                  <Text style={[styles.toggleText, !pickupElevator && styles.toggleTextActive]}>🪜 Stairs</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Drop Floor */}
            <View style={styles.floorRow}>
              <View style={styles.floorInfo}>
                <Text style={styles.floorLabel}>Drop Location Floor</Text>
                <Text style={styles.floorSub}>{dropElevator ? 'Elevator Available (₹0 extra)' : `Stairs (Floor ${dropFloor})`}</Text>
              </View>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  style={[styles.elevatorToggle, dropElevator && styles.elevatorToggleActive]}
                  onPress={() => setDropElevator(true)}
                >
                  <Text style={[styles.toggleText, dropElevator && styles.toggleTextActive]}>🛗 Lift</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.elevatorToggle, !dropElevator && styles.elevatorToggleActive]}
                  onPress={() => setDropElevator(false)}
                >
                  <Text style={[styles.toggleText, !dropElevator && styles.toggleTextActive]}>🪜 Stairs</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.ctaButton} onPress={handleProceed} activeOpacity={0.85}>
          <Text style={styles.ctaButtonText}>Review Fare & Book {vehicle.name} →</Text>
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
    gap: 16,
  },
  guaranteeBox: {
    backgroundColor: THEME.colors.accentLight,
    padding: 12,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 4,
  },
  guaranteeTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#065F46',
  },
  guaranteeText: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 15,
  },
  optionsList: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    gap: 8,
  },
  optionCardSelected: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
  },
  optionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionEmoji: {
    fontSize: 26,
  },
  optionTitle: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.textPrimary,
  },
  optionPrice: {
    ...THEME.typography.caption,
    fontWeight: '700',
    color: THEME.colors.accent,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: THEME.colors.borderDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: THEME.colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: THEME.colors.primary,
  },
  optionDesc: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  floorCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 14,
  },
  floorHeading: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  floorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  floorInfo: {
    flex: 1,
  },
  floorLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  floorSub: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  elevatorToggle: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  elevatorToggleActive: {
    backgroundColor: THEME.colors.primary,
    borderColor: THEME.colors.primary,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
  },
  toggleTextActive: {
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
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
