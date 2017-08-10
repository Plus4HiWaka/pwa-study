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

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでレスポンスを返す
        if (response) {
          console.log('--- Cache あり!');
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
                console.log('--- Cache Putted!');
              });

            return response;
          }
        );
      })
    );
});
