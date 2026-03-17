'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Email service (IONOS SMTP via email-service.js) ───────────────────────────
const { sendEmail, verifyConnection, config: emailConfig } = require('./email-service');

const PORT = process.env.PORT || 3000;

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseFormBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const params = new URLSearchParams(body);
        const data = {};
        for (const [k, v] of params.entries()) data[k] = v;
        resolve(data);
      } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

// ── Contact form handler ──────────────────────────────────────────────────────
async function handleContact(req, res) {
  let data;
  try {
    data = await parseFormBody(req);
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Datos del formulario invalidos.' }));
    return;
  }

  const nombre   = (data.nombre   || '').trim();
  const email    = (data.email    || '').trim();
  const empresa  = (data.empresa  || '').trim();
  const proyecto = (data.proyecto || data.tipo_proyecto || data.asunto || '').trim();
  const mensaje  = (data.mensaje  || '').trim();

  if (!nombre || !email) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Por favor completa tu nombre y email.' }));
    return;
  }

  // Guardar siempre en contacts.log como respaldo
  const timestamp = new Date().toISOString();
  const logLine = JSON.stringify({ timestamp, nombre, email, empresa, proyecto, mensaje }) + '\n';
  fs.appendFile(path.join(__dirname, 'contacts.log'), logLine, () => {});

  // Construir email HTML
  const subject = '[Elefante Lab] Nuevo contacto de ' + nombre + (empresa ? ' - ' + empresa : '');
  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:linear-gradient(135deg,#7C3AED,#5B21B6);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700">Nuevo contacto - Elefante Lab</h1>
        <p style="color:#DDD6FE;margin:4px 0 0;font-size:13px">${timestamp}</p>
      </div>
      <div style="padding:28px 32px">
        <table cellpadding="8" style="width:100%;font-size:14px;border-collapse:collapse">
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;width:110px;font-weight:600">Nombre</td>
            <td style="color:#111827;font-weight:500">${nombre}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;font-weight:600">Email</td>
            <td><a href="mailto:${email}" style="color:#7C3AED">${email}</a></td>
          </tr>
          ${empresa  ? '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600">Empresa</td><td style="color:#111827">' + empresa + '</td></tr>' : ''}
          ${proyecto ? '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600">Proyecto</td><td style="color:#111827">' + proyecto + '</td></tr>' : ''}
          ${mensaje  ? '<tr><td style="color:#6B7280;font-weight:600;vertical-align:top">Mensaje</td><td style="color:#111827;line-height:1.6">' + mensaje.replace(/\n/g, '<br>') + '</td></tr>' : ''}
        </table>
      </div>
      <div style="background:#F9FAFB;padding:16px 32px;font-size:12px;color:#9CA3AF;text-align:center">
        Enviado automaticamente desde el formulario de contacto de Elefante Lab
      </div>
    </div>
  `;

  const result = await sendEmail({
    to:      emailConfig.mailTo,
    subject,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    console.warn('[server] Email no enviado:', result.error, '- guardado en contacts.log');
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: 'Mensaje recibido! Nos pondremos en contacto contigo pronto.',
  }));
}

// ── HTTP server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  console.log(req.method + ' ' + req.url);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  // Contact form API
  if (req.method === 'POST' && (req.url === '/api/contact' || req.url === '/send-email.php')) {
    await handleContact(req, res);
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', port: PORT }));
    return;
  }

  // Archivos estaticos
  let file = req.url === '/' ? 'index.html' : req.url.slice(1);
  file = file.split('?')[0]; // quitar query strings

  if (!path.extname(file) && file !== 'index.html' && !fs.existsSync(path.join(__dirname, file))) {
    file = 'index.html';
  }

  fs.readFile(path.join(__dirname, file), (err, fileData) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('No encontrado: ' + file);
      return;
    }
    const types = {
      '.html':'text/html; charset=utf-8', '.css':'text/css',
      '.js':'application/javascript', '.json':'application/json',
      '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
      '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon',
    };
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain', 'Cache-Control':'no-cache' });
    res.end(fileData);
    console.log('Servido:', file);
  });
});

server.on('error', (err) => {
  console.error('Error servidor:', err.message);
  if (err.code === 'EADDRINUSE') process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('\nElefanteLab servidor en puerto ' + PORT);
  console.log('http://0.0.0.0:' + PORT + '/\n');
  verifyConnection();
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT',  () => server.close(() => process.exit(0)));
