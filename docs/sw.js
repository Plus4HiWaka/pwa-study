var CACHE_NAME = 'pwa-study-cache-v1';
var urlsToCache = [
  '/docs',
  '../img/ckw.gif',
  '/img/ckwman.jpg'
];

self.addEventListener('install', function(event) {
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
