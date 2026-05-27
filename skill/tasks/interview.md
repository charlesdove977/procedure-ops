# Task: Interview

Guided Q&A workflow that captures a new SOP from scratch and writes it to `SOPs/<business>/<department>/<sop-slug>.md`.

## When to Run

- User runs `/sop-build interview`
- User says any natural-language SOP intake phrase that auto-fired the skill

## Inputs Required

- Business slug (one of the existing folders under `SOPs/`, or `scaffold-business` first)
- Department slug (one of the 8 default depts, or whatever the business folder contains)
- The process the user wants to document

## Workflow

Run these phases in order. Wait for the user between phases. Do NOT batch all phases into one question — drill into each one.

### Phase 1 — Routing

Ask, using `AskUserQuestion`:

1. **Which business is this SOP for?** Pull options from `ls SOPs/`. If `SOPs/` does not exist or has no business folders, suggest running `/sop-build scaffold-business` first.
2. **Which department?** Pull options from `ls SOPs/<business>/`. Default set: support, operations, onboarding, sales, finance, marketing, tech-it, compliance-legal.
3. **Working title for this SOP?** Convert to kebab-case slug for the filename. Confirm with user.

If a folder is missing, offer to create it before continuing.

### Phase 2 — Anatomy Capture (Frame)

Load `frameworks/sop-anatomy.md` and walk these questions one at a time. Use `AskUserQuestion` per question — do NOT bundle.

1. **Purpose.** One sentence: what does this SOP teach someone to do, and why does it matter? Push back if the answer is vague ("handle onboarding" → "what specifically gets handed off to whom?").
2. **Who is this SOP for?** Job titles, not names. (e.g., "Onboarding VA", "Support Specialist".) Names go inside steps, not in the audience field.
3. **Owner.** Who is accountable when this SOP fails? Single name.
4. **Trigger.** What event kicks this process off? (a form submission, an email, a date, a Slack message, manual.)
5. **Overview.** Two to four sentences of plain-language context. What systems are involved (Asana, GHL, Drive, etc.)? Pull system names — they get linked in references later.

### Phase 3 — Step-by-Step Capture

This is where the COO behavior matters most. Ask: "Walk me through it, step by step. Take your time."

For each step the user describes, silently run this loop:

1. **Is the step concrete?** If the user says "review the form", challenge: "What exactly are you checking? Which fields? What does pass vs fail look like?"
2. **Would a Loom video explain this faster than text?** If the step has any visual component (clicking through a UI, navigating a tool), suggest: "This step has a lot of clicks. Want to record a 2-minute Loom for it? I'll drop a placeholder link in the SOP — you record after we finish drafting."
3. **Is the step automatable?** Test: Does it have a deterministic trigger? Are inputs and outputs known? Is judgment required? If automation looks plausible, flag it with `[AUTOMATION CANDIDATE]` inline and continue. Do NOT pause the interview to dive into the automation — capture first, ideate later.
4. **Are there exceptions or branches?** "What happens if the form is incomplete? What if the client did not sign yet?" Branches become sub-bullets under the step.
5. **Tip or pro insight?** Optional. If the user knows a non-obvious gotcha for this step, capture it as a tip block.

Keep going until the user says they are done. Then read back the step list and ask: "Am I missing anything? Any hidden steps you do without thinking?"

### Phase 4 — Reference Docs and Trainings

Ask:

1. Are there existing recordings, Notion docs, Loom videos, or course modules this SOP should link to?
2. Are there any new trainings you should record before this gets handed off?

Capture both as a list. Linked docs go in the Reference Documents section at the top of the SOP. "Need to record" items get a TODO note in the Notes section at the bottom.

### Phase 5 — Automation Flagging Review

For each step tagged `[AUTOMATION CANDIDATE]` in Phase 3, load `frameworks/automation-flagging.md` and walk through it:

