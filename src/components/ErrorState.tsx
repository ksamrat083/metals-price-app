import React from 'react';
import { View, Text, Pressable } from 'react-native';


export default function ErrorState({ message, onRetry }: { message?: string; onRetry: () => void }) {
return (
<View style={{ backgroundColor: '#fee2e2', borderRadius: 12, padding: 10 }}>
<Text style={{ color: '#7f1d1d', marginBottom: 6 }} numberOfLines={2}>
{message || 'Something went wrong'}
</Text>
<Pressable onPress={onRetry} style={{ alignSelf: 'flex-start', backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
<Text style={{ color: 'white', fontWeight: '600' }}>Retry</Text>
</Pressable>
</View>
);
}