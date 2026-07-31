import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import DriverNavigator from './DriverNavigator';
import StudentNavigator from './StudentNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { currentUser, loading } = useAuth();

  // Prevent login screen from flashing on every app restart
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c8ff7" />
        <Text style={styles.loadingText}>FleetSync</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {currentUser === null ? (
        // Auth screens
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'slide_from_right' }} />
        </>
      ) : currentUser.role === 'driver' ? (
        <Stack.Screen name="DriverRoot" component={DriverNavigator} />
      ) : (
        <Stack.Screen name="StudentRoot" component={StudentNavigator} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#080a0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
    textAlign: 'center',
  },
});
