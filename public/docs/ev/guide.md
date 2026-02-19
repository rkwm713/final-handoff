# EV Team Tracker - Maintenance and User Guide

> **For users with limited Microsoft List experience**
> 
> This guide explains how the EV Team Tracker Microsoft List works, what each field does, and how to make changes safely.

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

The **EV Team Tracker** is a Microsoft List that tracks Electric Vehicle (EV) infrastructure projects from start to completion. It contains **495 active projects** and was created on **October 28, 2024**.

### Key Statistics

- **Total Fields**: 65 columns
- **Versioning**: Enabled (keeps up to 50 versions)
- **Attachments**: Allowed

---

## List Settings and Configuration

### Current Settings

| Setting | Status | What It Means |
|---------|--------|---------------|
| **Versioning** | ✅ Enabled | Every change creates a new version. You can see history and restore old versions. |
| **Major Versions** | 50 limit | The list keeps the last 50 versions of each item. Older versions are deleted automatically. |
| **Minor Versions** | ❌ Disabled | Draft versions are not tracked separately. |
| **Moderation** | ❌ Disabled | Changes are immediately visible to everyone. |
| **Attachments** | ✅ Enabled | You can attach files to items. |
| **Folders** | ❌ Disabled | You cannot create folders in this list. |

### If You Want to Change These Settings

**To enable moderation:**
1. Go to List Settings > Versioning Settings
2. Set "Require content approval" to Yes
3. **IMPACT**: New items and changes won't appear until approved. This will slow down your workflow but adds quality control.

**To change version limits:**
1. Go to List Settings > Versioning Settings
2. Change the number under "Keep the following number of major versions"
3. **IMPACT**: Higher numbers use more storage. Lower numbers may lose important history.

---

## Understanding the Fields

### Required Fields (Must Fill Out)

These fields **cannot be left blank** when creating a new project:

| Field Name (Display) | Internal Name | Type | Description |
|---------------------|---------------|------|-------------|
| **Job Name** | `ProjectName` | Text | The name of the project/job |
| **Start Date** | `ReceivedDate` | Date | When the project was received |
| **Field Tech** | `FieldTech` | Person | The field technician assigned |
| **Designer** | `Designer` | Person | The designer assigned to the project |
| **Oncor UD** | `OncorUD` | Choice | Oncor utility designer from dropdown list |
| **TS SOW** | `TSSOW` | Number | TechServ scope of work number |
| **Customer** | `Customer` | Choice | Customer name from dropdown list (200+ options) |

### Project Identification Fields

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Title** | `Title` | Text | Work order number (not required but recommended) |
| **WO Number** | `LinkTitle` | Computed | Clickable version of Title |
| **WR** | `WR` | Number | Work request number |

### Location & Classification

| Field Name | Internal Name | Type | Options/Notes |
|-----------|---------------|------|---------------|
| **Location Type** | `JobType` | Choice | ONSITE, OFFSITE, CAPBANK |

### Status Tracking

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **Status** | `Status` | Choice | 19 possible statuses (see below) |
| **Previous Status** | `PreviousStatus` | Text | Auto-filled by automation |
| **Status Changed Date** | `StatusChangedDate` | Date | When status last changed |
| **WaAM Status** | `WaAMStatus` | Choice | Work and Asset Management system status |

#### WaAM Status Options

The WaAM Status field syncs with Oncor's Work and Asset Management system:

| Code | Meaning |
|------|---------|
| APPR | Approved |
| ARCHIVED | Archived/completed |
| HOLD | On hold |
| HOLD-A | On hold (alternate) |
| INDESIGN | In design phase |
| INIT | Initiated |
| INPROG | In progress |
| INSERVICE | In service |
| PENDCAN | Pending cancellation |
| WORKCLOSE | Work closing |

#### Available Status Options

```
- KMZ Creation
- Power Walk Needed
- Prelim Package Development
- Prelim Final Review
- Pending Ext. Prelim Approval
- AEGIS Design
- AEGIS QA
- Final Package Review
- Pending Final Oncor Approval
- Staking
- Pending Construction
- As-Built Needed
- Send Design Verify
- Complete
- Hold - Customer
- Hold - Documents
- Hold - Permits
- Hold - DASH
- Canceled
```

