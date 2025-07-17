"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  User,
  Users,
  Home,
  Calendar,
  BookOpen,
  Notebook,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/i18n/locale-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeroImageCarousel } from "@/components/hero-image-carousel"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { useActionState } from "react"
import { submitContactForm } from "@/app/actions"
import type { TranslationKeys } from "@/lib/i18n/types"
import { FlippableServiceCard } from "@/components/flippable-service-card" // Import FlippableServiceCard

interface ServiceItem {
  icon: React.ElementType
  titleKey: TranslationKeys
  descKey: TranslationKeys
  detailKey: TranslationKeys
}

export default function NhanCoachingLanding() {
  const { t } = useLocale()
  const [formState, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: "",
  })

  // Tách chuỗi introText để áp dụng font cho từ "Nhân"
  const introTextContent = t("introText")
  const nhanKeyword = "The Soul Nest"
  const parts = introTextContent.split(nhanKeyword)

  const servicesData: ServiceItem[] = [
    {
      icon: User,
      titleKey: "oneToOneCoaching",
      descKey: "oneToOneCoachingDesc",
      detailKey: "oneToOneCoachingDetail",
    },
    {
      icon: Users,
      titleKey: "groupCoaching",
      descKey: "groupCoachingDesc",
      detailKey: "groupCoachingDetail",
    },
    {
      icon: Home,
      titleKey: "privateRoomRental",
      descKey: "privateRoomRentalDesc",
      detailKey: "privateRoomRentalDetail",
    },
    {
      icon: Calendar,
      titleKey: "eventSpace",
      descKey: "eventSpaceDesc",
      detailKey: "eventSpaceDetail",
    },
    {
      icon: BookOpen,
      titleKey: "thematicWorkshops",
      descKey: "thematicWorkshopsDesc",
      detailKey: "thematicWorkshopsDetail",
    },
    {
      icon: Notebook,
      titleKey: "selfCoachingTools",
      descKey: "selfCoachingToolsDesc",
      detailKey: "selfCoachingToolsDetail",
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo và tên thương hiệu */}
          <div className="flex items-center space-x-4">
            <Image src="/nhan-logo.jpg" alt="Nhân Logo" width={50} height={50} className="rounded-full object-cover" />
            <span className="text-3xl font-halimun text-stone-800">The Soul Nest</span>
          </div>

          {/* Navigation và Language Switcher */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link href="#services" className="text-stone-600 hover:text-emerald-600 transition-colors">
                {t("services")}
              </Link>
              <Link href="#about" className="text-stone-600 hover:text-emerald-600 transition-colors">
                {t("about")}
              </Link>
              <Link href="#contact" className="text-stone-600 hover:text-emerald-600 transition-colors">
                {t("contact")}
              </Link>
            </nav>
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image with blur and overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105"
          style={{ backgroundImage: "url('/hero-background.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay để làm mờ và tăng độ tương phản */}
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center text-white">
            {/* Cột bên trái: Text và CTA Buttons */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-halimun leading-tight">The Soul Nest</h1>
                <p className="text-xl lg:text-2xl font-light">{t("heroTagline")}</p>
              </div>
              <p className="text-lg leading-relaxed">{t("heroDescription")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact" passHref>
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                    {t("bookFreeSession")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#services" passHref>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 bg-transparent"
                  >
                    {t("joinOurWorkshop")}
                  </Button>
                </Link>
              </div>
            </div>
            {/* Cột bên phải: Hình ảnh vuông */}
            <div className="relative flex justify-center lg:justify-end">
              <HeroImageCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed">
            {parts[0]}
            <span className="font-halimun">{nhanKeyword}</span>
            {parts.slice(1).join(nhanKeyword)}
          </p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">{t("ourServices")}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("servicesDescription")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {servicesData.map((service, index) => (
              <FlippableServiceCard
                key={index}
                icon={service.icon}
                titleKey={service.titleKey}
                descKey={service.descKey}
                detailKey={service.detailKey}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="#services" passHref>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                {t("exploreServices")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">{t("whoWeServe")}</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">{t("whoWeServeDesc")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-stone-50 border-stone-200 text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{t("individuals")}</h3>
              <p className="text-stone-600">{t("individualsDesc")}</p>
            </Card>

            <Card className="bg-stone-50 border-stone-200 text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{t("freelanceCoaches")}</h3>
              <p className="text-stone-600">{t("freelanceCoachesDesc")}</p>
            </Card>

            <Card className="bg-stone-50 border-stone-200 text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-800 mb-4">{t("businesses")}</h3>
              <p className="text-stone-600">{t("businessesDesc")}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision/Mission */}
      <section id="about" className="py-20 bg-gradient-to-r from-emerald-50 to-stone-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-8">{t("ourVision")}</h2>
            <p className="text-xl lg:text-2xl text-stone-700 leading-relaxed font-light">{t("ourVisionDesc")}</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-emerald-50 rounded-2xl p-12">
            <div className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-4">300+</div>
            <p className="text-xl text-stone-700">{t("clientsTransformed")}</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer id="contact" className="bg-stone-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {" "}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("stayConnected")}</h3>
              <p className="text-stone-300 mb-6">{t("stayConnectedDesc")}</p>
              <form action={formAction} className="space-y-4">
                <Input
                  type="text"
                  name="name" // Thêm thuộc tính name
                  placeholder={t("yourName")}
                  className="bg-stone-700 border-stone-600 text-white placeholder:text-stone-400"
                  required
                />
                <Input
                  type="email"
                  name="email" // Thêm thuộc tính name
                  placeholder={t("yourEmail")}
                  className="bg-stone-700 border-stone-600 text-white placeholder:text-stone-400"
                  required
                />
                <Input
                  type="text"
                  name="message" // Thêm thuộc tính name
                  placeholder={t("whatYouNeedHelpWith")}
                  className="bg-stone-700 border-stone-600 text-white placeholder:text-stone-400"
                  required
                />
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isPending}>
                  {isPending ? "Submitting..." : t("subscribe")}
                </Button>
                {formState?.message && (
                  <p className={`text-center text-sm ${formState.success ? "text-emerald-400" : "text-red-400"}`}>
                    {t(formState.message as TranslationKeys)}
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t("getInTouch")}</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-emerald-400" />
                  <span className="text-stone-300">{t("emailAddress")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-emerald-400" />
                  <span className="text-stone-300">{t("phoneNumber")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-emerald-400" />
                  <span className="text-stone-300">{t("location")}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-12 pt-8 text-center">
            <p className="text-stone-400">
              © {new Date().getFullYear()} <span className="font-halimun">The Soul Nest</span> {t("allRightsReserved")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
