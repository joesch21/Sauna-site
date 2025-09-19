import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import { formatCurrency, formatLabel } from '../lib/format'
import { createSrcSet } from '../lib/images'
import { organizationSchema, productSchema, seo } from '../lib/seo'
import NotFound from './NotFound'

function humaniseKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase())
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = useMemo(
    () => products.find((item) => item.slug === slug),
    [slug],
  )

  if (!product) {
    return <NotFound />
  }

  useEffect(() => {
    if (!product) return
    const canonical = `https://www.saunaatelier.com.au/products/${product.slug}`
    seo({
      title: `${product.title} | Sauna Atelier`,
      description: product.description,
      canonical,
      jsonLd: [organizationSchema(), productSchema(product, canonical)].filter(Boolean),
    })
  }, [product])

  const {
    title,
    subtitle,
    description,
    features = [],
    gallery = [],
    priceFrom,
    capacity,
    timber,
    heaterOptions = [],
    dimensions = {},
    categories = [],
  } = product

  const specItems = [
    priceFrom != null
      ? { label: 'Starting from', value: formatCurrency(priceFrom) }
      : null,
    capacity ? { label: 'Capacity', value: capacity } : null,
    timber ? { label: 'Primary timber', value: timber } : null,
    heaterOptions.length
      ? { label: 'Heater options', value: heaterOptions.join(', ') }
      : null,
  ]
    .filter(Boolean)
    .concat(
      Object.entries(dimensions || {}).map(([key, value]) => ({
        label: humaniseKey(key),
        value,
      })),
    )

  return (
    <article className="product-detail page-section">
      <div className="container product-detail__layout">
        <div className="product-detail__gallery">
          {gallery.length ? (
            <div className="product-detail__gallery-grid">
              {gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${title} preview`}
                  loading="lazy"
                  decoding="async"
                  srcSet={createSrcSet(src)}
                  sizes="(min-width: 900px) 55vw, 90vw"
                />
              ))}
            </div>
          ) : (
            <div className="product-card__placeholder" aria-hidden="true">
              <span>{title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="product-detail__content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li aria-current="page">{title}</li>
            </ol>
          </nav>
          <p className="eyebrow">Product detail</p>
          <h1>{title}</h1>
          {subtitle && <p className="product-detail__subtitle">{subtitle}</p>}
          {categories.length ? (
            <ul className="tag-list">
              {categories.map((category) => (
                <li key={category}>{formatLabel(category)}</li>
              ))}
            </ul>
          ) : null}
          {description && (
            <p className="product-detail__description">{description}</p>
          )}

          {features.length ? (
            <div className="product-detail__features">
              <h2>Key features</h2>
              <ul>
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {specItems.length ? (
            <div className="product-detail__specs">
              <h2>Specifications</h2>
              <dl>
                {specItems.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="spec-row">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div className="product-detail__cta">
            <Link className="btn" to="/contact">
              Enquire about this product
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