### Date Tracking Fields

The list tracks completion dates for each major status milestone:

| Display Name | Internal Name | Purpose |
|-------------|---------------|---------|
| **Start Date** | `ReceivedDate` | When project was received |
| **Prelim Submission Date** | `PrelimSubmitted` | When preliminary package submitted |
| **Prelim Approved Date** | `PrelimApprovedDate` | When preliminary approved |
| **Delivered Date** | `DeliveredDate` | When final package delivered |
| **Design Verified Date** | `DesignVerifiedSent` | When design verification sent |
| **Canceled Date** | `CanceledDate` | When project was canceled |
| **As-Build Complete** | `As_x002d_BuildComplete` | When as-built drawings completed |
| **PowerWalk Complete** | `PowerWalkComplete` | When power walk finished |
| **Final Stake** | `FinalStake` | When final staking completed |
| **PPD Complete Date** | `PPDCompleteDate` | Preliminary package design complete |
| **CRD** | `CRD` | Customer requested date |

#### Status-Specific End Dates

These fields track when a project exits each status stage. They are automatically populated by Power Automate flows when the status changes:

| Display Name | Internal Name | Populated When Leaving Status |
|-------------|---------------|-------------------------------|
| **KMZ Creation End Date** | `KMZCreationEndDate` | KMZ Creation |
| **PPD End** | `PPDEnd` | Prelim Package Development |
| **Prelim Final Review End Date** | `PrelimFinalReviewEndDate` | Prelim Final Review |
| **AEGIS Design End** | `AEGISDesignEnd` | AEGIS Design |
| **AEGIS QA End** | `AEGISQAEnd` | AEGIS QA |
| **Final Package Review End Date** | `FinalPackageReviewEndDate` | Final Package Review |
| **Final Oncor Approval End Date** | `FinalOncorApprovalEndDate` | Pending Final Oncor Approval |
| **Construction End Date** | `ConstructionEndDate` | Pending Construction |
| **As-Built Needed End Date** | `AsBuiltNeededEndDate` | As-Built Needed |
| **Complete End Date** | `CompleteEndDate` | Complete |

**Note:** Not all statuses have corresponding End Date fields. Statuses like "Hold - Customer", "Hold - Documents", "Hold - Permits", "Hold - DASH", and "Canceled" do not have dedicated End Date tracking fields.

### Permit Fields

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **Permit Type** | `PermitTypeReq_x003f_` | Multiple Choice | Can select multiple: CITY, COUNTY, TXDOT, Army Corp, Eng. Corp, Railroad, TLINE, Easement, FAA, N/A |
| **Permit Submitted** | `PermitSubmitted` | Date | When permit application submitted |
| **Permit Received** | `PermitReceived` | Date | When permit was received/approved |

### Equipment Tracking

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Equipment** | `Equipment` | Text | Equipment description/notes |
| **Equipment Order Date** | `EquipmentOrderDate` | Date | When equipment was ordered |

### As-Built Tracking

| Field Name | Internal Name | Type | Default | Description |
|-----------|---------------|------|---------|-------------|
| **As-Build Required?** | `As_x002d_BuildRequired_x003f_` | Yes/No | No (unchecked) | Whether as-built drawings are needed |
| **As-Build Complete** | `As_x002d_BuildComplete` | Date | - | When as-built drawings completed |

### Links & Documentation

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **SharePoint Link** | `SharePointLink` | Hyperlink | Link to project folder/documents |

### Notes

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Notes** | `Notes` | Multi-line text | Project notes and comments |

### System Fields (Automatic)

These fields are automatically managed by SharePoint:

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **ID** | `ID` | Counter | Unique item number (auto-assigned) |
| **Created** | `Created` | Date/Time | When item was created |
| **Modified** | `Modified` | Date/Time | Last modification time |
| **Created By** | `Author` | Person | Who created the item |
| **Modified By** | `Editor` | Person | Who last modified the item |
| **Version** | `_UIVersionString` | Text | Current version number |
| **Attachments** | `Attachments` | Attachments | Whether item has attachments |

