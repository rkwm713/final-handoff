# Drafting Team Tracker - Excel & Power Query Guide

> **For users who work with the Drafting PM Tracker Excel file or need to understand the Power Query connections**
> 
> This guide explains how Excel connects to the Drafting Team Tracker SharePoint list, how the M Code query works, and how to troubleshoot data refresh issues.

---

## Table of Contents

1. [Overview](#overview)
2. [Excel PM Tracker File](#excel-pm-tracker-file)
3. [Power Query Connection](#power-query-connection)
4. [M Code Reference](#m-code-reference)
5. [Refreshing Data](#refreshing-data)
6. [Troubleshooting](#troubleshooting)
7. [Making Changes](#making-changes)

---

## Overview

### How It Works

The Drafting PM Tracker Excel file uses **Power Query** (also called "Get & Transform") to pull data directly from the SharePoint list. This means:

- Data is **live** - refresh to get the latest from SharePoint
- No manual copy/paste needed
- Reports and pivot tables update automatically
- Changes in SharePoint appear in Excel after refresh

### Key Components

| Component | Purpose |
|-----------|---------|
| **Drafting PM Tracker.xlsx** | The main Excel workbook with Drafting project data |
| **Power Query Connection** | Behind-the-scenes query that fetches SharePoint data |
| **M Code** | The programming language Power Query uses |

### What Makes Drafting Different

The Drafting Tracker query has some unique characteristics:

- Uses **`Table.SelectColumns`** to pick specific columns (instead of removing unwanted ones)
- Uses **`MissingField.Ignore`** to handle columns that may not exist
- **Renames columns** to user-friendly display names
- Expands **5 person fields** (Requestor, Your PM, Your PC, Assigned Drafter, Created By)
- Connects by **list GUID**: `cf6eb2e2-0e49-4bd4-a896-6c8d643b816e`

---

## Excel PM Tracker File

### File Location

The Drafting PM Tracker Excel file is typically stored at:

```
M Code/Drafting PM Tracker.xlsx
```

### What's In The File

The Excel workbook contains:

1. **Drafting Projects Table** - All Drafting Team Tracker items from SharePoint
2. **Pivot Tables/Charts** - Summary reports and visualizations
3. **Power Query Connection** - Data connection (hidden by default)

### Key Columns Available

After Power Query processing, these columns are available for reporting:

| Column | Type | Description |
|--------|------|-------------|
| WO Number | Text | Work order number (from Title field) |
| Need Date | Date | Requested completion date |
| Design Group | Text | Design group assignment |
| Requestor | Text | Person who submitted the request |
| Your PM | Text | Project Manager name |
| Your PC | Text | Project Coordinator name |
| Request Type | Text | Type of drafting work |
| # Work Stations | Number | Number of work stations/poles |
| High Priority | Yes/No | Whether marked as high priority |
| Assigned Drafter | Text | Assigned drafter name |
| Status | Text | Current status |
| Start Date | Date | When work began |
| Hold Start Date | Date | When put on hold |
| Hold End Date | Date | When resumed from hold |
| Delivered Date | Date | When delivered |
| Canceled Date | Date | When canceled |
| RULIS Status | Text | TxDOT RULIS tracking status |
| RULIS Submission Date | Date | When submitted to RULIS |
| RULIS Application Number | Text | RULIS tracking number |
| RULIS Additional Info Req. | Text | Additional info needed |
| Client | Text | Client name |
| Created By | Text | Who created the work order |
| Created | DateTime | When created |
| Modified | DateTime | Last modification time |

### Columns Removed from Output

The query removes these columns to keep the output clean:

- Scope of Work (large text field)
- High Priority Reason (large text field)
- Drafting PC (static email)
- TxDOT Docs Link (URL field)
- WO Name (often redundant with WO Number)
- High Priority Approved? (internal workflow field)

---

## Power Query Connection

### Query Structure

The Drafting Tracker uses a single query with selective column picking:

| Step | Operation | What It Does |
|------|-----------|--------------|
| 1 | SharePoint Connection | Connects to list by GUID |
| 2 | Select Specific Columns | Uses `Table.SelectColumns` to pick only needed columns |
| 3 | Expand Person Fields | Expands 5 person columns to get display names |
| 4 | Transform & Rename | Converts dates and renames columns for readability |
| 5 | Remove Extra Columns | Final cleanup of system columns |

### Connection Method

The query connects by **list GUID**:

```powerquery
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [ApiVersion = 15]),
DraftingTracker = Source{[Id="cf6eb2e2-0e49-4bd4-a896-6c8d643b816e"]}[Items]
```

**SharePoint List GUID:** `cf6eb2e2-0e49-4bd4-a896-6c8d643b816e`

### MissingField.Ignore

The query uses `MissingField.Ignore` which means:
- If a column doesn't exist in SharePoint, the query doesn't fail
- Useful when columns are added/removed from SharePoint
- Missing columns simply won't appear in the output

---

## M Code Reference

### What is M Code?

M Code is the programming language that Power Query uses. Each query is written in M Code, which you can view and edit in the **Advanced Editor**.

### Viewing M Code

1. Open Excel
2. Go to **Data** tab → **Queries & Connections**
3. Right-click the query → **Edit**
4. In Power Query Editor: **View** → **Advanced Editor**

### Complete Drafting Tracker Query

```powerquery
// Drafting Team Tracker Query
// PURPOSE: Connect to Drafting Team Tracker SharePoint list and transform for reporting
// DEPENDENCIES: None
// OUTPUT: Cleaned data with expanded person fields, renamed columns, proper date types
// SHAREPOINT LIST GUID: cf6eb2e2-0e49-4bd4-a896-6c8d643b816e
let
    // Connect to SharePoint using ApiVersion 15
    Source = SharePoint.Tables(
        "https://techservltd.sharepoint.com/sites/OncorDesign", 
        [ApiVersion = 15]
    ),
    
    // Select the Drafting Team Tracker list by its unique GUID
    // NOTE: If list is recreated, this GUID will change!
    DraftingTracker = Source{[Id="cf6eb2e2-0e49-4bd4-a896-6c8d643b816e"]}[Items],
    
    // Select only the columns we need (in the order we want them)
    // MissingField.Ignore prevents errors if columns don't exist
    SelectColumns = Table.SelectColumns(DraftingTracker, {
        "Title",                    // WO Number
        "WOName",                   // WO Name
        "NeedDate",                 // Need Date
        "DesignGroup",              // Design Group
        "RequestType",              // Request Type
        "WorkStations",             // # Work Stations
        "ScopeOfWork",              // Scope of Work
        "Status",                   // Status
        "RULISStatus",              // RULIS Status
        "HighPriority",             // High Priority
        "HighPriorityReason",       // High Priority Reason
        "HighPriorityApproved",     // High Priority Approved?
        "StartDate",                // Start Date
        "DeliveredDate",            // Delivered Date
        "HoldStartDate",            // Hold Start Date
        "HoldEndDate",              // Hold End Date
        "CanceledDate",             // Canceled Date
        "RULISSubmissionDate",      // RULIS Submission Date
        "RULISApplicationNumber",   // RULIS Application Number
        "RULISAdditionalInfoReq",   // RULIS Additional Info Req.
        "TxDOTDocsLink",            // TxDOT Docs Link
        "DraftingPC",               // Drafting PC
        "Client",                   // Client
        "Created",                  // Created date
        "Modified",                 // Modified date
        "Requestor",                // Requestor (Person)
        "YourPM",                   // Your PM (Person)
        "YourPC",                   // Your PC (Person)
        "AssignedDrafter",          // Assigned Drafter (Person)
        "Author"                    // Created By (Person)
    }, MissingField.Ignore),
    
    // Expand person columns - extract the "Title" (display name) from each
    // Person fields in SharePoint are stored as records with multiple properties
    #"Expanded Requestor" = Table.ExpandRecordColumn(
        SelectColumns, "Requestor", {"Title"}, {"Requestor"}
    ),
    #"Expanded YourPM" = Table.ExpandRecordColumn(
        #"Expanded Requestor", "YourPM", {"Title"}, {"Your PM"}
    ),
    #"Expanded YourPC" = Table.ExpandRecordColumn(
        #"Expanded YourPM", "YourPC", {"Title"}, {"Your PC"}
    ),
    #"Expanded AssignedDrafter" = Table.ExpandRecordColumn(
        #"Expanded YourPC", "AssignedDrafter", {"Title"}, {"Assigned Drafter"}
    ),
    #"Expanded Author" = Table.ExpandRecordColumn(
        #"Expanded AssignedDrafter", "Author", {"Title"}, {"Created By"}
    ),
    
    // Convert date columns to proper Date type
    // Created and Modified are DateTime (include time component)
    #"Changed Types" = Table.TransformColumnTypes(#"Expanded Author", {
        {"NeedDate", type date},
        {"StartDate", type date},
        {"DeliveredDate", type date},
        {"HoldStartDate", type date},
        {"HoldEndDate", type date},
        {"CanceledDate", type date},
        {"RULISSubmissionDate", type date},
        {"Created", type datetime},
        {"Modified", type datetime}
    }),
    
    // Rename columns to user-friendly display names
    // MissingField.Ignore handles columns that may have been removed earlier
    #"Renamed Columns" = Table.RenameColumns(#"Changed Types", {
        {"Title", "WO Number"},
        {"WOName", "WO Name"},
        {"NeedDate", "Need Date"},
        {"DesignGroup", "Design Group"},
        {"RequestType", "Request Type"},
        {"WorkStations", "# Work Stations"},
        {"ScopeOfWork", "Scope of Work"},
        {"RULISStatus", "RULIS Status"},
        {"HighPriority", "High Priority"},
        {"HighPriorityReason", "High Priority Reason"},
        {"HighPriorityApproved", "High Priority Approved?"},
        {"StartDate", "Start Date"},
        {"DeliveredDate", "Delivered Date"},
        {"HoldStartDate", "Hold Start Date"},
        {"HoldEndDate", "Hold End Date"},
        {"CanceledDate", "Canceled Date"},
        {"RULISSubmissionDate", "RULIS Submission Date"},
        {"RULISApplicationNumber", "RULIS Application Number"},
        {"RULISAdditionalInfoReq", "RULIS Additional Info Req."},
        {"TxDOTDocsLink", "TxDOT Docs Link"},
        {"DraftingPC", "Drafting PC"}
    }, MissingField.Ignore),
    
    // Reorder columns for logical grouping:
    // Identification → Assignment → Request Details → Priority → Status → Dates → RULIS → Metadata
    #"Reordered Columns" = Table.ReorderColumns(#"Renamed Columns", {
        "WO Number", "WO Name", "Need Date", "Design Group", 
        "Requestor", "Your PM", "Your PC",
        "Request Type", "# Work Stations", "Scope of Work", 
        "High Priority", "High Priority Reason", "High Priority Approved?", 
        "Assigned Drafter", "Status", 
        "Start Date", "Delivered Date", "Hold Start Date", "Hold End Date", "Canceled Date", 
        "RULIS Status", "RULIS Submission Date", "RULIS Application Number", "RULIS Additional Info Req.", 
        "TxDOT Docs Link", "Drafting PC",
        "Client", "Created By", "Created", "Modified"
    }, MissingField.Ignore),
    
    // Remove large text fields that aren't needed for reports
    #"Removed Columns" = Table.RemoveColumns(#"Reordered Columns", {
        "Scope of Work",        // Large text - slows refresh
        "High Priority Reason"  // Large text - rarely needed in reports
    }),
    
    // Second reorder after removal
    #"Reordered Columns1" = Table.ReorderColumns(#"Removed Columns", {
        "WO Number", "WO Name", "Need Date", "Design Group", 
        "Requestor", "Your PM", "Your PC", 
        "Request Type", "# Work Stations", 
        "High Priority", "High Priority Approved?", 
        "Assigned Drafter", "Status", 
        "Start Date", "Hold Start Date", "Hold End Date", "Delivered Date", "Canceled Date", 
        "RULIS Status", "RULIS Submission Date", "RULIS Application Number", "RULIS Additional Info Req.", 
        "TxDOT Docs Link", "Drafting PC", 
        "Client", "Created By", "Created", "Modified"
    }),
    
    // Final cleanup - remove additional columns not needed for reporting
    #"Removed Columns1" = Table.RemoveColumns(#"Reordered Columns1", {
        "Drafting PC",              // Static email address
        "TxDOT Docs Link",          // URL field - not useful in Excel
        "WO Name",                  // Often redundant with WO Number
        "High Priority Approved?"   // Internal workflow field
    })
in
    #"Removed Columns1"
```

### Key M Code Patterns

#### Selective Column Picking

Unlike other trackers that remove unwanted columns, Drafting selects only the columns it needs:

```powerquery
SelectColumns = Table.SelectColumns(DraftingTracker, {
    "Title", "WOName", "NeedDate", ...
}, MissingField.Ignore)
```

**Advantage:** Query doesn't break if new columns are added to SharePoint

#### Expanding Multiple Person Fields

The query expands 5 different person fields:

```powerquery
// Each person field needs its own ExpandRecordColumn step
#"Expanded Requestor" = Table.ExpandRecordColumn(
    SelectColumns, "Requestor", {"Title"}, {"Requestor"}
),
#"Expanded YourPM" = Table.ExpandRecordColumn(
    #"Expanded Requestor", "YourPM", {"Title"}, {"Your PM"}
),
// ... and so on for YourPC, AssignedDrafter, Author
```

#### Column Renaming

Internal SharePoint names are converted to display names:

```powerquery
#"Renamed Columns" = Table.RenameColumns(#"Changed Types", {
    {"Title", "WO Number"},
    {"WOName", "WO Name"},
    {"NeedDate", "Need Date"},
    // ... more renames
}, MissingField.Ignore)
```

---

## Refreshing Data

### Manual Refresh

1. Open the Excel file
2. Go to **Data** tab
3. Click **Refresh All**
4. Wait for query to complete (may take 30-60 seconds)

### Automatic Refresh

To enable automatic refresh on file open:

1. Go to **Data** tab → **Queries & Connections**
2. Right-click the query → **Properties**
3. Check "Refresh data when opening the file"
4. Click **OK**

### Refresh Errors

If refresh fails, common causes include:

| Error | Cause | Solution |
|-------|-------|----------|
| "Access denied" | Not logged into SharePoint | Sign in via Data → Get Data → From SharePoint |
| "List not found" | List was deleted/recreated | Update the GUID in M Code |
| "Column not found" | Column removed from SharePoint | Query should handle this with MissingField.Ignore |
| "Cannot convert to Date" | Invalid date values in SharePoint | Check source data for errors |

---

## Troubleshooting

### Data Not Updating

1. **Check your connection**: Data → Queries & Connections → verify no errors
2. **Clear credentials**: File → Options → Privacy → Clear Credentials
3. **Reconnect**: Data → Get Data → Data Source Settings → Edit Permissions

### Person Fields Showing [Record]

If person columns show `[Record]` instead of names:

1. The ExpandRecordColumn step may have failed
2. Edit the query and verify the person expansion steps
3. Re-expand selecting the `Title` field

### Missing Columns

Thanks to `MissingField.Ignore`, missing columns won't cause errors. However, if you need a column that's missing:

1. Check if the column exists in SharePoint
2. Check if it's in the `Table.SelectColumns` list
3. Check if it's in `Table.RemoveColumns` (being removed)

### RULIS Fields Empty for Non-TxDOT Items

This is expected behavior. RULIS fields only apply to TxDOT Permit requests:

- RULIS Status
- RULIS Submission Date
- RULIS Application Number
- RULIS Additional Info Req.

These will be blank/null for other Request Types.

### Date Columns Showing Wrong Format

If dates appear as numbers or in wrong format:

1. Edit the query in Power Query Editor
2. Select the date column
3. Change data type: Transform → Data Type → Date
4. Or verify the column is in the `#"Changed Types"` step

---

## Making Changes

### Adding a New Column

If a new column is added to SharePoint and you want it in Excel:

1. Open Power Query Editor
2. Find the `Table.SelectColumns` step
3. Add the column's **internal name** to the list
4. Add a rename entry in `Table.RenameColumns` if needed
5. Add to `Table.ReorderColumns` to position it
6. Add type transformation if it's a date

### Removing a Column

To hide a column from the Excel output:

1. Open Power Query Editor
2. Either:
   - Remove from `Table.SelectColumns` list, OR
   - Add to the `Table.RemoveColumns` step

### Changing Column Order

1. Open Power Query Editor
2. Find the `Table.ReorderColumns` step
3. Rearrange the column names in the list

### Updating the SharePoint List GUID

If the SharePoint list is recreated:

1. Get the new GUID using PnP PowerShell:
   ```powershell
   Connect-PnPOnline -Url "https://techservltd.sharepoint.com/sites/OncorDesign" -UseWebLogin
   Get-PnPList -Identity "Drafting Team Tracker" | Select Id
   Disconnect-PnPOnline
   ```
2. Open the query in Advanced Editor
3. Find this line:
   ```powerquery
   DraftingTracker = Source{[Id="cf6eb2e2-0e49-4bd4-a896-6c8d643b816e"]}[Items]
   ```
4. Replace the old GUID with the new one
5. Save and refresh

### Adding a New Person Field

If SharePoint adds a new person field:

1. Add to `Table.SelectColumns` list
2. Add a new `Table.ExpandRecordColumn` step after the existing person expansions:
   ```powerquery
   #"Expanded NewPerson" = Table.ExpandRecordColumn(
       #"Previous Step", "NewPersonField", {"Title"}, {"New Person Display Name"}
   )
   ```
3. Update subsequent step references
4. Add to reorder step if needed

---

## Best Practices

### For Report Builders

- Always refresh data before generating reports
- Use the "Need Date" column for deadline tracking
- Filter by Status to show only active items
- Use Request Type to analyze workload by category

### For Query Editors

- Test changes on a copy of the file first
- Document any M Code changes with comments
- Keep `MissingField.Ignore` to prevent errors
- Back up the working M Code before making changes

### For Administrators

- Monitor for SharePoint schema changes
- If recreating the list, update the GUID immediately
- Keep track of which columns are selected vs. removed
- Consider impact on existing reports when renaming columns

---

## Column Reference

### Columns Selected from SharePoint

| Internal Name | Display Name | Type | Included in Output |
|--------------|--------------|------|-------------------|
| Title | WO Number | Text | ✅ Yes |
| WOName | WO Name | Text | ❌ Removed |
| NeedDate | Need Date | Date | ✅ Yes |
| DesignGroup | Design Group | Choice | ✅ Yes |
| RequestType | Request Type | Choice | ✅ Yes |
| WorkStations | # Work Stations | Number | ✅ Yes |
| ScopeOfWork | Scope of Work | Text | ❌ Removed |
| Status | Status | Choice | ✅ Yes |
| RULISStatus | RULIS Status | Choice | ✅ Yes |
| HighPriority | High Priority | Yes/No | ✅ Yes |
| HighPriorityReason | High Priority Reason | Text | ❌ Removed |
| HighPriorityApproved | High Priority Approved? | Yes/No | ❌ Removed |
| StartDate | Start Date | Date | ✅ Yes |
| DeliveredDate | Delivered Date | Date | ✅ Yes |
| HoldStartDate | Hold Start Date | Date | ✅ Yes |
| HoldEndDate | Hold End Date | Date | ✅ Yes |
| CanceledDate | Canceled Date | Date | ✅ Yes |
| RULISSubmissionDate | RULIS Submission Date | Date | ✅ Yes |
| RULISApplicationNumber | RULIS Application Number | Text | ✅ Yes |
| RULISAdditionalInfoReq | RULIS Additional Info Req. | Text | ✅ Yes |
| TxDOTDocsLink | TxDOT Docs Link | URL | ❌ Removed |
| DraftingPC | Drafting PC | Text | ❌ Removed |
| Client | Client | Choice | ✅ Yes |
| Created | Created | DateTime | ✅ Yes |
| Modified | Modified | DateTime | ✅ Yes |
| Requestor | Requestor | Person | ✅ Yes (expanded) |
| YourPM | Your PM | Person | ✅ Yes (expanded) |
| YourPC | Your PC | Person | ✅ Yes (expanded) |
| AssignedDrafter | Assigned Drafter | Person | ✅ Yes (expanded) |
| Author | Created By | Person | ✅ Yes (expanded) |

---

## Related Documentation

- [Project Overview](overview) - Complete workflow from request to completion
- [User Guide](guide) - Field definitions and list usage
- [Automation Guide](automation) - Power Automate flows
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistants

---

**Last Updated:** February 19, 2026  
**Excel File:** `M Code/Drafting PM Tracker.xlsx`  
**SharePoint List GUID:** `cf6eb2e2-0e49-4bd4-a896-6c8d643b816e`
