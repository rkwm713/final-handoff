# EV Team Tracker - Excel & Power Query Guide

> **For users who work with the EV PM Tracker Excel file or need to understand the Power Query connections**
> 
> This guide explains how Excel connects to the EV Team Tracker SharePoint list, how the M Code queries work, and how to troubleshoot data refresh issues.

---

## Table of Contents

1. [Overview](#overview)
2. [Excel PM Tracker File](#excel-pm-tracker-file)
3. [Power Query Connections](#power-query-connections)
4. [M Code Reference](#m-code-reference)
5. [Refreshing Data](#refreshing-data)
6. [Troubleshooting](#troubleshooting)
7. [Making Changes](#making-changes)

---

## Overview

### How It Works

The EV PM Tracker Excel file uses **Power Query** (also called "Get & Transform") to pull data directly from the SharePoint list. This means:

- Data is **live** - refresh to get the latest from SharePoint
- No manual copy/paste needed
- Reports and pivot tables update automatically
- Changes in SharePoint appear in Excel after refresh

### Key Components

| Component | Purpose |
|-----------|---------|
| **EV_SMC_PM_Tracker.xlsx** | The main Excel workbook with EV project data |
| **Power Query Connections** | Behind-the-scenes queries that fetch SharePoint data |
| **M Code** | The programming language Power Query uses |

---

## Excel PM Tracker File

### File Location

The EV PM Tracker Excel file is typically stored at:

```
M Code/EV_SMC_PM_Tracker.xlsx
```

### What's In The File

The Excel workbook contains:

1. **EV Projects Table** - All EV Team Tracker items from SharePoint
2. **Pivot Tables/Charts** - Summary reports and visualizations
3. **Power Query Connections** - Data connections (hidden by default)

### Key Columns Available

After Power Query processing, these columns are available for reporting:

| Column | Description |
|--------|-------------|
| Title | Work Order Number (WO) |
| JobType | Location Type (ONSITE/OFFSITE/CAPBANK) |
| Status | Current project status |
| Designer | Designer name (expanded from Person field) |
| Field Tech | Field Technician name (expanded from Person field) |
| OncorUD | Oncor Utility Designer |
| Customer | Customer name |
| TSSOW | TechServ SOW number |
| CRD | Customer Requested Date |
| ReceivedDate | Start Date |
| DeliveredDate | When delivered |
| CanceledDate | When canceled |
| PermitTypeReq? | Permit types (comma-separated) |
| PPDEnd, AEGISDesignEnd, AEGISQAEnd | Status End Dates |

---

## Power Query Connections

### Query Structure

The EV data uses two queries that work together:

| Query | Purpose | Depends On |
|-------|---------|------------|
| **EV Team Tracker** | Base connection to SharePoint | None |
| **EV Projects** | Transforms and cleans data | EV Team Tracker |

**Data Flow:**

| Step | What Happens |
|------|--------------|
| 1 | `EV Team Tracker` connects to SharePoint and retrieves raw list data |
| 2 | `EV Projects` references that data and transforms it for reporting |

### Query 1: EV Team Tracker (Base Connection)

**Purpose:** Establishes the connection to SharePoint

**SharePoint List GUID:** `8a3e9545-9078-46e7-9086-8e6379ef58ea`

This query:
- Connects to the OncorDesign SharePoint site
- Selects the EV Team Tracker list by its unique ID
- Returns raw SharePoint data

### Query 2: EV Projects (Main Query)

**Purpose:** Transforms raw data into report-ready format

This query:
- Removes unnecessary SharePoint system columns
- Converts date fields to proper Date type
- Expands Person fields (Designer, Field Tech) to show names
- Combines multi-choice fields (Permit Type) into comma-separated text
- Reorders columns for logical reporting

---

## M Code Reference

### What is M Code?

M Code is the programming language that Power Query uses. Each query is written in M Code, which you can view and edit in the **Advanced Editor**.

### Viewing M Code

1. Open Excel
2. Go to **Data** tab → **Queries & Connections**
3. Right-click a query → **Edit**
4. In Power Query Editor: **View** → **Advanced Editor**

### EV Team Tracker Query (Base Connection)

```powerquery
// EV Team Tracker
// PURPOSE: Base connection to the EV Team Tracker SharePoint list
// DEPENDENCIES: None (this is the base query)
let
    // Connect to OncorDesign SharePoint site
    Source = SharePoint.Tables(
        "https://techservltd.sharepoint.com/sites/OncorDesign", 
        [Implementation=null, ApiVersion=15]
    ),
    
    // Select the EV Team Tracker list by GUID
    // WARNING: If list is recreated, this GUID changes!
    #"8a3e9545-9078-46e7-9086-8e6379ef58ea" = Source{[Id="8a3e9545-9078-46e7-9086-8e6379ef58ea"]}[Items],
    
    // Rename ID to avoid conflicts
    #"Renamed Columns" = Table.RenameColumns(
        #"8a3e9545-9078-46e7-9086-8e6379ef58ea",
        {{"ID", "ID.1"}}
    )
in
    #"Renamed Columns"
```

### EV Projects Query (Main Query)

```powerquery
// EV Projects
// PURPOSE: Transform SharePoint data into clean report format
// DEPENDENCIES: "EV Team Tracker" query must exist
let
    Source = #"EV Team Tracker",
    
    // Remove SharePoint system columns
    #"Removed Columns" = Table.RemoveColumns(Source,{
        "FileSystemObjectType", "Id", "ServerRedirectedEmbedUri", 
        "ServerRedirectedEmbedUrl", "ContentTypeId", "OData__ColorTag", 
        "ComplianceAssetId", "ProjectName"
    }),
    
    // Convert date columns (batch 1)
    #"Changed Type" = Table.TransformColumnTypes(#"Removed Columns",{
        {"ReceivedDate", type date}, 
        {"PrelimSubmitted", type date}, 
        {"PrelimApprovedDate", type date}, 
        {"DeliveredDate", type date}, 
        {"DesignVerifiedSent", type date}, 
        {"CanceledDate", type date}, 
        {"As-BuildComplete", type date}
    }),
    
    // Combine multi-choice Permit Type into comma-separated text
    #"Extracted Values" = Table.TransformColumns(#"Changed Type", {
        "PermitTypeReq?", 
        each Text.Combine(List.Transform(_, Text.From), ","), 
        type text
    }),
    
    // Convert date columns (batch 2)
    #"Changed Type1" = Table.TransformColumnTypes(#"Extracted Values",{
        {"PowerWalkComplete", type date}, 
        {"FinalStake", type date}, 
        {"PermitSubmitted", type date}, 
        {"PermitReceived", type date}
    }),
    
    // Expand Designer Person field to get name
    #"Expanded Designer" = Table.ExpandRecordColumn(
        #"Changed Type1", "Designer", {"Title"}, {"Title.1"}
    ),
    #"Renamed Columns" = Table.RenameColumns(
        #"Expanded Designer", {{"Title.1", "Designer"}}
    ),
    
    // Expand Field Tech Person field to get name
    #"Expanded FieldTech" = Table.ExpandRecordColumn(
        #"Renamed Columns", "FieldTech", {"Title"}, {"Title.1"}
    ),
    #"Renamed Columns1" = Table.RenameColumns(
        #"Expanded FieldTech", {{"Title.1", "Field Tech"}}
    ),
    
    // Remove more system columns
    #"Removed Columns1" = Table.RemoveColumns(#"Renamed Columns1",{
        "Author", "Editor", "ID.1", "Modified", "Created", 
        "AuthorId", "EditorId", "OData__UIVersionString", "Attachments", 
        "GUID", "FirstUniqueAncestorSecurableObject", "RoleAssignments", 
        "AttachmentFiles", "ContentType", "GetDlpPolicyTip", 
        "FieldValuesAsHtml", "FieldValuesAsText", "FieldValuesForEdit", 
        "File", "Folder", "LikedByInformation", "ParentList", 
        "Properties", "Versions"
    }),
    
    // Convert CRD to date
    #"Changed Type2" = Table.TransformColumnTypes(
        #"Removed Columns1", {{"CRD", type date}}
    ),
    
    // Reorder columns and remove person ID fields
    #"Reordered Columns" = Table.ReorderColumns(#"Changed Type2",{
        "Title", "JobType", "Status", "Customer", "Field Tech", "Designer",
        "ReceivedDate", "PrelimSubmitted", "PrelimApprovedDate", "DeliveredDate",
        "DesignVerifiedSent", "CanceledDate", "As-BuildRequired?", "As-BuildComplete",
        "FieldTechId", "FieldTechStringId", "PowerWalkComplete", "FinalStake",
        "PermitTypeReq?", "PermitSubmitted", "PermitReceived", "Equipment",
        "EquipmentOrderDate", "PPDEnd", "AEGISDesignEnd", "AEGISQAEnd",
        "ConstructionEndDate", "DesignerId", "DesignerStringId", "PPDCompleteDate",
        "WR", "OncorUD", "CRD", "TSSOW", "ClosingDate"
    }),
    
    #"Removed Columns2" = Table.RemoveColumns(#"Reordered Columns",{
        "FieldTechId", "FieldTechStringId", "DesignerId", "DesignerStringId"
    }),
    
    // Final column order
    #"Reordered Columns1" = Table.ReorderColumns(#"Removed Columns2",{
        "Title", "JobType", "Status", "Designer", "Field Tech", "OncorUD",
        "Customer", "TSSOW", "CRD", "ReceivedDate", "PrelimSubmitted",
        "PrelimApprovedDate", "DeliveredDate", "DesignVerifiedSent", "CanceledDate",
        "As-BuildRequired?", "As-BuildComplete", "PowerWalkComplete", "FinalStake",
        "PermitTypeReq?", "PermitSubmitted", "PermitReceived", "PPDEnd",
        "AEGISDesignEnd", "AEGISQAEnd", "ConstructionEndDate", "PPDCompleteDate",
        "ClosingDate", "Equipment", "EquipmentOrderDate", "WR"
    })
in
    #"Reordered Columns1"
```

---

## Refreshing Data

### Manual Refresh

1. Open the Excel file
2. Go to **Data** tab
3. Click **Refresh All**
4. Wait for queries to complete (may take 30-60 seconds)

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
| "Column not found" | SharePoint column was renamed/deleted | Update M Code to match new column names |

---

## Troubleshooting

### Data Not Updating

1. **Check your connection**: Data → Queries & Connections → verify no errors
2. **Clear credentials**: File → Options → Privacy → Clear Credentials
3. **Reconnect**: Data → Get Data → Data Source Settings → Edit Permissions

### Missing Columns

If columns are missing after refresh:

1. Column may have been removed from SharePoint
2. Column may have been renamed in SharePoint
3. Check the M Code for any `Table.RemoveColumns` that might be removing it

### Wrong Data Types

If dates show as numbers or text:

1. Edit the query in Power Query Editor
2. Select the column
3. Change the data type using **Transform** → **Data Type**

### Person Fields Showing Records

If Designer or Field Tech shows `[Record]` instead of names:

1. The `ExpandRecordColumn` step may have failed
2. Edit the query and re-expand the Person field
3. Select `Title` as the field to expand

---

## Making Changes

### Adding a New Column

If a new column is added to SharePoint and you want it in Excel:

1. Open Power Query Editor
2. The new column will appear automatically in the source
3. Remove it from any `Table.RemoveColumns` steps if present
4. Add type transformation if it's a date
5. Add to `Table.ReorderColumns` to position it

### Removing a Column

To hide a column from the Excel output:

1. Open Power Query Editor
2. Find a `Table.RemoveColumns` step
3. Add the column's internal name to the list

### Changing Column Order

1. Open Power Query Editor
2. Find the `Table.ReorderColumns` step
3. Rearrange the column names in the list

### Updating the SharePoint List GUID

If the SharePoint list is recreated:

1. Get the new GUID using PnP PowerShell:
   ```powershell
   Connect-PnPOnline -Url "https://techservltd.sharepoint.com/sites/OncorDesign" -UseWebLogin
   Get-PnPList -Identity "EV Team Tracker" | Select Id
   ```
2. Open the EV Team Tracker query in Advanced Editor
3. Replace the old GUID with the new one

---

## Best Practices

### For Report Builders

- Always refresh data before generating reports
- Use the processed "EV Projects" query, not the raw "EV Team Tracker" query
- Create pivot tables that reference the query output table

### For Query Editors

- Test changes on a copy of the file first
- Document any M Code changes with comments
- Keep the query structure (base + transform) for easier maintenance

### For Administrators

- Monitor for SharePoint schema changes that could break queries
- Keep a backup of working M Code
- Update documentation when queries change

---

## Related Documentation

- [EV Team Tracker User Guide](guide) - Field definitions and list usage
- [EV Tracker Automation Guide](automation) - Power Automate flows

---

**Last Updated:** February 19, 2026  
**Excel File:** `M Code/EV_SMC_PM_Tracker.xlsx`  
**SharePoint List GUID:** `8a3e9545-9078-46e7-9086-8e6379ef58ea`
