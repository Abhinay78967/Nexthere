export const THEME = {
  colors: {
    primary: '#0A2540', // Deep Brand Navy
    primaryForeground: '#FFFFFF',
    accent: '#10B981', // Emerald
    accentLight: '#D1FAE5',
    royalBlue: '#2563EB',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    surfaceMuted: '#F1F5F9',
    border: '#E2E8F0',
    borderDark: '#CBD5E1',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '800' as const, lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '700' as const, lineHeight: 24 },
    body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    bodyBold: { fontSize: 14, fontWeight: '600' as const, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
    badge: { fontSize: 10, fontWeight: '700' as const, lineHeight: 14 },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};
