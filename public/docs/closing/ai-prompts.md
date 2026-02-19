# Closing Tracker - AI Prompts

> **Copy-paste these prompts into ChatGPT, Claude, or Copilot to get help with the Closing Tracker**
> 
> Replace anything in `[brackets]` with your specific information.

---

## Understanding the List

### "Explain a field to me"

```
I'm working with a SharePoint list called "Closing Tracker" for tracking work order closing. 
Can you explain what the [FIELD NAME] field is used for and when I should update it?

Context: This list tracks as-built documentation, batch processing, external communications 
with storerooms and FCCs, and final WIMS closing for utility work orders.
```

### "What do these status options mean?"

```
In our Closing Tracker SharePoint list, we have these STATUS options:
- Ready for Assignment
- Processing
- QC Reviewing
- Finalizing
- Closed
- Completed

Can you explain what each status means and when I should move a work order to each status?
```

### "Explain the checkpoint workflow"

```
Our Closing Tracker has a CHECKPOINT field with these options:
- Initial Review
- Awaiting External Response
- As-Built Production
- Pre-Batch
- Batch Queued
- Batch Failed (Retry Needed)
- Auditing

Can you explain each checkpoint and the typical order a work order moves through them?
```

---

## Troubleshooting

### "Why isn't my automation working?"

```
I have a Power Automate flow on my Closing Tracker SharePoint list that should 
[DESCRIBE WHAT IT SHOULD DO - e.g., "update the DAYS IN STATUS field when I change the STATUS"].

But when I [DESCRIBE WHAT YOU DID], [DESCRIBE WHAT HAPPENED OR DIDN'T HAPPEN].

What could be causing this and how do I fix it?
```

### "SOX Timer questions"

```
In our Closing Tracker, we have a SOX TIMER field for Sarbanes-Oxley compliance tracking.
[ASK YOUR SPECIFIC QUESTION - e.g., "What happens when it exceeds 30 days?" or 
"How is it calculated?" or "What should I do if it's getting too high?"]
```

### "Work order is stuck"

```
I have a work order in our Closing Tracker that's been stuck in [STATUS] status 
for [NUMBER] days. The CHECKPOINT is [CHECKPOINT] and the BLOCKER field shows [BLOCKER VALUE].

What steps should I take to get this work order moving again?
```

---

## Making Changes

### "How do I add a new status option?"

```
I need to add a new status option called "[NEW STATUS NAME]" to our Closing Tracker 
SharePoint list. The STATUS field is a Choice column.

Can you give me step-by-step instructions for adding this new option, and tell me 
what other things I might need to update (like calculated fields or Power Automate flows)?
```

### "How do I create a filtered view?"

```
I want to create a new view in our Closing Tracker SharePoint list that shows only:
- [DESCRIBE YOUR FILTER - e.g., "work orders assigned to me" or "items with STATUS = Processing"]
- Sorted by [FIELD NAME]
- Showing these columns: [LIST COLUMNS]

Can you give me step-by-step instructions?
```

### "How do I bulk update items?"

```
I need to update [NUMBER] work orders in our Closing Tracker SharePoint list. 
I want to change [FIELD NAME] from [OLD VALUE] to [NEW VALUE] for all items where [CONDITION].

What's the safest and fastest way to do this? I have access to:
- SharePoint list UI
- Power Automate
- Excel/Quick Edit view
```

---

## Power Automate Flows

### "Explain how a flow works"

```
We have a Power Automate flow called "[FLOW NAME]" that runs on our Closing Tracker 
SharePoint list. It triggers when [TRIGGER CONDITION].

Can you explain in simple terms what this flow does and why it's important?
```

### "Debug a failing flow"

```
Our Power Automate flow "[FLOW NAME]" is failing with this error:
[PASTE ERROR MESSAGE]

The flow is supposed to [DESCRIBE WHAT IT SHOULD DO].
It triggers when [DESCRIBE TRIGGER].

What's causing this error and how do I fix it?
```

### "Create a new automation"

```
I want to create a Power Automate flow for our Closing Tracker SharePoint list that:
- Triggers when: [DESCRIBE TRIGGER - e.g., "STATUS changes to Closed"]
- Does this: [DESCRIBE ACTION - e.g., "sends an email to the closer's manager"]

Can you give me step-by-step instructions for creating this flow?
Include the specific SharePoint field internal names I should use.
```

---

## Excel & Reporting

### "Help me understand the Power Query"

```
I have a Power Query in Excel that connects to our Closing Tracker SharePoint list.
Here's the M Code:

[PASTE YOUR M CODE HERE]

Can you explain what each step does in simple terms?
```

### "Add a column to my Excel report"

```
I have a Power Query connection to our Closing Tracker SharePoint list in Excel.
I want to add the [COLUMN NAME] column to my report, but it's not showing up.

The column exists in SharePoint with internal name [INTERNAL NAME] (or I don't know the internal name).

How do I add this column to my Power Query?
```

### "Excel refresh is failing"

```
When I try to refresh my Excel connection to the Closing Tracker SharePoint list, 
I get this error:
[PASTE ERROR MESSAGE]

What's causing this and how do I fix it?
```

---

## External Communications

### "Storeroom/FCC tracking questions"

```
In our Closing Tracker, we track communications with storerooms and FCCs using these fields:
- EXT CONTACT STATUS
- Storeroom Status (with SR Start/SR End dates)
- FCC Status (with FCC Start/FCC End dates)

[ASK YOUR SPECIFIC QUESTION - e.g., "When should I change the status to Pending Response?" 
or "What happens if I need to contact them multiple times?"]
```

---

## Quick Reference Prompts

### "Give me the internal field names"

```
I'm working with the Closing Tracker SharePoint list and need to use field names 
in Power Automate. Can you help me find the internal name for [DISPLAY NAME]?

For reference, common internal names in this list are:
- CLOSER = field_1
- DAYS IN STATUS = field_4
- STATUS CHANGED DATE = field_5
- STATION COUNT = field_7
- INSERVICE DATE = field_9
- SOX TIMER = field_10
```

### "Write a Power Automate expression"

```
I need a Power Automate expression for my Closing Tracker flow that:
[DESCRIBE WHAT YOU NEED - e.g., "calculates the number of days between today and the STATUS CHANGED DATE"]

The field internal name is [INTERNAL NAME].
Please give me the expression I can copy-paste into Power Automate.
```

---

## Tips for Better AI Responses

1. **Be specific** - Include exact field names, status values, and error messages
2. **Provide context** - Mention it's a SharePoint list for utility work order closing
3. **Include examples** - Share sample data or scenarios when possible
4. **Ask follow-ups** - If the answer isn't clear, ask for clarification or step-by-step instructions

---

**Last Updated:** February 19, 2026
