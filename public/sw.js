var servicesCache = 'services-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(servicesCache).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/pricing.html',
        '/hiw.html',
        '/do.html',
        '/faq.html',
        '/ad.html',
        '/benefits.html',
        '/sp.html',
        '/fba_benefits.html',
        '/fba_faq.html',
        '/fba_pricing.html',
        '/fba_hiw.html',
        'https://images-eu.ssl-images-amazon.com/images/G/01/amazonservices/open-sans/Regular/OpenSans-Regular.woff2?v=1.1.0',
        'https://images-eu.ssl-images-amazon.com/images/G/01/amazonservices/open-sans/Light/OpenSans-Light.woff2?v=1.1.0',
        'https://images-eu.ssl-images-amazon.com/images/G/01/amazonservices/open-sans/Bold/OpenSans-Bold.woff2?v=1.1.0',
        'https://images-eu.ssl-images-amazon.com/images/G/01/x-locale/common/transparent-pixel.gif',
        'https://images-eu.ssl-images-amazon.com/images/G/31/amazonservices/INwebsite/Feb2016Update/services-common-sprite._V270850366_.png',
        'https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/EUSellerServices-Common/EUSellerServices-Common-1491380972._V1_.css',
        'https://images-na.ssl-images-amazon.com/images/G/01/browser-scripts/EUSellerServices-Common/EUSellerServices-Common-4290390610._V1_.js',
        'https://images-eu.ssl-images-amazon.com/images/G/01/AUIClients/ClientSideMetricsAUIJavascript-2dd07dc5015669a17a737653b42616cd5746dad0._V2_.js',
        'https://images-eu.ssl-images-amazon.com/images/G/31/amazonservices/INwebsite/Feb2016Update/SOA/sprite-services-benefit.png'
       ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('services-') && (cacheName !== servicesCache);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
      // if (response) {
      //   return response;
      // } else if ((/\.(gif|jpg|jpeg|png|PNG)$/i).test(event.request.url)) {
      //   console.log(event.request.url);
      //   return fetch('https://images-eu.ssl-images-amazon.com/images/G/01/x-locale/common/transparent-pixel.gif');
      // } else {
      //   return fetch(event.request);
      // }
    })
  );
});
