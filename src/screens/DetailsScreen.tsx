import React, { useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, Text, View } from 'react-native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useMetalPrice } from '../hooks/useMetalPrice';
import { formatCurrency, formatDate, formatTime, toLocalDate } from '../utils/format';

export default function DetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const { symbol } = route.params;
  const { data, loading, error, reload } = useMetalPrice(symbol);

  const updatedAt = data ? toLocalDate(data.timestamp) : null;

  const rows = useMemo(() => {
    if (!data) return [];
    return [
      { label: 'Current Price (24k)', value: formatCurrency(data.price, data.currency) },
      { label: "Today's Open", value: data.open ? formatCurrency(data.open, data.currency) : '—' },
      { label: 'Previous Open', value: data.prevOpen ? formatCurrency(data.prevOpen, data.currency) : '—' },
      { label: 'Previous Close', value: data.prevClose ? formatCurrency(data.prevClose, data.currency) : '—' },
      { label: 'Day High', value: data.high ? formatCurrency(data.high, data.currency) : '—' },
      { label: 'Day Low', value: data.low ? formatCurrency(data.low, data.currency) : '—' },
      { label: "Today's Date", value: updatedAt ? formatDate(updatedAt) : '—' },
      { label: "Today's Time", value: updatedAt ? formatTime(updatedAt) : '—' },
    ];
  }, [data, updatedAt]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '800', marginBottom: 6 }}>{symbol} Details</Text>
      {loading && <Text>Loading…</Text>}
      {error && (
        <View style={{ backgroundColor: '#fee2e2', borderRadius: 12, padding: 10, marginBottom: 12 }}>
          <Text style={{ color: '#7f1d1d', marginBottom: 6 }}>{error}</Text>
          <Text onPress={reload} style={{ color: '#111827', fontWeight: '600' }}>Retry</Text>
        </View>
      )}
      {rows.map((r) => (
        <View key={r.label} style={{ paddingVertical: 12, borderBottomColor: '#e5e7eb', borderBottomWidth: 1 }}>
          <Text style={{ color: '#6b7280', marginBottom: 4 }}>{r.label}</Text>
          <Text selectable style={{ fontSize: 18, fontWeight: '700' }}>{r.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
