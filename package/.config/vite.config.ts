/// <reference types="vitest" />

import { defineConfig } from "vite"

export default defineConfig({
	test: {
		include: ["src/**/*.test.{js,ts}"],
		watch: true,
		globals: true,
	},
})
