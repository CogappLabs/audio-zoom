import { defineConfig } from 'vite'


// output js and css files to dist folder, not dist/assets
// Use relative paths for assets
export default defineConfig({
    server: {
        port: 3000,
    },
    base: '',
    build: {
        outDir: 'dist',
        assetsDir: './',
    },
})
