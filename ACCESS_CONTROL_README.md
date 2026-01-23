# Access Control System

## Overview

This wedding website has a two-tier access control system:
- **Guests** (with password): See full wedding details including date, location, maps, and RSVP form
- **Visitors** (public): See limited content with placeholder messages

## How It Works

### 1. Access Gate (`components/access-gate.tsx`)

The gate page greets visitors with two options:
- "I am an honored guest" → Prompts for password (currently: `guest123`)
- "I am just passing by" → Grants visitor access

**Animation Hook:** The entire gate component has `id="access-gate"` and uses `isAnimating` state. You can add your door-opening animation by:
1. Adding CSS/JS animation to the gate container
2. Adjusting the `setTimeout` duration in `handleGateOpen()` to match your animation length
3. Targeting the container with custom animation libraries (GSAP, Framer Motion, etc.)

### 2. Access Context (`contexts/access-context.tsx`)

Manages authentication state across the app:
- Stores access level in localStorage
- Provides `useAccess()` hook to any component
- Returns: `{ accessLevel, setAccessLevel, isAuthenticated }`

### 3. GuestOnly Component (`components/guest-only.tsx`)

Reusable component to control content visibility. Three usage patterns:

#### Pattern 1: Hide completely for visitors
\`\`\`tsx
<GuestOnly hideForVisitor>
  <p>Guest-only content</p>
</GuestOnly>
\`\`\`

#### Pattern 2: Show different content for visitors
\`\`\`tsx
<GuestOnly visitorFallback={<p>Limited info for visitors</p>}>
  <p>Full content for guests</p>
</GuestOnly>
\`\`\`

#### Pattern 3: Show nothing for visitors (default)
\`\`\`tsx
<GuestOnly>
  <p>Guest-only content, nothing shown to visitors</p>
</GuestOnly>
\`\`\`

## Protected Content

Currently protected sections:
- **Hero Section**: Date, location, and calendar save button
- **Details Section**: Event times, addresses, map, and accommodations
- **RSVP Section**: RSVP form link and details
- **RSVP Page**: Entire page redirects visitors back to home
- **Contact Section**: Different messaging for guests vs visitors

## Customization

### Change Password

Edit `GUEST_PASSWORD` in `components/access-gate.tsx`:
\`\`\`tsx
const GUEST_PASSWORD = "your-new-password"
\`\`\`

Later, you can add database validation or JWT tokens for more secure authentication.

### Add Door Animation

The gate has hooks ready for animation:
1. Target `#access-gate` element
2. Use the `isAnimating` state (set to true when opening)
3. Animation plays before redirecting to main site
4. Adjust timing in `handleGateOpen()` setTimeout

Example with CSS:
\`\`\`css
#access-gate.opening {
  animation: doorOpen 1s ease-out forwards;
}

@keyframes doorOpen {
  0% { clip-path: inset(0 50% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
}
\`\`\`

### Protect Additional Content

Import and wrap any section with `<GuestOnly>`:
\`\`\`tsx
import { GuestOnly } from "./guest-only"

<GuestOnly visitorFallback={<p>Coming soon</p>}>
  <YourProtectedComponent />
</GuestOnly>
\`\`\`

## Technical Notes

- Access level persists in localStorage (survives page refresh)
- Client-side only protection (not secure for sensitive data)
- For production: Add server-side validation, secure tokens, or database-backed auth
