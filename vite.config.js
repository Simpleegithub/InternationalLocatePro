import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
      // You can add other ESLint options here if needed
      overrideConfig: {
        rules: {
          'no-unused-vars': 'warn',
        },
      },
    }),
  ],
});
