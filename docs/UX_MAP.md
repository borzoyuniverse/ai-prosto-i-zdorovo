# UX Action Map (CTA → Endpoint → State → Page)

> Source of truth for implement: only CTAs listed here can have mocks removed within an FP.

| CTA_ID | Page (React) | Route | Mock Status (mock/mixed/real/unknown) | Endpoint(s) (method path) | State keys | Notes |
|---|---|---|---|---|---|---|
| CTA-000 | front/src/App.tsx | / | mock | GET /health | health.status | <notes> |

### Notes
- Each row is a unit of implementation scope.
- If a page is partially real, use `mixed` and list which parts remain mocked.

### FP Assignment
| CTA_ID | Page | Endpoint(s) | Assigned FP |
|---|---|---|---|
| CTA-000 | front/src/App.tsx | GET /health | FP000 |

### System Design (per CTA)

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant P as PageComponent(App)
  participant S as FrontStore
  participant C as API Controller(GET /health)
  participant SV as Service(TemplateService)
  participant R as Repo(TemplateRepo)

  U->>P: Trigger "App CTA"
  P->>S: dispatch(app.action)
  S->>C: GET /health
  C->>SV: validate & call
  SV->>R: read/write
  SV-->>C: result {…}
  C-->>S: return {…}
  S-->>P: update state
  P-->>U: render result
```

### System Interaction Overview (FP000)

```mermaid
flowchart LR
  subgraph Frontend
    PC[Page: App]
    ST[FrontStore]
  end
  subgraph Backend
    CTRL[Controller: App]
    SVC[Service: App]
    REPO[Repo: App]
    DB[(DB)]
  end

  PC --> ST --> CTRL --> SVC --> REPO --> DB
```
