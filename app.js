const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  // Health check obligatorio para deployment
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"status":"OK","port":' + PORT + '}');
    return;
  }

  // Si es la raíz, servir index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Si no encuentra el archivo y no tiene extensión, servir index.html
      if (!path.extname(req.url)) {
        fs.readFile(path.join(__dirname, 'index.html'), (err, indexData) => {
          if (err) {
            res.writeHead(404);
            res.end('Página no encontrada');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexData);
        });
        return;
      }
      res.writeHead(404);
      res.end('Archivo no encontrado');
      return;
    }

    // Tipos de contenido
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
  console.log('ElefanteLab servidor corriendo en puerto ' + PORT);
});

server.on('error', (err) => {
  console.error('Error del servidor:', err.message);
});