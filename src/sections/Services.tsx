import type { ReactNode } from 'react'
import './Services.css'

const SERVICES = [
  {
    number: '01',
    title: 'Лендінги',
    description:
      'Односторінкові сайти, які презентують продукт або послугу, привертають увагу та допомагають отримувати заявки.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="7.5" y="9.5" width="33" height="29" rx="4" />
        <path d="M8 17h32M14 13.5h.01M18 13.5h.01M15 24h19M15 29h12M15 34h16" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Корпоративні сайти',
    description:
      'Багатосторінкові сайти для компаній, які формують довіру, презентують послуги та зміцнюють присутність бренду онлайн.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M9 39V13l15-6 15 6v26M6 39h36M17 17h4M27 17h4M17 23h4M27 23h4M20 39V30h8v9" />
        <path d="M7 13h34" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Редизайн сайтів',
    description:
      'Оновлення застарілих сайтів: сучасний дизайн, зручна структура, адаптивність і кращий користувацький досвід.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M38.5 22A15 15 0 0 0 12 13l-3 3M9 9v7h7M9.5 26A15 15 0 0 0 36 35l3-3m0 7v-7h-7" />
        <path d="m19 29 2.5-6.5L29 20l-2.5 6.5L19 29Z" />
      </svg>
    ),
  },
] satisfies Array<{
  number: string
  title: string
  description: string
  icon: ReactNode
}>

export function Services(): ReactNode {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services__container">
        <header className="services__header">
          <div className="services__heading-group">
            <p className="services__eyebrow">Що ми створюємо</p>
            <h2 className="services__title" id="services-title">
              Послуги, що допомагають бізнесу зростати
            </h2>
          </div>
          <p className="services__intro">
            Від першої ідеї до готового цифрового продукту — створюємо рішення,
            які працюють на результат.
          </p>
        </header>

        <div className="services__grid">
          {SERVICES.map((service) => (
            <article className="services__card" key={service.number}>
              <div className="services__card-top">
                <span className="services__icon">{service.icon}</span>
                <span className="services__number">{service.number}</span>
              </div>
              <div className="services__card-copy">
                <h3 className="services__card-title">{service.title}</h3>
                <p className="services__description">{service.description}</p>
              </div>
              <span className="services__card-rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
