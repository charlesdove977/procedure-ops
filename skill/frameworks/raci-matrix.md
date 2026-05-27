# Framework: RACI Matrix

How to assign Responsible / Accountable / Consulted / Informed roles when a process has more than one actor.

Load this framework when the user's SOP involves a handoff between roles or departments.

---

## The Four Roles

| Role | Meaning | Count |
|---|---|---|
| **R — Responsible** | Does the work | One or many |
| **A — Accountable** | Owns the outcome. Bears blame when it fails. | **Exactly one** |
| **C — Consulted** | Provides input before the work happens | Zero or many |
| **I — Informed** | Notified after the work is done | Zero or many |

Single biggest rule: **only one A per task.** If two people are accountable, nobody is.

---

## When to Use a RACI in an SOP

Add a RACI table near the top of the SOP (after Overview, before Steps) when:

- The process has 2+ roles touching it
- Roles span departments (e.g., Onboarding hands off to Tech)
- Failures historically come from "I thought *they* were doing it"

If a process is fully solo (one VA does everything), skip RACI — adds noise without value.

---

## RACI Table Format Inside an SOP

```markdown
### 🧑‍🤝‍🧑 Roles (RACI)

| Step | Onboarding VA | Operations Lead | Tech Team | Owner |
|---|---|---|---|---|
| Create WhatsApp group | R | A | I | I |
| Onboarding call | R, A | C | I | I |
| Pre-funding form review | R | A | I |  |
| Black Box submission | R | A | C | I |
| Handoff to Tech | R | A | I | I |
| Maintenance mode update |  | A | R | I |
```

Read the columns as roles. Read the rows as steps. Cells contain one or more letters (R / A / C / I).

---

## How to Build the RACI in the Interview

During `tasks/interview.md` Phase 3 (Step-by-Step Capture), if the user names a second role for any step, pause and ask:

1. Who actually does the work? → **R**
2. Who is the one person on the hook if it fails? → **A**
3. Who needs to weigh in *before* the work happens? → **C**
4. Who needs to know *after* it is done? → **I**

If the user gives two A's for the same step, push back: "Pick one. If both fail, who do I blame?"

---

## Common Patterns

### Pattern 1 — Solo Operator Process
- VA does everything
- Owner is A on every step
- No need for a RACI table

### Pattern 2 — Two-Stage Handoff (most common)
- Role 1 owns Steps 1-N, then hands off
- Role 2 owns Steps N+1-end
- Owner is A on the handoff itself (Step N) to make sure it does not get dropped

### Pattern 3 — Multi-Department Workflow
- 3+ roles, multiple handoffs
- RACI table essential
- Add a swim-lane diagram (see `frameworks/swim-lane-format.md`) on top of the RACI

---

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Two A's per row | Pick one. The other becomes C or I. |
| Every cell is R | The SOP has no real role boundaries. Re-interview with the actor question. |
| No A in a row | Add one. The work will get dropped without an owner. |
| RACI table at the bottom | Move to the top. Executors need to know their role before reading steps. |
| C's that are really I's | If the consult never actually happens, demote to I. |
