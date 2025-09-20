import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container header-row">
        <NavLink to="/" end className="brand">
          Corindi Saunas
        </NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="nav-toggle-icon" aria-hidden="true" />
        </button>
        <nav
          id="primary-navigation"
          className={clsx('site-nav', menuOpen && 'is-open')}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                clsx('nav-link', isActive && 'is-active')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
