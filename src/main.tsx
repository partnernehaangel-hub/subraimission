import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Polyfill process for browser environments (Vite/Vercel)
if (typeof window !== 'undefined' && !window.process) {
  (window as any).process = { env: {} };
}

import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

// Initialize Capacitor features
const initCapacitor = async () => {
  try {
    // Check if we are in a native platform context (Android/iOS)
    const isCapacitor = typeof window !== 'undefined' && (window as any).Capacitor;
    const isNative = isCapacitor && 
                     (window as any).Capacitor.isNativePlatform &&
                     (window as any).Capacitor.isNativePlatform();

    if (!isNative) {
      console.debug('Capacitor not detected or not native platform, running in pure web mode');
      return;
    }

    // Hide splash screen after app loads
    await SplashScreen.hide();
    
    // Set status bar style
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#4f46e5' });
  } catch (e) {
    // Fail gracefully
    console.debug('Capacitor initialization skipped or failed:', e);
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Call init after render
initCapacitor();
