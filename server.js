const express = require('express');
const path = require('path');
const app = express();

// Serve static files from current directory
app.use(express.static(__dirname));

// Simple route handler for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple route handlers for each HTML page
app.get('/servicios.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'servicios.html'));
});

app.get('/casos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'casos.html'));
});

app.get('/como-trabajamos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'como-trabajamos.html'));
});

app.get('/porque-elefante.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'porque-elefante.html'));
});

app.get('/apps-plataformas.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps-plataformas.html'));
});

app.get('/saas-multivendor.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'saas-multivendor.html'));
});

app.get('/white-label.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'white-label.html'));
});

app.get('/inteligencia-artificial.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'inteligencia-artificial.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Elefante Lab website running on http://0.0.0.0:${PORT}`);
});