import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  Switch, StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';
import { useToast } from '../../context/ToastContext';
import { drivers } from '../../dummyData';

const AddVehicleScreen = ({ route, navigation }) => {
  const bus = route.params?.bus || {};
  const isEdit = !!bus?.id;
  const { showToast } = useToast();

  const [plate, setPlate] = useState(bus.id || '');
  const [capacity, setCapacity] = useState(bus.capacity ? String(bus.capacity) : '');
  const [driver, setDriver] = useState(bus.driver || '');
  const [lastService, setLastService] = useState(bus.lastServiceDate || '');
  const [insurance, setInsurance] = useState(bus.insuranceExpiry || '');
  const [pollution, setPollution] = useState(bus.pollutionExpiry || '');
  const [isActive, setIsActive] = useState(bus.status !== 'inactive');
  const [driverDropdown, setDriverDropdown] = useState(false);

  const handleSave = () => {
    if (!plate.trim()) {
      Alert.alert('Error', 'Bus Number Plate is required.');
      return;
    }
    showToast(isEdit ? 'Vehicle updated successfully!' : 'Vehicle saved successfully!', 'success');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title={isEdit ? 'Edit Vehicle' : 'Add Vehicle'} showBack />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* Bus Number */}
        <Text style={styles.label}>Bus Number Plate</Text>
        <TextInput style={styles.input} value={plate} onChangeText={setPlate}
          placeholder="e.g. TN01AB1234" placeholderTextColor="#6b7280"
          editable={!isEdit} />

        {/* Capacity */}
        <Text style={styles.label}>Seating Capacity</Text>
        <TextInput style={styles.input} value={capacity} onChangeText={setCapacity}
          placeholder="e.g. 52" placeholderTextColor="#6b7280" keyboardType="numeric" />

        {/* Driver Picker */}
        <Text style={styles.label}>Assigned Driver</Text>
        <TouchableOpacity style={styles.input} onPress={() => setDriverDropdown(!driverDropdown)}>
          <Text style={{ color: driver ? '#e2e8f0' : '#6b7280' }}>{driver || 'Select driver...'}</Text>
        </TouchableOpacity>
        {driverDropdown && (
          <View style={styles.dropdown}>
            {drivers.map((d) => (
              <TouchableOpacity key={d.id} style={styles.dropItem}
                onPress={() => { setDriver(d.name); setDriverDropdown(false); }}>
                <Text style={styles.dropText}>{d.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Last Service */}
        <Text style={styles.label}>Last Service Date</Text>
        <TextInput style={styles.input} value={lastService} onChangeText={setLastService}
          placeholder="DD-MM-YYYY" placeholderTextColor="#6b7280" />

        {/* Insurance */}
        <Text style={styles.label}>Insurance Expiry Date</Text>
        <TextInput style={styles.input} value={insurance} onChangeText={setInsurance}
          placeholder="DD-MM-YYYY" placeholderTextColor="#6b7280" />

        {/* Pollution */}
        <Text style={styles.label}>Pollution Certificate Expiry Date</Text>
        <TextInput style={styles.input} value={pollution} onChangeText={setPollution}
          placeholder="DD-MM-YYYY" placeholderTextColor="#6b7280" />

        {/* Status Toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Vehicle Status</Text>
          <View style={styles.toggleRight}>
            <Text style={{ color: isActive ? '#7c8ff7' : '#6b7280', fontSize: 12, marginRight: 8 }}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
            <Switch
              value={isActive}
              onValueChange={setIsActive}
              trackColor={{ false: '#1e2235', true: '#7c8ff7' }}
              thumbColor="#e2e8f0"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>Save Vehicle</Text>
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
  toggleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 24,
  },
  toggleRight: { flexDirection: 'row', alignItems: 'center' },
  saveBtn: {
    backgroundColor: '#7c8ff7', borderRadius: 10,
    padding: 16, alignItems: 'center', marginTop: 8, alignSelf: 'stretch',
  },
  saveBtnText: { color: '#ffffff', fontSize: 15, fontWeight: '500' },
});

export default AddVehicleScreen;
