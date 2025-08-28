import React from 'react';
import { Text, View } from 'react-native';

export default function DotsLoader() {
  return (
    <View style={{ padding: 12, alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>⋯</Text>
    </View>
  );
}
