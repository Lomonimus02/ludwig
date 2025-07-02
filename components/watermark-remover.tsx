"use client"

import { useEffect } from 'react'

export function WatermarkRemover() {
  useEffect(() => {
    // Блокируем создание новых элементов через перехват appendChild и insertBefore
    const originalAppendChild = Node.prototype.appendChild
    const originalInsertBefore = Node.prototype.insertBefore

    Node.prototype.appendChild = function(newChild) {
      if (newChild instanceof HTMLElement) {
        const text = newChild.textContent?.trim()
        const style = newChild.style

        // Блокируем добавление элементов с "N" в левом нижнем углу
        if (
          text === 'N' &&
          (style.position === 'fixed' || newChild.getAttribute('style')?.includes('position: fixed')) &&
          (style.bottom || newChild.getAttribute('style')?.includes('bottom')) &&
          (style.left || newChild.getAttribute('style')?.includes('left'))
        ) {
          console.log('Blocked adding element with N:', newChild)
          return newChild // Возвращаем элемент, но не добавляем в DOM
        }
      }
      return originalAppendChild.call(this, newChild)
    }

    Node.prototype.insertBefore = function(newChild, referenceChild) {
      if (newChild instanceof HTMLElement) {
        const text = newChild.textContent?.trim()
        const style = newChild.style

        // Блокируем вставку элементов с "N" в левом нижнем углу
        if (
          text === 'N' &&
          (style.position === 'fixed' || newChild.getAttribute('style')?.includes('position: fixed')) &&
          (style.bottom || newChild.getAttribute('style')?.includes('bottom')) &&
          (style.left || newChild.getAttribute('style')?.includes('left'))
        ) {
          console.log('Blocked inserting element with N:', newChild)
          return newChild // Возвращаем элемент, но не добавляем в DOM
        }
      }
      return originalInsertBefore.call(this, newChild, referenceChild)
    }

    const removeWatermark = () => {
      // Ищем элементы, которые могут быть watermark
      const selectors = [
        '[data-v0-watermark]',
        '[class*="v0-watermark"]',
        '[id*="v0-watermark"]',
        'div[style*="position: fixed"][style*="bottom"][style*="left"]',
        'div[style*="position: fixed"][style*="z-index: 9999"]',
        'div[style*="background: black"][style*="border-radius: 50%"]',
        'div[style*="background-color: black"][style*="border-radius: 50%"]',
        'div[style*="background: #000"][style*="border-radius: 50%"]',
        'div[style*="background-color: #000"][style*="border-radius: 50%"]'
      ]

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none'
            element.style.visibility = 'hidden'
            element.style.opacity = '0'
            element.style.pointerEvents = 'none'
            // Полностью удаляем элемент из DOM
            element.remove()
          }
        })
      })

      // Дополнительная проверка для элементов с буквой "N"
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
        if (element instanceof HTMLElement) {
          const style = window.getComputedStyle(element)
          const text = element.textContent?.trim()
          const innerHTML = element.innerHTML?.trim()

          // Проверяем различные варианты элемента с "N"
          if (
            (text === 'N' || innerHTML === 'N' || element.innerText?.trim() === 'N') &&
            style.position === 'fixed' &&
            (
              style.backgroundColor === 'black' ||
              style.backgroundColor === 'rgb(0, 0, 0)' ||
              style.backgroundColor === '#000' ||
              style.backgroundColor === '#000000' ||
              style.background?.includes('black') ||
              style.background?.includes('#000') ||
              style.background?.includes('rgb(0, 0, 0)')
            )
          ) {
            console.log('Removing element with N:', element)
            element.remove()
          }

          // Проверяем элементы в левом нижнем углу
          if (
            style.position === 'fixed' &&
            (style.bottom === '20px' || style.bottom === '1rem' || style.bottom === '16px') &&
            (style.left === '20px' || style.left === '1rem' || style.left === '16px') &&
            (style.borderRadius === '50%' || style.borderRadius?.includes('50%'))
          ) {
            console.log('Removing fixed bottom-left element:', element)
            element.remove()
          }
        }
      })
    }

    // Запускаем сразу
    removeWatermark()

    // Запускаем через 1 секунду (когда watermark обычно появляется)
    const timeout1 = setTimeout(removeWatermark, 1000)

    // Запускаем через 2 секунды для надежности
    const timeout2 = setTimeout(removeWatermark, 2000)

    // Запускаем через 3 секунды
    const timeout3 = setTimeout(removeWatermark, 3000)

    // Запускаем каждые 5 секунд для постоянной проверки
    const interval = setInterval(removeWatermark, 5000)

    // Наблюдаем за изменениями в DOM
    const observer = new MutationObserver(() => {
      removeWatermark()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'id']
    })

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      clearInterval(interval)
      observer.disconnect()

      // Восстанавливаем оригинальные методы
      Node.prototype.appendChild = originalAppendChild
      Node.prototype.insertBefore = originalInsertBefore
    }
  }, [])

  return null // Этот компонент ничего не рендерит
}
