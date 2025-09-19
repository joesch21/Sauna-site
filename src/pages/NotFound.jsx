import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { organizationSchema, seo } from '../lib/seo'

export default function NotFound() {
  useEffect(() => {
    seo({
      title: 'Page Not Found | Sauna Atelier',
      description: 'The page you requested could not be found on Sauna Atelier.',
      jsonLd: [organizationSchema()],
    })
  }, [])

  return (
    <section className="page-section">
      <div className="container">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="btn" to="/">
          Return home
        </Link>
      </div>
    </section>
  )
}
