/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Отключаем телеметрию Next.js
  telemetry: false,
  // Отключаем индикаторы разработки (включая черный круг с "N")
  devIndicators: false,
}

export default nextConfig