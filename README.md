# Шаблон приложения — разработка с ИИ‑агентами

## Репозиторий и ветки
- Repository: https://github.com/borzoyuniverse/ai-prosto-i-zdorovo
- Default branches: main, develop
- Push target: origin/develop


Этот репозиторий — **шаблон** для разработки веб‑приложения с помощью ИИ‑агентов.
В нём есть минимальный каркас фронтенда и бэкенда и строгий документированный процесс
на основе Feature Pack (FP).

---

## Глоссарий (термины)

**FP (Feature Pack)** — единица поставки. Включает список CTA, страниц, эндпойнтов, тестов и критериев приёмки.

**CTA (Call To Action)** — пользовательское действие, привязанное к странице, endpoint и state. Описывается в `docs/UX_MAP.md`.

**ACK** — явное подтверждение (одобрение) стейкхолдера (пользователя). Записывается в `docs/WORKPLAN.yaml` (who/when/scope).

**ADR (Architecture Decision Record)** — короткая запись решения (контекст → решение → последствия) в `docs/QNA_DECISIONS.md`.

**RTM (Requirements Traceability Matrix)** — таблица связи требований → тестов → кода, хранится в `docs/TESTS.md`.

**UAT / BDD** — пользовательские сценарии и описание поведения в человеко‑читаемой форме.

---

## Что сделать ДО начала разработки

Перед запуском циклической разработки **все FP должны быть описаны заранее**, а `docs/WORKPLAN.yaml` заполнен.

1) **Заполнить документы‑источники истины:**
   - `docs/REQUIREMENTS.md` — требования (FR/NFR).
   - `docs/API.yaml` — контракт API.
   - `docs/MODEL.sql` — модель данных.
   - `docs/WORKPLAN.yaml` — список **всех** FP и их scope.
   - `docs/QNA_DECISIONS.md` — оставить шаблонную структуру вопросов/ответов/ADR.

2) **Что заполнить заранее в `docs/UX_MAP.md`:**
   - Для **всех CTA**: `CTA_ID`, `Page`, `Route`, `Endpoint(s)`.
   - Для **всех CTA**: строка в разделе **FP Assignment** (какой CTA относится к какому FP).
   - `State keys` и `Mock Status` можно оставить `unknown/TBD` — это заполнит агент **design‑first**.
   - Диаграммы `System Design (per CTA)` и `System Interaction Overview` тоже заполняются на **design‑first**.

3) **Что заполнить заранее в `docs/TESTS.md`:**
   - Раздел **Strategy** (уровни тестов и пороги coverage).
   - Остальное (UAT/BDD, RTM, Planned Test Files) заполняет агент **tests‑red**.

4) **Подготовить роли для Codex:**
   - В `roles/` лежат инструкции для каждого режима (discovery, design-first, tests-red, implement, tests-green, gate).
   - В чате достаточно писать `FP=... mode=...` — роли заменяют системные промпты.

5) **Проверить локальный запуск:**
   - Команды запуска и тестов — в `RUNBOOK.md`.

---

## Структура проекта

```
.
├─ AGENTS.md                     # Основной workflow и правила (источник истины процесса)
├─ README.md                     # Это руководство
├─ RUNBOOK.md                    # Запуск и тесты локально
├─ docker-compose.yml            # Локальный PostgreSQL
├─ env.example                   # Шаблон переменных окружения
├─ package.json                  # Монорепо (front/back workspaces)
├─ roles/                        # Роли (инструкции для режимов в Codex)
├─ docs/                         # Все процессные документы
├─ front/                        # React (минимальный каркас)
├─ back/                         # NestJS (минимальный каркас)
└─ examples/                     # Папка для примеров данных
```

`docs/`:

```
docs/
├─ API.yaml
├─ MODEL.sql
├─ REQUIREMENTS.md
├─ UX_MAP.md
├─ TESTS.md
├─ WORKPLAN.yaml
└─ QNA_DECISIONS.md
```

---

## Агенты и порядок работы

### Порядок этапов
1) discovery → 2) design-first → 3) tests-red → 4) implement → 5) tests-green → 6) gate

