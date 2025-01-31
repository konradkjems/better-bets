import { defineConfig } from 'vite';
// ... andre imports ...

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: true,
    timeout: 120000
  },
  base: "/",
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  // ... resten af konfigurationen ...
}); 