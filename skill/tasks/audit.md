# Task: Audit

Review an existing SOP against the canonical anatomy, the delegation-readiness checklist, and the automation-readiness checklist. Produce a critique report and (if requested) a revised version.

## When to Run

- User runs `/sop-build audit` and points at an existing SOP file
- User pastes an SOP inline and asks for critique

## Inputs Required

- Path to SOP file, or pasted SOP content
- Output mode: critique-only OR critique + revised version inline

## Workflow

### Phase 1 — Load Inputs

Read the target SOP. Read these references in parallel:

- `frameworks/sop-anatomy.md` (the canonical structure)
- `checklists/sop-ready-to-delegate.md` (delegation gate)
- `checklists/automation-readiness.md` (automation gate)
- `frameworks/automation-flagging.md` (tool routing logic)

### Phase 2 — Section-by-Section Audit

Walk the SOP and tag each finding by severity:

- 🔴 **Critical** — blocks delegation. Examples: no escalation contact, undefined jargon, "obviously" left in, no QC checkpoint, fuzzy verbs in steps.
- 🟡 **Warning** — degrades quality. Examples: missing Loom link where one is needed, no inputs/outputs defined for an automation candidate, RACI ambiguity.
- 🟢 **Suggestion** — improves the SOP. Examples: a step could be a Loom, an automation candidate the original author missed, a swim-lane would clarify a multi-actor handoff.

### Phase 3 — Automation Candidate Sweep

For every step that does not already have a `> 💡 Recommended automation:` callout, ask:

1. Deterministic trigger? Yes / No
2. Known inputs + outputs? Yes / No
3. Judgment required? Yes (managed agent) / No (Zapier / Make / n8n)

If all three pass for "automatable", surface as a 🟢 suggestion with the tool recommendation and SEED + PAUL hand-off language from `frameworks/automation-flagging.md`.

### Phase 4 — Write the Audit Report

Load `templates/sop-audit-report.md`. Fill in:

- Findings grouped by severity (Critical → Warning → Suggestion)
- Each finding cites the exact step or section name
- For automation suggestions, include tool recommendation + next-step skill

### Phase 5 — Optional Revised Version

If the user asked for a revised version, produce it as a new file: `<original-path>.revised.md`. Apply every Critical fix automatically. Apply Warning fixes if obvious. Leave Suggestions as inline comments unless the user requested they be incorporated.

Do NOT overwrite the original. The user reviews the revised version and merges manually.

### Phase 6 — Report

Tell the user:

```
📋 Audit complete for `<sop-path>`.

🔴 Critical: N
🟡 Warning: N
🟢 Suggestion: N

Report saved to: <path-to-audit-report>
Revised version: <path-to-revised> (only if requested)
```

## Acceptance Criteria

- [ ] Every section of the SOP audited against anatomy
- [ ] Each finding has severity tag + specific citation
- [ ] Automation sweep ran on every step
- [ ] Audit report file written (not just inline output)
- [ ] Original SOP file untouched
