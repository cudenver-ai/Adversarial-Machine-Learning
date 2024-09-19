import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps for production
  },
  esbuild: {
    loader: "jsx", // Treat .js files with JSX syntax as JSX
    include: /\.(js|jsx)$/, // Include both .js and .jsx files for JSX processing
    exclude: /node_modules/, // Exclude node_modules
    sourcemap: false,
  },
  server: {
    // Set this to "0.0.0.0" to allow access from other devices on the network
    host: "localhost",
    port: 5173,
    proxy: {
      "/api": {
        // Proxy requests to the Flask backend
        changeOrigin: true,
        target: "http://127.0.0.1:5000",
        secure: false,
      },
    },
  },
});
