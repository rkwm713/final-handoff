# Closing Tracker - Excel & Power Query Guide

> **For users who work with the Closing PM Tracker Excel file or need to understand the Power Query connections**
> 
> This guide explains how Excel connects to the Closing Tracker SharePoint list, how the M Code query works, and how to troubleshoot data refresh issues.

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

The Closing PM Tracker Excel file uses **Power Query** (also called "Get & Transform") to pull data directly from the SharePoint list. This means:

- Data is **live** - refresh to get the latest from SharePoint
- No manual copy/paste needed
- Reports and pivot tables update automatically
- Changes in SharePoint appear in Excel after refresh

### Key Components

| Component | Purpose |
|-----------|---------|
| **Closing PM Tracker.xlsx** | The main Excel workbook with Closing project data |
| **Power Query Connection** | Behind-the-scenes query that fetches SharePoint data |
| **M Code** | The programming language Power Query uses |

### What Makes Closing Different

Unlike EV/Small Cell trackers that use list GUIDs, the Closing Tracker query:
- Uses **list title** ("Closing Tracker") instead of GUID
- Uses **Implementation 2.0** API version
- Expands multi-person `CLOSER` field differently (via `value` column)
- Handles multi-choice `BLOCKERS` field with text combination
- Tracks multiple **stage date pairs** (Start/End for SR, FCC, Variance, etc.)

---

## Excel PM Tracker File

### File Location

The Closing PM Tracker Excel file is typically stored at:

```
M Code/Closing PM Tracker.xlsx
```

### What's In The File

The Excel workbook contains:

1. **Closing Projects Table** - All Closing Tracker items from SharePoint
2. **Pivot Tables/Charts** - Summary reports and visualizations
3. **Power Query Connection** - Data connection (hidden by default)

### Key Columns Available

After Power Query processing, these columns are available for reporting:

| Column | Type | Description |
|--------|------|-------------|
| Title | Integer | Work order number |
| Closer | Text | Assigned closer name(s) |
| STATUS | Text | Current status (Processing, Finalizing, etc.) |
| CHECKPOINT | Text | Current checkpoint within status |
| STATUS CHANGED DATE | Date | When status last changed |
| INSERVICE DATE | Date | When work went into service |
| SOX TIMER | Integer | SOX compliance timer value |
| Last Touched | Date | Last time someone worked on this item |
| BLOCKERS | Text | Active blockers (comma-separated) |
| EXT CONTACT STATUS | Text | External contact tracking status |
| STATION COUNT | Number | Number of stations |
| DESIGN GROUP | Text | Design group assignment |
| INVOICE-TO | Text | Invoice contact |
| DAYS IN STATUS | Text | Days in current status |
| WIMS WR Number | Text | WIMS Work Request number |
| Personal notes | Text | Closer's personal notes |

### Stage Date Tracking Columns

| Stage | Start Column | End Column |
|-------|--------------|------------|
| Storeroom (SR) | SR Start | SR End |
| FCC | FCC Start | FCC End |
| Variance | Variance Start | Variance End |
| Batch Failure | BatchFailure Start | BatchFailure End |
| WFIMWC | WFIMWC Start | WFIMWC End |
| DASH | DASH Start | DASH End |

---

## Power Query Connection

### Query Structure

The Closing Tracker uses a single query that connects and transforms in one step:

| Query | Purpose | Output |
|-------|---------|--------|
| **Closing Tracker** | Connects to SharePoint and transforms data | Report-ready cleaned data |

**Data Flow:**

| Step | What Happens |
|------|--------------|
| 1 | Connect to SharePoint by list title |
| 2 | Select and transform columns |
| 3 | Output cleaned, formatted data for reporting |

### Connection Method

Unlike EV/Small Cell trackers that connect by GUID, the Closing query connects by **list title**:

```powerquery
// Connection by Title (not GUID)
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", 
    [Implementation="2.0", ViewMode="All"]),
ClosingTracker = Source{[Title="Closing Tracker"]}[Items]
```

**Advantages:**
- More readable and self-documenting
- Doesn't break if list is moved (only if renamed)

