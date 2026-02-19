# Closing Tracker - Automation Guide

> **For users with limited Power Automate experience**
> 
> This guide explains what automated processes (called "flows") run behind the scenes on the Closing Tracker list. You don't need to understand the technical details - this guide helps you understand what happens automatically and when you need to take action.

---

## Table of Contents

1. [What is Power Automate?](#what-is-power-automate)
2. [Overview of Closing Tracker Automations](#overview-of-closing-tracker-automations)
3. [Flow 1: Status Change Tracker](#flow-1-status-change-tracker)
4. [Flow 2: Daily Status Calculator](#flow-2-daily-status-calculator)
5. [Flow 3: FCC & Storeroom Tracker](#flow-3-fcc--storeroom-tracker)
6. [Flow 4: Blocker Date Tracker](#flow-4-blocker-date-tracker)
7. [Flow 5: PC Upload Sync](#flow-5-pc-upload-sync)
8. [When Things Don't Work](#when-things-dont-work)
9. [Frequently Asked Questions](#frequently-asked-questions)

---

## What is Power Automate?

### The Simple Explanation

**Power Automate** is like having a helpful robot assistant that watches your Microsoft List and does certain tasks automatically. Instead of you having to remember to update dates or calculate numbers, these "flows" do it for you.

### How It Works

1. **Something happens** in your list (like changing a status)
2. **The flow notices** this change
3. **The flow takes action** (like updating a date field)
4. **You see the result** without having to do anything

### What You Need to Know

- Flows run in the background - you won't see them working
- Changes may take 1-5 minutes to appear
- If something doesn't update automatically, there may be a problem with the flow
- You don't need to do anything to make flows run - they work automatically

---

## Overview of Closing Tracker Automations

The Closing Tracker has **5 automated flows** that help manage your work:

| Flow Name | What It Does | When It Runs |
|-----------|--------------|--------------|
| **Status Change Tracker** | Updates the "Status Changed Date" and resets "Days In Status" when you change the STATUS field | Every time you change STATUS |
| **Daily Status Calculator** | Calculates how many days each work order has been in its current status and updates the SOX Timer | Every day at 6:00 AM |
| **FCC & Storeroom Tracker** | Records start and end dates for FCC and Storeroom communications | When you change FCC Status or Storeroom Status |
| **Blocker Date Tracker** | Records start and end dates for various blocker conditions | When you add or remove blockers |
| **PC Upload Sync** | Imports work orders from an Excel spreadsheet into the list | When you manually run it |

---

## Flow 1: Status Change Tracker

### What Does This Flow Do?

When you change the **STATUS** field on a work order, this flow automatically:

1. Sets **STATUS CHANGED DATE** to today's date and time
2. Resets **DAYS IN STATUS** to 0

### Why Is This Important?

- Tracks how long work orders stay in each status
- Helps identify work orders that are stuck
- Provides accurate data for SOX compliance reporting
- You don't have to remember to update these fields manually

### Example

**Before you change status:**
```
STATUS: Processing
STATUS CHANGED DATE: January 15, 2026
DAYS IN STATUS: 34
```

**After you change status to "QC Reviewing":**
```
STATUS: QC Reviewing
STATUS CHANGED DATE: February 18, 2026  ← Automatically updated!
DAYS IN STATUS: 0                        ← Automatically reset!
```

### What You Need to Do

- **Nothing!** Just change the STATUS field as normal
- Wait 1-2 minutes for the dates to update
- If it doesn't update, see [When Things Don't Work](#when-things-dont-work)

### Fields This Flow Updates

| Field | Internal Name | What Happens |
|-------|---------------|--------------|
| STATUS CHANGED DATE | `field_5` | Set to current date/time |
| DAYS IN STATUS | `field_4` | Reset to "0" |

---

## Flow 2: Daily Status Calculator

### What Does This Flow Do?

Every morning at **6:00 AM Central Time**, this flow looks at every open work order and calculates:

1. **DAYS IN STATUS** - How many days since the status last changed
2. **SOX TIMER** - How many days since the INSERVICE DATE

### Why Is This Important?

- Keeps your aging reports accurate
- Helps track SOX compliance
- Identifies work orders that need attention
- Updates all items automatically - no manual counting needed

### How the Calculations Work

**DAYS IN STATUS:**
```
Today's Date - STATUS CHANGED DATE = DAYS IN STATUS
```
Example: If today is Feb 18 and status changed on Feb 10, DAYS IN STATUS = 8

**SOX TIMER:**
```
Today's Date - INSERVICE DATE = SOX TIMER
```
Example: If today is Feb 18 and in-service was Jan 1, SOX TIMER = 48

### What You Need to Do

- **Nothing!** The flow runs automatically every morning
- Check your list after 6:00 AM to see updated numbers
- If numbers seem wrong, verify the STATUS CHANGED DATE and INSERVICE DATE fields are filled in

### Fields This Flow Updates

| Field | Internal Name | What Happens |
|-------|---------------|--------------|
| DAYS IN STATUS | `field_4` | Calculated from STATUS CHANGED DATE |
| SOX TIMER | `field_10` | Calculated from INSERVICE DATE |

### Important Notes

- Only updates items where STATUS is NOT "Completed"
- If STATUS CHANGED DATE is blank, DAYS IN STATUS shows 0
- If INSERVICE DATE is blank, SOX TIMER shows 0

---

## Flow 3: FCC & Storeroom Tracker

### What Does This Flow Do?

When you change the **Storeroom Status** or **FCC Status** fields, this flow automatically records when you started waiting for a response and when you received it.

### Storeroom Tracking

| When You Change To... | What Happens |
|----------------------|--------------|
| "Pending Storeroom Response" | **SR Start** is set to today (if empty) |
| "Storeroom Responded" | **SR End** is set to today (if SR Start exists and SR End is empty) |

### FCC Tracking

| When You Change To... | What Happens |
|----------------------|--------------|
| "Pending FCC Response" | **FCC Start** is set to today (if empty) |
| "FCC Responded" | **FCC End** is set to today (if FCC Start exists and FCC End is empty) |

### Why Is This Important?

- Tracks how long you wait for external responses
- Identifies bottlenecks in the closing process
- Provides data for performance reporting
- Documents communication timelines

### Example Workflow

**Step 1: You contact the storeroom**
1. Change **Storeroom Status** to "Pending Storeroom Response"
2. Flow automatically sets **SR Start** = February 18, 2026

**Step 2: Storeroom responds (5 days later)**
1. Change **Storeroom Status** to "Storeroom Responded"
2. Flow automatically sets **SR End** = February 23, 2026
3. You can now see: Storeroom took 5 days to respond

### Fields This Flow Updates

| Field | Internal Name | When Updated |
|-------|---------------|--------------|
| SR Start | `SRStart` | When Storeroom Status = "Pending Storeroom Response" |
| SR End | `SREnd` | When Storeroom Status = "Storeroom Responded" |
| FCC Start | `FCCStart` | When FCC Status = "Pending FCC Response" |
| FCC End | `FCCEnd` | When FCC Status = "FCC Responded" |

### What You Need to Do

- Change **Storeroom Status** when you contact the storeroom
- Change **FCC Status** when you contact FCC
- Change the status again when you receive a response
- The dates are recorded automatically!

---

## Flow 4: Blocker Date Tracker

### What Does This Flow Do?

This flow tracks when various blocker conditions start and end by recording dates automatically.

### ⚠️ IMPORTANT: Known Issue

**This flow is currently not working correctly.** The flow was built to look for blocker values that don't exist in the final list.

**What the flow looks for vs. what actually exists:**

| Flow Looks For | Actual BLOCKERS Options |
|----------------|------------------------|
| "Damaged Material" | ❌ Does not exist |
| "Escalated" | ❌ Does not exist |
| "Pending Variance Approval" | ❌ Does not exist |
| "Batch Failure" | ❌ Does not exist |
| "WFIMWC Hold" | ❌ Does not exist |
| "DASH Ticket Opened" | "Dash Required" (similar but different) |

**Actual BLOCKERS options in the list:**
- Request Force Close
- Request Field Audit
- Request to Cancel
- Request As-Built Var.
- Dash Required

### What This Means For You

- The blocker date tracking currently does **not work**
- You may need to manually fill in these date fields:
  - DM Start / DM End
  - Escalated Start / Escalated End
  - Variance Start / Variance End
  - BatchFailure Start / BatchFailure End
  - WFIMWC Start / WFIMWC End
  - DASH Start / DASH End

### What Needs to Happen

The flow needs to be updated to match the actual blocker values in the list, OR the list needs new blocker values added. Contact your SharePoint administrator to resolve this.

---

## Flow 5: PC Upload Sync

### What Does This Flow Do?

This flow imports work orders from an Excel spreadsheet into the Closing Tracker list. Unlike the other flows, this one is **manually triggered** - it only runs when someone clicks the Run button.

### How It Works

1. Someone clicks the "Run" button in Power Automate
2. The flow reads data from an Excel file called "Closing PM Tracker.xlsx"
3. For each row in Excel:
   - If the WO NUMBER doesn't exist in the list → Creates a new item
   - If the WO NUMBER already exists → Updates the existing item
4. Marks each Excel row as "Synced" with a timestamp

### What Data Gets Imported

| Excel Column | List Field | Notes |
|--------------|------------|-------|
| WO NUMBER | Title | Work order identifier |
| INSERVICE DATE | INSERVICE DATE | Date value |
| STATION COUNT | STATION COUNT | Number value |
| DESIGN GROUP | DESIGN GROUP | Must match list options exactly |
| INVOICE-TO | INVOICE-TO | Must match list options exactly |

### For New Items

When creating a new item, the flow also sets:
- **STATUS** = "Ready for Assignment"

### What You Need to Do

This flow is typically run by the Project Coordinator (PC) or administrator. If you need data imported from Excel:

1. Ensure your Excel data matches the expected format
2. Contact the PC to run the sync
3. Verify imported data in the list

### Important Notes

- Excel values for DESIGN GROUP and INVOICE-TO must exactly match the dropdown options in the list
- The Excel file location: `/WO Closing/Trackers/Closing PM Tracker.xlsx`
- The sync marks processed rows so they're not imported twice

---

## When Things Don't Work

### Signs That a Flow Isn't Working

| Symptom | Likely Cause |
|---------|--------------|
| DAYS IN STATUS doesn't reset when you change status | Status Change Tracker flow has a problem |
| DAYS IN STATUS and SOX TIMER don't update in the morning | Daily Calculator flow has a problem |
| SR Start/End or FCC Start/End dates not updating | FCC & Storeroom Tracker flow has a problem |
| Blocker dates never fill in | Blocker Date Tracker flow has known issues (see above) |

### What to Try First

1. **Wait 5 minutes** - Flows can take a few minutes to run
2. **Refresh the page** - Press F5 or click the refresh button
3. **Check your changes saved** - Open the item and verify your changes were saved
4. **Verify field values** - Make sure you selected exact values from dropdowns

### If It Still Doesn't Work

Contact your SharePoint administrator or Power Platform admin. They can:

1. Check if the flow is turned on
2. View the flow run history for errors
3. Fix any issues with the flow

### Information to Provide

When reporting a flow issue, include:
- Which work order (WO Number)
- What field you changed
- What you expected to happen
- What actually happened (or didn't happen)
- Date and time of your change

---

## Frequently Asked Questions

### General Questions

**Q: Do I need to do anything to make these flows work?**

A: No! The flows run automatically. Just use the list normally and the automations will do their job.

**Q: How do I know if a flow ran successfully?**

A: Look at the fields that should have been updated. If DAYS IN STATUS resets to 0 when you change status, the flow worked. If fields don't update as expected, there may be an issue.

**Q: Can I accidentally break a flow?**

A: No. Using the list normally won't break flows. Flows can only be changed by someone with admin access in Power Automate.

**Q: Do flows work on mobile/phone?**

A: Yes! Flows watch the SharePoint list, so it doesn't matter how you make changes - computer, phone, or tablet.

### Status & Days Questions

**Q: Why does DAYS IN STATUS sometimes show 0 when it shouldn't?**

A: This usually means STATUS CHANGED DATE is blank. The Daily Calculator can't calculate days without a start date. Make sure the Status Change Tracker is working.

**Q: The SOX TIMER shows a negative number. What's wrong?**

A: This happens if INSERVICE DATE is in the future. Check if the date was entered correctly.

**Q: My DAYS IN STATUS didn't reset when I changed status. Why?**

A: Possible causes:
- The flow took a minute to run (wait and refresh)
- The Status Change Tracker flow is turned off
- There was an error in the flow

### FCC & Storeroom Questions

**Q: I changed Storeroom Status but SR Start didn't fill in. Why?**

A: The flow only sets SR Start when:
- Storeroom Status is "Pending Storeroom Response"
- SR Start is currently empty

If SR Start already has a value, the flow won't overwrite it.

**Q: Can I manually change the SR/FCC dates?**

A: Yes. You can always manually edit any field. The flows just automate the common scenarios.

**Q: What if I contact the storeroom multiple times?**

A: The flow only records the first contact. For subsequent contacts, you'd need to clear SR End before changing status, or manually update dates.

### Excel Sync Questions

**Q: How often does the Excel sync run?**

A: It only runs when someone manually clicks the Run button. It's not automatic.

**Q: What happens if my Excel data doesn't match the dropdown options?**

A: The flow may fail or create items with blank dropdown values. Always verify your Excel data matches the list options exactly.

**Q: Can I delete items that were synced from Excel?**

A: Yes. Once items are in the list, they work like any other item.

---

## Flow Summary Table

| Flow Name | Trigger | Updates These Fields | Runs |
|-----------|---------|---------------------|------|
| Status Change Tracker | STATUS field changes | STATUS CHANGED DATE, DAYS IN STATUS | Within 1-2 minutes |
| Daily Status Calculator | 6:00 AM daily | DAYS IN STATUS, SOX TIMER | Once per day |
| FCC & Storeroom Tracker | Storeroom Status or FCC Status changes | SRStart, SREnd, FCCStart, FCCEnd | Within 1-2 minutes |
| Blocker Date Tracker | BLOCKERS field changes | Various Start/End dates | ⚠️ Currently not working |
| PC Upload Sync | Manual button click | Title, INSERVICE DATE, STATION COUNT, DESIGN GROUP, INVOICE-TO, STATUS | When manually run |

---

## Contact for Help

If you experience issues with any automated flows:

1. **First**: Check this guide to understand what should happen
2. **Second**: Wait a few minutes and refresh the page
3. **Third**: Contact your team lead to verify the expected behavior
4. **Fourth**: Contact your SharePoint/Power Platform administrator

---

## Related Documentation

- [Closing Tracker User Guide](guide) - Field definitions, views, and workflows
- [Closing Tracker Excel Info](excel-info) - Power Query M Code and Excel PM Tracker

---

**Last Updated:** February 19, 2026  
**Associated List:** Closing Tracker  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Closing Tracker/`
