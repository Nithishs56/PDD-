import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import AdminHomeScreen        from '../screens/admin/AdminHomeScreen';
import AdminFleetScreen       from '../screens/admin/AdminFleetScreen';
import AdminRouteScreen       from '../screens/admin/AdminRouteScreen';
import AdminStudentScreen     from '../screens/admin/AdminStudentScreen';
import AdminMoreScreen        from '../screens/admin/AdminMoreScreen';
import AdminDriverScreen      from '../screens/admin/AdminDriverScreen';
import AdminTripMonitorScreen from '../screens/admin/AdminTripMonitorScreen';
import AdminMaintenanceScreen from '../screens/admin/AdminMaintenanceScreen';
import AdminAnalyticsScreen   from '../screens/admin/AdminAnalyticsScreen';
import AdminSettingsScreen    from '../screens/admin/AdminSettingsScreen';
import AddVehicleScreen       from '../screens/admin/AddVehicleScreen';
import AddRouteScreen         from '../screens/admin/AddRouteScreen';

const Tab  = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TAB_ICONS = {
  Home:     ['home', 'home-outline'],
  Fleet:    ['bus',  'bus-outline'],
  Routes:   ['map',  'map-outline'],
  Students: ['people', 'people-outline'],
  More:     ['grid', 'grid-outline'],
};

const CustomTabBar = ({ state, descriptors, navigation }) => (
  <View style={tabStyles.wrapper}>
    <LinearGradient
      colors={['transparent', '#7c8ff7', 'transparent']}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={tabStyles.topLine}
    />
    <View style={tabStyles.bar}>
      {state.routes.map((route, idx) => {
        const focused = state.index === idx;
        const [on, off] = TAB_ICONS[route.name] || ['ellipse', 'ellipse-outline'];
        const onPress = () => {
          if (!focused) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} style={tabStyles.tab} onPress={onPress} activeOpacity={0.8}>
            {focused && <View style={tabStyles.pill} />}
            <Ionicons name={focused ? on : off} size={22} color={focused ? '#7c8ff7' : '#6b7280'} />
            <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{route.name}</Text>
            {focused && <View style={tabStyles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="AdminMore"        component={AdminMoreScreen} />
    <Stack.Screen name="AdminDrivers"     component={AdminDriverScreen} />
    <Stack.Screen name="AdminTripMonitor" component={AdminTripMonitorScreen} />
    <Stack.Screen name="AdminMaintenance" component={AdminMaintenanceScreen} />
    <Stack.Screen name="AdminAnalytics"   component={AdminAnalyticsScreen} />
    <Stack.Screen name="AdminSettings"    component={AdminSettingsScreen} />
    <Stack.Screen name="AddVehicle"       component={AddVehicleScreen} />
    <Stack.Screen name="AddRoute"         component={AddRouteScreen} />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
    <Tab.Screen name="Home"     component={AdminHomeScreen} />
    <Tab.Screen name="Fleet"    component={AdminFleetScreen} />
    <Tab.Screen name="Routes"   component={AdminRouteScreen} />
    <Tab.Screen name="Students" component={AdminStudentScreen} />
    <Tab.Screen name="More"     component={MoreStack} />
  </Tab.Navigator>
);

const tabStyles = StyleSheet.create({
  wrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0a0c12', borderTopWidth: 0.5, borderTopColor: '#1a1f35' },
  topLine: { height: 1 },
  bar: { flexDirection: 'row', height: 60, paddingBottom: 6 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  pill: {
    position: 'absolute', top: 6, width: 44, height: 32,
    backgroundColor: '#131628', borderRadius: 10,
  },
  label: { fontSize: 9, color: '#6b7280', marginTop: 2 },
  labelActive: { color: '#7c8ff7' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#7c8ff7', marginTop: 2 },
});

export default AdminNavigator;
