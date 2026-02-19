# EV Team Tracker - AI Context File

> Give this file to ChatGPT, Claude, or Copilot before asking questions about the EV Tracker. It contains the full schema, workflow, automation, and Power Query details.

## Project Overview

The EV Team Tracker is a Microsoft List on SharePoint that tracks Electric Vehicle infrastructure design projects from intake through construction and completion. EV projects involve designing electrical infrastructure (transformers, switchgear, power delivery) for EV charging stations.

- **SharePoint Site:** `https://techservltd.sharepoint.com/sites/OncorDesign`
- **List URL:** `https://techservltd.sharepoint.com/sites/OncorDesign/Lists/EV Team Tracker/`
- **List GUID:** `8a3e9545-9078-46e7-9086-8e6379ef58ea`
- **Active Items:** ~495 projects
- **Total Fields:** 65 columns

---

## Status Workflow

```
KMZ Creation → Power Walk Needed → Prelim Package Development → Prelim Final Review → Pending Ext. Prelim Approval → AEGIS Design → AEGIS QA → Final Package Review → Pending Final Oncor Approval → Staking → Pending Construction → As-Built Needed → Send Design Verify → Complete
```

### Hold Statuses
Hold - Customer, Hold - Documents, Hold - Permits, Hold - DASH

### Final Statuses
Complete, Canceled

### All 19 Status Options
KMZ Creation, Power Walk Needed, Prelim Package Development, Prelim Final Review, Pending Ext. Prelim Approval, AEGIS Design, AEGIS QA, Final Package Review, Pending Final Oncor Approval, Staking, Pending Construction, As-Built Needed, Send Design Verify, Complete, Hold - Customer, Hold - Documents, Hold - Permits, Hold - DASH, Canceled

---

## Complete Field Reference

### Required Fields

| Display Name | Internal Name | Type | Notes |
|-------------|---------------|------|-------|
| Job Name | `ProjectName` | Text | Project/job name |
| Start Date | `ReceivedDate` | Date | When project was received |
| Field Tech | `FieldTech` | Person | Field technician assigned |
| Designer | `Designer` | Person | Designer assigned |
| Oncor UD | `OncorUD` | Choice | Oncor utility designer |
| TS SOW | `TSSOW` | Number | TechServ scope of work number |
| Customer | `Customer` | Choice | 200+ customer options |

### Project Identification

| Display Name | Internal Name | Type |
|-------------|---------------|------|
| Title | `Title` | Text | Work order number |
| WR | `WR` | Number | Work request number |
| Location Type | `JobType` | Choice | ONSITE, OFFSITE, CAPBANK |

### Status Tracking

| Display Name | Internal Name | Type |
|-------------|---------------|------|
| Status | `Status` | Choice | 19 options (see above) |
| Previous Status | `PreviousStatus` | Text | Auto-filled by flow |
| Status Changed Date | `StatusChangedDate` | Date | Auto-filled by flow |
| WaAM Status | `WaAMStatus` | Choice | APPR, ARCHIVED, HOLD, HOLD-A, INDESIGN, INIT, INPROG, INSERVICE, PENDCAN, WORKCLOSE |

### Key Date Fields

| Display Name | Internal Name | Type |
|-------------|---------------|------|
| Start Date | `ReceivedDate` | Date |
| Prelim Submission Date | `PrelimSubmitted` | Date |
| Prelim Approved Date | `PrelimApprovedDate` | Date |
| Delivered Date | `DeliveredDate` | Date |
| Design Verified Date | `DesignVerifiedSent` | Date |
| Canceled Date | `CanceledDate` | Date |
| As-Build Complete | `As_x002d_BuildComplete` | Date |
| PowerWalk Complete | `PowerWalkComplete` | Date |
| Final Stake | `FinalStake` | Date |
| PPD Complete Date | `PPDCompleteDate` | Date |
| CRD | `CRD` | Date | Customer requested date |

### Status End Date Fields (auto-filled when leaving each status)

