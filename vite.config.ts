import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: "/CineNova/", // Name deines GitHub-Repos
  plugins: [
    tailwindcss(),
  ],
})