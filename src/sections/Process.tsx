import type { ReactNode } from 'react'
import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Знайомство та обговорення',
    description:
      'Знайомимося з вашим бізнесом, визначаємо цілі, потреби та очікування від майбутнього сайту.',
  },
  {
    number: '02',
    title: 'Дизайн та структура',
    description:
      'Продумуємо структуру сторінок, створюємо візуальний стиль і зручний користувацький досвід.',
  },
  {
    number: '03',
    title: 'Розробка та тестування',
    description:
      'Перетворюємо дизайн на швидкий, адаптивний сайт і перевіряємо його роботу на різних пристроях.',
  },
  {
    number: '04',
    title: 'Запуск та підтримка',
    description:
      'Публікуємо готовий сайт і допомагаємо з подальшим розвитком та вдосконаленням.',
  },
] as const

export function Process(): ReactNode {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="process__container">
        <header className="process__header">
          <div className="process__heading-group">
            <p className="process__eyebrow">Як усе відбувається</p>
            <h2 className="process__title" id="process-title">
              Від ідеї до готового сайту
            </h2>
          </div>
          <p className="process__intro">
            Прозорий процес роботи — від першого знайомства до запуску вашого
            проєкту.
          </p>
        </header>

        <ol className="process__steps">
          {STEPS.map((step) => (
            <li className="process__step" key={step.number}>
              <div className="process__marker" aria-hidden="true">
                <span>{step.number}</span>
              </div>
              <span className="process__turn" aria-hidden="true" />
              <div className="process__step-copy">
                <p className="process__step-label">Етап {step.number}</p>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__description">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
