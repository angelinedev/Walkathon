import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FaPeopleGroup, FaPersonRunning } from 'react-icons/fa6';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import SponsorsPage from './pages/SponsorsPage';
import FaqPage from './pages/FaqPage';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/register', label: 'Register' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/faq', label: 'FAQ' }
];

const eventLogos = [
  { src: '/logos/maatrathai-nokki-tamil.jpg', alt: 'Maatrathai Nokki Tamil Logo' },
  { src: '/logos/maatrathai-nokki-english.jpg', alt: 'Maatrathai Nokki Charitable Trust Logo' },
  { src: '/logos/maatrathai-trust-wordmark.png', alt: 'Maatrathai Nokki Charitable Trust Wordmark' }
];

function LogoImage({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.display = 'none';
      }}
    />
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="top-nav-wrap">
        <nav className="top-nav" aria-label="Main navigation">
          <NavLink to="/" className="brand" aria-label="OMR Marathon Home" onClick={closeMenu}>
            <FaPersonRunning aria-hidden="true" />
            <span>OMR Marathon 2026</span>
          </NavLink>

          <div className="nav-logo-strip" aria-label="Organizer logos">
            {eventLogos.map((logo) => (
              <LogoImage key={logo.src} src={logo.src} alt={logo.alt} className="nav-logo" />
            ))}
          </div>

          <button
            className="menu-btn"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="nav-links desktop-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      {menuOpen ? <button className="menu-overlay" aria-label="Close menu" onClick={closeMenu} /> : null}

      <aside className={menuOpen ? 'mobile-drawer open' : 'mobile-drawer'} aria-hidden={!menuOpen}>
        <div className="mobile-drawer-head">
          <strong>Menu</strong>
          <button className="menu-close" type="button" onClick={closeMenu} aria-label="Close menu">
            x
          </button>
        </div>
        <div className="mobile-drawer-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </aside>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div>
          <h3>OMR Marathon 2026</h3>
          <p>Run Against Drugs. Run for Life.</p>
        </div>
        <div>
          <h3>Powered by</h3>
          <p>Maatrathai Nokki Charitable Trust</p>
        </div>
        <div className="footer-tag">
          <FaPeopleGroup aria-hidden="true" />
          <span>Together for a Drug-Free Future</span>
        </div>
        <div className="footer-logo-strip" aria-label="Organizer logos in footer">
          {eventLogos.map((logo) => (
            <LogoImage key={`footer-${logo.src}`} src={logo.src} alt={logo.alt} className="footer-logo" />
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;

