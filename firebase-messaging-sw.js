// =======================================================
// 1. TUGAS PWA (Biar Web Bisa Di-Install ke Home Screen)
// =======================================================
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install PWA Berhasil');
  self.skipWaiting(); // Paksa langsung aktif
});

self.addEventListener('fetch', (e) => {
  // Biarkan kosong, syarat wajib PWA terpenuhi
});

// =======================================================
// 2. TUGAS NOTIFIKASI FCM (Penangkap Pesan Background)
// =======================================================
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = { 
    apiKey: "AIzaSyAk3G5aQUBVe_g7_peVu1F6xllP_RejGq0", 
    authDomain: "rtomaka-e67b5.firebaseapp.com", 
    projectId: "rtomaka-e67b5", 
    storageBucket: "rtomaka-e67b5.firebasestorage.app", 
    messagingSenderId: "472036722228", 
    appId: "1:472036722228:web:11d520f9204db317d02c61" 
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Notif Masuk di Belakang Layar: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo.png', // Pastikan gambar logo.png ada di folder utama
    vibrate: [200, 100, 200, 100, 200, 100, 200]
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
