"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = ["/hero-1.jpg", "/hero-2.jpg", "/hero-3.jpg"]

export function HeroImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null) // Dùng useRef để lưu ID của interval

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        setIsFading(false)
      }, 500) // Thời gian fade out
    }, 5000) // Chuyển ảnh sau mỗi 5 giây
  }, [])

  const goToNextImage = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      setIsFading(false)
      resetInterval() // Đặt lại timer khi chuyển ảnh thủ công
    }, 500)
  }, [resetInterval])

  const goToPrevImage = useCallback(() => {
    setIsFading(true)
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setIsFading(false)
      resetInterval() // Đặt lại timer khi chuyển ảnh thủ công
    }, 500)
  }, [resetInterval])

  useEffect(() => {
    resetInterval() // Khởi tạo timer khi component mount

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current) // Dọn dẹp timer khi component unmount
      }
    }
  }, [resetInterval]) // Chạy lại effect nếu resetInterval thay đổi (nhưng nó là useCallback nên sẽ ổn định)

  return (
    <div className="relative w-full max-w-sm lg:max-w-md aspect-square rounded-2xl shadow-2xl overflow-hidden">
      <Image
        src={images[currentImageIndex] || "/placeholder.svg"}
        alt={`Hero image ${currentImageIndex + 1}`}
        fill
        className={`object-cover transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}
        priority={currentImageIndex === 0} // Ưu tiên tải ảnh đầu tiên
      />

      {/* Nút điều hướng trái */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white hover:text-stone-800 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        onClick={goToPrevImage}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Nút điều hướng phải */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white hover:text-stone-800 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        onClick={goToNextImage}
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
