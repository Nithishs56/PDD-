import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { TripProvider } from './context/TripContext';
import { NotificationProvider } from './context/NotificationContext';
import RootNavigator from './navigation/RootNavigator';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#080a0f' }}>
      <SafeAreaProvider>
        <AuthProvider>
          <TripProvider>
            <NotificationProvider>
              <ToastProvider>
                <NavigationContainer>
                  <StatusBar style="light" backgroundColor="#080a0f" translucent={false} />
                  <RootNavigator />
                </NavigationContainer>
              </ToastProvider>
            </NotificationProvider>
          </TripProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
