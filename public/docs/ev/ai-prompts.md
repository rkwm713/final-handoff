# EV Tracker - AI Prompts

> **Copy-paste these prompts into ChatGPT, Claude, or Copilot to get help with the EV Team Tracker**
> 
> Replace anything in `[brackets]` with your specific information.

---

## Understanding the List

### "Explain a field to me"

```
I'm working with a SharePoint list called "EV Team Tracker" for tracking Electric Vehicle 
infrastructure design projects.

Can you explain what the [FIELD NAME] field is used for and when I should update it?

Context: This list tracks EV charging station projects from initial receipt through 
design, QA review, construction, and delivery.
```

### "What do these status options mean?"

```
In our EV Team Tracker SharePoint list, we have these STATUS options:
- Received
- PPD (Preliminary Property Design)
- AEGIS Design
- AEGIS QA
- Construction
- Delivered
- Canceled

Can you explain what each status means and the typical workflow progression?
```

### "Explain the WaAM Status field"

```
Our EV Team Tracker has a WaAM Status field with these options:
- Active
- HOLD-E
- HOLD-O
- HOLD-A
- Completed
- NA

Can you explain what WaAM means and what each status option indicates?
When should I change the WaAM Status vs. the main Status field?
```

### "What are the End Date fields for?"

```
Our EV Team Tracker has several End Date fields:
- PPDEnd
- AEGISDesignEnd
- AEGISQAEnd
- ConstructionEndDate

Can you explain when each of these gets filled in and how they're used for tracking?
```

---

## Troubleshooting

### "Why isn't my automation working?"

```
I have a Power Automate flow on my EV Team Tracker SharePoint list called 
"Status Change Logger" that should record status changes to an Excel file.

But when I [DESCRIBE WHAT YOU DID], [DESCRIBE WHAT HAPPENED OR DIDN'T HAPPEN].

What could be causing this and how do I fix it?
```

### "End Date didn't fill in automatically"

```
I changed the Status of a project in our EV Team Tracker from [OLD STATUS] to [NEW STATUS], 
but the corresponding End Date field didn't fill in automatically.

The flow is supposed to record the date when leaving certain statuses.
What might have gone wrong and how do I fix it?
```

### "Status Change Logger not recording"

```
Our EV Team Tracker has a Power Automate flow that logs status changes to an Excel file.
I changed a project's status, but I don't see the new row in the Excel file.

Things I've checked:
- Status was changed from [OLD] to [NEW]
- Excel file location: [PATH]
- Time since change: [MINUTES/HOURS]

What could be causing this and how do I troubleshoot?
```

---

## Making Changes

### "How do I add a new status option?"

```
I need to add a new status option called "[NEW STATUS NAME]" to our EV Team Tracker 
SharePoint list.

Can you give me step-by-step instructions for adding this new option?
Also, what other things might I need to update:
- The Status Change Logger Power Automate flow?
- Any calculated fields?
- The End Date tracking logic?
```

### "How do I add a new End Date field?"

```
We're adding a new stage to our EV project workflow and need a new End Date field 
called "[FIELD NAME]End" in our EV Team Tracker.

Can you give me step-by-step instructions for:
1. Adding the new Date column to SharePoint
2. Updating the Status Change Logger flow to populate this field
3. Adding it to my Excel Power Query report
```

### "How do I create a view for my projects?"

```
I want to create a view in our EV Team Tracker that shows only:
- Projects where I'm the Designer (or Field Tech)
- Status is NOT Delivered or Canceled
- Sorted by [CRD/ReceivedDate/Status]

Can you give me step-by-step instructions?
```

---

## Power Automate Flows

### "Explain the Status Change Logger"

```
We have a Power Automate flow called "Status Change Logger" on our EV Team Tracker.
Can you explain in simple terms:

1. What triggers this flow?
2. What data does it log to Excel?
3. How does it calculate the duration in each status?
4. What's the "Previous Status" field used for?
```

### "Debug the Status Change Logger"

