const http = require('http');
const StompServer = require('stomp-broker-js');
const { v4: uuidv4 } = require('uuid');

const port = 8080;

// HTTP + WS сервер
const httpServer = http.createServer();
httpServer.listen(port, () => console.log(`STOMP server on :${port}`));

// STOMP поверх ws://localhost:8080/ws
const stompServer = new StompServer({
  server: httpServer,
  path: '/ws',
});

stompServer.on('connection', (socket) => {
  console.log('Новый клиент подключился');
});

stompServer.subscribe('/send-message', (frame) => {
  const body = JSON.parse(frame);
  const newMessage = {
    ...body,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  stompServer.send('/topic/chat/1', {}, JSON.stringify(newMessage));
  console.log('Message broadcasted:', newMessage);
});

stompServer.subscribe('/read-message', (frame) => {
  const body = JSON.parse(frame);

  chatUnredCount.forEach((item) => {
    if (item.userId === 'user1') {
      item.unreadCount = 0;
    }
  });

  stompServer.send(
    '/topic/user/user1/unread-updated',
    {},
    JSON.stringify({ chatId: '1', unreadCount: chatUnredCount[0].unreadCount }),
  );
  console.log('Read message:', body.chatId);
});

const chatUnredCount = [
  {
    id: '1',
    chatId: '1',
    userId: 'user1',
    unreadCount: 0,
  },
];

// Тестовое сообщение каждые 5 сек
setInterval(() => {
  const msg = {
    id: uuidv4(),
    chatId: '1',
    senderId: 'user2',
    text: 'Solio soleo arbustum confero tumultus magni denuncio umquam verbera fugiat.',
    createdAt: new Date().toISOString(),
  };

  stompServer.send('/topic/chat/1', {}, JSON.stringify(msg));

  chatUnredCount.forEach((item) => {
    if (item.userId === 'user1') {
      item.unreadCount = item.unreadCount + 1;
    }
  });

  stompServer.send(
    '/topic/user/user1/unread-updated',
    {},
    JSON.stringify({ chatId: '1', unreadCount: chatUnredCount[0].unreadCount }),
  );

  console.log('Mock message sent');
}, 5000);
