'use strict';

const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

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

function parseJsonBody(req) {
  const MAX_SIZE = 300 * 1024; // 300kb, de sobra para el briefing
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_SIZE) {
        reject(new Error('Payload demasiado grande'));
        req.destroy();
        return;
      }
      body += chunk.toString();
    });
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')); } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
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
  const empresa  = (data.empresa  || '').trim();
  const proyecto = (data.proyecto || data.tipo_proyecto || data.asunto || '').trim();
  const mensaje  = (data.mensaje  || '').trim();

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
  const logLine = JSON.stringify({ timestamp, nombre, email, empresa, proyecto, mensaje }) + '\n';
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
      <div style="background:linear-gradient(135deg,#7C3AED,#5B21B6);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700">Nuevo contacto - Elefante Lab</h1>
        <p style="color:#DDD6FE;margin:4px 0 0;font-size:13px">${timestamp}</p>
      </div>
      <div style="padding:28px 32px">
        <table cellpadding="8" style="width:100%;font-size:14px;border-collapse:collapse">
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;width:110px;font-weight:600">Nombre</td>
            <td style="color:#111827;font-weight:500">${safeNombre}</td>
          </tr>
          <tr style="border-bottom:1px solid #f3f4f6">
            <td style="color:#6B7280;font-weight:600">Email</td>
            <td><a href="mailto:${safeEmail}" style="color:#7C3AED">${safeEmail}</a></td>
          </tr>
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

  const result = await sendEmail({
    to:      emailConfig.mailTo,
    subject,
    html,
    replyTo: email,
  });

  if (!result.ok) {
    console.warn('[server] Email no enviado:', result.error, '- guardado en contacts.log');
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: false,
      message: 'No pudimos enviar el correo. Revisa la configuracion SMTP en Railway.',
    }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: 'Mensaje recibido! Nos pondremos en contacto contigo pronto.',
  }));
}

// ── Formulario de briefing (formulario-briefing.html) ─────────────────────────
const BRIEFING_LOG_FILE = path.join(__dirname, 'briefing-submissions.log');