```
Our Status Change Logger flow on the EV Team Tracker is [not running / showing errors / 
recording wrong data].

Error message (if any): [PASTE ERROR]

Recent change I made: Status changed from [OLD] to [NEW] on project [TITLE]

What's causing this issue and how do I fix it?
```

### "Create a notification flow"

```
I want to create a Power Automate flow for our EV Team Tracker that:
- Triggers when: [DESCRIBE - e.g., "Status changes to AEGIS QA" or "CRD is within 7 days"]
- Sends notification to: [WHO]
- Message should include: [WHAT INFO]

Can you give me step-by-step instructions?
```

---

## Excel & Reporting

### "Help me understand the Power Query"

```
I have a Power Query in Excel that connects to our EV Team Tracker SharePoint list.
Here's the M Code:

[PASTE YOUR M CODE HERE]

Can you explain what each step does in simple terms?
```

### "Person fields showing [Record]"

```
In my Excel connection to the EV Team Tracker, the Designer and Field Tech columns 
are showing [Record] instead of the actual person's name.

How do I fix the Power Query to show the name instead?
```

### "Add a new column to Excel report"

```
I have a Power Query connection to our EV Team Tracker in Excel.
I want to add the [COLUMN NAME] column to my report.

The column's internal name in SharePoint is [INTERNAL NAME] (or I don't know it).

How do I modify my Power Query to include this column?
```

### "Calculate project duration"

```
I want to add a calculated column to my EV Team Tracker Excel report that shows 
the total number of days from ReceivedDate to DeliveredDate for each project.

How do I add this calculation in Power Query?
```

---

## Project Management

### "Project is stuck in a status"

```
I have an EV project that's been stuck in [STATUS] status for [NUMBER] days.

Current situation:
- Title/WO: [VALUE]
- Designer: [NAME]
- WaAM Status: [VALUE]
- Last activity: [DESCRIBE]

What steps should I take to move this project forward?
```

### "How do I handle a HOLD status?"

```
I need to put an EV project on hold in our tracker.

Current Status: [STATUS]
Reason for hold: [REASON - e.g., "waiting for customer" or "equipment delayed"]

Should I use WaAM Status (HOLD-E, HOLD-O, HOLD-A) or change the main Status?
What's the difference and which is appropriate for my situation?
```

---

## Quick Reference Prompts

### "Give me the internal field names"

```
I'm working with the EV Team Tracker SharePoint list and need to use field names 
in Power Automate. Can you help me find the internal name for [DISPLAY NAME]?

For reference, common internal names in this list are:
- Title = Title (Work Order Number)
- JobType = JobType
- Status = Status
- Designer = Designer
- Field Tech = FieldTech
- Oncor UD = OncorUD
- Customer = Customer
- CRD = CRD
- Received Date = ReceivedDate
- Delivered Date = DeliveredDate
- Canceled Date = CanceledDate
- PPD End = PPDEnd
- AEGIS Design End = AEGISDesignEnd
- AEGIS QA End = AEGISQAEnd
- Construction End Date = ConstructionEndDate
- WaAM Status = WaAMStatus
- Previous Status = PreviousStatus
```

### "Write a Power Automate expression"

```
I need a Power Automate expression for my EV Team Tracker flow that:
[DESCRIBE WHAT YOU NEED - e.g., "calculates how many days the project has been in the current status"]

The field internal name is [INTERNAL NAME].
Please give me the expression I can copy-paste into Power Automate.
```

### "Calculate days in status"

```
I need a Power Automate expression that calculates the number of days between 
when the status was last changed and today for our EV Team Tracker.

If we track this with a "Status Changed Date" field, what expression should I use?
```

---

## Tips for Better AI Responses

1. **Be specific** - Include the Work Order number, current status, and exact field names
2. **Provide context** - Mention it's for EV charging station infrastructure projects
3. **Include the JobType** - ONSITE, OFFSITE, or CAPBANK may have different workflows
4. **Mention WaAM** - If the project has a WaAM status, include it for context

---

**Last Updated:** February 19, 2026
