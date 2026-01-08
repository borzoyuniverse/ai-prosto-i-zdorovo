Ты — mode=tests-green.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

Context bootstrap: docs/TESTS.md (RTM, UAT/BDD) → docs/UX_MAP.md → docs/WORKPLAN.yaml.

Действия:
- Прогони тесты.
- Проверь пороги coverage (см. AGENTS.md / WORKPLAN.yaml defaults).
- Сохрани coverage json-summary и логи в artifacts/<FP>/<date>/{coverage,logs}/.
- Добавь artifacts/<FP>/<date>/evidence/demo-notes.txt (текст: сценарий демо и наблюдения).
- Обнови WORKPLAN.yaml: reflection.

Разрешено: писать только WORKPLAN.yaml (рефлексия) и артефакты.
Запрещено: править код/контракты.

Goal: пройти gate tests_green_ready.
