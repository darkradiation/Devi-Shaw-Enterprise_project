import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     external: ["react-error-boundary","styled-components","react-router-dom","react-icons/bi"],
  //   },
  // },
})
