import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { routes, routeStudents, COLORS } from '../../dummyData';
import TopBar from '../../components/TopBar';

export default function DriverTripSummaryScreen() {
  const navigation  = useNavigation();
  const { currentUser } = useAuth();
  const { boardedStudents, activeTrip, endTrip, setActiveTrip } = useTrip();

  const driverRoute  = routes.find(r => r.name === currentUser.route);
  const allStudents  = routeStudents[currentUser.route] || [];

  // Use TripContext boardedStudents for accurate count
  const boarded   = boardedStudents;
  const absentIds = new Set(allStudents
    .filter(s => !boardedStudents.some(b => b.id === s.id))
    .map(s => s.id)
  );
  const absentList    = allStudents.filter(s => absentIds.has(s.id));
  const notBoardedList = [];  // all not-boarded treated as absent in summary

  const today  = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const startTime = activeTrip?.startTime
    ? new Date(activeTrip.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    : '—';
  const endTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const infoRows = [
    { label: 'Route Name',    value: driverRoute?.label || currentUser.route },
    { label: 'Trip Date',     value: today },
    { label: 'Start Time',    value: startTime },
    { label: 'End Time',      value: endTime },
    { label: 'Total Students', value: String(allStudents.length) },
    { label: 'Total Boarded', value: `${boarded.length} / ${allStudents.length}`, green: true },
    { label: 'Total Absent',  value: String(absentList.length), danger: absentList.length > 0 },
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Trip Submitted',
      'Trip report submitted successfully. Great work!',
      [{
        text: 'OK',
        onPress: () => {
          endTrip();
          setActiveTrip(null);
          navigation.popToTop(); // pops stack back to DriverHome reliably
        },
      }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="Trip Summary" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── Summary card ── */}
        <View style={styles.card}>
          {infoRows.map((row, i) => (
            <View key={row.label} style={[styles.infoRow, i === infoRows.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={[
                styles.infoValue,
                row.green  && { color: COLORS.success },
                row.danger && { color: COLORS.danger },
              ]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Boarded students ── */}
        {boarded.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✅ Boarded Students ({boarded.length})</Text>
            {boarded.map(s => (
              <View key={s.id} style={styles.studentRow}>
                <View style={[styles.dot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.studentName}>{s.name}</Text>
                <Text style={styles.studentStop}>{s.stop} · {s.boardingTime}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Absent / not boarded students ── */}
        {absentList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>❌ Not Boarded ({absentList.length})</Text>
            {absentList.map(s => (
              <View key={s.id} style={styles.studentRow}>
                <View style={[styles.dot, { backgroundColor: COLORS.danger }]} />
                <Text style={styles.studentName}>{s.name}</Text>
                <Text style={styles.studentStop}>{s.stop}</Text>
              </View>
            ))}
          </View>
        )}

        {/* ── Submit & Close ── */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitBtnText}>Submit & Close Trip</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  card: {
    margin: 16, backgroundColor: COLORS.card,
    borderWidth: 0.5, borderColor: COLORS.border, borderRadius: 16, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 12, color: COLORS.muted },
  infoValue: { fontSize: 13, color: COLORS.text, fontWeight: '600' },
  section: { marginHorizontal: 16, marginTop: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  studentRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
    gap: 10,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  studentName: { fontSize: 13, color: COLORS.text, flex: 1 },
  studentStop: { fontSize: 11, color: COLORS.muted },
  submitBtn: {
    backgroundColor: COLORS.accent, borderRadius: 14, paddingVertical: 16,
    marginHorizontal: 16, marginTop: 20, alignItems: 'center',
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
