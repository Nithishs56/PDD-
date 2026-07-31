import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { buses } from '../../dummyData';

const AdminFleetScreen = ({ navigation }) => {
  const renderBus = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('More', { screen: 'AddVehicle', params: { bus: item } })}
    >
      <View style={styles.busIcon}>
        <Text style={styles.emoji}>🚌</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.busName}>{item.number}</Text>
        <Text style={styles.busModel}>{item.model} · {item.capacity} seats</Text>
      </View>
      <Badge text={item.status} type={item.status === 'Active' ? 'success' : 'warning'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar
          title="Fleet Management"
          showBack
          rightIcon={<Ionicons name="add-circle-outline" size={24} color="#7c8ff7" />}
        />
        <FlatList
          data={buses}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderBus}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No vehicles found" icon="bus-outline" />}
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
    backgroundColor: '#111318', flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 14, marginBottom: 12,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  busIcon: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#0e1018',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  emoji: { fontSize: 20 },
  info: { flex: 1 },
  busName: { fontSize: 15, fontWeight: '600', color: '#e2e8f0', marginBottom: 2 },
  busModel: { fontSize: 12, color: '#6b7280' },
});

export default AdminFleetScreen;
