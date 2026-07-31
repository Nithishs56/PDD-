import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { routes } from '../../dummyData';

const activeTrips = routes.filter((r) => r.status !== 'Not Started').map((r) => ({
  ...r,
  nextStop: r.stops[2]?.name || r.stops[r.stops.length - 1]?.name,
  boarded: r.students,
}));

const AdminTripMonitorScreen = ({ navigation }) => {
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  if (mapVisible && selectedTrip) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.root}>
          <TopBar title="Live Map" showBack />
          <View style={styles.mapFull}>
            <View style={styles.mapLine}>
              {[...Array(20)].map((_, i) => (
                <View key={i} style={styles.mapDash} />
              ))}
            </View>
            <View style={styles.busDot} />
            <Text style={styles.mapLabel}>Live Map View</Text>
            <Text style={styles.mapSub}>{selectedTrip.bus} · {selectedTrip.label}</Text>
            <TouchableOpacity style={styles.closeMapBtn} onPress={() => setMapVisible(false)}>
              <Text style={styles.closeMapText}>← Back to Monitor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const renderTrip = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.busNum}>{item.bus}</Text>
        <Badge text="Live" type="success" />
      </View>
      <Text style={styles.routeLabel}>{item.name} — {item.label}</Text>
      <Text style={styles.driverLabel}>{item.driver}</Text>
      <Text style={styles.boardedLabel}>Students Boarded: {item.boarded}</Text>
      <Text style={styles.nextStop}>Next Stop: {item.nextStop}</Text>
      <TouchableOpacity
        style={styles.mapBtn}
        onPress={() => { setSelectedTrip(item); setMapVisible(true); }}
      >
        <Text style={styles.mapBtnText}>View Map</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar title="Live Trips" showBack />
        <FlatList
          data={activeTrips}
          keyExtractor={(item) => item.id}
          renderItem={renderTrip}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No live trips at the moment" icon="navigate-outline" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  list: { flex: 1 },
  listContent: { padding: 16, paddingBottom: 60, flexGrow: 1 },
  card: {
    backgroundColor: '#111318', borderRadius: 12,
    padding: 14, marginBottom: 14,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  busNum: { fontSize: 14, fontWeight: '500', color: '#e2e8f0' },
  routeLabel: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  driverLabel: { fontSize: 12, color: '#9ca3af', marginBottom: 4 },
  boardedLabel: { fontSize: 12, color: '#34d399', marginBottom: 2 },
  nextStop: { fontSize: 12, color: '#9ca3af', marginBottom: 10 },
  mapBtn: {
    borderWidth: 0.5, borderColor: '#7c8ff7', borderRadius: 8,
    padding: 8, alignItems: 'center', alignSelf: 'stretch',
  },
  mapBtnText: { color: '#7c8ff7', fontSize: 12 },
  mapFull: {
    flex: 1, backgroundColor: '#0d2035', borderRadius: 12,
    margin: 16, alignItems: 'center', justifyContent: 'center',
  },
  mapLine: {
    position: 'absolute', flexDirection: 'row', left: 20, right: 20,
    alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  mapDash: { width: 8, height: 2, backgroundColor: '#7c8ff7', borderRadius: 1 },
  busDot: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#7c8ff7', marginBottom: 16,
  },
  mapLabel: { fontSize: 18, fontWeight: '600', color: '#7c8ff7', marginBottom: 8 },
  mapSub: { fontSize: 13, color: '#6b7280', marginBottom: 24 },
  closeMapBtn: { padding: 12 },
  closeMapText: { color: '#7c8ff7', fontSize: 14 },
});

export default AdminTripMonitorScreen;