**Disadvantages:**
- Breaks if list is renamed
- Case-sensitive match required

### Query Transformations

The query performs these transformations:

1. **Remove System Columns** - Strips SharePoint metadata
2. **Reorder Columns** - Arranges for logical reporting
3. **Expand CLOSER** - Converts person field to text names
4. **Expand BLOCKERS** - Combines multi-choice to comma-separated text
5. **Convert Types** - Sets proper data types for dates and numbers

---

## M Code Reference

### What is M Code?

M Code is the programming language that Power Query uses. Each query is written in M Code, which you can view and edit in the **Advanced Editor**.

### Viewing M Code

1. Open Excel
2. Go to **Data** tab → **Queries & Connections**
3. Right-click the query → **Edit**
4. In Power Query Editor: **View** → **Advanced Editor**

### Complete Closing Tracker Query

```powerquery
// Closing Tracker Query
// PURPOSE: Connect to Closing Tracker SharePoint list and transform for reporting
// DEPENDENCIES: None
// OUTPUT: Cleaned data with expanded person/choice fields, proper date types
let
    // Connect to OncorDesign SharePoint site using Implementation 2.0
    // ViewMode="All" includes all items regardless of view filters
    Source = SharePoint.Tables(
        "https://techservltd.sharepoint.com/sites/OncorDesign", 
        [Implementation="2.0", ViewMode="All"]
    ),
    
    // Select the Closing Tracker list by its Title (not GUID)
    // NOTE: If list is renamed, this will break!
    ClosingTracker = Source{[Title="Closing Tracker"]}[Items],
    
    // Remove SharePoint system columns that aren't needed for reporting
    // Also removes some stage tracking columns that may be deprecated
    #"Removed columns" = Table.RemoveColumns(ClosingTracker, {
        "App Modified By", "App Created By", "Item is a Record", 
        "Label applied by", "Retention label Applied", "Retention label", 
        "Label setting", "Folder Child Count", "Item Child Count", 
        "Type", "Edit", "Attachments", "Version", "Modified By", 
        "Created By", "Created", "Modified", "Content Type", "ID", 
        "StatusOrder", "Comments", "FCC Status", "Storeroom Status", 
        "DM Start", "DM End", "Escalated Start", "Escalated End"
    }),
    
    // Reorder columns for logical reporting workflow
    // Groups: Assignment → Status → Dates → Details → Stage Tracking
    #"Reordered columns" = Table.ReorderColumns(#"Removed columns", {
        "CLOSER", "Title", "STATUS", "CHECKPOINT", "STATUS CHANGED DATE", 
        "INSERVICE DATE", "SOX TIMER", "Last Touched", "BLOCKERS", 
        "EXT CONTACT STATUS", "STATION COUNT", "DESIGN GROUP", "INVOICE-TO", 
        "BLOCKER", "Color Tag", "Compliance Asset Id", "DAYS IN STATUS", 
        "SR Start", "SR End", "FCC Start", "FCC End", "Variance Start", 
        "Variance End", "BatchFailure Start", "BatchFailure End", 
        "WFIMWC Start", "WFIMWC End", "DASH Start", "DASH End", 
        "WIMS WR Number", "Personal notes"
    }),
    
    // Remove additional metadata columns
    #"Removed columns 1" = Table.RemoveColumns(#"Reordered columns", {
        "Compliance Asset Id", "Color Tag"
    }),
    
    // Expand CLOSER multi-person field to get names
    // Multi-person fields in SharePoint are stored as tables with a "value" column
    #"Expanded CLOSER" = Table.ExpandTableColumn(
        #"Removed columns 1", "CLOSER", {"value"}, {"value"}
    ),
    
    // Rename the expanded column to "Closer" (cleaner name)
    #"Renamed columns" = Table.RenameColumns(
        #"Expanded CLOSER", {{"value", "Closer"}}
    ),
    
    // Convert Title (work order number) to integer type
    #"Changed column type 1" = Table.TransformColumnTypes(
        #"Renamed columns", {{"Title", Int64.Type}}
    ),
    
    // Expand BLOCKERS multi-choice field
    // Combines all selected blockers into comma-separated text
    // Handles null values (no blockers selected)
    #"Expanded BLOCKERS" = Table.TransformColumns(
        #"Changed column type 1", {
            {"BLOCKERS", each if _ is null then null 
                else Text.Combine(List.Transform(_, Text.From), ", "), 
                type text}
        }
    ),
    
    // Convert SOX TIMER to integer type
    #"Changed column type 2" = Table.TransformColumnTypes(
        #"Expanded BLOCKERS", {{"SOX TIMER", Int64.Type}}
    ),
    
    // Final column reorder - puts Title first, Closer second
    #"Reordered columns 1" = Table.ReorderColumns(#"Changed column type 2", {
        "Title", "Closer", "STATUS", "CHECKPOINT", "STATUS CHANGED DATE", 
        "INSERVICE DATE", "SOX TIMER", "Last Touched", "BLOCKERS", 
        "EXT CONTACT STATUS", "STATION COUNT", "DESIGN GROUP", "INVOICE-TO", 
        "BLOCKER", "DAYS IN STATUS", "SR Start", "SR End", "FCC Start", 
        "FCC End", "Variance Start", "Variance End", "BatchFailure Start", 
        "BatchFailure End", "WFIMWC Start", "WFIMWC End", "DASH Start", 
        "DASH End", "WIMS WR Number", "Personal notes"
    }),
    
    // Convert all date columns to proper Date type
    // This enables date filtering, sorting, and calculations in Excel
    #"Changed dates" = Table.TransformColumnTypes(#"Reordered columns 1", {
        {"STATUS CHANGED DATE", type date},
        {"INSERVICE DATE", type date},
        {"Last Touched", type date},
        {"SR Start", type date},
        {"SR End", type date},
        {"FCC Start", type date},
        {"FCC End", type date},
        {"Variance Start", type date},
        {"Variance End", type date},
        {"BatchFailure Start", type date},
        {"BatchFailure End", type date},
        {"WFIMWC Start", type date},
        {"WFIMWC End", type date},
        {"DASH Start", type date},
        {"DASH End", type date}
    })
in
    #"Changed dates"
```

