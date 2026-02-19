# Small Cell Project Overview

> **Understand the complete Small Cell workflow from start to finish**
> 
> This page explains how Small Cell projects flow through TechServ, who does what, and how the Microsoft List tracks progress.

---

## Table of Contents

1. [What is a Small Cell Project?](#what-is-a-small-cell-project)
2. [Key Players](#key-players)
3. [The Complete Workflow](#the-complete-workflow)
4. [Status Guide](#status-guide)
5. [SPIDA Integration](#spida-integration-excel-reports-only)
6. [Common Scenarios](#common-scenarios)
7. [Quick Reference](#quick-reference)

---

## What is a Small Cell Project?

Small cell projects involve installing telecommunications equipment (small cell nodes) on utility poles for wireless carriers. These nodes help expand cellular coverage and capacity in urban and suburban areas.

### Who Requests These Projects?

| Requestor Type | Examples | How They Submit |
|---------------|----------|-----------------|
| **Carriers** | AT&T, Verizon, T-Mobile | Through turf vendors |
| **Turf Vendors** | Crown Castle, ExteNet, MD7 | Via SPIDA application system |
| **Utility Companies** | Oncor, City of Fort Worth | Direct requests |

### What TechServ Does

TechServ handles the **design and engineering** portion:
- Site assessment (Power Walk)
- Data collection and calibration (Katapult)
- Engineering calculations (Fault Current)
- Design creation (AEGIS)
- Quality assurance reviews
- Coordination with Oncor UDs and requestors

---

## Key Players

### Internal Team

| Role | Responsibilities | Tracker Field |
|------|-----------------|---------------|
| **Admin (Megan)** | Receives SPIDA applications, logs projects, assigns teams | Creates list item |
| **Field Crew** | Site visits, power walks, data collection, photos | `FieldTech` field |
| **Designer** | Katapult design, fault current calc, AEGIS design | `Designer` field |
| **QA/QC Reviewer** | Reviews Katapult and AEGIS work, sends corrections | Part of workflow |
| **Small Cell Coordinator** | Final reviews, coordinates with Oncor UD | PC Review stages |

### External Parties

| Role | Responsibilities | Impact on Workflow |
|------|-----------------|-------------------|
| **Oncor UD** | Reviews field design, approves AEGIS design | Can approve, request changes, or place on hold |
| **Requestor** | Approves final design, authorizes payment | Determines project route (MVI, UI, or standard) |
| **Turf Vendors** | Submit applications, receive deliverables | Initial intake and final delivery |

---

## The Complete Workflow

> **Key Difference from EV Projects:** In Small Cell projects, the field crew acts first. Unlike EV projects, no KMZ is created before field work begins.

---

### Phase 1: Intake & Assignment

| Step | Action | Who |
|------|--------|-----|
| 1 | Requestor submits application via SPIDA | Turf Vendor |
| 2 | Admin logs project in tracker | Admin (Megan) |
| 3 | Admin creates new list item | Admin |
| 4 | Admin sets Status = "Power Walk Needed" | Admin |
| 5 | Admin assigns Field Tech and Designer | Admin |
| 6 | Project ready for field work | - |

**Tracker Status:** `Power Walk Needed`

**Who's Working:** Admin assigns, waiting for Field Crew

---

### Phase 2: Field Work & Data Collection

| Step | Action | Who |
|------|--------|-----|
| 1 | Visit site to collect data | Field Crew |
| 2 | Take photos of poles and surroundings | Field Crew |
| 3 | Determine power source options for the small cell node | Field Crew |
| 4 | Complete Katapult Field Data Collection | Field Crew |
| 5 | Upload field data | Field Crew |
| 6 | Change status to "Katapult Design" | Field Crew |

**Tracker Status:** `Power Walk Needed` → `Katapult Design`

**Who's Working:** Field Crew

**End Date Field:** `PowerWalkEndDate` (auto-filled when status changes)

---

### Phase 3: Katapult Design & QA

| Step | Action | Status | Who |
|------|--------|--------|-----|
| 1 | Perform Katapult calibration using field data | Katapult Design | Designer |
| 2 | Complete annotation work | Katapult Design | Designer |
| 3 | Create Fault Current Calculation | Katapult Design | Designer |
| 4 | Submit for QA review | Katapult QA | Designer |
| 5 | Review design accuracy | Katapult QA | QA Reviewer |
| 6 | Check Katapult data quality | Katapult QA | QA Reviewer |
| 7 | Complete fault current analysis | Fault Current | Designer |
| 8 | Internal review before external submission | PC Review | Coordinator |

> **If QA finds issues:** Project returns to Designer for corrections, then resubmits for QA.

**Tracker Statuses (in order):**

| Order | Status | Who's Working |
|-------|--------|---------------|
| 1 | Katapult Design | Designer |
| 2 | Katapult QA | QA Reviewer |
| 3 | Fault Current | Designer |
| 4 | PC Review | Coordinator |

**End Date Fields (auto-filled):**
- `KatapultDesignEndDate`
- `KatapultQAEndDate`
- `FaultCurrentEndDate`
- `PCReviewEndDate`

---

### Phase 4: External Review & Approval

| Step | Action | Who |
|------|--------|-----|
| 1 | Submit to Oncor UD for Field Design Review | Coordinator |
| 2 | Oncor UD reviews design | Oncor UD |
| 3 | Oncor UD responds (see below) | Oncor UD |
| 4 | Once approved, submit to Requestor | Coordinator |
| 5 | Requestor reviews design | Requestor |
| 6 | Requestor determines route (MVI Only, UI Only, or Standard) | Requestor |
| 7 | Requestor grants approval to proceed | Requestor |

**Tracker Status:** `Pending External Review and Approval`

**End Date Field:** `PendExternalEndDate` (auto-filled when leaving this status)

#### Oncor UD Response Options

| Response | What Happens Next |
|----------|------------------|
| **Approved** | Project proceeds to AEGIS Design |
| **Change Request** | Returns to Designer for corrections, then resubmit |
| **On Hold** | Waiting for additional information; set Hold status |

---

### Phase 5: AEGIS Design & Final Review

| Step | Action | Status | Who |
|------|--------|--------|-----|
| 1 | Create detailed engineering design in AEGIS | AEGIS Design | Designer |
| 2 | Prepare cost estimate | AEGIS Design | Designer |
| 3 | Submit for QA review | AEGIS QA | Designer |
| 4 | Review design and cost estimate | AEGIS QA | QA Reviewer |
| 5 | Final coordinator review | Final PC Review | Coordinator |
| 6 | Submit to Oncor UD for AEGIS Review | Final PC Review | Coordinator |
| 7 | Oncor UD reviews and approves | - | Oncor UD |
| 8 | Send to Requestor for Payment Authorization | Delivered | Coordinator |

> **If QA finds issues:** Project returns to Designer for corrections, then resubmits for QA.

**Tracker Statuses (in order):**

| Order | Status | Who's Working |
|-------|--------|---------------|
| 1 | AEGIS Design | Designer |
| 2 | AEGIS QA | QA Reviewer |
| 3 | Final PC Review | Coordinator |
| 4 | Delivered | - |

**End Date Fields (auto-filled):**
- `AEGISDesignEndDate`
- `AEGISQAEndDate`
- `FinalPCReviewEndDate`
- `DeliveredDate`

---

### Phase 6: Construction & Close-out

| Step | Action | Who |
|------|--------|-----|
| 1 | Payment received from Requestor | - |
| 2 | Work Request (WR) goes to Oncor Construction | Oncor |
| 3 | Construction activities begin | Oncor Construction |
| 4 | As-Built documentation (if requested) | Designer |
| 5 | Post-attachment inspection | Oncor |
| 6 | NJUNS ticket management | Coordinator |
| 7 | Release to Attach | Coordinator |
| 8 | Project marked Complete | Coordinator |

**Tracker Status:** `Complete`

**WaAM Status:** Typically `INSERVICE` or `WORKCLOSE`

---

## Status Guide

### Complete Status Progression

| Order | Status | Who's Working | What's Happening |
|-------|--------|---------------|------------------|
| 1 | Power Walk Needed | Field Crew | Site visit, data collection |
| 2 | Katapult Design | Designer | Calibration, annotation |
| 3 | Katapult QA | QA Reviewer | Review Katapult work |
| 4 | Fault Current | Designer | Fault current calculations |
| 5 | PC Review | Coordinator | Internal review before external |
| 6 | Pending External Review and Approval | Oncor UD / Requestor | External approvals |
| 7 | AEGIS Design | Designer | Detailed AEGIS design |
| 8 | AEGIS QA | QA Reviewer | Review AEGIS work |
| 9 | Final PC Review | Coordinator | Final internal review |
| 10 | Delivered | - | Sent to requestor |
| 11 | Complete | - | Project fully finished |

### Hold Statuses

| Status | When to Use | What It Means |
|--------|-------------|---------------|
| Hold - Documents | Missing required documentation | Waiting for paperwork |
| Hold - Permits | Permit application pending | Waiting for permit approval |
| Hold - External | Waiting on external party | Oncor, requestor, or vendor delay |

### Final Statuses

| Status | When to Use |
|--------|-------------|
| Delivered | Design work complete, sent to requestor |
| Complete | Everything done, including construction |
| Canceled | Project will not proceed |

---

## SPIDA Integration (Excel Reports Only)

### What is SPIDA?

**SPIDA Studio** is an external system used by turf vendors (like Crown Castle, ExteNet, etc.) to manage small cell project applications. It is **completely separate** from the Microsoft List - there is no automatic connection between them.

### Two Separate Systems

| System | Purpose | Who Updates It |
|--------|---------|----------------|
| **Microsoft List** | Internal TechServ workflow tracking | TechServ team members |
| **SPIDA Studio** | External vendor project tracking | Turf vendors / requestors |

> **Important:** There is NO automatic data flow between SPIDA and the Microsoft List. They are independent systems that happen to track the same projects.

### When Do They Come Together?

The two systems are **only merged in Excel reports** for comparison purposes. This is done manually.

#### Data Flow for Excel Reports

| Source | Action | Destination |
|--------|--------|-------------|
| SPIDA Studio | Steve exports data manually | Excel `SC_SPIDA` tab |
| Microsoft List | Power Query pulls automatically | Excel SharePoint connection |
| Both sources | Power Query merges data | Excel `SCX_DV` tab (comparison report) |

### How to Update SPIDA Data in Excel

| Step | Action |
|------|--------|
| 1 | Export from SPIDA Studio - Download the project export |
| 2 | Open the Excel PM Tracker (`EV_SMC_PM_Tracker.xlsx`) |
| 3 | Go to the `SC_SPIDA` tab - Clear existing data |
| 4 | Paste the SPIDA export - Make sure column headers match |
| 5 | Click Refresh All in Excel - Power Query will merge the data |
| 6 | Check the `SCX_DV` tab - This shows the combined view with status comparisons |

### Status Mapping (SCX_DV Tab)

The `SCX_DV` tab shows how SPIDA statuses compare to Microsoft List statuses:

| SPIDA Status | Mapped to Internal Status | Status Order |
|--------------|---------------------------|--------------|
| Incoming | Power Walk Needed | 0 |
| Power Walk Needed | Power Walk Needed | 1 |
| Katapult Design | Katapult Design | 2 |
| Katapult QA | Katapult QA | 3 |
| Fault Current | Fault Current | 4 |
| PC Review | PC Review | 5 |
| Pending External... | Pending External... | 6 |
| AEGIS Design | AEGIS Design | 7 |
| AEGIS QA | AEGIS QA | 8 |
| Final PC Review | Final PC Review | 9 |
| Delivered | Delivered | 10 |
| Complete | Complete | 11 |
| Canceled | Canceled | 100 |

### Why Compare Them?

| What You Find | What It Means |
|---------------|---------------|
| SPIDA says "Delivered" but List says "AEGIS Design" | List may need updating |
| High "SPIDA Status Age" value | Project may be stuck |
| Statuses match | Systems are in sync |

---

## Common Scenarios

### Scenario 1: Normal Project Flow

| Step | Action |
|------|--------|
| 1 | Admin receives SPIDA application |
| 2 | Admin creates list item, assigns Field Tech + Designer |
| 3 | Field Crew completes power walk |
| 4 | Designer completes Katapult work |
| 5 | QA approves Katapult |
| 6 | Designer completes fault current |
| 7 | PC reviews and submits to Oncor |
| 8 | Oncor UD approves |
| 9 | Requestor approves |
| 10 | Designer completes AEGIS |
| 11 | QA approves AEGIS |
| 12 | Final review → Delivered → Complete |

**Timeline:** Varies based on complexity, typically 2-6 weeks

---

### Scenario 2: Oncor Requests Changes

| Step | Action |
|------|--------|
| 1 | Project submitted for external review |
| 2 | Oncor UD reviews and requests changes |
| 3 | Status stays at "Pending External Review and Approval" |
| 4 | Designer makes corrections |
| 5 | Resubmit to Oncor UD |
| 6 | Oncor UD approves |
| 7 | Continue normal flow |

**What to do in tracker:**
- Add notes about requested changes
- Keep status at "Pending External Review and Approval" until approved
- Or use Hold status if waiting for extended period

---

### Scenario 3: Project Put on Hold

| Step | Action |
|------|--------|
| 1 | External dependency identified (permit, documentation, etc.) |
| 2 | Change status to appropriate Hold status |
| 3 | Add notes explaining the hold reason |
| 4 | When resolved, change status back to appropriate workflow stage |
| 5 | Continue normal flow |

**Hold Status Options:**

| Use This Status | When |
|-----------------|------|
| Hold - Documents | Missing paperwork |
| Hold - Permits | Waiting for permit delays |
| Hold - External | Other external dependencies |

> **Tip:** The `Previous Status` field helps track where to resume after a hold.

---

### Scenario 4: Project Canceled

| Step | Action |
|------|--------|
| 1 | Decision made to cancel project |
| 2 | Change status to `Canceled` |
| 3 | `CanceledDate` is automatically set |
| 4 | Add notes explaining cancellation reason |
| 5 | Project stays in list for historical tracking |

---

## Quick Reference

### Key Fields to Track

| What You Need | Field to Check |
|---------------|----------------|
| Who's the designer? | Designer |
| Who did field work? | Field Tech |
| What's the current stage? | Status |
| How long in each stage? | End Date fields |
| Who's the Oncor contact? | Oncor UD |
| What carrier? | Customer |
| Who submitted it? | Subcontractor |

### Status Change Automation

When you change the Status field, the tracker automatically:

| What Happens | Field Affected |
|--------------|----------------|
| Records the previous status | `Previous Status` |
| Fills in the End Date for the stage you're leaving | Various End Date fields |
| Timestamps when the status changed | Automatic |

### Date Fields Reference

| When This Status Ends... | This Field Gets Filled |
|--------------------------|----------------------|
| Power Walk Needed | `PowerWalkEndDate` |
| Katapult Design | `KatapultDesignEndDate` |
| Katapult QA | `KatapultQAEndDate` |
| Fault Current | `FaultCurrentEndDate` |
| PC Review | `PCReviewEndDate` |
| Pending External Review | `PendExternalEndDate` |
| AEGIS Design | `AEGISDesignEndDate` |
| AEGIS QA | `AEGISQAEndDate` |
| Final PC Review | `FinalPCReviewEndDate` |

---

## Related Documentation

- [User Guide](guide) - Detailed field definitions and list settings
- [Automation Guide](automation) - How the Status End Date Tracker works
- [Excel Info](excel-info) - Power Query M Code and SPIDA integration details
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistance

---

**Last Updated:** February 19, 2026
