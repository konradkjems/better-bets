import { defineConfig } from 'vite';
// ... andre imports ...

export default defineConfig({
  server: {
    port: 5173,
    open: '/index.html',
    host: true,
    strictPort: true,
    timeout: 120000
  },
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        calculator: 'calculator.html'
      }
    }
  },
  optimizeDeps: {
    include: []
  },
  // ... resten af konfigurationen ...
}); 