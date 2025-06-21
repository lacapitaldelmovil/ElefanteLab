const express = require('express');
const path = require('path');
// const cors = require('cors'); // Removing cors dependency for now

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
// app.use(cors()); // Commented out cors for now
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Health check endpoint for deployment
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ElefanteLab server is running' });
});

// Serve static files
app.use(express.static('.', {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
}));

// Handle React Router (wouter) client-side routing
app.get('*', (req, res) => {
  // If the request is for a file with an extension, try to serve it as static
  if (path.extname(req.path)) {
    res.status(404).send('File not found');
  } else {
    // For routes without extensions, serve index.html for client-side routing
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ ElefanteLab servidor iniciado en puerto ${PORT}`);
  console.log(`🌐 Accede a: http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});