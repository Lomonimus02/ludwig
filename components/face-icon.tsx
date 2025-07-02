import React from 'react'
import Image from 'next/image'

interface FaceIconProps {
  className?: string
  size?: number
}

export function FaceIcon({ className = "h-5 w-5", size }: FaceIconProps) {
  // Определяем размер из className или используем переданный size
  const getSize = () => {
    if (size) return size

    // Парсим размер из className
    if (className.includes('h-3 w-3')) return 12
    if (className.includes('h-4 w-4')) return 16
    if (className.includes('h-5 w-5')) return 20
    if (className.includes('h-6 w-6')) return 24
    if (className.includes('h-8 w-8')) return 32
    if (className.includes('h-10 w-10')) return 40
    if (className.includes('h-12 w-12')) return 48
    if (className.includes('h-16 w-16')) return 64
    if (className.includes('h-20 w-20')) return 80

    return 20 // размер по умолчанию
  }

  const iconSize = getSize()

  return (
    <div
      className={`${className} relative`}
      style={{ width: iconSize, height: iconSize }}
    >
      <Image
        src="/face-icon.png"
        alt="Face Icon"
        width={iconSize}
        height={iconSize}
        className="rounded-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}