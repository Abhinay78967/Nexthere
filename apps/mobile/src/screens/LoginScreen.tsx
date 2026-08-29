import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';

interface LoginScreenProps {
  onLoginSuccess: (phone: string) => void;
  onSkip: () => void;
}

export function LoginScreen({ onLoginSuccess, onSkip }: LoginScreenProps) {
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    onLoginSuccess(phone);
  };

  return (
    <View style={styles.container}>
      <Header title="NextHere Logistics" subtitle="Login / Register" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBox}>
          <Text style={styles.heading}>Enter Mobile Number</Text>
          <Text style={styles.subheading}>
            We will send a 4-digit verification code to confirm your number.
          </Text>
        </View>

        {!otpSent ? (
          <View style={styles.formBox}>
            <View style={styles.inputRow}>
              <View style={styles.countryCodeBox}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter 10-digit number"
                placeholderTextColor={THEME.colors.textMuted}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSendOtp} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Get OTP →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formBox}>
            <View style={styles.otpHeader}>
              <Text style={styles.otpLabel}>Enter OTP sent to +91 {phone}</Text>
              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
              placeholder="1 2 3 4"
              placeholderTextColor={THEME.colors.textMuted}
              autoFocus
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOtp} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Verify & Proceed →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={onSkip} activeOpacity={0.8}>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>Skip Login & Book Mini-Truck (Guest Mode) →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    padding: THEME.spacing.lg,
  },
  headerBox: {
    marginVertical: 20,
  },
  heading: {
    ...THEME.typography.h2,
    color: THEME.colors.textPrimary,
  },
  subheading: {
    ...THEME.typography.body,
    color: THEME.colors.textSecondary,
    marginTop: 6,
  },
  formBox: {
    gap: 16,
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surface,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRightWidth: 1,
    borderRightColor: THEME.colors.border,
    gap: 6,
  },
  flag: {
    fontSize: 18,
  },
  countryCode: {
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    fontSize: 15,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  otpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpLabel: {
    ...THEME.typography.caption,
    color: THEME.colors.textSecondary,
  },
  changeLink: {
    ...THEME.typography.caption,
    color: THEME.colors.royalBlue,
    fontWeight: '700',
  },
  otpInput: {
    borderWidth: 1.5,
    borderColor: THEME.colors.royalBlue,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surface,
    paddingVertical: 14,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 10,
    color: THEME.colors.textPrimary,
  },
  primaryButton: {
    backgroundColor: THEME.colors.primary,
    paddingVertical: 16,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    shadowColor: THEME.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.colors.border,
  },
  dividerText: {
    ...THEME.typography.badge,
    color: THEME.colors.textMuted,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    backgroundColor: THEME.colors.surface,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.md,
    gap: 10,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.royalBlue,
  },
  googleText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textPrimary,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 24,
    padding: 8,
  },
  skipText: {
    ...THEME.typography.caption,
    color: THEME.colors.royalBlue,
    fontWeight: '700',
  },
});
