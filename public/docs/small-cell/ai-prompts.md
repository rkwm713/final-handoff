# Small Cell Tracker - AI Prompts

> **Copy-paste these prompts into ChatGPT, Claude, or Copilot to get help with the Small Cell Team Tracker**
> 
> Replace anything in `[brackets]` with your specific information.

---

## Understanding the List

### "Explain a field to me"

```
I'm working with a SharePoint list called "Small Cell Team Tracker" for tracking 
small cell telecommunications infrastructure projects.

Can you explain what the [FIELD NAME] field is used for and when I should update it?

Context: This list tracks small cell projects through SPIDA design, QA review, 
construction, and delivery for various carriers.
```

### "What do these status options mean?"

```
In our Small Cell Team Tracker SharePoint list, we have these STATUS options:
- Received
- Pending External Review and Approval
- Pending SPIDA Design
- Pending SPIDA QA
- Construction
- Delivered
- Canceled

Can you explain what each status means and the typical workflow progression?
```

### "Explain SPIDA vs Microsoft List status"

```
Our Small Cell Team Tracker has a Status field, but we also get SPIDA statuses 
from an external system that get merged into our Excel reports.

SPIDA statuses include: Design, QA Check, Incoming, Delivered

Can you explain:
1. What's the difference between SPIDA status and our Microsoft List status?
2. When might they be different?
3. Which one should I use for workflow decisions?
```

### "What are the End Date fields for?"

```
Our Small Cell Team Tracker has several End Date fields:
- PendExternalEnd
- SPIDADesignEnd
- SPIDAQAEnd
- ConstructionEnd

Can you explain when each of these gets filled in and how they're used for tracking?
```

---

## Troubleshooting

### "Why isn't my automation working?"

```
I have a Power Automate flow on my Small Cell Team Tracker SharePoint list called 
"Status End Date Tracker" that should record dates when I change status.

But when I [DESCRIBE WHAT YOU DID], [DESCRIBE WHAT HAPPENED OR DIDN'T HAPPEN].

What could be causing this and how do I fix it?
```

### "End Date didn't fill in automatically"

```
I changed the Status of a project in our Small Cell Team Tracker from [OLD STATUS] 
to [NEW STATUS], but the corresponding End Date field didn't fill in automatically.

For reference, the flow should fill in:
- PendExternalEnd when leaving "Pending External Review and Approval"
- SPIDADesignEnd when leaving "Pending SPIDA Design"
- SPIDAQAEnd when leaving "Pending SPIDA QA"
- ConstructionEnd when leaving "Construction"

What might have gone wrong?
```

### "Previous Status not updating"

```
Our Small Cell Team Tracker has a "Previous Status" field that should update 
when the Status changes. But it's showing [CURRENT VALUE] when I expected [EXPECTED VALUE].

What could be causing this mismatch?
```

---

## Making Changes

### "How do I add a new status option?"

```
I need to add a new status option called "[NEW STATUS NAME]" to our Small Cell Team Tracker 
SharePoint list.

Can you give me step-by-step instructions for adding this new option?
Also, what other things might I need to update:
- The Status End Date Tracker Power Automate flow?
- Should I add a corresponding End Date field?
- Any calculated fields?
```

### "How do I add a new End Date field?"

```
We're adding a new stage to our Small Cell project workflow and need a new End Date field 
called "[FIELD NAME]End" in our Small Cell Team Tracker.

Can you give me step-by-step instructions for:
1. Adding the new Date column to SharePoint
2. Updating the Status End Date Tracker flow to populate this field
3. Adding it to my Excel Power Query report
```

### "How do I create a view by Carrier?"

```
I want to create a view in our Small Cell Team Tracker that shows only:
- Projects for a specific Carrier: [CARRIER NAME]
- Status is NOT Delivered or Canceled
- Sorted by [ReceivedDate/Status]

Can you give me step-by-step instructions?
```

---

## Power Automate Flows

### "Explain the Status End Date Tracker"

```
We have a Power Automate flow called "Status End Date Tracker" on our Small Cell Team Tracker.
Can you explain in simple terms:

1. What triggers this flow?
2. Which End Date fields does it update?
3. How does it know which field to update based on the status change?
4. What's the "Previous Status" field used for?
```

### "Debug the Status End Date Tracker"

```
Our Status End Date Tracker flow on the Small Cell Team Tracker is [not running / 
showing errors / not filling in dates].

Error message (if any): [PASTE ERROR]

Recent change I made: Status changed from [OLD] to [NEW] on project [TITLE]

What's causing this issue and how do I fix it?
```

