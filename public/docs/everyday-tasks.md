# Everyday Tasks

> **Quick reference for the things you'll do repeatedly.** Bookmark this page.

---

## Microsoft Lists -- Daily Operations

### Editing an Item

1. Open the list using the [direct links on the home page](/)
2. Click on any row to open the item detail panel on the right
3. Click into a field to edit it
4. Fields save automatically when you click away or press Enter
5. For the full item form, click **Open item** at the top of the panel

### Switching Views

Views are saved filters and column layouts. Each list has several.

1. Look at the top of the list for the current view name (e.g., "All Items")
2. Click the view name to see a dropdown of all available views
3. Select the view you want
4. To go back, click the view name and select another

Common views you'll see: personal workload views (named after people), intake views, and status-based views.

### Filtering and Sorting

**Quick filter (temporary):**
1. Hover over any column header
2. Click the filter icon that appears
3. Select values to filter by
4. This filter is temporary -- it goes away when you leave

**Sort:**
1. Click any column header to sort ascending
2. Click again to sort descending
3. Click a third time to remove the sort

### Adding a New Item

1. Click **+ New** at the top-left of the list
2. Fill in the required fields (Title is usually the work order number)
3. Set the Status to the appropriate starting value
4. Click **Save**

### Editing in Grid View (Bulk Edits)

1. Click **Edit in grid view** in the toolbar (or the pencil icon)
2. The list becomes a spreadsheet -- click any cell to edit
3. Changes save automatically
4. Click **Exit grid view** when done

---

## Power Automate -- Checking Flows

You don't run flows manually (except the PC Upload Sync). Your job is to monitor them.

### Checking if a Flow Ran Successfully

1. Go to [https://make.powerautomate.com](https://make.powerautomate.com)
2. Click **My flows** in the left sidebar
3. Find the flow by name
4. Look at the **Last run** column -- it shows when it last ran and whether it succeeded or failed
5. Click the flow name to see full run history

### Reading Flow Run History

1. Click a flow name to open it
2. You'll see a list of recent runs with timestamps
3. Green checkmark = succeeded, Red X = failed
4. Click any run to see the step-by-step details
5. If a step failed, it will be highlighted in red with an error message

### Resubmitting a Failed Run

You can't directly "resubmit" a failed run. Instead:

1. Go to the list item that triggered the failed run
2. Make a small edit to the trigger field (e.g., change Status to something else, then change it back)
3. This creates a new trigger event and the flow will run again

### Common Flow Issues

| Symptom | What to Check |
|---------|--------------|
| Dates aren't auto-filling | Check if the flow is turned on (My flows > look for "On" status) |
| Flow shows "Failed" | Click the failed run to read the error message |
| Flow hasn't run in days | It may be turned off -- check the toggle in My flows |
| Fields update for some items but not others | The item that failed may have a blank required field |

---

## Excel PM Trackers -- Refreshing Data

### Refreshing Data from SharePoint

1. Open the Excel PM Tracker file (stored in the SharePoint document library)
2. Go to the **Data** tab in the ribbon
3. Click **Refresh All**
4. Wait for the refresh to complete (status bar at the bottom shows progress)
5. If prompted to sign in, use your TechServ Microsoft account

### When Refresh Fails

| Error | Fix |
|-------|-----|
| "Access denied" or sign-in prompt | Click the sign-in prompt and authenticate with your TechServ account |
| "Data source not found" | The SharePoint list URL may have changed -- check the Power Query connection |
| Refresh hangs or times out | Close and reopen the file, try again. Large lists can take a minute. |
| "Query failed" | Open Power Query Editor (Data > Queries & Connections > double-click query) and look for the error step |

### Opening the Power Query Editor

1. **Data** tab > **Queries & Connections** (opens panel on the right)
2. Double-click any query name to open the Power Query Editor
3. The left panel shows all queries; the right panel shows **Applied Steps** for the selected query
4. Each step is a transformation -- click any step to see its result
5. When done, click **Close & Load** to save changes

### Key Rule: Don't Rename the Queries or Tables

The Power Automate flows and Excel formulas depend on specific query and table names. If you rename them, things will break.

---

## Key Vocabulary

Terms you'll encounter across all the tracker documentation:

| Term | What It Means |
|------|--------------|
| **List** | A Microsoft List -- the SharePoint-based tracker where project data lives |
| **Item** | A single row in a list (one project or work order) |
| **Field / Column** | A data point on an item (e.g., Status, Designer, WO Number) |
| **View** | A saved configuration of which columns to show, how to filter, and how to sort |
| **Internal Name** | The behind-the-scenes name SharePoint gives a column when it's created. Display names can change, but internal names are permanent. Flows and Power Query use internal names. |
| **Display Name** | The human-readable column name you see in the list (e.g., "DAYS IN STATUS") |
| **Choice Field** | A dropdown column with predefined options (e.g., Status) |
| **Person Field** | A column that stores a person from your organization (e.g., Designer, CLOSER) |
| **Calculated Field** | A column whose value is computed by a formula (e.g., StatusOrder) |
| **GUID** | A long unique ID string that SharePoint assigns to lists and sites. You'll see these in Power Query M Code -- they identify which list to connect to. |
| **Flow** | A Power Automate automation -- a set of steps that run when triggered |
| **Trigger** | The event that starts a flow (e.g., "when an item is modified") |
| **Action** | A step inside a flow that does something (e.g., "update item," "send email") |
| **Run** | A single execution of a flow. Each time the trigger fires, that's one run. |
| **M Code** | The programming language Power Query uses. Each Excel Info page has the exact M Code for that tracker's queries. |
| **PM Tracker** | The Excel workbook that pulls data from a SharePoint list for reporting |
| **SOX Timer** | Sarbanes-Oxley compliance timer -- tracks how many days since a work order went in-service (Closing Tracker only) |

---

## Related Pages

- [Start Here](start-here) -- What all the tools are and how to access them
- [Home](/) -- Navigation hub for all tracker documentation

---

**Last Updated:** February 19, 2026
