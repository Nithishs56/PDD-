import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ label, value, valueColor = '#e2e8f0' }) => (
  <View style={styles.card}>
    <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111318',
    borderWidth: 0.5,
    borderColor: '#1e2235',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginHorizontal: '1.5%',
    marginVertical: 6,
  },
  value: {
    fontSize: 26,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
  },
});

export default StatCard;
