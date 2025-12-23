
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM as it is not globally available in this environment
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Fix: Use __dirname instead of process.cwd() to resolve project root and avoid Process typing issues
  const env = loadEnv(mode, __dirname, '');
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || "";
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        // Fix: __dirname is now explicitly defined to support path resolution in ESM
        '@': path.resolve(__dirname, './'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
    }
  };
});
