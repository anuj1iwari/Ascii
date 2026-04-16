import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      
      // Ye block browser code mein 'process.env' ko available karwata hai
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY || ""),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY || ""),
        'process.env.NODE_ENV': JSON.stringify(mode),
      },
      
      resolve: {
        alias: {
          // '@' ko root directory se map kar rahe hain
          '@': path.resolve(__dirname, './'),
        }
      },
      
      build: {
        outDir: 'dist',
        sourcemap: false,
        // Chunk size warning limit ko thoda badha dete hain
        chunkSizeWarningLimit: 1000,
      }
    };
});
