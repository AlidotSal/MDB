import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";

export default defineConfig({
	plugins: [
		solidPlugin(),
		Unocss({
			rules: [
				["shadow-even-blue", { "box-shadow": "0 0 0 2px #4c9de6" }],
				["overflow-overlay", { overflow: "overlay" }],
				[
					"shadow-even-white",
					{ "box-shadow": "0 0 0 1px #fff, 0 0 1px 1px #333" },
				],
			],
		}),
	],
	build: { target: "esnext", polyfillDynamicImport: false },
	optimizeDeps: { exclude: ["@rturnq/solid-router"] },
});
