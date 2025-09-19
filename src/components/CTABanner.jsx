import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner__layout">
        <div>
          <p className="eyebrow">Book a site measure</p>
          <h2>Ready to map out your sauna project?</h2>
          <p>
            Share your plans and our team will prepare a tailored installation
            roadmap within two business days.
          </p>
        </div>
        <div className="cta-banner__actions">
          <Link className="btn" to="/contact">
            Start the conversation
          </Link>
          <Link className="btn btn--ghost" to="/services">
            View services
          </Link>
        </div>
      </div>
    </section>
  )
}
