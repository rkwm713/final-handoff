# Small Cell Team Tracker - AI Context File

> Give this file to ChatGPT, Claude, or Copilot before asking questions about the Small Cell Tracker. It contains the full schema, workflow, automation, and Power Query details.

## Project Overview

The Small Cell Team Tracker is a Microsoft List on SharePoint that tracks small cell telecommunications projects. These projects involve designing infrastructure for small cell antennas (5G, LTE). A key distinction: SPIDA Studio pole analysis is tracked separately in its own Excel file, not in the Microsoft List.

- **SharePoint Site:** `https://techservltd.sharepoint.com/sites/OncorDesign`
- **List URL:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Small Cell Team Tracker/`
- **List GUID:** `52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df`
- **Total Fields:** ~54 columns

---

## Status Workflow

```
Power Walk Needed → Katapult Design → Katapult QA → Fault Current → PC Review → Pending External Review and Approval → AEGIS Design → AEGIS QA → Final PC Review → Delivered → Complete
```

### Hold Statuses
Hold - Documents, Hold - Permits, Hold - External

### Final Statuses
Complete, Canceled

### All 15 Status Options
Power Walk Needed, Katapult Design, Katapult QA, Fault Current, PC Review, Pending External Review and Approval, AEGIS Design, AEGIS QA, Final PC Review, Delivered, Complete, Hold - Documents, Hold - Permits, Hold - External, Canceled

---

## Complete Field Reference

### Core Fields

| Display Name | Internal Name | Type | Notes |
|-------------|---------------|------|-------|
| Title | `Title` | Text | Work order number |
| Site Name | `SiteName` | Text | Site name |
| WR | `WR` | Number | Work request number |
| Customer | `Customer` | Choice | Customer name |
| Subcontractor | `Subcontractor` | Choice | Subcontractor |
| Field Tech | `FieldTech` | Person | Field technician |
| Designer | `Designer` | Person | Designer |
| Oncor UD | `OncorUD` | Choice | Oncor utility designer |
| Status | `Status` | Choice | Current status (15 options) |
| Previous Status | `PreviousStatus` | Text | Auto-filled by flow |
| WaAM Status | `WaAMStatus` | Choice | APPR, ARCHIVED, HOLD, INDESIGN, INIT, INPROG, INSERVICE, PENDCAN, WFIMWC, WORKCLOSE |
| Received Date | `ReceivedDate` | Date | When project received |
| Delivered Date | `DeliveredDate` | Date | When delivered |
| Canceled Date | `CanceledDate` | Date | When canceled |
| Work Points | `WorkPoints` | Number | Complexity measure |
| Permits | `Permits` | Choice | Permit type |
| Permit Submitted | `PermitSubmitted` | Date | When permit submitted |
| Permit Received | `PermitReceived` | Date | When permit received |
| Small Cell WR Folder | `SmallCellWRFolder` | Hyperlink | Link to project folder |

### Status End Date Fields (auto-filled when leaving each status)

| Display Name | Internal Name | Filled When Leaving |
|-------------|---------------|-------------------|
| Power Walk End Date | `PowerWalkEndDate` | Power Walk Needed |
| Katapult Design End Date | `KatapultDesignEndDate` | Katapult Design |
| Katapult QA End Date | `KatapultQAEndDate` | Katapult QA |
| Fault Current End Date | `FaultCurrentEndDate` | Fault Current |
| PC Review End Date | `PCReviewEndDate` | PC Review |
| AEGIS Design End Date | `AEGISDesignEndDate` | AEGIS Design |
| AEGIS QA End Date | `AEGISQAEndDate` | AEGIS QA |
| Final PC Review End Date | `FinalPCReviewEndDate` | Final PC Review |
| Complete End Date | `CompleteEndDate` | Complete |
| Hold - Documents End Date | `HoldDocumentsEndDate` | Hold - Documents |
| Hold - Permits End Date | `HoldPermitsEndDate` | Hold - Permits |
| Hold - External End Date | `HoldExternalEndDate` | Hold - External |

---

## Power Automate Flows

### Flow 1: Status End Date Tracker
- **Trigger:** Status field changes
- **Actions:**
  1. Reads the Previous Status value
  2. Based on Previous Status, fills the corresponding End Date field with today's date
  3. Updates `PreviousStatus` field with the old status value
- **Status-to-field mapping:**
  - Previous Status = "Power Walk Needed" → fills `PowerWalkEndDate`
  - Previous Status = "Katapult Design" → fills `KatapultDesignEndDate`
  - Previous Status = "Katapult QA" → fills `KatapultQAEndDate`
  - Previous Status = "Fault Current" → fills `FaultCurrentEndDate`
  - Previous Status = "PC Review" → fills `PCReviewEndDate`
  - Previous Status = "AEGIS Design" → fills `AEGISDesignEndDate`
  - Previous Status = "AEGIS QA" → fills `AEGISQAEndDate`
  - Previous Status = "Final PC Review" → fills `FinalPCReviewEndDate`
  - Previous Status = "Complete" → fills `CompleteEndDate`
  - Previous Status = "Hold - Documents" → fills `HoldDocumentsEndDate`
  - Previous Status = "Hold - Permits" → fills `HoldPermitsEndDate`
  - Previous Status = "Hold - External" → fills `HoldExternalEndDate`
- **Timing:** Within 1-3 minutes

---

## Power Query / Excel

### Excel File
- **File:** EV_SMC_PM_Tracker.xlsx (shared workbook with EV tracker)
- **Location:** `M Code/EV_SMC_PM_Tracker.xlsx`

### Query Structure (5 queries)

| Query Name | Purpose |
|-----------|---------|
| **Small Cell Connection** | Base connection to SharePoint by GUID |
| **Small Cell Projects Main** | Transforms raw data into report format |
| **SC_SPIDA_Data** | Reads SPIDA analysis data from Excel table |
| **SC_SPIDA_Mapping** | Status mapping table for SPIDA comparison |
| **SCX_DV** | Merged comparison of List vs. SPIDA data |

### Connection Method
Connected by GUID:
```powerquery
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [Implementation=null, ApiVersion=15]),
#"52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df" = Source{[Id="52ef3e3a-cc8e-4f0e-b26b-f6fc0078e0df"]}[Items]
```

### SPIDA Integration

SPIDA Studio is a separate pole analysis tool. Its data lives only in Excel (NOT in the SharePoint list). The Power Query setup merges SPIDA data with list data for comparison reporting.

- **SPIDA data source:** Excel table within the same workbook
- **SCX_DV query:** Left-joins Small Cell list data with SPIDA data on WO Number, compares statuses to flag discrepancies

### Key M Code Patterns
- **Person fields (Designer, FieldTech):** Expanded using `Table.ExpandRecordColumn` with `{"Title"}`
- **Multi-choice (Permits):** Uses `Text.Combine(List.Transform(_, Text.From), ",")` for comma-separated text
- **SPIDA merge:** Uses `Table.NestedJoin` to combine list and SPIDA data
- **Two-tier structure:** Base connection query + transformation query, plus SPIDA queries

---

**Last Updated:** February 19, 2026
