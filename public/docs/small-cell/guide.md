# Small Cell Team Tracker - Maintenance and User Guide

> **For users with limited Microsoft List experience**
> 
> This guide explains how the Small Cell Team Tracker Microsoft List works, what each field does, and how to make changes safely.

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

The **Small Cell Team Tracker** is a Microsoft List for tracking small cell infrastructure projects from receipt through completion. Small cell projects typically involve telecommunications equipment installations on utility poles for AT&T, T-Mobile, Verizon, Crown Castle, and other wireless providers. The list contains **160 active projects** and was created on **October 8, 2024**.

### Key Statistics

- **Total Fields**: 54 columns
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
| **Title** | `Title` | Text | Work order number (Primary identifier) |
| **Site Name** | `SiteName` | Text | Name/identifier of the small cell site |

**Note:** Only 2 fields are strictly required, but best practice is to fill in all relevant fields for proper tracking.

### Project Identification

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Title** | `Title` | Text | Work order number (WO Number) - Required |
| **Site Name** | `SiteName` | Text | Site name/identifier - Required |
| **WR** | `WR` | Number | Work request number |

### Customer & Contractor Information

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **Customer** | `Customer` | Choice | AT&T, CITY OF FORT WORTH, CROWN CASTLE, EXTENET, ONCOR, T-MOBILE, VERIZON |
| **Subcontractor** | `Subcontractor` | Choice | 17 options (see below) |

#### Subcontractor Options

```
- 3DD&E
- B&T Group
- CITY OF FORT WORTH
- Crown Castle
- ExteNet
- Future Infrastructure
- Jacobs
- KGI Wireless
- MD7
- MTSI
- Oncor
- Pike
- PM&A
- TEP
- Tilson
- T-mobile
- Verticom
```

### Team Assignment

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Field Tech** | `FieldTech` | Person | Field technician assigned to the project |
| **Designer** | `Designer` | Person | Designer assigned to the project |
| **Oncor UD** | `OncorUD` | Choice | Oncor Utility Designer from dropdown list (24 options) |

#### Oncor UD Options

```
- Brandon Favors
- Brian Watson
- Brittany Garcia
- Charles Douglas
- Colten Dickerman
- Eddie Jordan
- Gladys Sosa
- Glenn Caldwell
- Isamar Hernandez
- Jason Escamilla
- Joel Vazquez
- Johnny Walker
- Jordan Reed
- Joseph Amador
- Josh Brown
- Josimar Palacios
- Katie Morton
- Mylea Farmer
- Mylea Long
- Phillip Green
- Ryan Folger
- Scott Anderson
- Scott Armstrong
- Summer Island
```

### Status Tracking

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **Status** | `Status` | Choice | Power Walk Needed, Katapult Design, Katapult QA, Fault Current, PC Review, Pending External Review and Approval, AEGIS Design, AEGIS QA, Final PC Review, Delivered, Complete, Hold - Documents, Hold - Permits, Hold - External, Canceled |
| **Previous Status** | `PreviousStatus` | Text | Auto-filled by automation when status changes |
| **WaAM Status** | `WaAMStatus` | Choice | APPR, ARCHIVED, HOLD, INDESIGN, INIT, INPROG, INSERVICE, PENDCAN, WFIMWC, WORKCLOSE |

**Status Options Explained:**

- **Power Walk Needed**: Initial site survey/assessment required
- **Katapult Design**: Design in Katapult software
- **Katapult QA**: Quality assurance review in Katapult
- **Fault Current**: Fault current analysis stage
- **PC Review**: Project coordinator review
- **Pending External Review and Approval**: Submitted to customer/authority for approval
- **AEGIS Design**: Design work in AEGIS system
- **AEGIS QA**: Quality assurance in AEGIS
- **Final PC Review**: Final review before delivery
- **Delivered**: Design delivered to customer
- **Complete**: Project fully complete
- **Hold - Documents**: Waiting for documentation
- **Hold - Permits**: Waiting for permits
- **Hold - External**: Waiting on external party
- **Canceled**: Project canceled

