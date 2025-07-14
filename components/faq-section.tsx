"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLocale } from "@/lib/i18n/locale-context"

export function FAQSection() {
  const { t } = useLocale()

  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer"),
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer"),
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer"),
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer"),
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">{t("frequentlyAskedQuestions")}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("faqDescription")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-stone-800 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-stone-600 text-base leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
