import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { tripHistory, absentHistory, COLORS } from '../../dummyData';

export default function StudentHistoryScreen() {
  const { currentUser } = useAuth();
  const [selected, setSelected] = useState(null);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderTrip = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => setSelected(item)} activeOpacity={0.75}>
      {/* Date column */}
      <View style={styles.dateCol}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        <Text style={styles.dayText}>{item.day}</Text>
      </View>

      {/* Route info */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.routeText}>{item.route}</Text>
        <Text style={styles.stopText}>{item.stop}</Text>
      </View>

      {/* Status badge */}
      <View style={[
        styles.badge,
        item.status === 'boarded' ? styles.badgeBoarded : styles.badgeAbsent,
      ]}>
        <Text style={[
          styles.badgeText,
          { color: item.status === 'boarded' ? COLORS.success : COLORS.danger },
        ]}>
          {item.status === 'boarded' ? 'Boarded' : 'Absent'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  /* ── Footer: absence history ── */
  const ListFooter = () => (
    <View style={styles.absenceSection}>
      <Text style={styles.sectionTitle}>Pre-Marked Absences</Text>
      {absentHistory.map(a => (
        <View key={a.id} style={styles.absRow}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.danger} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.absDate}>{formatDate(a.date)}</Text>
            <Text style={styles.absDay}>{a.day}</Text>
          </View>
          <View style={[styles.badge, styles.badgeAbsent]}>
            <Text style={[styles.badgeText, { color: COLORS.danger }]}>Pre-Marked</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trip History</Text>
        <Text style={styles.headerSub}>{tripHistory.length} trips recorded</Text>
      </View>

      <FlatList
        data={tripHistory}
        keyExtractor={item => String(item.id)}
        renderItem={renderTrip}
        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: COLORS.border }} />}
        ListFooterComponent={<ListFooter />}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
      />

      {/* ── Detail bottom sheet modal ── */}
      <Modal
        visible={!!selected}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setSelected(null)}
        >
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            {/* Close X */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setSelected(null)}>
              <Ionicons name="close" size={20} color={COLORS.muted} />
            </TouchableOpacity>
            <View style={styles.handle} />

            {/* Status badge centred */}
            {selected && (
              <View style={[
                styles.sheetBadge,
                { backgroundColor: selected.status === 'boarded' ? COLORS.successBg : COLORS.dangerBg },
              ]}>
                <Text style={{ color: selected.status === 'boarded' ? COLORS.success : COLORS.danger, fontSize: 13, fontWeight: '600' }}>
                  {selected.status === 'boarded' ? '✓ Boarded' : '✗ Absent'}
                </Text>
              </View>
            )}

            <Text style={styles.sheetTitle}>Trip Details</Text>
            {selected && [
              { label: 'Date',          value: `${formatDate(selected.date)} · ${selected.day}` },
              { label: 'Route',         value: selected.route },
              { label: 'Stop',          value: selected.stop },
              { label: 'Boarding Time', value: selected.boardingTime },
              { label: 'Bus Number',    value: selected.bus },
              { label: 'Driver',        value: selected.driver },
            ].map((r, i, arr) => (
              <View
                key={r.label}
                style={[styles.detailRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}
              >
                <Text style={styles.detailLabel}>{r.label}</Text>
                <Text style={styles.detailValue}>{r.value}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.cardAlt, paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  headerSub:   { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, paddingHorizontal: 14, paddingVertical: 14,
  },
  dateCol: { width: 70 },
  dateText:  { fontSize: 12, fontWeight: '500', color: COLORS.text },
  dayText:   { fontSize: 10, color: COLORS.muted, marginTop: 2 },
  routeText: { fontSize: 12, fontWeight: '500', color: COLORS.text },
  stopText:  { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeBoarded: { backgroundColor: COLORS.successBg },
  badgeAbsent:  { backgroundColor: COLORS.dangerBg },
  badgeText: { fontSize: 10, fontWeight: '600' },

  /* Absence section */
  absenceSection: { margin: 16 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 12, marginTop: 8 },
  absRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  absDate: { fontSize: 12, color: COLORS.text, fontWeight: '500' },
  absDay:  { fontSize: 10, color: COLORS.muted, marginTop: 2 },

  /* Modal */
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
  },
  closeBtn: { position: 'absolute', top: 16, right: 20, padding: 4 },
  handle: {
    width: 36, height: 4, borderRadius: 2, backgroundColor: COLORS.border,
    alignSelf: 'center', marginBottom: 16,
  },
  sheetBadge: { alignSelf: 'center', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 5, marginBottom: 10 },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 14 },
  detailRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  detailLabel: { fontSize: 12, color: COLORS.muted },
  detailValue: { fontSize: 13, color: COLORS.text, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 16 },
});
