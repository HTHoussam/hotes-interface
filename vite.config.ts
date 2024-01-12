import react from '@vitejs/plugin-react';
import path from 'path';
/// <reference types="vitest" />
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: [
      ...configDefaults.exclude,
      'packages/template/*',
      '*.{config,options}.*',
      './src/configs/**',
      './src/locale/**',
      './src/theme/**',
      './src/types/**',
      './src/hooks/**',
    ],
    coverage: {
      provider: 'v8',
      exclude: [
        '*.{config,options}.*',
        '**/*.eslint*',
        'coverage/**',
        '**/*.spec.*',
        '.nuxt/**',
        'dist/**',
        '.*.{js|ts}',
        '**/*/index.ts',
        '**/*.d.*',
        '**/*/enums/*',
        '**/*model*',
        '**/*model*',
        'src/mocks/**',
        'src/types/**',
        'src/theme/**',
        'src/locale/**',
        'src/configs/**',
        'src/hooks/**',
        'src/libs/**',
      ],
    },
    setupFiles: '/src/configs/setupTest.ts',
    watch: false,
    outputFile: './coverage/test-report.xml',
  },

  server: {
    port: 3000,
  },
});
