// Unregisters any service worker left over from an earlier deployment.
// The Create React App register() helper was removed: it was never called and
// relied on process.env.PUBLIC_URL, which does not exist under Vite.
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
