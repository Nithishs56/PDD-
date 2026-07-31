import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { rtdb } from '../../firebase';
import { ref, onValue, off } from 'firebase/database';
import { routes, COLORS } from '../../dummyData';

// College Gate — default bus resting position
const COLLEGE_GATE = { latitude: 13.0100, longitude: 80.2350 };

// Format "X seconds ago" / "X minutes ago"
function formatTimeAgo(timestamp) {
  if (!timestamp) return 'Unknown';
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 5) return 'Just now';
  if (diff < 60) return `${diff} seconds ago`;
  const mins = Math.floor(diff / 60);
  if (mins === 1) return '1 minute ago';
  return `${mins} minutes ago`;
}

// GPS signal quality
function getSignalQuality(lastUpdated) {
  if (!lastUpdated) return { color: COLORS.muted, label: 'No signal', dot: '#6b7280' };
  const diff = (Date.now() - lastUpdated) / 1000;
  if (diff <= 10) return { color: COLORS.success, label: 'Live', dot: COLORS.success };
  if (diff <= 30) return { color: '#fbbf24', label: 'Delayed', dot: '#fbbf24' };
  const mins = Math.floor(diff / 60);
  return { color: '#f87171', label: `Last seen ${mins > 0 ? `${mins} min ago` : `${Math.floor(diff)}s ago`}`, dot: '#f87171' };
}

