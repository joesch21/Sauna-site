import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CTABanner from '../components/CTABanner'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'
import { localBusinessSchema, organizationSchema, seo } from '../lib/seo'

const services = [
  {
    title: 'Design consultancy',
    description:
      'Site visits, technical drawings, and heat load calculations tailored to your space.',
    href: '/services#design',
  },
  {
    title: 'Delivery & installation',
    description:
      'Project management, logistics, and assembly handled by licensed specialists.',
    href: '/services#install',
  },
  {
    title: 'Care & maintenance',
    description:
      'Seasonal servicing, heater tuning, and timber protection for long-life saunas.',
    href: '/services#maintenance',
  },
]

const featuredProducts = products.slice(0, 4)

export default function Home() {
  useEffect(() => {
    seo({
      title: 'Corindi Saunas | Bespoke Sauna Design & Installation',
      description:
        'Corindi Saunas designs, builds, and cares for custom indoor and outdoor saunas across Australia with premium materials.',
      canonical: 'https://www.saunaatelier.com.au/',
      jsonLd: [organizationSchema(), localBusinessSchema()],
    })
  }, [])

  return (
    <>
      <Hero />
      <section className="page-section home-products">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>Saunas and accessories in high demand</h2>
            </div>
            <Link className="btn btn--ghost" to="/products">
              Browse all products
            </Link>
          </div>
          <ProductGrid items={featuredProducts} />
        </div>
      </section>
      <section className="page-section home-services">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Services</p>
              <h2>Support at every project milestone</h2>
              <p className="muted">
                From concept sketches to annual servicing, our team of designers,
                engineers, and sauna specialists keep your project on track.
              </p>
            </div>
            <Link className="btn btn--ghost" to="/services">
              See all services
            </Link>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link className="service-link" to={service.href}>
                  Learn more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
