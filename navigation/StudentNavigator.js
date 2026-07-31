import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../dummyData';

import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import StudentBoardScreen from '../screens/student/StudentBoardScreen';
import StudentTrackScreen from '../screens/student/StudentTrackScreen';
import StudentHistoryScreen from '../screens/student/StudentHistoryScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="StudentHome" component={StudentHomeScreen} />
      <HomeStack.Screen name="StudentBoard" component={StudentBoardScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
    </HomeStack.Navigator>
  );
}

export default function StudentNavigator() {
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
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'home',
            Track: 'location',
            History: 'time',
            Profile: 'person',
          };
          return <Ionicons name={icons[route.name] || 'apps'} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNav} />
      <Tab.Screen name="Track" component={StudentTrackScreen} />
      <Tab.Screen name="History" component={StudentHistoryScreen} />
      <Tab.Screen name="Profile" component={StudentProfileScreen} />
    </Tab.Navigator>
  );
}
