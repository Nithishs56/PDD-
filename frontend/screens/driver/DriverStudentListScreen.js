import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { COLORS } from '../../dummyData';
import Badge from '../../components/Badge';
import AvatarCircle from '../../components/AvatarCircle';
import EmptyState from '../../components/EmptyState';

function getInitials(name) {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function DriverStudentListScreen() {
  const { currentUser } = useAuth();
  const { boardedStudents } = useTrip();  // array of student UIDs from Firestore

  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');

  const assignedRoute = currentUser?.assignedRoute || currentUser?.route;

  // Bug 2 fix — real-time Firestore listener on users collection
  useEffect(() => {
    if (!currentUser?.institutionId || !assignedRoute) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users'),
      where('institutionId', '==', currentUser.institutionId),
      where('route',         '==', assignedRoute),
      where('role',          '==', 'student')
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
      setStudents(list);
      setLoading(false);
    }, (err) => {
      console.log('[StudentList] listener error:', err);
      alert('Something went wrong. Please check your internet connection.');
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser?.institutionId, assignedRoute]);

  const filtered = students.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.stop || '').toLowerCase().includes(search.toLowerCase())
  );

  // Fix 4 — status determined from Firestore boardedStudents (UIDs) + absentToday field
  const getStatus = (student) => {
    if (boardedStudents.includes(student.uid)) return 'boarded';
    if (student.absentToday === true)          return 'absent';
    return 'not_yet';
  };

  const badgeType  = (s) => ({ boarded: 'success', absent: 'danger', not_yet: 'muted' }[s]);
  const badgeLabel = (s) => ({ boarded: 'Boarded', absent: 'Absent', not_yet: 'Not Yet' }[s]);

  const renderItem = ({ item }) => {
    const status = getStatus(item);
    return (
      <View style={styles.row}>
        <AvatarCircle initials={getInitials(item.name)} size={40} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.stop}>
            {item.stop}{item.rollNumber ? ` · Roll: ${item.rollNumber}` : ''}
          </Text>
        </View>
        <Badge text={badgeLabel(status)} type={badgeType(status)} />
      </View>
    );
  };

  const boardedCount = filtered.filter(s => boardedStudents.includes(s.uid)).length;
  const absentCount  = filtered.filter(s => s.absentToday === true).length;
  const notYetCount  = filtered.length - boardedCount - absentCount;

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator color={COLORS.accent} size="large" />
        <Text style={{ color: '#6b7280', marginTop: 12, fontSize: 14 }}>Loading students…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Student List</Text>
        <Text style={styles.sub}>{assignedRoute} · {students.length} students</Text>
      </View>

      {/* Live count strip */}
      <View style={styles.countStrip}>
        <View style={styles.countItem}>
          <Text style={[styles.countNum, { color: COLORS.success }]}>{boardedCount}</Text>
          <Text style={styles.countLabel}>Boarded</Text>
        </View>
        <View style={styles.countDivider} />
        <View style={styles.countItem}>
          <Text style={[styles.countNum, { color: COLORS.danger }]}>{absentCount}</Text>
          <Text style={styles.countLabel}>Absent</Text>
        </View>
        <View style={styles.countDivider} />
        <View style={styles.countItem}>
          <Text style={[styles.countNum, { color: COLORS.muted }]}>{notYetCount}</Text>
          <Text style={styles.countLabel}>Not Yet</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search by name or stop…"
          placeholderTextColor={COLORS.muted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.uid || String(item.id)}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: COLORS.border, marginLeft: 68 }} />}
        ListEmptyComponent={<EmptyState message="No students found" icon="people-outline" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.cardAlt, paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  sub:   { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  countStrip: {
    flexDirection: 'row', backgroundColor: COLORS.card,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  countItem:    { flex: 1, alignItems: 'center', paddingVertical: 12 },
  countNum:     { fontSize: 22, fontWeight: '700' },
  countLabel:   { fontSize: 10, color: COLORS.muted, marginTop: 2 },
  countDivider: { width: 0.5, backgroundColor: COLORS.border },
  searchWrap:   { margin: 16 },
  search: {
    backgroundColor: COLORS.card, borderRadius: 10, padding: 12,
    color: COLORS.text, fontSize: 14, borderWidth: 0.5, borderColor: COLORS.border, flex: 1,
  },
  row: {
    flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: COLORS.card,
  },
  name: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  stop: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
});