export default function StudentTrackScreen() {
  const { currentUser } = useAuth();

  const studentRoute = routes.find(r => r.name === currentUser.route);
  const stops = studentRoute?.stops || [];
  const routeCoords = stops.map(s => ({ latitude: s.latitude, longitude: s.longitude }));

  // Student's boarding stop
  const boardingStopIndex = stops.findIndex(s => s.name === currentUser.stop);

  const mapRef = useRef(null);

  // ── Fix 2: Real GPS from Firebase Realtime Database ──────────────────────
  const [busLocation, setBusLocation] = useState(null);
  const [now, setNow] = useState(Date.now());

  // RTDB listener for live bus location
  useEffect(() => {
    if (!currentUser?.institutionId || !currentUser?.route) return;

    const locationRef = ref(rtdb,
      `liveLocation/${currentUser.institutionId}/${currentUser.route}`
    );

    const unsubscribe = onValue(locationRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setBusLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          heading: data.heading,
          speed: data.speed,
          isActive: data.isActive,
          driverName: data.driverName,
          busNumber: data.busNumber,
          lastUpdated: data.lastUpdated,
        });

        // Auto center map on bus location
        if (mapRef.current && data.latitude && data.longitude && data.isActive) {
          mapRef.current.animateToRegion({
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }, 1000);
        }
      } else {
        setBusLocation(null);
      }
    });

    return () => off(locationRef);
  }, [currentUser?.institutionId, currentUser?.route]);

  // ── Fix 4: Tick timer for GPS accuracy indicator ─────────────────────────
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isActive = busLocation?.isActive === true;
  const busCoord = isActive && busLocation?.latitude && busLocation?.longitude
    ? { latitude: busLocation.latitude, longitude: busLocation.longitude }
    : COLLEGE_GATE;

  const signalQuality = getSignalQuality(isActive ? busLocation?.lastUpdated : null);

  // Info rows — now from RTDB
  const trackRows = [
    { label: 'Driver',       value: busLocation?.driverName || studentRoute?.driver || 'N/A' },
    { label: 'Bus Number',   value: busLocation?.busNumber || studentRoute?.bus || 'N/A' },
    { label: 'Last Updated', value: isActive ? formatTimeAgo(busLocation?.lastUpdated) : 'Trip not active', color: isActive ? COLORS.success : COLORS.muted },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>Live Track</Text>
        <TouchableOpacity>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>

        {/* ── No active trip empty state ── */}
        {!isActive && (
          <View style={styles.emptyBanner}>
            <Text style={styles.emptyIcon}>🚌</Text>
            <Text style={styles.emptyTitle}>Your driver has not started the trip yet</Text>
            <Text style={styles.emptyHint}>Check back at 7:00 AM</Text>
          </View>
        )}

        {/* ── Map ── */}
        <View style={[styles.mapWrap, !isActive && { opacity: 0.6 }]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            scrollEnabled={isActive ? true : false}
            zoomEnabled={isActive ? true : false}
            initialRegion={{
              latitude: 13.0067,
              longitude: 80.2206,
              latitudeDelta: 0.08,
              longitudeDelta: 0.08,
            }}
          >
            {/* Route polyline */}
            {routeCoords.length >= 2 && (
              <Polyline
                coordinates={routeCoords}
                strokeColor={COLORS.accent}
                strokeWidth={2}
                lineDashPattern={[8, 4]}
              />
            )}

            {/* Stop markers */}
            {stops.map((stop, i) => (
              <Marker
                key={i}
                coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.stopMarker} />
              </Marker>
            ))}

            {/* Student boarding stop — green marker */}
            {stops[boardingStopIndex] && (
              <Marker
                coordinate={{
                  latitude: stops[boardingStopIndex].latitude,
                  longitude: stops[boardingStopIndex].longitude,
                }}
                title="Your Stop"
                description={stops[boardingStopIndex].name}
                anchor={{ x: 0.5, y: 0.5 }}
              >
                <View style={styles.yourStopMarker}>
                  <Ionicons name="person-circle" size={14} color="#fff" />
                </View>
              </Marker>
            )}

            {/* Bus marker — rotated by heading */}
            <Marker
              coordinate={busCoord}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={[
                styles.busMarker,
                !isActive && { opacity: 0.4 },
                isActive && busLocation?.heading ? { transform: [{ rotate: `${busLocation.heading}deg` }] } : {},
              ]}>
                <Text style={styles.busEmoji}>🚌</Text>
              </View>
            </Marker>
          </MapView>
        </View>

        {/* ── Fix 4: GPS Accuracy Indicator ── */}
        <View style={styles.signalRow}>
          <View style={[styles.signalDot, { backgroundColor: signalQuality.dot }]} />
          <Text style={[styles.signalText, { color: signalQuality.color }]}>
            {signalQuality.label}
          </Text>
          {isActive && busLocation?.speed > 0 && (
            <Text style={styles.speedText}>
              {Math.round((busLocation.speed || 0) * 3.6)} km/h
            </Text>
          )}
        </View>

        {/* ── Info card ── */}
        {isActive ? (
          <View style={styles.bottomCard}>
            {trackRows.map((row, i) => (
              <View
                key={row.label}
                style={[
                  styles.infoRow,
                  i === trackRows.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={[styles.infoValue, row.color && { color: row.color }]}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.noTripBanner}>
            <Ionicons name="time-outline" size={20} color={COLORS.muted} />
            <Text style={styles.noTripText}>
              No active trip.{'  '}Driver has not started yet.
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  topBar: {
    backgroundColor: COLORS.cardAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  topTitle:    { fontSize: 16, fontWeight: '600', color: COLORS.text },
  refreshText: { fontSize: 12, color: COLORS.accent, fontWeight: '500' },

  /* Empty state */
  emptyBanner: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  emptyIcon:  { fontSize: 48, color: COLORS.muted },
  emptyTitle: { fontSize: 14, color: COLORS.muted, textAlign: 'center', marginTop: 16 },
  emptyHint:  { fontSize: 12, color: COLORS.muted, textAlign: 'center', marginTop: 8 },

  /* Map */
  mapWrap: { marginHorizontal: 16, marginTop: 12, borderRadius: 14, overflow: 'hidden' },
  map: { width: '100%', height: 260 },

  /* Markers */
  stopMarker: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: COLORS.avatarBg,
    borderWidth: 1, borderColor: COLORS.accent,
  },
  yourStopMarker: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: COLORS.success,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  busMarker: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#7c8ff7',
    borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  busEmoji: { fontSize: 20, color: '#fff' },

  /* GPS Signal Indicator */
  signalRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginTop: 8,
    paddingVertical: 6, paddingHorizontal: 12,
    backgroundColor: COLORS.card,
    borderRadius: 8, borderWidth: 0.5, borderColor: COLORS.border,
  },
  signalDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  signalText: { fontSize: 12, fontWeight: '500', flex: 1 },
  speedText: { fontSize: 11, color: COLORS.muted },

  /* Info card */
  bottomCard: {
    margin: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 0.5,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 14,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 12, color: COLORS.muted },
  infoValue: { fontSize: 13, color: COLORS.text, fontWeight: '500' },

  /* No trip banner */
  noTripBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.card,
    borderRadius: 12, marginHorizontal: 16, marginTop: 12,
    padding: 16,
    borderWidth: 0.5, borderColor: COLORS.border,
  },
  noTripText: { color: COLORS.muted, fontSize: 13, flex: 1, lineHeight: 18 },
});
