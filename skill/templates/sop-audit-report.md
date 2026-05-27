# Template: SOP Audit Report

Output of `tasks/audit.md`. Saved as `<sop-slug>.audit.md` alongside the source SOP.

---

```markdown
# 📋 SOP Audit Report — {SOP Title}

> **Source SOP:** [{SOP Title}]({relative-path-to-sop})
> **Audited:** {YYYY-MM-DD}
> **Auditor:** sop-build (skill)

---

## Summary

| Severity | Count |
|---|---|
| 🔴 Critical | {N} |
| 🟡 Warning | {N} |
| 🟢 Suggestion | {N} |

**Overall verdict:** {Pass / Conditional Pass / Fix Required Before Delegation}

---

## 🔴 Critical Findings

These block delegation. Fix before handing this SOP to anyone.

### {Step or Section Name}: {Finding Title}

**Issue:** {What's wrong}
**Why it blocks:** {What goes wrong when a delegate hits this}
**Fix:** {Specific recommended change}

{Repeat per critical finding}

---

## 🟡 Warnings

These degrade quality but don't block. Fix before next iteration.

### {Step or Section Name}: {Finding Title}

**Issue:** {What's wrong}
**Impact:** {Why it matters}
**Fix:** {Specific recommended change}

{Repeat per warning}

---

## 🟢 Suggestions

Improvements worth considering.

### {Step or Section Name}: {Suggestion Title}

**Observation:** {What you noticed}
**Suggested change:** {Specific improvement}

{For automation candidates:}

**Automation opportunity:**
- **Step:** {Step name}
- **Tool:** {Zapier / Make / n8n / Managed Agent}
- **Trigger:** {Event}
- **Inputs:** {Fields}
- **Outputs:** {Fields}
- **Next step:** Run `/seed:tasks:ideate` to scope.

{Repeat per suggestion}

---

## Anatomy Compliance Check

Comparison against `frameworks/sop-anatomy.md`.

| Section | Present | Quality |
|---|---|---|
| 🔗 Reference Documents | ✅ / ❌ | {empty / sparse / complete} |
| 🎯 Purpose | ✅ / ❌ | {vague / clear} |
| 👥 Who This SOP Is For | ✅ / ❌ | {role titles / names — should be roles} |
| 🧠 Overview | ✅ / ❌ | {missing tools / complete context} |
| 🪜 Step-by-Step | ✅ / ❌ | {fuzzy / concrete} |
| 🗂️ Checklist | ✅ / ❌ | {mirrors steps / drift} |
| 🧠 Notes & Reminders | ✅ / ❌ | {empty / valuable} |
| 📞 Escalation | ✅ / ❌ | {named contact / missing} |

---

## Automation Sweep

Every step was checked against the three-question filter from `frameworks/automation-flagging.md`:

| Step | Deterministic Trigger? | Known I/O? | Judgment Required? | Verdict |
|---|---|---|---|---|
| {Step 1} | Y/N | Y/N | Y/N | {Automate / Skip / Map I/O first} |
| {Step 2} | Y/N | Y/N | Y/N | |
| {...} | | | | |

**Total automation candidates surfaced:** {N}
**Already flagged in SOP:** {M}
**New candidates this audit:** {N - M}

---

## Recommended Next Actions

1. {Top priority action}
2. {Next priority}
3. {Next priority}

If user requested a revised version, it has been saved to: `{path-to-revised}` — review and merge manually.
```

---

## Filename Convention

```
SOPs/{business-slug}/{department-slug}/{sop-slug}.audit.md
```
