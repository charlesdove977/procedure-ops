# Procedure Ops

> COO-in-a-box for [Claude Code](https://claude.ai/code). Builds ironclad Standard Operating Procedures from interviews, screen-recording transcripts, or existing drafts — and pushes back on weak steps before they get written down.

[![npm version](https://img.shields.io/npm/v/procedure-ops.svg)](https://www.npmjs.com/package/procedure-ops)
[![license](https://img.shields.io/npm/l/procedure-ops.svg)](LICENSE)

Procedure Ops ships the **`sop-build`** skill: a structured, opinionated SOP author that captures *what* you do, *who* it is for, *how* to escalate when it breaks, and *which* steps belong on Zapier / Make / n8n / a Claude managed agent instead of in a human's hands.

Designed for founders, agency operators, and team leads who need to delegate cleanly the first time — not the third time after the VA has already broken three clients.

---

## Why

Most SOPs fail because they were written by the person who already knows the process. The result: fuzzy verbs ("review the form"), missing escalation paths, hidden judgment calls, and zero automation flagging. The delegate hits Step 3, gets stuck, messages you, and the SOP becomes a paperweight.

Procedure Ops fixes that by acting like a COO during the build:

- **Challenges weak inputs.** "Review the form" → "Which fields? What does pass vs. fail look like?"
- **Names the escalation contact.** Single person, single channel. No "ask the team."
- **Flags automation candidates inline.** Every step gets the three-question filter (deterministic trigger / known I/O / judgment required) and a tool recommendation when it passes.
- **Routes the automation work cleanly.** When a step is automatable, the SOP points the user at the right next skill (`/seed:tasks:ideate` for scoping, `/paul:plan` for build).
- **Quality-gates before writing the file.** Built-in checklist catches "obviously," missing Looms on UI-heavy steps, undefined jargon, and dangling `if X` conditions.

---

## Install

### Option 1 — `npx` (recommended, no global install)

```bash
npx procedure-ops install
```

Installs the skill to `~/.claude/skills/sop-build/`. Run again with `update` to refresh after a package upgrade:

```bash
npm view procedure-ops version          # check latest
npx procedure-ops@latest update         # refresh in place
```

### Option 2 — Global install

```bash
npm install -g procedure-ops
procedure-ops install
```

After global install, the `procedure-ops` command is on your `$PATH` and runs without `npx`.

### Project-scoped install (per repo)

Install into a single project's `.claude/skills/` instead of your user-wide directory:

```bash
cd ~/path/to/project
npx procedure-ops install --project
```

Useful when you want the skill scoped to one client repo, or pinned to a specific version per project.

### Install command stubs

By default only the skill is installed; the slash command `/sop-build` is exposed by the skill itself. If you also want explicit slash commands per task (`/sop-build-interview`, `/sop-build-audit`, etc.), add `--with-commands`:

```bash
npx procedure-ops install --with-commands
```

This drops six stub `.md` files into `~/.claude/commands/` (or `./.claude/commands/` with `--project`).

### Uninstall

```bash
npx procedure-ops uninstall
npx procedure-ops uninstall --with-commands   # also remove command stubs
```

### Where does it install?

```bash
npx procedure-ops where           # ~/.claude/skills/sop-build
npx procedure-ops where --project # ./.claude/skills/sop-build
```

---

## CLI reference

```
procedure-ops <command> [flags]

Commands:
  install         Install the sop-build skill
  update          Reinstall (overwrites existing)
  uninstall       Remove the skill
  where           Print the install path
  --help, -h      Show help
  --version, -v   Show version

Flags:
  --project           Use ./.claude/ instead of ~/.claude/
  --with-commands     Also install slash command stubs
  --update, --force   Overwrite an existing install (implied by `update`)
```

---

## Usage

Once installed, the skill is reachable from Claude Code as `/sop-build` plus a task name. All five tasks below run inside an active Claude Code session.

### `/sop-build interview`

Guided Q&A intake. Captures a process from scratch in 10 phases — routing, anatomy, step-by-step capture with COO push-back, reference docs, automation flagging, edge cases, checklist build, quality gate, file write, next-step suggestions.

The interview also auto-fires on natural language: "write an SOP for X," "document this process," "delegate this to my VA," "I keep redoing this."

### `/sop-build scaffold-business`

One-time setup for a new business. Creates `SOPs/<slug>/{support,operations,onboarding,sales,finance,marketing,tech-it,compliance-legal}/` and registers the business in `SOPs/INDEX.md`. Defaults are configurable per-business.

### `/sop-build from-recording`

Converts a screen-recording transcript (Loom, Read.ai, otter, manual) into a structured SOP. Pulls steps, tools, exceptions, and gotchas from the transcript, then runs the same quality gate as `interview`.

### `/sop-build audit`

Reviews an existing SOP file against the canonical anatomy, the delegation-ready checklist, and the automation-readiness checklist. Produces a severity-tagged report (🔴 Critical / 🟡 Warning / 🟢 Suggestion). Optional: write a revised version alongside the original.

### `/sop-build delegate-pack`

Bundles a finished SOP into a handoff packet for a VA, contractor, or new hire. Includes access list, Loom/training inventory, first-week check-in cadence, escalation path, and success criteria.

---

## What gets installed

```
~/.claude/skills/sop-build/
├── SKILL.md
├── tasks/
│   ├── interview.md
│   ├── scaffold-business.md
│   ├── from-recording.md
│   ├── audit.md
│   └── delegate-pack.md
├── frameworks/
│   ├── sop-anatomy.md           ← canonical SOP structure
│   ├── automation-flagging.md   ← Zapier / Make / n8n / managed-agent routing
│   ├── raci-matrix.md           ← multi-actor accountability
│   └── swim-lane-format.md      ← Mermaid swim-lane diagrams
├── checklists/
│   ├── sop-ready-to-delegate.md
│   ├── automation-readiness.md
│   └── handoff-completeness.md
└── templates/
    ├── sop-document.md
    ├── delegate-packet.md
    ├── sop-audit-report.md
    └── interview-transcript.md
```

SOPs themselves are written to your *project*, not into the skill folder. Default location: `<repo-root>/SOPs/<business-slug>/<department-slug>/<sop-slug>.md`.

---

## SOP anatomy

Every SOP that Procedure Ops writes follows the same nine-section structure:

1. 🔗 **Reference Documents** — Linked Notion docs, source recordings, training videos, prerequisite SOPs
2. 🎯 **Purpose** — One paragraph: what this teaches, who benefits, why it matters
3. 👥 **Who This SOP Is For** — Role titles, never personal names
4. 🧠 **Overview** — Plain-language context, systems involved, where it fits in the bigger process
5. 🪜 **Step-by-Step Process** — Numbered steps with concrete actions, confirmation criteria, branches, automation callouts, Loom placeholders
6. 🗂️ **Checklist Before Marking Complete** — Flat checklist mirroring step outcomes
7. 🧠 **Notes & Reminders** — Gotchas, recurring failure modes, "never do X until Y"
8. 📞 **Escalation** — Owner + escalation contact + when-to-escalate conditions
9. 📅 **Metadata** — Business, department, created date, version, author

See [`skill/frameworks/sop-anatomy.md`](skill/frameworks/sop-anatomy.md) for the full spec, anti-patterns, and style rules.

---

## Automation flagging

When a step looks automatable during the interview or audit, Procedure Ops runs it through a three-question filter and recommends the right tool:

| Q1 — Deterministic trigger? | Q2 — Known I/O? | Q3 — Judgment required? | Verdict |
|---|---|---|---|
| Yes | Yes | No | ✅ Workflow tool (Zapier / Make / n8n) |
| Yes | Yes | Yes | ✅ Claude managed agent (judgment in the loop) |
| Yes | No | — | 🟡 Map I/O first |
| No | — | — | ❌ Manual — needs human decision to start |

Each flagged step gets an inline callout in the SOP:

```markdown
> 💡 **Recommended automation**
> - **Tool:** Make
> - **Trigger:** New row in Google Sheet `Onboarding Queue`
> - **Inputs:** Client name, email, signed-contract URL
> - **Outputs:** Asana subtask created, Slack message posted to #ops
> - **Next step:** Run `/seed:tasks:ideate` to scope. Then `/paul:plan` to build.
```

Procedure Ops never builds the automation itself — that is a deliberate handoff to the [SEED](https://github.com/) (incubate) and [PAUL](https://github.com/) (plan + ship) workflows. Capture the SOP first; ideate the automation after.

---

## Why a skill, not a library

Procedure Ops is distributed as a Claude Code skill rather than a TypeScript/Python library because the actual work — challenging vague answers, pushing back on missing escalation contacts, generating Mermaid swim-lanes — is conversational. A library would just be a markdown template. Claude is the COO; this package gives Claude the playbook.

The `procedure-ops` CLI exists only to put the playbook files in the right directory.

---

## FAQ

**Does it run without an internet connection?**
The CLI install does not need the network after `npm install`. The skill itself runs inside Claude Code, which does require connectivity.

**Does it work outside Claude Code?**
The skill files are plain markdown. You can read them and apply the playbook manually — but the COO behavior is in Claude's hands. There is no standalone runtime.

**Does it touch my repo when I install?**
No. The default install writes to `~/.claude/skills/sop-build/`, which is your user-wide Claude Code config directory. Only `--project` writes into the current directory.

**How do I update the skill after publishing changes to my SOPs?**
SOPs live in your project, not in the skill folder. Updating the skill (`npx procedure-ops update`) never touches your `SOPs/` directory.

**Can I customize the skill after installing?**
Yes — the installed files are yours. Edit anything in `~/.claude/skills/sop-build/`. The next `update` will overwrite your edits, so consider forking the repo instead if you are making meaningful changes.

---

## Contributing

Issues + PRs welcome at [github.com/charlesdove977/procedure-ops](https://github.com/charlesdove977/procedure-ops).

Workflow:

1. Fork + clone
2. Edit files under `skill/`
3. Smoke test with `npx . install --project` inside a scratch directory
4. PR against `main`

When the package version bumps, the skill version inside `skill/SKILL.md` should match.

---

## License

MIT — see [LICENSE](LICENSE).
