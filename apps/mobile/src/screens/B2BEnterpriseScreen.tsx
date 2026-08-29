import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';

interface B2BEnterpriseScreenProps {
  onBack: () => void;
}

export function B2BEnterpriseScreen({ onBack }: B2BEnterpriseScreenProps) {
  return (
    <View style={styles.container}>
      <Header
        title="B2B Enterprise Portal"
        subtitle="GST Invoicing & e-Way Bill Integration"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Value Prop Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroBadge}>🏢 FOR BUSINESSES & TRADERS</Text>
          <Text style={styles.heroTitle}>Streamline Enterprise Freight with 100% GST Credit</Text>
          <Text style={styles.heroText}>
            Get 15/30-day corporate credit billing, multi-truck booking, and automatic e-Way bill sync.
          </Text>
        </View>

        {/* GST Registration Box */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>BUSINESS GSTIN VERIFICATION</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Company GSTIN (e.g. 07AABCN1234F1Z5)"
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.verifyBtn} activeOpacity={0.8}>
            <Text style={styles.verifyBtnText}>Verify GSTIN & Link Corporate Account →</Text>
          </TouchableOpacity>
        </View>

        {/* e-Way Bill 1-Click Sync */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>1-CLICK E-WAY BILL UPLOAD</Text>
          <Text style={styles.subText}>
            Upload e-Way Bill JSON/PDF or enter 12-digit e-Way Bill Number to auto-fill consignor, consignee, and vehicle compliance.
          </Text>
          <View style={styles.uploadBox}>
            <Text style={styles.uploadEmoji}>📄</Text>
            <Text style={styles.uploadTitle}>Tap to Upload e-Way Bill PDF / QR</Text>
            <Text style={styles.uploadSub}>Supports Govt. e-Way Bill formats</Text>
          </View>
        </View>

        {/* Enterprise Advantages */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>WHY BUSINESSES CHOOSE NEXTHERE LOGISTICS</Text>
          {[
            { t: '15 & 30 Day Credit Terms', d: 'Consolidated monthly invoicing without paying per trip.' },
            { t: 'Multi-Stop Route Optimizer', d: 'Up to 15 drops sequenced automatically to save 25% cost.' },
            { t: 'Multi-Pillar Corporate Mandate', d: 'Bundle logistics with IT networking and electrical panel setup.' },
          ].map((item, i) => (
            <View key={i} style={styles.featRow}>
              <Text style={styles.checkIcon}>✓</Text>
              <View style={styles.featTextCol}>
                <Text style={styles.featTitle}>{item.t}</Text>
                <Text style={styles.featDesc}>{item.d}</Text>
              </View>
            </View>
          ))}
        </View>
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
  heroCard: {
    backgroundColor: THEME.colors.primary,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    gap: 6,
  },
  heroBadge: {
    ...THEME.typography.badge,
    color: THEME.colors.accent,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  heroText: {
    fontSize: 12,
    color: '#CBD5E1',
    lineHeight: 18,
  },
  card: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 12,
  },
  cardHeader: {
    ...THEME.typography.badge,
    color: THEME.colors.textSecondary,
    letterSpacing: 0.5,
  },
  subText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    backgroundColor: THEME.colors.surface,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  verifyBtn: {
    backgroundColor: THEME.colors.royalBlue,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.sm,
    alignItems: 'center',
  },
  verifyBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: THEME.colors.borderDark,
    borderRadius: THEME.borderRadius.md,
    padding: 20,
    alignItems: 'center',
    gap: 4,
    backgroundColor: THEME.colors.surface,
  },
  uploadEmoji: {
    fontSize: 28,
  },
  uploadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  uploadSub: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  featRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkIcon: {
    color: THEME.colors.accent,
    fontWeight: '900',
    fontSize: 14,
    marginTop: 1,
  },
  featTextCol: {
    flex: 1,
    gap: 2,
  },
  featTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  featDesc: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    lineHeight: 15,
  },
});
