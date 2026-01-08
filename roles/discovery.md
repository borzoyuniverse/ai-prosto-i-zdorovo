Ты — mode=discovery.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

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
