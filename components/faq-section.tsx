"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"

const faqs = [
  {
    question: "When should I RSVP by?",
    answer: "We kindly request your response by Friday, April 17th, 2026 so we can finalize arrangements with our vendors. If we do not receive your RSVP by the deadline, we will regretfully assume you are unable to attend.",
  },
    {
    question: "How do I RSVP?",
    answer:
      `To RSVP, please click the RSVP tab here on our website and type in your name. All invited guests in your party will appear here to mark as attending or declining.`,
  },
  {
    question: "What time should I arrive?",
    answer:
      `Our ceremony will begin promptly at 4:30 PM. We kindly request that you arrive early to ensure time to park and find your seat. `,
  },
  {
    question: "What should I do if I can't make it?",
    answer:
      `You will be missed! If you cannot attend our wedding, please indicate your regrets on our RSVP so we can plan accordingly. `,
  },
  {
    question: "What is the dress code?",
    answer:
      <>We kindly request formal attire for our wedding celebration. Men are to wear suit and tie or dress shirt and tie. Women to wear a floor-length gown or a formal cocktail dress.Please refrain from wearing jeans and white attire.<br/><br/>
      For outfit inspiration, check out our <a href="https://pin.it/5PiZdYanC" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body)" }} className="underline underline-offset-4 hover:text-foreground transition-colors">Pinterest board</a>.</>,
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "In order to keep our wedding as intimate as possible, only the guest formally invited on your wedding invitation will be accomodated.",
  },
  {
    question: "Will the wedding be indoors or outdoors?",
    answer:
      "Our ceremony will take place outdoors, with the reception to follow indoors."
  },
  {
    question: "Is there parking available?",
    answer: "Yes, there will be complimentary parking valet available at the venue.",
  },
  {
    question: "Are children welcome?",
    answer:
      "We love your little ones! However, we have decided to keep our wedding and reception an adults-only event with exception of some immediate family.",
  },
  {
    question: "What if I have dietary restrictions?",
    answer:
      "Please let us know of any dietary restrictions or allergies when you RSVP. We will do our best to accommodate all guests.",
  },
  {
    question: "Where should I stay?",
    answer:
      `While we are not reserving hotel room blocks, we suggest the following nearby hotels for your convenience: 
      The Volare, San Clemente
      Hampton Inn & Suites, San Clemente
      Laguna Cliffs Marriot, Dana Point `
  },
  {
    question: "Will there be a bar?",
    answer:
      "Yes, the drinks are on us and the hangover is on you- get ready to celebrate!",
  },
  {
    question: "Can I take pictures during the ceremony?",
    answer:
      "We are having an unplugged ceremony, meaning that once the ceremony begins, we ask that all phones be put away and silenced. We want everyone to be fully present with us and for our photographer to be able to capture the best pictures which we will share with you. Once the ceremony is over, feel free to take as many pictures as you'd like.",
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
            <Button variant="outline" size="sm" onClick={toggleAll} className="text-sm tracking-wide bg-transparent cursor-pointer">
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
            <AccordionItem key={index} value={`item-${index}`} className="border border-border bg-card px-6 rounded-xl !border-b">
              <AccordionTrigger className="text-left text-base md:text-lg font-medium tracking-wide hover:no-underline py-6 cursor-pointer">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
