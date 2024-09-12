import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});


// Explanation:

//     Remix Plugin: The Remix plugin (@remix-run/dev) is essential for a Remix project. Ensure it’s correctly imported and used.
//     TypeScript Paths: The tsconfigPaths() plugin helps resolve paths based on your tsconfig.json file.
//     React Plugin: The React plugin is included to ensure that React is correctly integrated into your Vite project.