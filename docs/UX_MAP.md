# UX Action Map (CTA -> Endpoint -> State -> Page)

> Source of truth for implement: only CTAs listed here can have mocks removed within an FP.

## MVP CTA

| CTA_ID | Page (React) | Route | Mock Status (mock/mixed/real/unknown) | Endpoint(s) (method path) | State keys | Notes |
|---|---|---|---|---|---|---|
| CTA-003 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/main-page/main-page.tsx | / | mock | RPC get-appointments; RPC get-recommendations | client.appointments, recommendations.last | MVP: Main page (appointments list + last recommendation) |
| CTA-004 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/chat-with-curator/chat-with-curator.tsx | /chat-with-curator | mock | RPC get-chats; RPC get-messages | chats.list; chats.messages | MVP: Client chat with curator only |
| CTA-005 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/consultation-select/consultation-select.tsx | /specialists/consultation-select | mock | RPC get-appointment-types | appointments.select | MVP: Start booking (consultation type selection) |
| CTA-006 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/filling-questionnaire/filling-questionnaire.tsx | /filling-questionnaire | mock | RPC search-form; RPC get-form-template; RPC form-submission | questionnaires.submit | MVP: Post-booking questionnaire |
| CTA-008 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/client-recommendations/client-recommendations.tsx | /client-recommendations | mock | RPC get-recommendations; RPC recommendations-specialist | recommendations.list; recommendations.filters | MVP: Client recommendations page |
| CTA-019 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/profile/profile.tsx | /profile | mock | RPC get-profile | clients.profile | MVP: Client profile page; view-only (FR-026) |
| CTA-020 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/consultation-appointment/consultation-appointment.tsx | /specialists/$consultationTypeId/consultation-appointment | mock | RPC specialist-available; RPC get-goals; RPC free-slots; RPC create-appointment; RPC confirm-appointment | appointments.create | MVP: Confirm appointment (slot + confirmation steps) |

## vNext CTA

| CTA_ID | Page (React) | Route | Mock Status (mock/mixed/real/unknown) | Endpoint(s) (method path) | State keys | Notes |
|---|---|---|---|---|---|---|
| CTA-001 | TBD | /register | unknown | POST /auth/register; POST /auth/verify-sms; POST /auth/verify-email | auth.registration | vNext: Client registration by policy |
| CTA-002 | TBD | /login | unknown | POST /auth/login | auth.session | vNext: Client login |
| CTA-007 | TBD | /meetings/:id | unknown | GET /appointments/{appointmentId} | meetings.link | vNext: Join video meeting (Yandex Telemost) |
| CTA-009 | TBD | /questionnaires | unknown | GET /clients/{clientId}/questionnaires | questionnaires.list | vNext: Client questionnaires list |
| CTA-010 | TBD | /notifications | unknown | GET /clients/{clientId}/notifications | notifications.list | vNext: Client notifications |
| CTA-011 | TBD | /specialist/login | unknown | POST /auth/login | auth.session | vNext: Specialist login |
| CTA-012 | TBD | /specialist/schedule | unknown | GET /specialists/{specialistId}/schedule; PUT /specialists/{specialistId}/schedule | specialist.schedule | vNext: Manage schedule (Yandex Calendar) |
| CTA-013 | TBD | /specialist/chats | unknown | GET /chats | chats.list | vNext: Specialist chats with curator only |
| CTA-014 | TBD | /specialist/clients/:id/questionnaire | unknown | GET /specialists/{specialistId}/clients/{clientId}/questionnaire | questionnaires.view | vNext: Specialist views client questionnaire |
| CTA-015 | TBD | /specialist/recommendations/new | unknown | POST /specialists/{specialistId}/recommendations | recommendations.create | vNext: Specialist creates recommendation |
| CTA-016 | TBD | /curator/login | unknown | POST /auth/login | auth.session | vNext: Curator login |
| CTA-017 | TBD | /curator/chats | unknown | GET /curator/chats | chats.list | vNext: Curator views all chats |
| CTA-018 | TBD | /curator/schedules | unknown | GET /curator/schedules | schedules.list | vNext: Curator views specialists' calendars |

### Notes
- Each row is a unit of implementation scope.
- If a page is partially real, use `mixed` and list which parts remain mocked.
- React prototypes for MVP are in `front/handmade/proj-prosto-zdorovo-frontend-develop`.
- CTA_ID uses format CTA-### and must be unique.
- FP001 scope is MVP only (front/handmade); vNext CTAs are deferred.

### FP Assignment
| CTA_ID | Page | Endpoint(s) | Assigned FP |
|---|---|---|---|
| CTA-003 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/main-page/main-page.tsx | RPC get-appointments; RPC get-recommendations | FP001 |
| CTA-004 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/chat-with-curator/chat-with-curator.tsx | RPC get-chats; RPC get-messages | FP001 |
| CTA-005 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/consultation-select/consultation-select.tsx | RPC get-appointment-types | FP001 |
| CTA-006 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/filling-questionnaire/filling-questionnaire.tsx | RPC search-form; RPC get-form-template; RPC form-submission | FP001 |
| CTA-008 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/client-recommendations/client-recommendations.tsx | RPC get-recommendations; RPC recommendations-specialist | FP001 |
| CTA-019 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/profile/profile.tsx | RPC get-profile | FP001 |
| CTA-020 | front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/consultation-appointment/consultation-appointment.tsx | RPC specialist-available; RPC get-goals; RPC free-slots; RPC create-appointment; RPC confirm-appointment | FP001 |

