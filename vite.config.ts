import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Unocss from "unocss/vite";
import presetWind4 from "@unocss/preset-wind4";
import presetTypography from "@unocss/preset-typography";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
      },
    }),
    Unocss({
      presets: [presetWind4(), presetTypography()],
    }),
  ],
});
