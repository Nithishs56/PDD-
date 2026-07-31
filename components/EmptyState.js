import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../dummyData';

export default function EmptyState({ message = 'No data found', icon = 'archive-outline' }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={44} color={COLORS.border} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  text: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
});
