'use strict';

// Envía los formularios de la web al CRM de La Capital (API leads-web).
// La clave va solo en el servidor: nunca se expone al navegador.

const config = {
  url:     process.env.LEADS_API_URL || 'https://app.lacapital.es/api/leads-web/v1/lead',
  key:     process.env.ELEFANTE_LEADS_KEY || '',
  web:     process.env.LEADS_WEB || 'lab.elefantesolutions.com',
  // LEADS_PRUEBA=true -> prueba en seco: la API valida y no guarda ni avisa
  prueba:  /^(1|true|si|sí)$/i.test(process.env.LEADS_PRUEBA || ''),
  timeout: 10000,
};

function isConfigured() {
  return Boolean(config.key);
}

// Quita campos vacíos para no mandar "" a la API
function compact(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && !v.trim()) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = typeof v === 'string' ? v.trim() : v;
  }
  return out;
}

/**
 * Envía un lead. Devuelve { ok, status, data, error } y nunca lanza.
 * @param {object} lead  campos de la API (nombre, email, mensaje, briefing...)
 */
async function sendLead(lead) {
  if (!isConfigured()) {
    return { ok: false, status: 0, error: 'ELEFANTE_LEADS_KEY no configurada' };
  }

  const body = compact({ web: config.web, ...lead, prueba: config.prueba || undefined });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout);

  try {
    const res = await fetch(config.url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + config.key,
        'Content-Type':  'application/json',
        'Accept':        'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      console.log('[leads] Enviado', data.referencia || '', data.prueba ? '(prueba)' : '');
      return { ok: true, status: res.status, data };
    }

    let error = data.error || ('HTTP ' + res.status);
    if (Array.isArray(data.errores) && data.errores.length) error += ': ' + data.errores.join('; ');
    if (res.status === 401) error = 'Clave de leads ausente, incorrecta o desactivada (401)';
    if (res.status === 429) error = 'Límite de envíos superado (429), Retry-After: ' + (res.headers.get('retry-after') || '?');
    console.warn('[leads] Rechazado:', error);
    return { ok: false, status: res.status, data, error };
  } catch (err) {
    const error = err.name === 'AbortError' ? 'Tiempo de espera agotado' : err.message;
    console.warn('[leads] Error de red:', error);
    return { ok: false, status: 0, error };
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { sendLead, isConfigured, config };
