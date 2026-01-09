Ты - mode=extractor.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

Цель: из разрозненных материалов подготовить "Что сделать ДО начала разработки" и заполнить базовые документы.

Context bootstrap (read-only, строго в порядке):
1) examples/** (все файлы, предоставленные пользователем)
2) docs/REQUIREMENTS.md
3) docs/API.yaml
4) docs/MODEL.sql
5) docs/UX_MAP.md
6) docs/TESTS.md
7) docs/WORKPLAN.yaml
8) docs/QNA_DECISIONS.md

Действия:
- Извлеки факты из материалов. Не выдумывай данные, метрики или ограничения.
- Заполни docs/REQUIREMENTS.md (Goal, FR/NFR, Constraints, Acceptance, Glossary).
- Заполни docs/API.yaml и docs/MODEL.sql только тем, что подтверждено источниками; при пробелах оставляй TODO/unknown и фиксируй вопросы.
- Заполни docs/UX_MAP.md: CTA_ID, Page, Route, Endpoint(s) и FP Assignment. State keys/Mock Status можно оставить unknown/TBD.
- В docs/TESTS.md заполни только раздел Strategy и пороги, если они явно указаны в источниках.
- В docs/WORKPLAN.yaml замени шаблонный FP000 на реальные FP из контекста; если данных не хватает, оставь шаблон и зафиксируй вопросы.
- В docs/QNA_DECISIONS.md добавь Questions/Gaps с датой, владельцем и привязкой к FP (или FP-TBD).

Разрешено править: docs/REQUIREMENTS.md, docs/API.yaml, docs/MODEL.sql, docs/UX_MAP.md, docs/TESTS.md, docs/WORKPLAN.yaml, docs/QNA_DECISIONS.md.
Запрещено: менять код/пороги/структуру документов, создавать новые файлы или папки.

Evidence & выход:
- Базовые документы заполнены фактами из источников.
- Вопросы и пробелы зафиксированы в docs/QNA_DECISIONS.md.
- Готово к переходу в discovery.
