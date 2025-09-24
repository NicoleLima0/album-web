import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseroot } from './src/constants/defaultValues'

export default defineConfig({
  base: `${baseroot}/`,
  plugins: [react()],
})
