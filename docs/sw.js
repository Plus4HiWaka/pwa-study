var CACHE_NAME = 'pwa-study-cache-v1';
var urlsToCache = [
  '.',
  'img/favicon.ico',
  'css/bootstrap.css',
  'css/bootstrap.css.map',
  'css/bootstrap.min.css',
  'css/bootstrap.min.css.map',
  'css/bootstrap-theme.css',
  'css/bootstrap-theme.css.map',
  'css/bootstrap-theme.min.css',
  'css/bootstrap-theme.min.css.map',
  'fonts/glyphicons-halflings-regular.eot',
  'fonts/glyphicons-halflings-regular.svg',
  'fonts/glyphicons-halflings-regular.ttf',
  'fonts/glyphicons-halflings-regular.woff',
  'fonts/glyphicons-halflings-regular.woff2',
  'js/bootstrap.js',
  'js/bootstrap.min.js',
  'js/npm.js'
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
