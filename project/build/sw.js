importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

 
 //`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`

    workbox.routing.registerRoute(
      new RegExp('https://free.currencyconverterapi.com.*/api\.*/v5/.*\=ultra'),
       workbox.strategies.networkFirst({
        cacheName: 'currency-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
          })
        ]
      })
    );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

