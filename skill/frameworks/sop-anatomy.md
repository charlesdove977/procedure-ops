# Framework: SOP Anatomy

The canonical structure every SOP built by this skill must follow. Derived from a battle-tested client-onboarding SOP — proven format, fully genericized for any business.

Every section has a purpose. Skip a section only when you can name a reason the SOP does not need it.

---

## File Structure (top to bottom)

```
# 🎓 <SOP Title>

---

# 📄 **<SOP Title> SOP**

### 🔗 Reference Documents
- Linked Notion docs, Looms, training modules, recordings

### 🎯 Purpose
- One paragraph: what this SOP teaches, who benefits, why it matters

### 👥 Who This SOP Is For
- Role titles (not names). Bulleted list.

### 🧠 Overview
- Two to four sentences of plain-language context
- Systems involved (tool names with links if applicable)
- Where in the bigger process this fits

---

## 🪜 Step-by-Step Process

### STEP 1 — <Step Title>
- Action items as bullets
- Inputs / preconditions
- Outputs / done criteria

### STEP 2 — <Step Title>
- ...

(repeat for N steps)

---

## 🗂️ Checklist Before Marking Complete
✅ Item 1
✅ Item 2
...

---

## 🧠 Notes & Reminders
- Pro tips, gotchas, things that bite first-timers
- "Never do X until Y"
- Recurring failure modes

---

## 📞 Escalation
- **Owner:** {Name + role}
- **Escalation contact:** {Name + channel — Slack, WhatsApp, email}
- **When to escalate:** {Specific conditions}

---

## 📅 Metadata
| Field | Value |
|---|---|
| Business | {business-slug} |
| Department | {department-slug} |
| Created | {YYYY-MM-DD} |
| Last updated | {YYYY-MM-DD} |
| Version | 1.0 |
| Author | {captured-from-author} |
```

---

## Section-by-Section Spec

### Title block

Two title lines, by convention. Top one is the friendly version. The "📄 **<Title> SOP**" header signals the actual document start. Keep both.

### 🔗 Reference Documents

Always at the top. Anything the executor needs to read or watch *before* starting the SOP goes here.

Format:

```markdown
Before beginning this SOP:

- Review the full onboarding process here → [<Doc Title>](<url>)
- Review previous onboarding call examples here → [<Doc Title>](<url>)
```

Include:
- Linked Notion / Confluence / Drive docs
- Source recordings if the SOP came from a Loom or screen capture
- Training modules / course videos the role requires
- Related SOPs that this one depends on

### 🎯 Purpose

One paragraph. Answer: *what does this SOP teach someone to do, and where does it sit in the bigger picture?*

Bad: "This SOP is about onboarding."
Good: "This document teaches you how to properly onboard a new client from first contact to the point where the Technical Setup Team takes over."

### 👥 Who This SOP Is For

Role titles only. Never personal names. Names belong inside steps.

Format:

```markdown
- <Role 1> (e.g., Support VA, Onboarding Specialist)
- <Role 2>
- Any team member responsible for <scope>
```

### 🧠 Overview

Two to four sentences. Plain language. Sets context the executor needs before reading the steps.

Mention every major system / tool involved (Asana, GHL, Drive, etc.) — the executor needs to know what they will be touching.

Mention where this SOP sits in the bigger process: "Each client is added to the Client Onboarding Project in Asana, where subtasks must be checked off as you progress."

### 🪜 Step-by-Step Process

Steps are numbered (STEP 1, STEP 2, ...) with a short title. Inside each step:

- **Bulleted action items.** Each bullet = one concrete thing to do.
- **Specific names + roles when relevant.** "Create a private group with 👤 The client, 🧑‍💼 Manager Name, 👨‍💼 Owner Name, (Yourself)." Names tag with emoji to scan fast.
- **Confirmation criteria.** "Confirm the client has signed the Client Agreement and booked a time for their Onboarding Call."
- **Tips** as separate callouts: `📌 **Tip:** ...` or `🧠 **Note:** ...`
- **Branches and exceptions** as sub-bullets: "If the submission is valid: ...  If the account fails: escalate to <name>."

When a step is a candidate for automation, add a callout below the step:

```markdown
> 💡 **Recommended automation:** This step could run on {tool} with trigger {event}. Run `/seed:tasks:ideate` to scope, then `/paul:plan` to build.
```

When a step is heavy on UI clicks or visual context, add a Loom placeholder:

```markdown
> 🎬 **Loom:** [Record here](<placeholder-url>) — TODO: record before handoff
```

### 🗂️ Checklist Before Marking Complete

Mirror the step titles as a flat checklist. The executor uses this as the "did I do all of it" gate at the end.

Format:

```markdown
✅ <Item 1 mirroring Step 1 outcome>
✅ <Item 2 mirroring Step 2 outcome>
...
```

Include any cross-cutting items that don't map to a single step (e.g., "Drive folder linked and organized", "Tracker updated in Client Portal").

### 🧠 Notes & Reminders

Pro tips, gotchas, and recurring failure modes. The stuff that bites first-timers.

Examples:
- "All client calls must be recorded and uploaded to their Drive folder."
- "Keep Asana fully updated — it's how other departments know where a client stands."
- "Never move a client to 'Maintenance Mode' until confirmation from the Tech Team."

---

## Style Rules

- **Emojis at section headers.** Yes, on purpose. They make the SOP scannable and signal section boundaries to a tired executor at 11 PM.
- **No "obviously".** If something is obvious to the user writing the SOP, it is not obvious to the VA reading it. Strip "obviously", "just", "simply", "of course."
- **Concrete verbs.** "Review" alone is fuzzy. "Open the form, check fields X, Y, Z, confirm they match the contract." That is concrete.
- **Names + roles together.** When a person matters, use both: "🧑‍💼 Jordan Lee (Operations Lead)." Roles outlast people; names anchor the current state.
- **Tool names linked.** First mention of a system gets a link to its login page or the relevant doc inside it.
- **Branches as sub-bullets.** Never put "if X then Y" inline in a sentence. Break it out so the eye can find it.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|---|---|---|
| Stepless overview ("Just do the onboarding") | VA cannot execute, has to ask follow-up questions | Break into numbered steps with bullets |
| Vague verbs (review, handle, process, deal with) | No way to verify the step was done correctly | Specify exact actions + done criteria |
| No escalation contact | When something breaks, work stops | Always name a person + channel |
| Tools mentioned but no link | VA cannot find the tool, has to ask | Link first mention of every tool |
| Mixed audience ("VAs and managers") | Each role reads it differently, neither gets clarity | Pick one role. Write a separate SOP for the other if needed. |
| Hidden judgment calls ("use your best judgment") | Defeats the purpose of an SOP | Either decision-tree the judgment, or escalate it |
