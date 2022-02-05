/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ["utils/**/*.test.{js,ts}"],
    watch: true,
    global: true
  },
})