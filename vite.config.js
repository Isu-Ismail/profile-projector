// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // This ensures assets are loaded from the correct GitHub Pages path:
  // https://lsu-ismail.github.io/profile-projector/
  base: '/profile-projector/', 
  plugins: [react()],
});