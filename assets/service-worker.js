importScripts('/libraries/js/nocompile/cache-polyfill.js');

const myCache = 'HAPPY_BIRTHDAY_CY_SITE';

self.addEventListener('install', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        await cache.addAll([
            '/index',
            '/bundled/bundled.min.css',
            '/bundled/bundled.min.js',
       ]);
    }());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        const cacheNames = await cache.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
    }());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(async function() {
        const networkPromise = fetch(event.request);
        const cachePromise = caches.open(myCache);

        try {
            const networkResponse = await networkPromise;
            cachePromise
                .then(cache => {
                    cache.put(event.request, networkResponse);
                });
            return networkResponse.clone();
        } catch (error) {
            const cache = await cachePromise;
            const cacheResponse = await cache.match(event.request);
            return cacheResponse;
        }
    }());
});
