import type { ReactNode } from 'react'
import './Hero.css'

// Import the VYRA wordmark SVG
import vyraWordmark from '../assets/vyra-wordmark.svg'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps): ReactNode {
  return (
    <section
      className={`hero ${className}`}
      aria-label="Hero section"
      role="main"
    >
      <div className="hero__container">
        {/* VYRA Wordmark */}
        <div className="hero__brand">
          <img
            src={vyraWordmark}
            alt="VYRA Studio"
            className="hero__logo"
          />
        </div>

        {/* Navigation */}
        <nav className="hero__nav" aria-label="Main navigation">
          <ul className="hero__nav-list">
            <li className="hero__nav-item">
              <a href="#services" className="hero__nav-link">
                Послуги
              </a>
            </li>
            <li className="hero__nav-item">
              <a href="#portfolio" className="hero__nav-link">
                Портфоліо
              </a>
            </li>
            <li className="hero__nav-item">
              <a href="#process" className="hero__nav-link">
                Процес
              </a>
            </li>
            <li className="hero__nav-item">
              <a href="#contacts" className="hero__nav-link">
                Контакти
              </a>
            </li>
          </ul>
        </nav>

        {/* CTA Buttons */}
        <div className="hero__cta">
          <a
            href="#contact"
            className="btn btn--primary hero__cta-primary"
            aria-label="Contact us button"
          >
            Обговорити проєкт
          </a>
          <a
            href="#portfolio"
            className="btn btn--secondary hero__cta-secondary"
            aria-label="View works"
          >
            Переглянути роботи
          </a>
        </div>
      </div>

      {/* Mobile navigation toggle */}
      <button
        className="hero__menu-toggle"
        aria-label="Open main navigation"
        type="button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </section>
  )
}