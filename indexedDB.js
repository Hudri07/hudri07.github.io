let db;
const request = indexedDB.open("ContactDB", 1);

request.onerror = function(event) {
    console.error("Database error:", event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database initialized");
};

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("subject", "subject", { unique: false });
    objectStore.createIndex("message", "message", { unique: false });
    console.log("Object Store created");
};

function requestNotificationPermission() {
    if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted");
            }
        });
    }
}

function showNotification() {
    if (Notification.permission === "granted") {
        new Notification("Pesan Baru", {
            body: "Data berhasil disimpan di IndexedDB",
            icon: "/img/icon-pwa192x192.png",
            vibrate: [200, 100, 200],
        });
    }
}

function saveMessagesToIndexedDB(name, email, subject, message) {
    const tx = db.transaction(["contacts"], "readwrite");
    const objectStore = tx.objectStore("contacts");

    const contactData = { name, email, message };
    const request = objectStore.add(contactData);

    request.onsuccess = function() {
        console.log("Data berhasil disimpan");
        alert("Pesan anda telah terkirim");
        showNotification();
    };

    request.onerror = function(event) {
        console.error("Error saat menyimpan data:", event.target.errorCode);
    };
}

document.getElementById("contact").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    saveMessagesToIndexedDB(name, email, subject, message);

    // Reset form setelah data disimpan
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
});

document.addEventListener("DOMContentLoaded", requestNotificationPermission);
