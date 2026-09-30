import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const netlify = process.env["NETLIFY"]
  ? (await import("@netlify/vite-plugin-tanstack-start")).default
  : undefined;

export default defineConfig({
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    // Only load the Netlify adapter for Netlify builds so other hosts (e.g. Railway) are unaffected.
    ...(netlify ? [netlify()] : []),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
