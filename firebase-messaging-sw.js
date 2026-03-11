// file: firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Konfigurasi Database MLU Bapak
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

// Menangkap Notifikasi saat Aplikasi Ditutup / Dilatarbelakangi
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Notifikasi Diterima: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'logomlu.png', // Ikon yang muncul di layar atas HP
        badge: 'logomlu.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200] // Efek HP Getar panjang
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
