import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// In demo mode (VITE_DEMO_MODE=true) we allow the app to start without real
// Firebase credentials by using placeholder values.  In all other environments
// the app will throw early so misconfiguration is obvious rather than silent.
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

function requireEnv(key, demoFallback) {
  const value = import.meta.env[key];
  if (!value) {
    if (isDemoMode) return demoFallback;
    throw new Error(
      `Missing required environment variable "${key}". ` +
        'Set it in your .env file or enable VITE_DEMO_MODE=true to run without Firebase.',
    );
  }
  return value;
}

// Firebase configuration — values come from .env (VITE_FIREBASE_* variables).
// See README.md for setup instructions.
const firebaseConfig = {
  apiKey:            requireEnv('VITE_FIREBASE_API_KEY',            'demo-api-key'),
  authDomain:        requireEnv('VITE_FIREBASE_AUTH_DOMAIN',        'demo.firebaseapp.com'),
  projectId:         requireEnv('VITE_FIREBASE_PROJECT_ID',         'demo-project'),
  storageBucket:     requireEnv('VITE_FIREBASE_STORAGE_BUCKET',     'demo.appspot.com'),
  messagingSenderId: requireEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', '000000000000'),
  appId:             requireEnv('VITE_FIREBASE_APP_ID',             '1:000000000000:web:0000000000000000'),
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
