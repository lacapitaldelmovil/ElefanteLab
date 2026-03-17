/**
 * email-service.js – Servicio de envío de emails via IONOS SMTP
 *
 * Variables de entorno necesarias (añade en Replit → Secrets 🔒):
 *
 *   SMTP_HOST        smtp.ionos.es
 *   SMTP_PORT        587
 *   SMTP_SECURE      false
 *   SMTP_USER        admin@lacapital.es
 *   SMTP_PASS        <contraseña SMTP – añadir manualmente en Secrets>
 *   SMTP_FROM_EMAIL  admin@lacapital.es
 *   SMTP_FROM_NAME   elefantelab Móvil
 *   MAIL_TO          destinatario (opcional, usa SMTP_USER si no se define)
 */

'use strict';

const nodemailer = require('nodemailer');

// ── Leer configuración desde variables de entorno ────────────────────────────
const config = {
  host:      process.env.SMTP_HOST       || '',
  port:      parseInt(process.env.SMTP_PORT || '587', 10),
  secure:    (process.env.SMTP_SECURE    || 'false') === 'true',  // false = STARTTLS
  user:      process.env.SMTP_USER       || '',
  pass:      process.env.SMTP_PASS       || '',
  fromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '',
  fromName:  process.env.SMTP_FROM_NAME  || 'Elefante Lab',
  mailTo:    process.env.MAIL_TO         || process.env.SMTP_USER || '',
};

// ── Crear transporter (una sola instancia) ───────────────────────────────────
let transporter = null;

if (config.host && config.user && config.pass) {
  transporter = nodemailer.createTransport({
    host:   config.host,
    port:   config.port,
    secure: config.secure,       // false → STARTTLS en puerto 587
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: true,  // verificar certificado del servidor
    },
  });

  console.log(`[email-service] SMTP configurado: ${config.user} → ${config.host}:${config.port}`);
} else {
  console.warn('[email-service] ⚠️  SMTP_HOST / SMTP_USER / SMTP_PASS no configurados.');
  console.warn('[email-service]    Los mensajes del formulario se guardarán sólo en contacts.log.');
}

/**
 * Verifica la conexión SMTP al arrancar (no bloquea si falla).
 */
async function verifyConnection() {
  if (!transporter) return false;
  try {
    await transporter.verify();
    console.log('[email-service] Conexión SMTP verificada correctamente.');
    return true;
  } catch (err) {
    console.error('[email-service] Error al verificar SMTP:', err.message);
    return false;
  }
}

/**
 * Envía un email.
 *
 * @param {object} opts
 * @param {string}  opts.to       Destinatario (por defecto MAIL_TO / SMTP_USER)
 * @param {string}  opts.subject  Asunto
 * @param {string}  opts.html     Cuerpo HTML
 * @param {string}  [opts.text]   Cuerpo texto plano (opcional, se genera si no se pasa)
 * @param {string}  [opts.replyTo] Reply-To header
 * @returns {Promise<{ok: boolean, info?: object, error?: string}>}
 */
async function sendEmail({ to, subject, html, text, replyTo } = {}) {
  if (!transporter) {
    return { ok: false, error: 'SMTP no configurado' };
  }

  const mailOptions = {
    from:    `"${config.fromName}" <${config.fromEmail}>`,
    to:      to || config.mailTo,
    subject: subject || '(sin asunto)',
    html:    html    || '',
    text:    text    || html?.replace(/<[^>]+>/g, '') || '',
    ...(replyTo ? { replyTo } : {}),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[email-service] Email enviado. MessageId:', info.messageId);
    return { ok: true, info };
  } catch (err) {
    console.error('[email-service] Error al enviar email:', err.message);
    return { ok: false, error: err.message };
  }
}

// ── Exports ──────────────────────────────────────────────────────────────────
module.exports = {
  sendEmail,
  verifyConnection,
  config,   // exportamos config para que server.js pueda leer mailTo, etc.
};
