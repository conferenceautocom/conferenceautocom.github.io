import { defineConfig } from 'vite';

export default defineConfig({
    base: '/', // Base path for root hosting (autocom.org.in)
    server: {
        port: 5180,
    },
    build: {
        outDir: 'dist',
    }
});
