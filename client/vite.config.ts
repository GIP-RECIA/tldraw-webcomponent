import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/tldraw-webcomponent-[name].[ext]",
        entryFileNames: "assets/tldraw-webcomponent-[name].js",
        chunkFileNames: "assets/tldraw-webcomponent-[name].js",
      },
    },
  },
});
