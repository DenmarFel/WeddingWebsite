"use client"

import { useState } from "react"

/*
  GALLERY CONFIGURATION
  ---------------------
  Configure your photo albums and integrate with Google Cloud Storage.
  
  To use Google Cloud Storage:
  1. Set up a GCS bucket with public read access
  2. Upload your photos organized in folders (engagement, proposal, etc.)
  3. Update GALLERY_CONFIG.gcsConfig with your bucket details
  4. Set useGCS to true
  5. Photos will be loaded from: https://storage.googleapis.com/{bucket}/{folder}/{filename}
  
  Or use local/imported images by setting useGCS to false and providing image arrays.
*/

export interface GalleryImage {
  src: string
  alt: string
  filename?: string // For GCS integration
}

export interface GalleryAlbum {
  id: string
  name: string
  images: GalleryImage[]
}

// Configuration
const GALLERY_CONFIG = {
  // Set to true to use Google Cloud Storage
  useGCS: false,

  // Google Cloud Storage configuration
  gcsConfig: {
    bucketName: "your-wedding-photos-bucket",
    // Define your folder structure and filenames
    folders: {
      engagement: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
      proposal: ["photo1.jpg", "photo2.jpg"],
      "save-the-dates": ["photo1.jpg", "photo2.jpg"],
      wedding: [], // Keep empty array as placeholder for future wedding photos from GCS
      other: ["photo1.jpg"],
    },
  },
}

// Helper to generate GCS URLs
function getGcsUrl(folder: string, filename: string): string {
  const { bucketName } = GALLERY_CONFIG.gcsConfig
  return `https://storage.googleapis.com/${bucketName}/${folder}/${filename}`
}

// Generate albums from GCS or use placeholder images
function generateAlbums(): GalleryAlbum[] {
  if (GALLERY_CONFIG.useGCS) {
    // Generate from GCS configuration
    return Object.entries(GALLERY_CONFIG.gcsConfig.folders).map(([folderId, filenames]) => ({
      id: folderId,
      name: folderId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      images: filenames.map((filename) => ({
        src: getGcsUrl(folderId, filename),
        alt: `${folderId} photo`,
        filename,
      })),
    }))
  } else {
    // Use placeholder images
    return [
      {
        id: "engagement",
        name: "Engagement",
        images: [
          { src: "/romantic-couple-engagement.jpg", alt: "Engagement 1" },
          { src: "/couple-portrait-elegant.jpg", alt: "Engagement 2" },
          { src: "/engagement-ring-closeup.jpg", alt: "Engagement 3" },
        ],
      },
      {
        id: "proposal",
        name: "Proposal",
        images: [
          { src: "/proposal-moment-romantic.jpg", alt: "Proposal 1" },
          { src: "/couple-celebrating.png", alt: "Proposal 2" },
        ],
      },
      {
        id: "save-the-dates",
        name: "Save the Dates",
        images: [
          { src: "/save-the-date-photoshoot.jpg", alt: "Save the Date 1" },
          { src: "/couple-casual-outdoor.jpg", alt: "Save the Date 2" },
        ],
      },
      {
        id: "wedding",
        name: "Wedding",
        images: [], // Empty - will show cheeky message
      },
      {
        id: "other",
        name: "Other Moments",
        images: [
          { src: "/couple-candid-moment.jpg", alt: "Other 1" },
          { src: "/couple-laughing.jpg", alt: "Other 2" },
        ],
      },
    ]
  }
}

const ALBUMS = generateAlbums()

// Create "All" album by combining all images
const ALL_IMAGES = ALBUMS.flatMap((album) => album.images)

export function GallerySection() {
  const [selectedAlbum, setSelectedAlbum] = useState<string>("all")

  const currentImages = selectedAlbum === "all" ? ALL_IMAGES : ALBUMS.find((a) => a.id === selectedAlbum)?.images || []

  return (
    <section id="gallery" className="py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-12 font-serif text-balance">
            Moments we've captured along the way
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedAlbum("all")}
              className={`px-7 py-3.5 rounded-full text-sm md:text-base font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                selectedAlbum === "all"
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                  : "bg-card/80 backdrop-blur-sm hover:bg-card text-foreground/70 hover:text-foreground border border-border/50"
              }`}
            >
              All Photos
            </button>
            {ALBUMS.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbum(album.id)}
                className={`px-7 py-3.5 rounded-full text-sm md:text-base font-light tracking-wide transition-all duration-300 hover:scale-105 ${
                  selectedAlbum === album.id
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "bg-card/80 backdrop-blur-sm hover:bg-card text-foreground/70 hover:text-foreground border border-border/50"
                }`}
              >
                {album.name}
              </button>
            ))}
          </div>
        </div>

        {selectedAlbum === "wedding" && currentImages.length === 0 ? (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <p className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6 italic">
              The big day hasn't happened yet!
            </p>
            <p className="text-lg md:text-xl text-foreground/60 font-light leading-relaxed">
              Look sharp on May 30th, 2026 — these photos are waiting to be taken.
            </p>
          </div>
        ) : (
          <>
            {/* Masonry gallery with modern rounded cards */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-5 md:gap-6 space-y-5 md:space-y-6">
              {currentImages.map((image, index) => (
                <div
                  key={`${selectedAlbum}-${index}`}
                  className="break-inside-avoid rounded-2xl overflow-hidden bg-card shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] border border-border/20"
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {currentImages.length === 0 && selectedAlbum !== "wedding" && (
              <div className="text-center py-16 text-foreground/50 font-light">
                <p className="text-xl">No photos in this album yet. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
