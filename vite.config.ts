import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },

  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "react",
        /* jsxImportSource: …, otherOptions… */
      }),
    },

    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
});
