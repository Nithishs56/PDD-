import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AppLogo from '../../components/AppLogo';
import Badge from '../../components/Badge';
import SectionTitle from '../../components/SectionTitle';
import { routes, maintenanceAlerts } from '../../dummyData';

const statusType  = (s) => s === 'Completed' ? 'success' : s === 'In Progress' ? 'warning' : 'danger';
const statusColor = (s) => s === 'Completed' ? '#34d399' : s === 'In Progress' ? '#fbbf24' : '#f87171';

const STATS = [
  { label: 'Total Buses',   value: '5',  icon: 'bus-outline',              color: '#7c8ff7', bg: '#131628' },
  { label: 'Boarded Today', value: '43', icon: 'people-outline',           color: '#34d399', bg: '#0d2e1f' },
  { label: 'Trips Done',    value: '3',  icon: 'checkmark-circle-outline', color: '#fbbf24', bg: '#2a200d' },
  { label: 'Alerts',        value: '3',  icon: 'warning-outline',          color: '#f87171', bg: '#2a1212' },
];

const AdminHomeScreen = () => {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#080a0f', '#0a0c10']} style={styles.root}>
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <AppLogo size="sm" />
            <Text style={styles.logoText}>FleetSync</Text>
          </View>
          <TouchableOpacity style={styles.bellWrap}>
            <Ionicons name="notifications-outline" size={22} color="#e2e8f0" />
            <View style={styles.bellBadge}><Text style={styles.bellBadgeText}>3</Text></View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={['#131628', '#0d0f16']} style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>Welcome, Admin User 👋</Text>
            <Text style={styles.welcomeDate}>{today}</Text>
          </LinearGradient>

          <View style={styles.statsGrid}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: s.bg }]}>
                  <Ionicons name={s.icon} size={15} color={s.color} />
                </View>
                <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          <SectionTitle title="Today's Trips" />
          {routes.map((r) => (
            <View key={r.id} style={[styles.card, { borderLeftColor: statusColor(r.status) }]}>
              <View style={styles.cardRow}>
                <Text style={styles.routeName}>{r.name} — {r.label}</Text>
                <Badge text={r.status} type={statusType(r.status)} />
              </View>
              <Text style={styles.sub}>{r.driver}</Text>
              <Text style={styles.sub2}>Boarded: {r.students} students</Text>
            </View>
          ))}

          <SectionTitle title="Maintenance Alerts" />
          {maintenanceAlerts.map((a) => (
            <View key={a.id} style={[styles.card, { borderLeftColor: a.severity === 'critical' ? '#f87171' : '#fbbf24' }]}>
              <View style={styles.cardRow}>
                <Text style={styles.routeName}>{a.bus}</Text>
                <Badge text={a.severity === 'critical' ? 'Critical' : 'Warning'} type={a.severity === 'critical' ? 'danger' : 'warning'} />
              </View>
              <Text style={styles.sub}>{a.message}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  topBar: {
    backgroundColor: 'rgba(17,19,24,0.97)', borderBottomWidth: 0.5, borderBottomColor: '#1e2235',
    paddingVertical: 10, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoText: { fontSize: 18, fontWeight: '700', color: '#e2e8f0' },
  bellWrap: { position: 'relative' },
  bellBadge: {
    position: 'absolute', top: -4, right: -4, backgroundColor: '#f87171',
    borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center',
  },
  bellBadgeText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 60 },
  welcomeCard: {
    borderRadius: 16, padding: 20, marginHorizontal: 16, marginTop: 16, marginBottom: 8,
    shadowColor: '#7c8ff7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
  },
  welcomeText: { fontSize: 18, fontWeight: '600', color: '#e2e8f0' },
  welcomeDate: { fontSize: 12, color: '#6b7280', marginTop: 6 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, paddingTop: 12 },
  statCard: {
    backgroundColor: '#0e1018', borderRadius: 14, padding: 16,
    width: '47%', marginHorizontal: '1.5%', marginBottom: 10,
    borderWidth: 0.5, borderColor: '#1a1f35',
    shadowColor: '#7c8ff7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
  },
  statIcon: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', marginBottom: 8,
  },
  statValue: { fontSize: 26, fontWeight: '700' },
  statLabel: { fontSize: 11, color: '#6b7280', marginTop: 2 },
  card: {
    backgroundColor: '#111318', borderRadius: 12, padding: 14,
    marginHorizontal: 16, marginBottom: 10, borderLeftWidth: 3,
    shadowColor: '#7c8ff7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  routeName: { fontSize: 13, color: '#e2e8f0', flex: 1, marginRight: 8 },
  sub: { fontSize: 11, color: '#6b7280', marginBottom: 2 },
  sub2: { fontSize: 11, color: '#9ca3af' },
});

export default AdminHomeScreen;
