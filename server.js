const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'ElefanteLab server is running',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files with cache control
app.use(express.static(__dirname, {
  setHeaders: (res, path) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ ElefanteLab servidor iniciado en puerto ${PORT}`);
  console.log(`🌐 Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`🔍 Health check: http://0.0.0.0:${PORT}/health`);
});