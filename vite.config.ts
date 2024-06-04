import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "swiper/swiper.min.css"; @import "swiper/modules/navigation/navigation.min.css"; @import "swiper/modules/pagination/pagination.min.css"; @import "swiper/modules/autoplay/autoplay.min.css";`
      }
    }
  }
});
