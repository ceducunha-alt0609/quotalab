// QuotaLab Service Worker
// Estratégia: cache-first para assets estáticos, network-first para o HTML principal

const CACHE_NAME = 'quotalab-v1';
const CACHE_VERSION = '1.0.0';

// Assets a cachear imediatamente na instalação
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/icon-180x180.png',
  '/icons/icon-152x152.png',
  '/icons/icon-144x144.png',
  '/icons/icon-120x120.png',
];

// CDNs externos — cache on demand, sem falha se offline
const EXTERNAL_CACHE = 'quotalab-external-v1';
const EXTERNAL_ORIGINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
];

// ── INSTALL: precache assets locais ──────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Precache parcial:', err))
  );
});

// ── ACTIVATE: limpar caches antigos ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== EXTERNAL_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: estratégia por tipo de recurso ─────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requisições não-GET e Supabase (sempre online)
  if (request.method !== 'GET') return;
  if (url.hostname.includes('supabase')) return;

  // Fontes e CDN externos — cache on demand (stale-while-revalidate)
  if (EXTERNAL_ORIGINS.some(origin => url.hostname.includes(origin))) {
    event.respondWith(staleWhileRevalidate(request, EXTERNAL_CACHE));
    return;
  }

  // HTML principal — network-first (sempre tenta buscar versão nova)
  if (url.pathname === '/' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Assets locais (ícones, manifest, etc.) — cache-first
  event.respondWith(cacheFirst(request));
});

// ── ESTRATÉGIAS ───────────────────────────────────────────────────────────────
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchPromise;
}

// ── MENSAGENS ─────────────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.action === 'skipWaiting') self.skipWaiting();
  if (event.data?.action === 'clearCache') {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});
