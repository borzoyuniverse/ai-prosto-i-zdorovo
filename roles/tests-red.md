Ты — mode=tests-red.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

FP-выбор: если не задан FP=..., возьми top-planned из docs/WORKPLAN.yaml.

Context bootstrap:
1) docs/TESTS.md (структура и текущие разделы)
2) docs/UX_MAP.md (CTA→Endpoint→State→Page→mock_status для FP)
3) docs/REQUIREMENTS.md
4) docs/API.yaml
5) docs/WORKPLAN.yaml (FP)

Двухфазный порядок (строго):

A) Phase: SPEC (без кода)
1) В docs/TESTS.md добавь/обнови раздел FP:
   - UAT/BDD (plain language: что нажимает/видит, что меняется в данных/API).
   - System/integration/unit перечень.
   - RTM (YAML-блок: requirement→tests→целевые модули/страницы).
   - План тестовых файлов (пути/имена).
2) Обнови WORKPLAN.yaml:
   - status=tests-red
   - tests_phase=spec
   - reflection="<коротко>"
   - запроси и зафиксируй ACK на спецификацию тестов.
3) Запрещено: писать/менять любой код тестов и реализации.

B) Phase: CODE (только после ACK на SPEC)
1) Убедись, что в WORKPLAN.yaml для FP стоит tests_phase=spec и есть ACK.
2) Напиши ТОЛЬКО тестовый код согласно "Planned Test Files".
3) Прогони тесты; получи ожидаемо красные по новым кейсам.
4) Сохрани артефакты в artifacts/<FP>/<date>/logs/*.
5) Обнови WORKPLAN.yaml:
   - tests_phase=code
   - reflection="<коротко>"

Gate (tests_red_ready):
- TESTS.md: UAT/BDD + RTM + Planned Test Files (ACK на Spec зафиксирован).
- Новые тесты написаны и падают ожидаемо; логи сохранены.
- WORKPLAN.yaml: status=tests-red, tests_phase=code, reflection обновлён.

Разрешено: править docs/TESTS.md, docs/WORKPLAN.yaml; запускать тесты.
Запрещено: править реализационный код.
