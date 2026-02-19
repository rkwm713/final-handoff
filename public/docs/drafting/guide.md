# Drafting Team Tracker - Maintenance and User Guide

> **For users with limited Microsoft List experience**
> 
> This guide explains how the Drafting Team Tracker Microsoft List works, what each field does, and how to make changes safely.

---

## Table of Contents

1. [Overview](#overview)
2. [List Settings and Configuration](#list-settings-and-configuration)
3. [Understanding the Fields](#understanding-the-fields)
4. [Setting Up Views](#setting-up-views)
5. [How to Make Common Changes](#how-to-make-common-changes)
6. [Understanding Field Dependencies](#understanding-field-dependencies)
7. [Troubleshooting](#troubleshooting)

---

## Overview

### What is this list?

The **Drafting Team Tracker** is a Microsoft List for managing drafting and mapping work orders from various clients. This is the central submission point for permit requests, CAD maps, easement exhibits, and other drafting services. It contains **187 active work orders** and was created on **December 12, 2024**.

### Key Statistics

- **Total Fields**: 53 columns
- **Versioning**: Enabled (keeps up to 50 versions)
- **Attachments**: Allowed

### List Description (from SharePoint)

> "Drafting Team work order tracker. Submit mapping/permit requests via the New Item form. Managed by the Drafting PC."

---

## List Settings and Configuration

### Current Settings

| Setting | Status | What It Means |
|---------|--------|---------------|
| **Versioning** | ✅ Enabled | Every change creates a new version. You can see history and restore old versions. |
| **Major Versions** | 50 limit | The list keeps the last 50 versions of each item. Older versions are deleted automatically. |
| **Minor Versions** | ❌ Disabled | Draft versions are not tracked separately. |
| **Moderation** | ❌ Disabled | Changes are immediately visible to everyone. |
| **Attachments** | ✅ Enabled | You can attach files to work orders. |
| **Folders** | ❌ Disabled | You cannot create folders in this list. |

### If You Want to Change These Settings

**To enable moderation:**
1. Go to List Settings > Versioning Settings
2. Set "Require content approval" to Yes
3. **IMPACT**: New work orders won't appear until approved by the Drafting PC. This adds quality control but slows workflow.

**To change version limits:**
1. Go to List Settings > Versioning Settings
2. Change the number under "Keep the following number of major versions"
3. **IMPACT**: Higher numbers use more storage. Lower numbers may lose important history.

---

## Understanding the Fields

### Required Fields (Must Fill Out)

These fields **cannot be left blank** when creating a new work order:

| Field Name (Display) | Internal Name | Type | Description |
|---------------------|---------------|------|-------------|
| **WO Number** | `Title` | Text | Work order number/identifier |
| **WO Name** | `WOName` | Text | Descriptive name for the work order |
| **Need Date** | `NeedDate` | Date | Deadline/requested completion date |
| **Design Group** | `DesignGroup` | Choice | Which design group the work is for |
| **Your PM** | `YourPM` | Person | Project manager who submitted the request |
| **Your PC** | `YourPC` | Person | Project coordinator |
| **Client** | `Client` | Choice | Client name from dropdown (35 options) |
| **Requestor** | `Requestor` | Person | Person submitting the request |
| **Request Type** | `RequestType` | Choice | Type of drafting work needed |
| **# of Work Stations** | `WorkStations` | Number | Number of work stations/poles/locations |
| **Scope of Work** | `ScopeOfWork` | Multi-line text | Detailed description of what's needed |

### Work Order Identification

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **WO Number** | `Title` | Text | Primary identifier (Required) |
| **WO Name** | `WOName` | Text | Descriptive name (Required) |

### Assignment & Responsibility

| Field Name | Internal Name | Type | Required | Default | Description |
|-----------|---------------|------|----------|---------|-------------|
| **Your PM** | `YourPM` | Person | Yes | - | Project Manager submitting request |
| **Your PC** | `YourPC` | Person | Yes | - | Project Coordinator |
| **Requestor** | `Requestor` | Person | Yes | - | Person making the request |
| **Assigned Drafter** | `AssignedDrafter` | Person | No | - | Drafter assigned to complete the work |
| **Drafting PC** | `DraftingPC` | Text | No | aoropeza@techserv.com | Drafting Project Coordinator email |

### Request Details

| Field Name | Internal Name | Type | Options/Description |
|-----------|---------------|------|---------------------|
| **Design Group** | `DesignGroup` | Choice | See list below |
| **Client** | `Client` | Choice | See list below |
| **Request Type** | `RequestType` | Choice | ARDOT Permit, City Permit, County Permit, Easement Exhibit, FAA Permit, JU CAD Map, LADOTD Permit, Railroad Permit, Transmission Permit, TxDOT Permit, Other |
| **# of Work Stations** | `WorkStations` | Number | Count of work points |
| **Scope of Work** | `ScopeOfWork` | Multi-line text | Detailed description |

#### Design Group Options

```
- AEP Resiliency
- AEP Risk Poles
- AEPTX Small Wire
- COOP Permits
- Entergy Design
- Entergy Joint Use
- Oncor ETX Major
- Oncor Joint Use
- Oncor EV/SC
- Oncor SRP
- Oncor WTX Major
- Oncor WTX NCM
```

#### Client Options (35 total)

```
- AEP Dist Eng - APCO
- AEP Dist Eng - PSO
- AEP Dist Eng - SWEPCO
- AEP Dist Eng - Texas
- AEP Dist Eng - Texas Abilene
- AEP Dist Eng - Texas Corpus Christi
- AEP Dist Eng - Texas Laredo
- AEP Dist Eng - Texas Rio Grande Valley
- AEP Dist Eng - Texas San Angelo
- AEP Eng Rej Poles Eng - SWEPCO
- AEP Eng Risk Poles Eng - TEXAS
- AEP Streetlight Coord - PSO
- Amprical
- CenterPoint Distribution Engineering
- Engineering - Distribution Overhead
- Entergy Distribution Engineering
- Entergy QA/QC Engineering Linetec
- Oncor Alex Russian
- Oncor Alex Walker
- Oncor Charles Seawright
- Oncor Christopher Cooley
- Oncor Corben Murphy
- Oncor Dan Eichel
- Oncor Gary Wilson
- Oncor Gerri Coleman
- Oncor JU - EV Electric Vehicle - Hourly
- Oncor JU - SMC Small Cell - Hourly
- Oncor JU - Power Design and PCI
- Oncor James Jordan
- Oncor Jessica Posey
- Oncor Jevin Jackson
- Oncor Kymberly Teeters
- Oncor Larry Baldwin
- Oncor Robert Durham
- Oncor Scott Faulkner
```

### Status Tracking

| Field Name | Internal Name | Type | Default | Options |
|-----------|---------------|------|---------|---------|
| **Status** | `Status` | Choice | Not Started | Not Started, In Progress, On Hold, Canceled, Delivered, Rework - Needed, Rework - In Progress |

### Priority Management

| Field Name | Internal Name | Type | Default | Description |
|-----------|---------------|------|---------|-------------|
| **High Priority** | `HighPriority` | Yes/No | No | Whether this is high priority |
| **High Priority Reason** | `HighPriorityReason` | Multi-line text | - | Justification for high priority |
| **High Priority Approved?** | `HighPriorityApproved` | Yes/No | No | Whether management approved priority |

### Hours & Estimation

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **EJT** | `EstHoursCalc` | Calculated | **Auto-calculated** estimated job time based on Request Type and # of Work Stations (Read-only) |
| **Actual Hours** | `EstimatedHours` | Text | Manual entry. Overrides the auto-calculated estimate when filled in. |

**Important:** The `EstHoursCalc` field automatically calculates hours. If you want to override it, enter a value in the `Actual Hours` field.

### Date Tracking

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Need Date** | `NeedDate` | Date | Requested completion date (Required) |
| **Start Date** | `StartDate` | Date | When work began |
| **Delivered Date** | `DeliveredDate` | Date | When work was delivered to requestor |
| **Hold Start Date** | `HoldStartDate` | Date | When work order was put on hold |
| **Hold End Date** | `HoldEndDate` | Date | When work order resumed from hold |
| **Canceled Date** | `CanceledDate` | Date | When work order was canceled |

### TxDOT/RULIS Specific Fields

For **TxDOT Permit** requests, additional tracking fields are available:

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **RULIS Status** | `RULISStatus` | Choice | Requestor Approval Pending, Ready for RULIS, Design Change Needed, Design Updated, In Progress, Submitted, Additional Info. Req., Info. Provided, Approved, N/A |
| **RULIS Submission Date** | `RULISSubmissionDate` | Date | When submitted to RULIS system |
| **RULIS Additional Info Req.** | `RULISAdditionalInfoReq` | Multi-line text | Notes about what additional info is needed |
| **RULIS Application Number** | `RULISApplicationNumber` | Text | RULIS tracking number |
| **TxDOT Docs Link** | `TxDOTDocsLink` | Hyperlink | Link to TxDOT documentation |

### Links & Attachments

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **File Link** | `FileLink` | Hyperlink | Link to source files/folders |
| **TxDOT Docs Link** | `TxDOTDocsLink` | Hyperlink | Link to TxDOT-specific documents |

### System Fields (Automatic)

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **ID** | `ID` | Counter | Unique item number (auto-assigned) |
| **Created** | `Created` | Date/Time | When work order was created |
| **Modified** | `Modified` | Date/Time | Last modification time |
| **Created By** | `Author` | Person | Who created the work order |
| **Modified By** | `Editor` | Person | Who last modified the work order |
| **Version** | `_UIVersionString` | Text | Current version number |

---

## Setting Up Views

Views help you filter, sort, and organize the list data for different purposes. Here's how to create useful views for the Drafting Team Tracker.

### How to Create a New View

1. Click the view dropdown (next to current view name)
2. Select **Create new view**
3. Choose **Standard view**
4. Name your view descriptively
5. Configure columns, filters, and sorting
6. Click **OK**

### Recommended View Types

#### All Items Overview

Complete list for tracking and exporting.

**Setup:**
1. Name: "All Items"
2. **Columns to include:**
   - WO Number, Status, Request Type, Need Date
   - # of Work Stations, Requestor, EJT
   - Assigned Drafter, Start Date, Delivered Date
   - High Priority Approved?, Client
3. **Filter:** None (shows everything)
4. **Sort by:** High Priority Approved (descending) - priorities at top
5. **Row limit:** High (500+) for full visibility

#### My Assigned Work

Personal view for drafters.

**Setup:**
1. Name: "My Work" or your name
2. **Columns to include:**
   - WO Number, Status, Request Type, Need Date
   - # of Work Stations, EJT, Client
   - High Priority Approved?
3. **Filter:** 
   - Assigned Drafter equals [Me]
   - AND Status not equal to "Delivered"
   - AND Status not equal to "Canceled"
4. **Sort by:** Need Date (ascending) - deadlines first

#### TxDOT/RULIS Tracking

For managing TxDOT permit workflows.

**Setup:**
1. Name: "TxDOT - RULIS"
2. **Columns to include:**
   - WO Number, Status, Need Date
   - # of Work Stations, Requestor, Assigned Drafter
   - RULIS Status, RULIS Submission Date
   - RULIS Additional Info Req., RULIS Application Number
3. **Filter:** Request Type equals "TxDOT Permit"
4. **Sort by:** RULIS Status or Need Date

#### High Priority Queue

For monitoring urgent requests.

**Setup:**
1. Name: "High Priority"
2. **Columns to include:**
   - WO Number, Status, Request Type, Need Date
   - Requestor, High Priority Reason
   - Assigned Drafter, High Priority Approved?
3. **Filter:** High Priority equals Yes
4. **Sort by:** High Priority Approved (descending), then Need Date (ascending)

#### Overdue Items

For tracking missed deadlines.

**Setup:**
1. Name: "Overdue"
2. **Columns to include:**
   - WO Number, Status, Need Date, Assigned Drafter
   - Request Type, Client, High Priority Approved?
3. **Filter:**
   - Need Date is less than [Today]
   - AND Status not equal to "Delivered"
   - AND Status not equal to "Canceled"
4. **Sort by:** Need Date (ascending) - oldest first

#### Request Type Views

Create separate views for specific request types.

**Setup:**
1. Name: "City Permits" (or other request type)
2. **Filter:** Request Type equals "City Permit"
3. Include relevant columns for that work type

### View Best Practices

**Naming conventions:**
- Personal views: Use your name or "My [Purpose]"
- Functional views: Describe the purpose clearly
- Form/template views: Prefix with "zz" to sort to bottom

**Column selection:**
- Include only columns relevant to the view's purpose
- EJT (calculated hours) is useful for workload planning
- High Priority Approved should appear in most active work views

**Filtering tips:**
- Use [Me] for personal drafter views
- Filter out Delivered and Canceled for active work
- Combine Request Type filter with status filters

**Sorting tips:**
- Sort by Need Date for deadline-focused views
- Sort by High Priority Approved (descending) to surface urgent work
- Add secondary sort by Need Date for same-priority items

**Public vs. Private:**
- Make team-wide views public
- Keep personal views private
- Drafting PC may want views for workload balancing

---

## How to Make Common Changes

### Adding a New Request Type

**Steps:**
1. Go to **List Settings**
2. Click on the **Request Type** field
3. Add your new request type to the choice list
4. Click **OK**

**⚠️ IMPACT:**
- The new request type will be available immediately in the dropdown
- **The EJT (EstHoursCalc) formula may need updating** if you want automatic hour calculations for the new type
- Consider whether the new type fits existing categories or needs special handling

### Updating the Client List

**Steps:**
1. Go to **List Settings**
2. Click on the **Client** field
3. Add/remove/edit client names
4. Click **OK**

**⚠️ IMPACT:**
- Changes appear immediately in dropdowns
- Removing a client that's in use will leave existing items showing the old value (but it won't be available for new items)

**Best Practice:** Don't delete clients in active use. Add "(INACTIVE)" suffix instead.

### Modifying the Hour Estimation Formula

**⚠️ ADVANCED:** The `EstHoursCalc` field uses a formula to calculate hours automatically.

**To modify:**
1. Go to **List Settings**
2. Click on **EJT** (EstHoursCalc)
3. Modify the formula in "Formula" box
4. Click **OK**

**⚠️ CRITICAL IMPACT:**
- Changing the formula affects ALL items in the list
- Test your formula carefully before saving
- If the formula breaks, items may show `#ERROR`
- Keep a backup of the old formula

**Example Formula Structure:**
```
=IF([Request Type]="City Permit", [# of Work Stations]*2.5, 
   IF([Request Type]="TxDOT Permit", [# of Work Stations]*4, 
   [# of Work Stations]*2))
```

### Adding a New Design Group

**Steps:**
1. Go to **List Settings**
2. Click on **Design Group**
3. Add the new group name to the choice list
4. Organize alphabetically if desired
5. Click **OK**

**⚠️ IMPACT:**
- New group appears immediately in dropdowns
- No impact on existing work orders
- Consider notifying users about the new option

### Managing High Priority Approvals

**Workflow:**
1. Requestor submits work order
2. Requestor checks **High Priority** box if urgent
3. Requestor fills **High Priority Reason**
4. Drafting PC reviews and checks **High Priority Approved?** if approved

**To automate approvals:**
- Create a Power Automate flow that sends email to Drafting PC when High Priority is checked
- Flow can require approval before setting High Priority Approved to Yes

### Creating a Custom View

**Example: View for Specific Drafter**

1. Click **Create new view**
2. Choose **Standard view**
3. Name: "My Work Orders"
4. In Columns section, select desired columns
5. In Filter section:
   - Show items when: **Assigned Drafter** is equal to **[Me]**
   - AND **Status** is not equal to **Delivered**
   - AND **Status** is not equal to **Canceled**
6. In Sort section: Sort by **Need Date** (ascending)
7. Make view public if you want others to see it
8. Click **OK**

**Result:** Shows only active work orders assigned to the current user, sorted by deadline.

---

## Understanding Field Dependencies

### How Status Changes Affect Dates

When you change the **Status** field, you should also update date fields:

| Status | Date to Update |
|--------|----------------|
| **In Progress** | Set **Start Date** |
| **On Hold** | Set **Hold Start Date** |
| (Resume from hold) | Set **Hold End Date** |
| **Delivered** | Set **Delivered Date** |
| **Canceled** | Set **Canceled Date** |

**Note:** These dates are NOT automatically set - you must manually update them.

### High Priority Workflow

```
Requestor checks "High Priority" 
→ Requestor fills "High Priority Reason"
→ Drafting PC reviews
→ Drafting PC checks "High Priority Approved?" if approved
→ Work order moves to top of queue (view sorted by this field)
```

### RULIS Workflow (TxDOT Permits)

```
1. Request Type = "TxDOT Permit"
2. RULIS Status = "Requestor Approval Pending"
3. Requestor reviews and sets RULIS Status = "Ready for RULIS"
4. Design changes if needed, then RULIS Status = "Design Updated"
5. RULIS Status = "In Progress"
6. RULIS Status = "Submitted", fill RULIS Submission Date
7. If more info needed: RULIS Status = "Additional Info. Req.", fill RULIS Additional Info Req.
8. When info provided: RULIS Status = "Info. Provided"
9. Final: RULIS Status = "Approved", fill RULIS Application Number
```

### Calculated vs Manual Hours

- **EJT (EstHoursCalc)**: Automatically calculated based on Request Type and # of Work Stations
- **Actual Hours**: Manual override field

**Rule:** If you enter a value in **Actual Hours**, use that for billing/tracking instead of the calculated EJT.

---

## Troubleshooting

### "This work order cannot be saved because required fields are blank"

**Required fields checklist:**
- ✅ WO Number
- ✅ WO Name
- ✅ Need Date
- ✅ Design Group
- ✅ Your PM
- ✅ Your PC
- ✅ Client
- ✅ Requestor
- ✅ Request Type
- ✅ # of Work Stations
- ✅ Scope of Work

### "The EJT field shows #ERROR"

**Possible causes:**
1. The formula is broken
2. Request Type value doesn't match formula conditions
3. # of Work Stations is blank or non-numeric

**Solution:**
- Fill in Request Type and # of Work Stations
- Contact list admin if error persists across multiple items

### "I don't see the RULIS fields"

**Reason:** RULIS fields only apply to TxDOT Permit requests.

**Solution:**
1. Make sure Request Type = "TxDOT Permit"
2. Add RULIS columns to your view if they're hidden
3. Use the "TxDOT - RULIS" view which shows these fields

### "My high priority request isn't at the top of the list"

**Possible causes:**
1. You're not using the "All Items" view (which sorts by High Priority Approved)
2. **High Priority Approved?** is not checked (only High Priority is checked)
3. Other items also have High Priority Approved

**Solution:**
- Ask Drafting PC to approve your priority request
- Sort your view by High Priority Approved (descending) and Need Date (ascending)

### "Delivered work orders are cluttering my view"

**Solution: Create a filtered view**
1. Create new view or edit current view
2. Add filter: Status is not equal to "Delivered"
3. Add filter: Status is not equal to "Canceled"
4. Save view

### "I need to reassign work orders in bulk"

**Option 1: Quick Edit (Grid View)**
1. Click **Edit in grid view**
2. Change Assigned Drafter in multiple rows
3. Changes save automatically

**Option 2: Power Automate**
- For complex reassignments based on criteria, ask admin to create a flow

---

## Best Practices

### Submitting Work Orders

✅ **DO:**
- Fill out all required fields completely
- Provide detailed Scope of Work descriptions
- Attach source files or provide File Link
- Set realistic Need Dates
- Use High Priority only when truly urgent
- Provide justification in High Priority Reason

❌ **DON'T:**
- Mark everything as high priority
- Use vague Scope of Work descriptions
- Submit duplicate requests
- Leave Required fields blank with placeholder text
- Set Need Date in the past

### Managing Work Orders (Drafting PC)

✅ **DO:**
- Assign drafters promptly
- Update Status as work progresses
- Record Start Date and Delivered Date
- Approve high priorities based on actual urgency
- Track RULIS status for TxDOT permits
- Communicate with requestors about delays

❌ **DON'T:**
- Leave Status as "Not Started" for assigned work
- Approve all high priority requests without review
- Delete canceled work orders (mark them Canceled instead)
- Change Need Date without consulting requestor

### For Drafters

✅ **DO:**
- Check "My Work Orders" view daily (create if doesn't exist)
- Update Status when starting work
- Track Actual Hours if different from estimate
- Communicate blockers immediately
- Set Delivered Date when completing work

❌ **DON'T:**
- Work on unassigned items without coordination
- Forget to update Status
- Deliver work without updating the work order

### Data Quality

✅ **DO:**
- Use consistent WO Number formats
- Select exact Client and Design Group (don't approximate)
- Enter numeric values in # of Work Stations
- Update dates as milestones occur
- Add links to relevant documentation

❌ **DON'T:**
- Enter text in number fields
- Use free-form text when dropdowns exist
- Skip date tracking
- Create duplicate entries for revisions (update existing instead)

---

## Key Internal Names Reference

When working with Power Automate or other integrations, use these **internal names**:

| Display Name | Internal Name |
|-------------|---------------|
| WO Number | `Title` |
| WO Name | `WOName` |
| Need Date | `NeedDate` |
| Your PM | `YourPM` |
| Your PC | `YourPC` |
| # of Work Stations | `WorkStations` |
| Scope of Work | `ScopeOfWork` |
| Request Type | `RequestType` |
| Design Group | `DesignGroup` |
| Assigned Drafter | `AssignedDrafter` |
| High Priority | `HighPriority` |
| High Priority Approved? | `HighPriorityApproved` |
| High Priority Reason | `HighPriorityReason` |
| EJT (calculated) | `EstHoursCalc` |
| Actual Hours | `EstimatedHours` |
| RULIS Status | `RULISStatus` |
| TxDOT Docs Link | `TxDOTDocsLink` |

---

## Common Formulas & Expressions

### For Power Automate: Calculate Days Until Need Date

```
div(sub(ticks(item()?['NeedDate']), ticks(utcNow())), 864000000000)
```

### For Views: Filter to Active Items

```
Status is not equal to "Delivered"
AND Status is not equal to "Canceled"
```

### For Views: Overdue Items

```
Need Date is less than [Today]
AND Status is not equal to "Delivered"
AND Status is not equal to "Canceled"
```

---

## Getting Help

### Where to Find More Information

1. **List Settings**: Click gear icon > List settings
2. **Version History**: Open any work order > Version History
3. **Field Descriptions**: List Settings > Click any column name > View "Description" field
4. **Drafting PC Contact**: Check the default value in Drafting PC field (aoropeza@techserv.com)

### Who to Contact

- **Drafting PC**: For work order assignments, priorities, and workflow questions
- **List Owner**: Check List Settings > Permissions to see who has Full Control
- **SharePoint Admin**: For permissions, settings, and technical issues

---

## Workflow Diagram

```
[Requestor Submits Work Order]
         ↓
   [Status: Not Started]
         ↓
   [Drafting PC Reviews]
         ↓
   [Assigns Drafter] ← (Optional: Approves High Priority)
         ↓
   [Status: In Progress]
   [Start Date recorded]
         ↓
   [Drafter Completes Work]
         ↓
   [Status: Delivered]
   [Delivered Date recorded]
         ↓
     [Complete]

Branches:
- On Hold → Hold Start Date → Resume → Hold End Date
- Rework Needed → Rework In Progress → Delivered
- Canceled → Canceled Date
```

---

---

## Related Documentation

📘 **[Automation Guide](automation)** - Explains all the Power Automate flows that run automatically on this list, including:
- Date Stamps (automatically fills in dates when you change Status or RULIS Status)
- RULIS Additional Info Alert (sends Teams notification when RULIS needs more info)

📊 **[Excel Info](excel-info)** - Power Query M Code documentation for the Drafting PM Tracker Excel file

---

**Last Updated:** February 19, 2026  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/DraftingTeamTracker`  
**Schema Export Date:** February 18, 2026  
**Managed By:** Drafting PC (aoropeza@techserv.com)