const BRIEFING_SECTIONS = [
  { title: 'Datos de contacto', fields: [
    ['empresa_cliente', 'Empresa / cliente'],
    ['persona_contacto', 'Persona de contacto'],
    ['email', 'Email'],
    ['telefono', 'Teléfono / WhatsApp'],
    ['ciudad_pais', 'Ciudad y país'],
    ['fecha_cumplimentacion', 'Fecha de cumplimentación'],
  ]},
  { title: 'Tipo de proyecto', fields: [
    ['tipo_proyecto', 'Qué necesita desarrollar'],
    ['nombre_proyecto', 'Nombre provisional'],
    ['url_existente', '¿Existe actualmente?'],
    ['idea_proyecto', 'Idea del proyecto'],
  ]},
  { title: 'Negocio y objetivos', fields: [
    ['actividad_negocio', 'Actividad del negocio'],
    ['problema_necesidad', 'Problema / necesidad'],
    ['objetivos_principales', 'Objetivos principales'],
    ['resultado_1', 'Resultado 1'],
    ['resultado_2', 'Resultado 2'],
    ['resultado_3', 'Resultado 3'],
    ['como_sabremos_funciono', 'Cómo sabremos que funcionó'],
  ]},
  { title: 'Público y experiencia', fields: [
    ['descripcion_usuarios', 'Usuarios / clientes principales'],
    ['paises_zonas', 'Países o zonas'],
    ['idiomas_necesarios', 'Idiomas necesarios'],
    ['necesidad_usuario', 'Necesidad del usuario'],
    ['tipos_usuario', 'Tipos de usuario'],
    ['recorrido_usuario', 'Recorrido del usuario'],
    ['accion_importante', 'Acción más importante'],
    ['como_te_descubre', 'Cómo te descubre'],
    ['accesibilidad', 'Accesibilidad'],
  ]},
  { title: 'Diseño, marca y contenido', fields: [
    ['materiales_marca', 'Materiales de marca'],
    ['estilo_visual', 'Estilo visual'],
    ['colores_preferidos', 'Colores preferidos'],
    ['colores_evitar', 'Colores a evitar'],
    ['referencias_visuales', 'Referencias'],
    ['estado_contenidos', 'Estado de los contenidos'],
    ['quien_redacta_contenido', 'Quién redacta el contenido'],
    ['fecha_entrega_contenido', 'Fecha de entrega de contenido'],
    ['tono_comunicacion', 'Tono de comunicación'],
  ]},
  { title: 'Página web', fields: [
    ['tipo_web', 'Tipo de web'],
    ['paginas_necesarias', 'Páginas necesarias'],
    ['funciones_web', 'Funciones previstas'],
    ['editar_web_uno_mismo', '¿Editar la web uno mismo?'],
    ['num_paginas_aprox', 'Número aproximado de páginas'],
    ['dominio', 'Dominio'],
    ['alojamiento_web', '¿Tiene alojamiento?'],
    ['seo_busquedas', 'SEO / búsquedas importantes'],
    ['migracion_contenidos', 'Migración de contenidos'],
  ]},
  { title: 'Tienda online', fields: [
    ['que_se_vendera', 'Qué se venderá'],
    ['num_productos_aprox', 'Número de productos aprox.'],
    ['productos_variantes', 'Variantes de producto'],
    ['catalogo_inicial_formato', 'Formato del catálogo inicial'],
    ['pagos_aceptar', 'Pagos a aceptar'],
    ['paises_venta', 'Países de venta'],
    ['monedas_necesarias', 'Monedas necesarias'],
    ['envios_transportistas', 'Envíos y transportistas'],
    ['gestion_comercial', 'Gestión comercial'],
    ['integraciones_tienda', 'Integraciones de la tienda'],
  ]},
  { title: 'Aplicación móvil', fields: [
    ['plataformas_app', 'Plataformas'],
    ['usuarios_perfiles_app', 'Usuarios y perfiles'],
    ['funciones_app', 'Funciones previstas'],
    ['funciones_app_top3', '3 funciones más importantes'],
    ['modelo_ingresos_app', 'Modelo de ingresos'],
    ['usuarios_estimados_app', 'Usuarios estimados'],
    ['cuentas_apple_google', '¿Cuentas Apple / Google?'],
    ['existe_servidor_api', '¿Existe servidor / API?'],
    ['otros_requisitos_app', 'Otros requisitos'],
  ]},
  { title: 'Integraciones, datos y seguridad', fields: [
    ['servicios_conectar', 'Servicios a conectar'],
    ['nombres_herramientas', 'Herramientas / proveedores'],
    ['datos_recopilados', 'Datos que recopilará'],
    ['datos_sensibles', 'Datos sensibles'],
    ['datos_a_importar', 'Datos a importar'],
    ['necesita_exportaciones', 'Exportaciones / informes'],
    ['requisitos_legales', 'Requisitos legales'],
    ['accesos_documentacion', 'Accesos y documentación'],
  ]},
  { title: 'Plazos, presupuesto y colaboración', fields: [
    ['fecha_inicio_ideal', 'Fecha ideal de inicio'],
    ['fecha_lanzamiento_deseada', 'Fecha de lanzamiento deseada'],
    ['fecha_lanzamiento_fija_motivo', '¿Fecha fija? Motivo'],
    ['rango_inversion', 'Rango de inversión'],
    ['presupuesto_maximo', 'Presupuesto máximo'],
    ['flexibilidad_alcance', '¿Flexibilidad de alcance?'],
    ['decisor_final', 'Decisor final'],
    ['personas_revisan', 'Personas que revisan'],
    ['canal_comunicacion', 'Canal de comunicación'],
    ['tiempo_revision_entregas', 'Tiempo de revisión de entregas'],
    ['frecuencia_seguimiento', 'Frecuencia de seguimiento'],
    ['necesidades_post_lanzamiento', 'Necesidades post-lanzamiento'],
    ['riesgos_dependencias', 'Riesgos / dependencias'],
  ]},
  { title: 'Resumen final', fields: [
    ['funciones_imprescindibles', 'Funciones imprescindibles'],
    ['funciones_deseables_fase2', 'Funciones deseables (fase 2)'],
    ['archivos_a_enviar', 'Archivos que enviará'],
    ['info_adicional', 'Información adicional'],
    ['confirma_info_correcta', 'Confirma información correcta'],
    ['autoriza_uso_materiales', 'Autoriza uso de materiales'],
    ['nombre_responsable', 'Nombre del responsable'],
    ['cargo_relacion', 'Cargo / relación'],
    ['fecha_confirmacion', 'Fecha de confirmación'],
    ['firma_aceptacion', 'Firma / aceptación'],
  ]},
];

