'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');

// ── Email service (IONOS SMTP via email-service.js) ───────────────────────────
const { sendEmail, verifyConnection, config: emailConfig } = require('./email-service');

// ── CRM de La Capital (API leads-web) ─────────────────────────────────────────
const leads = require('./leads-service');

const PORT = process.env.PORT || 3000;
const MAX_BODY = 200 * 1024;

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

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > MAX_BODY) { reject(new Error('Cuerpo demasiado grande')); req.destroy(); }
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('JSON no es un objeto');
        resolve(data);
      } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

// Ruta de la página desde la que se envió el formulario (cabecera Referer)
function refererPath(req) {
  try { return new URL(req.headers.referer || '').pathname; } catch { return ''; }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  const telefono = (data.telefono || '').trim();
  const empresa  = (data.empresa  || '').trim();
  const asunto   = (data.asunto   || '').trim();
  const tipo     = (data.tipo_proyecto || data.proyecto || '').trim();
  const proyecto = (data.proyecto || data.tipo_proyecto || data.asunto || '').trim();
  const mensaje  = (data.mensaje  || '').trim();
  const pagina   = refererPath(req);

  if (!nombre || !email) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Por favor completa tu nombre y email.' }));
    return;
  }

  if (!isValidEmail(email)) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Por favor escribe un email valido.' }));
    return;
  }

  // Guardar siempre en contacts.log como respaldo
  const timestamp = new Date().toISOString();
  const logLine = JSON.stringify({ timestamp, nombre, email, telefono, empresa, proyecto, mensaje, pagina }) + '\n';
  fs.appendFile(path.join(__dirname, 'contacts.log'), logLine, () => {});

  // Construir email HTML
  const subject = '[Elefante Lab] Nuevo contacto de ' + nombre + (empresa ? ' - ' + empresa : '');
  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeEmpresa = escapeHtml(empresa);
  const safeProyecto = escapeHtml(proyecto);
  const safeMensaje = escapeHtml(mensaje).replace(/\n/g, '<br>');
  const html = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:linear-gradient(135deg,#1679B8,#0A4280);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700">Nuevo contacto - Elefante Lab</h1>
        <p style="color:#CFE6F7;margin:4px 0 0;font-size:13px">${timestamp}</p>
      </div>
      <div style="padding:28px 32px">
        <table cellpadding="8" style="width:100%;font-size:14px;border-collapse:collapse">
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;width:110px;font-weight:600">Nombre</td>
            <td style="color:#111827;font-weight:500">${safeNombre}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;font-weight:600">Email</td>
            <td><a href="mailto:${safeEmail}" style="color:#1679B8">${safeEmail}</a></td>
          </tr>
          ${telefono ? '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600">Teléfono</td><td style="color:#111827">' + escapeHtml(telefono) + '</td></tr>' : ''}
          ${empresa  ? '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600">Empresa</td><td style="color:#111827">' + safeEmpresa + '</td></tr>' : ''}
          ${proyecto ? '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600">Proyecto</td><td style="color:#111827">' + safeProyecto + '</td></tr>' : ''}
          ${mensaje  ? '<tr><td style="color:#6B7280;font-weight:600;vertical-align:top">Mensaje</td><td style="color:#111827;line-height:1.6">' + safeMensaje + '</td></tr>' : ''}
        </table>
      </div>
      <div style="background:#F9FAFB;padding:16px 32px;font-size:12px;color:#9CA3AF;text-align:center">
        Enviado automaticamente desde el formulario de contacto de Elefante Lab
      </div>
    </div>
  `;

  // Los formularios de afiliados y empleo llevan un asunto oculto fijo; el de cotizar
  // se reconoce por la página de origen.
  let formulario = 'Contacto';
  if (/afiliad/i.test(asunto)) formulario = 'Afiliados';
  else if (/candidatura/i.test(asunto)) formulario = 'Empleo';
  else if (/cotiza-tu-proyecto/.test(pagina)) formulario = 'Cotización';

  // CRM y correo en paralelo: basta con que llegue por una de las dos vías
  const [lead, result] = await Promise.all([
    leads.sendLead({
      formulario,
      nombre,
      email,
      telefono,
      empresa,
      asunto: asunto || (tipo ? 'Contacto web: ' + tipo : 'Contacto web'),
      tipo_proyecto: tipo,
      mensaje: mensaje || asunto || tipo || 'Sin mensaje',
      newsletter: data.newsletter ? true : undefined,
      briefing: pagina ? [{ pregunta: 'Página', respuesta: pagina }] : undefined,
    }),
    sendEmail({
      to:      emailConfig.mailTo,
      subject,
      html,
      replyTo: email,
    }),
  ]);

  if (!lead.ok && !result.ok) {
    console.warn('[server] Contacto no entregado. CRM:', lead.error, '| Email:', result.error, '- guardado en contacts.log');
    sendJson(res, 503, {
      success: false,
      message: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.',
    });
    return;
  }
  if (!result.ok) console.warn('[server] Email no enviado (sí llegó al CRM):', result.error);

  sendJson(res, 200, {
    success: true,
    message: 'Mensaje recibido! Nos pondremos en contacto contigo pronto.',
  });
}

// ── Briefing (formulario-briefing.html) ───────────────────────────────────────
// Campos que ya van como datos del lead y no se repiten en el briefing
const BRIEFING_CAMPOS_LEAD = ['persona_contacto', 'email', 'telefono', 'empresa_cliente', '_preguntas'];

async function handleBriefing(req, res) {
  let data;
  try {
    data = await parseJsonBody(req);
  } catch {
    sendJson(res, 400, { success: false, message: 'Datos del formulario invalidos.' });
    return;
  }

  const str = (v) => (typeof v === 'string' ? v.trim() : '');
  const nombre   = str(data.persona_contacto) || str(data.nombre_responsable);
  const email    = str(data.email);
  const telefono = str(data.telefono);

  if (!nombre || (!email && !telefono)) {
    sendJson(res, 422, { success: false, message: 'Faltan tu nombre y un email o teléfono de contacto.' });
    return;
  }
  if (email && !isValidEmail(email)) {
    sendJson(res, 422, { success: false, message: 'Por favor escribe un email valido.' });
    return;
  }

  // briefing.js manda el texto de cada pregunta en _preguntas; si falta,
  // se usa el nombre del campo legible ("nombre_proyecto" -> "Nombre proyecto").
  const preguntas = (data._preguntas && typeof data._preguntas === 'object') ? data._preguntas : {};
  const humanize = (k) => k.replace(/_/g, ' ').replace(/^./, c => c.toUpperCase());
  const briefing = Object.entries(data)
    .filter(([k, v]) => !BRIEFING_CAMPOS_LEAD.includes(k) && typeof v === 'string' && v.trim() && v !== 'No')
    .map(([k, v]) => ({ pregunta: str(preguntas[k]) || humanize(k), respuesta: v.trim() }));

  const timestamp = new Date().toISOString();
  fs.appendFile(path.join(__dirname, 'briefing-submissions.log'), JSON.stringify({ timestamp, ...data }) + '\n', () => {});

  const empresa = str(data.empresa_cliente);
  const tipo    = str(data.tipo_proyecto);
  const lead = await leads.sendLead({
    formulario: 'Briefing',
    nombre,
    email,
    telefono,
    empresa,
    asunto: str(data.nombre_proyecto) || ('Briefing' + (empresa ? ' · ' + empresa : '')),
    tipo_proyecto: tipo,
    pais: str(data.ciudad_pais),
    mensaje: str(data.idea_proyecto) || str(data.problema_necesidad),
    briefing,
  });

  // Copia por correo con todas las respuestas
  const rows = briefing.map(({ pregunta, respuesta }) =>
    '<tr style="border-bottom:1px solid #f3f4f6"><td style="color:#6B7280;font-weight:600;vertical-align:top;width:40%">' +
    escapeHtml(pregunta) + '</td><td style="color:#111827;line-height:1.5">' + escapeHtml(respuesta).replace(/\n/g, '<br>') + '</td></tr>'
  ).join('');
  const html = `
    <div style="font-family:Inter,sans-serif;max-width:680px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1679B8,#0A4280);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700">Nuevo briefing - Elefante Lab</h1>
        <p style="color:#CFE6F7;margin:4px 0 0;font-size:13px">${escapeHtml(nombre)}${empresa ? ' · ' + escapeHtml(empresa) : ''} · ${timestamp}</p>
      </div>
      <div style="padding:24px 32px">
        <p style="font-size:14px;margin:0 0 16px">Email: ${escapeHtml(email) || '-'} · Teléfono: ${escapeHtml(telefono) || '-'}</p>
        <table cellpadding="8" style="width:100%;font-size:14px;border-collapse:collapse">${rows}</table>
      </div>
    </div>
  `;
  const result = await sendEmail({
    to:      emailConfig.mailTo,
    subject: '[Elefante Lab] Nuevo briefing de ' + nombre + (empresa ? ' - ' + empresa : ''),
    html,
    replyTo: email || undefined,
  });

  if (!lead.ok && !result.ok) {
    console.warn('[server] Briefing no entregado. CRM:', lead.error, '| Email:', result.error, '- guardado en briefing-submissions.log');
    sendJson(res, 503, {
      success: false,
      message: 'No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos por WhatsApp.',
    });
    return;
  }

  sendJson(res, 200, {
    success: true,
    message: 'Briefing recibido. Te contactaremos pronto.',
    referencia: lead.ok ? lead.data.referencia : undefined,
  });
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

  if (req.method === 'POST' && req.url === '/api/briefing') {
    await handleBriefing(req, res);
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', port: PORT }));
    return;
  }

  // lab.elefantesolutions.com es el dominio canonico del sitio (el
  // <link rel="canonical"> de todas las paginas). elefantelab.com no esta
  // registrado, asi que no se redirige ahi.
  const hostHeader = (req.headers.host || '').toLowerCase().split(':')[0];
  if (hostHeader === 'elefantelab-production.up.railway.app') {
    res.writeHead(301, { 'Location': 'https://lab.elefantesolutions.com' + req.url });
    res.end();
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
      // SEO y ficheros para asistentes de IA: robots.txt, sitemap.xml,
      // llms.txt, ai-answers.md. Sin esto salian como text/plain a secas.
      '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8',
      '.xml':'application/xml; charset=utf-8', '.webmanifest':'application/manifest+json',
    };
    const ext = path.extname(file);
    // HTML: no-store so browser always fetches fresh. Assets: cache OK (versioned).
    const SEO_EXTS = ['.txt', '.md', '.xml', '.json'];
    const cacheHeader = ext === '.html'
      ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
      : SEO_EXTS.includes(ext)
        ? 'public, max-age=3600'
        : 'public, max-age=31536000, immutable';
    res.writeHead(200, {
      'Content-Type':  types[ext] || 'text/plain',
      'Cache-Control': cacheHeader,
      'Pragma':        ext === '.html' ? 'no-cache' : '',
      'Expires':       ext === '.html' ? '0' : '',
    });
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
  console.log(leads.isConfigured()
    ? '[leads] CRM activo -> ' + leads.config.url + (leads.config.prueba ? ' (modo prueba)' : '')
    : '[leads] ELEFANTE_LEADS_KEY no configurada: los formularios solo se envian por email');
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT',  () => server.close(() => process.exit(0)));
