import { useEffect, useMemo, useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'
import { formatLabel } from '../lib/format'
import { organizationSchema, seo } from '../lib/seo'

const CATEGORY_FILTERS = [
  { value: 'all', label: 'All products' },
  { value: 'saunas', label: 'Saunas' },
  { value: 'heaters', label: 'Heaters' },
  { value: 'timbers', label: 'Timbers' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Name A–Z' },
]

function applySort(items, sort) {
  const list = [...items]
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => (a.priceFrom ?? Infinity) - (b.priceFrom ?? Infinity))
    case 'price-desc':
      return list.sort((a, b) => (b.priceFrom ?? -Infinity) - (a.priceFrom ?? -Infinity))
    case 'title-asc':
      return list.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return list
  }
}

const categoryCounts = products.reduce(
  (acc, product) => {
    acc.all += 1
    ;(product.categories || []).forEach((category) => {
      acc[category] = (acc[category] || 0) + 1
    })
    return acc
  },
  { all: 0 },
)

export default function Products() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  useEffect(() => {
    seo({
      title: 'Products | Sauna Atelier',
      description:
        'Browse indoor and outdoor saunas, heaters, and timber finishing packs tailored for Australian conditions.',
      canonical: 'https://www.saunaatelier.com.au/products',
      jsonLd: [organizationSchema()],
    })
  }, [])

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products

    if (category !== 'all') {
      list = list.filter((item) => item.categories?.includes(category))
    }

    if (q) {
      list = list.filter((item) => {
        const haystack = [
          item.title,
          item.subtitle,
          item.description,
          ...(item.tags || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
    }

    return applySort(list, sort)
  }, [category, query, sort])

  const summaryParts = []
  if (category !== 'all') {
    summaryParts.push(`category ${formatLabel(category)}`)
  }
  if (query) {
    summaryParts.push(`search “${query}”`)
  }
  if (sort !== 'featured') {
    const sortLabel = SORT_OPTIONS.find((option) => option.value === sort)?.label
    if (sortLabel) summaryParts.push(`sorted by ${sortLabel}`)
  }

  const summary = summaryParts.length
    ? `Filtered by ${summaryParts.join(', ')}`
    : 'Showing the full collection.'

  const hasActiveFilters = category !== 'all' || query || sort !== 'featured'

  const clearFilters = () => {
    setQuery('')
    setCategory('all')
    setSort('featured')
  }

  return (
    <section className="page-section products-page">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Product range</p>
            <h1>Saunas, heaters, and finishing packs</h1>
            <p className="muted">
              Refine by category or search by keyword to surface the right kit for
              your project.
            </p>
          </div>
        </div>

        <div className="products-controls" role="search">
          <div className="products-search">
            <label className="sr-only" htmlFor="product-search">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              placeholder="Search saunas, heaters, timbers…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="products-sort">
            <label htmlFor="product-sort">Sort by</label>
            <select
              id="product-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-filters" role="group" aria-label="Filter by category">
          {CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={
                filter.value === category
                  ? 'filter-pill is-active'
                  : 'filter-pill'
              }
              aria-pressed={filter.value === category}
              onClick={() => setCategory(filter.value)}
            >
              <span>{filter.label}</span>
              <span className="filter-pill__count">
                {categoryCounts[filter.value] || 0}
              </span>
            </button>
          ))}
          {hasActiveFilters ? (
            <button
              type="button"
              className="filter-pill filter-pill--clear"
              onClick={clearFilters}
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="products-summary">
          <p>
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product.' : 'products.'}
          </p>
          <p className="muted">{summary}</p>
        </div>

        <ProductGrid
          items={filteredProducts}
          emptyMessage="No products match your filters. Try adjusting the category or search keywords."
        />
      </div>
    </section>
  )
}
