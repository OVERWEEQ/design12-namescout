import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        home: 'home.html',
        category: 'category.html',
        article: 'article.html',
        jungennamen: 'jungennamen.html',
      },
    },
  },
});