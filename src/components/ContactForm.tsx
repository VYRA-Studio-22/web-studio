import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import './ContactForm.css'

type FieldName = 'name' | 'email' | 'projectType' | 'message'
type FormValues = Record<FieldName, string> & { website: string }
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
type FormErrors = Partial<Record<FieldName, string>>

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  projectType: '',
  message: '',
  website: '',
}

const FIELD_IDS: Record<FieldName, string> = {
  name: 'contact-name',
  email: 'contact-email',
  projectType: 'contact-project-type',
  message: 'contact-message',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Введіть ім’я від 2 до 80 символів.'
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Введіть коректну адресу електронної пошти (до 254 символів).'
  }

  if (message.length < 20 || message.length > 2000) {
    errors.message = 'Повідомлення має містити від 20 до 2000 символів.'
  }

  return errors
}

export function ContactForm(): ReactNode {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const projectTypeRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const updateField = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus('idle')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (values.website.trim()) {
      setStatus('error')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalidField = (Object.keys(FIELD_IDS) as FieldName[]).find(
      (field) => nextErrors[field],
    )

    if (firstInvalidField) {
      const refs = {
        name: nameRef,
        email: emailRef,
        projectType: projectTypeRef,
        message: messageRef,
      }
      refs[firstInvalidField].current?.focus()
      setStatus('idle')
      return
    }

    // The backend is not connected yet, so a valid submission must not appear successful.
    setStatus('error')
  }

  const describedBy = (field: FieldName) =>
    errors[field] ? `${FIELD_IDS[field]}-error` : undefined

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor={FIELD_IDS.name}>Ім’я <span aria-hidden="true">*</span></label>
          <input
            ref={nameRef}
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            aria-required="true"
            required
          />
          {errors.name && <p className="contact-form__error" id={`${FIELD_IDS.name}-error`}>{errors.name}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor={FIELD_IDS.email}>Email <span aria-hidden="true">*</span></label>
          <input
            ref={emailRef}
            id={FIELD_IDS.email}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            aria-required="true"
            required
          />
          {errors.email && <p className="contact-form__error" id={`${FIELD_IDS.email}-error`}>{errors.email}</p>}
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor={FIELD_IDS.projectType}>Тип проєкту</label>
          <select
            ref={projectTypeRef}
            id={FIELD_IDS.projectType}
            name="projectType"
            value={values.projectType}
            onChange={(event) => updateField('projectType', event.target.value)}
          >
            <option value="">Оберіть тип проєкту</option>
            <option value="landing">Лендінг</option>
            <option value="business-website">Корпоративний сайт</option>
            <option value="redesign">Редизайн</option>
            <option value="other">Інше</option>
          </select>
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor={FIELD_IDS.message}>Коротко про ваш проєкт <span aria-hidden="true">*</span></label>
          <textarea
            ref={messageRef}
            id={FIELD_IDS.message}
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            aria-required="true"
            required
          />
          {errors.message && <p className="contact-form__error" id={`${FIELD_IDS.message}-error`}>{errors.message}</p>}
        </div>
      </div>

      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Залиште це поле порожнім</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      <div className="contact-form__actions">
        <button className="contact-form__submit" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Надсилаємо…' : 'Надіслати заявку'}
          <span aria-hidden="true">↗</span>
        </button>
        <p className="contact-form__required-note">Поля з позначкою * обов’язкові</p>
      </div>

      <p className="contact-form__status" role="status" aria-live="polite">
        {status === 'success' && 'Дякуємо! Вашу заявку надіслано.'}
        {status === 'error' && (values.website.trim()
          ? 'Не вдалося обробити заявку.'
          : 'Форма поки не підключена. Напишіть нам на vyrastudio2@gmail.com.')}
      </p>
    </form>
  )
}
