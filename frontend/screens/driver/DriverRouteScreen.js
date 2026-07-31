import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { routes, COLORS } from '../../dummyData';
import TopBar from '../../components/TopBar';

const CURRENT_STOP = 2; // 0-indexed: currently at stop index 2

export default function DriverRouteScreen() {
  const { currentUser } = useAuth();
  const driverRoute = routes.find(r => r.name === currentUser.route);
  const stops = driverRoute?.stops || [];

  return (
    <SafeAreaView style={styles.safe}>
      <TopBar title="Route Details" showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={styles.progress}>
          Stop {CURRENT_STOP + 1} of {stops.length}
        </Text>
        <View style={styles.timeline}>
          {stops.map((stop, idx) => {
            const isDone = idx < CURRENT_STOP;
            const isCurrent = idx === CURRENT_STOP;
            const isUpcoming = idx > CURRENT_STOP;

            let dotBg = COLORS.avatarBg;
            let dotBorder = COLORS.border;
            if (isDone) { dotBg = COLORS.success; dotBorder = COLORS.success; }
            if (isCurrent) { dotBg = COLORS.accent; dotBorder = COLORS.accent; }

            return (
              <View key={idx} style={styles.row}>
                {/* Dot + line column */}
                <View style={styles.dotCol}>
                  {idx > 0 && (
                    <View style={[styles.line, { backgroundColor: isDone ? COLORS.success : COLORS.border }]} />
                  )}
                  {isCurrent ? (
                    <View style={styles.currentRing}>
                      <View style={styles.currentDot} />
                    </View>
                  ) : (
                    <View style={[styles.dot, { backgroundColor: dotBg, borderColor: dotBorder }]} />
                  )}
                </View>

                {/* Stop info */}
                <View style={styles.stopInfo}>
                  <Text style={[
                    styles.stopName,
                    isDone && { color: COLORS.muted },
                    isCurrent && { color: COLORS.accent, fontWeight: '700' },
                  ]}>
                    {stop.name}
                    {isCurrent ? '  ← Current' : ''}
                  </Text>
                  <Text style={[styles.stopTime, isDone && { color: COLORS.border }]}>
                    {stop.time}
                  </Text>
                  {isDone && (
                    <Text style={styles.doneTag}>✓ Completed</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  progress: {
    fontSize: 13,
    color: '#9ca3af',
    margin: 16,
  },
  timeline: {
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dotCol: {
    width: 28,
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: 44,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginTop: 4,
  },
  currentRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  currentDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
  },
  stopInfo: {
    flex: 1,
    marginLeft: 10,
    paddingBottom: 24,
    paddingTop: 2,
  },
  stopName: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: '500',
  },
  stopTime: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 3,
  },
  doneTag: {
    fontSize: 10,
    color: COLORS.success,
    marginTop: 2,
  },
});
