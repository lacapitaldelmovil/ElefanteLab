const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos
app.use(express.static('.'));

// Ruta para el index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Elefante Lab sitio web funcionando en http://0.0.0.0:${PORT}`);
    console.log(`📱 Tu sitio web está listo para ver!`);
});