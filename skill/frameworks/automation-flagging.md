# Framework: Automation Flagging

How to spot automation candidates inside an SOP, recommend the right tool, and route the user to SEED (for ideation) and PAUL (for build).

Load this framework whenever a step looks automatable, or when running an audit sweep.

---

## The Three-Question Filter

Before flagging a step as an automation candidate, test against all three:

1. **Deterministic trigger?** Does the step start on a known event (form submit, email received, calendar time, webhook, file upload)? OR does the step require a human to "decide it is time"?
2. **Known inputs and outputs?** Can you list the fields that go in and the fields that come out? OR does the step pull from undefined sources?
3. **Judgment required?** Does the step need a person to weigh context, exercise taste, or make a call no rules cover?

| Q1 | Q2 | Q3 | Verdict |
|---|---|---|---|
| Yes | Yes | No | ✅ Automate with a workflow tool (Zapier / Make / n8n) |
| Yes | Yes | Yes | ✅ Automate with a managed agent (judgment in the loop) |
| Yes | No | — | 🟡 Map inputs/outputs first, then re-evaluate |
| No | — | — | ❌ Do not automate. Step requires a human decision to start. |

---

## Tool Routing

Once a step passes the filter, recommend the right tool based on the shape of the work.

### Zapier
- **Fit:** Simple, single-trigger → single-action flows. Native app integrations.
- **Strengths:** Massive app library, no-code UI, fast to ship.
- **Weaknesses:** Costly at scale, limited branching, opaque error logs.
- **Recommend when:** "When X in App A happens, do Y in App B." That is it.

### Make (formerly Integromat)
- **Fit:** Multi-step flows with visual branching and routing.
- **Strengths:** Visual canvas, decent error handling, cheaper than Zapier at volume.
- **Weaknesses:** Steeper learning curve, fewer apps than Zapier.
- **Recommend when:** Multi-step flow with conditional branches, but no need for custom code.

### n8n
- **Fit:** Self-hosted, max flexibility, complex logic, custom code nodes.
- **Strengths:** Self-host = no per-execution cost, JavaScript nodes for anything, open-source community.
- **Weaknesses:** You maintain the infrastructure. Steeper still.
- **Recommend when:** High volume, complex logic, or sensitive data that can't leave your infra. User already has n8n running.

### Claude Managed Agent (cloud)
- **Fit:** Judgment in the loop. Reading and synthesizing content. Drafting based on context.
- **Strengths:** Handles fuzzy inputs, can read docs / emails / transcripts and decide what to do.
- **Weaknesses:** Higher per-run cost, slower than a webhook, needs guardrails.
- **Recommend when:** The step requires reading something nuanced and deciding what to do — review, summarize, route, draft a reply.

### Decision shortcut

```
Is the step "X happens → do Y"?           → Zapier
Is the step "X happens → check Z → do A or B"? → Make
Is the step complex / high-volume / sensitive? → n8n
Does the step require reading + judgment? → Managed Agent
```

---

## Detect SEED + PAUL before emitting handoff language

Before writing any callout or end-of-session handoff that references `/seed:*` or `/paul:*` commands, check whether the user has those skills installed. Run this in the background — silent to the user.

```bash
SEED_INSTALLED=$( [ -d "$HOME/.claude/skills/seed" ] && echo yes || echo no )
PAUL_INSTALLED=$( [ -d "$HOME/.claude/skills/paul" ] && echo yes || echo no )
```

Use the result to pick the callout variant. Do NOT push install URLs at users who already have the skills — it is noise. Do NOT assume install when the directory is absent — it is the only signal we have.

---

## How to Flag a Step in the SOP

When a step passes the filter, append the callout below the step body.

### Variant A — SEED and PAUL both already installed

```markdown
> 💡 **Recommended automation**
> - **Tool:** {Zapier / Make / n8n / Managed Agent}
> - **Trigger:** {event that starts it}
> - **Inputs:** {fields needed}
> - **Outputs:** {fields produced}
> - **Next step:** Run `/seed:tasks:ideate` to scope. Then `/paul:plan` → `/paul:apply` to ship.
```

### Variant B — SEED or PAUL missing

```markdown
> 💡 **Recommended automation**
> - **Tool:** {Zapier / Make / n8n / Managed Agent}
> - **Trigger:** {event that starts it}
> - **Inputs:** {fields needed}
> - **Outputs:** {fields produced}
> - **Next step:** Install the build chain first, then ideate and ship.
>   - SEED — `git clone https://github.com/ChristopherKahler/seed ~/.claude/skills/seed`
>   - PAUL — `git clone https://github.com/ChristopherKahler/paul ~/.claude/skills/paul`
>   - Then run: `/seed:tasks:ideate` → `/paul:plan` → `/paul:apply`
```

Mention only the skill(s) actually missing. If SEED is installed and PAUL is not, drop the SEED clone line.

Be specific in either variant. Vague callouts ("could be automated") get ignored. Tool name + trigger + inputs/outputs = enough for SEED to ideate against.

---

## SEED Handoff Language

When the user finishes capturing the SOP and has automation callouts, end the response with one of:

**Variant A — SEED installed:**

```
🤖 You flagged {N} step(s) for automation. Ready to scope them?

Run `/seed:tasks:ideate` to incubate. SEED will turn each flagged step into a workflow concept — trigger, data flow, tool selection, edge cases — without committing to build.
```

**Variant B — SEED not installed:**

```
🤖 You flagged {N} step(s) for automation. Ready to scope them?

You'll need SEED first — it incubates each flagged step into a workflow concept before any code gets written:

  git clone https://github.com/ChristopherKahler/seed ~/.claude/skills/seed

Then run `/seed:tasks:ideate`.
```

Why SEED first: automations often look obvious but break on edge cases. SEED forces the user to think through the corner cases before PAUL gets involved.

---

## PAUL Handoff Language

After SEED produces a clear automation spec, one of:

**Variant A — PAUL installed:**

```
🛠️ SEED has scoped the automation. Ready to build?

Run `/paul:plan` to plan the implementation phases. Then `/paul:apply` when the plan is approved.
```

**Variant B — PAUL not installed:**

```
🛠️ SEED has scoped the automation. Ready to build?

You'll need PAUL to phase the implementation:

  git clone https://github.com/ChristopherKahler/paul ~/.claude/skills/paul

Then run `/paul:plan`.
```

Why PAUL second: PAUL is built for execution. It needs a clear spec going in. SEED → PAUL is the right order.

---

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Flagging a step that requires real judgment for Zapier | Move to managed agent or leave manual |
| Flagging "automate the entire SOP" | Break it down — most SOPs have 2-3 automatable steps, not all of them |
| Skipping SEED and going straight to PAUL | Make the user ideate first. Saves throwaway code. |
| Recommending n8n when Zapier would work | Default to the simpler tool unless volume or complexity demand more |
| No trigger named in the callout | Force the user to name it. "Manual" is not a trigger for an automation. |
