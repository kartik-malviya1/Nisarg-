'use client'

import { useEffect } from 'react'

export function useNavShadow() {
  useEffect(() => {
    function updateNavShadow() {
      const nav = document.querySelector('.nav') as HTMLElement
      if (!nav) return

      if (window.scrollY > 40) {
        nav.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.4)'
      } else {
        nav.style.boxShadow = 'none'
      }
    }

    window.addEventListener('scroll', updateNavShadow)
    return () => {
      window.removeEventListener('scroll', updateNavShadow)
    }
  }, [])
}
