"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/lib/i18n/locale-context"
import type { TranslationKeys } from "@/lib/i18n/types"
import { RotateCcw, X } from "lucide-react"
import type { HTMLDivElement } from "react"

interface FlippableServiceCardProps {
  icon: React.ElementType
  titleKey: TranslationKeys
  descKey: TranslationKeys
  detailKey: TranslationKeys
}

export function FlippableServiceCard({ icon: IconComponent, titleKey, descKey, detailKey }: FlippableServiceCardProps) {
  const { t } = useLocale()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false) // Controls rendering of the fixed popup container
  const [initialRect, setInitialRect] = useState<DOMRect | null>(null) // Stores original card's rect

  const cardRef = useRef<HTMLDivElement>(null) // Reference to the original card
  const popupRef = useRef<HTMLDivElement>(null) // Reference to the popup card for animation
  const overlayRef = useRef<HTMLDivElement>(null) // Reference to the overlay for opacity control

  const handleOpen = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setInitialRect(rect)
      setIsExpanded(true) // This will cause the popup to render
      document.body.style.overflow = "hidden" // Prevent scrolling
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsFlipped(false) // Step 1: Start un-flipping (700ms)

    // Animate overlay out immediately
    if (overlayRef.current) {
      overlayRef.current.classList.remove("opacity-100")
      overlayRef.current.classList.add("opacity-0")
    }

    // Step 2: After un-flip, start fly-back animation (500ms)
    // We need to ensure the popup is visible and transitions back
    setTimeout(() => {
      if (popupRef.current && initialRect) {
        const popupElement = popupRef.current

        // Set transition for position/size/transform
        popupElement.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        popupElement.style.left = `${initialRect.left}px`
        popupElement.style.top = `${initialRect.top}px`
        popupElement.style.width = `${initialRect.width}px`
        popupElement.style.height = `${initialRect.height}px`
        popupElement.style.transform = "translate(0,0) scale(1)"
        popupElement.style.opacity = "1" // Ensure it's fully visible during fly-back

        // Step 3: After fly-back completes, then unmount
        // We use a timeout that matches the fly-back duration
        setTimeout(() => {
          setIsExpanded(false) // Unmount the popup
          setInitialRect(null)
          document.body.style.overflow = "" // Allow scrolling
        }, 500) // Matches the fly-back transition duration
      } else {
        // Fallback if refs are null, just close
        setIsExpanded(false)
        setInitialRect(null)
        document.body.style.overflow = ""
      }
    }, 700) // This timeout ensures the flip animation (700ms) has completed or is well underway
  }, [initialRect])

  // Effect to handle the "fly-in" animation when isExpanded becomes true
  useEffect(() => {
    if (isExpanded && popupRef.current && initialRect) {
      const popupElement = popupRef.current
      const overlayElement = overlayRef.current

      // 1. Set initial position without transition
      popupElement.style.transition = "none"
      popupElement.style.left = `${initialRect.left}px`
      popupElement.style.top = `${initialRect.top}px`
      popupElement.style.width = `${initialRect.width}px`
      popupElement.style.height = `${initialRect.height}px`
      popupElement.style.transform = "translate(0,0) scale(1)"
      popupElement.style.opacity = "0" // Start invisible

      // 2. Force a reflow/repaint. This is crucial.
      popupElement.offsetHeight // Accessing offsetHeight forces the browser to apply the styles immediately.

      // 3. In the next animation frame, apply target styles with transition
      requestAnimationFrame(() => {
        const targetWidth = Math.min(window.innerWidth * 0.9, 500)
        const targetHeight = Math.min(window.innerHeight * 0.9, 600)

        popupElement.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" // Enable transition
        popupElement.style.left = "50%"
        popupElement.style.top = "50%"
        popupElement.style.width = `${targetWidth}px`
        popupElement.style.height = `${targetHeight}px`
        popupElement.style.transform = "translate(-50%, -50%) scale(1.2)"
        popupElement.style.opacity = "1" // Fade in

        // Animate overlay in
        if (overlayElement) {
          overlayElement.classList.remove("opacity-0")
          overlayElement.classList.add("opacity-100")
        }
      })

      // After centering animation (500ms), trigger the flip
      setTimeout(() => {
        setIsFlipped(true)
      }, 500)
    } else if (!isExpanded && popupRef.current) {
      // This block runs when isExpanded becomes false (after the close animation chain)
      // It's crucial to reset the transition property here so the next open animation starts correctly.
      popupRef.current.style.transition = "none"
      // Also, ensure opacity is 0 when not expanded to prevent flashes on re-render
      popupRef.current.style.opacity = "0"
    }
  }, [isExpanded, initialRect]) // Rerun when isExpanded or initialRect changes

  // Effect to handle keyboard escape key for closing
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isExpanded) {
        handleClose()
      }
    }

    if (isExpanded) {
      document.addEventListener("keydown", handleEscape)
    } else {
      document.removeEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isExpanded, handleClose])

  return (
    <>
      {/* Original card - becomes invisible when expanded card is active */}
      <div
        ref={cardRef}
        className={`relative w-full h-full perspective-1000 cursor-pointer ${isExpanded ? "invisible" : ""}`}
        onClick={handleOpen}
        style={{ minHeight: "250px" }}
      >
        <Card className="w-full h-full bg-white border-stone-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-xl text-stone-800">{t(titleKey)}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <CardDescription className="text-stone-600 text-center">{t(descKey)}</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Expanded/Popup card container and overlay */}
      {isExpanded && ( // Only render if isExpanded is true
        <div
          ref={overlayRef} // Attach ref to overlay
          className={`fixed inset-0 z-[99] transition-opacity duration-500 bg-black/0 opacity-0`} // Initial state for overlay
          onClick={handleClose}
        >
          <div
            ref={popupRef} // Assign ref here
            className={`absolute perspective-1000 transform-style-preserve-3d`} // Transition handled by JS
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the card itself
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front face of the expanded card */}
              <Card className="absolute w-full h-full backface-hidden bg-white border-4 border-stone-300 shadow-lg flex flex-col justify-between">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl text-stone-800">{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <CardDescription className="text-stone-700 text-center">{t(descKey)}</CardDescription>
                </CardContent>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-stone-200/80 hover:bg-stone-300/80 text-stone-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </Card>

              {/* Back face of the expanded card */}
              <Card className="absolute w-full h-full backface-hidden bg-emerald-700 border-4 border-emerald-800 text-white shadow-lg rotate-y-180 flex flex-col justify-between p-6">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold mb-2 text-emerald-300">{t(titleKey)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center text-center">
                  <p className="text-emerald-100 text-base leading-relaxed">{t(detailKey)}</p>
                </CardContent>
                <div className="flex justify-center mt-4">
                  <RotateCcw className="h-5 w-5 text-emerald-300" />
                  <span className="ml-2 text-emerald-300 text-sm">{t("clickToFlipBack")}</span>
                </div>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-emerald-800/50 hover:bg-emerald-900/70 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
