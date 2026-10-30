# Household-Based RSVP System

This system allows guests to RSVP for their entire household while handling complex scenarios like name conflicts and individual preferences.

## Key Features

### 1. Name Lookup & Disambiguation
- Guests enter their name to find their invitation
- Handles duplicate names across different households
- Shows household context when names conflict (e.g., "Duncan White (Jackson Family)" vs "Duncan White (Santos Family)")

### 2. Household Selection
- Shows all members of the guest's household
- Allows the submitter to choose who they're RSVPing for
- Others can still submit their own RSVP later
- Clear indication of who is submitting the form

### 3. Individual Preferences
- Collects individual preferences for each selected guest
- Meal choices, allergies, dietary restrictions
- Song requests and personal messages
- Streamlined flow for multiple people

### 4. Smart Flow Control
- If not attending: skips meal/preference questions
- If attending: collects detailed preferences for each person
- Review step shows all collected information
- Clear navigation between steps

## Data Structure

### Guest Data Format
```typescript
interface Guest {
  id: string              // Unique identifier
  firstName: string       // First name
  lastName: string        // Last name
  email?: string         // Optional email
  phone?: string         // Optional phone
  householdId: string    // Links to household
}

interface Household {
  id: string             // Unique identifier
  name: string          // Display name (e.g., "Jackson Family")
  guests: Guest[]       // All household members
}
```

### Response Data Format
```typescript
interface GuestResponse {
  guestId: string
  attending: boolean
  mealChoice?: string
  allergies?: string[]
  otherAllergies?: string
  dietaryRestrictions?: string[]
  otherDietary?: string
  songRequest?: string
  message?: string
}

interface HouseholdRsvpData {
  householdId: string
  submittedBy: string    // Guest ID who submitted
  submittedAt: Date
  responses: GuestResponse[]
  sharedResponses: {
    attending: boolean   // Overall household decision
  }
}
```

## Usage Examples

### Example 1: Bob RSVPs for his household
1. Bob enters "Bob Jackson"
2. System finds Bob in the Jackson Family household
3. Shows: Bob Jackson (You), Mary Jackson, Duncan White
4. Bob selects all three and chooses "Attending: Yes"
5. System collects individual preferences for each person
6. Submits responses for all three

### Example 2: Duncan White with name conflict
1. Duncan enters "Duncan White"
2. System finds two Duncan Whites in different households
3. Shows disambiguation:
   - Duncan White (Jackson Family - Bob, Mary, Duncan)
   - Duncan White (Santos Family - Charlene, Kirsten, Duncan)
4. Duncan selects the correct household
5. Continues with normal flow

### Example 3: Mary RSVPs after Bob already did
1. Mary enters "Mary Jackson"
2. System finds Mary in Jackson Family
3. Shows that Bob already submitted for the household
4. Gives Mary option to:
   - View existing RSVP
   - Submit her own individual response
   - Update the household RSVP (if allowed)

## Implementation Notes

### Data Storage
- Guest data should be stored in your database
- Update `lib/guest-data.ts` to fetch from your API instead of using the hardcoded array
- Consider caching guest data for performance

### API Integration
Replace the console.log in `handleSubmit` with actual API calls:

```typescript
const response = await fetch('/api/rsvp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(submissionData)
})
```

### Security Considerations
- Validate that guests can only RSVP for their own household
- Implement rate limiting on the name lookup endpoint
- Consider adding email verification for changes

### Customization
- Modify questions in `individual-preferences.tsx`
- Update meal options, allergy lists, etc.
- Add custom validation rules as needed
- Customize the styling to match your wedding theme

## File Structure

```
components/rsvp-form/
├── household-rsvp-form.tsx      # Main orchestrator component
├── name-lookup.tsx              # Name search and disambiguation
├── household-selection.tsx      # Guest selection and attendance
├── individual-preferences.tsx   # Individual guest preferences
├── household-review.tsx         # Final review before submission
├── rsvp-confirmation.tsx        # Success confirmation (existing)
└── rsvp-types.ts               # TypeScript interfaces

lib/
└── guest-data.ts               # Guest data management utilities

data/
└── sample-guest-data.json      # Example data structure
```

## Testing Scenarios

Test these scenarios to ensure the system works correctly:

1. **Single guest household** - Alex Johnson
2. **Couple** - John & Jane Smith  
3. **Family with different last names** - Bob Jackson, Mary Jackson, Duncan White
4. **Name conflicts** - Two Duncan Whites in different households
5. **Partial household RSVP** - Bob RSVPs for himself only, Mary RSVPs separately
6. **Not attending** - Skip meal preferences, go straight to message
7. **Mixed attendance** - Some household members attend, others don't (future enhancement)

## Future Enhancements

- **Update existing RSVPs**: Allow guests to modify their responses
- **Email notifications**: Send confirmations and reminders
- **Admin dashboard**: View all responses, send updates
- **Plus-one handling**: Handle guests bringing additional people
- **Dietary preference templates**: Quick selection for common restrictions
- **Mobile optimization**: Ensure great experience on all devices