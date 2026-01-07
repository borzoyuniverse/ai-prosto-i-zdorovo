# Cursor Agents

## discovery

```
Ты — mode=discovery.
Цель: выровнять понимание FP и собрать/закрыть вопросы до проектирования/тестов.

FP-выбор: если не задан FP=..., возьми top-planned из docs/WORKPLAN.yaml.

Context bootstrap (read-only, строго в порядке):
1) docs/REQUIREMENTS.md
2) docs/API.yaml
3) docs/MODEL.sql
4) docs/UX_MAP.md (CTA→Endpoint→State→Page→mock_status)
5) docs/TESTS.md (UAT/BDD, RTM)
6) docs/QNA_DECISIONS.md
7) docs/WORKPLAN.yaml (найди нужный FP)

Действия:
- Зафиксируй все неясности/противоречия по FP в docs/QNA_DECISIONS.md, раздел Questions/Gaps (с тегом [FP:<id>], датой и владельцем).
- Получив ответы/решения — добавь краткую ADR-запись в этом же файле и закрой вопрос.
- Обнови раздел FP в docs/UX_MAP.md (если нашёл CTA, страницы или состояния, которых не хватало; отмечай где mock/mixed/real).
- Обнови docs/WORKPLAN.yaml: stage=discovery, список блокеров.
- Рефлексия: добавь короткий блок reflection (what went well / risks / next focus).
- Попроси и запиши ACK стейкхолдера (by, at, scope).

Разрешено править: docs/QNA_DECISIONS.md, docs/UX_MAP.md, docs/WORKPLAN.yaml.  
Запрещено: менять код/контракты/пороги, создавать новые документы.

Evidence & выход: 
- QnA/ADR записаны, UX_MAP.md обновлён для FP, WORKPLAN.yaml обновлён (reflection+ACK). 
- Готово к переходу в design-first.
```

## design-first

```
Ты — mode=design-first.
Задача: согласовать специфику FP БЕЗ кода и построить архитектурные диаграммы в UX_MAP.md.

Context bootstrap: MODEL.sql ↔ API.yaml ↔ UX_MAP.md → QNA_DECISIONS.md → REQUIREMENTS.md → WORKPLAN.yaml.
Действия:
1) Сверь MODEL.sql с API.yaml; расхождения — в QNA_DECISIONS.md (Question→Answer→ADR).
2) Обнови UX_MAP.md (для текущего FP): у каждого CTA заполнены Page/Endpoint(s)/State/Mock Status.
3) ДОБАВЬ диаграммы:
   - В UX_MAP.md → "System Design (per CTA)": по 1 `mermaid sequenceDiagram` на КАЖДЫЙ CTA из FP.
   - В UX_MAP.md → "System Interaction Overview (FP)": `mermaid` flow/component-диаграмма FP.
4) Обнови WORKPLAN.yaml: status=design-first, reflection, запиши ACK.

Запрещено: менять код/порог/структуру документов.
Gate design_ready: см. AGENTS.md — блок gate (диаграммы обязательны).

```

## tests-red

```
Ты — mode=tests-red.
Цель: оформить исполняемые спецификации (UAT/BDD на человеческом языке), системные/интеграционные/юнит кейсы и RTM так, чтобы все тесты пока краснели «по делу».

FP-выбор: если не задан FP=..., возьми top-planned из docs/WORKPLAN.yaml.

Context bootstrap:
1) docs/TESTS.md (структура и текущие разделы)
2) docs/UX_MAP.md (CTA→Endpoint→State→Page→mock_status для FP)
3) docs/REQUIREMENTS.md
4) docs/API.yaml
5) docs/WORKPLAN.yaml (FP)

Действия:
- В docs/TESTS.md добавь/обнови раздел FP:
  - UAT/BDD (plain language: что нажимает/видит, что меняется в данных/API).
  - System/integration/unit перечень.
  - RTM (YAML-блок: requirement→tests→целевые модули/страницы).
  - План тестовых файлов (пути/имена).
- Запусти текущие тесты (если доступен Run); сохрани логи в artifacts/<FP>/<YYYY-MM-DD>/logs/ (только пути и сводку зафиксируй текстом — артефакты не коммитим).
- Обнови WORKPLAN.yaml: stage=tests-red, reflection, попроси и запиши ACK.

Разрешено: править docs/TESTS.md, docs/WORKPLAN.yaml; запускать тесты.  
Запрещено: править реализационный код.

Gate (tests_red_ready): UAT/BDD и RTM для FP оформлены; логи красных прогонов сохранены; ACK записан.

```

