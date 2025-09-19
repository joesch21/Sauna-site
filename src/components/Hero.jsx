import { Link } from 'react-router-dom'
import { createSrcSet } from '../lib/images'

const HERO_IMAGE = '/images/hero/hero-sauna.svg'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">Sauna Atelier</p>
          <h1>Bespoke sauna spaces for restorative rituals</h1>
          <p className="hero__lead">
            We design, build, and maintain handcrafted sauna rooms that stand up
            to Australian weather while celebrating Nordic craft.
          </p>
          <div className="hero__actions">
            <Link className="btn" to="/products">
              Explore products
            </Link>
            <Link className="btn btn--ghost" to="/services">
              Our services
            </Link>
          </div>
          <dl className="hero__meta">
            <div>
              <dt>Installations delivered</dt>
              <dd>180+</dd>
            </div>
            <div>
              <dt>Average lead time</dt>
              <dd>6 weeks</dd>
            </div>
            <div>
              <dt>Warranty</dt>
              <dd>10 years structure</dd>
            </div>
          </dl>
        </div>
        <div className="hero__media">
          <div className="hero__media-card">
            <img
              src={HERO_IMAGE}
              alt="Warm cedar sauna with a floor-to-ceiling window"
              loading="eager"
              decoding="async"
              srcSet={createSrcSet(HERO_IMAGE)}
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
            <div className="hero__badge">
              <span>Design · Build · Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
