import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 43123,
    host: '0.0.0.0',
    strictPort: true,
  },
  preview: {
    port: 43123,
    host: '0.0.0.0',
    strictPort: true,
  },
});
