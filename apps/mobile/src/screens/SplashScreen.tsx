import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';

interface SplashScreenProps {
  onContinue: () => void;
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <View style={styles.container}>
      <View style={styles.brandBox}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoEmoji}>🚛</Text>
        </View>
        <Text style={styles.brandTitle}>NextHere</Text>
        <Text style={styles.brandSubtitle}>LOGISTICS & FREIGHT</Text>
        <View style={styles.pillTag}>
          <Text style={styles.pillText}>⚡ Porter's Next-Gen Successor</Text>
        </View>
      </View>

      <View style={styles.bottomBox}>
        <Text style={styles.tagline}>Technology · Infrastructure · Mobility</Text>
        <TouchableOpacity style={styles.button} onPress={onContinue} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Get Started →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: THEME.spacing.lg,
  },
  brandBox: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: THEME.colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 40,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.accent,
    letterSpacing: 3,
    marginTop: 4,
  },
  pillTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pillText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomBox: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  tagline: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: THEME.colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
});
