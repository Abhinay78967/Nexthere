import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';
import { MOBILE_FLEET } from '../constants/fleet';
import { MobileVehicleCategory } from '../types';

interface VehicleSelectModalProps {
  distanceKm: number;
  onSelectVehicle: (vehicle: MobileVehicleCategory) => void;
  onBack: () => void;
}

export function VehicleSelectModal({ distanceKm, onSelectVehicle, onBack }: VehicleSelectModalProps) {
  const [selected, setSelected] = useState<MobileVehicleCategory>(MOBILE_FLEET[3]); // Tata Ace default

  const calculateQuickFare = (v: MobileVehicleCategory) => {
    const extraKm = Math.max(0, distanceKm - v.baseKm);
    return Math.round(v.baseFare + extraKm * v.ratePerKm);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Select Commercial Vehicle"
        subtitle={`Trip Distance: ${distanceKm} km`}
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topInfoBar}>
          <Text style={styles.infoText}>⚡ Available near your location in 3–6 mins</Text>
        </View>

        <View style={styles.fleetList}>
          {MOBILE_FLEET.map((v) => {
            const isChosen = selected.id === v.id;
            const fare = calculateQuickFare(v);

            return (
              <TouchableOpacity
                key={v.id}
                style={[styles.vehicleCard, isChosen && styles.vehicleCardActive]}
                onPress={() => setSelected(v)}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconRow}>
                    <Text style={styles.vehicleEmoji}>{v.icon}</Text>
                    <View>
                      <Text style={styles.vehicleName}>{v.name}</Text>
                      <Text style={styles.vehicleCapacity}>
                        Payload: <Text style={styles.boldText}>{v.capacityKg} kg</Text> · {v.dimensions}
                      </Text>
                    </View>
                  </View>

                  {v.badge ? (
                    <View style={styles.badgeBox}>
                      <Text style={styles.badgeText}>{v.badge}</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.descriptionText}>{v.description}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.etaRow}>
                    <Text style={styles.etaDot}>●</Text>
                    <Text style={styles.etaText}>{v.etaMinutes} mins away</Text>
                  </View>
                  <Text style={styles.fareAmount}>₹{fare}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => onSelectVehicle(selected)}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaButtonText}>
            Continue with {selected.name} (₹{calculateQuickFare(selected)}) →
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
  topInfoBar: {
    backgroundColor: THEME.colors.accentLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.sm,
    alignItems: 'center',
  },
  infoText: {
    ...THEME.typography.caption,
    color: '#065F46',
    fontWeight: '700',
  },
  fleetList: {
    gap: 12,
  },
  vehicleCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    gap: 8,
  },
  vehicleCardActive: {
    borderColor: THEME.colors.primary,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  vehicleEmoji: {
    fontSize: 32,
  },
  vehicleName: {
    ...THEME.typography.bodyBold,
    color: THEME.colors.textPrimary,
    fontSize: 15,
  },
  vehicleCapacity: {
    ...THEME.typography.caption,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  boldText: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  badgeBox: {
    backgroundColor: THEME.colors.surfaceMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    ...THEME.typography.badge,
    color: THEME.colors.royalBlue,
  },
  descriptionText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  etaDot: {
    fontSize: 10,
    color: THEME.colors.accent,
  },
  etaText: {
    ...THEME.typography.caption,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
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
    marginTop: 8,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
