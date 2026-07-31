import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const Toast = ({ visible, message, type = 'success', translateY, opacity }) => {
  if (!visible) return null;
  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: type === 'success' ? '#34d399' : '#f87171', transform: [{ translateY }], opacity },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    zIndex: 9999,
    elevation: 10,
  },
  text: { color: '#ffffff', fontSize: 13, fontWeight: '500', textAlign: 'center' },
});

export default Toast;
