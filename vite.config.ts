import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                login: 'login.html',
                register: 'register.html',
                calculator: 'calculator.html',
                about: 'about.html',
                pricing: 'pricing.html',
                contact: 'contact.html'
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            }
        }
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer
            ]
        }
    }
}); 