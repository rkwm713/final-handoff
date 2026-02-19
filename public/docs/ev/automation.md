# EV Team Tracker - Automation Guide

> **For users with limited Power Automate experience**
> 
> This guide explains what automated processes (called "flows") run behind the scenes on the EV Team Tracker list. You don't need to understand the technical details - this guide helps you understand what happens automatically and when you need to take action.

---

## Table of Contents

1. [What is Power Automate?](#what-is-power-automate)
2. [Overview of EV Tracker Automations](#overview-of-ev-tracker-automations)
3. [Flow 1: Status Change Logger](#flow-1-status-change-logger)
4. [Understanding the Excel Log](#understanding-the-excel-log)
5. [When Things Don't Work](#when-things-dont-work)
6. [Frequently Asked Questions](#frequently-asked-questions)

---

## What is Power Automate?

### The Simple Explanation

**Power Automate** is like having a helpful robot assistant that watches your Microsoft List and does certain tasks automatically. Instead of you having to remember to record status changes or calculate durations, the "flow" does it for you.

### How It Works

1. **Something happens** in your list (like changing a status)
2. **The flow notices** this change
3. **The flow takes action** (like recording the change in Excel)
4. **You see the result** without having to do anything extra

### What You Need to Know

- Flows run in the background - you won't see them working
- Changes may take 1-5 minutes to appear
- If something doesn't update automatically, there may be a problem with the flow
- You don't need to do anything to make flows run - they work automatically

---

## Overview of EV Tracker Automations

The EV Team Tracker has **1 automated flow** that tracks project progress:

| Flow Name | What It Does | When It Runs |
|-----------|--------------|--------------|
| **Status Change Logger** | Records every status change to an Excel file, calculates how long projects spent in each status, and updates tracking fields | Every time you change the Status field |

---

## Flow 1: Status Change Logger

### What Does This Flow Do?

This is a comprehensive tracking flow that does THREE things every time you change the **Status** field:

1. **Records the change in Excel** - Adds a row to a history log
2. **Calculates duration** - Figures out how many days the project was in the previous status
3. **Updates tracking fields** - Sets Previous Status and Status Changed Date in the list

### Why Is This Important?

- **Complete history** - Every status change is recorded, so you can see the full journey of a project
- **Performance tracking** - Know exactly how long projects spend in each status
- **Automatic calculation** - No manual counting of days required
- **Audit trail** - Have documentation for any questions about project timelines

### What Happens Step by Step

**Step 1: You Change the Status**
```
Before: Status = "Katapult Design"
After:  Status = "Katapult QA"
```

**Step 2: Flow Calculates Duration**
```
Previous Status: Katapult Design
Status Changed Date: January 20, 2026
Today: February 18, 2026
Duration: 29 days in "Katapult Design"
```

**Step 3: Flow Records to Excel**
A new row is added to the Excel log:
```
WO Number: 12345-67890
Project Name: Main St Charger Station
Previous Status: Katapult Design
New Status: Katapult QA
Days in Previous Status: 29
Changed Date: February 18, 2026
```

**Step 4: Flow Updates the List Item**
```
Previous Status: Katapult Design  ← Updated!
Status Changed Date: February 18, 2026  ← Updated!
```

### Fields This Flow Updates in the List

| Field | Internal Name | What It Does |
|-------|---------------|--------------|
| Previous Status | `PreviousStatus` | Stores what the status WAS before you changed it |
| Status Changed Date | `StatusChangedDate` | Records when you made the change |

### What Gets Recorded in Excel

Every status change creates a row with:

| Column | Description |
|--------|-------------|
| WO Number | The work order identifier (Title field) |
| Project Name | The job name |
| Previous Status | What status it was in before |
| New Status | What status it changed to |
| Days in Previous Status | How many days it spent in the previous status |
| Changed Date | The date of the change |

### How the Duration is Calculated

The flow calculates days like this:
```
Days = Today's Date - Status Changed Date

If Status Changed Date is empty, Days = 0
```

**Example:**
- Status Changed Date was January 20, 2026
- Today is February 18, 2026
- That's 29 days in the previous status

### Where is the Excel File?

The Excel log is stored at:
```
/sites/OncorDesign/Shared Documents/Status Changes.xlsx
```

Inside the file, the data goes into a table called **TblEV**.

---

## Understanding the Excel Log

### What the Excel File Looks Like

The "Status Changes.xlsx" file contains a history of every status change across all EV projects. Here's an example of what you might see:

| WO Number | Project Name | Previous Status | New Status | Days in Previous Status | Changed Date |
|-----------|--------------|-----------------|------------|------------------------|--------------|
| 12345-001 | Oak Ave Station | KMZ Creation | Power Walk Needed | 3 | 2/10/2026 |
| 12345-001 | Oak Ave Station | Power Walk Needed | Prelim Package Development | 5 | 2/15/2026 |
| 12345-001 | Oak Ave Station | Prelim Package Development | AEGIS Design | 12 | 2/27/2026 |
| 12345-002 | Main St Charger | KMZ Creation | Power Walk Needed | 2 | 2/12/2026 |

### How to Use the Excel Log

**To see a project's full history:**
1. Open the Excel file
2. Filter by WO Number
3. You'll see every status change for that project in order

**To analyze how long projects spend in each status:**
1. Open the Excel file
2. Create a pivot table (or use the existing one if available)
3. Summarize "Days in Previous Status" by "Previous Status"
4. See average days per status

**To find projects that took too long in a status:**
1. Filter by "Previous Status" (e.g., "AEGIS Design")
2. Sort by "Days in Previous Status" descending
3. See which projects spent the most time there

### Tips for Using the Data

- **The log only adds new rows** - It never deletes old ones, so you have a complete history
- **Look at trends** - If projects consistently get stuck in one status, that's an area to improve
- **Export for reporting** - You can use this data for weekly/monthly reports
- **Filter by date range** - To see changes within a specific time period

---

## When Things Don't Work

### Signs That the Flow Isn't Working

| Symptom | Likely Cause |
|---------|--------------|
| Previous Status isn't updating when you change Status | Flow has a problem |
| Status Changed Date isn't updating | Flow has a problem |
| New rows aren't appearing in Excel | Flow has a problem, or Excel file issue |
| Days shows 0 when it shouldn't | Status Changed Date was empty before the change |

### What to Try First

1. **Wait 5 minutes** - The flow needs time to run and the Excel file needs time to save
2. **Refresh the page** - Press F5 or click the refresh button to see updated values
3. **Check your changes saved** - Open the item and verify Status actually changed
4. **Check the Excel file** - Open Status Changes.xlsx to see if the new row is there

### If the List Fields Don't Update

If **Previous Status** and **Status Changed Date** don't update:

1. Check that you actually changed the Status field (not another field)
2. Wait 2-3 minutes and refresh
3. If still not working, the flow may be turned off or have an error

**Workaround:** You can manually fill in Previous Status and Status Changed Date if needed.

### If Excel Log Doesn't Update

If new rows aren't appearing in the Excel file:

1. Make sure you have access to the Excel file location
2. Close and reopen the Excel file (it may not show changes while open)
3. Check if there's a "TblEV" table in the file

**Note:** If someone else has the Excel file open in exclusive mode (not through SharePoint/OneDrive), the flow can't write to it.

### Information to Provide When Reporting Issues

When contacting your admin:
- Which work order (WO Number/Title)
- What status you changed FROM and TO
- The date and time of your change
- Whether Previous Status and Status Changed Date updated
- Whether the Excel file has a new row

---

## Frequently Asked Questions

### General Questions

**Q: Do I need to do anything to make the flow work?**

A: No! Just change the Status field as you normally would. The flow watches for changes and runs automatically.

**Q: How long does it take for everything to update?**

A: Usually 1-3 minutes. The list fields (Previous Status, Status Changed Date) update first, and the Excel file updates shortly after.

**Q: Does the flow run for every status change?**

A: Yes, every time you change the Status field and save, the flow runs and records the change.

**Q: What if I change the status multiple times quickly?**

A: Each change is recorded separately. If you change status 3 times in 5 minutes, you'll see 3 rows in Excel.

### Previous Status Questions

**Q: The Previous Status shows the wrong value. What happened?**

A: This can happen if:
- You changed status twice quickly before the first flow finished
- The flow had an error on a previous run
- Someone manually edited the Previous Status field

**Q: Can I manually change Previous Status?**

A: Yes, you can edit it directly if you need to correct it.

**Q: What if Previous Status is blank on an old project?**

A: Older projects may not have Previous Status values if:
- The flow wasn't running when they were created
- The project was imported from another system
- It was created before the flow existed

### Duration/Days Questions

**Q: Why does "Days in Previous Status" show 0?**

A: This means **Status Changed Date** was empty when the flow ran. The flow can't calculate days without a starting date.

**Q: The days calculation seems wrong. What could cause this?**

A: Check if Status Changed Date was correct before the change. The flow calculates from whatever date was in that field.

**Q: Are weekends included in the day count?**

A: Yes, the calculation includes all calendar days, not just business days.

### Excel Log Questions

**Q: Who can see the Excel log?**

A: Anyone with access to the SharePoint document library where it's stored.

**Q: Can I add my own analysis to the Excel file?**

A: Yes, but be careful:
- Add new sheets for your analysis instead of modifying the TblEV table
- Don't delete or rename the TblEV table (the flow needs it)
- Don't change column headers in TblEV

**Q: What if the Excel file gets too big?**

A: Contact your admin. They can:
- Archive old data to a backup file
- Create a new log file
- Set up automatic archiving

**Q: The Excel file is locked. What do I do?**

A: If you need to view it:
1. Wait a few minutes and try again
2. Ask others to close it if they have it open in desktop Excel
3. Open it through SharePoint (File > Open in Browser) for read-only access

---

## The EV Project Status Workflow

Here's the typical flow of statuses for an EV project, with the flow recording each transition:

```
[Project Received]
         ↓
   Status: KMZ Creation
   (Flow records start)
         ↓
   Status: Power Walk Needed
   (Flow records: X days in KMZ Creation)
         ↓
   Status: Prelim Package Development
   (Flow records: X days in Power Walk Needed)
         ↓
   Status: Prelim Final Review
   (Flow records: X days in Prelim Package Development)
         ↓
   Status: Pending Ext. Prelim Approval
   (Flow records: X days in Prelim Final Review)
         ↓
   Status: AEGIS Design
   (Flow records: X days in Pending Ext. Prelim Approval)
         ↓
   Status: AEGIS QA
   (Flow records: X days in AEGIS Design)
         ↓
   Status: Final Package Review
   (Flow records: X days in AEGIS QA)
         ↓
   Status: Pending Final Oncor Approval
   (Flow records: X days in Final Package Review)
         ↓
   ... and so on ...
```

Every arrow (↓) = One row added to Excel + Previous Status updated

---

## Flow Summary

| Aspect | Details |
|--------|---------|
| **Flow Name** | Status Change Logger |
| **Trigger** | When Status field changes |
| **Updates in List** | Previous Status, Status Changed Date |
| **Updates in Excel** | New row in TblEV table |
| **Excel Location** | /sites/OncorDesign/Shared Documents/Status Changes.xlsx |
| **Timing** | Runs within 1-3 minutes of status change |

---

## Status End Date Fields

The EV Team Tracker has dedicated End Date fields for each status stage (e.g., `KMZCreationEndDate`, `AEGISDesignEnd`). These fields:

- **May be updated manually** by users when completing each stage
- **May be updated by separate flows** if configured
- Are separate from the Status Change Logger flow described above

See the [EV Team Tracker Guide](guide#status-specific-end-dates) for the complete list of End Date fields and their internal names.

---

## Benefits of This Automation

### For Individual Users

- ✅ Don't have to remember to update Previous Status
- ✅ Don't have to manually track how long things take
- ✅ Status Changed Date is always accurate
- ✅ Can look up project history anytime in Excel

### For Managers

- ✅ Complete visibility into project timelines
- ✅ Data for performance analysis
- ✅ Easy identification of bottlenecks
- ✅ Audit trail for any questions

### For Reporting

- ✅ Automated data collection
- ✅ Consistent format in Excel
- ✅ Can build dashboards from the data
- ✅ Historical trends available

---

## Contact for Help

If you experience issues with the Status Change Logger flow:

1. **First**: Check this guide to understand what should happen
2. **Second**: Wait a few minutes and refresh the page
3. **Third**: Check the Excel file to see if the row was added
4. **Fourth**: Contact your SharePoint/Power Platform administrator

---

## Related Documentation

- [EV Team Tracker User Guide](guide) - Field definitions, views, and workflows
- [EV Tracker Excel Info](excel-info) - Power Query M Code and Excel PM Tracker

---

**Last Updated:** February 19, 2026  
**Associated List:** EV Team Tracker  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/EV Team Tracker/`  
**Excel Log Location:** `/sites/OncorDesign/Shared Documents/Status Changes.xlsx`
