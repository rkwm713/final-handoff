# Drafting Team Tracker - Automation Guide

> **For users with limited Power Automate experience**
> 
> This guide explains what automated processes (called "flows") run behind the scenes on the Drafting Team Tracker list. You don't need to understand the technical details - this guide helps you understand what happens automatically and when you need to take action.

---

## Table of Contents

1. [What is Power Automate?](#what-is-power-automate)
2. [Overview of Drafting Tracker Automations](#overview-of-drafting-tracker-automations)
3. [Flow 1: Date Stamps](#flow-1-date-stamps)
4. [Flow 2: RULIS Additional Info Alert](#flow-2-rulis-additional-info-alert)
5. [When Things Don't Work](#when-things-dont-work)
6. [Frequently Asked Questions](#frequently-asked-questions)

---

## What is Power Automate?

### The Simple Explanation

**Power Automate** is like having a helpful robot assistant that watches your Microsoft List and does certain tasks automatically. Instead of you having to remember to update dates or send notifications, these "flows" do it for you.

### How It Works

1. **Something happens** in your list (like changing a status)
2. **The flow notices** this change
3. **The flow takes action** (like updating a date or sending a message)
4. **You see the result** without having to do anything extra

### What You Need to Know

- Flows run in the background - you won't see them working
- Changes may take 1-5 minutes to appear
- If something doesn't update automatically, there may be a problem with the flow
- You don't need to do anything to make flows run - they work automatically

---

## Overview of Drafting Tracker Automations

The Drafting Team Tracker has **2 automated flows** that help manage your work:

| Flow Name | What It Does | When It Runs |
|-----------|--------------|--------------|
| **Date Stamps** | Automatically fills in date fields when you change Status or RULIS Status | Every time you change Status or RULIS Status |
| **RULIS Additional Info Alert** | Sends a Teams message to the requestor when RULIS needs more information | When RULIS Status changes to "Additional Info. Req." |

---

## Flow 1: Date Stamps

### What Does This Flow Do?

When you change certain fields, this flow automatically fills in the corresponding date field. Think of it as a timestamp that records when things happened.

### Status Changes and Date Stamps

| When You Change Status To... | This Date Gets Filled In |
|------------------------------|--------------------------|
| "In Progress" | **Start Date** (if empty) |
| "Delivered" | **Delivered Date** (if empty) |
| "On Hold" | **Hold Start Date** (if empty) |
| (Any status except "On Hold") | **Hold End Date** (if Hold Start Date exists and Hold End Date is empty) |
| "Canceled" | **Canceled Date** (if empty) |

### RULIS Status Changes

| When You Change RULIS Status To... | This Date Gets Filled In |
|-----------------------------------|--------------------------|
| "Submitted" | **RULIS Submission Date** (if empty) |

### Why Is This Important?

- **Tracks timelines automatically** - You don't have to remember to enter dates
- **Maintains accurate records** - Dates are recorded exactly when changes happen
- **Supports reporting** - Makes it easy to see how long work orders take
- **Reduces errors** - No more forgetting to fill in a date field

### Example: Starting Work on a Job

**Before:**
```
Status: Not Started
Start Date: (empty)
```

**You change Status to "In Progress"**

**After (automatically):**
```
Status: In Progress
Start Date: February 18, 2026  ← Filled in automatically!
```

### Example: Putting a Job On Hold and Resuming

**Step 1: Putting on hold**
```
Status: On Hold
Hold Start Date: February 10, 2026  ← Filled in automatically!
Hold End Date: (empty)
```

**Step 2: Resuming work (changing status to "In Progress")**
```
Status: In Progress
Hold Start Date: February 10, 2026
Hold End Date: February 18, 2026  ← Filled in automatically!
```

Now you can see the job was on hold for 8 days!

### Fields This Flow Updates

| Field | Internal Name | Triggered By |
|-------|---------------|--------------|
| Start Date | `StartDate` | Status = "In Progress" |
| Delivered Date | `DeliveredDate` | Status = "Delivered" |
| Hold Start Date | `HoldStartDate` | Status = "On Hold" |
| Hold End Date | `HoldEndDate` | Status changes FROM "On Hold" |
| Canceled Date | `CanceledDate` | Status = "Canceled" |
| RULIS Submission Date | `RULISSubmissionDate` | RULIS Status = "Submitted" |

### What You Need to Do

- **Just change the Status field normally** - dates fill in automatically
- Wait 1-2 minutes if the date doesn't appear immediately
- If a date field already has a value, the flow won't overwrite it

### Important Notes

- **Dates only fill in if the field is empty** - This prevents accidentally overwriting important dates
- **The flow runs every time you save** - If you change Status multiple times quickly, dates are recorded for the first change
- **You can still manually edit dates** - If you need to correct a date, just edit the field directly

---

## Flow 2: RULIS Additional Info Alert

### What Does This Flow Do?

When the **RULIS Status** is changed to "Additional Info. Req." (meaning the TxDOT reviewer needs more information), this flow:

1. Sends a **Microsoft Teams message** to the original **Requestor**
2. Tells them what additional information is needed
3. Includes the WO Number for easy reference

### Why Is This Important?

- **Immediate notification** - Requestor finds out right away instead of waiting for an email
- **No manual follow-up needed** - You don't have to remember to contact the requestor
- **Includes details** - The message shows what information is needed
- **Creates a paper trail** - The Teams message serves as documentation

### What the Requestor Sees

When the flow runs, the requestor receives a Teams message like this:

```
⚠️ RULIS Additional Info Needed

WO: 12345-67890

The RULIS reviewer has requested additional information:

Please provide the parcel dimensions and ownership documentation
for the easement crossing at Station 15+00.

Please provide the requested information via the MS List and 
update the RULIS Status to 'Info. Provided' when ready.
```

### How to Trigger This Flow

**Step 1:** Fill in the **RULIS Additional Info Req.** field with what information is needed

**Step 2:** Change **RULIS Status** to "Additional Info. Req."

**Step 3:** Save the item

**Result:** The requestor receives a Teams message within 5 minutes

### What You Need to Do

1. **Before changing RULIS Status**: Fill in the "RULIS Additional Info Req." field explaining what's needed
2. **Change RULIS Status** to "Additional Info. Req."
3. **Save the item**
4. The requestor will be notified automatically!

### What the Requestor Should Do

When they receive the notification:
1. Review what information is needed
2. Gather the requested information
3. Update the work order in the list (or provide documents)
4. Change **RULIS Status** to "Info. Provided"

### Important Notes

- **The flow uses the Requestor's email** - Make sure the Requestor field has the correct person
- **The message includes your notes** - Whatever you put in "RULIS Additional Info Req." is sent to them
- **Works for TxDOT permits** - This flow is specifically for the RULIS workflow

---

## When Things Don't Work

### Signs That a Flow Isn't Working

| Symptom | Likely Cause |
|---------|--------------|
| Start Date doesn't fill in when changing to "In Progress" | Date Stamps flow has a problem |
| Dates not filling in for any status change | Date Stamps flow may be turned off |
| Requestor didn't receive Teams message | RULIS Alert flow has a problem, or Requestor email is wrong |
| Hold End Date didn't fill in when resuming | Hold Start Date might be empty, or there was a flow error |

### What to Try First

1. **Wait 5 minutes** - Flows can take a few minutes to run
2. **Refresh the page** - Press F5 or click the refresh button
3. **Check your changes saved** - Open the item and verify your changes were saved
4. **Verify the field was empty** - Dates only auto-fill if the field was blank

### For RULIS Alert Issues

1. **Check the Requestor field** - Is the correct person selected?
2. **Verify the email address** - The person needs a valid email for Teams
3. **Check the RULIS Additional Info Req. field** - Did you fill in what's needed?
4. **Ask the requestor to check Teams** - Messages might be in their Activity feed

### If It Still Doesn't Work

Contact your SharePoint administrator or Power Platform admin. They can:

1. Check if the flow is turned on
2. View the flow run history for errors
3. Fix any issues with the flow

### Information to Provide When Reporting Issues

- Which work order (WO Number)
- What field you changed
- What you expected to happen
- What actually happened (or didn't happen)
- Date and time of your change

---

## Frequently Asked Questions

### Date Stamps Questions

**Q: I changed Status to "In Progress" but Start Date didn't fill in. Why?**

A: Check if Start Date already had a value. The flow only fills in dates that are empty - it won't overwrite existing dates.

**Q: Can I manually change the dates that were auto-filled?**

A: Yes! You can always edit any field manually. The flows just automate the initial entry.

**Q: What if I accidentally set the wrong status?**

A: If you change to "In Progress" and Start Date fills in, then realize you made a mistake:
1. Change Status back to what it should be
2. Manually clear the Start Date if needed
3. The flow won't run again for that field since it's no longer empty

**Q: Hold End Date didn't fill in when I resumed work. Why?**

A: Hold End Date only fills in if:
- Hold Start Date has a value (you previously put it on hold)
- Hold End Date is currently empty
- You're changing FROM "On Hold" to something else

If Hold Start Date was empty, there's nothing to "end."

**Q: The Delivered Date is wrong. Can I fix it?**

A: Yes, just click on the item and edit the Delivered Date field directly. Your manual changes will be saved.

### RULIS Alert Questions

**Q: The requestor says they never got the Teams message. What happened?**

A: Check these things:
1. Is the **Requestor** field filled in with the correct person?
2. Does that person have Microsoft Teams?
3. Did you change RULIS Status to exactly "Additional Info. Req."?
4. Ask them to check their Teams Activity feed (not just chat)

**Q: Can I send another notification if they didn't respond?**

A: The flow only runs when RULIS Status changes TO "Additional Info. Req." If you need to re-notify:
1. Change RULIS Status to something else (like "In Progress")
2. Change it back to "Additional Info. Req."
3. This will trigger a new notification

Or simply message them directly in Teams.

**Q: What if I need to notify someone other than the Requestor?**

A: This flow only notifies the Requestor. For other people, you'll need to contact them manually through Teams or email.

**Q: The message didn't include my notes. Why?**

A: Make sure you filled in the "RULIS Additional Info Req." field BEFORE changing the status. If you change status first and then add notes, the message won't include them.

### General Questions

**Q: Do these flows work when I use the list on my phone?**

A: Yes! Flows watch the SharePoint list, so it doesn't matter how you make changes - computer, phone, tablet, or the Microsoft Lists app.

**Q: Can I accidentally break a flow?**

A: No. Using the list normally won't break flows. Flows can only be changed by someone with admin access in Power Automate.

**Q: How do I know if a flow ran successfully?**

A: Look at the results:
- For Date Stamps: Check if the date field was filled in
- For RULIS Alert: Ask the requestor if they received the Teams message

---

## Flow Summary Table

| Flow Name | Trigger | What It Does | Timing |
|-----------|---------|--------------|--------|
| Date Stamps | Status or RULIS Status changes | Fills in date fields automatically | 1-2 minutes |
| RULIS Additional Info Alert | RULIS Status = "Additional Info. Req." | Sends Teams message to Requestor | Up to 5 minutes |

---

## Status → Date Field Quick Reference

Keep this handy to know which dates fill in automatically:

| When Status Changes To | This Date Fills In |
|-----------------------|-------------------|
| In Progress | Start Date |
| On Hold | Hold Start Date |
| (From On Hold to anything else) | Hold End Date |
| Delivered | Delivered Date |
| Canceled | Canceled Date |

| When RULIS Status Changes To | This Date Fills In |
|-----------------------------|-------------------|
| Submitted | RULIS Submission Date |

---

## Contact for Help

If you experience issues with any automated flows:

1. **First**: Check this guide to understand what should happen
2. **Second**: Wait a few minutes and refresh the page
3. **Third**: Contact the Drafting PC (aoropeza@techserv.com)
4. **Fourth**: Contact your SharePoint/Power Platform administrator

---

## Related Documentation

- [Project Overview](overview) - Complete workflow from request to completion
- [User Guide](guide) - Field definitions, views, and workflows
- [Excel Info](excel-info) - Power Query M Code and Excel PM Tracker
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistants

---

**Last Updated:** February 19, 2026  
**Associated List:** Drafting Team Tracker  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/DraftingTeamTracker`
