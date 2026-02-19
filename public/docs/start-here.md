# Start Here

> **Read this first.** This page covers the tools you'll be working with and how to access everything. Takes about 5 minutes.

---

## Your Role

You're responsible for maintaining **4 SharePoint-based project trackers** for TechServ's OncorDesign teams. Each tracker is a Microsoft List that tracks projects through their workflow. Your job involves:

- Keeping the lists accurate as projects move through statuses
- Monitoring the Power Automate flows that run behind the scenes
- Maintaining the Excel PM Tracker reports that pull live data from these lists
- Helping team members when something isn't working

The four trackers are:

| Tracker | What It Tracks |
|---------|---------------|
| **Closing** | Work order closing, as-builts, SOX compliance |
| **Drafting** | Drafting requests, permits, TxDOT RULIS submissions |
| **EV** | Electric Vehicle charging infrastructure design |
| **Small Cell** | Small cell telecommunications projects |

---

## What is SharePoint / Microsoft Lists?

**SharePoint** is Microsoft's platform for shared websites and document storage. Your team uses a SharePoint site called **OncorDesign** to store documents and run project trackers.

**Microsoft Lists** is the tool that powers each tracker. Think of it as a shared, online spreadsheet that lives on the SharePoint site -- except it has features a spreadsheet doesn't: dropdown menus, person fields, automatic version history, filtered views, and the ability to trigger automations when data changes.

Each of the 4 trackers is a Microsoft List.

**SharePoint Site:** `https://techservltd.sharepoint.com/sites/OncorDesign`

### Direct Links to Each List

| Tracker | Link |
|---------|------|
| Closing | [Open List](https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Closing%20Tracker/) |
| Drafting | [Open List](https://techservltd.sharepoint.com/sites/OncorDesign/DraftingTeamTracker) |
| EV | [Open List](https://techservltd.sharepoint.com/sites/OncorDesign/Lists/EV%20Team%20Tracker/) |
| Small Cell | [Open List](https://techservltd.sharepoint.com/sites/OncorDesign/Lists/Small%20Cell%20Team%20Tracker/) |

---

## What is Power Automate?

**Power Automate** is Microsoft's automation tool. Think of it as a robot assistant that watches your lists and does repetitive tasks for you.

Each automation is called a **flow**. A flow has two parts:

1. **Trigger** -- the event that starts it (e.g., "when someone changes the Status field")
2. **Actions** -- what happens next (e.g., "set the Status Changed Date to today")

Flows run in the background. You won't see them working, but you'll see the results: dates filling in automatically, calculations updating, notifications being sent. Changes typically appear within 1-5 minutes.

You don't build flows day-to-day. Your job is to know which flows exist, what they do, and how to check if one has stopped working.

### How to Access Power Automate

1. Go to [https://make.powerautomate.com](https://make.powerautomate.com)
2. Sign in with your TechServ account
3. Click **My flows** in the left sidebar to see flows you own
4. Click on a flow name to see its run history

Each tracker's **Automation Guide** explains exactly which flows exist and what they do.

---

## What is Power Query / M Code?

Each tracker has a companion **Excel PM Tracker** workbook that pulls live data from the SharePoint list. **Power Query** is the Excel feature that makes this connection work. You'll find it under the **Data** tab in Excel, labeled "Get & Transform."

Power Query uses a language called **M Code** to define how data is fetched, filtered, and shaped. You don't need to write M Code from scratch -- each Excel Info page has the exact M Code used, with comments explaining each line.

The typical workflow:

1. Open the Excel PM Tracker file
2. Click **Data > Refresh All** to pull the latest data from SharePoint
3. If something breaks, check the Excel Info page for that tracker

### How to Open Power Query Editor

1. Open the Excel PM Tracker file
2. Go to **Data** tab
3. Click **Queries & Connections** on the right to see existing queries
4. Double-click any query to open the Power Query Editor

---

## Where to Go Next

Now that you know what the tools are, here's your reading path:

| Step | What to Read | Why |
|------|-------------|-----|
| 1 | [Everyday Tasks](everyday-tasks) | Learn the operations you'll do daily -- editing list items, checking flows, refreshing Excel |
| 2 | Pick a tracker and read its **Project Overview** | Understand the workflow before diving into details |
| 3 | Read that tracker's **User Guide** | Learn the fields, views, and how to make changes |
| 4 | Read that tracker's **Automation Guide** | Know what runs automatically and how to troubleshoot |
| 5 | Read that tracker's **Excel Info** | Understand the PM Tracker report and its Power Query connection |

**Suggested first tracker:** Start with **EV** or **Drafting** -- they have the most straightforward workflows.

---

**Last Updated:** February 19, 2026
