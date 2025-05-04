import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    reporters: ['verbose'],
    outputFile: {
      console: true,
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
    },
    logHeapUsage: true,
    silent: false,
    watch: false,
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['node_modules', 'dist'],
    testTimeout: 10000,
    hookTimeout: 10000,
  },
}) 