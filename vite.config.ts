import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    open: true,
    host: 'localhost',
    port: 3000
  },
  define: {
    'process.env': process.env
  }
});