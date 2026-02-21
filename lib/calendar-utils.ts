// ─── Edit your event details here ───
export const WEDDING_EVENT = {
  title: "Charlene & Denmar Wedding",
  description:
    "Join us for the wedding celebration of Charlene Santos & Denmar Feliciano! " +
    "Ceremony begins at 4:30 PM, followed by cocktail hour and reception. " +
    "Formal attire requested. " +
    "For more details visit: https://charmarwedding.com",
  location: "La Ventura, 2316 South El Camino Real, San Clemente, CA 92672",
  locationFormatted: "La Ventura\\n2316 S El Camino Real\\, San Clemente\\, CA  92672\\, United States",
  locationAddress: "2316 S El Camino Real, San Clemente, CA  92672, United States",
  locationTitle: "La Ventura",
  // Times in Pacific Time (with timezone)
  startLocal: "20260530T163000", // 4:30 PM PDT
  endLocal: "20260530T220000",   // 10:00 PM PDT
  timezone: "America/Los_Angeles",
  filename: "Wedding-Charlene-Denmar.ics",
  url: "charmarwedding.com",
  // Apple Maps location data
  geo: "33.414535,-117.600859",
  appleMapKitHandle: "CAESygIIrk0QhrWtqaej8rBGGhIJOoVLfQ+1QEARTSGhd3RmXcAidgoNVW5pdGVkIFN0YXRlcxICVVMaCkNhbGlmb3JuaWEiAkNBKg1PcmFuZ2UgQ291bnR5MgxTYW4gQ2xlbWVudGU6BTkyNjcyUhBTIEVsIENhbWlubyBSZWFsWgQyMzE2YhUyMzE2IFMgRWwgQ2FtaW5vIFJlYWwqCkxhIFZlbnR1cmEyFTIzMTYgUyBFbCBDYW1pbm8gUmVhbDIXU2FuIENsZW1lbnRlLCBDQSAgOTI2NzIyDVVuaXRlZCBTdGF0ZXM4L1ABWmAKOwiGta2pp6PysEYSEgk6hUt9D7VAQBFNIaF3dGZdwBiuTZADAZgDAaIDEUk0NjYxQzkxQTc1MkI1QTg2oh8gCIa1ramno/KwRhoUCgpMYSBWZW50dXJhEAAqAmVuQAA=",
  appleRadius: "141.1747824761505",
}
// ────────────────────────────────────

/**
 * Generate ICS calendar content for Apple devices
 */
export function generateICSContent(): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const created = timestamp; // Use same timestamp for created
  
  // Escape description for ICS format
  const escapedDescription = WEDDING_EVENT.description.replace(/,/g, '\\,');
  
  // Generate unique UID
  const uid = `${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
  
  // Generate unique alarm UIDs
  const alarmUID1 = `${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
  const alarmUID2 = `${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 14).toUpperCase()}`;
  
  return [
    "BEGIN:VCALENDAR",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Apple Inc.//macOS 26.2//EN",
    "VERSION:2.0",
    "BEGIN:VTIMEZONE",
    `TZID:${WEDDING_EVENT.timezone}`,
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZNAME:PDT",
    "TZOFFSETFROM:-0800",
    "TZOFFSETTO:-0700",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "DTSTART:20071104T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZNAME:PST",
    "TZOFFSETFROM:-0700",
    "TZOFFSETTO:-0800",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `CREATED:${created}`,
    `DESCRIPTION:${escapedDescription}`,
    `DTEND;TZID=${WEDDING_EVENT.timezone}:${WEDDING_EVENT.endLocal}`,
    `DTSTAMP:${timestamp}`,
    `DTSTART;TZID=${WEDDING_EVENT.timezone}:${WEDDING_EVENT.startLocal}`,
    `LAST-MODIFIED:${timestamp}`,
    `LOCATION:${WEDDING_EVENT.locationFormatted}`,
    "SEQUENCE:0",
    "STATUS:CONFIRMED",
    `SUMMARY:${WEDDING_EVENT.title}`,
    "TRANSP:OPAQUE",
    `UID:${uid}`,
    `URL;VALUE=URI:${WEDDING_EVENT.url}`,
    "X-APPLE-CREATOR-IDENTITY:com.apple.mobilecal",
    "X-APPLE-CREATOR-TEAM-IDENTITY:0000000000",
    `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="${WEDDING_EVENT.locationAddress}";X-APPLE-MAPKIT-HANDLE=${WEDDING_EVENT.appleMapKitHandle};X-APPLE-RADIUS=${WEDDING_EVENT.appleRadius};X-APPLE-REFERENCEFRAME=1;X-TITLE=${WEDDING_EVENT.locationTitle}:geo:${WEDDING_EVENT.geo}`,
    "X-APPLE-TRAVEL-ADVISORY-BEHAVIOR:DISABLED",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:This is an event reminder",
    "TRIGGER:-P1W",
    `UID:${alarmUID1}`,
    `X-WR-ALARMUID:${alarmUID1}`,
    "END:VALARM",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:This is an event reminder",
    "TRIGGER:-P1D",
    `UID:${alarmUID2}`,
    `X-WR-ALARMUID:${alarmUID2}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

/**
 * Get Google Calendar URL
 */
export function getGoogleCalendarUrl(): string {
  // Convert local time to UTC for Google Calendar
  const startUTC = "20260530T233000Z"; // 4:30 PM PDT = 11:30 PM UTC
  const endUTC = "20260531T050000Z";   // 10:00 PM PDT = 5:00 AM UTC next day
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(WEDDING_EVENT.title)}&dates=${startUTC}/${endUTC}&location=${encodeURIComponent(WEDDING_EVENT.location)}&details=${encodeURIComponent(WEDDING_EVENT.description)}`;
}

/**
 * Download ICS file for Apple devices
 */
export function downloadICSFile(): void {
  const icsContent = generateICSContent();
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = WEDDING_EVENT.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Handle add to calendar click - detects device and uses appropriate method
 */
export function handleAddToCalendar(e?: React.MouseEvent): void {
  e?.preventDefault();
  
  const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
  
  if (isApple) {
    downloadICSFile();
  } else {
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  }
}
