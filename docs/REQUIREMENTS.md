# REQUIREMENTS

> Scope: project-level. Stable IDs FR-00X/NFR-00X. Bind to Feature Packs later (see WORKPLAN.yaml, RTM in TESTS.md).

## 1. Scope & Goals
- Goal: MVP platform for clients, specialists, and curators to manage consultations, questionnaires, recommendations, chats, schedules, and notifications.

## 1.1 Нумерация
- FR-###: функциональные требования, сквозная нумерация.
- NFR-###: нефункциональные требования, сквозная нумерация.
- A-###: критерии приемки, при необходимости ссылаются на FR-###.

## 2. Functional Requirements (FR)
- FR-001 Client registration by insurance policy with verification of client data from insurer lists.
- FR-002 Client authentication by email + password.
- FR-003 Client main page shows ближайшая запись and последняя рекомендация.
- FR-004 Client chats with curator only; booking initiated through chat.
- FR-005 Booking to specialist uses schedule stored in Yandex Calendar.
- FR-006 Client fills questionnaire after booking via link.
- FR-007 Client video meeting via Yandex Telemost.
- FR-008 Client recommendations page shows recommendations from specialist.
- FR-009 Client questionnaires page shows all completed questionnaires.
- FR-010 Client notifications page shows notifications and reminders.
- FR-011 Specialist authentication by email + password.
- FR-012 Specialist manages schedule via Yandex Calendar.
- FR-013 Specialist chats with curator only.
- FR-014 Specialist views client questionnaire before consultation.
- FR-015 Specialist creates recommendations after consultation.
- FR-016 Curator authentication by email + password.
- FR-017 Curator views all chats.
- FR-018 Curator views calendars of all specialists.
- FR-019 Role-based access to client data per access matrix (curator/specialist only for their clients; founders full access).
- FR-020 Store/import client and insurer data fields from insurer lists and registration (see docs/raw tables).
- FR-021 Store specialist data fields for onboarding (see docs/raw tables).
- FR-022 Notifications support consultation events and reminders per templates.
- FR-023 Registration requires consent to data processing policy and stores acceptance.
- FR-024 Client verification uses daily import from insurer lists (Excel on Yandex Disk).
- FR-025 Recommendations may include text and files (pdf, jpg) delivered via curator.
- FR-026 Client can view their profile data on the profile page.

## 3. Non-Functional Requirements (NFR)
- NFR-001 Access control must enforce role-based visibility of client data (see access matrix).
- NFR-002 Backend implementation uses Spring Boot with Kotlin.

## 4. Constraints & Assumptions
- External services: Yandex Calendar for specialist schedules; Yandex Telemost for video meetings; S3 storage for video/transcripts; SMS and Email services for verification (providers TBD).
- Data sources: insurer lists for policy and program data; some questionnaires/tasks currently stored manually and require integration.
- Messaging/notifications: in-app and email for MVP; Wazzup link only, no integration.
- Yandex 360 organization and service applications are required for API access to Yandex services.
- MVP scheduling: specialist availability is maintained in Excel on Yandex Disk and synced daily to Yandex Calendar by a script.

## 5. Acceptance (high-level)
- A-001 for FR-001: Client can register using policy data and complete SMS/email verification.
- A-002 for FR-002: Client can log in with email + password.
- A-003 for FR-003: Client sees next consultation and last recommendation on the main page.
- A-004 for FR-004/FR-005: Client can book a specialist via chat using available schedule slots.
- A-005 for FR-006: Client can open and submit the post-booking questionnaire.
- A-006 for FR-007: Client can join a consultation via Yandex Telemost link.
- A-007 for FR-008/FR-009: Client can view recommendations and completed questionnaires.
- A-008 for FR-010: Client receives and can view notifications per defined events.
- A-009 for FR-011/FR-012: Specialist can authenticate and manage schedule in Yandex Calendar.
- A-010 for FR-013/FR-014/FR-015: Specialist can chat, view questionnaires, and publish recommendations.
- A-011 for FR-016/FR-017/FR-018: Curator can authenticate and view chats and specialists' calendars.
- A-012 for FR-019: Data visibility matches access matrix by role.
- A-013 for FR-023: Client consent to data processing is captured and stored.
- A-014 for FR-024: Insurer list import runs daily and enables verification.
- A-015 for FR-026: Client can open the profile page and see their profile details.

## 6. Glossary
- Client: insured end user receiving consultations.
- Specialist: expert providing consultations and recommendations.
- Curator: coordinator who manages chats and scheduling.
- Consultation: scheduled meeting between client and specialist.
- Questionnaire: structured form completed by client.
- Recommendation: guidance produced by specialist after consultation.
- Notification: system message delivered to the client.
