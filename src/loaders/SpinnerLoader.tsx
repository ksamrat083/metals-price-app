import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function SpinnerLoader() {
  return (
    <View style={{ padding: 12, alignItems: 'center' }}>
      <ActivityIndicator size="small" color="#111827" />
    </View>
  );
}
