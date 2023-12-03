import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isServe = process.env.MODE === 'serve';

const config = defineConfig({
  plugins: [react()],
  base: isServe ? '/' : '/MindFlare/',
});

export default config;