const BRIEFING_REQUIRED_FIELDS = [
  'empresa_cliente', 'persona_contacto', 'email', 'telefono',
  'idea_proyecto', 'funciones_imprescindibles', 'nombre_responsable', 'firma_aceptacion',
];

function renderBriefingSectionsHtml(data) {
  return BRIEFING_SECTIONS.map(section => {
    const rows = section.fields
      .map(([key, label]) => {
        const value = String((data && data[key]) || '').trim();
        if (!value) return '';
        return '<tr style="border-bottom:1px solid #f3f4f6">' +
          '<td style="color:#6B7280;font-weight:600;vertical-align:top;padding:6px 12px 6px 0;width:220px">' + escapeHtml(label) + '</td>' +
          '<td style="color:#111827;padding:6px 0">' + escapeHtml(value).replace(/\n/g, '<br>') + '</td>' +
          '</tr>';
      })
      .filter(Boolean)
      .join('');
    if (!rows) return '';
    return '<h3 style="margin:22px 0 8px;font-size:15px;color:#1B2A4A">' + escapeHtml(section.title) + '</h3>' +
      '<table cellpadding="0" cellspacing="0" style="width:100%;font-size:13px;border-collapse:collapse">' + rows + '</table>';
  }).join('');
}

function renderBriefingEmailHtml(timestamp, data) {
  return `
    <div style="font-family:Inter,sans-serif;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">
      <div style="background:linear-gradient(135deg,#FF4E5B,#6D5CFF);padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700">Nuevo briefing de proyecto - Elefante Lab</h1>
        <p style="color:#FFE8E9;margin:4px 0 0;font-size:13px">${escapeHtml(timestamp)}</p>
      </div>
      <div style="padding:20px 32px 32px">
        ${renderBriefingSectionsHtml(data)}
      </div>
      <div style="background:#F9FAFB;padding:16px 32px;font-size:12px;color:#9CA3AF;text-align:center">
        Enviado automaticamente desde formulario-briefing.html
      </div>
    </div>
  `;
}

async function handleBriefingSubmission(req, res) {
  let data;
  try {
    data = await parseJsonBody(req);
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Datos del formulario invalidos.' }));
    return;
  }

  for (const field of BRIEFING_REQUIRED_FIELDS) {
    if (!String(data[field] || '').trim()) {
      res.writeHead(422, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Faltan campos obligatorios en el formulario.' }));
      return;
    }
  }

  if (!isValidEmail(data.email)) {
    res.writeHead(422, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Por favor revisa el email indicado.' }));
    return;
  }

  const timestamp = new Date().toISOString();

  // Guardar siempre en briefing-submissions.log como respaldo, antes de intentar el email:
  // si el SMTP falla, la respuesta al cliente sigue siendo un éxito y el equipo puede
  // consultar la respuesta en /admin/briefings.
  try {
    fs.appendFileSync(BRIEFING_LOG_FILE, JSON.stringify({ timestamp, data }) + '\n');
  } catch (err) {
    console.error('[server] No se pudo guardar el briefing:', err.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'No pudimos guardar tu formulario. Escríbenos por WhatsApp, por favor.' }));
    return;
  }

  const result = await sendEmail({
    to: emailConfig.mailTo,
    subject: '[Elefante Lab] Nuevo briefing de ' + data.empresa_cliente,
    html: renderBriefingEmailHtml(timestamp, data),
    replyTo: data.email,
  });

  if (!result.ok) {
    console.warn('[server] Email de briefing no enviado:', result.error, '- guardado en briefing-submissions.log, revisar /admin/briefings');
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: 'Briefing recibido. Nos pondremos en contacto contigo pronto.',
  }));
}

// ── Panel de administración (lectura de briefings, con Basic Auth) ────────────
function readBriefingSubmissions() {
  if (!fs.existsSync(BRIEFING_LOG_FILE)) return [];
  const lines = fs.readFileSync(BRIEFING_LOG_FILE, 'utf8').split('\n').filter(Boolean);
  const entries = [];
  for (const line of lines) {
    try { entries.push(JSON.parse(line)); } catch { /* linea corrupta, se omite */ }
  }
  return entries.reverse();
}

