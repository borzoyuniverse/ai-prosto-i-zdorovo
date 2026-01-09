# TESTS

## 1. Strategy
- Levels: UAT (e2e), System/Integration, Unit.
- Coverage thresholds:
  - Back: lines 0.60, functions 0.50, branches 0.45, statements 0.60
  - Front: lines 0.80, functions 0.70, branches 0.65, statements 0.80
- Evidence: save logs and coverage json-summary in artifacts/<FP>/<date>/.

### Нумерация
- UAT-###: пользовательские сценарии.
- INT-###: системные/интеграционные тесты.
- UNIT-###: модульные тесты.

## 2. UAT / BDD Scenarios (plain language)

### FP001
- UAT-001: Главная страница показывает ближайшую консультацию и последнюю рекомендацию
  - Preconditions: Пользователь авторизован; у пользователя есть минимум 1 консультация и 1 рекомендация.
  - Steps: Открыть главную страницу "/".
  - Expected (UI): Блок "Следующая консультация" заполнен; блок "Последняя рекомендация" содержит данные.
  - Expected (API): RPC get-appointments; RPC get-recommendations (для последней рекомендации).

- UAT-002: Чат с куратором отображает список чатов пользователя
  - Preconditions: Пользователь авторизован; есть минимум 1 чат.
  - Steps: Открыть страницу "/chat-with-curator".
  - Expected (UI): Список чатов отображается; непрочитанные сообщения показывают счетчик.
  - Expected (API): RPC get-chats.

- UAT-003: Выбор типа консультации отображает доступные типы
  - Preconditions: Пользователь авторизован.
  - Steps: Открыть страницу "/specialists/consultation-select".
  - Expected (UI): Список типов консультаций отображается.
  - Expected (API): RPC get-appointment-types.

- UAT-004: Запись на консультацию проходит через выбор цели, слота и подтверждение
  - Preconditions: Пользователь авторизован; есть доступные цели и слоты.
  - Steps: Открыть "/specialists/:consultationTypeId/consultation-appointment" и пройти шаги выбора слота и подтверждения.
  - Expected (UI): После подтверждения отображается экран подтверждения записи.
  - Expected (API): RPC specialist-available; RPC get-goals; RPC free-slots; RPC create-appointment; RPC confirm-appointment.

- UAT-005: Заполнение анкеты отправляет ответы и показывает подтверждение
  - Preconditions: Пользователь авторизован; анкета доступна.
  - Steps: Открыть "/filling-questionnaire", выбрать форму, заполнить и отправить.
  - Expected (UI): Отображается подтверждение успешной отправки.
  - Expected (API): RPC search-form; RPC get-form-template; RPC form-submission.

- UAT-006: Рекомендации отображаются списком
  - Preconditions: Пользователь авторизован; есть минимум 1 рекомендация.
  - Steps: Открыть "/client-recommendations".
  - Expected (UI): Отображается список рекомендаций.
  - Expected (API): RPC get-recommendations.

- UAT-007: Профиль пользователя отображает персональные данные и пакет
  - Preconditions: Пользователь авторизован; профиль заполнен.
  - Steps: Открыть "/profile".
  - Expected (UI): Отображаются личные данные и пакет.
  - Expected (API): RPC get-profile.

## 3. System / Integration / Unit (summary)
- Back: e2e JsonRpcController для RPC методов FP001; сервисы/репозитории для appointments, chats, recommendations, profile, questionnaire.
- Front: интеграционные тесты страниц FP001 (рендер + обработка RPC ответов); unit тесты стор/хук-оберток RPC.

## 4. RTM (Requirements Traceability Matrix)
```yaml
rtm:
  - req: FR-003
    tests:
      uat: [UAT-001]
      system: [INT-001]
      unit: [UNIT-001]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/main-page/main-page.tsx"
      back:
        - "back/src"
  - req: FR-004
    tests:
      uat: [UAT-002]
      system: [INT-002]
      unit: [UNIT-002]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/chat-with-curator/chat-with-curator.tsx"
      back:
        - "back/src"
  - req: FR-005
    tests:
      uat: [UAT-004]
      system: [INT-003]
      unit: [UNIT-003]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/consultation-appointment/consultation-appointment.tsx"
      back:
        - "back/src"
  - req: FR-006
    tests:
      uat: [UAT-005]
      system: [INT-004]
      unit: [UNIT-004]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/filling-questionnaire/filling-questionnaire.tsx"
      back:
        - "back/src"
  - req: FR-008
    tests:
      uat: [UAT-006]
      system: [INT-005]
      unit: [UNIT-005]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/client-recommendations/client-recommendations.tsx"
      back:
        - "back/src"
  - req: ADR-2026-01-08-12
    tests:
      uat: [UAT-007]
      system: [INT-006]
      unit: [UNIT-006]
    code_targets:
      front:
        - "front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/profile/profile.tsx"
      back:
        - "back/src"
```

## 5. Acceptance Checklist (per FP)

* [ ] All relevant UAT scenarios are green
* [ ] Coverage thresholds met
* [ ] RTM covers requirements
* [ ] UX_MAP.md updated (CTA/Endpoints/Pages/Mock)
* [ ] QNA_DECISIONS.md has ADRs for critical decisions

## 6. Test Files Plan (FP001)
- Back:
  - back/test/fp001-jsonrpc.e2e-spec.ts
  - back/test/fp001-appointments.e2e-spec.ts
  - back/test/fp001-questionnaire.e2e-spec.ts
  - back/test/fp001-recommendations.e2e-spec.ts
  - back/test/fp001-profile.e2e-spec.ts
  - back/test/fp001-chats.e2e-spec.ts
- Front:
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-main-page.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-chat-with-curator.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-consultation-select.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-consultation-appointment.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-filling-questionnaire.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-client-recommendations.test.tsx
  - front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-profile.test.tsx
