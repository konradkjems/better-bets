import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                calculator: 'calculator.html'
            },
            external: ['/api/*']
        }
    },
    server: {
        port: 3000
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer
            ]
        }
    },
    optimizeDeps: {
        exclude: ['/api/*']
    },
    resolve: {
        alias: {
            '/api': false
        }
    },
    publicDir: false,
    assetsInclude: []
});