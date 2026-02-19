# EV Project Overview

> **Understand the complete EV workflow from start to finish**
> 
> This page explains how Electric Vehicle (EV) infrastructure projects flow through TechServ, who does what, and how the Microsoft List tracks progress.

---

## Table of Contents

1. [What is an EV Project?](#what-is-an-ev-project)
2. [Key Players](#key-players)
3. [The Complete Workflow](#the-complete-workflow)
4. [Status Guide](#status-guide)
5. [Common Scenarios](#common-scenarios)
6. [Quick Reference](#quick-reference)

---

## What is an EV Project?

EV projects involve designing and installing electrical infrastructure to support Electric Vehicle charging stations. This includes transformer installations, switchgear connections, and power delivery systems.

### Who Requests These Projects?

| Requestor Type | Examples | How They Submit |
|---------------|----------|-----------------|
| **EV Charging Companies** | Tesla, ChargePoint, EVgo, Electrify America | Through Oncor UD |
| **Commercial Properties** | Retail centers, office buildings, apartment complexes | Through Oncor UD |
| **Fleet Operations** | Delivery companies, transit authorities | Through Oncor UD |

### What TechServ Does

TechServ handles the **design and engineering** portion:
- Route planning (KMZ Creation)
- Site assessment (Power Walk)
- Preliminary design package development
- Fault current calculations
- AEGIS detailed design
- Quality assurance reviews
- Coordination with Oncor UDs and customers

### Project Types

| Type | Description |
|------|-------------|
| **ONSITE** | Transformer and equipment located on customer property |
| **OFFSITE** | Equipment located in utility right-of-way or easement |
| **CAPBANK** | Capacitor bank installation projects |

---

## Key Players

### Internal Team

| Role | Responsibilities | Tracker Field |
|------|-----------------|---------------|
| **Designer** | KMZ creation, prelim package, fault current calc, AEGIS design | `Designer` field |
| **Field Crew (Levi/Glenn)** | Power walks, site photos, field design PDF | `FieldTech` field |
| **Roy (SME)** | Final verification, Oncor coordination | Prelim/Final Review stages |
| **QA/QC Group** | Reviews AEGIS design, sends corrections | Part of workflow |

### External Parties

| Role | Responsibilities | Impact on Workflow |
|------|-----------------|-------------------|
| **Oncor UD** | Reviews packages, presents to customer, approves designs | Can approve, request changes, or hold |
| **Customer** | Approves preliminary design, authorizes construction | Determines if project proceeds |

---

## The Complete Workflow

> **Key Difference from Small Cell Projects:** In EV projects, the Designer creates a KMZ first to plan the route. The Field Crew then validates this plan during the Power Walk.

---

### Phase 1: KMZ Creation

| Step | Action | Who |
|------|--------|-----|
| 1 | Receive customer site plan from Oncor UD | Designer |
| 2 | Review site plan and identify project scope | Designer |
| 3 | Identify nearest power source (switchgear, riser, existing transformer) | Designer |
| 4 | Create KMZ showing route from power source to proposed transformer location | Designer |
| 5 | Send KMZ + site plan to assigned Field Tech | Designer |
| 6 | Change status to "Power Walk Needed" | Designer |

**Tracker Status:** `KMZ Creation` → `Power Walk Needed`

**Who's Working:** Designer

**End Date Field:** `KMZCreationEndDate` (auto-filled when status changes)

---

### Phase 2: Power Walk (Field Work)

| Step | Action | Who |
|------|--------|-----|
| 1 | Visit site with KMZ route plan | Field Crew |
| 2 | Validate proposed route from KMZ | Field Crew |
| 3 | Take photos of power source, proposed transformer location, and any obstructions | Field Crew |
| 4 | Create Field Design PDF from template | Field Crew |
| 5 | Include measurements, GPS coordinates, and site conditions in Field Design | Field Crew |
| 6 | Upload photos and Field Design to SharePoint | Field Crew |
| 7 | Change status to "Prelim Package Development" | Field Crew |

**Tracker Status:** `Power Walk Needed` → `Prelim Package Development`

**Who's Working:** Field Crew (Levi/Glenn)

**End Date Field:** `PowerWalkComplete` (date field for when power walk finished)

**Field Design PDF includes:**
- Measurements and distances
- GPS coordinates
- Site conditions assessment
- Photos of power source
- Photos of proposed transformer location
- Photos of any obstructions or concerns

---

### Phase 3: Prelim Package Development

| Step | Action | Who |
|------|--------|-----|
| 1 | Review Field Design PDF for accuracy | Designer |
| 2 | Create Fault Current Calculation | Designer |
| 3 | Develop preliminary design package | Designer |
| 4 | Send Field Design + Fault Current Calc to Roy for verification | Designer |
| 5 | Change status to "Prelim Final Review" | Designer |

**Tracker Status:** `Prelim Package Development` → `Prelim Final Review`

**Who's Working:** Designer

**End Date Field:** `PPDEnd` (auto-filled when status changes)

---

### Phase 4: Prelim Final Review

| Step | Action | Who |
|------|--------|-----|
| 1 | Verify prelim package meets Oncor standards | Roy (SME) |
| 2 | Check fault current calculations | Roy |
| 3 | Review field design for completeness | Roy |
| 4 | Send Field Design + Fault Current Calc to Oncor UD | Roy |
| 5 | Oncor UD presents package to customer for approval | Oncor UD |
| 6 | Change status to "Pending Ext. Prelim Approval" | Roy |

**Tracker Status:** `Prelim Final Review` → `Pending Ext. Prelim Approval`

**Who's Working:** Roy (SME) → Oncor UD

**End Date Field:** `PrelimFinalReviewEndDate` (auto-filled when status changes)

---

### Phase 5: Customer Approval

| Step | Action | Who |
|------|--------|-----|
| 1 | Oncor UD presents preliminary package to customer | Oncor UD |
| 2 | Customer reviews proposed design | Customer |
| 3 | Customer responds (see options below) | Customer |
| 4 | Once approved, project proceeds to AEGIS Design | - |

**Tracker Status:** `Pending Ext. Prelim Approval` → `AEGIS Design`

**Who's Working:** Oncor UD, Customer (external)

**Date Fields:**
- `PrelimSubmitted` - When prelim was sent
- `PrelimApprovedDate` - When customer approved

#### Customer Response Options

| Response | What Happens Next |
|----------|------------------|
| **Approved** | Project proceeds to AEGIS Design |
| **Revisions Needed** | Returns to Designer for corrections, then resubmit |
| **On Hold** | Waiting for customer decision; set appropriate Hold status |
| **Canceled** | Customer decides not to proceed; mark as Canceled |

---

### Phase 6: AEGIS Design (Post-Approval)

| Step | Action | Who |
|------|--------|-----|
| 1 | Receive customer approval notification | Designer |
| 2 | Create detailed design in AEGIS | Designer |
| 3 | Prepare work prints and maps | Designer |
| 4 | Send design to QA/QC Group for review | Designer |
| 5 | QA/QC reviews and provides corrections if needed | QA/QC Group |
| 6 | Designer makes corrections (if any) | Designer |
| 7 | Change status to "AEGIS QA" | Designer |

**Tracker Status:** `AEGIS Design` → `AEGIS QA`

**Who's Working:** Designer → QA/QC Group

**End Date Field:** `AEGISDesignEnd` (auto-filled when status changes)

> **If QA finds issues:** Project returns to Designer for corrections, then resubmits for QA review.

---

### Phase 7: Final Review & Delivery

| Step | Action | Who |
|------|--------|-----|
| 1 | Final verification after QA/QC pass | Roy (SME) |
| 2 | Prepare DCE (Design Cost Estimate) package | Roy |
| 3 | Package includes: CIAC details, map/work prints, work instructions | Roy |
| 4 | Send DCE package to Oncor UD | Roy |
| 5 | Change status to "Pending Final Oncor Approval" | Roy |

**Tracker Status:** `AEGIS QA` → `Final Package Review` → `Pending Final Oncor Approval`

**Who's Working:** Roy (SME)

**End Date Fields:**
- `AEGISQAEnd` (auto-filled when leaving AEGIS QA)
- `FinalPackageReviewEndDate` (auto-filled when leaving Final Package Review)

**DCE Package Contents:**
- CIAC (Contribution In Aid of Construction) details
- Map/work prints
- Work instructions for construction crew
- Cost estimates

---

### Phase 8: Oncor Response & Construction

| Step | Action | Who |
|------|--------|-----|
| 1 | Oncor UD reviews DCE package | Oncor UD |
| 2 | Oncor responds (see options below) | Oncor UD |
| 3 | Once approved, project proceeds to construction | - |
| 4 | Construction staking completed | Oncor/Contractor |
| 5 | Construction activities | Oncor/Contractor |
| 6 | As-built documentation (if required) | Designer |
| 7 | Design verification sent | Designer |
| 8 | Project marked Complete | - |

**Tracker Statuses (in order):**

| Order | Status | Who's Working |
|-------|--------|---------------|
| 1 | Pending Final Oncor Approval | Oncor UD |
| 2 | Staking | Oncor/Contractor |
| 3 | Pending Construction | Oncor/Contractor |
| 4 | As-Built Needed | Designer (if required) |
| 5 | Send Design Verify | Designer |
| 6 | Complete | - |

**End Date Fields:**
- `FinalOncorApprovalEndDate`
- `ConstructionEndDate`
- `AsBuiltNeededEndDate`
- `CompleteEndDate`

#### Oncor Response Options

| Response | What Happens Next |
|----------|------------------|
| **Approved** | Project proceeds to Staking/Construction |
| **Revisions Needed** | Returns to AEGIS Design for corrections, then resubmit |

---

## Status Guide

### Complete Status Progression

| Order | Status | Who's Working | What's Happening |
|-------|--------|---------------|------------------|
| 1 | KMZ Creation | Designer | Planning route, creating KMZ |
| 2 | Power Walk Needed | Field Crew | Site visit, photos, field design |
| 3 | Prelim Package Development | Designer | Developing prelim package, fault current |
| 4 | Prelim Final Review | Roy (SME) | Verifying prelim meets standards |
| 5 | Pending Ext. Prelim Approval | Oncor UD / Customer | Customer approval process |
| 6 | AEGIS Design | Designer | Detailed AEGIS design |
| 7 | AEGIS QA | QA/QC Group | Review AEGIS work |
| 8 | Final Package Review | Roy (SME) | Final verification |
| 9 | Pending Final Oncor Approval | Oncor UD | Final Oncor approval |
| 10 | Staking | Oncor/Contractor | Construction staking |
| 11 | Pending Construction | Oncor/Contractor | Active construction |
| 12 | As-Built Needed | Designer | As-built documentation |
| 13 | Send Design Verify | Designer | Design verification |
| 14 | Complete | - | Project fully finished |

### Hold Statuses

| Status | When to Use | What It Means |
|--------|-------------|---------------|
| Hold - Customer | Customer hasn't responded/decided | Waiting on customer |
| Hold - Documents | Missing required documentation | Waiting for paperwork |
| Hold - Permits | Permit application pending | Waiting for permit approval |
| Hold - DASH | DASH system work required | Waiting for DASH completion |

### Final Statuses

| Status | When to Use |
|--------|-------------|
| Complete | Everything done, including construction |
| Canceled | Project will not proceed |

---

## Common Scenarios

### Scenario 1: Normal Project Flow

| Step | Action |
|------|--------|
| 1 | Oncor UD sends site plan to Designer |
| 2 | Designer creates KMZ and sends to Field Tech |
| 3 | Field Crew completes power walk, uploads Field Design PDF |
| 4 | Designer develops prelim package with fault current calc |
| 5 | Roy verifies and sends to Oncor UD |
| 6 | Customer approves preliminary design |
| 7 | Designer creates AEGIS design |
| 8 | QA/QC reviews and approves |
| 9 | Roy sends DCE package to Oncor UD |
| 10 | Oncor approves → Construction → Complete |

**Timeline:** Varies based on complexity, typically 4-12 weeks

---

### Scenario 2: Customer Requests Changes to Prelim

| Step | Action |
|------|--------|
| 1 | Prelim package sent to customer via Oncor UD |
| 2 | Customer requests changes to proposed design |
| 3 | Status returns to "Prelim Package Development" |
| 4 | Designer makes requested changes |
| 5 | Updated package sent back through Roy |
| 6 | Customer reviews again |
| 7 | Customer approves |
| 8 | Continue to AEGIS Design |

**What to do in tracker:**
- Add notes about requested changes
- Move status back to appropriate stage
- Track the revision cycle

---

### Scenario 3: Oncor Requests AEGIS Revisions

| Step | Action |
|------|--------|
| 1 | DCE package submitted to Oncor UD |
| 2 | Oncor UD reviews and requests revisions |
| 3 | Status returns to "AEGIS Design" |
| 4 | Designer makes corrections in AEGIS |
| 5 | Resubmit through QA/QC |
| 6 | Roy resends to Oncor UD |
| 7 | Oncor approves |
| 8 | Continue to construction |

---

### Scenario 4: Project Put on Hold

| Step | Action |
|------|--------|
| 1 | External dependency identified |
| 2 | Change status to appropriate Hold status |
| 3 | Add notes explaining the hold reason |
| 4 | When resolved, change status back to appropriate workflow stage |
| 5 | Continue normal flow |

**Hold Status Options:**

| Use This Status | When |
|-----------------|------|
| Hold - Customer | Customer hasn't made a decision |
| Hold - Documents | Missing paperwork or approvals |
| Hold - Permits | Permit delays (city, county, TxDOT) |
| Hold - DASH | Waiting for DASH system work |

> **Tip:** The `Previous Status` field helps track where to resume after a hold.

---

### Scenario 5: Project Canceled

| Step | Action |
|------|--------|
| 1 | Customer or Oncor decides not to proceed |
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
| Who's the Oncor contact? | Oncor UD |
| What customer? | Customer |
| Project type? | Location Type (ONSITE/OFFSITE/CAPBANK) |
| Is as-built needed? | As-Build Required? |

### Status Change Automation

When you change the Status field, the tracker automatically:

| What Happens | Field Affected |
|--------------|----------------|
| Records the previous status | `Previous Status` |
| Fills in the End Date for the stage you're leaving | Various End Date fields |
| Records when status changed | `Status Changed Date` |

### Date Fields Reference

| When This Status Ends... | This Field Gets Filled |
|--------------------------|----------------------|
| KMZ Creation | `KMZCreationEndDate` |
| Prelim Package Development | `PPDEnd` |
| Prelim Final Review | `PrelimFinalReviewEndDate` |
| AEGIS Design | `AEGISDesignEnd` |
| AEGIS QA | `AEGISQAEnd` |
| Final Package Review | `FinalPackageReviewEndDate` |
| Pending Final Oncor Approval | `FinalOncorApprovalEndDate` |
| Pending Construction | `ConstructionEndDate` |
| As-Built Needed | `AsBuiltNeededEndDate` |
| Complete | `CompleteEndDate` |

### Permit Types

If permits are required, track them with these fields:

| Field | Purpose |
|-------|---------|
| Permit Type | Type of permit needed (CITY, COUNTY, TXDOT, etc.) |
| Permit Submitted | Date permit application was submitted |
| Permit Received | Date permit was approved/received |

---

## Visual Workflow Summary

```
PRELIM WORKFLOW
===============
[Site Plan Received from Oncor UD]
         ↓
   KMZ Creation (Designer)
   - Identify power source
   - Plan route to transformer
   - Send KMZ to Field Tech
         ↓
   Power Walk (Field Crew)
   - Validate route on-site
   - Take photos
   - Create Field Design PDF
         ↓
   Prelim Package Development (Designer)
   - Review Field Design
   - Create Fault Current Calc
         ↓
   Prelim Final Review (Roy)
   - Verify meets Oncor standards
   - Send to Oncor UD
         ↓
   Customer Approval
   - Oncor UD presents to customer
   - Customer approves/rejects


AEGIS DESIGN WORKFLOW (Post-Approval)
=====================================
   AEGIS Design (Designer)
   - Create detailed design
   - Send to QA/QC
         ↓
   AEGIS QA (QA/QC Group)
   - Review and corrections
         ↓
   Final Review (Roy)
   - Final verification
   - Prepare DCE package
   - Send to Oncor UD
         ↓
   Oncor Response
   - Approved → Construction
   - Revisions → Back to AEGIS Design
         ↓
   Construction → As-Built → Complete
```

---

## Related Documentation

- [User Guide](guide) - Detailed field definitions and list settings
- [Automation Guide](automation) - How status change tracking works
- [Excel Info](excel-info) - Power Query M Code documentation
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistance

---

**Last Updated:** February 19, 2026
