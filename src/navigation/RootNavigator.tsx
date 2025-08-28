import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import type { MetalSymbol } from '../constants/metals';

export type RootStackParamList = {
  Home: undefined;
  Details: { symbol: MetalSymbol };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Metals Prices' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Metal Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
