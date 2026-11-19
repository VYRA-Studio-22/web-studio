import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import './Hero.css'
import vyraWordmark from '../assets/vyra-wordmark.svg'

interface HeroProps {
  className?: string
}

const NAV_LINKS = [
  { href: '#services', label: 'Послуги' },
  { href: '#portfolio', label: 'Портфоліо' },
  { href: '#process', label: 'Процес' },
  { href: '#contacts', label: 'Контакти' },
] as const

function joinClasses(...parts: Array<string | undefined>): string {
  return parts.filter((part) => part !== undefined && part.length > 0).join(' ')
}

function MenuIcon({ open }: { open: boolean }): ReactNode {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="hero__menu-icon">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="hero__menu-icon">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Hero({ className }: HeroProps): ReactNode {
  const [menuOpen, setMenuOpen] = useState(false)
  const titleId = useId()
  const navId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 769px)')
    const closeOnDesktop = () => {
      if (media.matches) {
        setMenuOpen(false)
      }
    }

    media.addEventListener('change', closeOnDesktop)
    return () => {
      media.removeEventListener('change', closeOnDesktop)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const nav = navRef.current
    const button = menuButtonRef.current
    const links = nav
      ? Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href]'))
      : []

    links[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return
      }
      setMenuOpen(false)
      button?.focus()
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) {
        return
      }
      if (nav?.contains(target) || button?.contains(target)) {
        return
      }
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="hero__bar">
        <a href="#hero" className="hero__brand">
          <img
            src={vyraWordmark}
            alt="VYRA Studio"
            className="hero__logo"
            width={180}
            height={48}
          />
        </a>

        <nav
          id={navId}
          ref={navRef}
          className={joinClasses('hero__nav', menuOpen ? 'hero__nav--open' : undefined)}
          aria-label="Головна навігація"
        >
          <ul className="hero__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hero__nav-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="hero__menu-toggle"
          aria-expanded={menuOpen}
          aria-controls={navId}
          onClick={() => {
            setMenuOpen((open) => !open)
          }}
        >
          <MenuIcon open={menuOpen} />
          <span className="hero__menu-label">
            {menuOpen ? 'Закрити меню' : 'Відкрити меню'}
          </span>
        </button>
      </header>

      <main>
        <section
          id="hero"
          className={joinClasses('hero', className)}
          aria-labelledby={titleId}
        >
          <div className="hero__stage">
            <div className="hero__copy">
              <p className="hero__eyebrow">ВЕБРОЗРОБКА ДЛЯ СУЧАСНОГО БІЗНЕСУ</p>
              <h1 id={titleId} className="hero__title">
                Цифрові рішення, що рухають бізнес вперед.
              </h1>
              <p className="hero__lead">
                Створюємо сучасні вебсайти, які формують довіру, підсилюють бренд і
                допомагають бізнесу зростати.
              </p>
              <div className="hero__cta">
                <a href="#contacts" className="btn btn--primary hero__cta-primary">
                  Обговорити проєкт
                </a>
                <a href="#portfolio" className="btn btn--secondary hero__cta-secondary">
                  Переглянути роботи
                </a>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="hero__glow" />
              <div className="hero__panel hero__panel--back" />
              <div className="hero__panel hero__panel--main">
                <div className="hero__chrome">
                  <span className="hero__dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="hero__chrome-line" />
                </div>
                <div className="hero__lines">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero__bars">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="hero__panel hero__panel--float">
                <span className="hero__float-kicker" />
                <svg className="hero__spark" viewBox="0 0 160 72">
                  <polyline points="2,58 28,44 50,50 76,26 102,34 128,12 158,20" />
                </svg>
              </div>
              <div className="hero__panel hero__panel--chip">
                <span />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