### "Create a notification flow"

```
I want to create a Power Automate flow for our Small Cell Team Tracker that:
- Triggers when: [DESCRIBE - e.g., "Status changes to Pending SPIDA QA" or "project is stuck for 14+ days"]
- Sends notification to: [WHO]
- Message should include: [WHAT INFO]

Can you give me step-by-step instructions?
```

---

## Excel & SPIDA Integration

### "Help me understand the Power Query"

```
I have a Power Query in Excel that connects to our Small Cell Team Tracker SharePoint list 
and merges it with SPIDA data.

Here's the M Code:

[PASTE YOUR M CODE HERE]

Can you explain what each step does, especially the SPIDA merge parts?
```

### "SPIDA data not merging correctly"

```
In my Excel report for the Small Cell Team Tracker, the SPIDA columns 
(SPIDA_TITLE, SPIDA_STATUS) are showing "Not in SPIDA" for projects that 
I know exist in SPIDA.

Project ID in SharePoint: [VALUE]
Project ID format in SPIDA: [VALUE if known]

What could be causing this mismatch and how do I fix it?
```

### "Update the SC_SPIDA table"

```
I need to update the SPIDA data in my Small Cell Excel report.

Can you give me step-by-step instructions for:
1. Exporting the latest data from SPIDA
2. Updating the SC_SPIDA table in Excel
3. Refreshing the Power Query to merge the new data
```

### "Add a new column from SPIDA"

```
I want to add a new column from our SPIDA data to the merged Small Cell Excel report.
The column is called [COLUMN NAME] in the SPIDA export.

How do I modify my Power Query to:
1. Include this column in the SC_SPIDA_Data query
2. Expand it in the SC_SPIDA_Mapping query
```

---

## Project Management

### "Project is stuck in a status"

```
I have a Small Cell project that's been stuck in [STATUS] status for [NUMBER] days.

Current situation:
- Title/Site ID: [VALUE]
- Carrier: [VALUE]
- Design Lead: [NAME]
- Field Lead: [NAME]
- Last activity: [DESCRIBE]

What steps should I take to move this project forward?
```

### "Understand the External Review stage"

```
Our Small Cell Team Tracker has a "Pending External Review and Approval" status.

Can you explain:
1. What external reviews/approvals are typically required?
2. How long does this stage usually take?
3. What should I do if it's taking longer than expected?
4. When should I move the project to the next status?
```

---

## Quick Reference Prompts

### "Give me the internal field names"

```
I'm working with the Small Cell Team Tracker SharePoint list and need to use field names 
in Power Automate. Can you help me find the internal name for [DISPLAY NAME]?

For reference, common internal names in this list are:
- Title = Title (Project/Site ID)
- Carrier = Carrier
- Status = Status
- Design Lead = DesignLead
- Field Lead = FieldLead
- Received Date = ReceivedDate
- Delivered Date = DeliveredDate
- Canceled Date = CanceledDate
- Pending External End = PendExternalEnd
- SPIDA Design End = SPIDADesignEnd
- SPIDA QA End = SPIDAQAEnd
- Construction End = ConstructionEnd
- Previous Status = PreviousStatus
```

### "Write a Power Automate expression"

```
I need a Power Automate expression for my Small Cell Team Tracker flow that:
[DESCRIBE WHAT YOU NEED - e.g., "checks if the previous status was Pending SPIDA Design"]

The field internal name is [INTERNAL NAME].
Please give me the expression I can copy-paste into Power Automate.
```

### "Calculate days in current stage"

```
I need a Power Automate or Excel expression that calculates how many days a 
Small Cell project has been in its current status.

If I have the date when the status last changed, what expression should I use?
```

---

## Tips for Better AI Responses

1. **Be specific** - Include the Site ID, Carrier, and current status
2. **Provide context** - Mention it's for small cell telecommunications infrastructure
3. **Distinguish SPIDA vs List** - Clarify if you're asking about SPIDA status or Microsoft List status
4. **Include the Carrier** - Different carriers may have different requirements

---

## Related Documentation

- [Project Overview](overview) - Complete end-to-end workflow from intake to completion
- [User Guide](guide) - Field definitions, views, and common changes
- [Automation Guide](automation) - Power Automate flows
- [Excel Info](excel-info) - Power Query M Code and SPIDA integration

---

**Last Updated:** February 19, 2026
