// Service Worker for ElefanteLab
// v5 – Network First siempre. Nunca sirve caché obsoleto.
// Al actualizar este archivo el navegador instala el nuevo SW automáticamente.

const CACHE_VERSION = 'elefantelab-v5';

// ── Install: skipWaiting para activarse de inmediato ─────────────
self.addEventListener('install', () => {
  self.skipWaiting();
});

// ── Activate: borra TODOS los cachés anteriores y toma control ───
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: Network First para todo ───────────────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // No interceptar recursos de otros orígenes (fuentes, analytics…)
  if (url.origin !== location.origin) return;

  const ext = url.pathname.split('.').pop().toLowerCase();
  const isImage = ['png','jpg','jpeg','webp','svg','ico','gif','woff','woff2'].includes(ext);

  if (isImage) {
    // Cache First sólo para imágenes (no cambian)
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(res => {
            cache.put(event.request, res.clone());
            return res;
          });
        })
      )
    );
  } else {
    // Network First para HTML, CSS, JS — siempre fresco
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            caches.open(CACHE_VERSION).then(c => c.put(event.request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  }
});

const STATIC_ASSETS = [
  '/logo-elefante-final.png',
  '/attached_assets/imagine@2x-6cf456c9_1750334470030.png',
  '/attached_assets/AI_as_an_amplifier_1750334470031.png',
  '/attached_assets/Lightning_Fast_Creation_1750334470031.png',
  '/attached_assets/Effortlessly_Beautiful_1750334470031.png',
];

// ── Install: precache sólo imágenes estáticas ─────────────────────
self.addEventListener('install', event => {
  self.skipWaiting(); // activa inmediatamente sin esperar a que el tab se cierre
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ── Activate: eliminar todos los cachés viejos ────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim()) // toma control de todos los tabs abiertos
  );
});

// ── Fetch: Network First para docs/estilos/scripts ───────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorar peticiones no-GET y orígenes externos (fuentes, analytics…)
  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  const ext = url.pathname.split('.').pop().toLowerCase();
  const isDoc    = ext === 'html' || url.pathname === '/' || !url.pathname.includes('.');
  const isAsset  = ['css', 'js'].includes(ext);
  const isImage  = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico', 'gif'].includes(ext);

  if (isDoc || isAsset) {
    // ── Network First: va a la red, si falla usa caché ──────────
    event.respondWith(
      fetch(event.request)
        .then(netRes => {
          if (netRes.ok) {
            const clone = netRes.clone();
            caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
          }
          return netRes;
        })
        .catch(() => caches.match(event.request))
    );
  } else if (isImage) {
    // ── Cache First: imágenes raramente cambian ──────────────────
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(netRes => {
          const clone = netRes.clone();
          caches.open(CACHE_VERSION).then(c => c.put(event.request, clone));
          return netRes;
        });
      })
    );
  }
  // El resto (API, etc.) va directo a la red sin SW
});
