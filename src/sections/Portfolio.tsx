import type { ReactNode } from 'react'
import './Portfolio.css'

type ProjectItem = {
  number: string
  category: string
  title: string
  description: string
  technologies: string[]
  visual: ReactNode
  url?: string
  badge?: string
}

const PROJECTS: ProjectItem[] = [
  {
    number: '01',
    category: 'Business Website',
    title: 'Auto-Ritm — автосервіс нового покоління',
    description:
      'Сучасний сайт автосервісу з акцентом на довіру, прозорий кошторис, послуги та онлайн-запис.',
    technologies: ['React', 'TypeScript'],
    url: 'https://vyra-studio-22.github.io/Portfolio_Auto-Ritm/',
    badge: 'Реальний проєкт',
    visual: (
      <div className="portfolio__mock portfolio__mock--image">
        <img
          src="/images/portfolio/auto-ritm-preview.png"
          alt="Головна сторінка сайту автосервісу Auto-Ritm з онлайн-записом та переліком послуг"
          className="portfolio__image"
          loading="lazy"
          width={1024}
          height={680}
        />
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
    badge: 'Концепт',
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
    badge: 'Концепт',
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
]

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
          {PROJECTS.map((project) => {
            const cardInner = (
              <>
                <div className="portfolio__preview">
                  {project.visual}
                  <span
                    className={`portfolio__concept${project.url ? ' portfolio__concept--live' : ''}`}
                  >
                    {project.badge ?? 'Концепт'}
                  </span>
                </div>
                <div className="portfolio__card-body">
                  <div className="portfolio__meta">
                    <span className="portfolio__category">{project.category}</span>
                    <span className="portfolio__number">{project.number}</span>
                  </div>
                  <h3 className="portfolio__project-title">
                    {project.title}
                    {project.url ? (
                      <span className="portfolio__external-arrow" aria-hidden="true">
                        {' '}↗
                      </span>
                    ) : null}
                  </h3>
                  <p className="portfolio__description">{project.description}</p>
                  <ul className="portfolio__tech" aria-label="Технології">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                </div>
              </>
            )

            if (project.url) {
              return (
                <a
                  key={project.number}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio__card portfolio__card--link"
                  aria-label={`${project.title} — відкрити сайт у новій вкладці`}
                >
                  {cardInner}
                </a>
              )
            }

            return (
              <article className="portfolio__card" key={project.number}>
                {cardInner}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
