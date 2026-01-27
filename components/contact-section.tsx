"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-32 px-4 bg-secondary">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4 ">Message Sent</h2>
          <p className="text-lg font-light text-muted-foreground">
            Thank you for reaching out. We'll get back to you soon!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-secondary">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6  text-balance">
            Questions? We'd love to hear from you
          </h2>
          <p className="text-base font-light text-muted-foreground">
            Have questions about the venue, accommodations, or anything else? Drop us a message.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border/50"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-sm tracking-wider uppercase">
                Name
              </Label>
              <Input id="contactName" required className="border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-sm tracking-wider uppercase">
                Email
              </Label>
              <Input id="contactEmail" type="email" required className="border-border" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm tracking-wider uppercase">
              Subject
            </Label>
            <Input id="subject" required className="border-border" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactMessage" className="text-sm tracking-wider uppercase">
              Message
            </Label>
            <Textarea
              id="contactMessage"
              required
              placeholder="Your message..."
              className="border-border resize-none"
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase py-6"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}
