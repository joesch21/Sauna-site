const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <div>
          <p className="footer-brand">Sauna Atelier</p>
          <address>
            42 Harbourline Way, Melbourne VIC 3000<br />
            hello@saunaatelier.com · (03) 0000 0000
          </address>
        </div>
        <div className="footer-meta">
          <p>ABN 00 000 000 000</p>
          <p>© {CURRENT_YEAR} Sauna Atelier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
