# Closing Tracker - AI Context File

> Give this file to ChatGPT, Claude, or Copilot before asking questions about the Closing Tracker. It contains the full schema, workflow, automation, and Power Query details.

## Project Overview

The Closing Tracker is a Microsoft List on SharePoint that manages the closing process of work orders after construction completion. It tracks as-built documentation, batch processing, external communications with storerooms and FCCs, and final WIMS closing.

- **SharePoint Site:** `https://techservltd.sharepoint.com/sites/OncorDesign`
- **List URL:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Closing Tracker/`
- **List Name:** Closing Tracker
- **Connection Method:** Connected by list title (not GUID)
- **Active Items:** ~314 work orders
- **Total Fields:** 60 columns

---

## Status Workflow

```
Ready for Assignment → Processing → QC Reviewing → Finalizing → Closed → Completed
```

Statuses: Ready for Assignment, Processing, QC Reviewing, Finalizing, Closed, Completed

### Checkpoint Stages (sub-stages within Processing)

Initial Review → Awaiting External Response → As-Built Production → Pre-Batch → Batch Queued → Batch Failed (Retry Needed) → Auditing

### Blocker Options

Request Force Close, Request Field Audit, Request to Cancel, Request As-Built Var., Dash Required

---

## Complete Field Reference

### Core Fields

| Display Name | Internal Name | Type | Notes |
|-------------|---------------|------|-------|
| Title | `Title` | Text | Work order number |
| WIMS WR Number | `WIMSWRNumber` | Text | WIMS Work Request number |
| CLOSER | `field_1` | Person (multi) | Assigned closer(s) |
| STATUS | `STATUS` | Choice | Current status |
| CHECKPOINT | `Checkpoint` | Choice | Sub-stage within Processing |
| BLOCKER | `BLOCKER` | Choice | Single blocker (legacy) |
| BLOCKERS | `BLOCKERS` | Multi-Choice | Multiple blockers (recommended) |
| STATUS CHANGED DATE | `field_5` | Date | When status last changed |
| DAYS IN STATUS | `field_4` | Text | Days in current status (auto-updated by flow) |
| SOX TIMER | `field_10` | Number | Sarbanes-Oxley compliance timer |
| Last Touched | `LastContacted` | Date | Last time someone worked on item |
| DESIGN GROUP | `DESIGNGROUP` | Choice | 1510, 2400, CDG, DA, ETX MAJOR, ETXNCM, EV, RDG, SMALL CELL, SRP, WTX MAJOR, WTXNCM, STREETLIGHT |
| INVOICE-TO | `INVOICE_x002d_TO_x002d_` | Choice | Various Oncor contacts |
| STATION COUNT | `field_7` | Number | Number of stations |
| INSERVICE DATE | `field_9` | Date | When work went into service |
| Comments | `Comments` | Multi-line text | General notes |
| Personal notes | `Personalnotes` | Text | Closer's personal notes |
| StatusOrder | `StatusOrder` | Calculated | Numeric ordering for sorting |

### External Contact Fields

| Display Name | Internal Name | Type | Options |
|-------------|---------------|------|---------|
| EXT CONTACT STATUS | `EXTCONTACTSTATUS` | Choice | Evaluate Contact Need, Pending FCC Response, Pending Storeroom Response, Response Received |
| Storeroom Status | `StoreroomStatus` | Choice | Evaluate Contact Need, Pending Storeroom Response, Storeroom Responded |
| FCC Status | `FCCStatus` | Choice | Evaluate Contact Need, Pending FCC Response, FCC Responded |

### Stage Date Tracking Fields

| Stage | Start Field | End Field |
|-------|------------|-----------|
| Storeroom | `SRStart` | `SREnd` |
| FCC | `FCCStart` | `FCCEnd` |
| Design Manager | `DMStart` | `DMEnd` |
| Escalated | `EscalatedStart` | `EscalatedEnd` |
| Variance | `VarianceStart` | `VarianceEnd` |
| Batch Failure | `BatchFailureStart` | `BatchFailureEnd` |
| WFIMWC | `WFIMWCStart` | `WFIMWCEnd` |
| DASH | `DASHStart` | `DASHEnd` |

---

## Power Automate Flows

### Flow 1: Status Change Tracker
- **Trigger:** STATUS field changes
- **Actions:** Sets `field_5` (STATUS CHANGED DATE) to today, resets `field_4` (DAYS IN STATUS) to 0
- **Timing:** Within 1-2 minutes

### Flow 2: Daily Status Calculator
- **Trigger:** Scheduled daily at 6:00 AM Central
- **Actions:** For all items where STATUS != "Completed": calculates `field_4` = today - `field_5`, calculates `field_10` = today - `field_9`
- **Expression:** `div(sub(ticks(utcNow()), ticks(item()?['field_5'])), 864000000000)`

### Flow 3: FCC & Storeroom Tracker
- **Trigger:** StoreroomStatus or FCCStatus changes
- **Actions:**
  - StoreroomStatus = "Pending Storeroom Response" → sets `SRStart` (if empty)
  - StoreroomStatus = "Storeroom Responded" → sets `SREnd` (if SRStart exists and SREnd empty)
  - FCCStatus = "Pending FCC Response" → sets `FCCStart` (if empty)
  - FCCStatus = "FCC Responded" → sets `FCCEnd` (if FCCStart exists and FCCEnd empty)

### Flow 4: Blocker Date Tracker
- **Status:** NOT WORKING. Flow looks for blocker values that don't exist in the list (Damaged Material, Escalated, Pending Variance Approval, etc.). Actual blocker options are: Request Force Close, Request Field Audit, Request to Cancel, Request As-Built Var., Dash Required.
- **Needs:** Flow must be updated to match actual blocker values.

### Flow 5: PC Upload Sync
- **Trigger:** Manual (button click)
- **Actions:** Reads rows from "Closing PM Tracker.xlsx", creates new list items or updates existing ones by matching WO NUMBER to Title field. Sets STATUS = "Ready for Assignment" for new items.
- **Excel location:** `/WO Closing/Trackers/Closing PM Tracker.xlsx`

---

## Common Power Automate Expressions

```
// Calculate Days in Status
div(sub(ticks(utcNow()), ticks(item()?['field_5'])), 864000000000)

