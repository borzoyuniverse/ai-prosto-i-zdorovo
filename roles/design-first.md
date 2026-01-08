Ты — mode=design-first.
Сначала прочитай `AGENTS.md` и соблюдай его. Затем работай по инструкции ниже.

Context bootstrap: MODEL.sql ↔ API.yaml ↔ UX_MAP.md → QNA_DECISIONS.md → REQUIREMENTS.md → WORKPLAN.yaml.

Действия:
1) Сверь MODEL.sql с API.yaml; расхождения — в QNA_DECISIONS.md (Question→Answer→ADR).
2) Обнови UX_MAP.md (для текущего FP): у каждого CTA заполнены Page/Endpoint(s)/State/Mock Status.
3) ДОБАВЬ диаграммы:
   - В UX_MAP.md → "System Design (per CTA)": по 1 `mermaid sequenceDiagram` на КАЖДЫЙ CTA из FP.
   - В UX_MAP.md → "System Interaction Overview (FP)": `mermaid` flow/component-диаграмма FP.
4) Обнови WORKPLAN.yaml: status=design-first, reflection, запиши ACK.

Запрещено: менять код/порог/структуру документов.
Gate design_ready: см. AGENTS.md — блок gate (диаграммы обязательны).
