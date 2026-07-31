import React from 'react';
import {
  View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const AdminMoreScreen = ({ navigation }) => {
  const { logout } = useAuth();

  const items = [
    { label: 'Drivers', icon: 'people-outline', screen: 'AdminDrivers' },
    { label: 'Trip Monitor', icon: 'car-sport-outline', screen: 'AdminTripMonitor' },
    { label: 'Maintenance', icon: 'construct-outline', screen: 'AdminMaintenance' },
    { label: 'Analytics', icon: 'bar-chart-outline', screen: 'AdminAnalytics' },
    { label: 'Settings', icon: 'AdminSettings' },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.topBar}>
          <Text style={styles.topTitle}>More</Text>
        </View>

        <ScrollView style={styles.list} contentContainerStyle={styles.scroll}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.row}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <View style={styles.rowLeft}>
                <Ionicons name={item.icon || 'settings-outline'} size={20} color="#7c8ff7" style={{ marginRight: 14 }} />
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#6b7280" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.row} onPress={handleLogout} activeOpacity={0.8}>
            <View style={styles.rowLeft}>
              <Ionicons name="log-out-outline" size={20} color="#f87171" style={{ marginRight: 14 }} />
              <Text style={[styles.rowLabel, { color: '#f87171' }]}>Logout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6b7280" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  topBar: {
    backgroundColor: '#111318', borderBottomWidth: 0.5,
    borderBottomColor: '#1e2235', paddingVertical: 14, paddingHorizontal: 16,
  },
  topTitle: { fontSize: 18, fontWeight: '600', color: '#e2e8f0' },
  list: { flex: 1 },
  scroll: { flexGrow: 1, paddingTop: 12, paddingBottom: 60 },
  row: {
    backgroundColor: '#111318', borderBottomWidth: 0.5, borderBottomColor: '#1e2235',
    padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowLabel: { fontSize: 14, color: '#e2e8f0' },
});

export default AdminMoreScreen;
