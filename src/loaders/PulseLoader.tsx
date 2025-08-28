import React from 'react';
import { View } from 'react-native';

export default function PulseLoader() {
  return (
    <View style={{
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#111827',
      opacity: 0.6,
      margin: 12
    }} />
  );
}
