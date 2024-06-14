import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'RestauApp',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  
};

export default config;