### Роли агентов
**discovery** — проверяет полноту данных для указанного FP, фиксирует вопросы/гипотезы в `QNA_DECISIONS.md`, уточняет `UX_MAP.md`, обновляет блок `FP` в `WORKPLAN.yaml`, запрашивает ACK.  
**design-first** — синхронизирует `API.yaml` ↔ `MODEL.sql`, заполняет `UX_MAP.md` по FP, рисует диаграммы, фиксирует ADR, запрашивает ACK.  
**tests-red** — сначала пишет спецификацию тестов в `TESTS.md`, получает ACK; затем пишет тест‑код и фиксирует красные прогоны.  
**implement** — реализует только scope FP, снимает моки только по `UX_MAP.md`, обновляет `UX_MAP.md` при необходимости.  
**tests-green** — гоняет тесты, проверяет пороги, сохраняет coverage и логи, добавляет demo‑notes.  
**gate** — проверяет acceptance/RTM/ADR/артефакты, фиксирует PASS/REJECT и ACK.

### Где правила
- `AGENTS.md` — полный workflow, гейты, разрешённые правки по этапам.
- `roles/README.md` — как работать в Codex.

### Как использовать агента
1) В чат пишете `FP=FP001 mode=discovery` (или другой FP и режим).
2) Агент открывает `roles/<mode>.md` и `AGENTS.md`, затем действует по инструкциям.
3) Для следующего этапа пишете новое сообщение с другим `mode`.

### Как происходит переход между этапами
1) **Discovery‑агент** фиксирует вопросы и просит стейкхолдера ответить.
2) Стейкхолдер отвечает **в файле** `docs/QNA_DECISIONS.md` в разделе **Answers** по шаблону.
3) Стейкхолдер пишет в чат: `Ответил на вопросы` — это сигнал агенту перечитать файл.
4) Агент фиксирует решения как ADR и запрашивает **ACK**.
5) Пользователь пишет в чат: `ack` — агент записывает ACK в `docs/WORKPLAN.yaml`.
6) Пользователь пишет новое сообщение с нужным `mode=...`.

Так повторяется на каждом этапе, до gate.

---

## Пошагово: как разработать приложение с нуля (полный цикл)

### Шаг 1 — Подготовить документы и FP
- Заполните `docs/REQUIREMENTS.md`, `docs/API.yaml`, `docs/MODEL.sql`.
- Заполните `docs/UX_MAP.md`: CTA/страницы/эндпойнты и FP Assignment.
- Заполните `docs/TESTS.md`: раздел Strategy и пороги coverage.
- Создайте **все FP** в `docs/WORKPLAN.yaml`.

### Шаг 2 — Подготовить роли
- Проверьте, что файлы в `roles/` соответствуют вашим процессам.
- В работе используйте только `FP=... mode=...` (без длинных промптов в чат).

### Шаг 3 — Discovery
- Введите `FP=FP001 mode=discovery` (или другой FP из `WORKPLAN.yaml`).
- Агент проверит полноту информации, зафиксирует вопросы и обновит `WORKPLAN.yaml`.

### Шаг 4 — Ответить на вопросы и получить ACK
- Ответьте на вопросы в `docs/QNA_DECISIONS.md` (раздел **Answers**).
- Напишите в чат `Ответил на вопросы`, чтобы агент перечитал файл.
- Агент переведёт ответы в ADR и запросит ACK.
- Напишите `ack` — агент зафиксирует его в `WORKPLAN.yaml`.

### Шаг 5 — Design-first
- Напишите `FP=... mode=design-first`.
- Агент синхронизирует `API.yaml`/`MODEL.sql`, заполнит `UX_MAP.md`, добавит диаграммы и запросит ACK.
- Напишите `ack`.

### Шаг 6 — Tests-red (SPEC → CODE)
- Напишите `FP=... mode=tests-red`.
- Агент заполнит спецификацию тестов в `TESTS.md` и запросит ACK.
- Напишите `ack`.
- Агент напишет тест‑код, прогонит красные тесты и сохранит логи.

### Шаг 7 — Implement
- Напишите `FP=... mode=implement`.
- Агент реализует код строго по scope FP, снимет моки по `UX_MAP.md`.

### Шаг 8 — Tests-green
- Напишите `FP=... mode=tests-green`.
- Агент прогонит тесты, проверит coverage и сохранит артефакты.

