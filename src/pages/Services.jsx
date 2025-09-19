import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { organizationSchema, seo } from '../lib/seo'

const SERVICES = [
  {
    id: 'design',
    title: 'Design consultancy',
    blurb:
      'Site-responsive concepts, compliance advice, and performance modelling for new sauna rooms or retrofits.',
    highlights: [
      'On-site assessment with moisture and ventilation mapping',
      '3D layouts with heater sizing and bench ergonomics',
      'Permit-ready documentation and electrical schedules',
    ],
  },
  {
    id: 'install',
    title: 'Delivery & installation',
    blurb:
      'Cradle-to-completion project management for prefab and custom builds, including logistics and commissioning.',
    highlights: [
      'Crane, freight, and site access coordination',
      'Qualified installers for plumbing, electrical, and sealing',
      'Commissioning, testing, and client handover session',
    ],
  },
  {
    id: 'relocation',
    title: 'Relocation',
    blurb:
      'Careful disassembly, transport, and reassembly of existing sauna rooms for residential or commercial moves.',
    highlights: [
      'Labelled deconstruction and protection of components',
      'Transport, cranage, and storage arranged Australia-wide',
      'Reassembly with updated seals, fixings, and compliance check',
    ],
  },
  {
    id: 'maintenance',
    title: 'Repairs & maintenance',
    blurb:
      'Scheduled servicing and rapid response repairs to keep heat performance, safety systems, and finishes on point.',
    highlights: [
      'Heater calibration, control upgrades, and stone replacement',
      'Deep clean, sanding, and re-oiling of timber surfaces',
      'Water ingress diagnostics with priority call-out support',
    ],
  },
]

export default function Services() {
  useEffect(() => {
    seo({
      title: 'Services | Sauna Atelier',
      description:
        'Design consultancy, delivery and installation, relocation, and maintenance services for bespoke sauna projects.',
      canonical: 'https://www.saunaatelier.com.au/services',
      jsonLd: [organizationSchema()],
    })
  }, [])

  return (
    <section className="page-section services-page">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Services</p>
            <h1>End-to-end sauna specialists</h1>
            <p className="muted">
              We combine design, construction, and aftercare so your sauna
              delivers reliable heat and longevity in Australian conditions.
            </p>
          </div>
          <Link className="btn btn--ghost" to="/contact">
            Request a quote
          </Link>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article key={service.id} id={service.id} className="service-section">
              <div className="service-section__header">
                <h2>{service.title}</h2>
                <p>{service.blurb}</p>
              </div>
              <ul>
                {service.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="service-section__cta">
                <Link className="btn" to="/contact">
                  Request a quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