---

## Setting Up Views

Views help you filter, sort, and organize the list data for different purposes. Here's how to create useful views for the EV Team Tracker.

### How to Create a New View

1. Click the view dropdown (next to current view name)
2. Select **Create new view**
3. Choose **Standard view**
4. Name your view descriptively
5. Configure columns, filters, and sorting
6. Click **OK**

### Recommended View Types

#### All Items Overview

Complete list for general tracking.

**Setup:**
1. Name: "All Items"
2. **Columns to include:**
   - WO Number, Status, Designer, Field Tech
   - Location Type, Oncor UD, Customer
   - Start Date, Delivered Date
   - Permit Type, SharePoint Link, Equipment
   - Status Changed Date
3. **Filter:** None (shows everything)
4. **Sort by:** Status Changed Date (descending) or Status
5. **Row limit:** 30-50 for performance

#### New Job Entry

Streamlined view for adding projects.

**Setup:**
1. Name: "New Job Entry"
2. **Columns to include:**
   - WO Number, Status, Designer, Field Tech
   - Oncor UD, Customer, Start Date
   - Location Type, CRD, TS SOW
   - Permit Type, Equipment
3. **Filter:** None
4. **Sort by:** Start Date (descending) - newest first

#### My Projects (Designer)

Personal view filtered by designer.

**Setup:**
1. Name: Your name or "My Projects"
2. **Columns to include:**
   - WO Number, Status, Customer
   - Start Date, Delivered Date
   - Permit Type, Status Changed Date
3. **Filter:** Designer equals [Me] or your specific name
4. **Sort by:** Status or Start Date

#### My Projects (Field Tech)

Personal view filtered by field technician.

**Setup:**
1. Name: "Field Tech - [Name]"
2. **Columns to include:**
   - WO Number, Status, Designer, Customer
   - Start Date, Location Type
   - PowerWalk Complete, Final Stake
3. **Filter:** Field Tech equals [Me] or specific name
4. **Sort by:** Status or Start Date

#### Active Projects Only

Excludes completed and canceled.

**Setup:**
1. Name: "Active Projects"
2. **Columns to include:** Same as All Items
3. **Filter:**
   - Status not equal to "Complete"
   - AND Status not equal to "Canceled"
4. **Sort by:** Status Changed Date (descending)

#### Projects On Hold

Shows all held projects.

**Setup:**
1. Name: "On Hold"
2. **Columns to include:**
   - WO Number, Status, Designer, Field Tech
   - Customer, Notes, Status Changed Date
3. **Filter:** Status contains "Hold"
4. **Sort by:** Status Changed Date (ascending) - oldest holds first

#### Permit Tracking

Focus on permit-related fields.

**Setup:**
1. Name: "Permit Tracking"
2. **Columns to include:**
   - WO Number, Status, Customer
   - Permit Type, Permit Submitted, Permit Received
   - Designer, Notes
3. **Filter:** Permit Type is not blank AND Permit Type not equal to "N/A"
4. **Sort by:** Permit Submitted (ascending)

#### By Customer

Create views for specific customers.

**Setup:**
1. Name: "Tesla Projects" (or other customer)
2. **Filter:** Customer equals "Tesla"
3. Include relevant columns for that customer's workflow

#### By Status Stage

Create views for specific workflow stages.

**Setup:**
1. Name: "AEGIS Design Queue"
2. **Filter:** Status equals "AEGIS Design"
3. **Columns:** Focus on design-relevant fields
4. **Sort by:** Start Date (ascending) - oldest first

### View Best Practices

**Naming conventions:**
- Personal views: Use your name or role
- Status views: Name after the status (e.g., "In AEGIS QA")
- Customer views: Use customer name

**Column selection:**
- Include Status Changed Date to see activity
- Include SharePoint Link for quick folder access
- Limit columns to 10-12 for readability

**Filtering tips:**
- Use [Me] token for personal views
- Combine status filters with date filters
- Filter by Location Type (ONSITE/OFFSITE) for focused work

