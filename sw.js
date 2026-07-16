// Service Worker for ElefanteLab
// v6 – Network First for docs/assets, Cache First for images.
// Updating this file triggers automatic SW installation in the browser.

const CACHE_VERSION = 'elefantelab-v7';

const STATIC_ASSETS = [
  '/logo-elefante-final.png',
  '/attached_assets/imagine@2x-6cf456c9_1750334470030.png',
  '/attached_assets/AI_as_an_amplifier_1750334470031.png',
  '/attached_assets/Lightning_Fast_Creation_1750334470031.png',
  '/attached_assets/Effortlessly_Beautiful_1750334470031.png',
];

// ── Install: precache static images, activate immediately ────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache =>
      cache.addAll(STATIC_ASSETS).catch(() => {
        // Some assets may not exist yet – don't block installation
      })
    )
  );
});

// ── Activate: delete old caches, claim all clients ───────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: Network First for docs/assets, Cache First for images ─
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  const ext = url.pathname.split('.').pop().toLowerCase();
  const isDoc   = ext === 'html' || url.pathname === '/' || !url.pathname.includes('.');
  const isAsset = ['css', 'js'].includes(ext);
  const isImage = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico', 'gif', 'woff', 'woff2'].includes(ext);

  if (isDoc || isAsset) {
    // Network First – always fresh, fallback to cache
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
    // Cache First – images rarely change
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
  // Everything else goes straight to network
});
