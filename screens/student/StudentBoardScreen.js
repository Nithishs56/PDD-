import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
  TextInput, Animated, Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { db, auth } from '../../firebase';
import {
  collection, query, where, getDocs, getDoc,
  addDoc, doc, updateDoc, serverTimestamp, increment, arrayUnion,
} from 'firebase/firestore';

// ─── sleep helper ──────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export default function StudentBoardScreen() {
  const navigation   = useNavigation();
  const { currentUser } = useAuth();
  const { addNotification } = useNotifications();

  // ── screen: 'home' | 'otp' | 'loading' | 'success' | 'no_trip' | 'already_boarded' | 'blocked' | 'error'
  const [screen, setScreen]         = useState('home');
  const [checking, setChecking]     = useState(false);

  // trip data fetched from Firestore
  const [tripId, setTripId]         = useState(null);
  const [tripOtp, setTripOtp]       = useState('');
  const [tripInfo, setTripInfo]     = useState(null); // { routeId, driverName, vehicleId }

  // OTP input state
  const [otpValue, setOtpValue]     = useState('');
  const [otpError, setOtpError]     = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [verifying, setVerifying]   = useState(false);

  // refs
  const inputRef   = useRef(null);
  const shakeAnim  = useRef(new Animated.Value(0)).current;

  // auto-focus OTP input when OTP screen shows
  useEffect(() => {
    if (screen === 'otp') {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // ── Step 1: check Firestore for active trip ────────────────────────────────
  const handleBoardBus = async () => {
    setChecking(true);
    try {
      const q = query(
        collection(db, 'trips'),
        where('institutionId', '==', currentUser.institutionId),
        where('routeId',       '==', currentUser.route),
        where('active',        '==', true)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setScreen('no_trip');
        return;
      }

      const tripDoc  = snap.docs[0];
      const data     = tripDoc.data();

      // Already boarded?
      if (data.boardedStudents && data.boardedStudents.includes(auth.currentUser.uid)) {
        setScreen('already_boarded');
        return;
      }

      // Store trip details and navigate to OTP screen
      setTripId(tripDoc.id);
      setTripOtp(data.otp || '');
      setTripInfo({
        routeId:    data.routeId    || currentUser.route,
        driverName: data.driverName || 'Driver',
        vehicleId:  data.vehicleId  || 'N/A',
      });
      setOtpValue('');
      setOtpError('');
      setWrongAttempts(0);
      setScreen('otp');
    } catch (err) {
      console.log('[BoardScreen] handleBoardBus error:', err);
      setScreen('error');
    } finally {
      setChecking(false);
    }
  };

  // ── Shake animation ────────────────────────────────────────────────────────
  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  12, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:  10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue:   0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  // ── Step 3: verify OTP and board ──────────────────────────────────────────
  const handleVerifyOTP = async () => {
    if (otpValue.length < 4) return;
    Keyboard.dismiss();
    setVerifying(true);
    setOtpError('');

    await sleep(800); // brief loading feel

    try {
      // Fix 3 + Fix 4 — Re-fetch live OTP from Firestore at verify time (not stale cache)
      const tripSnap = await getDoc(doc(db, 'trips', tripId));
      if (!tripSnap.exists()) {
        setVerifying(false);
        setOtpError('Trip no longer active. Please go back and try again.');
        triggerShake();
        setOtpValue('');
        return;
      }

      const tripData = tripSnap.data();

      // Fix 5 — OTP expiry check (2 minutes)
      if (tripData.otpGeneratedAt) {
        const generatedMs = tripData.otpGeneratedAt.toMillis();
        if (Date.now() - generatedMs > 120000) {
          setVerifying(false);
          triggerShake();
          setOtpError('OTP has expired. Please ask your driver to refresh the OTP.');
          setOtpValue('');
          return;
        }
      }

      // Fix 4 — Strict string comparison with trim to avoid type mismatch
      const liveOtp      = (tripData.otp || '').toString().trim();
      const enteredOtp   = otpValue.trim();

      if (enteredOtp !== liveOtp) {
        const newAttempts = wrongAttempts + 1;
        setWrongAttempts(newAttempts);
        setVerifying(false);

        // Block after 3 wrong attempts
        if (newAttempts >= 3) {
          setScreen('blocked');
          addNotification({
            title: 'Boarding Blocked',
            message: 'Too many wrong OTP attempts. Contact your driver for assistance.',
            type: 'danger',
          });
          return;
        }

        triggerShake();
        // Fix 3 — Clear input boxes on wrong OTP
        setOtpValue('');
        setOtpError('Wrong OTP. Please check the OTP shown on your driver screen.');
        return;
      }

      // OTP matched — write boarding to Firestore
      await addDoc(collection(db, 'boardings'), {
        studentId:     auth.currentUser.uid,
        studentName:   currentUser.name,
        routeId:       currentUser.route,
        boardingStop:  currentUser.stop,
        boardedAt:     serverTimestamp(),
        tripId,
        institutionId: currentUser.institutionId,
      });

      await updateDoc(doc(db, 'trips', tripId), {
        boardedCount:    increment(1),
        boardedStudents: arrayUnion(auth.currentUser.uid),
      });

      setVerifying(false);
      setScreen('success');
      addNotification({
        title: 'Boarding Confirmed',
        message: `You successfully boarded bus ${tripInfo?.vehicleId || 'N/A'} at ${currentUser?.stop || 'your stop'}.`,
        type: 'success',
      });
    } catch (err) {
      console.log('[BoardScreen] boarding verify error:', err);
      setVerifying(false);
      setScreen('error');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER HELPERS
  // ══════════════════════════════════════════════════════════════════════════════

  // ── Verifying loading overlay ────────────────────────────────────────────
  if (verifying) {
    return (
      <View style={styles.fullCenter}>
        <ActivityIndicator color="#7c8ff7" size="large" />
        <Text style={styles.verifyText}>Verifying OTP…</Text>
      </View>
    );
  }

  // ── Checking trip loading ────────────────────────────────────────────────
  if (checking) {
    return (
      <View style={styles.fullCenter}>
        <ActivityIndicator color="#7c8ff7" size="large" />
        <Text style={styles.verifyText}>Checking trip status…</Text>
      </View>
    );
  }

  // ── No active trip ───────────────────────────────────────────────────────
  if (screen === 'no_trip') {
    return (
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#3f1f1f' }]}>
          <Text style={{ fontSize: 28, color: '#f87171' }}>!</Text>
        </View>
        <Text style={[styles.resultTitle, { color: '#f87171' }]}>No Active Trip</Text>
        <Text style={styles.resultSub}>Your driver has not started the trip yet.</Text>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: '#f87171' }]} onPress={() => setScreen('home')}>
          <Text style={{ color: '#f87171', fontSize: 14, textAlign: 'center' }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Already boarded ──────────────────────────────────────────────────────
  if (screen === 'already_boarded') {
    return (
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#3b2e0a' }]}>
          <Text style={{ fontSize: 28, color: '#fbbf24' }}>⚠</Text>
        </View>
        <Text style={[styles.resultTitle, { color: '#fbbf24' }]}>Already Boarded</Text>
        <Text style={styles.resultSub}>You have already boarded today.</Text>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: '#fbbf24' }]} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#fbbf24', fontSize: 14, textAlign: 'center' }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Blocked (too many wrong attempts) ────────────────────────────────────
  if (screen === 'blocked') {
    return (
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#3f1f1f' }]}>
          <Text style={{ fontSize: 28, color: '#f87171' }}>🔒</Text>
        </View>
        <Text style={[styles.resultTitle, { color: '#f87171' }]}>Too Many Attempts</Text>
        <Text style={styles.resultSub}>
          Too many wrong attempts.{'\n'}Please contact your driver.
        </Text>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: '#f87171' }]} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#f87171', fontSize: 14, textAlign: 'center' }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (screen === 'success') {
    return (
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#0d2e1f' }]}>
          <Text style={{ fontSize: 32, color: '#34d399' }}>✓</Text>
        </View>
        <Text style={[styles.resultTitle, { color: '#34d399' }]}>Boarding Confirmed</Text>
        <Text style={styles.resultSub}>Have a safe journey, {currentUser?.name}!</Text>
        <View style={styles.successCard}>
          {[
            { label: 'Name',  value: currentUser?.name },
            { label: 'Stop',  value: currentUser?.stop },
            { label: 'Route', value: currentUser?.route },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.infoRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value || '—'}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (screen === 'error') {
    return (
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#3f1f1f' }]}>
          <Text style={{ fontSize: 28, color: '#f87171' }}>✕</Text>
        </View>
        <Text style={[styles.resultTitle, { color: '#f87171' }]}>Something Went Wrong</Text>
        <Text style={styles.resultSub}>Please check your internet connection and try again.</Text>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: '#f87171' }]} onPress={() => setScreen('home')}>
          <Text style={{ color: '#f87171', fontSize: 14, textAlign: 'center' }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── OTP Input screen (Step 2) ────────────────────────────────────────────
  if (screen === 'otp') {
    const digits    = otpValue.split('');
    const canSubmit = otpValue.length === 4;

    return (
      <SafeAreaView style={styles.safe}>
        {/* TopBar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setScreen('home')} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#e2e8f0" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Verify Boarding</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Step 5 — Trip info card */}
        {tripInfo && (
          <View style={styles.tripCard}>
            <View style={styles.tripCardRow}>
              <View style={styles.greenDot} />
              <Text style={styles.tripActiveText}>Trip Active</Text>
            </View>
            <Text style={styles.tripRoute}>{tripInfo.routeId}</Text>
            <Text style={styles.tripMeta}>Driver: {tripInfo.driverName}</Text>
            <Text style={styles.tripMeta}>Bus: {tripInfo.vehicleId}</Text>
          </View>
        )}

        {/* Center content */}
        <View style={styles.otpCenter}>
          {/* Bus icon */}
          <View style={styles.busIconCircle}>
            <Text style={{ fontSize: 32 }}>🚌</Text>
          </View>

          <Text style={styles.enterOtpTitle}>Enter OTP</Text>
          <Text style={styles.enterOtpSub}>
            Type the 4-digit OTP shown on your driver screen
          </Text>

          {/* Hidden real TextInput */}
          <TextInput
            ref={inputRef}
            value={otpValue}
            onChangeText={(t) => {
              const nums = t.replace(/[^0-9]/g, '').slice(0, 4);
              setOtpValue(nums);
              if (otpError) setOtpError('');
            }}
            keyboardType="numeric"
            maxLength={4}
            style={styles.hiddenInput}
            caretHidden
          />

          {/* 4 visible OTP boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          >
            <Animated.View style={[styles.otpRow, { transform: [{ translateX: shakeAnim }] }]}>
              {[0, 1, 2, 3].map(i => {
                const filled = i < digits.length;
                return (
                  <View
                    key={i}
                    style={[
                      styles.otpBox,
                      filled && styles.otpBoxFilled,
                    ]}
                  >
                    <Text style={styles.otpDigit}>{digits[i] || ''}</Text>
                  </View>
                );
              })}
            </Animated.View>
          </TouchableOpacity>

          {/* Inline error */}
          {!!otpError && (
            <Text style={styles.otpErrorText}>{otpError}</Text>
          )}

          {/* Attempts remaining */}
          {wrongAttempts > 0 && (
            <Text style={styles.attemptsText}>
              {3 - wrongAttempts} attempt{3 - wrongAttempts !== 1 ? 's' : ''} remaining
            </Text>
          )}

          {/* Verify button */}
          <TouchableOpacity
            style={[styles.verifyBtn, !canSubmit && styles.verifyBtnDisabled]}
            onPress={handleVerifyOTP}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.verifyBtnText}>Verify and Board</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Default Home screen (Step 1) ─────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.fullCenter}>
        <View style={[styles.iconCircle, { backgroundColor: '#1a1f3a' }]}>
          <Text style={{ fontSize: 36 }}>🚌</Text>
        </View>

        <Text style={styles.boardTitle}>Ready to Board?</Text>
        <Text style={styles.boardSub}>
          Tap below to check if your driver has started the trip.{'\n'}
          You will need the OTP shown on the driver screen.
        </Text>

        <View style={styles.infoCard}>
          {[
            { label: 'Name',  value: currentUser?.name },
            { label: 'Route', value: currentUser?.route },
            { label: 'Stop',  value: currentUser?.stop },
          ].map((row, i, arr) => (
            <View key={row.label} style={[styles.infoRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value || '—'}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.boardBtn} onPress={handleBoardBus} activeOpacity={0.85}>
          <Text style={styles.boardBtnText}>Board Bus</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backLinkText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:       { flex: 1, backgroundColor: '#080a0f' },
  fullCenter: {
    flex: 1, backgroundColor: '#080a0f',
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 24,
  },
  verifyText: { fontSize: 14, color: '#6b7280', marginTop: 12 },

  // ── Result screens ──
  iconCircle: {
    width: 70, height: 70, borderRadius: 35,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  resultTitle: { fontSize: 20, fontWeight: '600', marginTop: 20, textAlign: 'center' },
  resultSub:   { fontSize: 13, color: '#6b7280', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  actionBtn: {
    borderWidth: 1, borderRadius: 12,
    paddingVertical: 14, marginHorizontal: 16,
    marginTop: 24, alignSelf: 'stretch', alignItems: 'center',
  },

  // ── Success card ──
  successCard: {
    width: '100%', marginTop: 24,
    backgroundColor: '#0f1117',
    borderWidth: 0.5, borderColor: '#1e2233',
    borderRadius: 14, overflow: 'hidden',
  },

  // ── Home screen ──
  boardTitle: { fontSize: 22, fontWeight: '700', color: '#e2e8f0', marginTop: 16 },
  boardSub:   { fontSize: 13, color: '#6b7280', marginTop: 8, textAlign: 'center', lineHeight: 20 },
  infoCard: {
    width: '100%', marginTop: 24,
    backgroundColor: '#0f1117',
    borderWidth: 0.5, borderColor: '#1e2233',
    borderRadius: 14, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 0.5, borderBottomColor: '#1e2233',
  },
  infoLabel: { fontSize: 12, color: '#6b7280' },
  infoValue: { fontSize: 13, color: '#e2e8f0', fontWeight: '500' },
  boardBtn: {
    backgroundColor: '#7c8ff7', borderRadius: 14,
    paddingVertical: 16, alignSelf: 'stretch', alignItems: 'center',
    marginTop: 20,
    shadowColor: '#7c8ff7', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  boardBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  backLink:     { marginTop: 16 },
  backLinkText: { color: '#6b7280', fontSize: 13 },

  // ── OTP screen ──
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: '#0c0e18',
    borderBottomWidth: 0.5, borderBottomColor: '#1e2233',
  },
  backBtn:     { padding: 4 },
  topBarTitle: { fontSize: 15, fontWeight: '600', color: '#e2e8f0' },

  // Step 5 — trip card
  tripCard: {
    backgroundColor: '#111318',
    borderWidth: 0.5, borderColor: '#1e2235',
    borderRadius: 12, padding: 12,
    marginHorizontal: 16, marginTop: 16,
  },
  tripCardRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  greenDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399', marginRight: 6 },
  tripActiveText: { fontSize: 11, color: '#34d399', fontWeight: '600' },
  tripRoute:      { fontSize: 13, color: '#e2e8f0', fontWeight: '500', marginBottom: 2 },
  tripMeta:       { fontSize: 11, color: '#6b7280', marginTop: 2 },

  // OTP center content
  otpCenter: {
    flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 24,
  },
  busIconCircle: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#0d2e1f',
    alignItems: 'center', justifyContent: 'center',
  },
  enterOtpTitle: { fontSize: 20, fontWeight: '600', color: '#e2e8f0', marginTop: 20, textAlign: 'center' },
  enterOtpSub:   { fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 8, lineHeight: 20 },

  hiddenInput: {
    position: 'absolute', width: 1, height: 1, opacity: 0,
  },

  otpRow: { flexDirection: 'row', gap: 10, marginTop: 28 },
  otpBox: {
    width: 58, height: 68, borderRadius: 12,
    backgroundColor: '#1a1d27',
    borderWidth: 1, borderColor: '#2d3148',
    alignItems: 'center', justifyContent: 'center',
  },
  otpBoxFilled: { borderColor: '#7c8ff7' },
  otpDigit:     { fontSize: 32, fontWeight: 'bold', color: '#7c8ff7' },

  otpErrorText: {
    color: '#f87171', fontSize: 13, textAlign: 'center', marginTop: 14,
  },
  attemptsText: {
    color: '#6b7280', fontSize: 12, textAlign: 'center', marginTop: 6,
  },

  verifyBtn: {
    backgroundColor: '#7c8ff7', borderRadius: 14,
    paddingVertical: 16, alignSelf: 'stretch',
    alignItems: 'center', marginTop: 24,
    shadowColor: '#7c8ff7', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  verifyBtnDisabled: { opacity: 0.5, shadowOpacity: 0 },
  verifyBtnText:     { color: '#fff', fontSize: 16, fontWeight: '600' },
});
