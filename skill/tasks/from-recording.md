# Task: From Recording

Convert a screen-recording transcript (Loom, Read.ai, otter, manual transcript) into a structured SOP using the canonical anatomy.

## When to Run

- User runs `/sop-build from-recording` and points at a transcript file or pastes one inline

## Inputs Required

- Path to transcript file, or pasted transcript content
- Business slug + department (asked via routing question if not specified)

## Workflow

### Phase 1 — Locate Transcript

If the user pasted the transcript inline, work with it directly. Otherwise read the file path they provided.

If the transcript is very long (>10k chars), summarize sections first before extracting steps.

### Phase 2 — Routing

Same routing question as `tasks/interview.md` Phase 1: business + department + SOP slug. Suggest a slug based on the transcript content.

### Phase 3 — Extraction

Load `frameworks/sop-anatomy.md` and walk the transcript top-to-bottom, extracting:

1. **Purpose.** What is the speaker trying to teach? Usually stated in the first 30 seconds of the recording.
2. **Audience.** Who is the speaker addressing?
3. **Steps.** Each distinct action the speaker takes or describes. Use the speaker's own phrasing where possible — they will recognize it later when reviewing.
4. **Tools and systems mentioned.** Pull these into the Reference Documents section. If the speaker mentions a URL, capture it.
5. **Exceptions, tips, and gotchas.** The phrases "watch out for", "the trick is", "if X then Y" are signals.
6. **Steps that look automatable.** Apply the same logic as `tasks/interview.md` Phase 5. Flag inline with the `> 💡 Recommended automation:` callout.

### Phase 4 — Gap Review

Show the user the extracted SOP draft. Ask:

1. Anything missing? Did the recording skip steps the speaker assumes the watcher knows?
2. Anything unclear? Did the transcription mangle a step name?
3. Owner + escalation contact — usually NOT in the recording, must be added manually.

### Phase 5 — Reference the Recording

Add the recording URL (or local path) to the Reference Documents section at the top:

```markdown
- 🎬 Source recording → [<title>](<url-or-path>)
```

### Phase 6 — Quality Gate + Write

Run `checklists/sop-ready-to-delegate.md` silently. Fix any fails.

Save to `SOPs/<business>/<department>/<sop-slug>.md` and update `SOPs/INDEX.md` (same write logic as `tasks/interview.md` Phase 9).

### Phase 7 — Next Steps

If any step was flagged for automation, suggest `/seed:tasks:ideate`. If meant for VA handoff, suggest `/sop-build delegate-pack`.

## Acceptance Criteria

- [ ] SOP saved at correct path with anatomy sections filled
- [ ] Source recording linked in Reference Documents
- [ ] Owner + escalation explicitly captured (not auto-inferred from transcript)
- [ ] Automation candidates flagged inline
- [ ] `SOPs/INDEX.md` updated
