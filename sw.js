self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // Biarkan kosong dulu, ini hanya syarat wajib agar PWA bisa di-install
});
