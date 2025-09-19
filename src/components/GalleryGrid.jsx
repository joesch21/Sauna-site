import galleryItems from '../data/gallery.json'
import { createSrcSet } from '../lib/images'

export default function GalleryGrid({ items = galleryItems }) {
  if (!items.length) {
    return <p className="muted">Gallery coming soon.</p>
  }

  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <figure key={item.src} className="gallery-card">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            width={item.width}
            height={item.height}
            srcSet={createSrcSet(item.src)}
            sizes="(min-width: 1024px) 30vw, (min-width: 600px) 45vw, 90vw"
          />
          <figcaption>
            <div className="gallery-card__meta">
              <strong>{item.title}</strong>
              <span>{item.location}</span>
            </div>
            <p>{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
