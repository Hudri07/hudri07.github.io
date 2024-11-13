const cacheName = "v1";
const cacheFiles = [
    "/",
    "/css/style.css",
    "/js/main.js",
    "/img/profile.png",
    "/img/database_foundation.jpg",
    "/img/java_fundamental.jpg",
    "/img/hoodtees.png",
    "/img/icon-pwa192x192.png",
    "/img/maskable.png",
    "/img/screenshot.png",
    "/img/ss2.png",
    "/img/ukom_office.jpg",
    "/img/word-counter.png",
];

// Event 'install': caching resources
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                cache.addAll(cacheFiles);
            })
    );
});

// Event 'activate': cleaning up old caches
self.addEventListener("activate", (event) => {
    const cacheAllowlist = [cacheName]; // Only allow current cache

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (!cacheAllowlist.includes(name)) {
                        console.log(`Deleting old cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Event 'fetch': serve cached files or fallback to network
self.addEventListener('fetch',(event)=>{
    event.respondWith(caches.open(cacheName).then((cache)=>{
        return fetch(event.request.url).then((fetchResponse)=>{
            cache.put(event.request, fetchResponse.clone());

            return fetchResponse;
        }).catch(()=>{
            return cache.match(event.request.url);
        });
    }));

});

