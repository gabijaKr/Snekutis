import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.snekutis.app',
  appName: 'Snekutis',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};
export default config;