### FP Assignment (vNext)
| CTA_ID | Page | Endpoint(s) | Assigned FP |
|---|---|---|---|
| CTA-001 | TBD | POST /auth/register; POST /auth/verify-sms; POST /auth/verify-email | TBD |
| CTA-002 | TBD | POST /auth/login | TBD |
| CTA-007 | TBD | GET /appointments/{appointmentId} | TBD |
| CTA-009 | TBD | GET /clients/{clientId}/questionnaires | TBD |
| CTA-010 | TBD | GET /clients/{clientId}/notifications | TBD |
| CTA-011 | TBD | POST /auth/login | FP002 |
| CTA-012 | TBD | GET /specialists/{specialistId}/schedule; PUT /specialists/{specialistId}/schedule | FP002 |
| CTA-013 | TBD | GET /chats | FP002 |
| CTA-014 | TBD | GET /specialists/{specialistId}/clients/{clientId}/questionnaire | FP002 |
| CTA-015 | TBD | POST /specialists/{specialistId}/recommendations | FP002 |
| CTA-016 | TBD | POST /auth/login | FP003 |
| CTA-017 | TBD | GET /curator/chats | FP003 |
| CTA-018 | TBD | GET /curator/schedules | FP003 |

### System Design (per CTA)

#### CTA-003: Main page / appointments list

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(MainPage)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(AppointmentsService)
  participant R as Repo(AppointmentsRepo)

  U->>P: Open "/"
  P->>S: dispatch(loadAppointments)
  S->>C: POST /api/webhook/json-rpc/?method=get-appointments {userId}
  C->>SV: validate & call
  SV->>R: query by userId
  SV-->>C: result {appointments}
  C-->>S: return {appointments}
  S-->>P: update state
  P-->>U: render appointments list
  P->>S: dispatch(loadLastRecommendation)
  S->>C: POST /api/webhook/json-rpc/?method=get-recommendations {specialistTypes}
  C->>SV: validate & call
  SV->>R: query recommendations
  SV-->>C: result {recommendations}
  C-->>S: return {recommendations}
  S-->>P: update state
  P-->>U: render last recommendation
```

#### CTA-004: Chat with curator

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(ChatWithCurator)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(ChatService)
  participant R as Repo(ChatRepo)

  U->>P: Open "/chat-with-curator"
  P->>S: dispatch(loadChats)
  S->>C: POST /api/webhook/json-rpc/?method=get-chats {userId}
  C->>SV: validate & call
  SV->>R: list chats for user
  SV-->>C: result {chats}
  C-->>S: return {chats}
  S-->>P: update state
  P-->>U: render chat list
  U->>P: Select chat
  P->>S: dispatch(loadMessages)
  S->>C: POST /api/webhook/json-rpc/?method=get-messages {chatId}
  C->>SV: validate & call
  SV->>R: query messages
  SV-->>C: result {messages}
  C-->>S: return {messages}
  S-->>P: update state
  P-->>U: render messages
```

#### CTA-005: Consultation type selection

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(ConsultationSelect)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(ConsultationTypesService)
  participant R as Repo(ConsultationTypesRepo)

  U->>P: Open "/specialists/consultation-select"
  P->>S: dispatch(loadAppointmentTypes)
  S->>C: POST /api/webhook/json-rpc/?method=get-appointment-types {}
  C->>SV: validate & call
  SV->>R: query consultation types
  SV-->>C: result {consultationTypes}
  C-->>S: return {consultationTypes}
  S-->>P: update state
  P-->>U: render types list
```

#### CTA-006: Filling questionnaire

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(FillingQuestionnaire)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(QuestionnaireService)
  participant R as Repo(QuestionnaireRepo)

  U->>P: Open "/filling-questionnaire"
  P->>S: dispatch(searchForm)
  S->>C: POST /api/webhook/json-rpc/?method=search-form {filters}
  C->>SV: validate & call
  SV->>R: find templates
  SV-->>C: result {forms}
  C-->>S: return {forms}
  S-->>P: update state
  P->>S: dispatch(loadTemplate)
  S->>C: POST /api/webhook/json-rpc/?method=get-form-template {id}
  C->>SV: validate & call
  SV->>R: load template
  SV-->>C: result {schema}
  C-->>S: return {schema}
  S-->>P: render form
  U->>P: Submit questionnaire
  P->>S: dispatch(submitForm)
  S->>C: POST /api/webhook/json-rpc/?method=form-submission {answers}
  C->>SV: validate & call
  SV->>R: save responses
  SV-->>C: result {status}
  C-->>S: return {status}
  S-->>P: show success
```

