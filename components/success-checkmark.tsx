"use client"

import { Check } from "lucide-react"

interface SuccessCheckmarkProps {
  isVisible: boolean
  size?: "sm" | "md" | "lg"
  position?: { x: number; y: number }
}

export function SuccessCheckmark({ isVisible, size = "md", position }: SuccessCheckmarkProps) {

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  if (!isVisible) return null

  // Если позиция не передана, используем центр экрана
  const style = position
    ? {
        left: position.x - 24, // Половина ширины иконки (48px / 2)
        top: position.y - 24,  // Половина высоты иконки (48px / 2)
      }
    : {}

  const containerClass = position
    ? "fixed z-[9999] pointer-events-none"
    : "fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none"

  return (
    <div className={containerClass} style={style}>
      <div className={`${sizeClasses[size]} animate-success-pop`}>
        <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
          <Check className={`${iconSizes[size]} text-white animate-check-draw`} strokeWidth={3} />
        </div>
      </div>
    </div>
  )
}
