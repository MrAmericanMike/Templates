import { defineConfig } from "vite";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
	root: "src",
	build: {
		minify: true,
		outDir: "../public",
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/[name].[ext]"
			}
		}
	},
	plugins: [
		terser()
	]
});

