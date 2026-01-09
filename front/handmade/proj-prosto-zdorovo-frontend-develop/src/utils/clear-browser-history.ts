export function clearBrowserHistory() {
  globalThis.history.replaceState(null, '');
}