### Key M Code Patterns

#### Expanding Multi-Person Fields

The CLOSER field can have multiple people assigned. SharePoint stores this as a nested table:

```powerquery
// Multi-person fields use ExpandTableColumn with "value"
#"Expanded CLOSER" = Table.ExpandTableColumn(
    #"Removed columns 1", "CLOSER", {"value"}, {"value"}
)
```

**Note:** This creates one row per closer. If a work order has 2 closers, it appears twice.

#### Expanding Multi-Choice Fields

The BLOCKERS field can have multiple selections. These are stored as a list:

```powerquery
// Multi-choice fields need List transformation and Text.Combine
#"Expanded BLOCKERS" = Table.TransformColumns(
    #"Changed column type 1", {
        {"BLOCKERS", each if _ is null then null 
            else Text.Combine(List.Transform(_, Text.From), ", "), 
            type text}
    }
)
```

**Result:** "Request Force Close, Dash Required" (comma-separated)

#### Date Type Conversions

All 14 date fields are converted in a single step:

```powerquery
#"Changed dates" = Table.TransformColumnTypes(#"Reordered columns 1", {
    {"STATUS CHANGED DATE", type date},
    {"INSERVICE DATE", type date},
    // ... more dates
})
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
| "Closing Tracker not found" | List was renamed | Update list name in M Code |
| "Column not found" | SharePoint column was renamed/deleted | Update M Code to match new column names |
| "Cannot convert to Date" | Invalid date values in SharePoint | Check source data for errors |

---

## Troubleshooting

### Data Not Updating

1. **Check your connection**: Data → Queries & Connections → verify no errors
2. **Clear credentials**: File → Options → Privacy → Clear Credentials
3. **Reconnect**: Data → Get Data → Data Source Settings → Edit Permissions

### Duplicate Rows for Multi-Closer Items

If a work order appears multiple times, it's because multiple closers are assigned.

**Cause:** The `ExpandTableColumn` step creates one row per closer.

**Solutions:**
1. **Accept it** - Filter reports to count unique Titles
2. **Modify query** - Combine closer names into one cell instead:
   ```powerquery
   // Alternative: Combine closers into comma-separated text
   #"Combined Closers" = Table.TransformColumns(Source, {
       {"CLOSER", each if _ is null then null 
           else Text.Combine([CLOSER][value], ", "), type text}
   })
   ```

### BLOCKERS Showing as List

If BLOCKERS shows `{List}` instead of text:

1. The `TransformColumns` step may have failed
2. Edit the query and verify the BLOCKERS expansion step
3. Re-apply the Text.Combine transformation

### Missing Stage Dates

Some stage date columns were removed in the query:
- DM Start / DM End
- Escalated Start / Escalated End

If you need these columns:
1. Edit the query in Power Query Editor
2. Find the `Table.RemoveColumns` step
3. Remove these columns from the removal list

### Wrong Date Format

If dates appear as numbers or in wrong format:

1. Edit the query in Power Query Editor
2. Select the date column
3. Change data type: Transform → Data Type → Date
4. Or check the `#"Changed dates"` step for missing columns

