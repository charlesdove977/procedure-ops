# Checklist: Handoff Completeness

Final gate before a delegate packet ships to a VA, contractor, or new hire. Every item must pass — gaps here are the difference between a smooth handoff and a delegate who is stuck on day 2 messaging you constantly.

Run inside `tasks/delegate-pack.md` Phase 4.

---

## Source SOP

- [ ] Source SOP passed `checklists/sop-ready-to-delegate.md`
- [ ] Source SOP version + last-updated date are current (not stale from months ago)
- [ ] Source SOP path linked in the packet (relative path, clickable)

If any fail: send user to `/sop-build audit` first.

---

## Delegate Identity

- [ ] Delegate role title named (role, not person name — keeps the packet reusable for future hires)
- [ ] Manager named (single person, not "the team")
- [ ] Escalation contact named (single person + channel)
- [ ] Channel specified (Slack channel name, WhatsApp group name, phone, email — not "message me")

---

## Access Checklist

Every tool, account, and resource the delegate needs to do the work.

- [ ] Every tool mentioned in the source SOP appears in the access list
- [ ] Each access item has a status (Pending or Provisioned)
- [ ] Credentials path defined (1Password vault, shared keychain, etc. — never paste passwords inline)
- [ ] Group memberships listed (Slack channels, WhatsApp groups, Discord servers)
- [ ] Calendar invites for recurring meetings flagged
- [ ] Physical access (office, hardware) if relevant

---

## Training Inventory

- [ ] Required-watch videos listed with duration and one-line "why"
- [ ] Reference docs grouped separately from required watches
- [ ] Optional context flagged as optional (so delegate doesn't burn time before starting)
- [ ] Every TODO training (placeholder in source SOP) has a target record date
- [ ] If any TODO training is a hard blocker (delegate cannot start without it), it is flagged as such

---

## First-Week Cadence

- [ ] End of Day 1 check-in scheduled
- [ ] End of Week 1 check-in scheduled
- [ ] End of Week 2 check-in scheduled
- [ ] Ongoing standing meeting (weekly minimum) scheduled
- [ ] All check-ins on the delegate's calendar AND the manager's calendar

---

## Success Criteria

- [ ] Three measurable outcomes defined (what "doing this role well" looks like)
- [ ] Each outcome is observable (a manager could check it without asking the delegate)
- [ ] Outcomes match the source SOP's purpose (no scope creep into adjacent work)

---

## Escalation Path

- [ ] "Stuck on a step" escalation defined
- [ ] "Off-SOP request" escalation defined
- [ ] "System down" escalation defined (often a different contact than the manager)
- [ ] "Never seen this before" rule stated explicitly ("Don't guess. Ask.")

---

## Common Mistakes

- [ ] At least three "what not to do" items pulled from source SOP Notes
- [ ] Each is specific, not generic ("Don't update Asana late" not "Be careful")

---

## Verdict

| All sections pass | ✅ Packet ready. Send to delegate. |
| Source SOP fails | ❌ Run audit first |
| Blockers in training inventory | 🟡 Packet drafted, but flag user: record blockers before delegate starts |
| Access list incomplete | 🟡 Packet drafted, but provisioning needs to finish before day 1 |

---

## On Pass

Save packet to `SOPs/{business-slug}/{department-slug}/{sop-slug}.delegate-pack.md` and report path to user.

## On Fail

Tell the user which items failed and what to do next:

- Source SOP gap → `/sop-build audit`
- Training blocker → record before handoff
- Access gap → provision before day 1
- Manager / escalation undefined → ask the user
