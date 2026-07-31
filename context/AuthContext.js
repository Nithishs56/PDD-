import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError]   = useState('');
  const [loading, setLoading]         = useState(true);

  // ── Firebase login ────────────────────────────────────────────────────────
  const login = async (email, password) => {
    console.log('[AuthContext] Firebase login attempt started — email:', email);
    try {
      console.log('[AuthContext] Calling signInWithEmailAndPassword...');
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('[AuthContext] signInWithEmailAndPassword SUCCESS — uid:', userCredential.user.uid);
      } catch (authError) {
        console.log('[AuthContext] signInWithEmailAndPassword FAILED — code:', authError.code, '| message:', authError.message, '| full:', authError);
        throw authError;
      }

      const uid = userCredential.user.uid;

      console.log('[AuthContext] Fetching Firestore user doc for uid:', uid);
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (!userDoc.exists()) {
        console.log('[AuthContext] Firestore doc does NOT exist for uid:', uid);
        throw new Error('User not found. Contact your institution admin.');
      }

      const userData = userDoc.data();
      console.log('[AuthContext] Firestore userData:', userData);

      if (userData.role === 'admin') {
        console.log('[AuthContext] Blocked — admin role cannot use mobile app');
        throw new Error(
          'Admin accounts must use the web portal. This app is only for drivers and students.'
        );
      }

      setCurrentUser({ ...userData, uid });
      console.log('[AuthContext] Login complete — role:', userData.role);
      return userData.role;
    } catch (error) {
      console.log('[AuthContext] login() catch block — code:', error.code, '| message:', error.message, '| full:', error);
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        throw new Error('Invalid email or password.');
      }
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  };

  // ── Auth state listener — restores session on app restart ─────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.role !== 'admin') {
              setCurrentUser({ ...userData, uid: user.uid });
            } else {
              setCurrentUser(null);
            }
          } else {
            setCurrentUser(null);
          }
        } catch (error) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log('Logout error', error);
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, loginError, setLoginError, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
