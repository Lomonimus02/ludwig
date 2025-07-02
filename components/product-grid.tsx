"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { ProductModal } from "./product-modal"
import { ProductGridSkeleton } from "./loading-skeleton"


const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1200,
    image: "/placeholder.svg?height=300&width=300",
    category: "Электроника",
    rating: 4.9,
    description: "Последняя модель iPhone с титановым корпусом",
  },
  {
    id: 2,
    name: "Nike Air Jordan 1",
    price: 170,
    originalPrice: 220,
    image: "/placeholder.svg?height=300&width=300",
    category: "Обувь",
    rating: 4.8,
    description: "Классические кроссовки Nike Air Jordan",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 1099,
    originalPrice: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Электроника",
    rating: 4.9,
    description: "Новый MacBook Air с чипом M3",
  },
  {
    id: 4,
    name: "Levi's 501 Jeans",
    price: 59,
    originalPrice: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Одежда",
    rating: 4.7,
    description: "Классические джинсы Levi's 501",
  },
  {
    id: 5,
    name: "Stanley Tumbler",
    price: 45,
    originalPrice: 60,
    image: "/placeholder.svg?height=300&width=300",
    category: "Аксессуары",
    rating: 4.6,
    description: "Популярная термокружка Stanley",
  },
  {
    id: 6,
    name: "Apple AirPods Pro",
    price: 249,
    originalPrice: 299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Электроника",
    rating: 4.8,
    description: "Беспроводные наушники с шумоподавлением",
  },
  {
    id: 7,
    name: "Patagonia Jacket",
    price: 199,
    originalPrice: 279,
    image: "/placeholder.svg?height=300&width=300",
    category: "Одежда",
    rating: 4.9,
    description: "Куртка Patagonia для активного отдыха",
  },
  {
    id: 8,
    name: "Vitamins & Supplements",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=300&width=300",
    category: "Здоровье",
    rating: 4.5,
    description: "Набор витаминов и добавок из США",
  },
]

export function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const { addItem } = useCart()
  const { toast } = useToast()

  // Симуляция загрузки
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: any, buttonElement?: HTMLElement) => {
    // Проверяем, вызвано ли из модального окна (передан buttonElement)
    if (buttonElement) {
      // Добавление из модального окна с опциями
      addItem(product)

      // Мгновенно закрываем модальное окно
      setSelectedProduct(null)

      toast({
        title: "Товар добавлен в корзину",
        description: `${product.name} добавлен в вашу корзину`,
      })
    } else {
      // Обычное добавление из карточки товара - открываем модальное окно
      setSelectedProduct(product)
    }
  }

  const handleProductClick = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
  }

  if (isLoading) {
    return <ProductGridSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card
            key={product.id}
            className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-in-up dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-2xl flex flex-col h-full"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleProductClick(product)}
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex-1 flex flex-col">
                <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors dark:text-white h-14 flex items-center line-clamp-2 leading-tight">
                  {product.name}
                </CardTitle>
                <div className="flex items-center justify-start mt-auto pt-2">
                  <span className="text-2xl font-bold text-green-600 animate-price-pulse">${product.price}</span>
                </div>
              </div>
              <Button
                className="w-full sm:w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 ripple mt-4 sm:px-4 px-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart(product)
                }}
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
                <span className="hidden sm:inline ml-2">Добавить в корзину</span>
                <span className="sm:hidden sr-only">Добавить в корзину</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}
