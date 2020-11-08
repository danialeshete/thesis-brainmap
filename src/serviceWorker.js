// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute([{"revision":"c5aa67d4151edb3c799d30727db43c0f","url":"assets/17056-smartsharp-animations-volume-2.json"},{"revision":"8ee3a83709346cf8277be731090d1763","url":"assets/18045-teamwork-is-all-we-need.json"},{"revision":"0eb6e7cc1d669d022085845f7486e052","url":"assets/9408-creative-process.json"},{"revision":"e112dc08e5eaa1dc69848406edd110dc","url":"assets/logo_dark.svg"},{"revision":"e67880623c997347ff4f1161f328a592","url":"assets/worker.json"},{"revision":"c0e4186e77e8ca6c9af894117b8e4d9e","url":"assets/working-man.json"},{"revision":"b479ec0237a30e2ee01427162464f1a7","url":"assets/working-man.png"},{"revision":"242336feccf5ef7a725dc32bef86b11f","url":"package-lock.json"},{"revision":"a92f018d6e78926cb8e53c6d4a7e2751","url":"package.json"},{"revision":"7eeaa1c2c28445c6018817afc53307c5","url":"public/android-chrome-192x192.png"},{"revision":"db8b2c97cf2459a4ac9d3c4292e44846","url":"public/android-chrome-512x512.png"},{"revision":"9b4dd9a7f8ae0699f7ad9e85df75784c","url":"public/apple-touch-icon.png"},{"revision":"61bfd064535af0c276bb63b3fd579733","url":"public/browserconfig.xml"},{"revision":"d460758dfdffcb1ed58ebc39aa154636","url":"public/favicon-16x16.png"},{"revision":"634ec8761201bcf38eec4dc3910cc27f","url":"public/favicon-32x32.png"},{"revision":"c452d550ed7b39fc31f81b174dfaa5d3","url":"public/favicon.ico"},{"revision":"35849d3a5b9e163222445e990e88ab47","url":"public/index.html"},{"revision":"7b9dae189398704e7f1a8e7dbf7ecd76","url":"public/manifest.json"},{"revision":"ac704773c4b5d745e50f07f147052199","url":"public/manifest.webmanifest"},{"revision":"b54319177cf18be7a86d3de2e32a5a80","url":"public/mstile-150x150.png"},{"revision":"377072d0466d62682ba997bd0bb59bd3","url":"public/robots.txt"},{"revision":"db46212a1edfcd94aa30b5172fc5cf74","url":"public/safari-pinned-tab.svg"},{"revision":"777c26842325a3c03f9cee081d629e66","url":"README.md"},{"revision":"1adbc19ffa4cefa26eb3c801cced1683","url":"src/AddModal.js"},{"revision":"6514cc43b6b4108f903b8f7ba2f7139d","url":"src/App.js"},{"revision":"8166c38da710d1ec8f490c9347938a75","url":"src/Banner.css"},{"revision":"117def5c8d01d60998dc79b1909238e2","url":"src/Banner.js"},{"revision":"2cde691273219154081dd3deac190477","url":"src/ClickMap.css"},{"revision":"b3e29c2a54912806364a9faf084d7ae5","url":"src/ClickMap.js"},{"revision":"27ae379394c0f591182611451107b809","url":"src/Draggable.css"},{"revision":"e9bc34b2ab1003b1b8a2b4730525065a","url":"src/Draggable.js"},{"revision":"c202fda178cc7299edbc8a9a77a0a6fc","url":"src/enter_key.png"},{"revision":"8d8203473e40e5ad94fb4606ee48b8cd","url":"src/ForceV3.css"},{"revision":"a094b6155a20c95eb15efd33ec466567","url":"src/ForceV3.js"},{"revision":"a8d9c50764a991e5569180f4188c0ac0","url":"src/ForceV5.css"},{"revision":"517b1de0afe2d9aeb37859a35eefed5f","url":"src/ForceV5.js"},{"revision":"b20cd6c47e75543097aa1d9624bf1468","url":"src/index.js"},{"revision":"c7a929370f0dff72a6c2460e23b64e48","url":"src/Login.css"},{"revision":"80ddcde8e9a99cd9877cfa606f9d17a1","url":"src/Login.js"},{"revision":"3a37fd458a093d23b51b43c12866d927","url":"src/logo_black_wname.svg"},{"revision":"e112dc08e5eaa1dc69848406edd110dc","url":"src/logo_dark.svg"},{"revision":"ee9b467276e2ad89c2329c4d7c9f3cb3","url":"src/logo_light_wname.svg"},{"revision":"bd0a1d0f4aa2b870ba362ff4b3d063bd","url":"src/logo_light.svg"},{"revision":"c0e4186e77e8ca6c9af894117b8e4d9e","url":"src/lotties/working-man.json"},{"revision":"75793ce75b5a98f29454526c07b5a1d6","url":"src/MindMap.js"},{"revision":"e77909fc8c1218ceab91f86be87365c6","url":"src/NavBar.css"},{"revision":"43dc804ad47c94dc3c8ed9dc29652f34","url":"src/Register.js"},{"revision":"1501c1205fa80d67ddc1d357b99c2fb7","url":"src/Session.js"},{"revision":"824092b92cb3d7902044178b2869ce63","url":"src/style.css"},{"revision":"a10f621bcb3d972c02264aa9138ae858","url":"workbox-config.js"}]);


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/src/ervice-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
