import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
// If Accessing from Other Devices: in dev
// server: {
//   host: "0.0.0.0",
//   port: 5173,
// },
