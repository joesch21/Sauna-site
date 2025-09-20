import { useEffect } from 'react'
import ContactForm from '../components/ContactForm'
import { localBusinessSchema, organizationSchema, seo } from '../lib/seo'

const DETAILS = [
  {
    label: 'Studio',
    value: '42 Harbourline Way, Melbourne VIC 3000',
  },
  {
    label: 'Email',
    value: 'studio@saunaatelier.com',
    href: 'mailto:studio@saunaatelier.com',
  },
  {
    label: 'Phone',
    value: '(03) 8650 1120',
    href: 'tel:+61386501120',
  },
  {
    label: 'Hours',
    value: 'Mon–Fri 8:00am – 5:30pm',
  },
]

export default function Contact() {
  useEffect(() => {
    seo({
      title: 'Contact | Corindi Saunas',
      description:
        'Book a consultation with Corindi Saunas. Visit our Melbourne studio or request a quote for custom sauna builds.',
      canonical: 'https://www.saunaatelier.com.au/contact',
      jsonLd: [organizationSchema(), localBusinessSchema()],
    })
  }, [])

  return (
    <section id="contact" className="page-section contact-page">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Contact</p>
            <h1>Let’s plan your sauna project</h1>
            <p className="muted">
              Tell us about your site, preferred sauna style, and any timeline
              requirements. We respond within two business days.
            </p>
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <h2>Visit or call</h2>
              <ul>
                {DETAILS.map((detail) => (
                  <li key={detail.label}>
                    <span>{detail.label}</span>
                    {detail.href ? (
                      <a href={detail.href}>{detail.value}</a>
                    ) : (
                      <p>{detail.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="contact-map">
              <div className="map-shell" aria-hidden="true">
                <p>Map preview</p>
              </div>
              <small>
                Showroom visits are by appointment. Parking available on
                Harbourline Way and nearby side streets.
              </small>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <h2>Send an enquiry</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
