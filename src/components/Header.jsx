import React from 'react'

export default function Header({ scrollTo }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header>
      <nav>
        <div className="logo">MyPortfolio</div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home') }}>ホーム</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about') }}>About</a></li>
          <li><a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills') }}>スキル</a></li>
          <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio') }}>製作物</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact') }}>お問い合わせ</a></li>
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
