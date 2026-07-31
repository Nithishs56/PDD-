import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../dummyData';

import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import DriverOTPScreen from '../screens/driver/DriverOTPScreen';
import DriverRouteScreen from '../screens/driver/DriverRouteScreen';
import DriverTripSummaryScreen from '../screens/driver/DriverTripSummaryScreen';
import DriverStudentListScreen from '../screens/driver/DriverStudentListScreen';
import DriverProfileScreen from '../screens/driver/DriverProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="DriverHome" component={DriverHomeScreen} />
      <HomeStack.Screen name="DriverOTP" component={DriverOTPScreen} />
      <HomeStack.Screen name="DriverRoute" component={DriverRouteScreen} />
      <HomeStack.Screen name="DriverTripSummary" component={DriverTripSummaryScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

export default function DriverNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.cardAlt,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.border,
          height: 60,
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500', marginTop: 2 },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Students: 'people',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name] || 'apps'} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNav} />
      <Tab.Screen name="Students" component={DriverStudentListScreen} />
      <Tab.Screen name="Profile" component={DriverProfileScreen} />
    </Tab.Navigator>
  );
}
