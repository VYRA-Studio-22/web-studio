import type { ReactNode } from 'react'
import vyraWordmark from '../assets/vyra-wordmark.svg'
import './Footer.css'

const FOOTER_LINKS = [
  { href: '#hero', label: 'Головна' },
  { href: '#services', label: 'Послуги' },
  { href: '#portfolio', label: 'Портфоліо' },
  { href: '#process', label: 'Процес' },
  { href: '#contacts', label: 'Контакти' },
] as const

const CONTACT_EMAIL = 'vyrastudio2@gmail.com'
const CURRENT_YEAR = new Date().getFullYear()

export function Footer(): ReactNode {
  return (
    <footer className="site-footer">
      <div className="site-footer__container">
        <div className="site-footer__top">
          <a className="site-footer__brand" href="#hero" aria-label="VYRA Studio — на головну">
            <img src={vyraWordmark} alt="VYRA Studio" width={180} height={48} />
          </a>

          <nav className="site-footer__nav" aria-label="Навігація у підвалі сайту">
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">© {CURRENT_YEAR} VYRA Studio</p>
          <a className="site-footer__email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <a className="site-footer__to-top" href="#hero">
            На початок <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
