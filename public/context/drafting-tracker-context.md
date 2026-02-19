# Drafting Team Tracker - AI Context File

> Give this file to ChatGPT, Claude, or Copilot before asking questions about the Drafting Tracker. It contains the full schema, workflow, automation, and Power Query details.

## Project Overview

The Drafting Team Tracker is a Microsoft List on SharePoint that tracks drafting requests, permits, and TxDOT RULIS submissions. Projects flow from intake through drafting production, optional RULIS permitting, and delivery.

- **SharePoint Site:** `https://techservltd.sharepoint.com/sites/OncorDesign`
- **List URL:** `https://techservltd.sharepoint.com/sites/OncorDesign/DraftingTeamTracker`
- **List GUID:** `cf6eb2e2-0e49-4bd4-a896-6c8d643b816e`
- **Total Fields:** ~53 columns

---

## Status Workflow

```
Not Started → In Progress → Delivered
```

### Other Statuses
On Hold, Canceled, Rework - Needed, Rework - In Progress

### All Status Options
Not Started, In Progress, On Hold, Canceled, Delivered, Rework - Needed, Rework - In Progress

### RULIS Status Options (TxDOT Permitting)
Requestor Approval Pending, Ready for RULIS, Design Change Needed, Design Updated, In Progress, Submitted, Additional Info. Req., Info. Provided, Approved, N/A

---

## Complete Field Reference

| Display Name | Internal Name | Type | Notes |
|-------------|---------------|------|-------|
| WO Number | `Title` | Text | Work order number |
| WO Name | `WOName` | Text | Work order name |
| Need Date | `NeedDate` | Date | Customer requested date |
| Design Group | `DesignGroup` | Choice | Design group |
| Your PM | `YourPM` | Person | Project Manager |
| Your PC | `YourPC` | Person | Project Coordinator |
| Client | `Client` | Choice | Client company |
| Requestor | `Requestor` | Person | Who submitted the request |
| Request Type | `RequestType` | Choice | Type of drafting request |
| # of Work Stations | `WorkStations` | Number | Station count |
| Scope of Work | `ScopeOfWork` | Multi-line Text | Description of work |
| Status | `Status` | Choice | Current status |
| Assigned Drafter | `AssignedDrafter` | Person | Drafter assigned to the work |
| Drafting PC | `DraftingPC` | Text | Drafting project coordinator |
| High Priority | `HighPriority` | Yes/No | Priority flag |
| High Priority Reason | `HighPriorityReason` | Multi-line Text | Why it's high priority |
| High Priority Approved? | `HighPriorityApproved` | Yes/No | Manager approval |
| EJT | `EstHoursCalc` | Calculated | Estimated job time |
| Actual Hours | `EstimatedHours` | Text | Actual hours worked |
| Start Date | `StartDate` | Date | Auto-filled when Status → "In Progress" |
| Delivered Date | `DeliveredDate` | Date | Auto-filled when Status → "Delivered" |
| Hold Start Date | `HoldStartDate` | Date | Auto-filled when Status → "On Hold" |
| Hold End Date | `HoldEndDate` | Date | Auto-filled when Status leaves "On Hold" |
| Canceled Date | `CanceledDate` | Date | Auto-filled when Status → "Canceled" |
| RULIS Status | `RULISStatus` | Choice | TxDOT RULIS permitting status |
| RULIS Submission Date | `RULISSubmissionDate` | Date | Auto-filled when RULIS Status → "Submitted" |
| RULIS Additional Info Req. | `RULISAdditionalInfoReq` | Multi-line Text | Info requested by TxDOT |
| RULIS Application Number | `RULISApplicationNumber` | Text | TxDOT application number |
| TxDOT Docs Link | `TxDOTDocsLink` | Hyperlink | Link to TxDOT documents |
| File Link | `FileLink` | Hyperlink | Link to project files |

---

## Power Automate Flows

### Flow 1: Date Stamps
- **Trigger:** Status or RULIS Status field changes
- **Actions:**
  - Status → "In Progress" → sets `StartDate` to today
  - Status → "Delivered" → sets `DeliveredDate` to today
  - Status → "On Hold" → sets `HoldStartDate` to today
  - Status FROM "On Hold" (to anything else) → sets `HoldEndDate` to today
  - Status → "Canceled" → sets `CanceledDate` to today
  - RULIS Status → "Submitted" → sets `RULISSubmissionDate` to today
- **Timing:** Within 1-2 minutes

### Flow 2: RULIS Additional Info Alert
- **Trigger:** RULIS Status changes to "Additional Info. Req."
- **Actions:** Sends a Microsoft Teams message to the Requestor with the content of the `RULISAdditionalInfoReq` field
- **Timing:** Within 1-3 minutes

---

## Power Query / Excel

### Excel File
- **File:** Drafting PM Tracker.xlsx
- **Location:** `M Code/Drafting PM Tracker.xlsx`

### Connection Method
Connected by GUID:
```powerquery
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [ApiVersion = 15]),
DraftingTracker = Source{[Id="cf6eb2e2-0e49-4bd4-a896-6c8d643b816e"]}[Items]
```

### Key M Code Patterns
- **Person fields (YourPM, YourPC, Requestor, AssignedDrafter):** Expanded using `Table.ExpandRecordColumn` with `{"Title"}`
- **Date conversions:** All date fields converted to `type date`
- **Single query structure** (no base + transform split)

### Key Expressions
```
// Calculate days until Need Date
div(sub(ticks(item()?['NeedDate']), ticks(utcNow())), 864000000000)
```

---

**Last Updated:** February 19, 2026
