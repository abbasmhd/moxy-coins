// service-worker.js
// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = 'pwa-app-cache';

// Delete old caches
self.addEventListener('activate', (event) => {
    console.info("service-worker activate");
    const currentCachelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys()
        .then(keyList => Promise.all(keyList.filter(key => !currentCachelist.includes(key)).map(key => caches.delete(key))))
    );
});

// This triggers when user starts the app
self.addEventListener('install', (event) => {
    console.info("service-worker install");
    if (doCache) {
        event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function (cache) {
                // fetch('asset-manifest.json')
                //     .then(response => {
                //         response.json();
                //     })
                //     .then(assets => {
                //         console.info("assets", assets);
                //         // We will cache initial page and the main.js
                //         // We could also cache assets like CSS and images
                //         const urlsToCache = [
                //             '/',
                //         ];
                //         cache.addAll(urlsToCache);
                //     })
            })
        );
    }
});

// Here we intercept request and serve up the matching files
self.addEventListener('fetch', (event) => {
    console.info("service-worker fetch");
    if (doCache) {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                console.info("service-worker fetch response", response);
                return response || fetch(event.request);
            })
        );
    }
});

// This service worker file is effectively a 'no-op' that will reset any
// previous service worker registered for the same host:port combination.
// In the production build, this file is replaced with an actual service worker
// file that will precache your site's local assets.
// See https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432

// self.addEventListener('install', () => self.skipWaiting());

// self.addEventListener('activate', () => {
//   self.clients.matchAll({ type: 'window' }).then(windowClients => {
//     for (let windowClient of windowClients) {
//       // Force open pages to refresh, so that they have a chance to load the
//       // fresh navigation response from the local dev server.
//       windowClient.navigate(windowClient.url);
//     }
//   });
// });