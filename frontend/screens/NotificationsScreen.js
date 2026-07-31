import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';

const COLORS = {
  bg: '#080a0f',
  card: '#111318',
  border: '#1e2235',
  accent: '#7c8ff7',
  text: '#e2e8f0',
  muted: '#6b7280',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
};

// Type → icon emoji + circle color
const TYPE_CONFIG = {
  success: { emoji: '✅', bg: '#0d2e1f', color: COLORS.success },
  trip:    { emoji: '🚌', bg: '#1f2340', color: COLORS.accent },
  warning: { emoji: '⚠️', bg: '#3b2e0a', color: COLORS.warning },
  danger:  { emoji: '🚫', bg: '#3f1f1f', color: COLORS.danger },
  info:    { emoji: 'ℹ️', bg: '#1f2340', color: COLORS.accent },
};

// Default dummy notifications based on role
function getDefaultNotifications(role) {
  if (role === 'driver') {
    return [
      {
        id: 'default_d1',
        title: 'Student Absent',
        message: 'Ravi Kumar has marked absent today for Route 1',
        time: '10 mins ago',
        type: 'warning',
        isRead: false,
        createdAt: Date.now() - 600000,
      },
      {
        id: 'default_d2',
        title: 'Fraud Attempt Blocked',
        message: 'Unauthorized boarding attempt by Kiran S at Chromepet blocked',
        time: '30 mins ago',
        type: 'danger',
        isRead: false,
        createdAt: Date.now() - 1800000,
      },
      {
        id: 'default_d3',
        title: 'Trip Summary Due',
        message: 'Please submit your trip summary for today',
        time: '1 hour ago',
        type: 'info',
        isRead: true,
        createdAt: Date.now() - 3600000,
      },
    ];
  }
  // student
  return [
    {
      id: 'default_s1',
      title: 'Trip Started',
      message: 'Your bus Route 1 has started. Driver Rajan Kumar is on the way',
      time: '2 mins ago',
      type: 'trip',
      isRead: false,
      createdAt: Date.now() - 120000,
    },
    {
      id: 'default_s2',
      title: 'Boarding Confirmed',
      message: 'You successfully boarded bus TN01AB1234 at Tambaram',
      time: '1 hour ago',
      type: 'success',
      isRead: true,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'default_s3',
      title: 'Bus Arriving Soon',
      message: 'Your bus will reach Tambaram in 5 minutes',
      time: '3 hours ago',
      type: 'warning',
      isRead: true,
      createdAt: Date.now() - 10800000,
    },
  ];
}

function NotificationRow({ item, onPress }) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      {/* Colored circle icon */}
      <View style={[styles.iconCircle, { backgroundColor: config.bg }]}>
        <Text style={styles.iconEmoji}>{config.emoji}</Text>
      </View>

      {/* Content */}
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.rowMessage} numberOfLines={2}>{item.message}</Text>
        <Text style={styles.rowTime}>{item.time}</Text>
      </View>

      {/* Unread blue dot */}
      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { notifications, setNotifications, markAllRead, markOneRead } = useNotifications();

  // Seed defaults on first visit if empty
  React.useEffect(() => {
    if (notifications.length === 0) {
      const defaults = getDefaultNotifications(currentUser?.role || 'student');
      setNotifications(defaults);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationRow item={item} onPress={markOneRead} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyText}>No notifications yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: '#0a0c12',
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  backBtn:     { padding: 4 },
  topTitle:    { fontSize: 16, fontWeight: '600', color: COLORS.text },
  markAllText: { fontSize: 12, color: COLORS.accent, fontWeight: '500' },

  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    padding: 16,
    position: 'relative',
  },
  iconCircle: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 18 },
  rowContent: { flex: 1, marginLeft: 12 },
  rowTitle:   { fontSize: 13, fontWeight: '600', color: COLORS.text },
  rowMessage: { fontSize: 12, color: COLORS.muted, marginTop: 3, lineHeight: 17 },
  rowTime:    { fontSize: 11, color: COLORS.muted, marginTop: 4 },
  unreadDot: {
    position: 'absolute', top: 16, right: 16,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.accent,
  },

  emptyWrap: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 14, color: COLORS.muted, marginTop: 12 },
});
