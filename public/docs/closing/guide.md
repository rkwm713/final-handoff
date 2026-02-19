# Closing Tracker - Maintenance and User Guide

> **For users with limited Microsoft List experience**
> 
> This guide explains how the Closing Tracker Microsoft List works, what each field does, and how to make changes safely.

---

## Table of Contents

1. [Overview](#overview)
2. [List Settings and Configuration](#list-settings-and-configuration)
3. [Understanding the Fields](#understanding-the-fields)
4. [Views Explained](#views-explained)
5. [How to Make Common Changes](#how-to-make-common-changes)
6. [Understanding Field Dependencies](#understanding-field-dependencies)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What is this list?

The **Closing Tracker** is a Microsoft List for managing the closing process of work orders after construction completion. This list tracks as-built documentation, batch processing, external communications with storerooms and FCCs (Field Construction Coordinators), and final WIMS (Work Information Management System) closing. It contains **314 active work orders** and was created on **January 7, 2025**.

### Key Statistics

- **Total Items**: 314 work orders
- **Total Fields**: 60 columns
- **Views**: 9 different views
- **Versioning**: Enabled (keeps up to 50 versions)
- **Attachments**: Allowed

---

## List Settings and Configuration

### Current Settings

| Setting | Status | What It Means |
|---------|--------|---------------|
| **Versioning** | ✅ Enabled | Every change creates a new version. History is preserved. |
| **Major Versions** | 50 limit | Keeps last 50 versions. Older versions auto-deleted. |
| **Minor Versions** | ❌ Disabled | No draft versions. |
| **Moderation** | ❌ Disabled | Changes are immediately visible. |
| **Attachments** | ✅ Enabled | Files can be attached to items. |
| **Folders** | ❌ Disabled | Cannot create folders. |

---

## Understanding the Fields

### Core Identification

| Field Name | Internal Name | Type | Required | Description |
|-----------|---------------|------|----------|-------------|
| **Title** | `Title` | Text | No | Work order number |
| **WIMS WR Number** | `WIMSWRNumber` | Text | No | WIMS Work Request number |

### Assignment

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **CLOSER** | `field_1` | Person (multi) | Person(s) assigned to close this work order |

### Status & Progress Tracking

| Field Name | Internal Name | Type | Default | Options |
|-----------|---------------|------|---------|---------|
| **STATUS** | `STATUS` | Choice | - | Ready for Assignment, Processing, QC Reviewing, Finalizing, Closed, Completed |
| **CHECKPOINT** | `Checkpoint` | Choice | - | Initial Review, Awaiting External Response, As-Built Production, Pre-Batch, Batch Queued, Batch Failed (Retry Needed), Auditing |
| **BLOCKER** | `BLOCKER` | Choice | - | Request Force Close, Request Field Audit, Request to Cancel, Request As-Built Var., Dash Required |
| **BLOCKERS** | `BLOCKERS` | Multi-Choice | - | Same options as BLOCKER (allows multiple selections) |

**Note:** There are two blocker fields - `BLOCKER` (single choice) and `BLOCKERS` (multi-choice). The multi-choice field is recommended for flexibility.

### Time Tracking

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **STATUS CHANGED DATE** | `field_5` | Date | When status last changed |
| **DAYS IN STATUS** | `field_4` | Text | Number of days in current status (likely auto-updated by flow) |
| **SOX TIMER** | `field_10` | Number | Sarbanes-Oxley compliance timer |
| **Last Touched** | `LastContacted` | Date | Last time someone worked on this item |

### Project Details

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **DESIGN GROUP** | `DESIGNGROUP` | Choice | 1510, 2400, CDG, DA, ETX MAJOR, ETXNCM, EV, RDG, SMALL CELL, SRP, WTX MAJOR, WTXNCM, STREETLIGHT |
| **INVOICE-TO** | `INVOICE_x002d_TO_x002d_` | Choice | Various Oncor contacts + "Applicable, Non" |
| **STATION COUNT** | `field_7` | Number | Number of stations in the work order |
| **INSERVICE DATE** | `field_9` | Date | When work went into service |

### External Contact Tracking

| Field Name | Internal Name | Type | Default | Options |
|-----------|---------------|------|---------|---------|
| **EXT CONTACT STATUS** | `EXTCONTACTSTATUS` | Choice | Evaluate Contact Need | Evaluate Contact Need, Pending FCC Response, Pending Storeroom Response, Response Received |
| **Storeroom Status** | `StoreroomStatus` | Choice | Evaluate Contact Need | Evaluate Contact Need, Pending Storeroom Response, Storeroom Responded |
| **FCC Status** | `FCCStatus` | Choice | Evaluate Contact Need | Evaluate Contact Need, Pending FCC Response, FCC Responded |

### Stage Date Tracking

The list tracks start and end dates for various stages:

| Stage | Start Date Field | End Date Field |
|-------|------------------|----------------|
| **Storeroom (SR)** | `SRStart` | `SREnd` |
| **FCC** | `FCCStart` | `FCCEnd` |
| **Design Manager (DM)** | `DMStart` | `DMEnd` |
| **Escalated** | `EscalatedStart` | `EscalatedEnd` |
| **Variance** | `VarianceStart` | `VarianceEnd` |
| **Batch Failure** | `BatchFailureStart` | `BatchFailureEnd` |
| **WFIMWC** | `WFIMWCStart` | `WFIMWCEnd` |
| **DASH** | `DASHStart` | `DASHEnd` |

### Comments & Notes

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Comments** | `Comments` | Multi-line text | General comments and notes |
| **Personal notes** | `Personalnotes` | Text | Individual closer's personal notes |

### Calculated Fields

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **StatusOrder** | `StatusOrder` | Calculated | Provides numeric ordering for statuses (used for sorting) |

---

## Views Explained

The list has **9 specialized views**:

### 1. All Items (Default View) ⭐

**Purpose:** Complete overview of all work orders

**Sorted by:** StatusOrder (ascending) - keeps workflow stages in logical order

**Key Columns:**
- CLOSER
- Title
- STATUS
- Checkpoint
- STATUS CHANGED DATE
- INSERVICE DATE
- SOX TIMER
- DESIGN GROUP
- Last Touched
- BLOCKERS
- EXT CONTACT STATUS
- Storeroom/FCC start dates
- STATION COUNT
- INVOICE-TO

**Settings:** Shows 500 items per page

**When to use:** Daily operations, full visibility

### 2. zz Adding Jobs

**Purpose:** View for adding new jobs to the tracker

**Filter:** Shows only items where STATUS is null or "Ready for Assignment"

**Key Columns:**
- Title
- DESIGN GROUP
- STATION COUNT
- INVOICE-TO
- INSERVICE DATE
- STATUS
- CLOSER

**When to use:** Intake process, assigning new work orders

### 3. Chloe

**Purpose:** Personal view filtered for Chloe Petzold

**Filter:** CLOSER equals "Chloe Petzold"

**Key Columns:**
- Title
- CLOSER
- STATUS
- BLOCKERS
- Storeroom Status
- FCC Status
- SR/FCC Start dates
- Last Touched
- EXT CONTACT STATUS
- Checkpoint
- BLOCKER

**When to use:** Individual closer's workload view (template for other closers)

### 4. jerel2

**Purpose:** Testing view with date range filter

**Filter:** Created date overlaps with Batch Failure End date (within current month)

**When to use:** Development/testing (can likely be hidden from normal users)

### 5. SOX

**Purpose:** SOX compliance tracking

**Key Columns:**
- Title
- CLOSER
- STATUS
- DAYS IN STATUS
- BLOCKERS
- Storeroom/FCC Status
- Last Touched
- STATION COUNT
- DESIGN GROUP
- INVOICE-TO
- INSERVICE DATE
- SOX TIMER

**When to use:** Compliance audits, tracking aging work orders

### 6. SR/FCC

**Purpose:** Focus on Storeroom and FCC communications

**Sorted by:** StatusOrder

**Key Columns:**
- STATUS
- Title
- CLOSER
- Storeroom Status
- SR Start/End
- FCC Status
- FCC Start/End
- Last Touched
- StatusOrder

**When to use:** Managing external communications

### 7. zzRyan

**Purpose:** Filtered view for Jerel Morrow (specific statuses)

**Filter:**
- CLOSER equals "Jerel Morrow"
- AND STATUS is one of: Processing, Finalizing, Closed, Ready for Assignment

**Sorted by:** StatusOrder

**When to use:** Individual closer's active work (another personal view template)

### 8. Flow – Daily Calculator

**Purpose:** Minimal view for Power Automate flow

**Key Columns:**
- Title
- ID
- STATUS
- STATUS CHANGED DATE
- INSERVICE DATE

**When to use:** Automated processing (Power Automate likely uses this)

### 9. zz Flow – Daily Calculator

**Purpose:** Backup/archived version of Flow view

**When to use:** Reference only (appears to be a duplicate)

---

## How to Make Common Changes

### Adding a New Status

**Steps:**
1. Go to **List Settings**
2. Click on **STATUS** field
3. Add new status to choice list
4. Consider where it fits in the workflow
5. Click **OK**

**⚠️ IMPACT:**
- New status available immediately
- **StatusOrder calculated field may need updating** to include the new status in sort order
- Power Automate flows checking status may need modification
- Consider adding corresponding date tracking fields (Start/End)

### Adding a New Design Group

**Steps:**
1. List Settings > Click **DESIGN GROUP**
2. Add new group to choices
3. Keep alphabetical or logical order
4. Click **OK**

**⚠️ IMPACT:**
- Available immediately in dropdown
- No impact on existing items
- Filters in views won't automatically include new group

### Creating a Personal View for a Closer

**Steps:**
1. Click **Create new view**
2. Choose **Standard View**
3. Name it with closer's name (e.g., "John")
4. Select columns to display (use Chloe view as template):
   - Title, CLOSER, STATUS, BLOCKERS, Storeroom Status, FCC Status, SR/FCC dates, Last Touched, EXT CONTACT STATUS, Checkpoint, BLOCKER
5. Add filter: **CLOSER** equals **[Specific User]**
6. Sort by StatusOrder (ascending)
7. Set Row Limit: 30
8. Make public if desired
9. Click **OK**

**Result:** Personalized dashboard for the closer

### Modifying the StatusOrder Formula

**⚠️ ADVANCED - BE CAREFUL**

The `StatusOrder` calculated field controls how statuses sort in views.

**To modify:**
1. List Settings > Click **StatusOrder**
2. View/edit the formula
3. Test thoroughly before saving

**Expected Formula Structure:**
```
=IF([STATUS]="Ready for Assignment",1,
 IF([STATUS]="Processing",2,
 IF([STATUS]="QC Reviewing",3,
 IF([STATUS]="Finalizing",4,
 IF([STATUS]="Closed",5,
 IF([STATUS]="Completed",6,99))))))
```

**⚠️ IMPACT:**
- Changes how items are sorted in views using StatusOrder
- Errors will break sorting across all items
- Always backup the original formula

### Bulk Assigning Work Orders

**Option 1: Quick Edit**
1. Click **Edit in grid view**
2. Select CLOSER column for multiple items
3. Type or select closer name
4. Changes save automatically

**Option 2: Power Automate Flow**
- Create a flow that assigns based on criteria (Design Group, workload, etc.)

---

## Understanding Field Dependencies

### Status Workflow

```
Ready for Assignment
    ↓
Processing
    ↓
QC Reviewing
    ↓
Finalizing
    ↓
Closed
    ↓
Completed
```

### When Status Changes

**Automatic (via Power Automate):**
- **STATUS CHANGED DATE** is updated to today
- **DAYS IN STATUS** is reset to 0

**Manual Updates Needed:**
- Update **Checkpoint** to reflect current stage
- Clear or add **BLOCKER** if applicable
- Update external contact statuses if relevant
- Record stage start/end dates

### Checkpoint Stages

Checkpoints provide granular progress within a status:

```
Initial Review → 
Awaiting External Response → 
As-Built Production → 
Pre-Batch → 
Batch Queued → 
Batch Failed (Retry Needed) → 
Auditing
```

### External Contact Workflow

```
1. EXT CONTACT STATUS = "Evaluate Contact Need"
2. If storeroom needed:
   - Storeroom Status = "Pending Storeroom Response"
   - Record SRStart date
   - EXT CONTACT STATUS = "Pending Storeroom Response"
3. When response received:
   - Storeroom Status = "Storeroom Responded"
   - Record SREnd date
   - If no other contacts needed: EXT CONTACT STATUS = "Response Received"

4. Similar process for FCC contact
5. Last Touched date updated when any communication occurs
```

### Blocker Handling

**Single blockers:** Use **BLOCKER** field  
**Multiple blockers:** Use **BLOCKERS** field (multi-choice)

**Options:**
- **Request Force Close**: Cannot complete normally, needs manager approval to force close
- **Request Field Audit**: Field verification needed before closing
- **Request to Cancel**: Work order should be canceled
- **Request As-Built Var**: Variance needed for as-built documentation
- **Dash Required**: DASH system work required

**When blocker selected:**
1. Add comment explaining the blocker
2. Update Last Touched
3. Notify relevant parties
4. STATUS may change to "On Hold" or similar (if that status exists)

---

## Troubleshooting

### "DAYS IN STATUS shows wrong number"

**Likely cause:** The Power Automate flow that calculates this isn't running.

**Solution:**
- Check with SharePoint admin about the flow
- Manually calculate: Today's date - STATUS CHANGED DATE

### "StatusOrder shows #ERROR"

**Cause:** The calculated formula encountered an issue.

**Common fixes:**
- STATUS field is blank (fill it in)
- Formula doesn't account for a new status value
- Ask admin to review/fix the StatusOrder formula

### "I can't find my assigned work orders"

**Solutions:**
1. Check if a personal view exists with your name
2. Create a personal view filtered by CLOSER = [Me]
3. Use All Items view and filter by your name manually

### "Work order stuck in 'Processing' for weeks"

**Action steps:**
1. Check **BLOCKER** or **BLOCKERS** field - is something blocking progress?
2. Review **Last Touched** - when was it last worked on?
3. Check **EXT CONTACT STATUS** - waiting on external response?
4. Update **Checkpoint** to current stage
5. Add **Comments** explaining the delay
6. Consider escalation if no progress

### "Batch Failed - what do I do?"

**Steps:**
1. Record **BatchFailureStart** date (if not auto-filled)
2. Set **Checkpoint** to "Batch Failed (Retry Needed)"
3. Review error details (likely in another system)
4. Fix underlying issue
5. Re-queue batch
6. Set **Checkpoint** to "Batch Queued"
7. When successful, record **BatchFailureEnd** date

---

## Best Practices

### For Closers

✅ **DO:**
- Update **Last Touched** when you work on an item
- Record stage start/end dates accurately
- Use **Comments** to document actions and decisions
- Update **Checkpoint** as you progress
- Clear blockers when resolved
- Keep **Personal notes** for your own tracking

❌ **DON'T:**
- Leave STATUS unchanged for days without updates
- Skip recording external contact dates
- Forget to update EXT CONTACT STATUS
- Use BLOCKER without explanation in Comments
- Move to next STATUS without completing current stage

### For Managers

✅ **DO:**
- Monitor **SOX TIMER** for compliance
- Review **DAYS IN STATUS** for stalled items
- Check **BLOCKER** items daily
- Balance workload across CLOSER assignments
- Use SOX view for aging reports

❌ **DON'T:**
- Ignore items stuck in "Awaiting External Response" for weeks
- Assign new work without checking current workload
- Skip escalation process for blockers
- Allow batch failures to accumulate

### Data Quality

✅ **DO:**
- Enter WIMS WR Numbers when available
- Record accurate STATION COUNT
- Set correct DESIGN GROUP
- Track INSERVICE DATE
- Update INVOICE-TO if invoicing changes

❌ **DON'T:**
- Leave Title field blank
- Guess at dates - leave blank if unknown
- Create duplicate entries
- Use STATUS field for notes (use Comments)

---

## Key Internal Names Reference

| Display Name | Internal Name | Notes |
|-------------|---------------|-------|
| CLOSER | `field_1` | Multi-person field |
| DAYS IN STATUS | `field_4` | Text (likely auto-updated) |
| STATUS CHANGED DATE | `field_5` | Date |
| STATION COUNT | `field_7` | Number |
| INSERVICE DATE | `field_9` | Date |
| SOX TIMER | `field_10` | Number |
| DESIGN GROUP | `DESIGNGROUP` | Choice |
| INVOICE-TO | `INVOICE_x002d_TO_x002d_` | Note the encoding |
| BLOCKERS | `BLOCKERS` | Multi-choice (recommended) |
| BLOCKER | `BLOCKER` | Single choice (legacy?) |

**Important:** Internal names like `field_1`, `field_4`, etc. were auto-generated. These are harder to work with in Power Automate but cannot be changed after creation.

---

## Common Power Automate Expressions

### Calculate Days in Status

```
div(sub(ticks(utcNow()), ticks(item()?['field_5'])), 864000000000)
```

Where `field_5` is STATUS CHANGED DATE.

### Check if SOX Timer Exceeded

```
greater(item()?['field_10'], 30)
```

Returns true if SOX TIMER is greater than 30 days.

### Filter for Stalled Items

```
and(
  equals(item()?['STATUS'], 'Processing'),
  greater(
    div(sub(ticks(utcNow()), ticks(item()?['field_5'])), 864000000000),
    14
  )
)
```

Finds items in "Processing" for more than 14 days.

---

## Getting Help

### Where to Find More Information

1. **List Settings**: Gear icon > List settings
2. **Version History**: Open item > Version History
3. **Flow Runs**: If flows are failing, check Power Automate run history
4. **Field Descriptions**: List Settings > Click column name

### Who to Contact

- **Closing Team Lead**: For workflow questions and assignments
- **List Owner**: Check List Settings > Permissions
- **Power Platform Admin**: For flow issues affecting DAYS IN STATUS or automation
- **SharePoint Admin**: For permissions and list configuration

---

## Workflow Diagram

```
[Work Order Created]
    ↓
STATUS: Ready for Assignment
    ↓
[Assign CLOSER]
    ↓
STATUS: Processing
CHECKPOINT: Initial Review
    ↓
[External Contact if Needed]
    ↓
CHECKPOINT: Awaiting External Response
EXT CONTACT STATUS: Pending Response
    ↓
[Response Received]
    ↓
CHECKPOINT: As-Built Production
    ↓
CHECKPOINT: Pre-Batch
    ↓
CHECKPOINT: Batch Queued
    ↓
[If batch fails]
CHECKPOINT: Batch Failed (Retry Needed)
[Fix and retry]
    ↓
STATUS: QC Reviewing
CHECKPOINT: Auditing
    ↓
STATUS: Finalizing
    ↓
STATUS: Closed
    ↓
STATUS: Completed
```

---

---

## Related Documentation

📘 **[Automation Guide](automation)** - Explains all the Power Automate flows that run automatically on this list, including:
- Status Change Tracker (resets Days In Status when you change status)
- Daily Status Calculator (calculates aging and SOX timer every morning)
- FCC & Storeroom Tracker (records communication dates)
- Blocker Date Tracker (tracks blocker start/end dates)
- PC Upload Sync (imports from Excel)

📊 **[Excel Info](excel-info)** - Power Query M Code documentation for the Closing PM Tracker Excel file

---

**Last Updated:** February 19, 2026  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Closing Tracker/`  
**Schema Export Date:** February 18, 2026
