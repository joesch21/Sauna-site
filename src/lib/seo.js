const MANAGED_ATTRIBUTE = 'data-managed-seo'

function ensureMeta(name, content, attribute = 'name') {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${name}"][${MANAGED_ATTRIBUTE}]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    element.setAttribute(MANAGED_ATTRIBUTE, 'true')
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function ensureLink(rel, href) {
  if (!href) return
  let link = document.head.querySelector(`link[rel="${rel}"][${MANAGED_ATTRIBUTE}]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    link.setAttribute(MANAGED_ATTRIBUTE, 'true')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function removeManagedJsonLd() {
  document
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTRIBUTE}]`)
    .forEach((node) => node.remove())
}

function injectJsonLd(data = []) {
  removeManagedJsonLd()
  data
    .filter(Boolean)
    .forEach((entry) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(MANAGED_ATTRIBUTE, 'true')
      script.textContent = JSON.stringify(entry)
      document.head.appendChild(script)
    })
}

export function seo({ title, description, canonical, jsonLd = [], openGraph = {}, twitter = {} }) {
  if (typeof document === 'undefined') return
  if (title) {
    document.title = title
  }

  const resolvedDescription = description ?? ''
  const resolvedCanonical = canonical ?? window.location.href
  const siteName = 'Corindi Saunas'

  ensureMeta('description', resolvedDescription)
  ensureMeta('og:title', openGraph.title ?? title ?? siteName, 'property')
  ensureMeta('og:description', openGraph.description ?? resolvedDescription, 'property')
  ensureMeta('og:type', openGraph.type ?? 'website', 'property')
  ensureMeta('og:url', resolvedCanonical, 'property')
  ensureMeta('og:site_name', siteName, 'property')
  ensureMeta('twitter:card', twitter.card ?? 'summary_large_image')
  ensureMeta('twitter:title', twitter.title ?? title ?? siteName)
  ensureMeta('twitter:description', twitter.description ?? resolvedDescription)

  ensureLink('canonical', resolvedCanonical)

  injectJsonLd(jsonLd)
}

const BUSINESS_NAME = 'Corindi Saunas'
const BUSINESS_URL = 'https://www.saunaatelier.com.au'
const BUSINESS_TELEPHONE = '+61 3 8650 1120'
const BUSINESS_EMAIL = 'studio@saunaatelier.com'
const BUSINESS_IMAGE = `${BUSINESS_URL}/images/hero/hero-sauna.svg`
const BUSINESS_LOGO = `${BUSINESS_URL}/images/brand/sauna-atelier-logo.svg`
const ADDRESS = {
  streetAddress: '42 Harbourline Way',
  addressLocality: 'Melbourne',
  addressRegion: 'VIC',
  postalCode: '3000',
  addressCountry: 'AU',
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    email: BUSINESS_EMAIL,
    logo: BUSINESS_LOGO,
    image: BUSINESS_IMAGE,
    sameAs: [],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_URL}#localbusiness`,
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    telephone: BUSINESS_TELEPHONE,
    email: BUSINESS_EMAIL,
    image: BUSINESS_IMAGE,
    address: {
      '@type': 'PostalAddress',
      ...ADDRESS,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8183,
      longitude: 144.9594,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '08:00',
        closes: '17:30',
      },
    ],
    priceRange: '$$',
  }
}

export function productSchema(product, canonicalUrl) {
  if (!product) return null
  const images = (product.gallery || [])
    .filter(Boolean)
    .map((src) => `${BUSINESS_URL}${src}`)
  if (!images.length && product.thumbnail) {
    images.push(`${BUSINESS_URL}${product.thumbnail}`)
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.slug,
    url: canonicalUrl,
    image: images.length ? images : undefined,
    brand: {
      '@type': 'Brand',
      name: BUSINESS_NAME,
    },
    offers: product.priceFrom
      ? {
          '@type': 'Offer',
          priceCurrency: 'AUD',
          price: product.priceFrom,
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
        }
      : undefined,
    additionalProperty: (product.features || []).map((feature) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature,
    })),
  }
}
