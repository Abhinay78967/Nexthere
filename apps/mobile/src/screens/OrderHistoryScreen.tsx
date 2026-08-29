import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { THEME } from '../constants/theme';
import { Header } from '../components/Header';

interface OrderHistoryScreenProps {
  onBack: () => void;
}

export function OrderHistoryScreen({ onBack }: OrderHistoryScreenProps) {
  const PAST_ORDERS = [
    {
      id: 'NXT-849201',
      date: '28 Aug 2026',
      vehicle: 'Tata Ace (Chota Hathi)',
      route: 'Connaught Place ➔ Noida Sector 62',
      status: 'DELIVERED',
      amount: '₹663',
      invoiceNo: 'INV-2026-0849',
    },
    {
      id: 'NXT-719342',
      date: '21 Aug 2026',
      vehicle: 'Pickup 8ft (Bolero)',
      route: 'Okhla Phase 3 ➔ Faridabad NIT',
      status: 'DELIVERED',
      amount: '₹819',
      invoiceNo: 'INV-2026-0719',
    },
    {
      id: 'NXT-501239',
      date: '14 Aug 2026',
      vehicle: '3-Wheeler (Tempo)',
      route: 'Chandni Chowk ➔ Karol Bagh',
      status: 'DELIVERED',
      amount: '₹340',
      invoiceNo: 'INV-2026-0501',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Your Delivery Trips" subtitle="Invoices & Trip History" onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {PAST_ORDERS.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.cardTopRow}>
              <View>
                <Text style={styles.orderId}>Trip #{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>✓ {order.status}</Text>
              </View>
            </View>

            <View style={styles.routeBox}>
              <Text style={styles.vehicleName}>🚛 {order.vehicle}</Text>
              <Text style={styles.routeText}>{order.route}</Text>
            </View>

            <View style={styles.cardBottomRow}>
              <View>
                <Text style={styles.amountLabel}>Paid Total</Text>
                <Text style={styles.amountValue}>{order.amount}</Text>
              </View>

              <TouchableOpacity style={styles.invoiceBtn}>
                <Text style={styles.invoiceBtnText}>📄 PDF Invoice</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    gap: 12,
  },
  orderCard: {
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    gap: 10,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  orderDate: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: THEME.colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    ...THEME.typography.badge,
    color: '#065F46',
  },
  routeBox: {
    backgroundColor: THEME.colors.surface,
    padding: 10,
    borderRadius: THEME.borderRadius.sm,
    gap: 4,
  },
  vehicleName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
  },
  routeText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  amountLabel: {
    fontSize: 10,
    color: THEME.colors.textMuted,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '900',
    color: THEME.colors.textPrimary,
  },
  invoiceBtn: {
    backgroundColor: THEME.colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  invoiceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.royalBlue,
  },
});
