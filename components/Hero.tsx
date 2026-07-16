'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCountAnimation } from '@/hooks/useScrollReveal'

const carouselImages = [
  '/photo1.png',
  '/photo2.png',
  '/photo3.png',
  '/photo4.png',
  '/photo5.png',
]

export function Hero() {
  useCountAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="hero" id="top">
      {carouselImages.map((src, index) => (
        <div
          key={src}
          className={`hero-bg-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
      <div className="hero-grain" />
      <div className="hero-inner wrap">
        <div className="hero-eyebrow eyebrow">
          SECTION-8 NON-PROFIT · SEHORE, MADHYA PRADESH
        </div>
        <h1>
          Regenerative farming for <em>resilient</em> rural communities.
        </h1>
        <p className="hero-sub">
          We help farmers restore soil health, reduce input costs, and build climate-resilient 
          livelihoods through sustainable and regenerative agriculture practices.
        </p>
        <div className="hero-ctas">
          <Link href="/impact" className="btn btn-primary">
            See our impact
          </Link>
          <Link href="/contact#involve" className="btn btn-ghost">
            Partner with us
          </Link>
        </div>

        {/* Carousel dot indicators */}
        <div className="hero-dots">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num" data-count="800" data-suffix="+">
              0
            </span>
            <div className="stat-label">
              Farmers oriented on regenerative agriculture
            </div>
          </div>
          <div className="hero-stat">
            <span className="stat-num" data-count="8">
              0
            </span>
            <div className="stat-label">
              Districts reached across Madhya Pradesh
            </div>
          </div>
          <div className="hero-stat">
            <span className="stat-num" data-lakh="10">
              0
            </span>
            <div className="stat-label">
              Farmer goal by 2031, India-wide
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

