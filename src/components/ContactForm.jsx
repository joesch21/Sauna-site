import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const mailtoFallback = 'mailto:studio@saunaatelier.com?subject=Sauna%20enquiry'

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setFormData(initialState)
      setStatus('success')
    } catch (error) {
      console.error('Contact form error', error)
      setStatus('error')
      setErrorMessage(
        'We were unable to send your message. You can email us directly at studio@saunaatelier.com.',
      )
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={formData.name}
            onChange={updateField}
            disabled={status === 'submitting'}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={updateField}
            disabled={status === 'submitting'}
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={updateField}
            disabled={status === 'submitting'}
          />
        </label>
      </div>
      <label>
        <span>Project details</span>
        <textarea
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={updateField}
          disabled={status === 'submitting'}
          placeholder="Tell us about your desired sauna experience, timeline, and location."
        />
      </label>
      <div className="contact-form__actions">
        <button type="submit" className="btn" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
        </button>
        <a className="btn btn--ghost" href={mailtoFallback}>
          Email instead
        </a>
      </div>
      <div className="form-feedback" aria-live="polite" role="status">
        {status === 'success' ? (
          <p className="success">Thanks for reaching out — we will be in touch shortly.</p>
        ) : null}
        {status === 'error' ? <p className="error">{errorMessage}</p> : null}
      </div>
    </form>
  )
}
