import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator, StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoIcon from '../components/AppLogo';
import { COLORS } from '../dummyData';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.bg} barStyle="light-content" />
      <LogoIcon size={70} />
      <Text style={styles.brand}>FleetSync</Text>
      <Text style={styles.tagline}>Smart Travel for Smart Institutions</Text>
      <ActivityIndicator
        color={COLORS.accent}
        size="small"
        style={styles.indicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: 20,
    textShadowColor: COLORS.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  indicator: {
    position: 'absolute',
    bottom: 60,
  },
});
