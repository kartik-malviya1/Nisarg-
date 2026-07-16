'use client'

import { useEffect } from 'react'

export function useScrollReveal(containerRef?: unknown) {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal, .reveal-stagger')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    revealEls.forEach((el) => io.observe(el))

    return () => {
      revealEls.forEach((el) => io.unobserve(el))
    }
  }, [])
}

export function useCountAnimation() {
  useEffect(() => {
    function animateCount(el: Element) {
      const target = parseInt((el as HTMLElement).dataset.count || '0', 10)
      const suffix = (el as HTMLElement).dataset.suffix || ''
      const dur = 1400
      const start = performance.now()

      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        ;(el as HTMLElement).textContent = Math.round(eased * target) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    function animateLakh(el: Element) {
      const lakhs = parseInt(
        (el as HTMLElement).dataset.lakh ||
          (el as HTMLElement).dataset.lakhBig ||
          '0',
        10
      )
      const target = lakhs * 100000
      const dur = 1600
      const start = performance.now()

      function fmt(n: number) {
        let s = String(n)
        let last3 = s.slice(-3)
        let rest = s.slice(0, -3)
        if (rest !== '') last3 = ',' + last3
        rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
        return rest + last3
      }

      function tick(now: number) {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        ;(el as HTMLElement).textContent = fmt(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    const countEls = document.querySelectorAll('[data-count]')
    const lakhEls = document.querySelectorAll('[data-lakh]')
    const lakhBigEls = document.querySelectorAll('[data-lakh-big]')

    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if ((e.target as HTMLElement).dataset.count) animateCount(e.target)
            else if ((e.target as HTMLElement).dataset.lakh)
              animateLakh(e.target)
            else if ((e.target as HTMLElement).dataset.lakhBig)
              animateLakh(e.target)
            countIo.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 }
    )

    countEls.forEach((el) => countIo.observe(el))
    lakhEls.forEach((el) => countIo.observe(el))
    lakhBigEls.forEach((el) => countIo.observe(el))

    return () => {
      countEls.forEach((el) => countIo.unobserve(el))
      lakhEls.forEach((el) => countIo.unobserve(el))
      lakhBigEls.forEach((el) => countIo.unobserve(el))
    }
  }, [])
}

export function useTimelineAnimation() {
  useEffect(() => {
    const timeline = document.getElementById('timeline')
    const timelineFill = document.getElementById('timelineFill')

    if (!timeline || !timelineFill) return

    function updateTimeline() {
      const rect = timeline!.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height
      const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total)
      const pct = Math.min(visible / total, 1) * 100
      timelineFill!.style.height = pct + '%'
    }

    window.addEventListener('scroll', updateTimeline)
    window.addEventListener('resize', updateTimeline)
    updateTimeline()

    return () => {
      window.removeEventListener('scroll', updateTimeline)
      window.removeEventListener('resize', updateTimeline)
    }
  }, [])
}

export function useNavShadow() {
  useEffect(() => {
    function updateNavShadow() {
      const nav = document.querySelector('.nav')
      if (nav) {
        if (window.scrollY > 40) {
          ;(nav as HTMLElement).style.boxShadow =
            '0 8px 24px -12px rgba(0,0,0,0.4)'
        } else {
          ;(nav as HTMLElement).style.boxShadow = 'none'
        }
      }
    }

    window.addEventListener('scroll', updateNavShadow)
    return () => window.removeEventListener('scroll', updateNavShadow)
  }, [])
}
