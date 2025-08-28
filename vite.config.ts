import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Project Pages live at /Website-T1/ so assets must be prefixed the same
  base: '/Website-T1/',
})
