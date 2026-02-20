"use client"

const REGISTRY_LINKS = [
  {
    name: "Amazon",
    url: "https://www.amazon.com/wedding/share/charmarwedding",
    logo: "/logo-amazon.svg",
  },
  {
    name: "Bloomingdale's",
    url: "https://www.bloomingdales.com/registry/Charlene-Santos-Denmar-Feliciano/1334369",
    logo: "/logo-bloomingdales.png",
  },
  {
    name: "Crate & Barrel",
    url: "https://crateandbarrel.com/registry-placeholder",
    logo: "/logo-crate-barrel.png",
  },
]

export function RegistrySection() {
  return (
    <section id="registry" className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6 text-balance">
          Celebrate With Us
        </h2>
        <p className="text-lg md:text-xl text-foreground/60 font-light max-w-xl mx-auto mb-16 leading-relaxed">
          Your love and presence at our wedding are truly the greatest gifts of all. As we begin this
          next chapter together, we are especially excited for our honeymoon adventure. If you wish to
          honor us with a gift, a contribution toward our honeymoon fund would mean so much to us. For
          those who prefer, we have also created a registry which can be found below.
        </p>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
          {REGISTRY_LINKS.map((registry) => (
            <a
              key={registry.name}
              href={registry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full px-8 py-4 rounded-full bg-white/80 border border-foreground/15 shadow-sm hover:bg-white hover:shadow-md hover:border-foreground/25 transition-all duration-200"
            >
              <img
                src={registry.logo}
                alt={registry.name}
                className="h-6 w-auto max-w-[140px] object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
