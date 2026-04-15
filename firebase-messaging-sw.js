// =======================================================
// 0. IMPORT FIREBASE LIBRARY (WAJIB DI PALING ATAS)
// =======================================================
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// =======================================================
// 1. TUGAS PWA (Biar Web Bisa Di-Install ke Home Screen)
// =======================================================
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install PWA Berhasil');
  self.skipWaiting(); // Paksa langsung aktif tanpa nunggu restart
});

self.addEventListener('activate', (e) => {
  console.log('[Service Worker] Aktif dan siap mengontrol');
  return self.clients.claim(); // Memastikan SW langsung jalan di semua tab
});

self.addEventListener('fetch', (e) => {
  // Dibiarkan kosong agar syarat install PWA terpenuhi.
  // Kalau ke depannya mau bikin aplikasi bisa offline, taruh kodingan cache-nya di sini.
});

// =======================================================
// 2. INISIALISASI FIREBASE & PENANGKAP PESAN BACKGROUND
// =======================================================
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
  console.log('[FCM] Notif Masuk di Belakang Layar: ', payload);
  
  // Menggunakan fallback text jika title/body dari server kosong
  const notificationTitle = payload.notification?.title || "Info MLU";
  const notificationOptions = {
    body: payload.notification?.body || "Ada pembaruan informasi baru.",
    icon: './icon-v2-192.png', // <-- Sudah disesuaikan dengan file logo MLU Bapak
    badge: './icon-v2-192.png', // <-- Ikon kecil di status bar atas HP
    vibrate: [200, 100, 200, 100, 200, 100, 200], // Pola getar panjang (S.O.S Mode)
    requireInteraction: true, // PENTING: Notif tidak akan hilang sebelum diusap/diklik
    data: {
      // Menyimpan link tujuan saat notif diklik (default ke dashboard)
      click_action: payload.data?.click_action || "./dashboard.html" 
    }
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// =======================================================
// 3. AKSI KETIKA NOTIFIKASI DI-KLIK OLEH MEMBER
// =======================================================
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notifikasi diklik member.');
  event.notification.close(); // Tutup pop-up notifikasinya

  // Arahkan ke URL yang tersimpan di data payload
  const urlToOpen = new URL(event.notification.data.click_action, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Jika member sedang membuka aplikasinya di background, langsung tarik layarnya ke depan
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Jika aplikasi sedang tertutup total (di-kill), buka jendela aplikasi baru
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
