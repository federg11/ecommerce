import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://techinsumos-backend.onrender.com/api')
  },
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
})
