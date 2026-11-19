import type { ReactNode } from 'react'
import { ContactForm } from '../components/ContactForm'
import './Contacts.css'

const CONTACT_EMAIL = 'vyrastudio2@gmail.com'

export function Contacts(): ReactNode {
  return (
    <section className="contacts" id="contacts" aria-labelledby="contacts-title">
      <div className="contacts__container">
        <div className="contacts__layout">
          <div className="contacts__copy">
            <p className="contacts__eyebrow">Контакти</p>
            <h2 className="contacts__title" id="contacts-title">
              Давайте створимо сайт, що працює на ваші цілі
            </h2>
            <p className="contacts__intro">
              Розкажіть про задум — обговоримо, як перетворити його на зрозуміле
              цифрове рішення для вашого бізнесу.
            </p>

            <div className="contacts__details">
              <span className="contacts__detail-label">Електронна пошта</span>
              <a className="contacts__email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="contacts__panel" aria-labelledby="contacts-panel-title">
            <div className="contacts__panel-top">
              <span className="contacts__panel-index">01</span>
              <span className="contacts__panel-mark" aria-hidden="true">↗</span>
            </div>
            <div className="contacts__panel-copy contacts__panel-copy--form">
              <p className="contacts__panel-eyebrow">Перший крок</p>
              <h3 className="contacts__panel-title" id="contacts-panel-title">
                Розкажіть про ваш проєкт
              </h3>
              <ContactForm />
            </div>
            <span className="contacts__panel-rule" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
