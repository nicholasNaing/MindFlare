import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
console.log("object");
export default defineConfig(({command})=>{
  const config = {
    plugins: [react()],
    base:"/"
    
  }
  if(command !== "serve"){
    console.log("running")
    config.base = "/MindFlare/"
  }
  return config
})
