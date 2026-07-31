import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../dummyData';

/** SectionTitle with left accent bar */
export default function SectionTitle({ title }) {
  return (
    <View style={styles.row}>
      <View style={styles.bar} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bar: {
    width: 3,
    height: 16,
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
});
