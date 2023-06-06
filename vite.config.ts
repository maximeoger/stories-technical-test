import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'domains': path.resolve(__dirname, './src/domains'),
      'infrastructure': path.resolve(__dirname, './src/infrastructure')
    }
  },
  plugins: [react()],
})
