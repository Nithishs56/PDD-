import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { routes, COLORS } from '../../dummyData';
import AvatarCircle from '../../components/AvatarCircle';

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function StudentProfileScreen() {
  const { currentUser, logout } = useAuth();
  const studentRoute = routes.find(r => r.name === currentUser.route);

  const infoRows = [
    { label: 'Roll Number',    value: currentUser.roll },
    { label: 'College',        value: currentUser.institution || 'Chennai Institute of Technology' },
    { label: 'Assigned Route', value: `${currentUser.route} · ${studentRoute?.label || ''}` },
    { label: 'Assigned Bus',   value: studentRoute?.bus || 'N/A' },
    { label: 'Boarding Stop',  value: currentUser.stop },
    { label: 'Parent Phone',   value: currentUser.parentPhone },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── Avatar section ── */}
        <View style={styles.avatarSection}>
          <AvatarCircle initials={getInitials(currentUser.name)} size={72} textColor={COLORS.accent} />
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>Student</Text>
          </View>
        </View>

        {/* ── Info card ── */}
        <View style={styles.infoCard}>
          {infoRows.map((row, i) => (
            <View key={row.label} style={[styles.infoRow, i === infoRows.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue} numberOfLines={2}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  avatarSection: {
    alignItems: 'center', paddingTop: 40, paddingBottom: 24,
    backgroundColor: COLORS.card,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  name: { fontSize: 18, fontWeight: '500', color: COLORS.text, marginTop: 12, textAlign: 'center' },
  email: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  roleBadge: {
    backgroundColor: COLORS.accentBg, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 4, marginTop: 8,
  },
  roleText: { color: COLORS.accent, fontSize: 12 },
  infoCard: {
    margin: 16, backgroundColor: COLORS.card,
    borderWidth: 0.5, borderColor: COLORS.border, borderRadius: 14, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 12, color: COLORS.muted, flex: 1 },
  infoValue: { fontSize: 13, color: COLORS.text, fontWeight: '500', textAlign: 'right', flex: 2, marginLeft: 12 },

  logoutBtn: {
    marginHorizontal: 16,
    borderWidth: 1, borderColor: COLORS.danger,
    borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', alignSelf: 'stretch',
  },
  logoutText: { color: COLORS.danger, fontSize: 15 },
});
