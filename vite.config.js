import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isServe = process.env.NODE_ENV === 'development';

const config = defineConfig({
  plugins: [react()],
  base: isServe ? '/' : '/MindFlare/',
});

export default config;
