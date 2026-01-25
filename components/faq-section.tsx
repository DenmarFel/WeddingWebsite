"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"

const faqs = [
  {
    question: "What is the dress code?",
    answer:
      "We request cocktail attire. Think elegant and comfortable—the ceremony and reception will be outdoors. Ladies, consider a wedge heel or flats for the garden.",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "Due to venue capacity, we can only accommodate guests named on the invitation. Please refer to your invitation for details.",
  },
  {
    question: "Will the wedding be indoors or outdoors?",
    answer:
      "Both the ceremony and reception will be held outdoors in the beautiful gardens of Casa Romantica. We recommend bringing a light layer for the evening.",
  },
  {
    question: "Is there parking available?",
    answer: "Yes, there is complimentary parking available at the venue. Valet service will also be provided.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we love your little ones, this will be an adults-only celebration. We hope this allows you to relax and enjoy the evening.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "Please let us know of any dietary restrictions or allergies when you RSVP. We will do our best to accommodate all guests.",
  },
  {
    question: "When should I RSVP by?",
    answer: "Please RSVP by April 30, 2026. This helps us finalize catering and seating arrangements.",
  },
]

export function FaqSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleAll = () => {
    if (openItems.length === faqs.length) {
      setOpenItems([])
    } else {
      setOpenItems(faqs.map((_, index) => `item-${index}`))
    }
  }

  const allExpanded = openItems.length === faqs.length

  return (
    <section id="faq" className="py-24 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-4">Frequently Asked Questions</h2>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="sm" onClick={toggleAll} className="text-sm tracking-wide bg-transparent">
              {allExpanded ? (
                <>
                  <ChevronsDownUp className="w-4 h-4 mr-2" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronsUpDown className="w-4 h-4 mr-2" />
                  Expand All
                </>
              )}
            </Button>
          </div>
        </div>

        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-card px-6 rounded-xl">
              <AccordionTrigger className="text-left text-base md:text-lg font-medium tracking-wide hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
