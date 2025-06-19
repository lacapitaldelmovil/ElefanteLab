const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page.html', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, `${page}.html`);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Elefante Lab website: https://workspace.admin2198.repl.co`);
  console.log(`Local port: ${PORT}`);
});