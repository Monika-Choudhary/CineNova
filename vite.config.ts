import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
// Name deines GitHub-Repos
  plugins: [
    tailwindcss(),
  ],
})