import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import './ContactForm.css'

type FieldName = 'name' | 'email' | 'projectType' | 'message'
type FormValues = Record<FieldName, string> & { website: string }
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
type FormErrors = Partial<Record<FieldName, string>>
type SubmissionError = 'duplicate' | 'rateLimited' | 'unavailable' | 'honeypot' | null

const SUBMIT_CONTACT_URL =
  'https://bmvslvtjcvlpjdxhvfwn.supabase.co/functions/v1/submit-contact'

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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u

function characterCount(value: string): number {
  return Array.from(value).length
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  const nameLength = characterCount(name)
  const emailLength = characterCount(email)
  const messageLength = characterCount(message)

  if (nameLength < 2 || nameLength > 80) {
    errors.name = 'Введіть ім’я від 2 до 80 символів.'
  }

  if (emailLength > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Введіть коректну адресу електронної пошти (до 254 символів).'
  }

  if (messageLength < 20 || messageLength > 2000) {
    errors.message = 'Повідомлення має містити від 20 до 2000 символів.'
  }

  return errors
}

export function ContactForm(): ReactNode {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submissionError, setSubmissionError] = useState<SubmissionError>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const projectTypeRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const updateField = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setStatus('idle')
    setSubmissionError(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    if (values.website.trim()) {
      setSubmissionError('honeypot')
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
      setSubmissionError(null)
      return
    }

    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    if (!publishableKey) {
      setSubmissionError('unavailable')
      setStatus('error')
      return
    }

    setSubmissionError(null)
    setStatus('submitting')

    try {
      const response = await fetch(SUBMIT_CONTACT_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${publishableKey}`,
          apikey: publishableKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          project_type: values.projectType || null,
          message: values.message.trim(),
          website: values.website,
        }),
      })

      if (response.status === 201) {
        setValues(INITIAL_VALUES)
        setErrors({})
        setStatus('success')
        return
      }

      if (response.status === 409) {
        setSubmissionError('duplicate')
      } else if (response.status === 429) {
        setSubmissionError('rateLimited')
      } else {
        setSubmissionError('unavailable')
      }
      setStatus('error')
    } catch {
      setSubmissionError('unavailable')
      setStatus('error')
    }
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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
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
            disabled={status === 'submitting'}
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
          disabled={status === 'submitting'}
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
        {status === 'submitting' && 'Надсилаємо вашу заявку…'}
        {status === 'error' && submissionError === 'duplicate' &&
          'Таку заявку вже отримано. Якщо потрібна допомога, напишіть нам на vyrastudio2@gmail.com.'}
        {status === 'error' && submissionError === 'rateLimited' &&
          'Забагато заявок за короткий час. Спробуйте пізніше або напишіть нам на vyrastudio2@gmail.com.'}
        {status === 'error' && submissionError === 'unavailable' &&
          'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам на vyrastudio2@gmail.com.'}
        {status === 'error' && submissionError === 'honeypot' &&
          'Не вдалося обробити заявку.'}
      </p>
    </form>
  )
}
