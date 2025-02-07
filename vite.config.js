import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // automatically update service worker
      manifest: {
        name: "My Awesome React App",
        short_name: "MyApp",
        description: "An awesome React application",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // you can customize workbox options here if needed
      },
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     external: ["react-error-boundary","styled-components","react-router-dom","react-icons/bi"],
  //   },
  // },
});
