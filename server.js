const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', port: PORT }));
    return;
  }

  // Archivo
  let file = req.url === '/' ? 'index.html' : req.url.slice(1);
  
  // Si no tiene extensión, servir index.html
  if (!path.extname(file) && file !== 'index.html') {
    file = 'index.html';
  }

  const filePath = path.join(__dirname, file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error:', err.message);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('No encontrado: ' + file);
      return;
    }

    const ext = path.extname(file);
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
      'Cache-Control': 'no-cache'
    });
    res.end(data);
    console.log('Servido:', file);
  });
});

server.on('error', (err) => {
  console.error('Error servidor:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Puerto ${PORT} ocupado`);
    process.exit(1);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`ElefanteLab servidor en puerto ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});

process.on('SIGTERM', () => {
  console.log('Cerrando servidor...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  server.close(() => process.exit(0));
});