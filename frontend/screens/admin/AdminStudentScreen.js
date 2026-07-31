import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  ScrollView, Alert, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import AvatarCircle from '../../components/AvatarCircle';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import { students, routes } from '../../dummyData';

const getInitials = (name) => name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const AdminStudentScreen = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', ...routes.map((r) => r.name)];

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || s.route === activeFilter;
    return matchSearch && matchFilter;
  });

  const handleLongPress = (s) => {
    Alert.alert('Options', s.name, [
      { text: 'Edit', onPress: () => {} },
      { text: 'Delete', style: 'destructive', onPress: () => {} },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const renderStudent = ({ item }) => (
    <TouchableOpacity style={styles.card} onLongPress={() => handleLongPress(item)} activeOpacity={0.9}>
      <AvatarCircle initials={getInitials(item.name)} size={40} fontSize={14} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.roll}>{item.rollNumber}</Text>
        <Text style={styles.route}>{item.route}</Text>
      </View>
      <Badge text={item.status === 'active' ? 'Active' : 'Inactive'} type={item.status === 'active' ? 'success' : 'danger'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar
          title="Students"
          rightIcon={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Ionicons name="cloud-upload-outline" size={22} color="#7c8ff7" />
              <Ionicons name="add-circle-outline" size={24} color="#7c8ff7" />
            </View>
          }
        />
        <TextInput
          style={styles.search}
          placeholder="Search student or roll number..."
          placeholderTextColor="#6b7280"
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderStudent}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState message="No students found" icon="people-outline" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  root: { flex: 1 },
  search: {
    backgroundColor: '#111318', borderRadius: 10, padding: 12,
    marginHorizontal: 16, marginVertical: 16, color: '#e2e8f0', fontSize: 13,
    borderWidth: 0.5, borderColor: '#1e2235', flex: 1,
  },
  filterScroll: { flexGrow: 0 },
  filterRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  chip: {
    backgroundColor: '#111318', borderWidth: 0.5, borderColor: '#1e2235',
    borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14,
  },
  chipActive: { backgroundColor: '#7c8ff7', borderColor: '#7c8ff7' },
  chipText: { fontSize: 12, color: '#6b7280' },
  chipTextActive: { color: '#ffffff' },
  list: { flex: 1 },
  listContent: { paddingBottom: 60, flexGrow: 1 },
  card: {
    backgroundColor: '#111318', flexDirection: 'row', alignItems: 'center',
    padding: 14, marginHorizontal: 16, marginBottom: 10, borderRadius: 12,
    borderWidth: 0.5, borderColor: '#1a1f35',
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 13, color: '#e2e8f0', fontWeight: '500' },
  roll: { fontSize: 11, color: '#6b7280' },
  route: { fontSize: 11, color: '#9ca3af' },
});

export default AdminStudentScreen;
