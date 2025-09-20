import { useEffect } from 'react'
import GalleryGrid from '../components/GalleryGrid'
import galleryItems from '../data/gallery.json'
import { organizationSchema, seo } from '../lib/seo'

export default function Gallery() {
  useEffect(() => {
    seo({
      title: 'Gallery | Corindi Saunas',
      description:
        'Browse Corindi Saunas installations including outdoor barrel saunas, infrared suites, and custom wellness pavilions.',
      canonical: 'https://www.saunaatelier.com.au/gallery',
      jsonLd: [organizationSchema()],
    })
  }, [])

  return (
    <section className="page-section gallery-page">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Gallery</p>
            <h1>Immersive sauna environments</h1>
            <p className="muted">
              Recent installations across homes, boutique hotels, and wellness
              retreats. Every project pairs climate-ready materials with refined
              detailing.
            </p>
          </div>
        </div>
        <GalleryGrid items={galleryItems} />
      </div>
    </section>
  )
}
