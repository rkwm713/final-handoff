# Closing Tracker - Project Overview

> **Understand the complete work order closing workflow from start to finish**
>
> This page explains how work orders flow through TechServ's closing process, who does what, and how the Microsoft List tracks progress.

---

## Table of Contents

1. [What is Work Order Closing?](#what-is-work-order-closing)
2. [Key Players](#key-players)
3. [The Complete Workflow](#the-complete-workflow)
4. [Status Guide](#status-guide)
5. [Checkpoint Stages](#checkpoint-stages)
6. [External Contact Workflow](#external-contact-workflow)
7. [Common Scenarios](#common-scenarios)
8. [Quick Reference](#quick-reference)

---

## What is Work Order Closing?

After construction is completed on a utility project, the work order must be formally closed. This involves verifying as-built documentation, reconciling materials with storerooms and Field Construction Coordinators (FCCs), processing batch uploads into WIMS (Work Information Management System), and ensuring SOX compliance timelines are met.

The **Closing Tracker** manages this entire post-construction process for all design groups -- EV, Small Cell, Drafting, and others.

### What TechServ Does

- Reviews completed work orders for accuracy
- Produces or verifies as-built documentation
- Contacts storerooms and FCCs to reconcile materials and field information
- Queues work orders for batch processing into WIMS
- Tracks SOX compliance aging on each work order
- Handles blockers (force close requests, field audits, cancellations, variances)

### Key Statistics

| Detail | Value |
|--------|-------|
| **Active Work Orders** | ~314 |
| **Total Fields** | 60 columns |
| **Design Groups Covered** | 13 (EV, Small Cell, CDG, DA, ETX Major, and more) |
| **Automated Flows** | 5 (status tracking, daily calculations, contact tracking, blocker tracking, Excel sync) |

---

## Key Players

### Internal Team

| Role | Responsibilities | Tracker Field |
|------|-----------------|---------------|
| **Closer** | Assigned to process a work order through the closing workflow | `CLOSER` (field_1) |
| **QC Reviewer** | Reviews closer's work for accuracy before finalizing | Part of QC Reviewing status |
| **Project Coordinator (PC)** | Imports new work orders via Excel sync, manages assignments | Runs PC Upload Sync flow |
| **Team Lead / Manager** | Monitors aging, SOX timers, balances workload | Uses SOX Tracking view |

### External Parties

| Role | Responsibilities | Tracked Via |
|------|-----------------|-------------|
| **Storeroom** | Provides material reconciliation information | Storeroom Status, SRStart, SREnd |
| **FCC (Field Construction Coordinator)** | Provides field verification and site details | FCC Status, FCCStart, FCCEnd |

---

## The Complete Workflow

### Phase 1: Intake & Assignment

| Step | Action | Who |
|------|--------|-----|
| 1 | New work orders are imported from Excel via the PC Upload Sync flow | Project Coordinator |
| 2 | New items enter the list with STATUS = "Ready for Assignment" | Automatic |
| 3 | Team lead reviews new items and assigns a CLOSER | Team Lead |
| 4 | Closer begins working the item | Closer |

**Tracker Status:** `Ready for Assignment` → `Processing`

---

### Phase 2: Processing (Initial Review & External Contacts)

| Step | Action | Who |
|------|--------|-----|
| 1 | Closer reviews work order details and as-built documentation | Closer |
| 2 | Set CHECKPOINT to "Initial Review" | Closer |
| 3 | Determine if storeroom or FCC contact is needed | Closer |
| 4 | If storeroom needed: set Storeroom Status to "Pending Storeroom Response" | Closer |
| 5 | If FCC needed: set FCC Status to "Pending FCC Response" | Closer |
| 6 | Wait for external responses | Closer |
| 7 | When responses arrive, update the contact statuses | Closer |

**Tracker Status:** `Processing`

**Checkpoint progression:** `Initial Review` → `Awaiting External Response` → `As-Built Production`

**Automated:** The FCC & Storeroom Tracker flow automatically records SRStart/SREnd and FCCStart/FCCEnd dates when you change the contact status fields.

---

### Phase 3: As-Built Production & Batch Processing

| Step | Action | Who |
|------|--------|-----|
| 1 | Closer produces or verifies as-built documentation | Closer |
| 2 | Set CHECKPOINT to "Pre-Batch" | Closer |
| 3 | Queue the work order for batch processing | Closer |
| 4 | Set CHECKPOINT to "Batch Queued" | Closer |
| 5 | If batch fails, set CHECKPOINT to "Batch Failed (Retry Needed)" | Closer |
| 6 | Fix the issue and re-queue | Closer |

**Tracker Status:** `Processing`

**Checkpoint progression:** `As-Built Production` → `Pre-Batch` → `Batch Queued` → (if failure: `Batch Failed (Retry Needed)` → `Batch Queued`)

---

### Phase 4: QC Review

| Step | Action | Who |
|------|--------|-----|
| 1 | Closer submits work for quality check | Closer |
| 2 | Change STATUS to "QC Reviewing" | Closer |
| 3 | QC reviewer audits the work | QC Reviewer |
| 4 | Set CHECKPOINT to "Auditing" | QC Reviewer |
| 5 | If corrections needed, return to Closer | QC Reviewer |
| 6 | If approved, proceed to finalizing | QC Reviewer |

**Tracker Status:** `Processing` → `QC Reviewing`

---

### Phase 5: Finalizing & Closing

| Step | Action | Who |
|------|--------|-----|
| 1 | Final touches and documentation cleanup | Closer |
| 2 | Change STATUS to "Finalizing" | Closer |
| 3 | Complete all remaining items | Closer |
| 4 | Change STATUS to "Closed" | Closer |
| 5 | After final verification, change STATUS to "Completed" | Team Lead |

**Tracker Status:** `QC Reviewing` → `Finalizing` → `Closed` → `Completed`

---

## Status Guide

### Complete Status Progression

| Order | Status | Who's Working | What's Happening |
|-------|--------|---------------|------------------|
| 1 | Ready for Assignment | Team Lead | New work order, needs a closer assigned |
| 2 | Processing | Closer | Active work: review, external contacts, as-builts, batch |
| 3 | QC Reviewing | QC Reviewer | Quality check and audit |
| 4 | Finalizing | Closer | Final documentation and cleanup |
| 5 | Closed | -- | Work complete, pending final verification |
| 6 | Completed | -- | Fully done |

### What Happens When Status Changes

**Automatically (via Power Automate flows):**
- STATUS CHANGED DATE is set to today
- DAYS IN STATUS resets to 0

**Manually by the closer:**
- Update CHECKPOINT to reflect the current sub-stage
- Clear or set BLOCKER fields as needed
- Update external contact statuses
- Record any relevant stage start/end dates

---

## Checkpoint Stages

Checkpoints provide granular progress tracking within the "Processing" status:

| Order | Checkpoint | What's Happening |
|-------|-----------|------------------|
| 1 | Initial Review | First look at the work order |
| 2 | Awaiting External Response | Waiting on storeroom or FCC |
| 3 | As-Built Production | Creating or verifying as-built documents |
| 4 | Pre-Batch | Preparing for batch upload |
| 5 | Batch Queued | Submitted for batch processing |
| 6 | Batch Failed (Retry Needed) | Batch failed, needs correction and resubmission |
| 7 | Auditing | QC review in progress |

---

## External Contact Workflow

Many work orders require communication with storerooms or FCCs before they can be closed.

### Storeroom Contact

```
1. Set Storeroom Status → "Pending Storeroom Response"
   (SR Start date auto-fills)
2. Wait for response
3. Set Storeroom Status → "Storeroom Responded"
   (SR End date auto-fills)
```

### FCC Contact

```
1. Set FCC Status → "Pending FCC Response"
   (FCC Start date auto-fills)
2. Wait for response
3. Set FCC Status → "FCC Responded"
   (FCC End date auto-fills)
```

### Overall External Contact Status

The EXT CONTACT STATUS field tracks the combined state:

| Value | Meaning |
|-------|---------|
| Evaluate Contact Need | Haven't determined if external contact is required |
| Pending FCC Response | Waiting on FCC |
| Pending Storeroom Response | Waiting on storeroom |
| Response Received | All external contacts completed |

---

## Common Scenarios

### Scenario 1: Normal Work Order Closing

| Step | Action |
|------|--------|
| 1 | PC imports work order via Excel sync |
| 2 | Team lead assigns a closer |
| 3 | Closer reviews and contacts storeroom/FCC if needed |
| 4 | Closer produces as-built documentation |
| 5 | Closer queues for batch processing |
| 6 | QC reviewer audits |
| 7 | Closer finalizes |
| 8 | STATUS set to Closed, then Completed |

**Timeline:** Varies by complexity, typically 1-4 weeks

---

### Scenario 2: Batch Processing Fails

| Step | Action |
|------|--------|
| 1 | Closer queues batch, CHECKPOINT = "Batch Queued" |
| 2 | Batch fails |
| 3 | Set CHECKPOINT to "Batch Failed (Retry Needed)" |
| 4 | Record BatchFailureStart date |
| 5 | Investigate and fix the issue |
| 6 | Re-queue the batch |
| 7 | Record BatchFailureEnd date when resolved |

---

### Scenario 3: Work Order Has a Blocker

| Step | Action |
|------|--------|
| 1 | Identify the blocking issue |
| 2 | Set BLOCKER or BLOCKERS field to the appropriate value |
| 3 | Add explanation in Comments |
| 4 | Work to resolve the blocker |
| 5 | Clear the BLOCKER field when resolved |

**Blocker options:** Request Force Close, Request Field Audit, Request to Cancel, Request As-Built Var., Dash Required

---

### Scenario 4: SOX Timer Getting High

| Step | Action |
|------|--------|
| 1 | SOX TIMER exceeds threshold (check with team lead for current limit) |
| 2 | Prioritize this work order |
| 3 | Identify what's holding it up (blocker? external contact? batch?) |
| 4 | Escalate if needed |
| 5 | Document actions in Comments |

The SOX TIMER is calculated daily by the Daily Status Calculator flow: `Today - INSERVICE DATE`.

---

## Quick Reference

### Visual Workflow

```
[Work Order Imported from Excel]
         ↓
STATUS: Ready for Assignment
   - Team lead assigns CLOSER
         ↓
STATUS: Processing
   CHECKPOINT: Initial Review
         ↓
   [External Contact if Needed]
   CHECKPOINT: Awaiting External Response
   - Contact Storeroom / FCC
   - Wait for responses
         ↓
   CHECKPOINT: As-Built Production
   - Create/verify as-builts
         ↓
   CHECKPOINT: Pre-Batch
         ↓
   CHECKPOINT: Batch Queued
   [If batch fails → Batch Failed → Fix → Re-queue]
         ↓
STATUS: QC Reviewing
   CHECKPOINT: Auditing
         ↓
STATUS: Finalizing
         ↓
STATUS: Closed
         ↓
STATUS: Completed
```

### Key Fields to Watch

| What You Need | Field to Check |
|---------------|----------------|
| Who's assigned? | CLOSER |
| Current stage? | STATUS + CHECKPOINT |
| How long in this status? | DAYS IN STATUS |
| SOX compliance aging? | SOX TIMER |
| Waiting on external? | EXT CONTACT STATUS, Storeroom Status, FCC Status |
| Something blocking progress? | BLOCKER / BLOCKERS |
| When was it last worked? | Last Touched |

### Automation Summary

| What Happens Automatically | When |
|---------------------------|------|
| STATUS CHANGED DATE + DAYS IN STATUS reset | When STATUS changes |
| DAYS IN STATUS + SOX TIMER recalculated | Daily at 6:00 AM |
| SR Start/End and FCC Start/End recorded | When contact status fields change |
| New work orders imported from Excel | When PC runs the sync manually |

---

## Related Documentation

- [User Guide](guide) -- Field definitions, views, and how to make changes
- [Automation Guide](automation) -- Detailed explanation of all 5 Power Automate flows
- [Excel Info](excel-info) -- Power Query M Code for the Closing PM Tracker
- [AI Prompts](ai-prompts) -- Copy-paste prompts for AI assistance

---

**Last Updated:** February 19, 2026
