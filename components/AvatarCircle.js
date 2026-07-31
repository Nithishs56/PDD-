import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../dummyData';

/**
 * AvatarCircle
 * Props: initials, size, bgColor, textColor, borderColor
 */
export default function AvatarCircle({
  initials = '?',
  size = 40,
  bgColor = COLORS.avatarBg,
  textColor = COLORS.accent,
  borderColor,
}) {
  return (
    <View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
          borderWidth: borderColor ? 1.5 : 0,
          borderColor: borderColor || 'transparent',
        },
      ]}
    >
      <Text
        style={[
          styles.initials,
          { fontSize: size * 0.35, color: textColor },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
  },
});
