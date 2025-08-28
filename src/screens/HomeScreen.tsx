import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { METALS } from '../constants/metals';
import type { MetalSymbol } from '../constants/metals';
import MetalTile from '../components/MetalTile';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0);

  const onPressTile = useCallback((symbol: MetalSymbol) => {
    navigation.navigate('Details', { symbol });
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshNonce(n => n + 1); // force tiles to reload
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 }}>
        <Text style={{ fontSize: 26, fontWeight: '800' }}>Live Metals (24k)</Text>
        <Text style={{ color: '#6b7280', marginTop: 4 }}>Gold • Silver • Platinum • Palladium</Text>
      </View>

      <FlatList
        contentContainerStyle={{ padding: 16, gap: 12 }}
        data={METALS}
        keyExtractor={(item) => item.symbol}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <View key={`${item.symbol}-${refreshNonce}`}>
              <MetalTile symbol={item.symbol} name={item.name} loader={item.loader} onPress={onPressTile} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
