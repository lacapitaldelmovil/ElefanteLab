const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Health check endpoint
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', port: PORT }));
    return;
  }

  // Determinar archivo a servir
  let requestPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(__dirname, requestPath);

  // Verificar si el archivo existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Si no existe y no tiene extensión, servir index.html para SPA routing
      if (!path.extname(requestPath)) {
        filePath = path.join(__dirname, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Archivo no encontrado');
        return;
      }
    }

    // Leer y servir archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error del servidor');
        return;
      }

      // Determinar Content-Type
      const ext = path.extname(filePath);
      const contentTypes = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      };

      const contentType = contentTypes[ext] || 'text/plain';
      
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error al iniciar servidor:', err);
    process.exit(1);
  }
  console.log(`ElefanteLab servidor en puerto ${PORT}`);
});

server.on('error', (err) => {
  console.error('Error del servidor:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Puerto ${PORT} en uso`);
  }
});

process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  server.close(() => {
    process.exit(0);
  });
});