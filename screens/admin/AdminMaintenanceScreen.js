import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';
import EmptyState from '../../components/EmptyState';
import { maintenanceAlerts } from '../../dummyData';

const AdminMaintenanceScreen = () => {
  const critical = maintenanceAlerts.filter((a) => a.severity === 'critical');
  const warning = maintenanceAlerts.filter((a) => a.severity === 'warning');
  const upcoming = maintenanceAlerts.filter((a) => a.daysRemaining > 7);

  const renderCard = (item, type) => (
    <View key={item.id} style={[styles.card, type === 'critical' ? styles.criticalCard : styles.warningCard]}>
      <View style={styles.cardRow}>
        <Text style={styles.busNum}>{item.bus}</Text>
        <Text style={[styles.typeBadge, { color: type === 'critical' ? '#f87171' : '#fbbf24' }]}>
          {item.type}
        </Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.expiry}>Expires: {item.expiryDate}</Text>
      <Text style={styles.days}>{item.daysRemaining} days remaining</Text>
      <TouchableOpacity>
        <Text style={styles.resolveBtn}>Mark Resolved</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar title="Maintenance Alerts" showBack />
        <ScrollView style={styles.list} contentContainerStyle={styles.scroll}>
          {critical.length > 0 && (
            <>
              <Text style={styles.section}>🔴 Critical</Text>
              {critical.map((a) => renderCard(a, 'critical'))}
            </>
          )}
          {warning.length > 0 && (
            <>
              <Text style={styles.section}>⚠️ Warning</Text>
              {warning.map((a) => renderCard(a, 'warning'))}
            </>
          )}
          {upcoming.length > 0 && (
            <>
              <Text style={styles.section}>📅 Upcoming</Text>
              {upcoming.map((a) => renderCard(a, 'upcoming'))}
            </>
          )}
          {maintenanceAlerts.length === 0 && (
            <EmptyState message="No maintenance alerts" icon="construct-outline" />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  list: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 60, flexGrow: 1 },
  section: { fontSize: 14, fontWeight: '600', color: '#e2e8f0', marginTop: 12, marginBottom: 8 },
  card: {
    borderRadius: 12, padding: 14, marginBottom: 12, borderLeftWidth: 3,
  },
  criticalCard: { backgroundColor: '#1a1520', borderLeftColor: '#f87171' },
  warningCard: { backgroundColor: '#1a1a10', borderLeftColor: '#fbbf24' },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  busNum: { fontSize: 14, fontWeight: '500', color: '#e2e8f0' },
  typeBadge: { fontSize: 12, fontWeight: '500' },
  message: { fontSize: 12, color: '#9ca3af', marginBottom: 4 },
  expiry: { fontSize: 11, color: '#6b7280' },
  days: { fontSize: 11, color: '#6b7280', marginBottom: 10 },
  resolveBtn: { fontSize: 12, color: '#7c8ff7', fontWeight: '500' },
});

export default AdminMaintenanceScreen;
