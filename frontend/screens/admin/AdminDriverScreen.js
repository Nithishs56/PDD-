import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import AvatarCircle from '../../components/AvatarCircle';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { drivers } from '../../dummyData';

const getInitials = (name) => name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const AdminDriverScreen = () => {
  const handleLongPress = (d) => {
    Alert.alert('Options', d.name, [
      { text: 'Edit', onPress: () => {} },
      { text: 'Delete', style: 'destructive', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const renderDriver = ({ item }) => (
    <TouchableOpacity style={styles.card} onLongPress={() => handleLongPress(item)} activeOpacity={0.9}>
      <AvatarCircle initials={getInitials(item.name)} size={44} fontSize={15} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.bus}>{item.assignedBus}</Text>
      </View>
      <Badge text={item.status === 'active' ? 'Active' : 'Inactive'} type={item.status === 'active' ? 'success' : 'danger'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar
          title="Drivers"
          showBack
          rightIcon={<Ionicons name="add-circle-outline" size={24} color="#7c8ff7" />}
        />
        <FlatList
          data={drivers}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderDriver}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No drivers found" icon="people-outline" />}
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
    padding: 14, borderRadius: 12, marginBottom: 10,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '500', color: '#e2e8f0', marginBottom: 2 },
  phone: { fontSize: 12, color: '#6b7280', marginBottom: 2 },
  bus: { fontSize: 12, color: '#9ca3af' },
});

export default AdminDriverScreen;
