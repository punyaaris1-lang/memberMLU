importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDfsTAGclYUSRe6YhiljS-xb-v-9RBYVEM",
    authDomain: "antriankcnew.firebaseapp.com",
    projectId: "antriankcnew",
    storageBucket: "antriankcnew.firebasestorage.app",
    messagingSenderId: "348986439499",
    appId: "1:348986439499:web:99578753dc9547d727dace"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Mesin Penangkap Notifikasi di Latar Belakang (HP Mati / App Ditutup)
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // Pastikan Bapak punya file logo.png
    badge: '/logo.png',
    vibrate: [200, 100, 200]
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
