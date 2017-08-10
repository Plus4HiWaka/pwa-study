var CACHE_NAME = 'pwa-study-cache-v1';
var urlsToCache = [
  '.',
  'img/favicon.ico',
  'img/ckw.gif',
  'img/ckwman.jpg',
  'img/ckwpan.jpg',
  'img/ckwtank.png'
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
