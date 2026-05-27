# Task: Delegate Pack

Bundle a finished SOP into a handoff packet for a VA, contractor, or new hire. The packet contains the SOP plus everything the delegate needs to actually do the work: access list, training links, first-week check-ins, escalation contact.

## When to Run

- User runs `/sop-build delegate-pack` and points at a finished SOP file
- User says "package this SOP for my VA" or similar

## Inputs Required

- Path to a finished SOP file
- Delegate role title (e.g., "Onboarding VA", not the person's name)
- Manager / escalation contact name + channel

## Workflow

### Phase 1 — Read the SOP

Load the target SOP. If it does not yet meet the delegation-ready checklist (`checklists/sop-ready-to-delegate.md`), abort with a clear message and a list of fixes needed. Tell the user to run `/sop-build audit` first.

### Phase 2 — Gather Handoff Inputs

Use `AskUserQuestion`:

1. **Delegate role title.** What seat is this for? (Onboarding VA, Support Specialist, etc.)
2. **Manager.** Who does this person report to for this SOP?
3. **Escalation channel.** Slack, WhatsApp, email, phone?
4. **First-week check-ins.** Default cadence: end of day 1, end of week 1, end of week 2. User can adjust.
5. **Access needed.** Prompt with common items pulled from the SOP itself (any tool name mentioned becomes a candidate access item):
   - Tool accounts (Asana, GHL, Drive, etc.)
   - Group memberships (WhatsApp group, Slack channel)
   - Credentials (1Password vault, shared logins)
   - Calendar invites (recurring meetings, daily standup)

### Phase 3 — Loom + Training Inventory

From the SOP's Reference Documents section, pull every Loom / video / training link. Group them:

- **Required watch before starting.** Pre-funding modules, role onboarding videos.
- **Reference during work.** Tool walkthrough videos.
- **Optional context.** Strategy / background videos.

If the SOP has TODO placeholders for trainings not yet recorded, list those as blockers: "Record before handoff."

### Phase 4 — Run Handoff Completeness Checklist

Load `checklists/handoff-completeness.md`. Walk every item. If anything fails, fix before writing the packet. Common fails: no first-week check-in cadence, no manager named, access list missing a tool that appears in the SOP steps.

### Phase 4b — Confirm the Delegate's Reading Surface

Read the parent business README (`SOPs/<business>/README.md`) for a `## Hosting` section. The delegate needs to read the SOP somewhere they can actually navigate — not the raw markdown in a git repo they cannot clone.

- **If Hosting = Local only** — flag a warning: "This packet links to the raw markdown SOP. Confirm your delegate has git access and a markdown viewer, OR set a Google Drive / Notion host first by re-running `/sop-build scaffold-business` for `<business>`."
- **If Hosting = Google Drive** — load `frameworks/hosting-options.md` and verify the Drive folder URL is set. The packet's "Source SOP" link should point at the Google Doc, not the markdown.
- **If Hosting = Notion** — same — the packet should link to the Notion page.
- **If Hosting = Both** — link to the Google Doc by default (lowest-friction for VAs), reference the Notion page as an alternate.

Save the resolved reading-surface URL into the packet's header so the delegate has one click to open it.

### Phase 5 — Write the Packet

Load `templates/delegate-packet.md`. Fill in:

- Delegate role, manager, escalation channel
- Link to the source SOP (relative path)
- Access checklist (provisioned / pending)
- Loom + training inventory grouped as above
- First-week check-in schedule
- Any blockers ("Record this Loom before Monday")

Save to: `SOPs/<business>/<department>/<sop-slug>.delegate-pack.md` (sibling to the original SOP).

### Phase 6 — Report

Tell the user:

```
📦 Delegate packet ready: `<path>`

Blockers before handoff:
- <blocker 1 or "None">

Send this packet to your delegate along with calendar invites for the first-week check-ins.
```

## Acceptance Criteria

- [ ] Source SOP passed the delegation-ready checklist before packet generation
- [ ] Manager + escalation channel named explicitly
- [ ] Access list reflects every tool mentioned in the SOP
- [ ] Loom inventory grouped by Required / Reference / Optional
- [ ] First-week check-in cadence captured
- [ ] Any TODO trainings flagged as blockers
- [ ] Packet saved alongside the source SOP
