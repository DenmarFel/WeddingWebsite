# Fonts Directory

## Roxborough CF Regular Font Setup

To use Roxborough CF Regular for the #title element (the "C & D" logo):

1. Place your font file here as: `roxborough-cf-regular.woff2`

2. Uncomment the @font-face rule in `app/globals.css`:
```css
@font-face {
  font-family: "Roxborough CF";
  src: url("/fonts/roxborough-cf-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Getting the Font

You can obtain this font from your font provider or design assets.

If you don't have the `.woff2` file, convert it from `.ttf` or `.otf` format using:
- https://transfonter.org/
- https://cloudconvert.com/woff2-converter

## Current Fallback

The site currently uses Cormorant Garamond as a fallback for #title elements, so the site will work without the custom font.
