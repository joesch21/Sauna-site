export function createSrcSet(src, widths = [480, 960, 1440]) {
  if (!src) return undefined
  const extensionMatch = src.match(/\.([a-zA-Z0-9]+)$/)
  if (!extensionMatch) return undefined
  const extension = extensionMatch[0]
  const ext = extensionMatch[1]?.toLowerCase()
  if (ext === 'svg') return undefined
  const base = src.slice(0, -extension.length)
  return widths.map((width) => `${base}-${width}${extension} ${width}w`).join(', ')
}
