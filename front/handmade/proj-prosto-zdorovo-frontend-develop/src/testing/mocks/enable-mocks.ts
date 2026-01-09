export async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCK == 'true') {
    const { worker } = await import('./browser');

    return worker.start();
  }

  return;
}
