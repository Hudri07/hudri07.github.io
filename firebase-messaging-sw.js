// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging.js"
);

// Initialize Firebase in the service worker
const firebaseConfig = {
  apiKey: "AIzaSyA8aqfXCcN5Vz0q0Iof01ybCMJ9LsU2nys",
  authDomain: "portofolio-pwa.firebaseapp.com",
  projectId: "portofolio-pwa",
  storageBucket: "portofolio-pwa.appspot.com",
  messagingSenderId: "746210873661",
  appId: "1:746210873661:web:ca36a3dce8cacf382cb554",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background message
messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/img/icon-pwa192x192.png',
        vibrate: [200, 100, 200],
        requireInteraction: true
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
