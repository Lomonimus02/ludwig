# 111 Store - Интернет-магазин с доставкой из Америки

*Современный интернет-магазин с интерактивным анимированным фоном*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/fadeyblinov-8900s-projects/v0-temporary-online-store)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/roHdILE0Wzx)

## Особенности

- 🌫️ **Интерактивный анимированный фон** с эффектом тумана (Vanta.js)
- 🌙 **Поддержка темной и светлой темы** с автоматической адаптацией фона
- 📱 **Адаптивный дизайн** для всех устройств
- 🛒 **Полнофункциональная корзина** с анимациями
- 📊 **Трекинг прогресса поездки** в Америку
- 🎯 **Современный UI/UX** с плавными анимациями

## Новые возможности

### Интерактивный фон Vanta.js
Добавлен красивый интерактивный фон с эффектом **тумана** с использованием библиотеки Vanta.js:
- 🌫️ **Туман** - мистический туман, который автоматически адаптируется к светлой и темной теме
- 🎨 **Автоматическая адаптация цветов** при переключении темы
- ⚡ **Высокая производительность** благодаря WebGL

## Технические детали

### Стек технологий
- **Next.js 15** - React фреймворк
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - утилитарный CSS фреймворк
- **Vanta.js** - библиотека для интерактивных 3D фонов
- **Three.js** - 3D графика в браузере
- **Radix UI** - компоненты интерфейса
- **Zustand** - управление состоянием

### Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

### Структура проекта
```
components/
├── vanta-background.tsx    # Компонент интерактивного фона (туман)
├── header.tsx             # Шапка сайта
├── product-grid.tsx       # Сетка товаров
├── theme-toggle.tsx       # Переключатель темы
└── ...

app/
├── page.tsx              # Главная страница
├── layout.tsx            # Основной layout
└── globals.css           # Глобальные стили
```

## Deployment

Your project is live at:

**[https://vercel.com/fadeyblinov-8900s-projects/v0-temporary-online-store](https://vercel.com/fadeyblinov-8900s-projects/v0-temporary-online-store)**