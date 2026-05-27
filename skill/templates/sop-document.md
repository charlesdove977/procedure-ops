# Template: SOP Document

Fill-in-the-blank skeleton for a new SOP. Mirrors `frameworks/sop-anatomy.md`.

When filling this in, replace every `{placeholder}` with captured input. Strip sections only if you can name why they don't apply (and add a note explaining the skip).

---

```markdown
# 🎓 {SOP Title}

---

# 📄 **{SOP Title} SOP**

### 🔗 **Reference Documents**

Before beginning this SOP:

- Review {description of doc 1} here → [**{Doc 1 Title}**]({url1})
- Review {description of doc 2} here → [**{Doc 2 Title}**]({url2})

---

### 🎯 **Purpose**

{One paragraph. What this SOP teaches, who benefits, why it matters. Plain language.}

---

### 👥 **Who This SOP Is For**

- {Role 1}
- {Role 2}
- Any team member responsible for {scope}

---

### 🧠 **Overview**

{Two to four sentences of plain-language context. Name every major system / tool involved. Mention where this sits in the bigger process.}

---

## 🪜 **Step-by-Step Process**

---

### **STEP 1 – {Step Title}**

- {Concrete action 1}
- {Concrete action 2}
- Confirm:
    - ✅ {Confirmation criterion 1}
    - ✅ {Confirmation criterion 2}

{Optional: branches / exceptions as sub-bullets}
{Optional: 📌 **Tip:** ...}
{Optional: 🧠 **Note:** ...}
{Optional automation callout:}
> 💡 **Recommended automation**
> - **Tool:** {tool}
> - **Trigger:** {event}
> - **Inputs:** {fields in}
> - **Outputs:** {fields out}
> - **Next step:** Run `/seed:tasks:ideate` to scope. Then `/paul:plan` to build.

{Optional Loom placeholder:}
> 🎬 **Loom:** [Record here]({placeholder}) — TODO: record before handoff

---

### **STEP 2 – {Step Title}**

{Repeat structure}

---

{Repeat for N steps}

---

## 🗂️ **Checklist Before Marking Complete**

✅ {Mirrors Step 1 outcome}
✅ {Mirrors Step 2 outcome}
✅ {...one row per step}
✅ {Cross-cutting items: tracker updated, files uploaded, etc.}

---

## 🧠 **Notes & Reminders**

- {Pro tip / gotcha 1}
- {Pro tip / gotcha 2}
- Never {do X} until {Y}.

---

## 📞 **Escalation**

- **Owner:** {Name + role}
- **Escalation contact:** {Name + channel — Slack, WhatsApp, email}
- **When to escalate:** {Specific conditions — e.g., "If a prop firm account fails twice, escalate to {Name} in {channel}."}

---

## 📅 **Metadata**

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

## Output Filename Convention

```
SOPs/{business-slug}/{department-slug}/{sop-title-kebab-case}.md
```

Examples:

- `SOPs/acme-logistics/onboarding/client-intake.md`
- `SOPs/northwind-trading/operations/weekly-inventory-review.md`
- `SOPs/contoso-consulting/sales/proposal-review.md`

---

## INDEX.md Append

After writing the SOP, append this row to the business section in `SOPs/INDEX.md`:

```markdown
| [{sop-title}]({relative-path}) | {department} | {owner} | {YYYY-MM-DD} |
```
