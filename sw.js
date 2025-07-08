// Service Worker for ElefanteLab
const CACHE_NAME = 'elefantelab-v1';
const urlsToCache = [
    '/',
    '/styles.css',
    '/mobile-new.js',
    '/logo-elefante-final.png',
    '/attached_assets/imagine@2x-6cf456c9_1750334470030.png',
    '/attached_assets/AI_as_an_amplifier_1750334470031.png',
    '/attached_assets/Lightning_Fast_Creation_1750334470031.png',
    '/attached_assets/Effortlessly_Beautiful_1750334470031.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Update cache when new version is available
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});