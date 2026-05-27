# Framework: SOP Hosting Options

Where the team READS the SOPs day-to-day matters more than where the source files live. Local markdown is fine for technical teams. A VA, contractor, or non-technical hire usually needs the SOP somewhere they can search, comment, and bookmark — Google Drive or Notion.

Load this framework whenever a task is about to recommend where SOPs should be published or mirrored.

---

## When to Recommend a Host

- **End of `tasks/scaffold-business.md`** — once the folder tree exists locally, ask where the team will actually read these SOPs.
- **Inside `tasks/delegate-pack.md`** — before sending the packet, confirm the delegate has access to the readable copy, not just the repo markdown.
- **End of `tasks/interview.md`** — for the first SOP in a business, surface this question once. After that, the choice is sticky.

If the user has already named a host in a prior conversation (or it shows up in the business's `SOPs/<slug>/README.md`), do not re-ask. Honor the prior decision.

---

## The Three Common Hosts

### 1. Local markdown only

**Fit:** Solo founder, technical team, git-based workflow, infrequent SOP reads.

**Pros:** Zero setup, version-controlled, lives next to code, easy to bulk-edit.

**Cons:** Non-technical delegates struggle to find files. No commenting. No mobile-friendly view.

**Recommend when:** The audience is engineers and the SOPs are mostly for self-documentation rather than delegation.

---

### 2. Google Drive (Google Docs format)

**Fit:** VAs, contractors, non-technical hires, fast-onboarding teams.

**Pros:** Searchable, comment threads, mobile-friendly, granular share permissions, easy print-to-PDF. Most VAs already know it.

**Cons:** Diverges from source markdown unless you re-export on each change. No native version control beyond Google's revision history.

**Recommend when:** The audience is non-technical and reads SOPs more often than the user edits them.

**Suggested folder structure:**

```
Google Drive/
└── <Business Name>/
    └── SOPs/
        ├── INDEX (Google Doc with the same content as SOPs/INDEX.md)
        ├── Onboarding/
        │   └── <SOP Title>.gdoc
        ├── Operations/
        ├── Sales/
        └── ...
```

**Mirror command** (if the user has the `gws` CLI installed for Google Workspace):

```bash
# Convert a single markdown SOP to a Google Doc
gws docs create --title "<SOP Title>" --from-markdown "<path-to-sop.md>" \
  --parent-folder "<Drive folder ID for the department>"
```

**Sync rule:** Markdown in the repo is the source of truth. Google Doc is a published copy. Every SOP edit pushes a fresh export — never let the team edit the Google Doc directly, or you fork from the source.

---

### 3. Notion (team wiki / database)

**Fit:** Teams already on Notion, multi-author wikis, SOPs that need linked properties (Owner, Last-Updated, Status, Department).

**Pros:** Database properties for filter/sort, embedded comments, mentions, linked databases (one SOP can reference another), templates per department.

**Cons:** Notion-locked. Slower than Google Docs for VAs unfamiliar with it. Markdown-to-Notion conversion is lossy for some formatting (Mermaid swim-lanes render as code blocks, not diagrams).

**Recommend when:** The team already lives in Notion or the SOPs need to be linked to projects, clients, or roles in other Notion databases.

**Suggested database schema:**

| Property | Type | Notes |
|---|---|---|
| Title | Title | The SOP name |
| Business | Select | One per business |
| Department | Select | The 8 standard departments |
| Owner | Person | Single accountable |
| Audience | Multi-select | Role titles the SOP serves |
| Status | Status | Draft / Review / Active / Archived |
| Last updated | Date | Auto-set on edit |
| Source | URL | Link back to the markdown in the git repo |
| Linked SOPs | Relation | Other SOPs this one depends on |

**Create the database** via the `notion-create-database` skill if installed, or manually inside Notion.

**Sync rule:** Same as Google Drive — markdown is the source of truth, Notion is the published copy. The `Source` property always points back to the repo path.

---

## The Question to Ask

Use `AskUserQuestion` once per business with these options:

```
Where will your team READ these SOPs day-to-day?

- Local markdown only — Technical team, git-based workflow. No host setup needed.
- Google Drive (Google Docs) — Non-technical delegates, mobile-friendly, easiest for VAs.
- Notion — Team wiki, comments + properties, multi-author. Best when team already on Notion.
- Both Drive and Notion — Drive for VAs, Notion for the internal team.
```

Save the answer to the business README (`SOPs/<slug>/README.md` under a `## Hosting` section) so the next SOP write knows the choice.

---

## Anti-Patterns

| Anti-Pattern | Fix |
|---|---|
| Asking the host question on every SOP write | Ask once per business, save to README, honor afterward |
| Letting the team edit the Google Doc / Notion page directly | Repo markdown is source of truth — always export, never reverse-sync |
| Recommending Notion for a one-person team | Overhead exceeds value — local markdown is fine |
| Recommending Drive for a Notion-native team | Friction — meet the team where they live |
| Auto-creating the Drive folder or Notion DB without asking | Confirm structure first — the user may already have a system |
