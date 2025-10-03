import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// Configuration
const API_URL = 'http://localhost:8000'; // Ganti dengan URL API Anda

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(API_URL + '/api')
  },
});