**Sorting tips:**
- Sort by Start Date for workload prioritization
- Sort by Status Changed Date to see recent activity
- Sort by Customer for grouped work

**Public vs. Private:**
- Make team-wide views public
- Personal assignment views can be private
- Customer-specific views should be public for the team

---

## How to Make Common Changes

### Adding a New Status Option

**Steps:**
1. Go to **List Settings**
2. Click on the **Status** field
3. Scroll to "Type each choice on a separate line"
4. Add your new status at the appropriate position
5. Click **OK**

**⚠️ IMPACT:**
- The new status will be available immediately
- Existing items are not affected
- Any Power Automate flows that reference status values may need updating
- Consider where in the workflow the new status fits

### Changing Customer List

**Steps:**
1. Go to **List Settings**
2. Click on the **Customer** field
3. Add/remove/edit customer names in the choice list
4. Click **OK**

**⚠️ IMPACT:**
- If you delete a customer that's currently used in items, those items will show the deleted value
- The deleted value will no longer appear in the dropdown for new items
- Items with deleted values won't break, but you can't select that value again

**Best Practice:** Don't delete customers that are in use. Instead, add "(INACTIVE)" to the end of the name.

### Adding a New Column

**Steps:**
1. Click **+ Add column** at the top of the list
2. Choose the column type (Text, Number, Date, etc.)
3. Name your column
4. Configure settings (Required? Default value?)
5. Click **Save**

**⚠️ IMPACT:**
- New column appears at the end of all views
- Existing items will have blank values for the new column
- Required columns will prevent users from editing old items until the field is filled

**Best Practice:** Don't make new columns required unless absolutely necessary. Retroactively filling data is time-consuming.

### Modifying Views

#### To add a column to a view:
1. Open the view you want to modify
2. Click **Edit view** (gear icon > Edit current view)
3. In the "Columns" section, check the box next to the column you want to add
4. Use the "Position from Left" dropdown to set column order
5. Click **OK**

#### To create a new view:
1. Click **Create new view**
2. Choose **Standard view**
3. Name your view
4. Select which columns to display
5. Add filters if needed (example: Status equals "In Progress")
6. Set sort order
7. Click **OK**

**⚠️ IMPACT:**
- Views are personal by default (only you see them) unless you set "Make this view public"
- Creating new views doesn't affect existing data
- Too many views can confuse users

### Changing Field Names

**⚠️ CRITICAL:** Changing a field's **display name** is safe. Changing the **internal name** is impossible after creation.

**To change display name:**
1. Go to **List Settings**
2. Click on the field name
3. Change "Column name"
4. Click **OK**

**⚠️ IMPACT:**
- Display name changes appear immediately in all views
- Internal name (like `ReceivedDate`) stays the same
- **Power Automate flows use internal names** - they won't break when display names change
- Views need to be checked to ensure proper column display

---

## Understanding Field Dependencies

### What Happens When You Change Status

The list likely has **Power Automate flows** that watch for status changes. When you change the Status field:

1. **Previous Status** field is updated with the old status
2. **Status Changed Date** is set to today
3. The appropriate **[Status] End Date** field is updated
4. Email notifications may be sent to assigned people

**Example Flow:**
```
When Status changes to "Complete"
→ Set "Complete End Date" to today
→ Set "Previous Status" to old status value
→ Send email to Designer and Field Tech
```

### Required Field Combinations

Some fields work together:

- If **As-Build Required?** is checked, you should fill **As-Build Complete** when done
- If **Permit Type** is selected, you should track **Permit Submitted** and **Permit Received** dates
- **Start Date** should be earlier than **Delivered Date**

### Calculated Fields

