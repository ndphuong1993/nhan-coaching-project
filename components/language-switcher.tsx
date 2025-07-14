"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLocale } from "@/lib/i18n/locale-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-transparent">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")} className={locale === "en" ? "font-bold" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("vi")} className={locale === "vi" ? "font-bold" : ""}>
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
