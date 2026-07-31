import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ label, onPress, style }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
    <LinearGradient
      colors={['#7c8ff7', '#6070e8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.btn}
    >
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: { borderRadius: 14, padding: 16, alignItems: 'center' },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default GradientButton;
