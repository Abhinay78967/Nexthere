import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

interface MapMockViewProps {
  pickupAddress: string;
  dropAddress: string;
  vehicleIcon?: string;
  vehicleNumber?: string;
  progressPercent?: number; // 0 to 100
  isTracking?: boolean;
}

export function MapMockView({
  pickupAddress,
  dropAddress,
  vehicleIcon = '🚛',
  vehicleNumber = 'DL 1L AA 4821',
  progressPercent = 35,
  isTracking = false,
}: MapMockViewProps) {
  return (
    <View style={styles.container}>
      {/* Dark Map Canvas */}
      <View style={styles.gridOverlay} />

      {/* Top Telematics HUD */}
      {isTracking && (
        <View style={styles.telematicsBar}>
          <View style={styles.liveIndicatorRow}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>GPS Telematics Active</Text>
          </View>
          <Text style={styles.speedText}>Speed: 38 km/h</Text>
        </View>
      )}

      {/* Route Visualizer */}
      <View style={styles.routeContainer}>
        {/* Route connecting line */}
        <View style={styles.routeLineBackground} />
        <View
          style={[
            styles.routeLineActive,
            { width: `${Math.max(10, Math.min(100, progressPercent))}%` },
          ]}
        />

        {/* Pickup Pin */}
        <View style={styles.pinContainer}>
          <View style={[styles.pinCircle, { backgroundColor: THEME.colors.accent }]}>
            <Text style={styles.pinLetter}>P</Text>
          </View>
          <Text style={styles.pinLabel} numberOfLines={1}>
            {pickupAddress.split(',')[0]}
          </Text>
        </View>

        {/* Moving Vehicle Pin */}
        <View
          style={[
            styles.truckPinWrapper,
            { left: `${Math.max(15, Math.min(75, progressPercent))}%` },
          ]}
        >
          <View style={styles.truckBadge}>
            <Text style={styles.truckIcon}>{vehicleIcon}</Text>
          </View>
          {isTracking && (
            <View style={styles.plateBadge}>
              <Text style={styles.plateText}>{vehicleNumber}</Text>
            </View>
          )}
        </View>

        {/* Drop Pin */}
        <View style={styles.pinContainer}>
          <View style={[styles.pinCircle, { backgroundColor: THEME.colors.danger }]}>
            <Text style={styles.pinLetter}>D</Text>
          </View>
          <Text style={styles.pinLabel} numberOfLines={1}>
            {dropAddress.split(',')[0]}
          </Text>
        </View>
      </View>

      {/* Bottom Route Summary Tag */}
      <View style={styles.bottomInfoTag}>
        <Text style={styles.bottomInfoText} numberOfLines={1}>
          📍 {pickupAddress.split(',')[0]} ➔ {dropAddress.split(',')[0]}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#0F172A',
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
    padding: THEME.spacing.md,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
    backgroundColor: '#1E293B',
  },
  telematicsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  liveIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.accent,
  },
  liveText: {
    ...THEME.typography.caption,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  speedText: {
    ...THEME.typography.badge,
    color: THEME.colors.accent,
    fontFamily: 'monospace',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 16,
    marginVertical: 'auto',
  },
  routeLineBackground: {
    position: 'absolute',
    left: 36,
    right: 36,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  routeLineActive: {
    position: 'absolute',
    left: 36,
    height: 4,
    backgroundColor: THEME.colors.accent,
    borderRadius: 2,
  },
  pinContainer: {
    alignItems: 'center',
    zIndex: 10,
  },
  pinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pinLetter: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  pinLabel: {
    ...THEME.typography.badge,
    color: '#CBD5E1',
    marginTop: 4,
    maxWidth: 90,
    textAlign: 'center',
  },
  truckPinWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 20,
    transform: [{ translateX: -18 }],
  },
  truckBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: THEME.colors.accent,
  },
  truckIcon: {
    fontSize: 20,
  },
  plateBadge: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  plateText: {
    ...THEME.typography.badge,
    color: THEME.colors.accent,
    fontFamily: 'monospace',
  },
  bottomInfoTag: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  bottomInfoText: {
    ...THEME.typography.caption,
    color: '#E2E8F0',
    fontWeight: '600',
  },
});
