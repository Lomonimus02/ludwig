"use client"

import { Plane, MapPin, Users, Star, Heart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Cart } from "@/components/cart"
import { useCart } from "@/hooks/use-cart"

export default function AboutPage() {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const scrollToProducts = () => {
    router.push("/#products")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <Header
        totalItems={totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onProductsClick={scrollToProducts}
        subtitle="О нас"
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              О нас
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Story Section */}
          <Card className="mb-8 animate-fade-in-up dark:bg-gray-800/50 dark:border-gray-700" style={{ animationDelay: "200ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">Наша история</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: Heart,
                title: "Lorem Ipsum",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                delay: "400ms"
              },
              {
                icon: Star,
                title: "Sed Do Eiusmod",
                description: "Sed do eiusmod tempor incididunt ut labore et dolore magna",
                color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
                delay: "500ms"
              },
              {
                icon: Globe,
                title: "Ut Enim Ad Minim",
                description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
                color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                delay: "600ms"
              },
              {
                icon: Users,
                title: "Duis Aute Irure",
                description: "Duis aute irure dolor in reprehenderit in voluptate velit",
                color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                delay: "700ms"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="animate-fade-in-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-700"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${feature.color} p-3 rounded-full`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <Card className="animate-fade-in-up dark:bg-gray-800/50 dark:border-gray-700" style={{ animationDelay: "800ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">Lorem Ipsum Dolor</h3>
                  <div className="space-y-3 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span><strong>Lorem ipsum:</strong> Consectetur adipiscing elit</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span><strong>Sed do eiusmod:</strong> Tempor incididunt ut labore et dolore</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span><strong>Ut enim ad minim:</strong> Veniam quis nostrud exercitation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
            <Button 
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
            >
              Перейти к каталогу товаров
            </Button>
          </div>
        </div>
      </main>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