// Check if SOX Timer exceeded 30 days
greater(item()?['field_10'], 30)

// Filter stalled items (Processing > 14 days)
and(equals(item()?['STATUS'], 'Processing'), greater(div(sub(ticks(utcNow()), ticks(item()?['field_5'])), 864000000000), 14))
```

---

## Power Query / Excel

### Excel File
- **File:** Closing PM Tracker.xlsx
- **Location:** `M Code/Closing PM Tracker.xlsx`

### Connection Method
Connected by list title (not GUID):
```powerquery
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [Implementation="2.0", ViewMode="All"]),
ClosingTracker = Source{[Title="Closing Tracker"]}[Items]
```

### M Code (Complete Query)

```powerquery
let
    Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [Implementation="2.0", ViewMode="All"]),
    ClosingTracker = Source{[Title="Closing Tracker"]}[Items],
    #"Removed columns" = Table.RemoveColumns(ClosingTracker, {"App Modified By", "App Created By", "Item is a Record", "Label applied by", "Retention label Applied", "Retention label", "Label setting", "Folder Child Count", "Item Child Count", "Type", "Edit", "Attachments", "Version", "Modified By", "Created By", "Created", "Modified", "Content Type", "ID", "StatusOrder", "Comments", "FCC Status", "Storeroom Status", "DM Start", "DM End", "Escalated Start", "Escalated End"}),
    #"Reordered columns" = Table.ReorderColumns(#"Removed columns", {"CLOSER", "Title", "STATUS", "CHECKPOINT", "STATUS CHANGED DATE", "INSERVICE DATE", "SOX TIMER", "Last Touched", "BLOCKERS", "EXT CONTACT STATUS", "STATION COUNT", "DESIGN GROUP", "INVOICE-TO", "BLOCKER", "Color Tag", "Compliance Asset Id", "DAYS IN STATUS", "SR Start", "SR End", "FCC Start", "FCC End", "Variance Start", "Variance End", "BatchFailure Start", "BatchFailure End", "WFIMWC Start", "WFIMWC End", "DASH Start", "DASH End", "WIMS WR Number", "Personal notes"}),
    #"Removed columns 1" = Table.RemoveColumns(#"Reordered columns", {"Compliance Asset Id", "Color Tag"}),
    #"Expanded CLOSER" = Table.ExpandTableColumn(#"Removed columns 1", "CLOSER", {"value"}, {"value"}),
    #"Renamed columns" = Table.RenameColumns(#"Expanded CLOSER", {{"value", "Closer"}}),
    #"Changed column type 1" = Table.TransformColumnTypes(#"Renamed columns", {{"Title", Int64.Type}}),
    #"Expanded BLOCKERS" = Table.TransformColumns(#"Changed column type 1", {{"BLOCKERS", each if _ is null then null else Text.Combine(List.Transform(_, Text.From), ", "), type text}}),
    #"Changed column type 2" = Table.TransformColumnTypes(#"Expanded BLOCKERS", {{"SOX TIMER", Int64.Type}}),
    #"Reordered columns 1" = Table.ReorderColumns(#"Changed column type 2", {"Title", "Closer", "STATUS", "CHECKPOINT", "STATUS CHANGED DATE", "INSERVICE DATE", "SOX TIMER", "Last Touched", "BLOCKERS", "EXT CONTACT STATUS", "STATION COUNT", "DESIGN GROUP", "INVOICE-TO", "BLOCKER", "DAYS IN STATUS", "SR Start", "SR End", "FCC Start", "FCC End", "Variance Start", "Variance End", "BatchFailure Start", "BatchFailure End", "WFIMWC Start", "WFIMWC End", "DASH Start", "DASH End", "WIMS WR Number", "Personal notes"}),
    #"Changed dates" = Table.TransformColumnTypes(#"Reordered columns 1", {{"STATUS CHANGED DATE", type date}, {"INSERVICE DATE", type date}, {"Last Touched", type date}, {"SR Start", type date}, {"SR End", type date}, {"FCC Start", type date}, {"FCC End", type date}, {"Variance Start", type date}, {"Variance End", type date}, {"BatchFailure Start", type date}, {"BatchFailure End", type date}, {"WFIMWC Start", type date}, {"WFIMWC End", type date}, {"DASH Start", type date}, {"DASH End", type date}})
in
    #"Changed dates"
```

### Key M Code Patterns
- **Multi-person field (CLOSER):** Uses `Table.ExpandTableColumn` with `{"value"}` — creates one row per person
- **Multi-choice field (BLOCKERS):** Uses `Text.Combine(List.Transform(_, Text.From), ", ")` — comma-separated text
- **Date conversions:** All 14 date fields converted in a single `Table.TransformColumnTypes` step

---

## StatusOrder Calculated Field Formula

```
=IF([STATUS]="Ready for Assignment",1,IF([STATUS]="Processing",2,IF([STATUS]="QC Reviewing",3,IF([STATUS]="Finalizing",4,IF([STATUS]="Closed",5,IF([STATUS]="Completed",6,99))))))
```

---

**Last Updated:** February 19, 2026
