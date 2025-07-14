"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useLocale } from "@/lib/i18n/locale-context"

export function TestimonialsSection() {
  const { t } = useLocale()

  const testimonials = [
    {
      name: t("testimonial1Name"),
      title: t("testimonial1Title"),
      quote: t("testimonial1Quote"),
    },
    {
      name: t("testimonial2Name"),
      title: t("testimonial2Title"),
      quote: t("testimonial2Quote"),
    },
    {
      name: t("testimonial3Name"),
      title: t("testimonial3Title"),
      quote: t("testimonial3Quote"),
    },
  ]

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">{t("whatClientsSay")}</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("testimonialsDescription")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-stone-200 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <p className="text-stone-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-stone-800">{testimonial.name}</div>
                <div className="text-sm text-stone-500">{testimonial.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
