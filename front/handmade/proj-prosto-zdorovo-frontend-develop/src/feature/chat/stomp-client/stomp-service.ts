import { Client, messageCallbackType, StompSubscription } from '@stomp/stompjs';

export class StompService {
  private client: Client | null;
  private subscriptions = new Map<
    string,
    { sub: StompSubscription | null; cb: messageCallbackType }
  >();

  constructor(token: string) {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 3000,
    });

    this.client.onConnect = () => {
      console.log('STOMP соединение установлено');
    };

    this.client.onStompError = (frame) => {
      console.error('STOMP ошибка:', frame);
    };

    this.client.onWebSocketError = (evt) => {
      console.error('WebSocket ошибка:', evt);
      this.client = null;
    };

    this.client.activate();
  }

  subscribe(destination: string, callback: messageCallbackType) {
    if (!this.client) {
      return;
    }
    // Если подписка уже существует — отписываемся перед новым подписанием
    if (this.subscriptions.has(destination)) {
      this.unsubscribe(destination);
    }

    const sub = this.client.subscribe(destination, callback);

    this.subscriptions.set(destination, { sub, cb: callback });

    console.log(`Подписались на ${destination}`);
  }

  unsubscribe(destination: string) {
    const entry = this.subscriptions.get(destination);
    if (entry?.sub) {
      entry.sub.unsubscribe();
      console.log(`Отписались от ${destination}`);
    }
    this.subscriptions.delete(destination);
  }

  disconnect() {
    this.client?.deactivate();
  }

  getClient() {
    return this.client;
  }
}

// Использование
export const stompService = new StompService(
  localStorage.getItem('token') || 'ddddddddddd',
);
