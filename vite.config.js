import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/distributive_property/', // Correct: underscore, not space
  plugins: [react()],
})
