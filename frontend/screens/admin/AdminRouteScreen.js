import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import EmptyState from '../../components/EmptyState';
import { routes } from '../../dummyData';

const AdminRouteScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const renderRoute = ({ item }) => {
    const isOpen = expanded === item.id;
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => toggleExpand(item.id)} activeOpacity={0.85}>
          <View style={styles.cardRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.routeName}>{item.name} — {item.label}</Text>
              <Text style={styles.busSub}>{item.bus}</Text>
              <Text style={styles.stopsSub}>{item.stops.length} stops · {item.students} students</Text>
            </View>
            <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={18} color="#6b7280" />
          </View>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.timeline}>
            {item.stops.map((stop, idx) => (
              <View key={idx} style={styles.stopRow}>
                <View style={styles.dotCol}>
                  <View style={styles.stopDot} />
                  {idx < item.stops.length - 1 && <View style={styles.stopLine} />}
                </View>
                <View style={styles.stopInfo}>
                  <Text style={styles.stopName}>{stop.name}</Text>
                  <Text style={styles.stopTime}>{stop.time}</Text>
                </View>
              </View>
            ))}
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => navigation.navigate('AddRoute', { route: item })}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Delete', `Delete ${item.name}?`, [
                { text: 'Delete', style: 'destructive', onPress: () => {} },
                { text: 'Cancel', style: 'cancel' },
              ])}>
                <Text style={styles.deleteBtn}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar
          title="Routes"
          rightIcon={
            <TouchableOpacity onPress={() => navigation.navigate('AddRoute', {})}>
              <Ionicons name="add-circle-outline" size={24} color="#7c8ff7" />
            </TouchableOpacity>
          }
        />
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id}
          renderItem={renderRoute}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No routes defined" icon="map-outline" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  list: { flex: 1 },
  listContent: { paddingTop: 16, paddingBottom: 60, flexGrow: 1 },
  card: {
    backgroundColor: '#111318', borderRadius: 12,
    padding: 14, marginHorizontal: 16, marginBottom: 10,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start' },
  routeName: { fontSize: 14, fontWeight: '500', color: '#e2e8f0', marginBottom: 2 },
  busSub: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  stopsSub: { fontSize: 11, color: '#9ca3af' },
  timeline: { marginTop: 14 },
  stopRow: { flexDirection: 'row', marginBottom: 2 },
  dotCol: { alignItems: 'center', width: 20, marginRight: 10 },
  stopDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#7c8ff7' },
  stopLine: { width: 2, flex: 1, backgroundColor: '#1e2235', minHeight: 24, marginVertical: 2 },
  stopInfo: { flex: 1, paddingBottom: 12 },
  stopName: { fontSize: 12, color: '#e2e8f0' },
  stopTime: { fontSize: 11, color: '#6b7280' },
  actionRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
  editBtn: { fontSize: 12, color: '#7c8ff7', fontWeight: '500' },
  deleteBtn: { fontSize: 12, color: '#f87171', fontWeight: '500' },
});

export default AdminRouteScreen;
