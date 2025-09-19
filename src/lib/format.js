export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return ''
  }

  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
    ...options,
  })

  return formatter.format(value)
}

export function formatLabel(value) {
  if (!value) return ''
  return value
    .toString()
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase())
}
