import type { ReactNode } from 'react'
import './Portfolio.css'

const PROJECTS = [
  {
    number: '01',
    category: 'Business Website',
    title: 'Автосервіс нового покоління',
    description:
      'Концепт сучасного сайту автосервісу з акцентом на довіру, послуги та онлайн-запис.',
    technologies: ['React', 'TypeScript'],
    visual: (
      <div className="portfolio__mock portfolio__mock--auto" aria-hidden="true">
        <div className="portfolio__mock-nav">
          <span className="portfolio__mock-brand">GARAGE<span>.</span></span>
          <span className="portfolio__mock-menu"><i /><i /><i /></span>
        </div>
        <div className="portfolio__auto-layout">
          <div className="portfolio__auto-copy">
            <span className="portfolio__mock-overline">СЕРВІС · ДОВІРА · ЯКІСТЬ</span>
            <span className="portfolio__auto-title">Ваш автомобіль<br />у надійних руках</span>
            <span className="portfolio__mock-button">Записатися на сервіс <b>↗</b></span>
          </div>
          <svg className="portfolio__car" viewBox="0 0 280 128" fill="none">
            <path d="m35 83 12-29c3-7 8-11 16-13l38-9 26-25c4-4 9-6 15-6h47c10 0 18 4 24 12l28 37 20 8c7 3 11 9 11 17v15h-21M37 90H18V73c0-8 5-14 13-16l16-3" />
            <path d="m108 33-13 31h127l-24-32c-3-4-8-7-14-7h-54c-9 0-16 3-22 8ZM47 65h205" />
            <circle cx="76" cy="91" r="17" /><circle cx="221" cy="91" r="17" />
            <circle cx="76" cy="91" r="6" /><circle cx="221" cy="91" r="6" />
          </svg>
        </div>
        <div className="portfolio__auto-footer"><span>01 / 03</span><span /><span>Планове обслуговування</span></div>
      </div>
    ),
  },
  {
    number: '02',
    category: 'Creative Website',
    title: 'Простір для натхнення',
    description:
      'Мінімалістична презентація студії інтер’єрного дизайну з акцентом на візуальну естетику та портфоліо.',
    technologies: ['React', 'TypeScript'],
    visual: (
      <div className="portfolio__mock portfolio__mock--interior" aria-hidden="true">
        <div className="portfolio__mock-nav">
          <span className="portfolio__interior-brand">FORMA<span> / STUDIO</span></span>
          <span className="portfolio__interior-menu">ПРОЄКТИ　 ПРО НАС　 ↗</span>
        </div>
        <div className="portfolio__interior-layout">
          <div className="portfolio__interior-copy">
            <span className="portfolio__mock-overline">ІНТЕР’ЄРИ З ХАРАКТЕРОМ</span>
            <span className="portfolio__interior-title">Простір<br />для життя</span>
            <span className="portfolio__interior-link">Дивитися проєкти <b>↗</b></span>
          </div>
          <div className="portfolio__interior-art">
            <div className="portfolio__interior-arch"><span /></div>
            <div className="portfolio__interior-sun" />
            <div className="portfolio__interior-plinth" />
          </div>
        </div>
        <div className="portfolio__interior-caption"><span>ТИША У ФОРМІ</span><span>КИЇВ · 2025</span></div>
      </div>
    ),
  },
  {
    number: '03',
    category: 'Landing Page',
    title: 'Рухайся до більшого',
    description:
      'Динамічний концепт лендингу фітнес-студії для презентації тренувань та залучення нових клієнтів.',
    technologies: ['React', 'TypeScript'],
    visual: (
      <div className="portfolio__mock portfolio__mock--fitness" aria-hidden="true">
        <div className="portfolio__mock-nav">
          <span className="portfolio__fitness-brand">PACE<span> / CLUB</span></span>
          <span className="portfolio__fitness-menu">ТРЕНУВАННЯ　 ПРО НАС　 ↗</span>
        </div>
        <div className="portfolio__fitness-layout">
          <span className="portfolio__fitness-kicker">ЗНАЙДИ СВІЙ ТЕМП</span>
          <span className="portfolio__fitness-title">РУХАЙСЯ<br />ДАЛІ<span>.</span></span>
          <span className="portfolio__fitness-bottom"><i>СИЛА В РУСІ</i><b>→</b></span>
          <svg className="portfolio__fitness-mark" viewBox="0 0 160 160" fill="none">
            <circle cx="80" cy="80" r="65" />
            <path d="M42 85h76M52 70v30m-12-22v14m68-22v30m12-22v14" />
            <path d="M80 15v130" />
          </svg>
        </div>
        <div className="portfolio__fitness-index">TRAIN WITH INTENTION · MOVE WITH PURPOSE</div>
      </div>
    ),
  },
] satisfies Array<{
  number: string
  category: string
  title: string
  description: string
  technologies: string[]
  visual: ReactNode
}>

export function Portfolio(): ReactNode {
  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio__container">
        <header className="portfolio__header">
          <div>
            <p className="portfolio__eyebrow">Вибрані концепти</p>
            <h2 className="portfolio__title" id="portfolio-title">
              Проєкти, що демонструють можливості
            </h2>
          </div>
          <p className="portfolio__intro">
            Кожен проєкт — це поєднання продуманого дизайну, технологій та
            розуміння цілей бізнесу.
          </p>
        </header>

        <div className="portfolio__grid">
          {PROJECTS.map((project) => (
            <article className="portfolio__card" key={project.number}>
              <div className="portfolio__preview">
                {project.visual}
                <span className="portfolio__concept">Концепт</span>
              </div>
              <div className="portfolio__card-body">
                <div className="portfolio__meta">
                  <span className="portfolio__category">{project.category}</span>
                  <span className="portfolio__number">{project.number}</span>
                </div>
                <h3 className="portfolio__project-title">{project.title}</h3>
                <p className="portfolio__description">{project.description}</p>
                <ul className="portfolio__tech" aria-label="Технології">
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
