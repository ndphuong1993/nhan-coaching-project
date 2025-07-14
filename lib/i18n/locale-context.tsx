"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { translations, type Locale, type TranslationKeys } from "./translations"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKeys) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en") // Mặc định là tiếng Anh

  const t = useCallback(
    (key: TranslationKeys) => {
      return translations[locale][key] || key // Trả về key nếu không tìm thấy bản dịch
    },
    [locale],
  )

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}
