# Руководство по интеграции Vanta.js

## Обзор

Vanta.js - это библиотека для создания красивых интерактивных анимированных фонов с использованием WebGL и Three.js. В этом проекте мы интегрировали Vanta.js для создания динамических фонов, которые адаптируются к светлой и темной темам.

## Установленные зависимости

```bash
npm install vanta three
npm install @types/three --save-dev
```

## Компоненты

### 1. VantaBackground (`components/vanta-background.tsx`)

Основной компонент для отображения интерактивного фона.

**Особенности:**
- Динамическая загрузка скриптов Vanta.js и Three.js
- Поддержка 5 различных эффектов
- Автоматическая адаптация к светлой/темной теме
- Правильная очистка ресурсов при размонтировании

**Использование:**
```tsx
import { VantaBackground } from '@/components/vanta-background'

<VantaBackground effect="CLOUDS" />
```

### 2. VantaControls (`components/vanta-controls.tsx`)

Панель управления для переключения между эффектами.

**Особенности:**
- Выпадающая панель с описанием эффектов
- Индикация активного эффекта
- Адаптивный дизайн

**Использование:**
```tsx
import { VantaControls } from '@/components/vanta-controls'

<VantaControls 
  currentEffect={effect}
  onEffectChange={setEffect}
/>
```

### 3. VantaInfo (`components/vanta-info.tsx`)

Информационная панель о технологии Vanta.js.

## Доступные эффекты

1. **CLOUDS** - Плавающие облака в небе
2. **WAVES** - Анимированные морские волны
3. **NET** - Динамическая сеть точек и линий
4. **BIRDS** - Стая летящих птиц
5. **FOG** - Мистический туман

## Настройки эффектов

Каждый эффект имеет свои уникальные настройки, которые автоматически адаптируются к теме:

### CLOUDS
```javascript
{
  skyColor: isDark ? 0x1a1a2e : 0x68b8d7,
  cloudColor: isDark ? 0x16213e : 0xadc1de,
  cloudShadowColor: isDark ? 0x0f0f23 : 0x183550,
  sunColor: isDark ? 0x3f51b5 : 0xff9919,
  speed: 0.8,
  scale: 1.0
}
```

### WAVES
```javascript
{
  color: isDark ? 0x1a1a2e : 0x3f7cac,
  waveHeight: 20,
  waveSpeed: 0.5,
  zoom: 0.75
}
```

## Интеграция в проект

1. **Добавьте VantaBackground в layout или страницу:**
```tsx
<div className="min-h-screen relative">
  <VantaBackground effect={selectedEffect} />
  {/* Ваш контент */}
</div>
```

2. **Добавьте элементы управления:**
```tsx
<VantaControls 
  currentEffect={effect}
  onEffectChange={handleEffectChange}
/>
```

3. **Настройте z-index для правильного наложения:**
```css
.vanta-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  pointer-events: none;
}
```

## Производительность

- Эффекты используют WebGL для аппаратного ускорения
- Автоматическое масштабирование для мобильных устройств
- Правильная очистка ресурсов предотвращает утечки памяти

## Совместимость

- Современные браузеры с поддержкой WebGL
- Мобильные устройства (с оптимизированными настройками)
- Автоматическое определение поддержки WebGL

## Отладка

Если эффекты не загружаются:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что WebGL поддерживается
3. Проверьте загрузку внешних скриптов

## Дополнительные ресурсы

- [Официальный сайт Vanta.js](https://www.vantajs.com/)
- [Документация Three.js](https://threejs.org/docs/)
- [Примеры эффектов](https://www.vantajs.com/?effect=clouds)
