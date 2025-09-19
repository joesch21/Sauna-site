import products from '../data/products.json'
import ProductCard from './ProductCard'

export default function ProductGrid({ items = products, limit, emptyMessage }) {
  const list = Array.isArray(items) ? items : products
  const resolved = typeof limit === 'number' ? list.slice(0, limit) : list

  if (!resolved.length) {
    return <p className="muted">{emptyMessage ?? 'No products available just yet.'}</p>
  }

  return (
    <div className="product-grid">
      {resolved.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  )
}
