# Drafting Project Overview

> **Understand the complete Drafting workflow from request to completion**
> 
> This page explains how Drafting requests flow through TechServ, who does what, and how the Microsoft List tracks progress.

---

## Table of Contents

1. [What is a Drafting Request?](#what-is-a-drafting-request)
2. [Key Players](#key-players)
3. [The Complete Workflow](#the-complete-workflow)
4. [Status Guide](#status-guide)
5. [RULIS Workflow (TxDOT Permits)](#rulis-workflow-txdot-permits)
6. [Common Scenarios](#common-scenarios)
7. [Quick Reference](#quick-reference)

---

## What is a Drafting Request?

Drafting requests are work orders for mapping, permit documents, CAD drawings, and other drafting services. Requests come from various design groups and clients across TechServ's utility projects.

### Types of Drafting Work

| Request Type | Description |
|--------------|-------------|
| **TxDOT Permit** | Texas Department of Transportation permit drawings (requires RULIS workflow) |
| **City Permit** | Municipal permit drawings |
| **County Permit** | County permit drawings |
| **Easement Exhibit** | Property easement documentation |
| **JU CAD Map** | Joint Use CAD mapping |
| **Railroad Permit** | Railroad crossing permit drawings |
| **Transmission Permit** | Transmission line permit drawings |
| **ARDOT Permit** | Arkansas DOT permit drawings |
| **LADOTD Permit** | Louisiana DOT permit drawings |
| **FAA Permit** | Federal Aviation Administration permit drawings |
| **Other** | Other drafting work not in the above categories |

### How Requests Are Submitted

All requests are submitted through the **Microsoft Lists Form** attached to the Drafting Team Tracker list. Requestors must provide:

- Work Order Number and Name
- Need Date (deadline)
- Design Group and Client
- Request Type
- Number of Work Stations
- Scope of Work description

---

## Key Players

### Internal Team

| Role | Responsibilities | Tracker Field |
|------|-----------------|---------------|
| **Drafting PC** | Manages queue, assigns work, approves high priority, handles escalations | `DraftingPC` field |
| **Drafter** | Produces exhibits and drawings, handles corrections | `AssignedDrafter` field |
| **RULIS Admin** | Manages TxDOT/RULIS submissions and approvals | Part of workflow |

### Requestors

| Role | Responsibilities | Tracker Field |
|------|-----------------|---------------|
| **Requestor** | Submits request, provides information, approves designs | `Requestor` field |
| **Requestor's PM** | Project Manager overseeing the request | `YourPM` field |
| **Requestor's PC** | Project Coordinator for the request | `YourPC` field |

---

## The Complete Workflow

### Phase 1: Request Submission

| Step | Action | Who | Status |
|------|--------|-----|--------|
| 1 | Submit Mapping Request via Microsoft Lists Form | Requestor | - |
| 2 | Request appears in Drafting queue | System | `Not Started` |

**Tracker Status:** `Not Started`

---

### Phase 2: High Priority Check (If Applicable)

> **Note:** This phase only applies if the request is marked as High Priority.

| Step | Action | Who |
|------|--------|-----|
| 1 | Requestor's PM/PC requests High Priority via MS List comments | Requestor PM/PC |
| 2 | Drafting PM reviews the request | Drafting PM |
| 3a | **If Approved:** Mark High Priority = "Yes", notify Requestor PM/PC | Drafting PM |
| 3b | **If Denied:** Set High Priority = "No", notify Requestor PM/PC via MS List | Drafting PM/PC |

**Fields Affected:**
- `HighPriority` - Yes/No
- `HighPriorityApproved` - Yes/No
- `HighPriorityReason` - Justification text

---

### Phase 3: Queue Review & Information Verification

| Step | Action | Who |
|------|--------|-----|
| 1 | Drafting PC reviews the queue | Drafting PC |
| 2 | Check if all required information is provided | Drafting PC |
| 3a | **If missing info:** Request missing information from Requestor | Drafter |
| 3b | **If complete:** Assign job to a Drafter | Drafting PC |

**Field Affected:** `AssignedDrafter`

---

### Phase 4: Job Assignment & Start

| Step | Action | Who | Automation |
|------|--------|-----|------------|
| 1 | Drafter reviews the job request | Assigned Drafter | - |
| 2 | Change Status to "In Progress" | Assigned Drafter | - |
| 3 | Start Date automatically filled | MS Flow | `StartDate` stamped |

**Tracker Status:** `Not Started` → `In Progress`

**Automation:** When Status changes to "In Progress", MS Flow automatically stamps the `StartDate` field.

---

### Phase 5: Drafting

| Step | Action | Who |
|------|--------|-----|
| 1 | Drafter produces required exhibit(s) | Assigned Drafter |
| 2 | Work continues until complete or placed on hold | Assigned Drafter |

**Tracker Status:** `In Progress`

---

### Phase 6: On Hold Process (If Applicable)

> **Note:** A job may be placed On Hold at any point during drafting.

| Step | Action | Who | Automation |
|------|--------|-----|------------|
| 1 | Set Status to "On Hold" | Drafter | `HoldStartDate` stamped |
| 2 | **After 3 days:** Reminder sent to Requestor and Drafter | MS Flow | Auto reminder |
| 3 | **After 7 days:** Reminder sent to Requestor, PM/PC, Drafter, and Drafting PC | MS Flow | Auto reminder |
| 4 | **After 14 days:** Drafter alerts Drafting PC | Drafter | - |
| 5 | **Day 14:** Drafting PC consults with Requestor's PM | Drafting PC | - |
| 6 | Once resolved, change Status to next appropriate status | Drafter | `HoldEndDate` stamped |

**Tracker Status:** `In Progress` → `On Hold` → (next status)

**Hold Escalation Timeline:**

| Days on Hold | Action |
|--------------|--------|
| 3 days | MS Flow sends reminder to Requestor and Drafter |
| 7 days | MS Flow sends reminder to Requestor, Requestor's PM/PC, Drafter, and Drafting PC |
| 14 days | Drafter alerts Drafting PC; Drafting PC consults with Requestor's PM |

---

### Phase 7: Delivery

| Step | Action | Who | Automation |
|------|--------|-----|------------|
| 1 | Send deliverables to Requestor | Drafter | - |
| 2 | Set Status to "Delivered" | Drafter | `DeliveredDate` stamped |

**Tracker Status:** `In Progress` → `Delivered`

**Automation:** When Status changes to "Delivered", MS Flow automatically stamps the `DeliveredDate` field.

---

### Phase 8: Redesign Check (If Applicable)

> **Note:** This phase only applies if design changes are needed after delivery.

| Step | Action | Who |
|------|--------|-----|
| 1 | Requestor identifies needed changes | Requestor |
| 2 | Requestor sets Status to "Rework - Needed" | Requestor |
| 3 | Drafter sets Status to "Rework - In Progress" | Drafter |
| 4 | Drafter makes corrections per Requestor's comments | Drafter |
| 5 | Once complete, continue to next phase | Drafter |

**Tracker Status:** `Delivered` → `Rework - Needed` → `Rework - In Progress` → (continue forward)

---

### Phase 9: Request Type Check

| If Request Type Is... | Next Step |
|-----------------------|-----------|
| **TxDOT Permit** | Continue to RULIS Workflow (Phase 10) |
| **Any other type** | Skip to Request Complete (Phase 13) |

---

### Phase 10-12: RULIS Workflow

See the [RULIS Workflow section](#rulis-workflow-txdot-permits) below for the complete TxDOT permit process.

---

### Phase 13: Request Complete

| Step | Action | Who | Automation |
|------|--------|-----|------------|
| 1 | All steps finished | - | - |
| 2 | Request Complete Date stamped | MS Flow | Auto stamp |
| 3 | Job is closed | - | - |

---

## Status Guide

### Main Job Statuses

| Status | When to Use | Who Sets It |
|--------|-------------|-------------|
| Not Started | Initial state after submission | System (default) |
| In Progress | Drafter has begun work | Drafter |
| On Hold | Waiting for information or external dependency | Drafter |
| Delivered | Work has been sent to Requestor | Drafter |
| Rework - Needed | Changes requested after delivery | Requestor |
| Rework - In Progress | Drafter is making corrections | Drafter |
| Canceled | Job will not be completed | Drafting PC |

### Status Flow (Normal Path)

| Order | Status | Next Status |
|-------|--------|-------------|
| 1 | Not Started | In Progress |
| 2 | In Progress | Delivered (or On Hold) |
| 3 | Delivered | Complete (or Rework - Needed) |

### Status Flow (With Rework)

| Order | Status | Next Status |
|-------|--------|-------------|
| 1 | Delivered | Rework - Needed |
| 2 | Rework - Needed | Rework - In Progress |
| 3 | Rework - In Progress | Delivered |

### Automated Date Stamps

| When Status Changes To... | Date Field Stamped |
|---------------------------|-------------------|
| In Progress | `StartDate` |
| On Hold | `HoldStartDate` |
| (Any status except On Hold) | `HoldEndDate` (if coming from hold) |
| Delivered | `DeliveredDate` |
| Canceled | `CanceledDate` |

---

## RULIS Workflow (TxDOT Permits)

> **Important:** This workflow only applies to requests where Request Type = "TxDOT Permit"

### What is RULIS?

RULIS is the Texas Department of Transportation's online permit system. All TxDOT permit requests must go through RULIS after drafting is complete.

### RULIS Status Values

| RULIS Status | Meaning |
|--------------|---------|
| In Progress | RULIS Admin is preparing submission |
| Requestor Approval Pending | Waiting for Requestor to review and approve |
| Ready for RULIS | Approved and ready for RULIS submission |
| Design Change Needed | Requestor requested CAD changes |
| Design Updated | Drafter completed requested changes |
| Submitted | Submitted to RULIS portal |
| Additional Info. Req. | RULIS requested more information |
| Info. Provided | Requestor provided requested information |
| CAD Changes Needed | Additional info requires CAD map changes |
| CAD Updated | CAD changes completed |
| Approved | RULIS has approved the permit |
| N/A | Not applicable (non-TxDOT request) |

### RULIS Workflow Steps

#### Step 1: Preparation

| Step | Action | Who | RULIS Status |
|------|--------|-----|--------------|
| 1 | Ensure TxDOT Docs Link and exhibits are ready | RULIS Admin | - |
| 2 | Set RULIS Status to "In Progress" | RULIS Admin | `In Progress` |

#### Step 2: Requestor Approval

| Step | Action | Who | RULIS Status |
|------|--------|-----|--------------|
| 1 | Set RULIS Status to "Requestor Approval Pending" | RULIS Admin | `Requestor Approval Pending` |
| 2 | Requestor reviews the design | Requestor | - |

**Requestor Response:**

| If Requestor... | Action | RULIS Status |
|-----------------|--------|--------------|
| **Does NOT approve** | Set status, provide comments via MS List | `Design Change Needed` |
| **Approves** | Set status | `Ready for RULIS` |

#### Step 3: Design Changes (If Needed)

| Step | Action | Who | RULIS Status |
|------|--------|-----|--------------|
| 1 | Drafter makes corrections per comments | Drafter | - |
| 2 | Drafter updates status | Drafter | `Design Updated` |
| 3 | Return to Requestor Approval (repeat until approved) | - | → `Requestor Approval Pending` |

#### Step 4: RULIS Submission

| Step | Action | Who | RULIS Status | Automation |
|------|--------|-----|--------------|------------|
| 1 | Submit via RULIS portal | RULIS Admin | `Submitted` | `RULISSubmissionDate` stamped |
| 2 | Enter RULIS Application Number in MS List | RULIS Admin | - | - |

#### Step 5: Additional Information Requests (If Applicable)

| Step | Action | Who | RULIS Status |
|------|--------|-----|--------------|
| 1 | RULIS requests additional information | RULIS | - |
| 2 | Set status, record message in comments | RULIS Admin | `Additional Info. Req.` |
| 3 | Loop in Requestor via comments | RULIS Admin | - |

**RULIS Admin Decision Tree:**

| Does info require Requestor? | Next Steps |
|------------------------------|------------|
| **Yes** | Requestor provides info via MS Lists, sets status to `Info. Provided` |
| **No** | RULIS Admin inputs info directly in RULIS Portal |

**If Requestor provides info:**

| Do changes require CAD updates? | Next Steps |
|---------------------------------|------------|
| **Yes** | Set status to `CAD Changes Needed`, Drafter makes changes, sets to `CAD Updated` |
| **No** | RULIS Admin inputs info in RULIS Portal |

**Cutoff Check:**

| Was info provided before RULIS cutoff? | Next Steps |
|----------------------------------------|------------|
| **Yes** | Set RULIS Status back to `Submitted`, continue |
| **No** | Continue without resubmission |

#### Step 6: RULIS Approval

| Step | Action | Who | RULIS Status |
|------|--------|-----|--------------|
| 1 | RULIS approves the permit | RULIS | - |
| 2 | Set RULIS Status to "Approved" | RULIS Admin | `Approved` |
| 3 | Continue to Request Complete | - | - |

---

## Common Scenarios

### Scenario 1: Normal Request (No TxDOT)

| Step | Action | Status |
|------|--------|--------|
| 1 | Requestor submits via form | Not Started |
| 2 | Drafting PC assigns to Drafter | Not Started |
| 3 | Drafter starts work | In Progress |
| 4 | Drafter completes and delivers | Delivered |
| 5 | Request Complete | Complete |

**Timeline:** Varies based on complexity, typically 1-5 days

---

### Scenario 2: TxDOT Permit Request

| Step | Action | Status / RULIS Status |
|------|--------|----------------------|
| 1 | Requestor submits via form | Not Started |
| 2 | Drafter completes drafting | In Progress → Delivered |
| 3 | RULIS Admin prepares submission | RULIS: In Progress |
| 4 | Requestor approves | RULIS: Ready for RULIS |
| 5 | RULIS Admin submits | RULIS: Submitted |
| 6 | RULIS approves | RULIS: Approved |
| 7 | Request Complete | Complete |

**Timeline:** Varies, typically 2-4 weeks including RULIS processing

---

### Scenario 3: Job Put on Hold

| Step | Action | Status |
|------|--------|--------|
| 1 | Drafter encounters blocking issue | In Progress |
| 2 | Drafter sets status to On Hold | On Hold |
| 3 | **Day 3:** Auto reminder to Requestor and Drafter | On Hold |
| 4 | **Day 7:** Auto reminder to all parties | On Hold |
| 5 | **Day 14:** Escalate to Drafting PC | On Hold |
| 6 | Issue resolved, Drafter resumes | In Progress |
| 7 | Complete normal workflow | → Delivered |

---

### Scenario 4: Rework Required

| Step | Action | Status |
|------|--------|--------|
| 1 | Drafter delivers work | Delivered |
| 2 | Requestor finds issues | Delivered |
| 3 | Requestor sets status | Rework - Needed |
| 4 | Drafter acknowledges and starts corrections | Rework - In Progress |
| 5 | Drafter completes corrections | Delivered |
| 6 | Requestor approves | Complete |

---

### Scenario 5: Cancellation

| Step | Action | Status |
|------|--------|--------|
| 1 | Decision made to cancel | (any status) |
| 2 | Get cancellation approval from Requestor's PM | - |
| 3 | Drafting PC sets status | Canceled |
| 4 | Canceled Date and Request Complete Date stamped | Canceled |

> **Important:** Cancellation requires approval from the Requestor's PM before proceeding.

---

## Quick Reference

### Key Fields to Track

| What You Need | Field to Check |
|---------------|----------------|
| Who submitted the request? | `Requestor` |
| Who is responsible? | `AssignedDrafter` |
| What's the deadline? | `NeedDate` |
| What's the current status? | `Status` |
| Is it high priority? | `HighPriority`, `HighPriorityApproved` |
| Is it a TxDOT permit? | `RequestType` = "TxDOT Permit" |
| What's the RULIS status? | `RULISStatus` |
| When was it submitted to RULIS? | `RULISSubmissionDate` |

### Automated Actions Summary

| Trigger | Automated Action |
|---------|-----------------|
| Status → "In Progress" | `StartDate` stamped |
| Status → "On Hold" | `HoldStartDate` stamped |
| Status → (not "On Hold") | `HoldEndDate` stamped (if was on hold) |
| Status → "Delivered" | `DeliveredDate` stamped |
| Status → "Canceled" | `CanceledDate` stamped |
| RULIS Status → "Submitted" | `RULISSubmissionDate` stamped |
| RULIS Status → "Additional Info. Req." | Teams message sent to Requestor |
| On Hold for 3 days | Reminder to Requestor and Drafter |
| On Hold for 7 days | Reminder to all parties |

---

## Related Documentation

- [User Guide](guide) - Detailed field definitions and list settings
- [Automation Guide](automation) - How the date stamps and alerts work
- [Excel Info](excel-info) - Power Query M Code and Excel PM Tracker
- [AI Prompts](ai-prompts) - Copy-paste prompts for AI assistance

---

**Last Updated:** February 19, 2026
