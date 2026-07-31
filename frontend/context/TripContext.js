import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const TripContext = createContext(null);

export function TripProvider({ children }) {
  // ── Firestore-backed trip state ────────────────────────────────────────────
  // activeTripId: the Firestore document ID of the running trip
  const [activeTripId, setActiveTripId] = useState(null);

  // activeTrip mirrors key Firestore fields for local consumption
  // { routeId, active, otp, boardedStudents: [], driverName, vehicleId, startTime }
  const [activeTrip, setActiveTrip] = useState(null);

  // currentOTP: kept in sync with Firestore trip.otp
  const [currentOTP, setCurrentOTP] = useState('');

  // boardedStudents: array of student UIDs (kept in sync with Firestore)
  const [boardedStudents, setBoardedStudents] = useState([]);

  // absentStudentIds: local list (synced via DriverHomeScreen listener)
  const [absentStudentIds, setAbsentStudentIds] = useState([]);

  // ── Bus location simulation ────────────────────────────────────────────────
  const [busLocation, setBusLocation] = useState(null);
  const simIntervalRef = useRef(null);

  const startLocationSimulation = useCallback((stops) => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    if (!stops || stops.length < 2) return;

    let currentStopIndex = 0;
    let progress = 0;

    setBusLocation({
      latitude: stops[0].latitude,
      longitude: stops[0].longitude,
      currentStopIndex: 0,
      progress: 0,
    });

    simIntervalRef.current = setInterval(() => {
      progress += 0.15;
      if (progress >= 1.0) {
        currentStopIndex += 1;
        progress = 0;
        if (currentStopIndex >= stops.length - 1) {
          clearInterval(simIntervalRef.current);
          simIntervalRef.current = null;
          setBusLocation({
            latitude: stops[stops.length - 1].latitude,
            longitude: stops[stops.length - 1].longitude,
            currentStopIndex: stops.length - 1,
            progress: 0,
          });
          setActiveTrip(prev => prev ? { ...prev, active: false } : prev);
          return;
        }
      }
      const currentStop = stops[currentStopIndex];
      const nextStop    = stops[currentStopIndex + 1];
      if (!currentStop || !nextStop) return;
      const interpolatedLat = currentStop.latitude  + progress * (nextStop.latitude  - currentStop.latitude);
      const interpolatedLng = currentStop.longitude + progress * (nextStop.longitude - currentStop.longitude);
      setBusLocation({ latitude: interpolatedLat, longitude: interpolatedLng, currentStopIndex, progress });
    }, 3000);
  }, []);

  // ── Called by DriverHomeScreen after writing trip doc to Firestore ─────────
  const startTrip = useCallback((tripInfo, docId) => {
    setActiveTripId(docId);
    setCurrentOTP(tripInfo.otp || '');
    setBoardedStudents([]);
    const trip = { ...tripInfo, active: true, startTime: new Date() };
    setActiveTrip(trip);
    if (tripInfo.stops && tripInfo.stops.length >= 2) {
      startLocationSimulation(tripInfo.stops);
    }
  }, [startLocationSimulation]);

  // ── Called by DriverOTPScreen's real-time listener ─────────────────────────
  const syncTripFromFirestore = useCallback((data) => {
    if (!data) return;
    setCurrentOTP(data.otp || '');
    setBoardedStudents(data.boardedStudents || []);
    setActiveTrip(prev => prev ? { ...prev, ...data } : data);
  }, []);

  // ── Refresh OTP (legacy local helper, now also used for UI countdown only) ──
  const refreshOTP = useCallback((newOtp) => {
    if (newOtp) {
      setCurrentOTP(newOtp);
    } else {
      setCurrentOTP(String(Math.floor(Math.random() * 9000) + 1000));
    }
  }, []);

  // ── End trip ──────────────────────────────────────────────────────────────
  const endTrip = useCallback(() => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    setActiveTripId(null);
    setActiveTrip(null);
    setCurrentOTP('');
    setBoardedStudents([]);
    setBusLocation(null);
  }, []);

  // ── Absent helpers ─────────────────────────────────────────────────────────
  const markAbsent = useCallback((studentId) => {
    setAbsentStudentIds(prev => prev.includes(studentId) ? prev : [...prev, studentId]);
  }, []);

  const unmarkAbsent = useCallback((studentId) => {
    setAbsentStudentIds(prev => prev.filter(id => id !== studentId));
  }, []);

  // ── Board student (legacy local helper kept for backwards compat) ──────────
  const boardStudent = useCallback((student) => {
    setBoardedStudents(prev => {
      const id = student.uid || student.id;
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  /** Check helpers */
  const isStudentBoarded = useCallback(
    (studentId) => boardedStudents.includes(studentId),
    [boardedStudents]
  );

  const isAbsentToday = useCallback(
    (studentId) => absentStudentIds.includes(studentId),
    [absentStudentIds]
  );

  return (
    <TripContext.Provider
      value={{
        activeTripId,
        setActiveTripId,
        activeTrip,
        setActiveTrip,
        currentOTP,
        boardedStudents,
        busLocation,
        setBusLocation,
        startTrip,
        syncTripFromFirestore,
        refreshOTP,
        endTrip,
        boardStudent,
        markAbsent,
        unmarkAbsent,
        isStudentBoarded,
        isAbsentToday,
        setAbsentStudentIds,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);
