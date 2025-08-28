import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // "/" for dev; GitHub Pages will pass VITE_BASE="/<repo>/" in the workflow
  base: process.env.VITE_BASE || '/',
})
