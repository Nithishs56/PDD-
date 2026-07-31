import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Switch,
  TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../../components/TopBar';

const AdminSettingsScreen = () => {
  const [institution, setInstitution] = useState('ABC Engineering College');
  const [city, setCity] = useState('Chennai');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [tripAlerts, setTripAlerts] = useState(true);
  const [fraudAlerts, setFraudAlerts] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <TopBar title="Settings" showBack />
        <ScrollView style={styles.list} contentContainerStyle={styles.scroll}>

          <Text style={styles.sectionTitle}>Institution Profile</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Institution Name</Text>
            <TextInput style={styles.input} value={institution} onChangeText={setInstitution}
              placeholderTextColor="#6b7280" />
            <Text style={styles.label}>City</Text>
            <TextInput style={[styles.input, { marginBottom: 0 }]} value={city}
              onChangeText={setCity} placeholderTextColor="#6b7280" />
          </View>

          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Old Password</Text>
            <TextInput style={styles.input} value={oldPass} onChangeText={setOldPass}
              secureTextEntry placeholderTextColor="#6b7280" placeholder="••••••••" />
            <Text style={styles.label}>New Password</Text>
            <TextInput style={styles.input} value={newPass} onChangeText={setNewPass}
              secureTextEntry placeholderTextColor="#6b7280" placeholder="••••••••" />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput style={[styles.input, { marginBottom: 0 }]} value={confirmPass}
              onChangeText={setConfirmPass} secureTextEntry placeholderTextColor="#6b7280" placeholder="••••••••" />
          </View>

          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.card}>
            {[
              { label: 'Maintenance Alerts', value: maintenanceAlerts, setter: setMaintenanceAlerts },
              { label: 'Trip Alerts', value: tripAlerts, setter: setTripAlerts },
              { label: 'Fraud Alerts', value: fraudAlerts, setter: setFraudAlerts },
            ].map((item, idx, arr) => (
              <View key={item.label} style={[styles.switchRow, idx < arr.length - 1 && styles.switchBorder]}>
                <Text style={styles.switchLabel}>{item.label}</Text>
                <Switch
                  value={item.value}
                  onValueChange={item.setter}
                  trackColor={{ false: '#1e2235', true: '#7c8ff7' }}
                  thumbColor="#e2e8f0"
                />
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.dangerBtn}
            onPress={() => Alert.alert('Delete Account', 'This action is irreversible. Are you sure?', [
              { text: 'Delete', style: 'destructive', onPress: () => {} },
              { text: 'Cancel', style: 'cancel' },
            ])}
          >
            <Text style={styles.dangerText}>Delete Account</Text>
          </TouchableOpacity>
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
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#7c8ff7', marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: '#111318', borderRadius: 12,
    padding: 16, borderWidth: 0.5, borderColor: '#1a1f35',
  },
  label: { fontSize: 12, color: '#6b7280', marginBottom: 6 },
  input: {
    backgroundColor: '#080a0f', borderRadius: 8, padding: 12,
    color: '#e2e8f0', fontSize: 13, flex: 1,
    borderWidth: 0.5, borderColor: '#1e2235', marginBottom: 14,
  },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  switchBorder: { borderBottomWidth: 0.5, borderBottomColor: '#1e2235' },
  switchLabel: { fontSize: 14, color: '#e2e8f0' },
  dangerBtn: {
    borderWidth: 0.5, borderColor: '#f87171', borderRadius: 10,
    padding: 14, alignItems: 'center', marginTop: 8, alignSelf: 'stretch',
  },
  dangerText: { color: '#f87171', fontSize: 14, fontWeight: '500' },
});

export default AdminSettingsScreen;
