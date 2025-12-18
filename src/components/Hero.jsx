import React from 'react'

export default function Hero() {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="hero" id="home">
      <h1>Web Developer</h1>
      <p>システム開発・保守・改修の経験を活かして、より良いサービスを創造します</p>
      <button className="cta-button" onClick={handleContactClick}>お問い合わせ</button>
    </section>
  )
}
