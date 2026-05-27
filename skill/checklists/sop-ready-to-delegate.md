# Checklist: SOP Ready to Delegate

Final quality gate before an SOP can be handed to a VA, contractor, or new hire. Every item must pass. If any fails, fix the SOP before writing the file.

Run this silently inside `tasks/interview.md` Phase 8 and `tasks/from-recording.md` Phase 6.

---

## Language Hygiene

- [ ] No "obviously", "just", "simply", "clearly" anywhere in the body
- [ ] No undefined jargon — every domain term used is either defined inline or linked
- [ ] Fuzzy verbs replaced with concrete actions ("review" → "open form, check fields X/Y/Z, confirm match")
- [ ] No "use your best judgment" — judgment calls either decision-treed or escalated
- [ ] Reading level: 9th grade or below. If a sentence requires re-reading, simplify.

## Structure Compliance

- [ ] All anatomy sections present (Reference Docs, Purpose, Who For, Overview, Steps, Checklist, Notes, Escalation)
- [ ] Step titles are imperative ("Create WhatsApp group", not "WhatsApp group creation")
- [ ] Each step has confirmation criteria (the "done" gate)
- [ ] Final checklist mirrors step outcomes — no checklist items that don't trace to a step
- [ ] Owner is named — single person, role + name
- [ ] Escalation contact named — single person + channel (Slack / WhatsApp / Email)

## Tooling

- [ ] Every tool mentioned has a link to login or relevant doc on first mention
- [ ] Tools that require accounts are flagged for access provisioning (will surface in delegate-pack)
- [ ] Loom placeholders inserted where text alone is insufficient (UI-heavy steps)
- [ ] Loom placeholders have a TODO callout reminding the user to record before handoff

## Branches & Exceptions

- [ ] Every "if X" has a "then Y" — no dangling conditions
- [ ] Failure modes named in either the relevant step or in the Notes section
- [ ] Edge cases captured (not just the golden path)

## Automation Sweep

- [ ] Each step ran through the three-question filter (`frameworks/automation-flagging.md`)
- [ ] Candidates have a `> 💡 Recommended automation:` callout with tool + trigger + I/O
- [ ] SEED + PAUL handoff language present in each callout

## RACI (if multi-actor)

- [ ] If 2+ roles touch the SOP, a RACI table or swim-lane is present
- [ ] Every step has exactly one Accountable (A) role
- [ ] Handoffs across roles are called out explicitly in the step body

## Metadata

- [ ] Business slug + department slug match the file path
- [ ] Created date set
- [ ] Version starts at 1.0
- [ ] Author captured (interview subject's name)

---

## On Fail

If any item fails:

1. Stop. Do NOT write the file.
2. Tell the user which items failed and why.
3. Ask the user to fix or accept (rare — usually fix).
4. Re-run the checklist.

Common failures and quick fixes:

| Fail | Quick Fix |
|---|---|
| Fuzzy verb in a step | Push back: "What exactly does '{verb}' mean? Walk me through the keystrokes." |
| Missing escalation contact | Ask: "If your VA hits a wall on this, who do they message?" |
| No Loom on a UI-heavy step | Suggest: "This step has 6 clicks. Want me to drop a Loom placeholder here?" |
| Missing tool link | Look up the canonical URL or ask the user |
| Hidden judgment call | Either: (a) write the decision tree, or (b) escalate it explicitly |
