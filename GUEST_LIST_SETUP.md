# Guest List Google Sheets Setup

## Overview
The RSVP system now uses Google Sheets to store your guest list securely on the backend. This keeps guest data private and allows your fiancée to easily edit the list.

## Setup Steps

### 1. Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Wedding Guest List"

### 2. Set Up the Guest List Sheet
Create a sheet named **"Guest List"** with two columns:

| First Name | Last Name |
|------------|-----------|
| Bob | Jackson |
| Mary | Jackson |
| Duncan | White |
| | |
| Charlene | Santos |
| Kirsten | Santos |
| Duncan | White |
| | |
| John | Smith |
| Jane | Smith |

**Format:**
- **Two columns: First Name and Last Name**
- **Blank rows separate households**
- Row 1 should contain headers: "First Name" and "Last Name"
- Data starts from Row 2
- Leave a completely empty row between each household

**Important Notes:**
- Each household is a group of consecutive rows
- Blank rows (both cells empty) separate households
- All IDs are auto-generated - no manual tracking needed!
- Names are case-insensitive for searching but will display as entered

### 3. Share the Sheet with Your Service Account
1. Click the "Share" button in the top right
2. Add your service account email (from `GOOGLE_SHEETS_CLIENT_EMAIL`)
3. Give it "Viewer" access (read-only is sufficient)

### 4. Get the Spreadsheet ID
The spreadsheet ID is in the URL:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

Copy the `SPREADSHEET_ID` part.

### 5. Update Your Environment Variables
Add to your `.env.local`:
```
GOOGLE_SHEETS_GUEST_LIST_ID=your-spreadsheet-id-here
```

## Example Guest List Structure

```
First Name | Last Name
-----------|----------
Bob        | Jackson
Mary       | Jackson
Duncan     | White
           |          <- Blank row separates households
Charlene   | Santos
Kirsten    | Santos
Duncan     | White
           |          <- Blank row
John       | Smith
Jane       | Smith
           |          <- Blank row
Alex       | Rivera
```

**Note:** The system automatically:
- Groups consecutive rows as one household
- Blank rows (both cells empty) separate households
- Generates household IDs like `household-1`, `household-2`, etc.
- Generates guest IDs like `guest-bob-jackson`, `guest-alex-rivera`, etc.

## How It Works

1. **Name Lookup**: When a guest enters their name, the system searches the Google Sheet
2. **Caching**: Results are cached for 5 minutes to improve performance
3. **Security**: Guest data never reaches the frontend - all lookups happen server-side
4. **Household RSVP**: Once a guest is found, they can RSVP for everyone in their household

## Editing the Guest List

Your fiancée can edit the Google Sheet anytime:
- Add new guests
- Update names
- Change household groupings
- Remove guests

Changes will be reflected within 5 minutes (cache duration).

## Migration from sample-guest-data.json

You can use the existing `data/sample-guest-data.json` as a reference to populate your Google Sheet:
- Each household becomes a group of rows
- Add a blank row between each household
- Just two columns: First Name and Last Name

## Troubleshooting

**"Guest not found" errors:**
- Check spelling matches exactly
- Verify the sheet is named "Guest List"
- Ensure data starts at row 2 (row 1 is headers)
- Confirm service account has access

**Slow performance:**
- Normal - first search after cache expires takes ~1-2 seconds
- Subsequent searches are instant (cached)
- Consider increasing cache duration if needed

**Need to clear cache:**
- Restart your Next.js dev server
- Or wait 5 minutes for automatic cache expiration
