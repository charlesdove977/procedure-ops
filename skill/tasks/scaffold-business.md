# Task: Scaffold Business

One-time setup for a new business folder under `SOPs/`. Creates the per-department subfolders and registers the business in `SOPs/INDEX.md`.

## When to Run

- User runs `/sop-build scaffold-business`
- User tries to save an SOP to a business that does not exist yet (the interview task falls back to this)

## Workflow

### Phase 1 — Business Identity

Ask, using `AskUserQuestion`:

1. **Business name.** Full human-readable name with proper capitalization. (e.g., "Acme Logistics", "IBM Global Services", "Northwind Trading"). DO NOT titlecase a slug to fill this — if the user says "ibm-services", ask "How should this display? `Ibm Services` or `IBM Services`?" Acronyms keep their caps.
2. **Business slug.** kebab-case, used for the folder name. Suggest a default by lowercasing + hyphenating the business name. Confirm with user.
3. **One-line description.** What does this business do? Used in the README and INDEX.

If the slug already exists under `SOPs/`, abort with a clear message: "That business already exists at `SOPs/<slug>/`. Use `/sop-build interview` to add SOPs to it."

### Phase 2 — Department Selection

Default department set (all 8 — confirmed during discovery):

- support
- operations
- onboarding
- sales
- finance
- marketing
- tech-it
- compliance-legal

Ask, using `AskUserQuestion` with multiSelect: "Which departments should this business start with?" Show all 8 selected by default. The user can deselect any that don't apply (e.g., a personal brand might not need compliance-legal).

If the user wants additional departments not in the default set, accept custom slugs (kebab-case, validate).

### Phase 3 — Create the Folder Tree

Resolve repo root with `git rev-parse --show-toplevel`, then `mkdir -p` under `SOPs/<slug>/`. If the working directory is not inside a git repo, fall back to the current working directory and confirm with the user before writing.

```bash
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
mkdir -p "$ROOT/SOPs/<slug>"/{<dept1>,<dept2>,...}
```

Strip departments the user deselected before expanding the brace list.

Then create a README inside the business root:

`SOPs/<slug>/README.md`

```markdown
# <Business Name>

<One-line description>

## Departments

- [Support](support/) — Customer service, ticketing, escalations
- [Operations](operations/) — Daily execution, recurring internal workflows
- [Onboarding](onboarding/) — Client + employee onboarding flows
- [Sales](sales/) — Lead intake, pipeline, close process
- [Finance](finance/) — Billing, invoicing, AR/AP, payouts
- [Marketing](marketing/) — Content ops, campaign launches, social
- [Tech / IT](tech-it/) — Access provisioning, system setup
- [Compliance / Legal](compliance-legal/) — Contracts, audits, sign-off

## How to add an SOP

Run `/sop-build interview` from anywhere in this repo. When asked which business, pick `<slug>`.

## SOP count

| Department | Count |
|---|---|
| Support | 0 |
| Operations | 0 |
| Onboarding | 0 |
| Sales | 0 |
| Finance | 0 |
| Marketing | 0 |
| Tech / IT | 0 |
| Compliance / Legal | 0 |
```

Strip rows from the table for departments the user excluded. Strip from the bulleted "Departments" list above it too — both must match the actual folders created in Phase 3. Mismatched README + folder tree confuses delegates.

### Phase 4 — Register in INDEX

Edit `SOPs/INDEX.md`. Add a new section:

```markdown
---

## <Business Name>

Slug: `<slug>` · Folder: [`SOPs/<slug>/`](<slug>/) · <One-line description>

| SOP | Department | Owner | Created |
|---|---|---|---|
| _No SOPs yet._ | | | |
```

### Phase 5 — Report

Tell the user:

```
✅ Business scaffolded at `SOPs/<slug>/`.

Departments created: <list>

Next step: run `/sop-build interview` and pick `<slug>` to add your first SOP.
```

## Acceptance Criteria

- [ ] `SOPs/<slug>/` created with one subfolder per selected department
- [ ] `SOPs/<slug>/README.md` created with the right department list
- [ ] `SOPs/INDEX.md` updated with a new business section
- [ ] User can clearly see what to do next
