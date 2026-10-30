# Gallery Google Cloud Storage Setup Guide

This guide explains how to integrate your wedding gallery with Google Cloud Storage (GCS).

## Overview

The gallery component supports two modes:
1. **Local/Placeholder Mode** (default) - Uses local images or placeholder images
2. **GCS Mode** - Loads images directly from Google Cloud Storage

## Setting Up Google Cloud Storage

### 1. Create a GCS Bucket

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to Cloud Storage → Buckets
3. Click "Create Bucket"
4. Choose a name (e.g., `charlene-denmar-wedding-photos`)
5. Select a location close to your users
6. Choose "Standard" storage class
7. **Important**: Set "Public access" to allow public reads

### 2. Organize Your Photos

Upload your photos organized in folders matching your album structure:

\`\`\`
your-bucket-name/
├── engagement/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
├── proposal/
│   ├── photo1.jpg
│   └── photo2.jpg
├── save-the-dates/
│   ├── photo1.jpg
│   └── photo2.jpg
├── wedding/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── photo3.jpg
└── other/
    └── photo1.jpg
\`\`\`

### 3. Make Photos Publicly Accessible

For each folder, you need to make the photos publicly readable:

**Option A: Using Console**
1. Select all photos in a folder
2. Click "Permissions" 
3. Add "allUsers" with role "Storage Object Viewer"

**Option B: Using gsutil command**
\`\`\`bash
gsutil -m acl set -R -a public-read gs://your-bucket-name/
\`\`\`

### 4. Configure the Gallery

Edit `components/gallery-section.tsx`:

\`\`\`tsx
const GALLERY_CONFIG = {
  // Set to true to enable GCS
  useGCS: true,
  
  gcsConfig: {
    // Your bucket name
    bucketName: "charlene-denmar-wedding-photos",
    
    // List your filenames for each folder
    folders: {
      engagement: ["IMG_001.jpg", "IMG_002.jpg", "IMG_003.jpg"],
      proposal: ["proposal_01.jpg", "proposal_02.jpg"],
      "save-the-dates": ["std_01.jpg", "std_02.jpg"],
      wedding: ["ceremony_01.jpg", "reception_01.jpg", "dance_01.jpg"],
      other: ["candid_01.jpg", "candid_02.jpg"],
    },
  },
}
\`\`\`

## Image URLs

When GCS mode is enabled, images are accessed via:
\`\`\`
https://storage.googleapis.com/{bucketName}/{folder}/{filename}
\`\`\`

For example:
\`\`\`
https://storage.googleapis.com/charlene-denmar-wedding-photos/engagement/IMG_001.jpg
\`\`\`

## Adding New Albums

To add a new album category:

1. Create a new folder in your GCS bucket
2. Upload photos to that folder
3. Add the folder to `GALLERY_CONFIG.gcsConfig.folders`:

\`\`\`tsx
folders: {
  engagement: ["..."],
  proposal: ["..."],
  "save-the-dates": ["..."],
  wedding: ["..."],
  other: ["..."],
  // New album
  "rehearsal-dinner": ["dinner_01.jpg", "dinner_02.jpg"],
}
\`\`\`

The album name will be automatically formatted (e.g., "rehearsal-dinner" → "Rehearsal Dinner")

## Tips

- **Image Optimization**: Compress and optimize images before uploading to reduce loading times
- **Naming Convention**: Use consistent, descriptive filenames
- **Organization**: Keep folder names lowercase with hyphens (e.g., `save-the-dates`, not `Save The Dates`)
- **Backup**: Keep a backup of all original photos

## Costs

GCS pricing includes:
- Storage: ~$0.020 per GB/month
- Network egress: First 1 GB free, then ~$0.12 per GB
- Operations: Minimal cost for reads

For a typical wedding gallery (200 photos, ~500MB), monthly cost would be around $1-2.

## Security Note

Since these photos will be publicly accessible, only upload photos you're comfortable sharing publicly. For guest-only photos, consider using signed URLs or a different storage solution with authentication.
