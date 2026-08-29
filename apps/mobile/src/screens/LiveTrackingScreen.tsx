import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';
import { MapMockView } from '../components/MapMockView';
import { MobileBooking } from '../types';

interface LiveTrackingScreenProps {
  booking: MobileBooking;
  onDone: () => void;
}

export function LiveTrackingScreen({ booking, onDone }: LiveTrackingScreenProps) {
  const [progress, setProgress] = useState(20);
  const [statusIndex, setStatusIndex] = useState(0);

  const STATUS_MILESTONES = [
    { title: 'Driver Assigned', desc: 'Rajesh is on the way to pickup point', eta: '3 mins' },
    { title: 'Arrived at Pickup', desc: 'Truck arrived. Please share Pickup OTP.', eta: '8 mins' },
    { title: 'In Transit to Destination', desc: 'Moving smoothly on optimized route', eta: '22 mins' },
    { title: 'Delivered (POD Verified)', desc: 'Consignment successfully delivered with signature', eta: 'Done' },
  ];

  // Auto progression simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      setProgress((prev) => Math.min(100, prev + 25));
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handleCallDriver = () => {
    Linking.openURL(`tel:${booking.driver.phone}`);
  };

  const handleWhatsAppHelp = () => {
    Linking.openURL(`https://wa.me/919472957044?text=Hi%20NextHere%2C%20tracking%20my%20trip%20${booking.id}`);
  };

  return (
    <View style={styles.container}>
      <Header
        title={`Trip #${booking.id}`}
        subtitle={`Tracking: ${booking.trackingNumber}`}
        onBack={onDone}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Map Telematics View */}
        <MapMockView
          pickupAddress={booking.pickup.address}
          dropAddress={booking.drops[0].address}
          vehicleIcon={booking.vehicle.icon}
          vehicleNumber={booking.driver.vehicleNumber}
          progressPercent={progress}
          isTracking={true}
        />

        {/* OTP & Arrival Status Banner */}
        <View style={styles.otpBanner}>
          <View style={styles.otpLeft}>
            <Text style={styles.otpLabel}>PICKUP OTP</Text>
            <Text style={styles.otpCode}>{booking.pickupOtp}</Text>
            <Text style={styles.otpHelp}>Share with driver upon arrival</Text>
          </View>
          <View style={styles.etaBox}>
            <Text style={styles.etaLabel}>STATUS</Text>
            <Text style={styles.etaVal}>{STATUS_MILESTONES[statusIndex].title}</Text>
            <Text style={styles.progressText}>{progress}% Complete</Text>
          </View>
        </View>

        {/* Driver Details Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverHeaderRow}>
            <View style={styles.driverAvatarBadge}>
              <Text style={styles.driverAvatarEmoji}>👨‍✈️</Text>
            </View>
            <View style={styles.driverMeta}>
              <Text style={styles.driverName}>{booking.driver.name}</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★ {booking.driver.rating}</Text>
                <Text style={styles.tripsCount}>• {booking.driver.tripsCount} Completed Trips</Text>
              </View>
              <Text style={styles.plateNumber}>
                {booking.driver.vehicleNumber} ({booking.driver.vehicleModel})
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.driverActions}>
            <TouchableOpacity style={styles.callButton} onPress={handleCallDriver} activeOpacity={0.8}>
              <Text style={styles.callButtonText}>📞 Call Driver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waButton} onPress={handleWhatsAppHelp} activeOpacity={0.8}>
              <Text style={styles.waButtonText}>💬 WhatsApp Desk</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Milestone Stepper */}
        <View style={styles.stepperCard}>
          <Text style={styles.stepperHeader}>LIVE TRIP MILESTONES</Text>
          <View style={styles.stepsList}>
            {STATUS_MILESTONES.map((step, idx) => {
              const isPast = idx < statusIndex;
              const isCurrent = idx === statusIndex;

              return (
                <View key={step.title} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepCircle,
                      isPast && styles.stepCircleDone,
                      isCurrent && styles.stepCircleActive,
                    ]}
                  >
                    <Text style={styles.stepNum}>{isPast ? '✓' : idx + 1}</Text>
                  </View>
                  <View style={styles.stepTextCol}>
                    <Text style={[styles.stepTitle, isCurrent && styles.stepTitleActive]}>
                      {step.title}
                    </Text>
                    <Text style={styles.stepDesc}>{step.desc}</Text>
                  </View>
                  <Text style={styles.stepEta}>{step.eta}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Close / Return to Home */}
        <TouchableOpacity style={styles.doneBtn} onPress={onDone} activeOpacity={0.85}>
          <Text style={styles.doneBtnText}>← Book Another Trip</Text>
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
  otpBanner: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    justifyContent: 'space-between',
  },
  otpLeft: {
    gap: 2,
  },
  otpLabel: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  otpCode: {
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 4,
    color: THEME.colors.royalBlue,
  },
  otpHelp: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  etaBox: {
    alignItems: 'flex-end',
    gap: 2,
  },
  etaLabel: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  etaVal: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  progressText: {
    fontSize: 11,
    color: THEME.colors.accent,
    fontWeight: '700',
  },
  driverCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 14,
  },
  driverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatarBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: THEME.colors.surfaceMuted,
    borderWidth: 2,
    borderColor: THEME.colors.royalBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverAvatarEmoji: {
    fontSize: 26,
  },
  driverMeta: {
    flex: 1,
    gap: 2,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingStar: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.warning,
  },
  tripsCount: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  plateNumber: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: THEME.colors.royalBlue,
  },
  driverActions: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  waButton: {
    flex: 1,
    backgroundColor: THEME.colors.surface,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  waButtonText: {
    color: THEME.colors.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },
  stepperCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 12,
  },
  stepperHeader: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
  },
  stepsList: {
    gap: 14,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: THEME.colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepCircleDone: {
    backgroundColor: THEME.colors.accent,
  },
  stepCircleActive: {
    backgroundColor: THEME.colors.primary,
  },
  stepNum: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepTextCol: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  stepTitleActive: {
    color: THEME.colors.royalBlue,
  },
  stepDesc: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 1,
  },
  stepEta: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: THEME.colors.textMuted,
  },
  doneBtn: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  doneBtnText: {
    color: THEME.colors.royalBlue,
    fontSize: 14,
    fontWeight: '700',
  },
});
