import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { db, rtdb } from '../../firebase';
import { doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { routes, COLORS } from '../../dummyData';
import SectionTitle from '../../components/SectionTitle';
import AvatarCircle from '../../components/AvatarCircle';

function getInitials(name) {
  if (!name) return '??';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function PulsingDot() {
  const opacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);
  return <Animated.View style={[styles.pulsingDot, { opacity }]} />;
}

export default function DriverOTPScreen() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();
  const { activeTripId, syncTripFromFirestore, endTrip, busLocation, setBusLocation, setActiveTrip } = useTrip();

  // Local state synced from Firestore
  const [otp, setOtp] = useState('----');
  const [boardedStudents, setBoardedStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [countdown, setCountdown] = useState(120);

  // GPS warning state
  const [gpsWarning, setGpsWarning] = useState(null); // { message, color }

  const borderAnim = useRef(new Animated.Value(0)).current;
  const timerRef   = useRef(null);
  const mapRef     = useRef(null);
  const locationSubscription = useRef(null);

  const assignedRoute = currentUser?.assignedRoute || currentUser?.route;
  const driverRoute   = routes.find(r => r.name === assignedRoute);
  const routeCoords   = driverRoute?.stops?.map(s => ({ latitude: s.latitude, longitude: s.longitude })) || [];
  const mapCenter     = busLocation
    ? { latitude: busLocation.latitude, longitude: busLocation.longitude }
    : (routeCoords[0] || { latitude: 13.0067, longitude: 80.2206 });

  // ── Fix 1: Start real GPS location tracking ──────────────────────────────
  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Required',
        'FleetSync needs your location to share live bus position with students. Please enable location in your device settings.',
        [{ text: 'OK' }]
      );
      setGpsWarning({ message: '⚠ Location permission denied. Students cannot see bus location.', color: '#f87171' });
      return;
    }

    setGpsWarning(null);

    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude, heading, speed } = location.coords;

          // Update the driver's map via TripContext
          setBusLocation({ latitude, longitude, heading: heading || 0 });

          const locationRef = ref(rtdb,
            `liveLocation/${currentUser.institutionId}/${assignedRoute}`
          );
          set(locationRef, {
            latitude,
            longitude,
            heading: heading || 0,
            speed: speed || 0,
            driverName: currentUser.name,
            busNumber: currentUser.assignedBus || currentUser.bus || 'N/A',
            routeId: assignedRoute,
            isActive: true,
            lastUpdated: Date.now(),
          }).then(() => {
            // Clear any previous network warnings on successful write
            setGpsWarning(prev => prev?.color === '#f87171' && prev?.message?.includes('connection') ? null : prev);
          }).catch((err) => {
            console.log('[DriverOTP] RTDB write error:', err);
            setGpsWarning({ message: '⚠ Cannot update location. Check connection.', color: '#f87171' });
          });

          // Clear GPS weak warning on successful fix
          setGpsWarning(prev => prev?.message?.includes('GPS signal') ? null : prev);
        }
      );
      locationSubscription.current = subscription;
    } catch (err) {
      console.log('[DriverOTP] watchPositionAsync error:', err);
      setGpsWarning({ message: '⚠ GPS signal weak. Location may not update.', color: '#fbbf24' });
    }
  };

  // Start tracking when trip is active
  useEffect(() => {
    if (activeTripId) {
      startLocationTracking();
    }
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
        locationSubscription.current = null;
      }
    };
  }, [activeTripId]);

  // Fix 2 — onSnapshot listener on the trip document
  useEffect(() => {
    if (!activeTripId) return;
    const tripRef = doc(db, 'trips', activeTripId);
    const unsub = onSnapshot(tripRef, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();
      setOtp(data.otp || '----');
      const students = data.boardedStudents || [];
      setBoardedStudents(students);
      syncTripFromFirestore({
        otp:             data.otp,
        boardedStudents: students,
        boardedCount:    data.boardedCount || 0,
        active:          data.active,
        routeId:         data.routeId,
      });
    });
    return () => unsub();
  }, [activeTripId]);

  // Border pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
        Animated.timing(borderAnim, { toValue: 0, duration: 1500, useNativeDriver: false }),
      ])
    ).start();
  }, [borderAnim]);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.accent],
  });

  // Fix 2 — OTP countdown: every 2 min, write new OTP to Firestore
  useEffect(() => {
    if (!activeTripId) return;
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          const newOtp = String(Math.floor(Math.random() * 9000) + 1000);
          updateDoc(doc(db, 'trips', activeTripId), {
            otp:            newOtp,
            otpGeneratedAt: serverTimestamp(),
          }).catch(e => console.log('[OTPScreen] OTP refresh error:', e));
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [activeTripId]);

  // Follow bus on map
  useEffect(() => {
    if (busLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude:      busLocation.latitude,
        longitude:     busLocation.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      }, 1500);
    }
  }, [busLocation]);

  // Manual OTP refresh
  const handleRefreshOTP = async () => {
    if (!activeTripId) return;
    const newOtp = String(Math.floor(Math.random() * 9000) + 1000);
    try {
      await updateDoc(doc(db, 'trips', activeTripId), {
        otp:            newOtp,
        otpGeneratedAt: serverTimestamp(),
      });
      setCountdown(120);
    } catch (e) {
      console.log('[OTPScreen] manual refresh error:', e);
    }
  };

  // End trip: show confirmation, then stop GPS, update RTDB + Firestore, clear context, navigate
  const handleEndTrip = () => {
    Alert.alert(
      'End Trip',
      'Are you sure you want to end this trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'End Trip',
          style: 'destructive',
          onPress: async () => {
            try {
              // Step 1 — Stop countdown timer immediately to prevent stale updates
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }

              // Step 2 — Stop GPS location tracking
              if (locationSubscription.current) {
                locationSubscription.current.remove();
                locationSubscription.current = null;
              }

              // Step 3 — Update Firestore trip document
              if (activeTripId) {
                await updateDoc(doc(db, 'trips', activeTripId), {
                  active:  false,
                  endTime: serverTimestamp(),
                });
              }

              // Step 4 — Set isActive false in Realtime Database (fire-and-forget, non-blocking)
              if (currentUser?.institutionId) {
                const locationRef = ref(
                  rtdb,
                  `liveLocation/${currentUser.institutionId}/${assignedRoute}`
                );
                set(locationRef, {
                  isActive:    false,
                  lastUpdated: Date.now(),
                  driverName:  currentUser.name,
                  busNumber:   currentUser.assignedBus || currentUser.bus || 'N/A',
                  routeId:     assignedRoute,
                  latitude:    0,
                  longitude:   0,
                  heading:     0,
                  speed:       0,
                }).catch(e => console.log('[DriverOTP] RTDB end trip (non-fatal):', e));
              }

              // Step 5 — Clear TripContext and navigate
              endTrip();
              navigation.navigate('DriverTripSummary');

            } catch (error) {
              console.log('[DriverOTP] End trip error:', error);
              Alert.alert('Error', 'Failed to end trip. Please try again.');
            }
          },
        },
      ]
    );
  };

  const minutes    = Math.floor(countdown / 60);
  const seconds    = countdown % 60;
  const timeStr    = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const displayOTP = (otp || '0000').padEnd(4, '0');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Active trip banner */}
      <View style={styles.banner}>
        <PulsingDot />
        <Text style={styles.bannerText}>
          Trip Active — {assignedRoute}
          {driverRoute ? ` · ${driverRoute.label}` : ''}
        </Text>
      </View>

      {/* Fix 5 — GPS/Network warning banner */}
      {gpsWarning && (
        <View style={[styles.warningBanner, { borderLeftColor: gpsWarning.color }]}>
          <Text style={[styles.warningText, { color: gpsWarning.color }]}>
            {gpsWarning.message}
          </Text>
        </View>
      )}

      {/* Mini GPS map */}
      <MapView
        ref={mapRef}
        style={styles.confirmMap}
        scrollEnabled={false}
        zoomEnabled={false}
        initialRegion={{
          latitude:      mapCenter.latitude,
          longitude:     mapCenter.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
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
        {busLocation && (
          <Marker coordinate={{ latitude: busLocation.latitude, longitude: busLocation.longitude }} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.busMarker}><Text style={styles.busMarkerEmoji}>🚌</Text></View>
          </Marker>
        )}
        {routeCoords[0] && (
          <Marker coordinate={routeCoords[0]} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={styles.stopDot} />
          </Marker>
        )}
        {routeCoords[routeCoords.length - 1] && (
          <Marker coordinate={routeCoords[routeCoords.length - 1]} anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.stopDot, { backgroundColor: COLORS.success }]} />
          </Marker>
        )}
      </MapView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* OTP Card */}
        <Animated.View style={[styles.otpCard, { borderColor: animatedBorderColor }]}>
          <Text style={styles.otpLabel}>Show this OTP to students for boarding</Text>
          <View style={styles.otpRow}>
            {displayOTP.split('').map((digit, i) => (
              <View key={i} style={styles.otpBox}>
                <Text style={styles.otpDigit}>{digit}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.countdown}>🔄 Refreshes in {timeStr}</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={handleRefreshOTP} activeOpacity={0.7}>
            <Text style={styles.refreshText}>Refresh OTP</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Boarded progress — Firestore live */}
        <View style={styles.boardedProgress}>
          <Text style={styles.boardedCount}>
            <Text style={{ color: COLORS.success }}>{boardedStudents.length}</Text>
          </Text>
          <Text style={styles.boardedSub}>Students Boarded</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: boardedStudents.length > 0 ? '100%' : '0%' }]} />
          </View>
        </View>

        {/* Recent Boardings — from Firestore boardedStudents array */}
        <View style={styles.section}>
          <SectionTitle title="Recent Boardings" />
          {boardedStudents.length === 0 ? (
            <Text style={styles.noBoardText}>No boardings yet — waiting for students</Text>
          ) : (
            boardedStudents.map((uid, i) => (
              <View key={uid} style={styles.boardRow}>
                <AvatarCircle initials={(i + 1).toString()} size={38} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.studentName}>Student {i + 1}</Text>
                  <Text style={styles.studentStop}>UID: {uid.slice(0, 10)}…</Text>
                </View>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={14} color={COLORS.success} />
                </View>
              </View>
            ))
          )}
        </View>

        {/* End Trip */}
        <TouchableOpacity style={styles.endBtn} activeOpacity={0.75} onPress={handleEndTrip}>
          <Text style={styles.endBtnText}>End Trip</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  banner: {
    backgroundColor: COLORS.successBg,
    paddingVertical: 12, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  pulsingDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: COLORS.success, marginRight: 8 },
  bannerText: { color: COLORS.success, fontSize: 13, fontWeight: '500' },
  warningBanner: {
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 3,
    paddingVertical: 10, paddingHorizontal: 14,
  },
  warningText: { fontSize: 12, fontWeight: '500' },
  confirmMap: {
    height: 140, marginHorizontal: 20, marginTop: 12,
    borderRadius: 14, overflow: 'hidden',
  },
  busMarker: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: COLORS.accent, borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  busMarkerEmoji: { fontSize: 14 },
  stopDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.accent, borderWidth: 1, borderColor: '#fff',
  },
  otpCard: {
    margin: 20, marginTop: 16,
    backgroundColor: COLORS.card, borderRadius: 20, padding: 28, alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: COLORS.accent, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 16, elevation: 6,
  },
  otpLabel: { fontSize: 12, color: COLORS.muted, marginBottom: 18, textAlign: 'center' },
  otpRow:   { flexDirection: 'row', gap: 10 },
  otpBox: {
    width: 58, height: 70, borderRadius: 12,
    backgroundColor: '#080a0f', borderWidth: 0.5, borderColor: '#7c8ff7',
    alignItems: 'center', justifyContent: 'center',
  },
  otpDigit:   { fontSize: 44, fontWeight: 'bold', color: '#7c8ff7' },
  countdown:  { fontSize: 13, color: COLORS.warning, marginTop: 14 },
  refreshBtn: {
    marginTop: 10, borderWidth: 0.5, borderColor: COLORS.accent,
    borderRadius: 8, paddingVertical: 8, paddingHorizontal: 18,
  },
  refreshText: { color: COLORS.accent, fontSize: 12 },
  boardedProgress: { marginHorizontal: 20, alignItems: 'center', marginBottom: 8 },
  boardedCount: { fontSize: 28, fontWeight: 'bold', color: '#e2e8f0', textAlign: 'center' },
  boardedSub:   { fontSize: 12, color: COLORS.muted, marginTop: 4, marginBottom: 10 },
  progressBarBg:   { width: '100%', height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: 6, backgroundColor: COLORS.success, borderRadius: 3 },
  section:  { marginHorizontal: 16, marginTop: 12 },
  boardRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: COLORS.border,
  },
  studentName: { fontSize: 13, color: COLORS.text, fontWeight: '500' },
  studentStop: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  checkCircle: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: COLORS.successBg, alignItems: 'center', justifyContent: 'center',
  },
  noBoardText: { fontSize: 13, color: COLORS.muted, textAlign: 'center', paddingVertical: 20 },
  endBtn: {
    marginHorizontal: 16, marginTop: 20, marginBottom: 8,
    borderWidth: 0.5, borderColor: '#f87171',
    borderRadius: 14, padding: 14, alignItems: 'center',
  },
  endBtnText: { color: '#f87171', fontSize: 15, fontWeight: '500' },
});
