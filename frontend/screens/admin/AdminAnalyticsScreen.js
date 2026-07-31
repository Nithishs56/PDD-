import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';
import EmptyState from '../../components/EmptyState';
import { fraudAttempts, routes } from '../../dummyData';

const weekData = [
  { day: 'Mon', value: 55 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 48 },
  { day: 'Thu', value: 70 },
  { day: 'Fri', value: 60 },
  { day: 'Sat', value: 20 },
  { day: 'Sun', value: 10 },
];

const MAX_HEIGHT = 100;
const BAR_MAX = 100;

const routeUtilization = [
  { name: 'Route 1', percent: 83 },
  { name: 'Route 2', percent: 72 },
  { name: 'Route 3', percent: 23 },
];

const AdminAnalyticsScreen = () => (
  <SafeAreaView style={styles.safe}>
    <View style={styles.root}>
      <TopBar title="Analytics" showBack />
      <ScrollView style={styles.list} contentContainerStyle={styles.scroll}>
        {/* Weekly Boarding Trend */}
        <Text style={styles.section}>Weekly Boarding Trend</Text>
        <View style={styles.chartContainer}>
          {weekData.map((d) => (
            <View key={d.day} style={styles.barWrapper}>
              <View style={styles.barBg}>
                <View style={[styles.bar, { height: (d.value / BAR_MAX) * MAX_HEIGHT }]} />
              </View>
              <Text style={styles.barDay}>{d.day}</Text>
            </View>
          ))}
        </View>

        {/* Route Utilization */}
        <Text style={styles.section}>Route Utilization</Text>
        {routeUtilization.map((r) => (
          <View key={r.name} style={styles.utilRow}>
            <Text style={styles.utilName}>{r.name}</Text>
            <View style={styles.utilBarBg}>
              <View
                style={[
                  styles.utilBarFill,
                  {
                    width: `${r.percent}%`,
                    backgroundColor: r.percent > 70 ? '#34d399' : r.percent > 40 ? '#fbbf24' : '#f87171',
                  },
                ]}
              />
            </View>
            <Text style={styles.utilPct}>{r.percent}%</Text>
          </View>
        ))}

        {/* Fraud Attempt Log */}
        <Text style={styles.section}>Fraud Attempt Log</Text>
        {fraudAttempts.length > 0 ? (
          fraudAttempts.map((f) => (
            <View key={f.id} style={styles.fraudCard}>
              <View style={styles.fraudRow}>
                <Text style={styles.fraudStudent}>{f.studentName}</Text>
                <View style={styles.blockedBadge}>
                  <Text style={styles.blockedText}>Blocked</Text>
                </View>
              </View>
              <Text style={styles.fraudDetail}>{f.route} · {f.stop} · {f.time}</Text>
              <Text style={styles.fraudReason}>{f.reason}</Text>
            </View>
          ))
        ) : (
          <EmptyState message="No fraud attempts logged" icon="shield-checkmark-outline" />
        )}
      </ScrollView>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  list: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 60, flexGrow: 1 },
  section: { fontSize: 14, fontWeight: '600', color: '#e2e8f0', marginTop: 16, marginBottom: 12 },
  chartContainer: {
    flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
    height: 130, backgroundColor: '#111318', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  barWrapper: { alignItems: 'center', flex: 1 },
  barBg: { height: MAX_HEIGHT, justifyContent: 'flex-end', width: '70%' },
  bar: { backgroundColor: '#7c8ff7', borderRadius: 3, width: '100%' },
  barDay: { fontSize: 9, color: '#6b7280', marginTop: 4 },
  utilRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  utilName: { width: 60, fontSize: 11, color: '#e2e8f0' },
  utilBarBg: {
    flex: 1, height: 6, backgroundColor: '#080a0f',
    borderRadius: 3, marginHorizontal: 8,
  },
  utilBarFill: { height: 6, borderRadius: 3 },
  utilPct: { fontSize: 11, color: '#9ca3af', width: 36, textAlign: 'right' },
  fraudCard: {
    backgroundColor: '#111318', borderRadius: 10, padding: 12, marginBottom: 8,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  fraudRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  fraudStudent: { fontSize: 13, fontWeight: '500', color: '#e2e8f0' },
  blockedBadge: { backgroundColor: '#3f1f1f', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 8 },
  blockedText: { color: '#f87171', fontSize: 10 },
  fraudDetail: { fontSize: 11, color: '#6b7280', marginBottom: 2 },
  fraudReason: { fontSize: 11, color: '#9ca3af' },
});

export default AdminAnalyticsScreen;
