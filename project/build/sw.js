importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "css/bootstrap.main.min.css",
    "revision": "95df726a7936892cf645a57c1ccf3b75"
  },
  {
    "url": "css/bootstrap.min.css",
    "revision": "106595a5203c0ce960718c7a05356438"
  },
  {
    "url": "css/exchan.css",
    "revision": "4c6144976c48a2bb091976fe00317d69"
  },
  {
    "url": "css/lateef1.woff2",
    "revision": "d16fed62dcc34400dd4edd7bcc65406e"
  },
  {
    "url": "images/icons/icon-128.png",
    "revision": "322c5c657f3035d7448df777f62f0e65"
  },
  {
    "url": "images/icons/icon-256.png",
    "revision": "5d86e169b0c69af0ee424c7b0d89ec43"
  },
  {
    "url": "images/icons/icon-512.png",
    "revision": "aef8ba4b14b5730b3125d561bd38105f"
  },
  {
    "url": "images/offline3.png",
    "revision": "11d6eb3094caa11dd89efec8475c71df"
  },
  {
    "url": "index.html",
    "revision": "524c175b33f9c0d25961cfc4c53e7466"
  },
  {
    "url": "js/jquery-3.2.1.min.js",
    "revision": "c9f5aeeca3ad37bf2aa006139b935f0a"
  },
  {
    "url": "js/money.js",
    "revision": "c41fe8458a427676dda7988e43c82500"
  },
  {
    "url": "js/newcountries.json",
    "revision": "3965a00da348167682fc37c42352a01e"
  },
  {
    "url": "manifest.json",
    "revision": "f018dbbc53ec483936d5747a434fa92b"
  },
  {
    "url": "pages/404.html",
    "revision": "1febfeb39d5472e8622e6140f181c52b"
  },
  {
    "url": "pages/offline.html",
    "revision": "a9364cf9700331dec9fc3ba20b9c1dd3"
  }
]);

 
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