| Display Name | Internal Name | Filled When Leaving |
|-------------|---------------|-------------------|
| KMZ Creation End Date | `KMZCreationEndDate` | KMZ Creation |
| PPD End | `PPDEnd` | Prelim Package Development |
| Prelim Final Review End Date | `PrelimFinalReviewEndDate` | Prelim Final Review |
| AEGIS Design End | `AEGISDesignEnd` | AEGIS Design |
| AEGIS QA End | `AEGISQAEnd` | AEGIS QA |
| Final Package Review End Date | `FinalPackageReviewEndDate` | Final Package Review |
| Final Oncor Approval End Date | `FinalOncorApprovalEndDate` | Pending Final Oncor Approval |
| Construction End Date | `ConstructionEndDate` | Pending Construction |
| As-Built Needed End Date | `AsBuiltNeededEndDate` | As-Built Needed |
| Complete End Date | `CompleteEndDate` | Complete |

### Other Fields

| Display Name | Internal Name | Type |
|-------------|---------------|------|
| Permit Type | `PermitTypeReq_x003f_` | Multi-Choice | CITY, COUNTY, TXDOT, Army Corp, Eng. Corp, Railroad, TLINE, Easement, FAA, N/A |
| Permit Submitted | `PermitSubmitted` | Date |
| Permit Received | `PermitReceived` | Date |
| Equipment | `Equipment` | Text |
| Equipment Order Date | `EquipmentOrderDate` | Date |
| As-Build Required? | `As_x002d_BuildRequired_x003f_` | Yes/No |
| SharePoint Link | `SharePointLink` | Hyperlink |
| Notes | `Notes` | Multi-line text |

**Internal name encoding:** `_x002d_` = hyphen, `_x003f_` = question mark

---

## Power Automate Flows

### Flow 1: Status Change Logger
- **Trigger:** Status field changes
- **Actions:**
  1. Calculates days in previous status: `div(sub(ticks(utcNow()), ticks(item()?['StatusChangedDate'])), 864000000000)`
  2. Adds row to Excel log (TblEV table): WO Number, Project Name, Previous Status, New Status, Days in Previous Status, Changed Date
  3. Updates list item: `PreviousStatus` = old status, `StatusChangedDate` = today
- **Excel Log Location:** `/sites/OncorDesign/Shared Documents/Status Changes.xlsx` (table: TblEV)
- **Timing:** Within 1-3 minutes

---

## Power Query / Excel

### Excel File
- **File:** EV_SMC_PM_Tracker.xlsx (shared with Small Cell)
- **Location:** `M Code/EV_SMC_PM_Tracker.xlsx`

### Query Structure
Two queries work together:
1. **EV Team Tracker** — base connection to SharePoint by GUID
2. **EV Projects** — transforms and cleans data for reporting

### Connection Method
Connected by GUID:
```powerquery
Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [Implementation=null, ApiVersion=15]),
#"8a3e9545-9078-46e7-9086-8e6379ef58ea" = Source{[Id="8a3e9545-9078-46e7-9086-8e6379ef58ea"]}[Items]
```

### M Code — Query 1: EV Team Tracker (Base)

```powerquery
let
    Source = SharePoint.Tables("https://techservltd.sharepoint.com/sites/OncorDesign", [Implementation=null, ApiVersion=15]),
    #"8a3e9545-9078-46e7-9086-8e6379ef58ea" = Source{[Id="8a3e9545-9078-46e7-9086-8e6379ef58ea"]}[Items],
    #"Renamed Columns" = Table.RenameColumns(#"8a3e9545-9078-46e7-9086-8e6379ef58ea", {{"ID", "ID.1"}})
in
    #"Renamed Columns"
```

### M Code — Query 2: EV Projects (Main)

