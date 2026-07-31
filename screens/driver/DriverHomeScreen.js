import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { useNotifications } from '../../context/NotificationContext';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';
import { routes, COLORS } from '../../dummyData';
import LogoIcon from '../../components/AppLogo';
import SectionTitle from '../../components/SectionTitle';
import AvatarCircle from '../../components/AvatarCircle';

function getInitials(name) {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function PulsingDot() {
  const scale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.5, duration: 700, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1,   duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [scale]);
  return (
    <Animated.View style={{
      width: 8, height: 8, borderRadius: 4,
      backgroundColor: COLORS.success,
      transform: [{ scale }], marginRight: 6,
    }} />
  );
}

export default function DriverHomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { startTrip, activeTrip } = useTrip();
  const { unreadCount, addNotification } = useNotifications();

  const [startingTrip, setStartingTrip] = useState(false);
  const [absentStudents, setAbsentStudents] = useState([]);

  // Fix 8 — Pulse animation for bell icon when unread
  const bellPulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (unreadCount > 0) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(bellPulse, { toValue: 0.6, duration: 750, useNativeDriver: true }),
          Animated.timing(bellPulse, { toValue: 1, duration: 750, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      bellPulse.setValue(1);
    }
  }, [unreadCount]);

  const assignedRoute = currentUser?.assignedRoute || currentUser?.route;
  const driverRoute   = routes.find(r => r.name === assignedRoute);
  const currentStopIndex = 1;

  // Bug 3 fix — real-time absent students (filter client-side to avoid composite index)
  useEffect(() => {
    if (!currentUser?.institutionId || !assignedRoute) return;
    const q = query(
      collection(db, 'users'),
      where('institutionId', '==', currentUser.institutionId),
      where('route',         '==', assignedRoute),
      where('role',          '==', 'student')
    );
    const unsub = onSnapshot(q, snap => {
      // Filter absentToday in JS — no composite index needed
      const absent = snap.docs
        .map(d => ({ uid: d.id, ...d.data() }))
        .filter(s => s.absentToday === true);
      setAbsentStudents(absent);
    }, err => {
      console.log('[DriverHome] absent listener error:', err);
      alert('Something went wrong. Please check your internet connection.');
    });
    return () => unsub();
  }, [currentUser?.institutionId, assignedRoute]);

  // Bug 1 — write trip document to Firestore
  const handleStartTrip = async () => {
    if (startingTrip) return;
    setStartingTrip(true);
    try {
      const otp = String(Math.floor(Math.random() * 9000) + 1000);
      const docRef = await addDoc(collection(db, 'trips'), {
        driverId:        auth.currentUser.uid,
        driverName:      currentUser.name,
        routeId:         assignedRoute,
        vehicleId:       currentUser.assignedBus || currentUser.bus || 'N/A',
        institutionId:   currentUser.institutionId,
        otp,
        otpGeneratedAt:  serverTimestamp(),
        active:          true,
        boardedCount:    0,
        boardedStudents: [],
        startTime:       serverTimestamp(),
      });
      startTrip(
        {
          routeId:    assignedRoute,
          driverName: currentUser.name,
          bus:        currentUser.assignedBus || currentUser.bus,
          label:      driverRoute?.label || assignedRoute,
          stops:      driverRoute?.stops || [],
          otp,
          active:     true,
        },
        docRef.id
      );
      // Fix 5 — Auto notification on trip start
      addNotification({
        title: 'Trip Started',
        message: `You have started ${assignedRoute} (${driverRoute?.label || assignedRoute}).`,
        type: 'trip',
      });

      navigation.navigate('DriverOTP');
    } catch (err) {
      console.log('[DriverHome] start trip error:', err);
      alert('Failed to start trip. Please check your internet connection.');
    } finally {
      setStartingTrip(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <LogoIcon size={36} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.topBarTitle}>FleetSync</Text>
          <Text style={styles.topBarSub}>Driver Portal</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn} onPress={() => navigation.navigate('Notifications')}>
          <Animated.View style={{ opacity: bellPulse }}>
            <Ionicons
              name={unreadCount > 0 ? 'notifications' : 'notifications-outline'}
              size={24}
              color={unreadCount > 0 ? COLORS.accent : COLORS.text}
            />
          </Animated.View>
          {unreadCount > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>👋 Welcome, {currentUser?.name}</Text>

        <View style={styles.assignCard}>
          <View style={styles.assignHeader}>
            <View style={styles.assignIconWrap}>
              <Ionicons name="bus-outline" size={18} color={COLORS.accent} />
            </View>
            <Text style={styles.assignLabel}>Today's Assignment</Text>
          </View>
          {driverRoute ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Text style={styles.routeName}>{driverRoute.label}</Text>
                {activeTrip && (
                  <View style={styles.liveBadge}>
                    <View style={styles.liveGreenDot} />
                    <Text style={styles.liveGpsText}>Live</Text>
                  </View>
                )}
              </View>
              <Text style={styles.routeSub}>🚌 {currentUser?.assignedBus || currentUser?.bus}</Text>
              <Text style={[styles.routeSub, { color: COLORS.success }]}>
                🕖 Departure: {driverRoute.stops[0]?.time}
              </Text>
            </>
          ) : (
            <Text style={styles.routeSub}>No route assigned today</Text>
          )}
        </View>

        {/* Absent Today — Firestore live */}
        <View style={styles.section}>
          <SectionTitle title="Absent Today" />
          {absentStudents.length === 0 ? (
            <View style={styles.allGoodBox}>
              <Text style={styles.allGoodText}>✅ All students expected today</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 4 }}>
              {absentStudents.map(s => (
                <View key={s.uid} style={styles.absentChip}>
                  <AvatarCircle
                    initials={getInitials(s.name)}
                    size={44}
                    bgColor={COLORS.avatarBg}
                    textColor={COLORS.accent}
                    borderColor={COLORS.danger}
                  />
                  <Text style={styles.absentName} numberOfLines={1}>
                    {(s.name || '').split(' ')[0]}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Upcoming Stops */}
        {driverRoute && (
          <View style={styles.section}>
            <SectionTitle title="Upcoming Stops" />
            <View style={styles.timeline}>
              {driverRoute.stops.map((stop, idx) => {
                const isDone    = idx < currentStopIndex;
                const isCurrent = idx === currentStopIndex;
                return (
                  <View key={idx} style={styles.timelineRow}>
                    <View style={styles.dotCol}>
                      {idx > 0 && <View style={[styles.line, { backgroundColor: isDone ? COLORS.success : COLORS.border }]} />}
                      {isCurrent ? <PulsingDot /> : (
                        <View style={[styles.dot, {
                          backgroundColor: isDone ? COLORS.success : COLORS.avatarBg,
                          borderColor:     isDone ? COLORS.success : COLORS.border,
                        }]} />
                      )}
                    </View>
                    <View style={styles.stopInfo}>
                      <Text style={[styles.stopName, isCurrent && { color: COLORS.accent, fontWeight: '600' }]}>
                        {stop.name}{isCurrent ? '  ← Current' : ''}
                      </Text>
                      <Text style={styles.stopTime}>{stop.time}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.startBtn, startingTrip && { opacity: 0.7 }]}
          onPress={handleStartTrip}
          activeOpacity={0.85}
          disabled={startingTrip}
        >
          {startingTrip
            ? <ActivityIndicator color="#fff" size="small" />
            : <><Text style={styles.startBtnText}>Start Trip</Text><Ionicons name="arrow-forward" size={18} color="#fff" /></>
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.cardAlt,
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  topBarTitle: { color: COLORS.accent, fontSize: 14, fontWeight: '700' },
  topBarSub:   { color: COLORS.muted, fontSize: 10, marginTop: 1 },
  bellBtn:   { padding: 4, position: 'relative' },
  bellBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#f87171', width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  bellBadgeText: { fontSize: 10, fontWeight: 'bold', color: '#fff' },
  greeting: { fontSize: 18, fontWeight: '500', color: COLORS.text, padding: 16, paddingBottom: 8 },
  assignCard: {
    margin: 16, marginTop: 8,
    backgroundColor: COLORS.card,
    borderWidth: 0.5, borderColor: COLORS.border,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 8, elevation: 3,
  },
  assignHeader:  { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  assignIconWrap: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: COLORS.accentBg,
    alignItems: 'center', justifyContent: 'center', marginRight: 8,
  },
  assignLabel: { color: COLORS.muted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  routeName:   { fontSize: 15, fontWeight: '600', color: COLORS.text },
  routeSub:    { fontSize: 13, color: COLORS.muted, marginTop: 4 },
  liveBadge: {
    flexDirection: 'row', alignItems: 'center',
    marginLeft: 10, backgroundColor: COLORS.successBg,
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
  },
  liveGreenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  liveGpsText:  { fontSize: 10, color: COLORS.success, marginLeft: 4, fontWeight: '600' },
  section:      { marginHorizontal: 16, marginTop: 20 },
  allGoodBox:   { backgroundColor: COLORS.successBg, borderRadius: 10, padding: 12, alignItems: 'center' },
  allGoodText:  { color: COLORS.success, fontSize: 12 },
  absentChip:   { alignItems: 'center', marginRight: 14 },
  absentName:   { color: COLORS.muted, fontSize: 9, marginTop: 4, maxWidth: 44 },
  timeline:     { marginTop: 6 },
  timelineRow:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  dotCol:       { width: 24, alignItems: 'center' },
  line:         { width: 2, height: 20, marginBottom: 2 },
  dot:          { width: 12, height: 12, borderRadius: 6, borderWidth: 1.5 },
  stopInfo:     { marginLeft: 10, flex: 1, paddingBottom: 16 },
  stopName:     { fontSize: 13, color: COLORS.text },
  stopTime:     { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  startBtn: {
    backgroundColor: COLORS.accent, borderRadius: 14,
    paddingVertical: 16, marginHorizontal: 16, marginTop: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
