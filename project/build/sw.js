importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

  workbox.skipWaiting();
  workbox.clientsClaim();

 
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

self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const action = event.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow(primaryKey + '.html');
    notification.close();
  }

  // TODO 5.3 - close all notifications when one is clicked

});
