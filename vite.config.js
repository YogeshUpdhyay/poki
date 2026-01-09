import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    allowedHosts: ['localhost', 'e1131c4bf1b9.ngrok-free.app'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