function renderAdminBriefingsPage(entries) {
  const items = entries.map(entry => {
    const data = entry.data || {};
    const summary = [data.empresa_cliente, data.persona_contacto, data.tipo_proyecto]
      .filter(Boolean).map(escapeHtml).join(' · ');
    const sectionsHtml = renderBriefingSectionsHtml(data)
      .replace(/style="[^"]*color:#6B7280;font-weight:600[^"]*"/g, 'style="color:#9CA3AF;font-weight:600;vertical-align:top;padding:6px 12px 6px 0;width:220px"')
      .replace(/style="[^"]*color:#111827[^"]*"/g, 'style="color:#E5E7EB;padding:6px 0"')
      .replace(/style="margin:22px 0 8px;font-size:15px;color:#1B2A4A"/g, 'style="margin:22px 0 8px;font-size:14px;color:#FF7A8A;text-transform:uppercase;letter-spacing:0.04em"');

    return `
      <details class="entry">
        <summary>${escapeHtml(entry.timestamp || '')} — ${summary || 'Sin datos'}</summary>
        <div class="entry-body">${sectionsHtml}</div>
      </details>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Briefings recibidos - Elefante Lab</title>
<style>
  body { margin:0; background:#0B1020; color:#E5E7EB; font-family:Inter,-apple-system,sans-serif; padding:2.5rem 1.5rem 5rem; }
  .wrap { max-width:900px; margin:0 auto; }
  h1 { font-family:Sora,Inter,sans-serif; font-size:1.6rem; margin-bottom:0.25rem; }
  .count { color:#8A93A8; font-size:0.9rem; margin-bottom:2rem; }
  details.entry { background:#131B36; border:1px solid rgba(255,255,255,0.08); border-radius:14px; margin-bottom:1rem; padding:1rem 1.25rem; }
  details.entry summary { cursor:pointer; font-weight:600; font-size:0.95rem; list-style:none; }
  details.entry summary::-webkit-details-marker { display:none; }
  details.entry summary::before { content:"▸ "; color:#FF4E5B; }
  details.entry[open] summary::before { content:"▾ "; }
  .entry-body table { width:100%; border-collapse:collapse; }
  .entry-body td { border-bottom:1px solid rgba(255,255,255,0.06); padding:6px 0; }
  .empty { color:#8A93A8; padding:2rem 0; text-align:center; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>Briefings recibidos</h1>
    <p class="count">${entries.length} formulario(s) guardado(s) en briefing-submissions.log</p>
    ${items || '<p class="empty">Todavía no hay briefings guardados.</p>'}
  </div>
</body>
</html>`;
}

async function handleAdminBriefings(req, res) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Panel no configurado. Define ADMIN_USER y ADMIN_PASS en las variables de entorno.');
    return;
  }

  const header = req.headers['authorization'] || '';
  const decoded = header.startsWith('Basic ') ? Buffer.from(header.slice(6), 'base64').toString('utf8') : '';
  const sepIndex = decoded.indexOf(':');
  const reqUser = sepIndex >= 0 ? decoded.slice(0, sepIndex) : '';
  const reqPass = sepIndex >= 0 ? decoded.slice(sepIndex + 1) : '';
  const authorized = safeEqual(reqUser, adminUser) && safeEqual(reqPass, adminPass);

  if (!authorized) {
    res.writeHead(401, {
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="Elefante Lab Admin"',
    });
    res.end('Autenticacion requerida.');
    return;
  }

  const html = renderAdminBriefingsPage(readBriefingSubmissions());
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(html);
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

  // Formulario de briefing (descubrimiento de proyecto)
  if (req.method === 'POST' && req.url === '/api/briefing') {
    await handleBriefingSubmission(req, res);
    return;
  }

  // Panel de administracion para consultar briefings (fallback si el email falla)
  if (req.method === 'GET' && req.url.split('?')[0] === '/admin/briefings') {
    await handleAdminBriefings(req, res);
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
    const ext = path.extname(file);
    // HTML: no-store so browser always fetches fresh. Assets: cache OK (versioned).
    const cacheHeader = ext === '.html'
      ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
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
});

process.on('SIGTERM', () => server.close(() => process.exit(0)));
process.on('SIGINT',  () => server.close(() => process.exit(0)));
