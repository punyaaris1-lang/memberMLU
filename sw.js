const CACHE_NAME = 'mlu-premium-v1';
const urlsToCache = [
  './',
  './dashboard.html',
  './manifest.json'
  // Kalau ada file CSS/Logo, tambahin di sini, misal:
  // './logomlumaster.png'
];

// 1. Install Service Worker & Simpan Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Baca Cache saat Offline / Loading
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Balikin cache kalau ada, kalau gak ada ambil dari internet
        return response || fetch(event.request);
      })
  );
});

// 3. Update Cache kalau ada versi baru
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
