/* eslint-disable no-restricted-globals */
// service-worker.js
// Flag for enabling cache in production

var doCache = true;

var APP_NAME = 'moxy-coins';
var CACHE_VERSION = 'v1';
var CACHE_NAME = `${APP_NAME}-app-cache-${CACHE_VERSION}`;
var CACHE_IMAGES = `${APP_NAME}-content-imgs`;

var currentCachelist = [
    CACHE_NAME,
    CACHE_IMAGES
];

// Delete old caches
self.addEventListener('activate', (event) => {
    console.info("service-worker activate");
    event.waitUntil(
        caches.keys()
        .then(keyList =>
            Promise.all(keyList.filter(key => key.startsWith(`${APP_NAME}-`) && !currentCachelist.includes(key))
                .map(key => caches.delete(key))))
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

                cache.addAll([
                    '/',
                    // "/static/js/*.js"
                    
                    
                ]);
            })
        );
    }
});

// Here we intercept request and serve up the matching files
self.addEventListener('fetch', (event) => {
    console.info("service-worker fetch", event.request.url);
    if (doCache) {
        var requestUrl = new URL(event.request.url);
        // if (requestUrl.origin === location.origin) {
            // if (requestUrl.pathname === '/') {
            //   event.respondWith(caches.match('/skeleton'));
            //   return;
            // }
console.info("requestUrl.pathname", requestUrl.pathname, requestUrl.pathname.startsWith('/media/'));

            if (requestUrl.pathname.startsWith('/media/')) {
                event.respondWith(servePhoto(event.request));
                return;
            }
        // }

        event.respondWith(
            caches.match(event.request).then(function (response) {
                console.info("service-worker fetch response", response);
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

async function servePhoto(request) {
    return caches.open(CACHE_IMAGES)
        .then((cache) => cache.match(request.url)
            .then(response => {

                console.info("servePhoto response", response); 
                if (response) {
                    return response;
                }
                return fetch(request).then(networkResponse => {
                    cache.put(request.url, networkResponse.clone());
                    return networkResponse;
                })
            }))

} 