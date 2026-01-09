# RUNBOOK — как запускать и проверять


## Требования
- Node.js 20.x, PNPM/NPM
- Docker + Postgres (локально)
- Порты: API 3000, DB 54329

## Первый запуск
```bash
# корень репо
npm install
# база (если нужна)
cp env.example .env
docker compose up -d db
# бэкенд
set -a; . ./.env; set +a
npm -w back run migrate
npm -w back run dev
# фронт
npm -w front run dev
```

## Тесты

```bash
npm -w back run test
npm -w back run test:e2e
npm -w front run test
```

## Мок WebSocket

```bash
# Запуск мокового STOMP-брокера для чата
cd front/handmade/proj-prosto-zdorovo-frontend-develop
pnpm run dev:mock:ws
```
