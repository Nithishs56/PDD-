import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import {
  Animated, Text, StyleSheet, View, Dimensions,
} from 'react-native';
import { COLORS } from '../dummyData';

const ToastContext = createContext(null);
const { width } = Dimensions.get('window');

export function ToastProvider({ children }) {
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('info'); // 'success' | 'danger' | 'warning' | 'info'
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(100)).current;
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastMsg(message);
    setToastType(type);
    setVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
    timerRef.current = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, 2000);
  }, [slideAnim]);

  const bgColor = {
    success: COLORS.success,
    danger: COLORS.danger,
    warning: COLORS.warning,
    info: COLORS.accent,
  }[toastType] || COLORS.accent;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.toast,
            { backgroundColor: bgColor, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.toastText}>{toastMsg}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    maxWidth: width * 0.85,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