None of the fields in this list are calculated (they don't auto-compute values based on other fields).

---

## Troubleshooting

### "This item cannot be saved because required fields are blank"

**Solution:** Fill in these required fields:
- Job Name
- Start Date
- Field Tech
- Designer
- Oncor UD
- TS SOW
- Customer

### "I can't find my item in the list"

**Possible causes:**
1. You're looking at a filtered view - click "All Items" view
2. Item is on another page - use the pagination controls at the bottom
3. Search for the WO Number in the search box at the top

### "The dropdown list is too long to find what I need"

**Solutions:**
1. Type the first few letters in the dropdown to filter
2. Use Ctrl+F in the dropdown (works in some browsers)
3. Ask your admin to organize choices into categories or shorten the list

### "I changed a field but the change didn't save"

**Possible causes:**
1. You clicked away before clicking Save
2. A validation rule prevented the save
3. You don't have Edit permissions
4. The item is checked out to another user

**Solution:** Try editing again and look for error messages. Check with your list admin about permissions.

### "I want to bulk update 50 items"

**Option 1: Quick Edit**
1. Click **Edit in grid view** (or Quick Edit)
2. Make changes directly in the spreadsheet-like view
3. Changes save automatically as you move between cells

**Option 2: Power Automate**
- For complex bulk updates, ask your admin to create a Power Automate flow

**Option 3: Dataverse or Excel Export**
- Export to Excel, make changes, and import back (advanced - risk of data loss)

---

## Best Practices

### Daily Use

✅ **DO:**
- Update Status as projects move through workflow
- Fill in dates when milestones are completed
- Add notes explaining holds or issues
- Attach supporting documents when needed

❌ **DON'T:**
- Delete items (mark as Canceled instead)
- Change completed dates retroactively without notes
- Leave Status blank on active projects
- Use Status for comments (use the Notes field)

### Data Quality

✅ **DO:**
- Use consistent naming for Job Names
- Select the correct Oncor UD from the list (don't approximate)
- Fill Equipment field with specific details
- Update SharePoint Link when project folders are created

❌ **DON'T:**
- Enter free-text when a dropdown exists
- Create duplicate entries
- Use abbreviations that others won't understand
- Skip required fields by entering placeholder data

### Making Changes to List Structure

✅ **DO:**
- Test changes in a copy of the list first
- Document what you changed and why
- Notify users before making major changes
- Check Power Automate flows after making changes

❌ **DON'T:**
- Delete columns that are in use
- Make too many fields required
- Change field types (Text to Number, etc.) without planning
- Remove dropdown choices that are actively used

---

## Key Internal Names Reference

When working with Power Automate or other integrations, use these **internal names**:

| Display Name | Internal Name |
|-------------|---------------|
| Job Name | `ProjectName` |
| Start Date | `ReceivedDate` |
| Location Type | `JobType` |
| Oncor UD | `OncorUD` |
| As-Build Required? | `As_x002d_BuildRequired_x003f_` |
| As-Build Complete | `As_x002d_BuildComplete` |
| Permit Type | `PermitTypeReq_x003f_` |
| TS SOW | `TSSOW` |

**Note:** Internal names with `_x002d_` represent hyphens, and `_x003f_` represents question marks.

---

## Getting Help

### Where to Find More Information

1. **SharePoint List Settings**: Click gear icon > List settings
2. **Version History**: Open any item > Version History (to see all changes)
3. **List Permissions**: List Settings > Permissions for this list
4. **Microsoft Learn**: [Microsoft Lists documentation](https://support.microsoft.com/en-us/office/get-started-with-microsoft-lists-10b12560-fb20-471e-9258-773aec6a4a2f)

### Who to Contact

- **List Owner**: Check List Settings > Permissions to see who has Full Control
- **Power Platform Admin**: For Power Automate flow issues
- **SharePoint Admin**: For permissions, storage, and advanced settings

---

---

## Related Documentation

📘 **[Automation Guide](automation)** - Explains all the Power Automate flows that run automatically on this list, including:
- Status Change Logger (records every status change to an Excel log, calculates time in each status, and updates Previous Status tracking)

📊 **[Excel Info](excel-info)** - Power Query M Code documentation for the EV PM Tracker Excel file

---

**Last Updated:** February 19, 2026  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/EV Team Tracker/`  
**Schema Export Date:** February 18, 2026 (from `EV Team Tracker-Schema-20260218-114149.json`)