> **Note: SPIDA Studio vs. Microsoft List**
> 
> **SPIDA Studio is completely separate from this Microsoft List.** There is no automatic connection between them - they are two independent systems that track the same projects.
> 
> - **Microsoft List** = Internal TechServ workflow (this list)
> - **SPIDA Studio** = External vendor system (managed by turf vendors)
> 
> For **Excel reporting only**, Steve can manually export data from SPIDA Studio and paste it into the `SC_SPIDA` tab in the Excel PM Tracker. Power Query then merges this with SharePoint data so you can compare statuses between systems. See [Excel Info](excel-info) for details on this process.

### Date Tracking

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Received Date** | `ReceivedDate` | Date | When project was received |
| **Delivered Date** | `DeliveredDate` | Date | When final design was delivered |
| **Canceled Date** | `CanceledDate` | Date | When project was canceled |

### Status-Specific End Dates

Each major status has an associated "End Date" field to track when that stage was completed:

| Display Name | Internal Name | Description |
|-------------|---------------|-------------|
| **Power Walk End Date** | `PowerWalkEndDate` | When power walk completed |
| **Katapult Design End Date** | `KatapultDesignEndDate` | When Katapult design completed |
| **Katapult QA End Date** | `KatapultQAEndDate` | When Katapult QA completed |
| **Fault Current End Date** | `FaultCurrentEndDate` | When fault current analysis completed |
| **PC Review End Date** | `PCReviewEndDate` | When PC review completed |
| **AEGIS Design End Date** | `AEGISDesignEndDate` | When AEGIS design completed |
| **AEGIS QA End Date** | `AEGISQAEndDate` | When AEGIS QA completed |
| **Final PC Review End Date** | `FinalPCReviewEndDate` | When final PC review completed |
| **Complete End Date** | `CompleteEndDate` | When project marked complete |
| **Hold - Documents End Date** | `HoldDocumentsEndDate` | When document hold ended |
| **Hold - Permits End Date** | `HoldPermitsEndDate` | When permit hold ended |
| **Hold - External End Date** | `HoldExternalEndDate` | When external hold ended |

### Project Details

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Work Points** | `WorkPoints` | Number | Number of work points/locations in the project |

### Permit Tracking

| Field Name | Internal Name | Type | Options |
|-----------|---------------|------|---------|
| **Permits** | `Permits` | Choice | CITY, COUNTY, TXDOT, Army Corp, Eng. Corp, Railroad, TLINE, Easement, FAA, N/A |
| **Permit Submitted** | `PermitSubmitted` | Date | When permit application submitted |
| **Permit Received** | `PermitReceived` | Date | When permit was received/approved |

### Links & Documentation

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **Small Cell WR Folder** | `SmallCellWRFolder` | Hyperlink | Link to project folder/documents |

### System Fields (Automatic)

| Field Name | Internal Name | Type | Description |
|-----------|---------------|------|-------------|
| **ID** | `ID` | Counter | Unique item number (auto-assigned) |
| **Created** | `Created` | Date/Time | When item was created |
| **Modified** | `Modified` | Date/Time | Last modification time |
| **Created By** | `Author` | Person | Who created the item |
| **Modified By** | `Editor` | Person | Who last modified the item |
| **Version** | `_UIVersionString` | Text | Current version number |

---

## Setting Up Views

Views help you filter, sort, and organize the list data for different purposes. Here's how to create useful views for the Small Cell Team Tracker.

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
   - WO Number, Status, Field Tech, Designer
   - Site Name, Oncor UD, Work Points
   - Received Date, Delivered Date
   - Permits, Permit Submitted, Permit Received
   - Previous Status, Small Cell WR Folder
3. **Filter:** None (shows everything)
4. **Sort by:** Received Date (descending) or Status
5. **Row limit:** 30 for performance

#### Personal Designer View

Shows only items assigned to a specific designer.

**Setup:**
1. Name: Designer's name (e.g., "John's Projects")
2. **Columns to include:**
   - WO Number, Status, Site Name
   - Work Points, Received Date, Delivered Date
   - Permits, Small Cell WR Folder
3. **Filter:** Designer equals [Me] or specific name
4. **Sort by:** Status or Received Date

#### Field Tech View

For field technician workload tracking.

**Setup:**
1. Name: "Field Crew" or specific tech name
2. **Columns to include:**
   - WO Number, Status, Site Name
   - Designer, Customer, Subcontractor
   - Work Points, Received Date
   - Power Walk End Date