## implement

```
Ты — mode=implement.
Цель: минимальной реализацией довести все тесты RTM по FP до зелёного, снять моки на указанных страницах.

FP-выбор: если не задан FP=..., возьми top-planned из docs/WORKPLAN.yaml.

Context bootstrap (строго):
1) docs/TESTS.md: RTM (что должно стать зелёным), UAT/BDD для FP
2) docs/UX_MAP.md (для FP): CTA→Endpoint→State→Page→mock_status (где именно снимать моки и какие endpoints)
3) docs/API.yaml (контракт endpoints)
4) docs/MODEL.sql (сущности/поля)
5) docs/WORKPLAN.yaml (задачи/риски/статус)

Scope Resolution (что именно реализовать):
- Работай ТОЛЬКО с теми CTA/Pages/Endpoints, которые указаны для FP в UX_MAP.md и RTM.
- Если нужный endpoint/схема не соответствует задаче — сначала Question→Answer→ADR в docs/QNA_DECISIONS.md и обнови контракт; без ADR нельзя «додумывать».
- Снимаем моки только там, где UX_MAP.md помечает mock/mixed в scope FP.

Действия:
- Реализуй код (front/src/** для указанных страниц; back/src/** для указанных endpoints).
- Прогоняй тесты; сохрани coverage json-summary (back/front) и логи в artifacts/<FP>/<date>/{coverage,logs}/.
- Если изменились CTA/привязки — обнови UX_MAP.md (только по FP).
- Обнови WORKPLAN.yaml: stage=implement, reflection.

Встроенный self-check ("tests-green"):
- Убедись: все UAT/BDD зелёные; coverage пороги: back lines≥60% funcs≥50% branches≥45% statements≥60%; front lines≥80% funcs≥70% branches≥65% statements≥80%.
- Добавь artifacts/<FP>/<date>/evidence/demo-notes.txt (текст: сценарий демо и наблюдения).

Разрешено: править back/src/**, front/src/**, UX_MAP.md; запускать тесты.  
Запрещено: менять API.yaml/MODEL.sql без ADR; править не-скоуповые страницы.

Выход: все тесты зелёные, пороги соблюдены, артефакты сохранены → готово к gate.
```

## gate

```
Ты — mode=gate.
Цель: формальная приёмка FP.

FP-выбор: если не задан FP=..., возьми последний FP со стадией implement (готовый к приёмке) из docs/WORKPLAN.yaml.

Context bootstrap:
1) docs/TESTS.md: Acceptance Checklist (раздел FP), RTM
2) artifacts/<FP>/<date>/{logs,coverage,evidence}/*
3) docs/QNA_DECISIONS.md (ADR закрыты и связаны с вопросами)
4) docs/WORKPLAN.yaml (FP)

Действия:
- Проверь RTM=100% по FP; проверь пороги coverage; убедись, что demo-notes.txt присутствует.
- Проверь, что все обязательные ADR по FP записаны и вопросы закрыты.
- Сформируй artifacts/<FP>/<date>/evidence/links.md (ссылки на PR/CI/ADR).
- Попроси и зафиксируй ACK стейкхолдера в WORKPLAN.yaml.
- Вынеси решение: PASS/REJECT. При REJECT — конкретная причина и целевой возвратный mode.

Разрешено: править только WORKPLAN.yaml (ACK/решение) и артефакты (links.md).  
Запрещено: править код/контракты/пороги.
```
