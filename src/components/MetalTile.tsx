import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useMetalPrice } from '../hooks/useMetalPrice';
import type { MetalSymbol } from '../constants/metals';
import { formatCurrency, formatDate, formatTime, toLocalDate } from '../utils/format';
import { SpinnerLoader, DotsLoader, BarLoader, PulseLoader } from '../loaders';

export default function MetalTile({
  symbol,
  name,
  loader,
  onPress
}: {
  symbol: MetalSymbol;
  name: string;
  loader: 'spinner' | 'dots' | 'bar' | 'pulse';
  onPress: (symbol: MetalSymbol) => void;
}) {
  const { data, loading, error, reload } = useMetalPrice(symbol);
  const Loader = loader === 'spinner' ? SpinnerLoader : loader === 'dots' ? DotsLoader : loader === 'bar' ? BarLoader : PulseLoader;
  const updatedAt = data ? toLocalDate(data.timestamp) : null;

  return (
    <Pressable
      onPress={() => data && onPress(symbol)}
      disabled={!data}
      style={{ backgroundColor: 'white', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 }}
    >
      <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 6 }}>{name}</Text>

      {loading && <Loader />}

      {error && (
        <View>
          <Text style={{ color: '#7f1d1d', marginBottom: 6 }} numberOfLines={2}>{error}</Text>
          <Pressable onPress={reload} style={{ alignSelf: 'flex-start', backgroundColor: '#111827', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
            <Text style={{ color: 'white' }}>Retry</Text>
          </Pressable>
        </View>
      )}

      {!loading && !error && data && (
        <View>
          <Text style={{ fontSize: 22, fontWeight: '800' }}>{formatCurrency(data.price, data.currency)}</Text>
          {updatedAt && (
            <Text style={{ color: '#6b7280', marginTop: 4 }}>
              {formatDate(updatedAt)} • {formatTime(updatedAt)}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
}
