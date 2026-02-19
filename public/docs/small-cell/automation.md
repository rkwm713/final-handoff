# Small Cell Team Tracker - Automation Guide

> **For users with limited Power Automate experience**
> 
> This guide explains what automated processes (called "flows") run behind the scenes on the Small Cell Team Tracker list. You don't need to understand the technical details - this guide helps you understand what happens automatically and when you need to take action.

---

## Table of Contents

1. [What is Power Automate?](#what-is-power-automate)
2. [Overview of Small Cell Tracker Automations](#overview-of-small-cell-tracker-automations)
3. [Flow 1: Status End Date Tracker](#flow-1-status-end-date-tracker)
4. [Complete Status → Date Field Reference](#complete-status--date-field-reference)
5. [When Things Don't Work](#when-things-dont-work)
6. [Frequently Asked Questions](#frequently-asked-questions)

---

## What is Power Automate?

### The Simple Explanation

**Power Automate** is like having a helpful robot assistant that watches your Microsoft List and does certain tasks automatically. Instead of you having to remember to record when you completed each stage, the "flow" does it for you.

### How It Works

1. **Something happens** in your list (like changing a status)
2. **The flow notices** this change
3. **The flow takes action** (like filling in an end date)
4. **You see the result** without having to do anything extra

### What You Need to Know

- Flows run in the background - you won't see them working
- Changes may take 1-5 minutes to appear
- If something doesn't update automatically, there may be a problem with the flow
- You don't need to do anything to make flows run - they work automatically

---

## Overview of Small Cell Tracker Automations

The Small Cell Team Tracker has **1 automated flow** that tracks project milestone completion:

| Flow Name | What It Does | When It Runs |
|-----------|--------------|--------------|
| **Status End Date Tracker** | Automatically records the date when you complete each project stage by filling in the corresponding "End Date" field | Every time you change the Status field |

---

## Flow 1: Status End Date Tracker

### What Does This Flow Do?

When you change the **Status** field, this flow automatically:

1. **Looks at what the Previous Status was** (what stage you just finished)
2. **Finds the matching End Date field** for that stage
3. **Fills in today's date** in that End Date field
4. **Updates the Previous Status field** to remember the current status for next time

### Why Is This Important?

- **Automatic milestone tracking** - Every time you complete a stage, the date is recorded
- **No manual date entry** - You don't have to remember to fill in End Date fields
- **Accurate timelines** - Dates are recorded exactly when changes happen
- **Performance analysis** - See how long projects spend in each stage

### How It Works - Simple Example

**Starting Point:**
```
Status: Katapult Design
Previous Status: Power Walk Needed
Katapult Design End Date: (empty)
```

**You change Status to "Katapult QA"**

**What the flow does:**
1. Sees that **Previous Status** was "Katapult Design" (the stage you just finished)
2. Finds the matching field: **Katapult Design End Date**
3. Sets **Katapult Design End Date** to today (February 18, 2026)
4. Updates **Previous Status** to "Katapult Design" (stores current for next time)

**Result:**
```
Status: Katapult QA
Previous Status: Katapult Design
Katapult Design End Date: February 18, 2026  ← Automatically filled!
```

### The Pattern

**When you move FROM a status TO a new status:**
- The "End Date" for the status you're LEAVING gets filled in
- The Previous Status gets updated to track what you left

Think of it as: "When I leave a stage, the flow stamps when I left."

---

## Complete Status → Date Field Reference

Here's exactly which date field gets filled when you leave each status:

### Design Workflow Stages

| When You LEAVE This Status | This End Date Gets Filled |
|---------------------------|---------------------------|
| Power Walk Needed | **Power Walk End Date** |
| Katapult Design | **Katapult Design End Date** |
| Katapult QA | **Katapult QA End Date** |
| Fault Current | **Fault Current End Date** |
| PC Review | **PC Review End Date** |
| AEGIS Design | **AEGIS Design End Date** |
| AEGIS QA | **AEGIS QA End Date** |
| Final PC Review | **Final PC Review End Date** |
| Complete | **Complete End Date** |

### Hold Stages

| When You LEAVE This Status | This End Date Gets Filled |
|---------------------------|---------------------------|
| Hold - Documents | **Hold - Documents End Date** |
| Hold - Permits | **Hold - Permits End Date** |
| Hold - External | **Hold - External End Date** |

### Stages Without End Date Fields

These statuses don't have corresponding End Date fields in the SharePoint schema:

| Status | Why No End Date Field | What To Do Instead |
|--------|----------------------|-------------------|
| **Pending External Review and Approval** | This is a waiting stage where timing depends on external parties | Track manually in notes, or use the next status's start as a proxy |
| **Delivered** | Project is delivered, not "leaving" a stage | Use the **Delivered Date** field directly |
| **Canceled** | Project is terminated | Use the **Canceled Date** field directly |

**Important:** When you leave "Pending External Review and Approval", the flow will update the Previous Status field, but no End Date will be automatically filled. If you need to track how long projects spend waiting for external approval, consider:
1. Adding a custom "External Review End Date" field to the list
2. Manually recording dates in a Notes field
3. Calculating duration using the previous PC Review End Date and the next AEGIS Design start

---

## Visual Workflow with Dates

Here's how a typical project flows, with dates being automatically recorded:

```
[Project Received]
         ↓
   Status: Power Walk Needed
   (No date recorded yet - this is the starting point)
         ↓
   [Field tech completes survey]
   [Status changed to Katapult Design]
         ↓
   Power Walk End Date = TODAY ← Automatic!
   Status: Katapult Design
   Previous Status: Power Walk Needed
         ↓
   [Designer completes Katapult work]
   [Status changed to Katapult QA]
         ↓
   Katapult Design End Date = TODAY ← Automatic!
   Status: Katapult QA
   Previous Status: Katapult Design
         ↓
   ... and so on for each stage ...
```

Every time you change status, the "End Date" for the stage you're leaving gets filled in.

---

## Real-World Examples

### Example 1: Normal Workflow Progression

**Scenario:** You finished the Fault Current analysis and are ready for PC Review.

**Before:**
```
Status: Fault Current
Previous Status: Katapult QA
Fault Current End Date: (empty)
PC Review End Date: (empty)
```

**You change Status to "PC Review"**

**After (automatic):**
```
Status: PC Review
Previous Status: Fault Current
Fault Current End Date: February 18, 2026  ← Filled automatically!
PC Review End Date: (empty)  ← Not filled until you LEAVE PC Review
```

### Example 2: Putting a Project on Hold

**Scenario:** You need to pause for missing permits.

**Before:**
```
Status: AEGIS Design
Previous Status: PC Review
Hold - Permits End Date: (empty)
```

**You change Status to "Hold - Permits"**

**After (automatic):**
```
Status: Hold - Permits
Previous Status: AEGIS Design
AEGIS Design End Date: February 18, 2026  ← Records when AEGIS work paused!
```

### Example 3: Resuming from Hold

**Scenario:** Permits came through, resuming AEGIS work.

**Before:**
```
Status: Hold - Permits
Previous Status: AEGIS Design
Hold - Permits End Date: (empty)
```

**You change Status back to "AEGIS Design"**

**After (automatic):**
```
Status: AEGIS Design
Previous Status: Hold - Permits
Hold - Permits End Date: February 25, 2026  ← Records when hold ended!
```

Now you can see: Project was on permit hold from Feb 18 to Feb 25 (7 days).

### Example 4: Project Completed

**Scenario:** Final PC Review is done, marking as Complete.

**Before:**
```
Status: Final PC Review
Previous Status: AEGIS QA
Complete End Date: (empty)
```

**You change Status to "Complete"**

**After (automatic):**
```
Status: Complete
Previous Status: Final PC Review
Final PC Review End Date: February 18, 2026  ← Records review completion!
```

---

## Fields This Flow Updates

### End Date Fields

| Field Name | Internal Name |
|-----------|---------------|
| Power Walk End Date | `PowerWalkEndDate` |
| Katapult Design End Date | `KatapultDesignEndDate` |
| Katapult QA End Date | `KatapultQAEndDate` |
| Fault Current End Date | `FaultCurrentEndDate` |
| PC Review End Date | `PCReviewEndDate` |
| AEGIS Design End Date | `AEGISDesignEndDate` |
| AEGIS QA End Date | `AEGISQAEndDate` |
| Final PC Review End Date | `FinalPCReviewEndDate` |
| Complete End Date | `CompleteEndDate` |
| Hold - Documents End Date | `HoldDocumentsEndDate` |
| Hold - Permits End Date | `HoldPermitsEndDate` |
| Hold - External End Date | `HoldExternalEndDate` |

### Tracking Field

| Field Name | Internal Name | Purpose |
|-----------|---------------|---------|
| Previous Status | `PreviousStatus` | Remembers what status you just left |

---

## When Things Don't Work

### Signs That the Flow Isn't Working

| Symptom | Likely Cause |
|---------|--------------|
| End Date fields aren't filling in when you change status | Flow has a problem |
| Previous Status isn't updating | Flow has a problem |
| Wrong End Date field was filled | Previous Status might have been incorrect |
| Date shows as incorrect day | Flow ran but there may be timezone issues |

### What to Try First

1. **Wait 3-5 minutes** - The flow needs time to detect changes and run
2. **Refresh the page** - Press F5 or click the refresh button
3. **Check your changes saved** - Reopen the item to verify Status actually changed
4. **Verify Previous Status** - Was it set correctly before your change?

### Common Issues

**Issue: End Date didn't fill in**

Possible causes:
- The flow didn't detect the change (wait and refresh)
- Previous Status was blank or incorrect
- The flow is turned off
- There's no matching End Date field for that status

**Issue: Wrong End Date filled in**

This happens when Previous Status doesn't match what you expected. The flow fills in the End Date that matches whatever is in Previous Status.

**Issue: Previous Status is blank**

If Previous Status was never set (old project or imported data), the flow won't know which End Date to fill. You may need to:
1. Manually fill in the End Date
2. Set Previous Status to the correct value for future changes

### Workaround: Manual Entry

If the flow doesn't run, you can always manually fill in:
- The appropriate End Date field
- The Previous Status field

This keeps your records accurate while the flow issue is being fixed.

### Information to Provide When Reporting Issues

When contacting your admin:
- Which work order (WO Number / Title)
- What status you changed FROM and TO
- What the Previous Status field showed
- Which End Date field you expected to be filled
- Date and time of your change

---

## Frequently Asked Questions

### General Questions

**Q: Do I need to do anything to make the flow work?**

A: No! Just change the Status field as you normally would. The flow runs automatically.

**Q: How long does it take for dates to update?**

A: Usually 1-3 minutes. If you don't see changes after 5 minutes, there may be an issue.

**Q: Does the flow run for every status change?**

A: Yes, every time you change and save the Status field, the flow runs.

**Q: What if I change status multiple times in one day?**

A: Each change triggers the flow. If you move through 3 statuses in one day, you'll have 3 End Dates all set to today.

### End Date Questions

**Q: An End Date got filled with the wrong date. Can I fix it?**

A: Yes, just click on the item and manually edit the End Date field. Your changes will save normally.

**Q: The End Date shows yesterday but I changed status today. Why?**

A: This can happen due to timezone differences. The flow uses UTC time, which may differ from your local time. If the difference is only 1 day, this is likely the cause.

**Q: What if I need an End Date for a status that doesn't have one?**

A: Some statuses (like "Pending External Review and Approval") don't have End Date fields. If you need this tracking:
1. Ask your admin to add the field
2. Or track it manually in a Notes field
3. Or update Delivered Date/Canceled Date as appropriate

**Q: Can the same End Date be filled more than once?**

A: Yes. If you leave and return to a status multiple times, each time you leave it, the End Date gets overwritten with the new date. Only the most recent "leaving" date is kept.

### Previous Status Questions

**Q: Why does Previous Status matter?**

A: The flow uses Previous Status to know which End Date to fill. If Previous Status says "Katapult Design," the flow will fill in Katapult Design End Date.

**Q: Previous Status is wrong. Should I fix it?**

A: You can, but be aware:
- The next time you change status, the flow will use whatever Previous Status shows
- If Previous Status is wrong, the wrong End Date field might get filled

**Q: What if Previous Status is blank on an old project?**

A: This is common for projects created before the flow existed. You should:
1. Manually fill in any missing End Dates based on your records
2. Set Previous Status to the current Status before making changes
3. Future status changes will then work correctly

### Hold Status Questions

**Q: How do I see how long a project was on hold?**

A: Look at:
- **When the hold started:** The End Date of the status BEFORE the hold (e.g., AEGIS Design End Date shows when you paused for the hold)
- **When the hold ended:** The Hold End Date (e.g., Hold - Permits End Date)

**Q: What if a project goes on hold multiple times?**

A: Each hold overwrites the previous dates. Only the most recent hold period is captured in the End Date fields. For detailed hold history, you may need to track manually.

**Q: Should I change status to "Hold" or just leave it in the current status?**

A: Best practice is to change to the appropriate Hold status:
- This records when you paused
- Makes it clear the project is on hold
- Records when you resumed

---

## Flow Summary

| Aspect | Details |
|--------|---------|
| **Flow Name** | Status End Date Tracker |
| **Trigger** | When Status field changes |
| **What It Does** | Fills in the End Date for the Previous Status |
| **Fields Updated** | Various End Date fields + Previous Status |
| **Timing** | Runs within 1-3 minutes of status change |

---

## Status Lifecycle and End Date Fields

### Main Workflow Statuses

When you **leave** a status (change to a different status), the corresponding End Date field is automatically filled with today's date.

| Order | Status | End Date Field Filled When Leaving |
|-------|--------|-----------------------------------|
| 1 | Power Walk Needed | `PowerWalkEndDate` |
| 2 | Katapult Design | `KatapultDesignEndDate` |
| 3 | Katapult QA | `KatapultQAEndDate` |
| 4 | Fault Current | `FaultCurrentEndDate` |
| 5 | PC Review | `PCReviewEndDate` |
| 6 | Pending External Review and Approval | `PendExternalEndDate` |
| 7 | AEGIS Design | `AEGISDesignEndDate` |
| 8 | AEGIS QA | `AEGISQAEndDate` |
| 9 | Final PC Review | `FinalPCReviewEndDate` |
| 10 | Delivered | Uses `DeliveredDate` field |
| 11 | Complete | `CompleteEndDate` |

### Hold Statuses

Hold statuses can occur from any stage. When you leave a hold status, its End Date is recorded.

| Hold Status | End Date Field |
|-------------|----------------|
| Hold - Documents | `HoldDocumentsEndDate` |
| Hold - Permits | `HoldPermitsEndDate` |
| Hold - External | `HoldExternalEndDate` |

### Special Statuses

| Status | Date Field | Notes |
|--------|------------|-------|
| Canceled | `CanceledDate` | Uses existing date field, not End Date pattern |
| Delivered | `DeliveredDate` | Uses existing date field, not End Date pattern |

---

## Benefits of This Automation

### For Individual Users

- ✅ Don't have to remember to fill in End Dates
- ✅ Dates are always accurate (recorded when change happens)
- ✅ Less manual data entry
- ✅ Focus on your work, not tracking dates

### For Managers

- ✅ Complete timeline of project progression
- ✅ See how long each stage takes
- ✅ Identify bottlenecks in the workflow
- ✅ Consistent data for reporting

### For Reporting

- ✅ Automated milestone tracking
- ✅ Can calculate time in each stage
- ✅ Historical data for analysis
- ✅ Reliable audit trail

---

## Contact for Help

If you experience issues with the Status End Date Tracker flow:

1. **First**: Check this guide to understand what should happen
2. **Second**: Wait a few minutes and refresh the page
3. **Third**: Verify Previous Status was set correctly
4. **Fourth**: Contact your SharePoint/Power Platform administrator

---

## Related Documentation

- [Project Overview](overview) - Complete end-to-end workflow from intake to completion
- [User Guide](guide) - Field definitions, views, and workflows
- [Excel Info](excel-info) - Power Query M Code, SPIDA integration, and Excel PM Tracker
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistance

---

**Last Updated:** February 19, 2026  
**Associated List:** Small Cell Team Tracker  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Small Cell Team Tracker/`
