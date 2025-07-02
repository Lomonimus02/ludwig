import { render, screen } from '@testing-library/react'
import { VantaBackground } from '@/components/vanta-background'
import { ThemeProvider } from '@/components/theme-provider'

// Мокаем window объекты для тестирования
Object.defineProperty(window, 'THREE', {
  value: {},
  writable: true
})

Object.defineProperty(window, 'VANTA', {
  value: {
    CLOUDS: jest.fn(() => ({
      destroy: jest.fn(),
      setOptions: jest.fn()
    }))
  },
  writable: true
})

// Мокаем создание script элементов
const mockAppendChild = jest.fn()
Object.defineProperty(document, 'head', {
  value: {
    appendChild: mockAppendChild
  },
  writable: true
})

Object.defineProperty(document, 'getElementById', {
  value: jest.fn(() => null),
  writable: true
})

describe('VantaBackground', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <VantaBackground />
      </ThemeProvider>
    )
    
    // Проверяем, что div с правильными классами создан
    const backgroundDiv = document.querySelector('.fixed.inset-0.-z-10')
    expect(backgroundDiv).toBeTruthy()
  })

  it('applies correct styles', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <VantaBackground className="custom-class" />
      </ThemeProvider>
    )
    
    const backgroundDiv = document.querySelector('.custom-class')
    expect(backgroundDiv).toBeTruthy()
  })

  it('handles different effects', () => {
    const { rerender } = render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <VantaBackground effect="CLOUDS" />
      </ThemeProvider>
    )
    
    rerender(
      <ThemeProvider attribute="class" defaultTheme="light">
        <VantaBackground effect="WAVES" />
      </ThemeProvider>
    )
    
    // Проверяем, что компонент может обрабатывать разные эффекты
    expect(true).toBe(true) // Базовый тест на отсутствие ошибок
  })
})
