"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navLinks = [
  { href: "/#story", label: "Our Story" },
  { href: "/#details", label: "Details" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/#registry", label: "Registry" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger button - fixed position */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-0 left-4 z-[60] h-[64px] w-12 flex items-center justify-center bg-transparent border-none mix-blend-difference cursor-pointer rounded-full hover:scale-110 transition-all duration-300"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-50 bg-background transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 left-4 h-[64px] w-12 flex items-center justify-center cursor-pointer rounded-full hover:scale-110 transition-all duration-300"
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        <nav className="h-full flex flex-col items-center justify-center gap-8">
          {/* Logo/Monogram in menu */}
          <div className="mb-8">
            <span className="text-4xl font-light tracking-widest text-foreground">C & D</span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl md:text-3xl font-light tracking-wide text-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
