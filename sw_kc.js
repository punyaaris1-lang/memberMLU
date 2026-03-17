// Nama file: sw_kc.js

const CACHE_NAME = 'kc-app-v1';
const urlsToCache = [
  '/',
  '/index_kc.html',
  '/dashboard_kc.html',
  '/logo_kc.png',
  '/sore.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache KC Berhasil Dibuat');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Hapus cache yang bukan punya KC-v1
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
