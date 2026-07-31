import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../dummyData';

/**
 * Badge
 * type: 'success' | 'danger' | 'warning' | 'info' | 'muted'
 */
export default function Badge({ text, type = 'info' }) {
  const styles = badgeStyles[type] || badgeStyles.info;
  return (
    <View style={[baseStyles.badge, styles.container]}>
      <Text style={[baseStyles.text, styles.text]}>{text}</Text>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});

const badgeStyles = {
  success: StyleSheet.create({
    container: { backgroundColor: COLORS.successBg },
    text: { color: COLORS.success },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: COLORS.dangerBg },
    text: { color: COLORS.danger },
  }),
  warning: StyleSheet.create({
    container: { backgroundColor: '#3d2e0d' },
    text: { color: COLORS.warning },
  }),
  info: StyleSheet.create({
    container: { backgroundColor: COLORS.accentBg },
    text: { color: COLORS.accent },
  }),
  muted: StyleSheet.create({
    container: { backgroundColor: COLORS.avatarBg },
    text: { color: COLORS.muted },
  }),
};
