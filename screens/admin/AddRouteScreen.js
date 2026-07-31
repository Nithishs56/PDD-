import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import TopBar from '../../components/TopBar';
import { useToast } from '../../context/ToastContext';
import { buses } from '../../dummyData';

const AddRouteScreen = ({ route, navigation }) => {
  const existing = route.params?.route;
  const { showToast } = useToast();
  const [routeName, setRouteName] = useState(existing?.name || '');
  const [bus, setBus] = useState(existing?.bus || '');
  const [busDropdown, setBusDropdown] = useState(false);
  const [stops, setStops] = useState(
    existing?.stops || [{ name: '', time: '' }]
  );

  const addStop = () => setStops([...stops, { name: '', time: '' }]);
  const removeStop = (idx) => setStops(stops.filter((_, i) => i !== idx));
  const updateStop = (idx, field, val) => {
    const updated = [...stops];
    updated[idx][field] = val;
    setStops(updated);
  };

  const handleSave = () => {
    showToast('Route saved successfully!', 'success');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title={existing ? 'Edit Route' : 'Add Route'} showBack />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Route Name</Text>
        <TextInput style={styles.input} value={routeName} onChangeText={setRouteName}
          placeholder="e.g. Route 4" placeholderTextColor="#6b7280" />

        <Text style={styles.label}>Assign Bus</Text>
        <TouchableOpacity style={styles.input} onPress={() => setBusDropdown(!busDropdown)}>
          <Text style={{ color: bus ? '#e2e8f0' : '#6b7280' }}>{bus || 'Select bus...'}</Text>
        </TouchableOpacity>
        {busDropdown && (
          <View style={styles.dropdown}>
            {buses.map((b) => (
              <TouchableOpacity key={b.id} style={styles.dropItem}
                onPress={() => { setBus(b.id); setBusDropdown(false); }}>
                <Text style={styles.dropText}>{b.id} ({b.driver})</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={[styles.label, { marginTop: 8 }]}>Stops</Text>
        {stops.map((stop, idx) => (
          <View key={idx} style={styles.stopRow}>
            <TextInput
              style={[styles.input, styles.stopNameInput]}
              placeholder={`Stop ${idx + 1}`}
              placeholderTextColor="#6b7280"
              value={stop.name}
              onChangeText={(v) => updateStop(idx, 'name', v)}
            />
            <TextInput
              style={[styles.input, styles.stopTimeInput]}
              placeholder="Time"
              placeholderTextColor="#6b7280"
              value={stop.time}
              onChangeText={(v) => updateStop(idx, 'time', v)}
            />
            {stops.length > 1 && (
              <TouchableOpacity onPress={() => removeStop(idx)} style={styles.removeBtn}>
                <Ionicons name="remove-circle" size={22} color="#f87171" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addStopBtn} onPress={addStop}>
          <Text style={styles.addStopText}>＋ Add Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save Route</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#080a0f' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 60 },
  label: { fontSize: 12, color: '#6b7280', marginBottom: 4 },
  input: {
    backgroundColor: '#111318', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, color: '#e2e8f0', fontSize: 14,
    borderWidth: 0.5, borderColor: '#1e2235', marginBottom: 16, flex: 1,
  },
  dropdown: {
    backgroundColor: '#111318', borderRadius: 10,
    borderWidth: 0.5, borderColor: '#1e2235', marginBottom: 16, marginTop: -12,
  },
  dropItem: { padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#1e2235' },
  dropText: { color: '#e2e8f0', fontSize: 13 },
  stopRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stopNameInput: { flex: 1, marginBottom: 12 },
  stopTimeInput: { width: 90, marginBottom: 12 },
  removeBtn: { marginBottom: 12 },
  addStopBtn: {
    borderWidth: 0.5, borderColor: '#7c8ff7', borderRadius: 10,
    padding: 12, alignItems: 'center', marginBottom: 20, alignSelf: 'stretch',
  },
  addStopText: { color: '#7c8ff7', fontSize: 14 },
  saveBtn: { backgroundColor: '#7c8ff7', borderRadius: 10, padding: 16, alignItems: 'center', alignSelf: 'stretch' },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
});

export default AddRouteScreen;
