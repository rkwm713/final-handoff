# AI Context Files

> **Download a context file, paste it into ChatGPT (or Claude/Copilot), then ask your question.** The AI will have full knowledge of that tracker's fields, workflow, automation, and Power Query setup.

---

## What Are These?

Each context file is a single markdown document that contains everything an AI assistant needs to know about a specific tracker:

- Complete field reference (display names + internal names + types)
- Status workflow and all status options
- Power Automate flows (triggers, actions, field mappings)
- Power Query M Code (full queries with connection details)
- SharePoint URLs and list GUIDs
- Key expressions used in flows

## How to Use Them

1. **Download** the context file for the tracker you need help with
2. **Open** ChatGPT, Claude, or Copilot
3. **Paste** the entire file content into the chat (or attach it as a file)
4. **Ask your question** -- the AI now has full context about the tracker

### Example Prompts After Pasting

- "I need a Power Automate expression that checks if a project has been in AEGIS Design for more than 14 days"
- "Write me M Code to add the Equipment column to the Power Query output"
- "How do I create a view that shows all items where the FCC hasn't responded in 10+ days?"
- "The Status Change Logger flow isn't updating Previous Status. What should I check?"

---

## Download Context Files

Click a link below to download the context file. Your browser may display it as text -- use **right-click > Save link as** to download.

| Tracker | Context File | What's Included |
|---------|-------------|-----------------|
| **Closing Tracker** | [closing-tracker-context.md](/context/closing-tracker-context.md) | 60 fields, 5 flows, SOX timer, external contact workflow, full M Code |
| **EV Tracker** | [ev-tracker-context.md](/context/ev-tracker-context.md) | 65 fields, Status Change Logger flow, 10 end date fields, 2 M Code queries |
| **Drafting Tracker** | [drafting-tracker-context.md](/context/drafting-tracker-context.md) | 53 fields, Date Stamps + RULIS Alert flows, RULIS workflow, M Code |
| **Small Cell Tracker** | [small-cell-tracker-context.md](/context/small-cell-tracker-context.md) | 54 fields, Status End Date flow, 12 end date fields, 5 M Code queries (SPIDA integration) |

---

## Tips for Best Results

- **Be specific** in your questions -- mention field internal names when possible
- **Include error messages** if troubleshooting a flow or query
- **Tell the AI your skill level** -- "I'm new to Power Automate" gets simpler explanations
- **Ask for step-by-step** when you need instructions you can follow
- **One tracker at a time** -- paste only the context file for the tracker you're asking about

---

## What's NOT in These Files

- Actual data or work order details (no sensitive info)
- Screenshots or images
- Login credentials or permissions
- Step-by-step Microsoft UI tutorials (the AI can provide these based on context)

---

**Last Updated:** February 19, 2026
