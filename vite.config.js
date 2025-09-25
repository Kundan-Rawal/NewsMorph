import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [react(),VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'NewsMorph',
      short_name: 'NewsMorph',
      description: 'Morph your news. Read it your way.',
      theme_color: '#C20202',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: "https://i.postimg.cc/ydddCRjM/Chat-GPT-Image-Apr-18-2025-08-38-49-AM-1.png",
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: "https://i.postimg.cc/7YPB8Zrg/Chat-GPT-Image-Apr-18-2025-08-38-49-AM.png",
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }),],
  build: {
    outDir: 'build'
  },
  // This is key 👇
  server: {
    historyApiFallback: true
  }
})