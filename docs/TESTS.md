# TESTS

## 1. Strategy
- Levels: UAT (e2e), System/Integration, Unit.
- Coverage thresholds: <fill in thresholds for back/front>.
- Evidence: save logs and coverage json-summary in artifacts/<FP>/<date>/.

## 2. UAT / BDD Scenarios (plain language)
- UAT-001: <scenario title>
  - Preconditions: <preconditions>
  - Steps: <user steps>
  - Expected (UI): <expected UI behavior>
  - Expected (API): <expected API behavior>

## 3. System / Integration / Unit (summary)
- Back: <system/integration/unit test goals>
- Front: <system/integration/unit test goals>

## 4. RTM (Requirements Traceability Matrix)
```yaml
rtm:
  - req: FR-001
    tests:
      uat: [UAT-001]
      system: [INT-001]
      unit: [UNIT-001]
    code_targets:
      front: ["front/src/..."]
      back:  ["back/src/..."]
```

## 5. Acceptance Checklist (per FP)

* [ ] All relevant UAT scenarios are green
* [ ] Coverage thresholds met
* [ ] RTM covers requirements
* [ ] UX_MAP.md updated (CTA/Endpoints/Pages/Mock)
* [ ] QNA_DECISIONS.md has ADRs for critical decisions

## 6. Test Files Plan (FP000)
- Back: <planned test files>
- Front: <planned test files>
