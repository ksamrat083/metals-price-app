import React from 'react';
import { View } from 'react-native';

export default function BarLoader() {
  return (
    <View style={{ flexDirection: 'row', gap: 4, padding: 12, justifyContent: 'center' }}>
      <View style={{ width: 6, height: 20, backgroundColor: '#111827', borderRadius: 3 }} />
      <View style={{ width: 6, height: 20, backgroundColor: '#9ca3af', borderRadius: 3 }} />
      <View style={{ width: 6, height: 20, backgroundColor: '#d1d5db', borderRadius: 3 }} />
    </View>
  );
}