3. **Filter:** Field Tech equals [Me] or specific name (optional)
4. **Sort by:** Status - prioritize "Power Walk Needed"

#### Job Entry View

Streamlined for adding new projects.

**Setup:**
1. Name: "Job Entry" or "New Small Cell Job"
2. **Columns to include:**
   - WO Number, WR, Field Tech, Designer
   - Site Name, Oncor UD, Customer, Subcontractor
   - Work Points, Received Date
   - Small Cell WR Folder, Status
3. **Filter:** None or Status equals "Power Walk Needed"
4. **Sort by:** Received Date (descending)

#### Active Projects Only

Excludes completed and canceled.

**Setup:**
1. Name: "Active Projects"
2. **Columns to include:** Same as All Items
3. **Filter:**
   - Status not equal to "Complete"
   - AND Status not equal to "Canceled"
4. **Sort by:** Status or Received Date

#### Projects On Hold

Shows all held projects for follow-up.

**Setup:**
1. Name: "On Hold"
2. **Columns to include:**
   - WO Number, Status, Site Name
   - Designer, Customer
   - Hold Start/End dates (if applicable)
   - Previous Status
3. **Filter:** Status contains "Hold"
4. **Sort by:** Status Changed Date (ascending)

#### By Customer

Create views for specific customers.

**Setup:**
1. Name: "AT&T Projects" (or other customer)
2. **Filter:** Customer equals "AT&T"
3. Include relevant columns
4. **Sort by:** Received Date or Status

#### By Status Stage

Create views for specific workflow stages.

**Setup:**
1. Name: "Katapult Design Queue"
2. **Filter:** Status equals "Katapult Design"
3. **Columns:** Focus on design-relevant fields
4. **Sort by:** Received Date (ascending) - oldest first

#### Permit Tracking

Focus on projects with permit requirements.

**Setup:**
1. Name: "Permit Tracking"
2. **Columns to include:**
   - WO Number, Status, Site Name
   - Permits, Permit Submitted, Permit Received
   - Customer, Designer
3. **Filter:** Permits is not blank AND Permits not equal to "N/A"
4. **Sort by:** Permit Submitted (ascending)

### View Best Practices

**Naming conventions:**
- Personal views: Use person's name
- Status views: Name after the status (e.g., "In AEGIS QA")
- Customer views: Use customer name
- Admin/utility views: Prefix with "zz" to sort to bottom

**Column selection:**
- Always include Status and Site Name for identification
- Include Small Cell WR Folder for quick document access
- Include Previous Status to see workflow progression
- Limit to 10-15 columns for readability

**Filtering tips:**
- Use [Me] token for personal assignment views
- Filter by Customer for customer-specific tracking
- Combine status filters (e.g., show all design stages)
- Filter out Complete and Canceled for active work views

**Sorting tips:**
- Sort by Received Date for workload prioritization (oldest first)
- Sort by Status for workflow-organized views
- Add secondary sort for same-status items

**Public vs. Private:**
- Team-wide views should be public
- Personal workload views can be private
- Make customer-specific views public for team coordination

---

## How to Make Common Changes

### Adding a New Customer

**Steps:**
1. Go to **List Settings**
2. Click on the **Customer** field
3. Add new customer name to the choice list
4. Keep list alphabetized for easy selection
5. Click **OK**

**⚠️ IMPACT:**
- New customer available immediately in dropdown
- No impact on existing items
- Consider if new customer needs special workflow or requirements

### Adding a New Subcontractor

**Steps:**
1. Go to **List Settings**
2. Click on **Subcontractor** field
3. Add new subcontractor to choices
4. Click **OK**

**⚠️ IMPACT:**
- Available immediately
- No effect on existing projects
- May want to coordinate with project management about rates/agreements

### Adding a New Status

**Steps:**
1. Go to **List Settings**
2. Click on **Status** field
3. Add new status to the choice list
4. Consider adding a corresponding "[Status] End Date" field
5. Click **OK**

**⚠️ IMPACT:**
- New status available immediately
- **Power Automate flows** that track status changes will need updating to handle the new status
- Consider where the new status fits in the workflow sequence
- Views won't automatically filter/group by new status

