import { defineConfig } from 'vite';

export default defineConfig({
    base: '/', // Base path for GitHub Pages root hosting
    build: {
        outDir: 'dist',
    }
});
