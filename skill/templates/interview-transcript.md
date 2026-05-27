# Template: Interview Transcript

Intermediate Q&A capture used during `tasks/interview.md`. Optional artifact — write only if the user asks for the raw transcript or if the SOP is complex enough that preserving the intake conversation is useful.

Saved to: `SOPs/{business-slug}/{department-slug}/{sop-slug}.transcript.md`

---

```markdown
# 🎙️ Interview Transcript — {SOP Title}

> **Date:** {YYYY-MM-DD}
> **Interviewer:** sop-build (skill)
> **Subject:** {User who is the process expert}
> **Output SOP:** [{SOP Title}]({relative-path-to-sop})

---

## Phase 1 — Routing

**Q:** Which business?
**A:** {answer}

**Q:** Which department?
**A:** {answer}

**Q:** Working title?
**A:** {answer}

---

## Phase 2 — Anatomy

**Q:** Purpose — what does this SOP teach, why does it matter?
**A:** {answer}

**Q:** Who is this for? (role titles)
**A:** {answer}

**Q:** Owner — accountable when it fails?
**A:** {answer}

**Q:** Trigger — what kicks it off?
**A:** {answer}

**Q:** Overview — systems involved, how this fits in the bigger process?
**A:** {answer}

---

## Phase 3 — Steps

### Step 1

**Q:** Walk me through Step 1.
**A:** {answer}

**Follow-ups asked:**
- {challenge / drill-down question} → {answer}
- {Loom suggestion offered?} → {accepted / declined}
- {Automation candidate test} → {flagged / skipped}
- {Exceptions / branches} → {captured}

### Step 2

{...repeat structure}

{Repeat for N steps}

---

## Phase 4 — Reference Docs and Trainings

**Q:** Existing links to include?
**A:** {answer}

**Q:** Trainings still to record?
**A:** {answer}

---

## Phase 5 — Automation Flagging

Steps flagged in this interview:

| Step | Tool Recommended | Trigger | Notes |
|---|---|---|---|
| {Step X} | {Zapier / Make / n8n / Managed Agent} | {event} | {one-line context} |

---

## Phase 6 — Edge Cases and Escalation

**Q:** What goes wrong most often?
**A:** {answer}

**Q:** Escalation contact?
**A:** {answer}

**Q:** Failure modes?
**A:** {answer}

---

## Phase 7 — Final Checklist Review

{Checklist read back to user, adjustments noted}

---

## Phase 8 — Quality Gate Notes

Items from `checklists/sop-ready-to-delegate.md` that needed fixing during the interview:

- {item} → {how it was resolved}

---

## Notes for Future Iterations

{Anything the user said that didn't fit the SOP but is worth remembering when this SOP evolves}
```

---

## When to Write This File

- User explicitly asked for the raw transcript ("save the interview")
- The SOP went through a lot of revisions during intake and the journey is worth preserving
- The SOP will need to be re-interviewed later (e.g., after a process change) and the prior context will speed that up

Otherwise skip — the SOP itself + INDEX.md entry is sufficient.