### Creating a Personal View for a Designer

**Steps:**
1. Click **Create new view**
2. Choose **Standard View**
3. Name it with designer's name (e.g., "John")
4. Select columns (use Erika or Charles views as template)
5. Add filter: **Designer** equals **[Specific User]**
6. Set Row Limit: 30
7. Make view public if others should see it
8. Click **OK**

**Result:** Personalized dashboard showing only that designer's projects

### Adding a New Column

**Example: Adding "Construction Start Date"**

1. Click **+ Add column** at the top of the list
2. Choose **Date and time**
3. Column name: "Construction Start Date"
4. Set to Optional (not required)
5. Default value: (leave blank)
6. Click **Save**

**⚠️ IMPACT:**
- New column appears at the end of existing views
- Existing items will have blank values
- Must manually add to views where needed
- Consider if Power Automate should populate this automatically

### Modifying Views

**To add a column to existing view:**
1. Open the view
2. Click **Edit view** (gear icon > Edit current view)
3. In "Columns" section, check box next to desired column
4. Set "Position from Left" to control order
5. Click **OK**

**To change view sorting:**
1. Edit the view
2. In "Sort" section, select column to sort by
3. Choose Ascending or Descending
4. Add secondary sort if needed
5. Click **OK**

---

## Understanding Field Dependencies

### Status Workflow

```
Power Walk Needed
    ↓
Katapult Design
    ↓
Katapult QA
    ↓
Fault Current
    ↓
PC Review
    ↓
Pending External Review and Approval
    ↓
AEGIS Design
    ↓
AEGIS QA
    ↓
Final PC Review
    ↓
Delivered
    ↓
Complete

Branches:
- Hold - Documents → Resume when docs received
- Hold - Permits → Resume when permits received
- Hold - External → Resume when external party responds
- Canceled → End
```

### What Happens When You Change Status

**Automatic actions (via Power Automate flows):**
1. **Previous Status** field is updated with the old status value
2. Corresponding **[Status] End Date** is set to today's date
3. Email notifications may be sent to assigned team members

**Manual updates needed:**
- Fill in any status-specific date fields
- Update WaAM Status if applicable
- Add notes about any issues or delays
- Update permit tracking if relevant

### Required Field Combinations

While only Title and Site Name are technically required, these field combinations should be filled together:

- **Customer** + **Subcontractor**: Always specify who the customer is and who you're working through
- **Field Tech** + **Designer**: Projects should have both assigned
- **Oncor UD**: Required if working with Oncor
- **Permits** + **Permit Submitted** + **Permit Received**: If permit selected, track submission and receipt
- **Received Date** should be earlier than **Delivered Date**

### WaAM Status Meanings

The WaAM Status field syncs with Oncor's Work and Asset Management system:

- **INIT**: Initiated
- **INDESIGN**: In design phase
- **INPROG**: In progress
- **HOLD**: On hold
- **APPR**: Approved
- **PENDCAN**: Pending cancellation
- **WFIMWC**: Waiting for in-service with construction
- **WORKCLOSE**: Work closing
- **INSERVICE**: In service
- **ARCHIVED**: Archived/completed

---

## Troubleshooting

### "I can't save because required fields are blank"

**Solution:** Fill in these required fields:
- **Title** (WO Number)
- **Site Name**

### "I don't see my projects in the list"

**Possible causes:**
1. You're looking at a filtered view (like "Erika" or "Charles") - switch to "All Items"
2. Projects are on another page - check pagination at bottom
3. Use search box to find by WO Number or Site Name

### "The dropdown has too many Oncor UDs to find the right one"

**Solutions:**
1. Type the first few letters in the dropdown to filter
2. Use Ctrl+F in the dropdown (browser dependent)
3. Ask admin to organize by region or team

### "Status changed but Previous Status didn't update"

**Likely cause:** Power Automate flow isn't running properly

**Solution:**
- Contact SharePoint admin to check flow status
- Manually update Previous Status as a workaround
- Check if flow failed in Power Automate history

### "Multiple people need to work on the same project"

**Note:** Designer and Field Tech fields can only hold one person each.

