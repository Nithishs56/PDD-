import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import LogoIcon from '../components/AppLogo';
import { COLORS } from '../dummyData';



export default function LoginScreen() {
  const { login } = useAuth();

  // Local controlled state — no dependency on AuthContext error state
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  // ── Login handler ─────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const role = await login(email.trim(), password.trim());
      // Navigation is handled automatically by RootNavigator reacting to
      // currentUser state — no navigation.replace() needed here.
      console.log('[LoginScreen] login succeeded, role:', role);
    } catch (err) {
      console.log('[LoginScreen] login error — code:', err.code, '| message:', err.message);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <LogoIcon size={70} />
          <Text style={styles.brand}>FleetSync</Text>
          <Text style={styles.brandSub}>Smart Fleet Management System</Text>
        </View>

        {/* Sign-in heading */}
        <Text style={styles.signInTitle}>Sign In</Text>
        <Text style={styles.signInSub}>Sign in to your account</Text>

        {/* Email */}
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={18} color={COLORS.muted} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="you@cit.edu"
            placeholderTextColor={COLORS.muted}
            value={email}
            onChangeText={t => { setEmail(t); setError(''); }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={18} color={COLORS.muted} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="••••••••"
            placeholderTextColor={COLORS.muted}
            value={password}
            onChangeText={t => { setPassword(t); setError(''); }}
            secureTextEntry={!showPw}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPw(v => !v)} style={{ padding: 4 }}>
            <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={18} color={COLORS.muted} />
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity
          style={[styles.loginBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.loginBtnText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* Error message */}
        {!!error && (
          <Text style={styles.errorText}>{error}</Text>
        )}


      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginTop: 12,
    textShadowColor: COLORS.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  brandSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 4,
  },
  signInTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.text,
    marginTop: 32,
    marginBottom: 4,
  },
  signInSub: {
    fontSize: 13,
    color: COLORS.muted,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 6,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    padding: 0,
  },
  loginBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
});
