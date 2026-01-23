export const GUEST_PASSWORDS: Record<string, string> = {
  // Default password
  guest123: "General Guest",

  // Add more guest-specific passwords below
  // "familyname2026": "Family Name",
  // "friendgroup": "Friend Group Name",
}

export function isValidGuestPassword(password: string): boolean {
  return password in GUEST_PASSWORDS
}

export function getGuestName(password: string): string | undefined {
  return GUEST_PASSWORDS[password]
}