**Workarounds:**
1. Use the primary person in the field
2. Add notes about secondary people in Comments (if field exists)
3. Ask admin to convert fields to "Person (multi-select)" type (requires careful planning)

### "I need to track additional dates"

**Solution: Add new date columns**
1. Click **+ Add column**
2. Choose **Date and time**
3. Name it descriptively (e.g., "Pre-Construction Meeting Date")
4. Set as optional
5. Add to relevant views

---

## Best Practices

### Daily Use

✅ **DO:**
- Update Status as projects move through workflow stages
- Fill in End Date fields when completing each stage
- Keep Site Name consistent and descriptive
- Link Small Cell WR Folder when project folders are created
- Update permit tracking dates

❌ **DON'T:**
- Delete items (mark as Canceled instead)
- Skip status updates for long periods
- Use Status field for comments or notes
- Leave Delivered Date blank when delivering projects
- Guess at dates - leave blank if unknown

### Project Entry

✅ **DO:**
- Use Job Entry view for new projects
- Fill in WO Number (Title) and Site Name immediately
- Assign Field Tech and Designer promptly
- Set Received Date to actual receipt date
- Select correct Customer and Subcontractor
- Link to project folder (Small Cell WR Folder)

❌ **DON'T:**
- Create duplicate entries
- Use abbreviations others won't understand
- Leave assignment fields blank for active projects
- Skip WR number if available

### Data Quality

