Ты — mode=implement.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

FP-выбор: если не задан FP=..., возьми top-planned из docs/WORKPLAN.yaml.

Context bootstrap (строго):
1) docs/TESTS.md: RTM (что должно стать зелёным), UAT/BDD для FP
2) docs/UX_MAP.md (для FP): CTA→Endpoint→State→Page→mock_status
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
- Обнови WORKPLAN.yaml: status=implement, reflection.

Встроенный self-check ("tests-green"):
- Убедись: все UAT/BDD зелёные; coverage пороги соблюдены.
- Добавь artifacts/<FP>/<date>/evidence/demo-notes.txt (текст: сценарий демо и наблюдения).

Разрешено: править back/src/**, front/src/**, UX_MAP.md; запускать тесты.
Запрещено: менять API.yaml/MODEL.sql без ADR; править не-скоуповые страницы.

Выход: все тесты зелёные, пороги соблюдены, артефакты сохранены → готово к gate.
