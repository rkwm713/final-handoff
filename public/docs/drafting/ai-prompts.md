# Drafting Tracker - AI Prompts

> **Copy-paste these prompts into ChatGPT, Claude, or Copilot to get help with the Drafting Team Tracker**
> 
> Replace anything in `[brackets]` with your specific information.

---

## Understanding the List

### "Explain a field to me"

```
I'm working with a SharePoint list called "Drafting Team Tracker" for managing drafting work orders.
Can you explain what the [FIELD NAME] field is used for and when I should update it?

Context: This list tracks drafting requests for permits (TxDOT, City, County, Railroad, etc.), 
CAD maps, easement exhibits, and other mapping services from various utility clients.
```

### "What do these status options mean?"

```
In our Drafting Team Tracker SharePoint list, we have these STATUS options:
- Not Started
- In Progress
- On Hold
- Canceled
- Delivered
- Rework - Needed
- Rework - In Progress

Can you explain what each status means and when a work order should be in each status?
```

### "Explain the RULIS workflow"

```
Our Drafting Team Tracker has a RULIS Status field for TxDOT permit tracking with these options:
- Requestor Approval Pending
- Ready for RULIS
- Design Change Needed
- Design Updated
- In Progress
- Submitted
- Additional Info. Req.
- Info. Provided
- Approved
- N/A

Can you explain each RULIS status and the typical workflow for a TxDOT permit request?
```

---

## Troubleshooting

### "Why isn't my automation working?"

```
I have a Power Automate flow on my Drafting Team Tracker SharePoint list that should 
[DESCRIBE WHAT IT SHOULD DO - e.g., "automatically fill in the Start Date when I change Status to In Progress"].

But when I [DESCRIBE WHAT YOU DID], [DESCRIBE WHAT HAPPENED OR DIDN'T HAPPEN].

What could be causing this and how do I fix it?
```

### "High Priority isn't showing at top"

```
I marked a work order as High Priority in our Drafting Team Tracker, but it's not 
appearing at the top of my view.

Current values:
- High Priority: Yes
- High Priority Approved?: [Yes/No]
- Current view: [VIEW NAME]

Why isn't it at the top and how do I fix this?
```

### "EJT (Estimated Hours) showing error"

```
The EJT (EstHoursCalc) calculated field in our Drafting Team Tracker is showing #ERROR 
for a work order.

Current values:
- Request Type: [VALUE]
- # of Work Stations: [VALUE]

What's causing this error and how do I fix it?
```

---

## Making Changes

### "How do I add a new Request Type?"

```
I need to add a new Request Type called "[NEW TYPE NAME]" to our Drafting Team Tracker 
SharePoint list.

Can you give me step-by-step instructions for adding this new option?
Also, will I need to update the EJT (EstHoursCalc) formula to include hour calculations 
for this new type?
```

### "How do I add a new Client?"

```
I need to add a new client called "[CLIENT NAME]" to the Client dropdown in our 
Drafting Team Tracker SharePoint list.

Can you give me step-by-step instructions? The list currently has 35 clients.
```

### "How do I create a personal view?"

```
I want to create a personal view in our Drafting Team Tracker that shows only:
- Work orders assigned to me (Assigned Drafter = me)
- Status is NOT Delivered or Canceled
- Sorted by Need Date (soonest first)

Can you give me step-by-step instructions?
```

---

## Power Automate Flows

### "Explain the Date Stamps flow"

```
We have a Power Automate flow called "Date Stamps" on our Drafting Team Tracker that 
automatically fills in dates when status changes. Can you explain:

1. Which dates get filled automatically?
2. When does each date get filled?
3. What happens if I need to change a status back to a previous value?
```

### "Create a notification flow"

```
I want to create a Power Automate flow for our Drafting Team Tracker that:
- Triggers when: [DESCRIBE TRIGGER - e.g., "a new work order is created" or "Need Date is approaching"]
- Sends notification to: [WHO - e.g., "the Assigned Drafter" or "the Drafting PC"]
- Message should include: [WHAT INFO]

Can you give me step-by-step instructions?
```

### "Debug a failing flow"

```
Our Power Automate flow "[FLOW NAME]" on the Drafting Team Tracker is failing with this error:
[PASTE ERROR MESSAGE]

The flow is supposed to [DESCRIBE WHAT IT SHOULD DO].

What's causing this error and how do I fix it?
```

---

## Excel & Reporting

### "Help me understand the Power Query"

```
I have a Power Query in Excel that connects to our Drafting Team Tracker SharePoint list.
Here's the M Code:

[PASTE YOUR M CODE HERE]

Can you explain what each step does in simple terms?
```

### "Create a workload report"

```
I want to create an Excel report from our Drafting Team Tracker that shows:
- Work orders grouped by Assigned Drafter
- Only showing active work orders (not Delivered or Canceled)
- With total estimated hours (EJT) per drafter
- Sorted by Need Date

Can you help me create this using Power Query and Pivot Tables?
```

### "Add a person field to Excel"

```
I have a Power Query connection to our Drafting Team Tracker in Excel.
The person fields (Requestor, Your PM, Assigned Drafter) are showing as [Record] instead of names.

How do I expand these to show the actual person's name?
```

---

## Request Management

### "How do I handle a priority request?"

```
I received a high priority drafting request in our Drafting Team Tracker.

Current situation:
- Request Type: [TYPE]
- Need Date: [DATE]
- High Priority checked: Yes
- High Priority Reason: [REASON]

What's the proper workflow for handling this? Who needs to approve it?
```

### "Work order is overdue"

```
I have a work order in our Drafting Team Tracker where:
- Need Date: [PAST DATE]
- Status: [CURRENT STATUS]
- Assigned Drafter: [NAME or empty]

What steps should I take to address this overdue work order?
```

---

## Quick Reference Prompts

### "Give me the internal field names"

```
I'm working with the Drafting Team Tracker SharePoint list and need to use field names 
in Power Automate. Can you help me find the internal name for [DISPLAY NAME]?

For reference, common internal names in this list are:
- WO Number = Title
- WO Name = WOName
- Need Date = NeedDate
- Your PM = YourPM
- Your PC = YourPC
- # of Work Stations = WorkStations
- Request Type = RequestType
- Design Group = DesignGroup
- Assigned Drafter = AssignedDrafter
- High Priority = HighPriority
- EJT = EstHoursCalc
```

### "Write a Power Automate expression"

```
I need a Power Automate expression for my Drafting Team Tracker flow that:
[DESCRIBE WHAT YOU NEED - e.g., "calculates how many days until the Need Date"]

The field internal name is [INTERNAL NAME].
Please give me the expression I can copy-paste into Power Automate.
```

### "Calculate days until deadline"

```
I need a Power Automate expression that calculates the number of days between 
today and the Need Date (internal name: NeedDate) in our Drafting Team Tracker.

Should return a negative number if the deadline has passed.
```

---

## Tips for Better AI Responses

1. **Be specific** - Include exact field names, status values, and error messages
2. **Provide context** - Mention it's for drafting/permit requests for utility clients
3. **Include the Request Type** - Different request types may have different workflows
4. **Mention RULIS** - If it's a TxDOT permit, include the RULIS status

---

## Related Documentation

- [Project Overview](overview) - Complete workflow from request to completion
- [User Guide](guide) - Field definitions and list usage
- [Automation Guide](automation) - Power Automate flows
- [Excel Info](excel-info) - Power Query M Code and Excel PM Tracker

---

**Last Updated:** February 19, 2026
