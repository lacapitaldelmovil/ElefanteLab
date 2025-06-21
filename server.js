const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  
  // Health check para deployment
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"status":"OK","port":' + PORT + '}');
    return;
  }

  // Archivo a servir
  let filePath = req.url === '/' ? 'index.html' : req.url.substring(1);
  
  // Si no tiene extensión, servir index.html (SPA routing)
  if (!path.extname(filePath) && filePath !== 'index.html') {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error leyendo archivo:', filePath, err.message);
      res.writeHead(404);
      res.end('Archivo no encontrado');
      return;
    }

    // Tipos MIME
    const ext = path.extname(filePath);
    const mimes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    };

    const contentType = mimes[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ElefanteLab en puerto ${PORT}`);
});

server.on('error', (err) => {
  console.error('Error servidor:', err.message);
});