✅ **DO:**
- Use consistent naming for Site Names
- Enter accurate Work Points counts
- Select exact Oncor UD from list (don't approximate)
- Track all permit-related dates
- Keep WaAM Status synchronized with external systems

❌ **DON'T:**
- Enter free-text when dropdown exists
- Use vague site names
- Skip date tracking
- Mix up Customer vs Subcontractor

### Team Coordination

✅ **DO:**
- Use personal views (Erika, Charles) to track individual workloads
- Update Status regularly so team sees current progress
- Coordinate with Field Tech before advancing to field-dependent stages
- Communicate holds and blockers

❌ **DON'T:**
- Work on projects assigned to others without coordination
- Move to next status without completing current stage
- Leave projects in "Power Walk Needed" indefinitely
- Skip PC Review stages

---

## Key Internal Names Reference

When working with Power Automate or other integrations, use these **internal names**:

| Display Name | Internal Name |
|-------------|---------------|
| Title (WO Number) | `Title` |
| Site Name | `SiteName` |
| Field Tech | `FieldTech` |
| Designer | `Designer` |
| Oncor UD | `OncorUD` |
| Received Date | `ReceivedDate` |
| Delivered Date | `DeliveredDate` |
| Canceled Date | `CanceledDate` |
| Previous Status | `PreviousStatus` |
| Work Points | `WorkPoints` |
| Permits | `Permits` |
| Permit Submitted | `PermitSubmitted` |
| Permit Received | `PermitReceived` |
| WaAM Status | `WaAMStatus` |
| Small Cell WR Folder | `SmallCellWRFolder` |

---

## Common Scenarios

### Scenario 1: New Small Cell Project Received

**Steps:**
1. Open **Job Entry** view
2. Click **+ New**
3. Fill in required fields:
   - **Title**: WO Number
   - **Site Name**: Site identifier
4. Fill in assignment:
   - **Field Tech**
   - **Designer**
   - **Oncor UD**
5. Fill in details:
   - **Customer**
   - **Subcontractor**
   - **Work Points**
   - **Received Date**: Today
6. Set **Status**: Power Walk Needed
7. Add **Small Cell WR Folder** link if available
8. Click **Save**

### Scenario 2: Moving Through Design Stages

**Current Status:** Katapult Design  
**Goal:** Move to Katapult QA

**Steps:**
1. Complete design work in Katapult software
2. Open the project item in the list
3. Set **Katapult Design End Date**: Today
4. Change **Status**: Katapult QA
5. (Automatic: Previous Status updates to "Katapult Design")
6. Click **Save**
7. Notify QA team member

### Scenario 3: Project On Hold Waiting for Permits

**Current Status:** Pending External Review and Approval  
**Issue:** City permit not yet received

**Steps:**
1. Set **Permits**: CITY
2. Set **Permit Submitted**: (date you submitted)
3. Change **Status**: Hold - Permits
4. Set **Hold - Permits End Date**: (leave blank until resolved)
5. Click **Save**

**When permit received:**
1. Set **Permit Received**: Today
2. Set **Hold - Permits End Date**: Today
3. Change **Status** back to appropriate design stage
4. Click **Save**

### Scenario 4: Project Delivered

**Current Status:** Final PC Review  
**Goal:** Mark as delivered

**Steps:**
1. Verify all work is complete
2. Set **Final PC Review End Date**: Today
3. Change **Status**: Delivered
4. Set **Delivered Date**: Today
5. Verify **Small Cell WR Folder** link is present
6. Set **WaAM Status** as appropriate (likely WORKCLOSE or INSERVICE)
7. Click **Save**

---

## Tips for Different Roles

### For Field Technicians

**Your focus:** Power walks, site surveys, field verification

**Key fields to update:**
- Status (especially "Power Walk Needed")
- Power Walk End Date
- Notes about site conditions (if Comments field exists)

**Your views:**
- Field Crew view
- Filter by Field Tech = [Me]

### For Designers

**Your focus:** Katapult design, AEGIS work, QA

**Key fields to update:**
- Status through all design stages
- All relevant End Date fields
- Designer assignment
- Work Points accuracy

**Your views:**
- Personal view filtered by your name
- All Items for full project overview

### For Project Coordinators

**Your focus:** Oversight, reviews, delivery

**Key fields to update:**
- PC Review stages
- Final PC Review stages
- Oncor UD assignments
- WaAM Status synchronization

**Your views:**
- All Items (default)
- Job Entry for new project intake

---

## Getting Help

### Where to Find More Information

1. **List Settings**: Click gear icon > List settings
2. **Version History**: Open any item > Version History (to see all changes)
3. **List Permissions**: List Settings > Permissions for this list
4. **Microsoft Learn**: [Microsoft Lists documentation](https://support.microsoft.com/en-us/office/get-started-with-microsoft-lists-10b12560-fb20-471e-9258-773aec6a4a2f)

### Who to Contact

- **Small Cell Team Lead**: For workflow and assignment questions
- **List Owner**: Check List Settings > Permissions to see who has Full Control
- **Power Platform Admin**: For Power Automate flow issues
- **SharePoint Admin**: For permissions, storage, and advanced settings

---

## Workflow Diagram

```
[Project Received]
         ↓
   Status: Power Walk Needed
         ↓
   [Field Tech Surveys Site]
         ↓
   Status: Katapult Design
   [Designer works in Katapult]
         ↓
   Status: Katapult QA
   [QA Review]
         ↓
   Status: Fault Current
   [Fault Current Analysis]
         ↓
   Status: PC Review
   [PC Reviews Design]
         ↓
   Status: Pending External Review and Approval
   [Submitted to Customer/Authority]
         ↓
   Status: AEGIS Design
   [Design in AEGIS System]
         ↓
   Status: AEGIS QA
   [AEGIS QA Review]
         ↓
   Status: Final PC Review
   [Final Review Before Delivery]
         ↓
   Status: Delivered
   [Design Delivered to Customer]
         ↓
   Status: Complete
         ↓
     [Project Closed]

Parallel Hold Branches:
- Hold - Documents → Resume when docs received
- Hold - Permits → Resume when permits approved
- Hold - External → Resume when response received
- Canceled → End workflow
```

---

---

## Related Documentation

🗺️ **[Project Overview](overview)** - Complete end-to-end workflow from intake to completion, including who does what and when

📘 **[Automation Guide](automation)** - Explains all the Power Automate flows that run automatically on this list, including:
- Status End Date Tracker (automatically records the completion date for each project stage when you change status)

📊 **[Excel Info](excel-info)** - Power Query M Code documentation for the Small Cell PM Tracker Excel file, including SPIDA integration

🤖 **[AI Prompts](ai-prompts)** - Copy-paste prompts for getting AI help with Small Cell tracker tasks

---

**Last Updated:** February 19, 2026  
**List Location:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Small Cell Team Tracker/`  
**Schema Export Date:** February 18, 2026 (from `Small Cell Team Tracker-Schema-20260218-114149.json`)
