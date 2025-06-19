import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createServer as createViteServer } from 'vite'

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
  })

  app.use(vite.ssrFixStacktrace)
  app.use(vite.middlewares)

  const port = process.env.PORT || 5173
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`)
  })
}

createServer().catch(console.error)