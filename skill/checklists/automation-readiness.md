# Checklist: Automation Readiness

Validates that a step flagged for automation is actually automatable. Run before recommending the user invest time building it via SEED + PAUL.

Use during `tasks/audit.md` Phase 3 and during `tasks/interview.md` Phase 5.

---

## Trigger

- [ ] The step has a deterministic event that starts it (form submit, email arrives, webhook fires, calendar time, file upload, status change)
- [ ] The trigger event is observable by a tool (not "when I feel ready")
- [ ] The trigger fires reliably — not "sometimes"

If trigger fails: ❌ Do not automate. Keep as manual step.

---

## Inputs

- [ ] Every input field is named (not "some data from the form")
- [ ] Inputs come from a finite set of sources (not "wherever I happen to find it")
- [ ] Input formats are consistent (not "sometimes JSON, sometimes a screenshot")
- [ ] Sensitive inputs (PII, credentials) have a defined handling path

If inputs fail: 🟡 Map them first. Re-evaluate after.

---

## Outputs

- [ ] Every output field is named
- [ ] Output destinations are concrete (specific app, specific record, specific field)
- [ ] Side effects are listed (notifications fired, records updated downstream)

If outputs fail: 🟡 Define them. Re-evaluate after.

---

## Judgment

- [ ] No step in the automation requires reading nuance and deciding
- [ ] OR if judgment is required, a Claude managed agent is the right tool (not Zapier / Make / n8n)
- [ ] OR the judgment can be reduced to a rule set the user is willing to commit to

If judgment is required and user wants to use a workflow tool (Zapier / Make / n8n): ❌ Wrong tool. Either route to managed agent or keep manual.

---

## Tool Fit

Based on the shape of the work, exactly one tool should fit:

- [ ] **Zapier** — Single trigger → single action, native app integration exists, low volume
- [ ] **Make** — Multi-step with branching, native app integration exists, moderate volume, visual builder helps
- [ ] **n8n** — Self-hosted needed, high volume, custom code required, sensitive data
- [ ] **Managed Agent** — Reading + judgment + drafting, multi-document context, fuzzy inputs

If two or more tools "fit": pick the simplest. Default Zapier > Make > n8n > Managed Agent unless complexity demands the next tier.

---

## Cost

- [ ] Per-run cost is acceptable (Zapier: ~$0.02-0.10/run, Make: ~$0.005-0.05, n8n self-host: free + infra, Managed Agent: highly variable, depends on tokens)
- [ ] Volume is known approximately
- [ ] Total monthly cost (per-run × volume) is below the cost of keeping it manual

If cost fails: 🟡 Either find a cheaper tool, batch executions, or keep manual.

---

## Maintenance

- [ ] User (or their team) can debug the automation when it breaks
- [ ] User has access to the tool's logs / error notifications
- [ ] User has a plan for what happens when the automation fails silently

If maintenance fails: 🟡 Either invest in observability before building, or keep manual until the team can maintain it.

---

## Verdict

| All trigger / inputs / outputs / judgment pass + tool fit identified | ✅ Ready to scope. Recommend `/seed:tasks:ideate`. |
| Trigger or judgment fails | ❌ Do not automate. |
| Inputs / outputs / cost / maintenance need work | 🟡 Address the gaps, re-check |

---

## On Pass

Append the standard recommended-automation callout to the step (see `frameworks/automation-flagging.md`).

## On Fail

Update the SOP step to make the manual execution clearer. Add a note in the Notes section: "Considered for automation — deferred because {reason}. Revisit when {condition}."
