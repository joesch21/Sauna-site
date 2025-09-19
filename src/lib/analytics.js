const MANAGED_ATTRIBUTE = 'data-managed-analytics'
let initialized = false

export function initAnalytics() {
  if (initialized || typeof document === 'undefined') return

  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

  if (plausibleDomain) {
    const script = document.createElement('script')
    script.setAttribute(MANAGED_ATTRIBUTE, 'true')
    script.defer = true
    script.src = 'https://plausible.io/js/script.js'
    script.setAttribute('data-domain', plausibleDomain)
    document.head.appendChild(script)
    initialized = true
    return
  }

  if (gaMeasurementId) {
    const loader = document.createElement('script')
    loader.setAttribute(MANAGED_ATTRIBUTE, 'true')
    loader.async = true
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
    document.head.appendChild(loader)

    const inline = document.createElement('script')
    inline.setAttribute(MANAGED_ATTRIBUTE, 'true')
    inline.innerHTML = `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', '${gaMeasurementId}', { anonymize_ip: true });`
    document.head.appendChild(inline)
    initialized = true
  }
}
