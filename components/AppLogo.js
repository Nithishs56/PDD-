import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../dummyData';

/** LogoIcon — dark rounded square with purple circle and bus emoji */
export default function LogoIcon({ size = 70 }) {
  const circleSize = size * 0.74;
  return (
    <View
      style={[
        styles.outer,
        { width: size, height: size, borderRadius: size * 0.286 },
      ]}
    >
      <View
        style={[
          styles.circle,
          { width: circleSize, height: circleSize, borderRadius: circleSize / 2 },
        ]}
      >
        <Text style={{ fontSize: size * 0.4, textAlign: 'center' }}>🚌</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  circle: {
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
