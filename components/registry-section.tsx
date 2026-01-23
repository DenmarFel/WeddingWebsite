"use client"

import { ExternalLink } from "lucide-react"

const REGISTRY_LINKS = [
  { name: "Amazon", url: "https://amazon.com/wedding/registry-placeholder" },
  { name: "Bloomingdale's", url: "https://bloomingdales.com/registry-placeholder" },
  { name: "Crate & Barrel", url: "https://crateandbarrel.com/registry-placeholder" },
]

export function RegistrySection() {
  return (
    <section id="registry" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 font-serif text-balance">
          Your presence is our greatest gift
        </h2>
        <p className="text-lg md:text-xl text-foreground/60 font-light max-w-xl mx-auto mb-16 leading-relaxed">
          But if you wish to honor us with something more, we've registered at these stores.
        </p>

        {/* Simple link list */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
          {REGISTRY_LINKS.map((registry) => (
            <a
              key={registry.name}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xl md:text-2xl font-light text-foreground/70 hover:text-foreground transition-colors"
            >
              {registry.name}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
