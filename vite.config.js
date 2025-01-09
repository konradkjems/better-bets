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
        main: 'index.html',
        login: 'login.html',
        register: 'register.html',
        about: 'about.html',
        pricing: 'pricing.html',
        contact: 'contact.html'
      }
    }
  },
  // ... resten af konfigurationen ...
}); 