---

## Making Changes

### Adding a New Column

If a new column is added to SharePoint and you want it in Excel:

1. Open Power Query Editor
2. The new column will appear automatically in the source
3. Remove it from `Table.RemoveColumns` if it's being removed
4. Add to `Table.ReorderColumns` to position it
5. Add type transformation if it's a date

### Removing a Column

To hide a column from the Excel output:

1. Open Power Query Editor
2. Find the `Table.RemoveColumns` step
3. Add the column name to the list

### Changing Column Order

1. Open Power Query Editor
2. Find the `Table.ReorderColumns` step
3. Rearrange the column names in the list

### Adding a New Stage Date Pair

If SharePoint adds a new stage (e.g., "Review Start" / "Review End"):

1. Remove from `Table.RemoveColumns` if present
2. Add to `Table.ReorderColumns` in logical position
3. Add to `#"Changed dates"` step:
   ```powerquery
   {"Review Start", type date},
   {"Review End", type date}
   ```

### Updating the List Name

If the SharePoint list is renamed:

1. Open the query in Advanced Editor
2. Find this line:
   ```powerquery
   ClosingTracker = Source{[Title="Closing Tracker"]}[Items]
   ```
3. Change "Closing Tracker" to the new name
4. Save and refresh

---

## Best Practices

### For Report Builders

- Always refresh data before generating reports
- Watch for duplicate rows if work orders have multiple closers
- Use Pivot Tables to aggregate by unique Title
- Filter out "Completed" status for active workload reports

### For Query Editors

- Test changes on a copy of the file first
- Document any M Code changes with comments
- Keep the column order consistent for report stability
- Back up the working M Code before making changes

### For Administrators

- Monitor for SharePoint schema changes
- If renaming the list, update the M Code immediately
- Keep track of removed columns - they may be needed later
- Document any stage date fields that are deprecated

---

## Removed Columns Reference

The query removes these columns from the SharePoint data:

### System Columns (Always Removed)
- App Modified By, App Created By
- Item is a Record
- Label applied by, Retention label Applied, Retention label, Label setting
- Folder Child Count, Item Child Count
- Type, Edit, Attachments, Version
- Modified By, Created By, Created, Modified
- Content Type, ID

### Deprecated/Unused Columns
- StatusOrder (calculated field - not needed in Excel)
- Comments (large text - slows refresh)
- FCC Status, Storeroom Status (replaced by EXT CONTACT STATUS)
- DM Start, DM End (deprecated stage)
- Escalated Start, Escalated End (deprecated stage)
- Compliance Asset Id, Color Tag (metadata)

---

## Related Documentation

- [Closing Tracker User Guide](guide) - Field definitions and list usage
- [Closing Tracker Automation Guide](automation) - Power Automate flows

---

**Last Updated:** February 19, 2026  
**Excel File:** `M Code/Closing PM Tracker.xlsx`  
**SharePoint List:** `Closing Tracker` (connected by title, not GUID)
