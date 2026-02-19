# Small Cell Team Tracker - Excel & Power Query Guide

> **For users who work with the Small Cell PM Tracker Excel file or need to understand the Power Query connections**
> 
> This guide explains how Excel connects to the Small Cell Team Tracker SharePoint list, how SPIDA data is integrated, and how to troubleshoot data refresh issues.

---

## Table of Contents

1. [Overview](#overview)
2. [Excel PM Tracker File](#excel-pm-tracker-file)
3. [Power Query Connections](#power-query-connections)
4. [SPIDA Integration](#spida-integration)
5. [M Code Reference](#m-code-reference)
6. [Refreshing Data](#refreshing-data)
7. [Troubleshooting](#troubleshooting)
8. [Making Changes](#making-changes)

---

## Overview

### How It Works

The Small Cell PM Tracker Excel file uses **Power Query** to:

1. Pull data from the SharePoint list
2. Import SPIDA project status data from a separate Excel table
3. **Merge** the two data sources using Project/Site ID
4. Create a unified view of Small Cell project data

This is more complex than the EV tracker because it combines two data sources.

### Key Components

| Component | Purpose |
|-----------|---------|
| **EV_SMC_PM_Tracker.xlsx** | The main Excel workbook (shared with EV data) |
| **Small Cell Connection** | Base query connecting to SharePoint |
| **Small Cell Projects Main** | Main transformation query |
| **SC_SPIDA_Data** | SPIDA data loaded from an Excel table |
| **SC_SPIDA_Mapping** | Merged data combining SharePoint + SPIDA |

---

## Excel PM Tracker File

### File Location

The Small Cell PM Tracker data is in:

```
M Code/EV_SMC_PM_Tracker.xlsx
```

### What's In The File

For Small Cell projects:

1. **Small Cell Projects Table** - Merged SharePoint + SPIDA data
2. **SPIDA Data Table** - Raw SPIDA status information
3. **Pivot Tables/Charts** - Summary reports
4. **Multiple Power Query Connections** - Data pipelines

### Key Columns Available

After Power Query processing, these columns are available:

| Column | Source | Description |
|--------|--------|-------------|
| Title | SharePoint | Project/Site ID (e.g., NTX-CORP-00123) |
| Carrier | SharePoint | Carrier name |
| Status | SharePoint | Microsoft List status |
| DesignLead | SharePoint | Design Lead name |
| FieldLead | SharePoint | Field Lead name |
| ReceivedDate | SharePoint | Start date |
| DeliveredDate | SharePoint | Delivery date |
| CanceledDate | SharePoint | Cancellation date |
| PendExternalEnd, ConstructionEnd, etc. | SharePoint | Status End Dates |
| SPIDA_TITLE | SPIDA | Project title from SPIDA |
| SPIDA_STATUS | SPIDA | Status from SPIDA system |

---

## Power Query Connections

### Query Structure

Small Cell uses a multi-query pipeline that combines SharePoint data with manually-imported SPIDA data:

| Query | Source | Output |
|-------|--------|--------|
| **Small Cell Connection** | SharePoint List | Raw list data |
| **Small Cell Projects Main** | Small Cell Connection | Cleaned SharePoint data |
| **SC_SPIDA_Data** | Excel table `SC_SPIDA` | Cleaned SPIDA export data |
| **SC_SPIDA_Mapping** | Projects Main + SPIDA_Data | Merged comparison report |

**Data Flow:**

| Step | What Happens |
|------|--------------|
| 1 | `Small Cell Connection` pulls raw data from SharePoint |
| 2 | `Small Cell Projects Main` transforms and cleans that data |
| 3 | `SC_SPIDA_Data` reads the manually-pasted SPIDA export from the `SC_SPIDA` tab |
| 4 | `SC_SPIDA_Mapping` merges both sources and outputs to the `SCX_DV` tab |

### Query 1: Small Cell Connection (Base Connection)

**Purpose:** Establishes connection to SharePoint

**SharePoint List GUID:** `52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df`

### Query 2: Small Cell Projects Main

**Purpose:** Transforms raw SharePoint data

- Removes system columns
- Converts date columns
- Expands Person fields (DesignLead, FieldLead)
- Reorders columns

### Query 3: SC_SPIDA_Data

**Purpose:** Imports SPIDA data from an Excel table

- Sources from a table named "SC_SPIDA" in the workbook
- Renames columns with SPIDA_ prefix
- Removes duplicates
- Preserves SPIDA project IDs and statuses

### Query 4: SC_SPIDA_Mapping

**Purpose:** Merges SharePoint and SPIDA data

- Joins on `Title` (SharePoint) = `SPIDA_PROJECT` (SPIDA)
- Uses LEFT JOIN (keeps all SharePoint records)
- Expands SPIDA columns into final output

---

## SPIDA Integration

### What is SPIDA?

**SPIDA Studio** is an external system used by turf vendors (Crown Castle, ExteNet, etc.) to manage small cell project applications. It is **completely separate** from the Microsoft List - there is **no automatic connection** between them.

### Important: Manual Process

SPIDA data is **manually** brought into Excel for reporting purposes only. The Microsoft List and SPIDA Studio do not communicate with each other.

| System | Purpose | How It Updates |
|--------|---------|----------------|
| **Microsoft List** | Internal TechServ workflow tracking | Team members change status manually |
| **SPIDA Studio** | External vendor project tracking | Vendors update in their system |

### How to Update SPIDA Data

Steve (or whoever manages reports) must:

1. **Export from SPIDA Studio** - Download the project data export
2. **Open `EV_SMC_PM_Tracker.xlsx`**
3. **Go to the `SC_SPIDA` tab** - This is where SPIDA data lives
4. **Clear the existing data** and **paste the new export**
5. **Click Refresh All** - Power Query merges the data
6. **Check the `SCX_DV` tab** - This shows the combined comparison report

### Excel Tabs Explained

| Tab Name | Purpose | Data Source |
|----------|---------|-------------|
| **SC_SPIDA** | Raw SPIDA export data | Manual paste from SPIDA Studio export |
| **SCX_DV** | Merged comparison report | Power Query combines SC_SPIDA + SharePoint |
| **tbl_SC_SPIDAMAP** | Status mapping table | Defines how SPIDA statuses map to internal statuses |

### Status Mapping (tbl_SC_SPIDAMAP)

The mapping table defines how SPIDA statuses translate to internal workflow stages:

| SPIDA Status | Internal Status | Status Order |
|--------------|-----------------|--------------|
| Incoming | Power Walk Needed | 0 |
| Power Walk Needed | Power Walk Needed | 1 |
| Katapult Design | Katapult Design | 2 |
| Katapult QA | Katapult QA | 3 |
| Fault Current | Fault Current | 4 |
| PC Review | PC Review | 5 |
| Pending External Review and Approval | Pending External Review and Approval | 6 |
| AEGIS Design | AEGIS Design | 7 |
| AEGIS QA | AEGIS QA | 8 |
| Final PC Review | Final PC Review | 9 |
| Delivered | Delivered | 10 |
| Complete | Complete | 11 |
| Hold - Documents | Hold - Documents | 12 |
| Hold - Permits | Hold - Permits | 13 |
| Hold - External | Hold - External | 99 |
| Canceled | Canceled | 100 |

The "Status Order" column controls sorting in reports - lower numbers appear first (earlier in workflow).

### Why Compare SPIDA and List?

The `SCX_DV` tab helps identify discrepancies:

| What You See | What It Means |
|--------------|---------------|
| SPIDA says "Delivered", List says "AEGIS Design" | List may need updating |
| "MS List Status" differs from "Should be in..." | Status sync needed |
| High "SPIDA Status Age" | Project may be stuck |

**Always use the Microsoft List status** for internal workflow decisions. The SPIDA comparison is for reporting and sync verification only.

---

## M Code Reference

### Small Cell Connection Query

```powerquery
// Small Cell Connection
// PURPOSE: Base connection to Small Cell Team Tracker SharePoint list
// DEPENDENCIES: None (this is the base query)
let
    // Connect to OncorDesign SharePoint site
    Source = SharePoint.Tables(
        "https://techservltd.sharepoint.com/sites/OncorDesign", 
        [Implementation=null, ApiVersion=15]
    ),
    
    // Select Small Cell Team Tracker by GUID
    // WARNING: If list is recreated, this GUID changes!
    #"52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df" = Source{[Id="52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df"]}[Items]
in
    #"52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df"
```

### Small Cell Projects Main Query

```powerquery
// Small Cell Projects Main
// PURPOSE: Transform SharePoint data into clean report format
// DEPENDENCIES: "Small Cell Connection" query
let
    Source = #"Small Cell Connection",
    
    // Remove SharePoint system columns
    #"Removed Columns" = Table.RemoveColumns(Source,{
        "FileSystemObjectType", "Id", "ServerRedirectedEmbedUri", 
        "ServerRedirectedEmbedUrl", "ContentTypeId", "OData__ColorTag", 
        "ComplianceAssetId"
    }),
    
    // Convert date columns
    #"Changed Type" = Table.TransformColumnTypes(#"Removed Columns",{
        {"ReceivedDate", type date}, 
        {"DeliveredDate", type date}, 
        {"CanceledDate", type date}
    }),
    
    // Expand DesignLead Person field
    #"Expanded DesignLead" = Table.ExpandRecordColumn(
        #"Changed Type", "DesignLead", {"Title"}, {"DesignLead.Title"}
    ),
    #"Renamed DesignLead" = Table.RenameColumns(
        #"Expanded DesignLead", {{"DesignLead.Title", "DesignLead"}}
    ),
    
    // Expand FieldLead Person field  
    #"Expanded FieldLead" = Table.ExpandRecordColumn(
        #"Renamed DesignLead", "FieldLead", {"Title"}, {"FieldLead.Title"}
    ),
    #"Renamed FieldLead" = Table.RenameColumns(
        #"Expanded FieldLead", {{"FieldLead.Title", "FieldLead"}}
    ),
    
    // Remove system columns and person ID fields
    #"Removed Columns1" = Table.RemoveColumns(#"Renamed FieldLead",{
        "Author", "Editor", "Modified", "Created", "AuthorId", "EditorId",
        "OData__UIVersionString", "Attachments", "GUID", 
        "FirstUniqueAncestorSecurableObject", "RoleAssignments", 
        "AttachmentFiles", "ContentType", "GetDlpPolicyTip",
        "FieldValuesAsHtml", "FieldValuesAsText", "FieldValuesForEdit", 
        "File", "Folder", "LikedByInformation", "ParentList", 
        "Properties", "Versions", "DesignLeadId", "DesignLeadStringId",
        "FieldLeadId", "FieldLeadStringId"
    }),
    
    // Reorder columns for logical reporting
    #"Reordered Columns" = Table.ReorderColumns(#"Removed Columns1",{
        "Title", "Carrier", "Status", "DesignLead", "FieldLead",
        "ReceivedDate", "DeliveredDate", "CanceledDate",
        "PendExternalEnd", "SPIDADesignEnd", "SPIDAQAEnd", 
        "ConstructionEnd", "ID"
    }),
    
    // Sort by Title (Project ID)
    #"Sorted Rows" = Table.Sort(#"Reordered Columns",{{"Title", Order.Ascending}})
in
    #"Sorted Rows"
```

### SC_SPIDA_Data Query

This reads the SPIDA export data from the `SC_SPIDA` Excel table.

```powerquery
// SC_SPIDA_Data
// PURPOSE: Read and clean SPIDA export data from Excel table
// DEPENDENCIES: Excel table named "SC_SPIDA" must exist in workbook
// OUTPUT: Clean table with WO, SPIDA Status, and Status Age columns
let
    // Read from the Excel table named "SC_SPIDA"
    // This table should contain SPIDA Studio export data
    Source = Excel.CurrentWorkbook(){[Name="SC_SPIDA"]}[Content],
    
    // Set column data types
    #"Changed Type" = Table.TransformColumnTypes(Source,{
        {"Oncor Work Order Form - Oncor Work Order Number", type number},
        {"Status", type text},
        {"Status Age", type text}
    }),
    
    // Rename columns to match our naming convention
    #"Renamed Columns" = Table.RenameColumns(#"Changed Type",{
        {"Oncor Work Order Form - Oncor Work Order Number", "WO"},
        {"Status", "SPIDA Status"}
    }),
    
    // Keep only the columns we need
    #"Removed Other Columns" = Table.SelectColumns(#"Renamed Columns",{
        "WO",
        "SPIDA Status",
        "Status Age"
    }),
    
    // Remove duplicate WO entries (keep first occurrence)
    #"Removed Duplicates" = Table.Distinct(#"Removed Other Columns", {"WO"}),
    
    // Convert WO to text for consistent joining with SharePoint data
    #"Changed Type1" = Table.TransformColumnTypes(#"Removed Duplicates",{{"WO", type text}})
in
    #"Changed Type1"
```

### SC_SPIDA_Mapping Query (tbl_SC_SPIDAMAP)

This defines the mapping between SPIDA statuses and internal workflow stages. It's stored in the `tbl_SC_SPIDAMAP` Excel table and includes a Status Order for sorting.

```powerquery
// SC_SPIDA_Mapping
// PURPOSE: Map SPIDA status codes to internal workflow stages with sort order
// DEPENDENCIES: Excel table named "tbl_SC_SPIDAMAP" must exist in workbook
// OUTPUT: Mapping table with SPIDA Status, Internal Status, and Status Order
let
    // Read from the Excel mapping table
    Source = Excel.CurrentWorkbook(){[Name="tbl_SC_SPIDAMAP"]}[Content],
    
    // Set column data types
    #"Changed Type" = Table.TransformColumnTypes(Source,{
        {"SPIDA Status", type text},
        {"Internal Status", type text}
    }),
    
    // Keep only the mapping columns
    #"Removed Other Columns" = Table.SelectColumns(#"Changed Type",{
        "SPIDA Status",
        "Internal Status"
    }),
    
    // Remove any blank rows
    #"Removed Blank Rows" = Table.SelectRows(#"Removed Other Columns", 
        each [SPIDA Status] <> null and [SPIDA Status] <> ""
    ),
    
    // STATUS ORDER MAPPING
    // Defines workflow sequence for sorting and reporting
    // Lower numbers = earlier in workflow
    StatusOrderMap = [
        #"Incoming" = 0,
        #"Power Walk Needed" = 1,
        #"Katapult Design" = 2,
        #"Katapult QA" = 3,
        #"Fault Current" = 4,
        #"PC Review" = 5,
        #"Pending External Review and Approval" = 6,
        #"AEGIS Design" = 7,
        #"AEGIS QA" = 8,
        #"Final PC Review" = 9,
        #"Delivered" = 10,
        #"Complete" = 11,
        #"Hold - Documents" = 12,
        #"Hold - Permits" = 13,
        #"Hold - External" = 99,
        #"Canceled" = 100
    ],
    
    // Add Status Order column based on Internal Status
    #"Added Status Order" = Table.AddColumn(
        #"Removed Blank Rows",
        "Status Order",
        each Record.FieldOrDefault(StatusOrderMap, [Internal Status], 999),
        Int64.Type
    )
in
    #"Added Status Order"
```

### SCX_DV Query (Merged Comparison Report)

This is the main comparison query that merges SharePoint data with SPIDA data.

```powerquery
// SC_SPIDA_Mapping (SCX_DV output)
// PURPOSE: Merge SharePoint Small Cell data with SPIDA data and status mapping
// DEPENDENCIES: Small Cell SharePoint query, SC_SPIDA_Data, tbl_SC_SPIDAMAP
let
    // Start with Small Cell SharePoint data
    Source = #"Small Cell Projects",
    
    // Left join with SPIDA data (matching on WO/Title)
    #"Merged Queries" = Table.NestedJoin(
        Source, {"Title"}, 
        SC_SPIDA_Data, {"WO"}, 
        "SPIDA", JoinKind.LeftOuter
    ),
    
    // Expand SPIDA columns
    #"Expanded SPIDA" = Table.ExpandTableColumn(
        #"Merged Queries", "SPIDA", 
        {"SPIDA Status", "Status Age"}, 
        {"SPIDA Status", "Status Age"}
    ),
    
    // Join with mapping table to get Internal Status
    #"Merged Mapping" = Table.NestedJoin(
        #"Expanded SPIDA", {"SPIDA Status"}, 
        SC_SPIDA_Mapping, {"SPIDA Status"}, 
        "Mapping", JoinKind.LeftOuter
    ),
    
    // Expand mapping columns
    #"Expanded Mapping" = Table.ExpandTableColumn(
        #"Merged Mapping", "Mapping", 
        {"Internal Status", "Status Order"}, 
        {"Internal Status", "Status Order"}
    ),
    
    // Rename for clarity
    // "Status" = Microsoft List Status
    // "Internal Status" = "Should be in..." (what SPIDA mapping suggests)
    #"Renamed Columns" = Table.RenameColumns(#"Expanded Mapping",{
        {"Status", "MS List Status"},
        {"Internal Status", "Should be in..."},
        {"Status Age", "SPIDA Status Age"}
    }),
    
    // Sort by workflow order, then by age (oldest first)
    #"Sorted Rows" = Table.Sort(#"Renamed Columns",{
        {"Status Order", Order.Ascending},
        {"SPIDA Status Age", Order.Descending}
    })
in
    #"Sorted Rows"
```

---

## Refreshing Data

### Manual Refresh

1. Open the Excel file
2. Go to **Data** tab
3. Click **Refresh All**
4. Wait for all queries to complete

**Important:** The refresh order matters. Power Query automatically handles dependencies, but if you see errors, try refreshing individual queries in order:
1. Small Cell Connection
2. SC_SPIDA_Data
3. Small Cell Projects Main
4. SC_SPIDA_Mapping

### Updating SPIDA Data

Before refreshing, ensure the **SC_SPIDA** table has current data:

1. Export data from SPIDA system
2. Clear the existing SC_SPIDA table
3. Paste new SPIDA data
4. Refresh all queries

---

## Troubleshooting

### SPIDA Data Not Merging

If SPIDA columns show "Not in SPIDA" for records that should match:

1. **Check Project ID format** - Must match exactly between systems
2. **Check for spaces** - Leading/trailing spaces cause mismatches
3. **Check case** - NTX-CORP-00123 ≠ ntx-corp-00123

### Missing SPIDA Table Error

If you see "Excel.CurrentWorkbook() - Name 'SC_SPIDA' was not found":

1. Ensure an Excel table named exactly **SC_SPIDA** exists
2. To create: Select data → Insert → Table → Check "My table has headers"
3. Rename table: Table Design → Properties → Table Name = SC_SPIDA

### Query Dependency Errors

If one query fails because another hasn't loaded:

1. Open Power Query Editor
2. Right-click the failing query → Refresh
3. Or use **Refresh All** from the Data tab

### SharePoint Connection Issues

Same as EV tracker - see [EV Excel Info - Troubleshooting](../ev/excel-info.md#troubleshooting)

---

## Making Changes

### Adding SPIDA Columns

To bring more SPIDA data into the merged output:

1. Add the column to the SC_SPIDA Excel table
2. Update SC_SPIDA_Data query to rename with SPIDA_ prefix
3. Update SC_SPIDA_Mapping query to expand the new column

### Updating the SharePoint List GUID

If the SharePoint list is recreated:

```powershell
Connect-PnPOnline -Url "https://techservltd.sharepoint.com/sites/OncorDesign" -UseWebLogin
Get-PnPList -Identity "Small Cell Team Tracker" | Select Id
Disconnect-PnPOnline
```

Update the GUID in the Small Cell Connection query.

### Changing the Join Key

If the Project ID field changes:

1. Open SC_SPIDA_Mapping in Power Query Editor
2. Edit the `Table.NestedJoin` step
3. Update the join columns: `{"Title"}` and `{"SPIDA_PROJECT"}`

---

## Best Practices

### For Report Builders

- Use the **SCX_DV** tab (merged output) for comparison reports
- The "MS List Status" column shows what's in SharePoint
- The "Should be in..." column shows where SPIDA mapping suggests the project should be
- High "SPIDA Status Age" values indicate projects that may need attention

### For SPIDA Data Updates (Steve's Workflow)

1. **Before major reporting or reviews:**
   - Export fresh data from SPIDA Studio
   - Clear the `SC_SPIDA` tab
   - Paste the new export data
   - Click **Refresh All** in Excel

2. **After pasting SPIDA data:**
   - Verify the column headers match what Power Query expects
   - Check that WO numbers are in the expected format
   - Confirm the `SCX_DV` tab shows merged results

3. **If new SPIDA statuses appear:**
   - Add them to the `tbl_SC_SPIDAMAP` table
   - Assign an appropriate "Internal Status" and "Status Order"
   - Refresh queries to apply the new mapping

### For Query Editors

- Keep the SPIDA_ prefix convention for clarity
- Don't modify the `SC_SPIDA` table structure without updating the query
- Document any changes with M Code comments
- Test with a small data export before refreshing with full data

---

## Related Documentation

- [Project Overview](overview) - Complete end-to-end workflow from intake to completion
- [User Guide](guide) - Field definitions and list usage
- [Automation Guide](automation) - Power Automate flows
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistance
- [EV Excel Info](/ev/excel-info) - EV tracker Excel guide (uses same Excel file)

---

**Last Updated:** February 19, 2026  
**Excel File:** `M Code/EV_SMC_PM_Tracker.xlsx`  
**SharePoint List GUID:** `52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df`