```powerquery
let
    Source = #"EV Team Tracker",
    #"Removed Columns" = Table.RemoveColumns(Source,{"FileSystemObjectType", "Id", "ServerRedirectedEmbedUri", "ServerRedirectedEmbedUrl", "ContentTypeId", "OData__ColorTag", "ComplianceAssetId", "ProjectName"}),
    #"Changed Type" = Table.TransformColumnTypes(#"Removed Columns",{{"ReceivedDate", type date}, {"PrelimSubmitted", type date}, {"PrelimApprovedDate", type date}, {"DeliveredDate", type date}, {"DesignVerifiedSent", type date}, {"CanceledDate", type date}, {"As-BuildComplete", type date}}),
    #"Extracted Values" = Table.TransformColumns(#"Changed Type", {"PermitTypeReq?", each Text.Combine(List.Transform(_, Text.From), ","), type text}),
    #"Changed Type1" = Table.TransformColumnTypes(#"Extracted Values",{{"PowerWalkComplete", type date}, {"FinalStake", type date}, {"PermitSubmitted", type date}, {"PermitReceived", type date}}),
    #"Expanded Designer" = Table.ExpandRecordColumn(#"Changed Type1", "Designer", {"Title"}, {"Title.1"}),
    #"Renamed Columns" = Table.RenameColumns(#"Expanded Designer", {{"Title.1", "Designer"}}),
    #"Expanded FieldTech" = Table.ExpandRecordColumn(#"Renamed Columns", "FieldTech", {"Title"}, {"Title.1"}),
    #"Renamed Columns1" = Table.RenameColumns(#"Expanded FieldTech", {{"Title.1", "Field Tech"}}),
    #"Removed Columns1" = Table.RemoveColumns(#"Renamed Columns1",{"Author", "Editor", "ID.1", "Modified", "Created", "AuthorId", "EditorId", "OData__UIVersionString", "Attachments", "GUID", "FirstUniqueAncestorSecurableObject", "RoleAssignments", "AttachmentFiles", "ContentType", "GetDlpPolicyTip", "FieldValuesAsHtml", "FieldValuesAsText", "FieldValuesForEdit", "File", "Folder", "LikedByInformation", "ParentList", "Properties", "Versions"}),
    #"Changed Type2" = Table.TransformColumnTypes(#"Removed Columns1", {{"CRD", type date}}),
    #"Reordered Columns" = Table.ReorderColumns(#"Changed Type2",{"Title", "JobType", "Status", "Customer", "Field Tech", "Designer", "ReceivedDate", "PrelimSubmitted", "PrelimApprovedDate", "DeliveredDate", "DesignVerifiedSent", "CanceledDate", "As-BuildRequired?", "As-BuildComplete", "FieldTechId", "FieldTechStringId", "PowerWalkComplete", "FinalStake", "PermitTypeReq?", "PermitSubmitted", "PermitReceived", "Equipment", "EquipmentOrderDate", "PPDEnd", "AEGISDesignEnd", "AEGISQAEnd", "ConstructionEndDate", "DesignerId", "DesignerStringId", "PPDCompleteDate", "WR", "OncorUD", "CRD", "TSSOW", "ClosingDate"}),
    #"Removed Columns2" = Table.RemoveColumns(#"Reordered Columns",{"FieldTechId", "FieldTechStringId", "DesignerId", "DesignerStringId"}),
    #"Reordered Columns1" = Table.ReorderColumns(#"Removed Columns2",{"Title", "JobType", "Status", "Designer", "Field Tech", "OncorUD", "Customer", "TSSOW", "CRD", "ReceivedDate", "PrelimSubmitted", "PrelimApprovedDate", "DeliveredDate", "DesignVerifiedSent", "CanceledDate", "As-BuildRequired?", "As-BuildComplete", "PowerWalkComplete", "FinalStake", "PermitTypeReq?", "PermitSubmitted", "PermitReceived", "PPDEnd", "AEGISDesignEnd", "AEGISQAEnd", "ConstructionEndDate", "PPDCompleteDate", "ClosingDate", "Equipment", "EquipmentOrderDate", "WR"})
in
    #"Reordered Columns1"
```

### Key M Code Patterns
- **Person fields (Designer, FieldTech):** Uses `Table.ExpandRecordColumn` with `{"Title"}` to get display name
- **Multi-choice (Permit Type):** Uses `Text.Combine(List.Transform(_, Text.From), ",")` for comma-separated text
- **Two-query structure:** Base query connects by GUID, main query references it and transforms

---

**Last Updated:** February 19, 2026
