import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  const screenOpacity  = useRef(new Animated.Value(1)).current;
  const logoScale      = useRef(new Animated.Value(3.0)).current;
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const textOpacity    = useRef(new Animated.Value(0)).current;
  const tagTranslateY  = useRef(new Animated.Value(20)).current;
  const tagOpacity     = useRef(new Animated.Value(0)).current;
  const barWidth       = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      // Step 1 — wait 300ms dark screen
      Animated.delay(300),

      // Step 2 — Logo zoom in (Netflix style)
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 8,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),

      // Step 3 — wait then show FleetSync text
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // Step 4 — wait then show tagline
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(tagTranslateY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(tagOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      // Step 5 — loading bar
      Animated.delay(400),
      Animated.timing(barWidth, {
        toValue: width - 80,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),

      // Step 6 — fade out entire screen
      Animated.delay(200),
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]);

    sequence.start(() => {
      navigation.replace('Login');
    });

    return () => sequence.stop();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>

      {/* Logo */}
      <Animated.View
        style={{
          transform: [{ scale: logoScale }],
          opacity: logoOpacity,
        }}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* FleetSync text */}
      <Animated.Text
        style={[
          styles.brandText,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        FleetSync
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: tagOpacity,
            transform: [{ translateY: tagTranslateY }],
          },
        ]}
      >
        Smart Travel for Smart Institutions
      </Animated.Text>

      {/* Loading bar at bottom */}
      <View style={styles.barContainer}>
        <Animated.View style={[styles.barFill, { width: barWidth }]} />
      </View>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080a0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 110,
  },
  brandText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7c8ff7',
    marginTop: 24,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 10,
    letterSpacing: 0.5,
  },
  barContainer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: '#1e2235',
    borderRadius: 1,
    overflow: 'hidden',
  },
  barFill: {
    height: 2,
    backgroundColor: '#7c8ff7',
    borderRadius: 1,
  },
});