#### CTA-008: Recommendations list

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(ClientRecommendations)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(RecommendationsService)
  participant R as Repo(RecommendationsRepo)

  U->>P: Open "/client-recommendations"
  P->>S: dispatch(loadSpecialistTypes)
  S->>C: POST /api/webhook/json-rpc/?method=recommendations-specialist {userId}
  C->>SV: validate & call
  SV->>R: query specialist types
  SV-->>C: result {types}
  C-->>S: return {types}
  S-->>P: update filters
  P->>S: dispatch(loadRecommendations)
  S->>C: POST /api/webhook/json-rpc/?method=get-recommendations {specialistTypes}
  C->>SV: validate & call
  SV->>R: query recommendations
  SV-->>C: result {recommendations}
  C-->>S: return {recommendations}
  S-->>P: update state
  P-->>U: render recommendations list
```

#### CTA-019: Client profile

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(Profile)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(ProfileService)
  participant R as Repo(ProfileRepo)

  U->>P: Open "/profile"
  P->>S: dispatch(loadProfile)
  S->>C: POST /api/webhook/json-rpc/?method=get-profile {userId}
  C->>SV: validate & call
  SV->>R: query profile
  SV-->>C: result {profile}
  C-->>S: return {profile}
  S-->>P: update state
  P-->>U: render profile
```

#### CTA-020: Appointment booking and confirmation

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(ConsultationAppointment)
  participant S as FrontStore
  participant C as API Controller(/api/webhook/json-rpc/)
  participant SV as Service(AppointmentFlowService)
  participant R as Repo(AppointmentsRepo)
  participant EXT as External(Yandex Calendar)

  U->>P: Open "/specialists/:consultationTypeId/consultation-appointment"
  P->>S: dispatch(checkAvailability)
  S->>C: POST /api/webhook/json-rpc/?method=specialist-available {consultationTypeId}
  C->>SV: validate & call
  SV->>R: check rules
  SV-->>C: result {canBook}
  C-->>S: return {canBook}
  S-->>P: update state
  P->>S: dispatch(loadGoals)
  S->>C: POST /api/webhook/json-rpc/?method=get-goals {consultationTypeId}
  C->>SV: validate & call
  SV->>R: query goals
  SV-->>C: result {goals}
  C-->>S: return {goals}
  S-->>P: update state
  P->>S: dispatch(loadFreeSlots)
  S->>C: POST /api/webhook/json-rpc/?method=free-slots {consultationTypeId, date, sameSpecialist}
  C->>SV: validate & call
  SV->>EXT: fetch availability
  SV-->>C: result {slots}
  C-->>S: return {slots}
  S-->>P: update state
  U->>P: Select slot and confirm
  P->>S: dispatch(createAppointment)
  S->>C: POST /api/webhook/json-rpc/?method=create-appointment {consultationTypeId, goalId, slotId}
  C->>SV: validate & call
  SV->>R: create appointment
  SV-->>C: result {appointmentId}
  C-->>S: return {appointmentId}
  S-->>P: update state
  P->>S: dispatch(confirmAppointment)
  S->>C: POST /api/webhook/json-rpc/?method=confirm-appointment {appointmentId}
  C->>SV: validate & call
  SV->>R: confirm appointment
  SV-->>C: result {confirmation}
  C-->>S: return {confirmation}
  S-->>P: show confirmation
```

### System Interaction Overview (FP)

```mermaid
flowchart LR
  subgraph Frontend
    PC[Pages: Main/Chat/Consultation/Questionnaire/Profile/Recommendations]
    ST[FrontStore]
    RPC[RPC Client]
  end
  subgraph Backend
    CTRL[Controller: JsonRpcController]
    SVC[Services]
    REPO[Repos]
    DB[(PostgreSQL)]
  end
  EXT[External: Yandex Calendar]

  PC --> ST --> RPC --> CTRL --> SVC --> REPO --> DB
  SVC --> EXT
```

## Impact Analysis (CR)

| Change ID | CTA_ID | Files.front | Files.back | Tests.toCreateOrUpdate |
|---|---|---|---|---|
| CR-20260108-01 | CTA-004 | ["front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/chat-with-curator/chat-with-curator.tsx","front/handmade/proj-prosto-zdorovo-frontend-develop/src/api/rpc-request/chat/use-get-messages-by-chatid.ts","front/handmade/proj-prosto-zdorovo-frontend-develop/src/feature/chat/message-list/messages-list.tsx"] | ["back/src/jsonrpc.controller.ts","back/src/jsonrpc.service.ts"] | ["front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-chat-with-curator.test.tsx","back/test/fp001-chats.e2e-spec.ts"] |
| CR-20260108-01 | CTA-008 | ["front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/client-recommendations/client-recommendations.tsx","front/handmade/proj-prosto-zdorovo-frontend-develop/src/api/rpc-request/recommendation/use-get-recommendations-specialist.ts","front/handmade/proj-prosto-zdorovo-frontend-develop/src/app/pages/client-recommendations/components/filters-carousel.tsx"] | ["back/src/jsonrpc.controller.ts","back/src/jsonrpc.service.ts"] | ["front/handmade/proj-prosto-zdorovo-frontend-develop/src/testing/fp001-client-recommendations.test.tsx","back/test/fp001-recommendations.e2e-spec.ts"] |
