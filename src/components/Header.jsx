import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header({ scrollTo }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isHome = location.pathname === '/'

  return (
    <header>
      <nav>
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          MyPortfolio
        </Link>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {isHome ? (
            <>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home') }}>ホーム</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about') }}>About</a></li>
              <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }}>スキル</a></li>
              <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio') }}>製作物</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact') }}>お問い合わせ</a></li>
              <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>ホーム</Link></li>
              <li><Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
            </>
          )}
        </ul>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  )
}
