import pkg from './package.json';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: process.env.VITE_BASE_URI,
    plugins: [react(), cssInjectedByJsPlugin()],
    build: {
      lib: {
        entry: './src/main.tsx',
        name: pkg.name,
      },
    },
    define: {
      'process.env': process.env,
    },
  });
};