1. Recommend a tool: Zapier (simple webhooks + native app triggers), Make (visual multi-step branching), n8n (self-hosted, max flexibility, complex logic), or a Claude managed agent (judgment required, not just plumbing).
2. Note inputs, outputs, and the trigger event.
3. Append a callout to the SOP step:

```markdown
> 💡 **Recommended automation:** This step could run on {tool} with trigger {event}. Before building, run `/seed:tasks:ideate` to scope it. Then `/paul:plan` to plan and `/paul:apply` to ship.
```

Do NOT invoke SEED or PAUL from inside the interview. The user decides when to hop skills.

### Phase 6 — Edge Cases and Escalation

Ask:

1. What goes wrong most often in this process?
2. Who does the executor escalate to if they hit something they cannot handle? (Single name + channel: Slack, WhatsApp, email.)
3. What is the failure mode? (e.g., "If the application check fails twice, escalate to the Operations Lead and note it in the tracking tool.")

### Phase 7 — Checklist Build

Compile the "before marking complete" checklist from the step titles in Phase 3. Read it back to the user. Ask if anything is missing. Common adds: review verification, manager signoff, status update in tracking tool.

### Phase 8 — Quality Gate

Load `checklists/sop-ready-to-delegate.md` and silently walk it. If any item fails, fix before writing the file. Common fails: "obviously" left in a step, jargon undefined, escalation contact missing, no QC checkpoint.

### Phase 9 — Write the SOP

1. Resolve repo root: `ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"`.
2. Compute target: `$ROOT/SOPs/<business>/<department>/<sop-slug>.md`.
3. **Overwrite guard.** If the target file already exists, do NOT write. Ask the user via `AskUserQuestion`:
   - "Overwrite existing SOP `<path>`?" with options: `Overwrite`, `Append timestamp to slug` (e.g., `<sop-slug>-2026-05-27.md`), `Cancel`.
   - If `Cancel`, stop and report. If `Append`, recompute target with timestamp suffix and re-check existence.
4. Load `templates/sop-document.md` (which mirrors `frameworks/sop-anatomy.md`).
5. Fill in every section from captured input.
6. Save to the resolved target (absolute path).
7. Update `SOPs/INDEX.md` — append one row under the business+dept group:
   ```markdown
   | <sop-slug> | <one-line purpose> | <owner> | <date created> |
   ```
8. Report path back to user using relative path so it is clickable.

### Phase 10 — Next Step Suggestions

If any step was flagged for automation, load `frameworks/automation-flagging.md` and emit the SEED + PAUL handoff using **Variant A or Variant B** depending on whether `~/.claude/skills/seed/` and `~/.claude/skills/paul/` exist on the user's machine. Do not push install URLs at users who already have the skills.

Detection commands (run silently):

```bash
test -d "$HOME/.claude/skills/seed" && echo seed:yes || echo seed:no
test -d "$HOME/.claude/skills/paul" && echo paul:yes || echo paul:no
```

If the SOP is meant for a VA handoff, end with:

> 📦 To bundle this for a VA, run `/sop-build delegate-pack` and point it at `<path>`.

If the business this SOP belongs to has no `## Hosting` section in `SOPs/<business>/README.md`, end with:

> 🗂️ Want your team to read this somewhere besides the repo? Run `/sop-build scaffold-business` again to set a Google Drive or Notion host for this business — markdown stays the source of truth, the host gets a published copy.

## Acceptance Criteria

- [ ] SOP saved at the correct path under `SOPs/<business>/<department>/`
- [ ] All anatomy sections filled (no placeholder text remaining)
- [ ] Every step is concrete (no fuzzy verbs like "review" without specifics)
- [ ] Automation candidates have inline callouts with tool recommendation + SEED/PAUL hand-off language
- [ ] Reference Documents section includes existing links + TODO list for trainings to record
- [ ] Final checklist matches the step titles
- [ ] `SOPs/INDEX.md` updated with the new entry
- [ ] Escalation contact named explicitly
