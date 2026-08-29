import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';
import { MapMockView } from '../components/MapMockView';
import { MobileLocationStop } from '../types';

interface HomeScreenProps {
  onProceedToFleet: (pickup: MobileLocationStop, drop: MobileLocationStop, distanceKm: number) => void;
  onOpenHistory: () => void;
  onOpenB2B: () => void;
}

export function HomeScreen({ onProceedToFleet, onOpenHistory, onOpenB2B }: HomeScreenProps) {
  const [pickup, setPickup] = useState<MobileLocationStop>({
    id: 'p-1',
    address: 'Connaught Place, Central Delhi, New Delhi',
    landmark: 'Near Inner Circle Block B',
    floor: 0,
    hasElevator: true,
    contactName: 'Rahul Sharma',
    contactPhone: '+91 98765 43210',
  });

  const [drop, setDrop] = useState<MobileLocationStop>({
    id: 'd-1',
    address: 'Sector 62, Noida, Uttar Pradesh',
    landmark: 'IT Park Tower 2',
    floor: 2,
    hasElevator: true,
    contactName: 'Amit Verma',
    contactPhone: '+91 98111 22334',
  });

  const [distanceKm, setDistanceKm] = useState<number>(18.5);

  const handleQuickPreset = (pAddr: string, dAddr: string, km: number) => {
    setPickup({ ...pickup, address: pAddr });
    setDrop({ ...drop, address: dAddr });
    setDistanceKm(km);
  };

  return (
    <View style={styles.container}>
      <Header
        title="NextHere Logistics"
        subtitle="Intra-City & Interstate Mini-Trucks"
        rightAction={
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={onOpenB2B} style={styles.b2bBadge}>
              <Text style={styles.b2bText}>🏢 B2B</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenHistory} style={styles.iconButton}>
              <Text style={styles.historyEmoji}>📦</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Interactive Map Visualizer */}
        <MapMockView pickupAddress={pickup.address} dropAddress={drop.address} />

        {/* Address Entry Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>SELECT ROUTE</Text>

          {/* Pickup Input */}
          <View style={styles.stopRow}>
            <View style={styles.pinCol}>
              <View style={[styles.dot, { backgroundColor: THEME.colors.accent }]} />
              <View style={styles.connectingDottedLine} />
            </View>
            <View style={styles.inputCol}>
              <Text style={styles.inputLabel}>PICKUP LOCATION</Text>
              <TextInput
                style={styles.addressInput}
                value={pickup.address}
                onChangeText={(t) => setPickup({ ...pickup, address: t })}
                placeholder="Enter pickup address"
              />
            </View>
          </View>

          {/* Drop Input */}
          <View style={styles.stopRow}>
            <View style={styles.pinCol}>
              <View style={[styles.dot, { backgroundColor: THEME.colors.danger }]} />
            </View>
            <View style={styles.inputCol}>
              <Text style={styles.inputLabel}>DROP LOCATION</Text>
              <TextInput
                style={styles.addressInput}
                value={drop.address}
                onChangeText={(t) => setDrop({ ...drop, address: t })}
                placeholder="Enter drop location"
              />
            </View>
          </View>

          {/* Distance Estimate Bar */}
          <View style={styles.distanceBar}>
            <Text style={styles.distanceText}>
              Estimated Route: <Text style={styles.boldText}>{distanceKm} km</Text> (~{Math.round(distanceKm * 2.8)} mins)
            </Text>
          </View>
        </View>

        {/* Quick Route Shortcuts */}
        <View style={styles.presetSection}>
          <Text style={styles.presetHeading}>POPULAR COMMERCIAL ROUTES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presetsScroll}>
            {[
              { title: 'Connaught Place ➔ Noida Sec 62', p: 'Connaught Place, Delhi', d: 'Sector 62, Noida', km: 18.5 },
              { title: 'Chandni Chowk ➔ Gurugram Udyog Vihar', p: 'Chandni Chowk, Delhi', d: 'Udyog Vihar, Gurugram', km: 28.0 },
              { title: 'Okhla Ind. Area ➔ Faridabad NIT', p: 'Okhla Phase 3, Delhi', d: 'NIT Faridabad, Haryana', km: 16.2 },
            ].map((r, i) => (
              <TouchableOpacity
                key={i}
                style={styles.presetChip}
                onPress={() => handleQuickPreset(r.p, r.d, r.km)}
                activeOpacity={0.7}
              >
                <Text style={styles.presetChipText}>{r.title}</Text>
                <Text style={styles.presetChipKm}>{r.km} km</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Proceed CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => onProceedToFleet(pickup, drop, distanceKm)}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaButtonText}>Check Available Mini-Trucks & Fares →</Text>
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  b2bBadge: {
    backgroundColor: THEME.colors.royalBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  b2bText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyEmoji: {
    fontSize: 16,
  },
  card: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
    letterSpacing: 1,
  },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  pinCol: {
    alignItems: 'center',
    width: 16,
    paddingTop: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  connectingDottedLine: {
    width: 2,
    height: 36,
    backgroundColor: THEME.colors.borderDark,
    marginVertical: 4,
  },
  inputCol: {
    flex: 1,
    gap: 4,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.textSecondary,
    letterSpacing: 0.5,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: THEME.colors.textPrimary,
    backgroundColor: THEME.colors.surface,
  },
  distanceBar: {
    backgroundColor: THEME.colors.surfaceMuted,
    padding: 10,
    borderRadius: THEME.borderRadius.sm,
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  boldText: {
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  presetSection: {
    gap: 10,
  },
  presetHeading: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  presetsScroll: {
    gap: 10,
  },
  presetChip: {
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 2,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  presetChipKm: {
    fontSize: 11,
    color: THEME.colors.accent,
    fontWeight: '600',
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
    marginTop: 6,
  },
  ctaButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
