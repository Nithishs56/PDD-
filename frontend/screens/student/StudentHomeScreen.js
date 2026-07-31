import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Linking, Animated,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { useNotifications } from '../../context/NotificationContext';
import { db, auth, rtdb } from '../../firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, onValue, off } from 'firebase/database';
import { routes, COLORS } from '../../dummyData';
import LogoIcon from '../../components/AppLogo';

// Tambaram — static fallback when no trip active
const TAMBARAM = { latitude: 12.9249, longitude: 80.1000 };

export default function StudentHomeScreen() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { activeTrip } = useTrip();
  const { unreadCount, addNotification } = useNotifications();

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

  const [showAbsentModal, setShowAbsentModal] = useState(false);
  // Fix 5: local absent/boarded state driven by Firestore writes
  const [isAbsent,  setIsAbsent]  = useState(false);
  const [isBoarded, setIsBoarded] = useState(false);

  const studentRoute   = routes.find(r => r.name === currentUser?.route);
  const driverForRoute = studentRoute?.driver || 'N/A';
  const driverPhone    = '+91 98765 43210';
  const routeCoords    = studentRoute?.stops?.map(s => ({ latitude: s.latitude, longitude: s.longitude })) || [];

  // Student's stop coordinates for fallback map center
  const studentStop = studentRoute?.stops?.find(s => s.name === currentUser?.stop);
  const studentStopCoord = studentStop
    ? { latitude: studentStop.latitude, longitude: studentStop.longitude }
    : TAMBARAM;

  // ── Fix 3: Real bus location from Firebase Realtime Database ─────────────
  const [liveBusLocation, setLiveBusLocation] = useState(null);
  const miniMapRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.institutionId || !currentUser?.route) return;

    const locationRef = ref(rtdb,
      `liveLocation/${currentUser.institutionId}/${currentUser.route}`
    );

    const unsubscribe = onValue(locationRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data.isActive && data.latitude && data.longitude) {
          setLiveBusLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            heading: data.heading,
            isActive: data.isActive,
            driverName: data.driverName,
            busNumber: data.busNumber,
          });
        } else {
          setLiveBusLocation(null);
        }
      } else {
        setLiveBusLocation(null);
      }
    });

    return () => off(locationRef);
  }, [currentUser?.institutionId, currentUser?.route]);

  const busCoord = liveBusLocation
    ? { latitude: liveBusLocation.latitude, longitude: liveBusLocation.longitude }
    : studentStopCoord;

  const hasLiveLocation = liveBusLocation !== null;

  const infoRows = [
    { label: 'Route',        value: `${currentUser?.route} · ${studentRoute?.label || ''}` },
    { label: 'Bus Number',   value: liveBusLocation?.busNumber || studentRoute?.bus || 'N/A' },
    { label: 'Driver Name',  value: liveBusLocation?.driverName || driverForRoute },
    { label: 'Phone',        value: driverPhone, touchable: true },
    { label: 'Your Stop',    value: currentUser?.stop },
    { label: 'Pickup Time',  value: studentRoute?.stops?.find(s => s.name === currentUser?.stop)?.time || 'N/A' },
    { label: 'ETA to College', value: '8:00 AM', color: COLORS.success },
  ];

  // Bug 3 fix — write absentToday + absentMarkedAt to Firestore
  const confirmAbsent = async () => {
    setShowAbsentModal(false);
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        absentToday:     true,
        absentMarkedAt:  serverTimestamp(),
      });
      setIsAbsent(true);
      // Fix 5 — Auto notification on absent
      addNotification({
        title: 'Absence Marked',
        message: `You have marked yourself absent today for ${currentUser?.route || 'your route'}.`,
        type: 'warning',
      });
    } catch (err) {
      console.log('[StudentHome] confirmAbsent error:', err);
      alert('Something went wrong. Please check your internet connection.');
    }
  };

  // Bug 3 fix — clear absentToday in Firestore on undo
  const handleUndoAbsence = async () => {
    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        absentToday:    false,
        absentMarkedAt: null,
      });
      setIsAbsent(false);
    } catch (err) {
      console.log('[StudentHome] undoAbsence error:', err);
      alert('Something went wrong. Please check your internet connection.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <LogoIcon size={36} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.topBarTitle}>FleetSync</Text>
          <Text style={styles.topBarSub}>Student Portal</Text>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── Greeting ── */}
        <Text style={styles.greeting}>
          👋 Good Morning, {currentUser?.name?.split(' ')[0]}
        </Text>

        {/* ── Banners ── */}
        {isBoarded ? (
          <View style={[styles.notifBanner, { backgroundColor: COLORS.successBg, borderLeftColor: COLORS.success }]}>
            <Text style={[styles.notifText, { color: COLORS.success }]}>
              ✅ You have successfully boarded the bus today!
            </Text>
          </View>
        ) : isAbsent ? (
          <View style={styles.absentBanner}>
            <Text style={styles.absentBannerText}>
              ❌ You have marked yourself absent today. Your driver has been notified.
            </Text>
            <TouchableOpacity onPress={handleUndoAbsence}>
              <Text style={styles.undoText}>Undo Absence</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.notifBanner}>
            <Text style={styles.notifText}>🚌 Your bus is 10 mins away — Head to your stop now</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.accent} />
          </View>
        )}

        {/* ── Today Bus Info card ── */}
        <View style={styles.busCard}>
          <View style={styles.busCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="bus-outline" size={14} color={COLORS.muted} />
              <Text style={styles.busCardTitle}>Today Bus Info</Text>
            </View>
            <View style={styles.liveDot}>
              <View style={[styles.liveDotInner, { backgroundColor: hasLiveLocation ? COLORS.success : COLORS.muted }]} />
              <Text style={[styles.liveText, { color: hasLiveLocation ? COLORS.success : COLORS.muted }]}>
                {hasLiveLocation ? 'Live' : 'Offline'}
              </Text>
            </View>
          </View>
          {infoRows.map((row, i) => (
            <View
              key={row.label}
              style={[styles.infoRow, i === infoRows.length - 1 && { borderBottomWidth: 0 }]}
            >
              <Text style={styles.infoLabel}>{row.label}</Text>
              {row.touchable ? (
                <TouchableOpacity onPress={() => Linking.openURL(`tel:${row.value.replace(/\s/g, '')}`)}>
                  <Text style={[styles.infoValue, { color: COLORS.accent }]}>{row.value}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={[styles.infoValue, row.color && { color: row.color }]}>{row.value}</Text>
              )}
            </View>
          ))}
        </View>

        {/* ── Fix 3: Mini map with real RTDB location ── */}
        <View style={[styles.miniMapWrap, !hasLiveLocation && { opacity: 0.5 }]}>
          <MapView
            ref={miniMapRef}
            style={styles.miniMap}
            scrollEnabled={false}
            zoomEnabled={false}
            initialRegion={{
              latitude: studentStopCoord.latitude,
              longitude: studentStopCoord.longitude,
              latitudeDelta: 0.12,
              longitudeDelta: 0.12,
            }}
          >
            {routeCoords.length >= 2 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor={COLORS.accent}
                strokeWidth={2}
                lineDashPattern={[8, 4]}
              />
            )}
            <Marker coordinate={busCoord} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={[styles.miniBusMarker, !hasLiveLocation && { opacity: 0.5 }]}>
                <Text style={styles.miniBusEmoji}>🚌</Text>
              </View>
            </Marker>
          </MapView>
          {!hasLiveLocation && (
            <View style={styles.waitingOverlay}>
              <Text style={styles.waitingText}>Waiting for driver to start</Text>
            </View>
          )}
        </View>

        {/* ── Action buttons ── */}
        {!isAbsent && !isBoarded && (
          <>
            <TouchableOpacity
              style={styles.absentBtn}
              onPress={() => setShowAbsentModal(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.absentBtnText}>Mark Absent Today</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.boardBtn}
              onPress={() => navigation.navigate('StudentBoard')}
              activeOpacity={0.85}
            >
              <Text style={styles.boardBtnText}>Board Bus</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </>
        )}

      </ScrollView>

      {/* ── Absent confirmation bottom sheet ── */}
      <Modal
        visible={showAbsentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAbsentModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAbsentModal(false)}
        >
          <View style={styles.bottomSheet} onStartShouldSetResponder={() => true}>
            <View style={styles.handle} />
            <View style={styles.warningIcon}>
              <Ionicons name="warning-outline" size={28} color={COLORS.danger} />
            </View>
            <Text style={styles.sheetTitle}>Are you sure?</Text>
            <Text style={styles.sheetSub}>
              This will notify your driver and admin about your absence today.
            </Text>
            <View style={styles.sheetBtns}>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnCancel]}
                onPress={() => setShowAbsentModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.sheetBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sheetBtn, styles.sheetBtnConfirm]}
                onPress={confirmAbsent}
                activeOpacity={0.8}
              >
                <Text style={styles.sheetBtnConfirmText}>Confirm Absent</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  bellBtn:     { padding: 4, position: 'relative' },
  bellBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#f87171', width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
  },
  bellBadgeText: { fontSize: 10, fontWeight: 'bold', color: '#fff' },
  greeting:    { fontSize: 16, fontWeight: '500', color: COLORS.text, padding: 16, paddingBottom: 8 },
  notifBanner: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.accentBg,
    borderLeftWidth: 3, borderLeftColor: COLORS.accent,
    borderRadius: 10, marginHorizontal: 16, marginBottom: 12,
    padding: 14, gap: 8,
  },
  notifText:         { color: COLORS.text, fontSize: 13, flex: 1, lineHeight: 18 },
  absentBanner:      { backgroundColor: COLORS.dangerBg, borderRadius: 12, marginHorizontal: 16, marginBottom: 12, padding: 14 },
  absentBannerText:  { color: COLORS.danger, fontSize: 13, lineHeight: 18 },
  undoText:          { color: COLORS.muted, fontSize: 12, marginTop: 8 },
  busCard: {
    marginHorizontal: 16, backgroundColor: COLORS.card,
    borderWidth: 0.5, borderColor: COLORS.border, borderRadius: 16, overflow: 'hidden',
  },
  busCardHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 12, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  busCardTitle:  { fontSize: 12, color: COLORS.muted, fontWeight: '500' },
  liveDot:       { flexDirection: 'row', alignItems: 'center', gap: 4 },
  liveDotInner:  { width: 7, height: 7, borderRadius: 3.5, backgroundColor: COLORS.success },
  liveText:      { fontSize: 11, color: COLORS.success, fontWeight: '600' },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 11, color: COLORS.muted },
  infoValue: { fontSize: 12, color: COLORS.text, fontWeight: '500', textAlign: 'right', flex: 1, marginLeft: 12 },
  miniMapWrap: {
    marginHorizontal: 16, marginTop: 12,
    borderRadius: 14, overflow: 'hidden', height: 140, position: 'relative',
  },
  miniMap:       { width: '100%', height: '100%' },
  miniBusMarker: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.accent, borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  miniBusEmoji:   { fontSize: 13 },
  waitingOverlay: { position: 'absolute', bottom: 8, left: 0, right: 0, alignItems: 'center' },
  waitingText:    { fontSize: 11, color: '#6b7280' },
  absentBtn: {
    marginHorizontal: 16, marginTop: 14,
    borderWidth: 1, borderColor: COLORS.danger, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  absentBtnText: { color: COLORS.danger, fontSize: 14, fontWeight: '500' },
  boardBtn: {
    marginHorizontal: 16, marginTop: 10,
    backgroundColor: COLORS.accent, borderRadius: 14, height: 56,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  boardBtnText:         { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay:         { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 28, paddingBottom: 40, alignItems: 'center',
  },
  handle:      { width: 36, height: 4, borderRadius: 2, backgroundColor: COLORS.border, marginBottom: 20 },
  warningIcon: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.dangerBg,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  sheetTitle:          { fontSize: 18, fontWeight: '500', color: COLORS.text, textAlign: 'center' },
  sheetSub:            { fontSize: 13, color: COLORS.muted, textAlign: 'center', marginTop: 8, lineHeight: 18 },
  sheetBtns:           { flexDirection: 'row', gap: 12, marginTop: 24, width: '100%' },
  sheetBtn:            { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  sheetBtnCancel:      { backgroundColor: COLORS.bg, borderWidth: 0.5, borderColor: COLORS.border },
  sheetBtnCancelText:  { color: COLORS.text, fontWeight: '500' },
  sheetBtnConfirm:     { backgroundColor: COLORS.danger },
  sheetBtnConfirmText: { color: '#fff', fontWeight: '600' },
});
