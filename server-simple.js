const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta para el health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', port: PORT });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ElefanteLab en puerto ${PORT}`);
});