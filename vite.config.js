import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/distributive%20property/', // Use the exact repo name
  plugins: [react()],
})
