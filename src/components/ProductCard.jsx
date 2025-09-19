import { Link } from 'react-router-dom'
import { formatCurrency, formatLabel } from '../lib/format'
import { createSrcSet } from '../lib/images'

export default function ProductCard({ product }) {
  const { slug, title, subtitle, priceFrom, thumbnail, categories = [] } =
    product

  return (
    <article className="product-card">
      <Link to={`/products/${slug}`} className="product-card__link">
        <div className="product-card__media">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              decoding="async"
              srcSet={createSrcSet(thumbnail)}
              sizes="(min-width: 1024px) 22vw, (min-width: 600px) 45vw, 90vw"
            />
          ) : (
            <div className="product-card__placeholder" aria-hidden="true">
              <span>{title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="product-card__content">
          {categories.length ? (
            <ul className="product-card__tags">
              {categories.map((category) => (
                <li key={category}>{formatLabel(category)}</li>
              ))}
            </ul>
          ) : null}
          <h3>{title}</h3>
          {subtitle && <p className="product-card__subtitle">{subtitle}</p>}
          {priceFrom != null && (
            <p className="product-card__price">From {formatCurrency(priceFrom)}</p>
          )}
          <span className="product-card__cta" aria-hidden="true">
            View details
          </span>
        </div>
      </Link>
    </article>
  )
}
