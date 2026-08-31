/* Carta Municipal · Chiapas — offline cache.
   Scope is this folder only. Nothing outside /muni/ is touched. */

const CACHE = 'muni-v1';
const HOME = new URL('./', self.location).pathname;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(['./', './index.html']))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  /* Map tiles and anything on another origin: network only, never cached. */
  if (url.origin !== self.location.origin) return;

  /* Anything outside this folder (the rest of the site): left completely alone. */
  if (!url.pathname.startsWith(HOME)) return;

  /* Serve from cache immediately, refresh in the background. */
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: true });
    const net = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return hit || await net || cache.match('./index.html');
  }));
});
