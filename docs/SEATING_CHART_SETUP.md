# Seating Chart Google Sheets Setup

## Overview
The seating chart now loads and saves data to Google Sheets instead of embedding it in the HTML file. This allows you to edit seating arrangements directly in the spreadsheet.

## Setup Steps

### 1. Add a "Seating" Sheet to Your Existing Spreadsheet

1. Open your existing wedding Google Sheet (the one with guest list and RSVPs)
2. Create a new sheet/tab called **`Seating`** (exact name, case-sensitive)
3. Add headers in row 1:
   - Column A: `Table Number`
   - Column B: `Seat Index`
   - Column C: `Guest Name`

### 2. Initial Data Population

The seating chart will automatically populate the sheet when you first click "Save" in the seating chart interface. Alternatively, you can manually add rows:

**Example:**
```
Table Number | Seat Index | Guest Name
1            | 0          | Bob Jackson
1            | 1          | Mary Jackson
1            | 2          | Duncan White
...
2            | 0          | John Smith
2            | 1          | Jane Smith
...
```

### 3. How It Works

- **Load**: When you visit `/seating_chart`, the page fetches data from the `Seating` sheet
- **Save**: When you click "💾 Save", changes are written back to the `Seating` sheet
- **Permissions**: Uses the same service account credentials as your guest list (`GOOGLE_SHEETS_CLIENT_EMAIL` and `GOOGLE_SHEETS_PRIVATE_KEY`)

### 4. Editing Seating Arrangements

You can edit seating in two ways:

1. **Via the seating chart interface** (recommended):
   - Go to `/seating_chart`
   - Enter password
   - Click seats to edit names
   - Click "💾 Save" to persist changes

2. **Directly in Google Sheets**:
   - Edit the `Seating` sheet
   - Changes will appear next time the seating chart loads
   - Make sure to keep the table number and seat index correct

## Table Structure

- **Round tables (1-3, 7-9, 13-15)**: 8 seats each (indices 0-7)
- **Rectangular tables (4-6, 10-12)**: 8 seats each (indices 0-7)
  - Seats 0-3: Left side
  - Seats 4-7: Right side

## Notes

- The sheet is cleared and rewritten on each save
- Empty seats are saved as empty strings
- The service account needs "Editor" access to write changes (update from "Viewer" if needed)