### Шаг 9 — Gate
- Напишите `FP=... mode=gate`.
- Агент проверит acceptance/RTM/ADR/артефакты и запросит ACK.
- Напишите `ack`. Агент зафиксирует PASS/REJECT в `WORKPLAN.yaml`.

---

## Артефакты

Артефакты не коммитятся. Ожидаемая структура:

```
artifacts/<FP>/<YYYY-MM-DD>/
├─ logs/
├─ coverage/
└─ evidence/
```

---

## Локальный запуск

Команды запуска — в `RUNBOOK.md`.

---

## Пример диалога (упрощённо)

Пользователь: `FP=FP001 mode=discovery`  
Агент (discovery): Прочитал REQUIREMENTS/API/MODEL/UX_MAP/TESTS/QNA/WORKPLAN. Добавил вопросы в `docs/QNA_DECISIONS.md` (Open Questions). Обновил `docs/UX_MAP.md` (заметки по CTA и соответствия). В `docs/WORKPLAN.yaml` у FP001 выставил `stage: discovery`, добавил `blockers`, заполнил `reflection`, оставил `ack.by/ack.at/ack.scope` пустыми. Нужны ответы в `QNA_DECISIONS.md` и ACK для перехода дальше.  
Пользователь: Ответил на вопросы.  
Агент (discovery): Прочитал `Answers`, закрыл вопросы и добавил ADR в `docs/QNA_DECISIONS.md`. Уточнил `docs/UX_MAP.md` по CTA. В `docs/WORKPLAN.yaml` у FP001 обновил `blockers` (снял решённые), обновил `reflection`, попросил ACK.  
Пользователь: ack  
Агент (discovery): ACK записан в `docs/WORKPLAN.yaml` для FP001.

Пользователь пишет: `FP=FP001 mode=design-first`  
Агент (design-first): Сверил `docs/API.yaml` и `docs/MODEL.sql`, расхождений нет. В `docs/UX_MAP.md` для FP001 заполнил `Page/Endpoint(s)/State keys/Mock Status` по всем CTA, добавил диаграммы `System Design (per CTA)` и `System Interaction Overview (FP)`. В `docs/WORKPLAN.yaml` для FP001 выставил `status: design-first`, обновил `reflection`, запросил ACK.  
Пользователь: ack  
Агент (design-first): ACK записан в `docs/WORKPLAN.yaml` для FP001.

Пользователь пишет: `FP=FP001 mode=tests-red`  
Агент (tests-red): В `docs/TESTS.md` для FP001 добавил UAT/BDD, RTM и Planned Test Files. В `docs/WORKPLAN.yaml` выставил `status: tests-red`, `tests_phase: spec`, обновил `reflection`, запросил ACK.  
Пользователь: ack  
Агент (tests-red): Написал тест‑код по Planned Test Files, прогнал тесты (ожидаемо красные), сохранил логи в `artifacts/<FP>/<date>/logs/`. В `docs/WORKPLAN.yaml` обновил `tests_phase: code` и `reflection`.

Пользователь пишет: `FP=FP001 mode=implement`  
Агент (implement): Реализовал функционал по scope FP, снял моки только по CTA из `docs/UX_MAP.md`. При необходимости обновил `docs/UX_MAP.md`. Прогнал тесты и сохранил coverage/logs в `artifacts/<FP>/<date>/`. В `docs/WORKPLAN.yaml` обновил `reflection`.

Пользователь пишет: `FP=FP001 mode=tests-green`  
Агент (tests-green): Прогнал тесты, проверил пороги coverage, сохранил `coverage/*.json` и логи, добавил `evidence/demo-notes.txt`. В `docs/WORKPLAN.yaml` обновил `reflection`.

Пользователь пишет: `FP=FP001 mode=gate`  
Агент (gate): Проверил Acceptance Checklist, RTM=100%, ADR/вопросы закрыты, артефакты на месте. Создал `artifacts/<FP>/<date>/evidence/links.md`. В `docs/WORKPLAN.yaml` выставил `gate_decision` и запросил ACK.  
Пользователь: ack  
Агент (gate): ACK записан, итоговая приёмка зафиксирована в `docs/WORKPLAN.yaml`.
