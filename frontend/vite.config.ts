import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: "terser",
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["lucide-react"],
        },
        // Add content hash to file names for cache busting
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
    // Set chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Enable compression
  server: {
    host: true,
    port: 5173,
  },
  // Optimize assets
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.gif", "**/*.svg"],
});
