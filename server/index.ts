import express from 'express'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function createServer() {
  const app = express()
  
  app.use(cors())
  app.use(express.json())

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: join(__dirname, '..'),
    resolve: {
      alias: {
        '@': join(__dirname, '../client/src'),
        '@shared': join(__dirname, '../shared'),
        '@assets': join(__dirname, '../client/src/assets')
      }
    }
  })

  app.use(vite.ssrFixStacktrace)
  app.use(vite.middlewares)

  const port = Number(process.env.PORT) || 5173
  app.listen(port, '0.0.0.0', () => {
    console.log(`Elefante Lab server running on http://0.0.0.0:${port}`)
  })
}

createServer().catch(console.error)