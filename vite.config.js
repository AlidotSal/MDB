import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [solidPlugin(), Unocss({ 
    rules: [
      ['shadow-even-blue', { 'box-shadow': '0 0 0 2px #4c9de6' }],
    ],
  })],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  optimizeDeps: {
    exclude: ["@rturnq/solid-router"],
  },
});
