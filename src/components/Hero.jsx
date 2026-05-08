import React from 'react'

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Java / Spring Boot / React / MySQL</p>
        <h1>業務システムの理解を、動くWebアプリとして形にするエンジニア</h1>
        <p className="hero-lead">
          SESでの開発・保守・改修経験を土台に、CRUD、認証、DB設計、フロントエンド実装まで一連の流れを学び、GitHubで成果物として公開しています。
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => scrollToSection('portfolio')}>制作物を見る</button>
          <a className="secondary-button" href="https://github.com/yoshi0826taka" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="hero-panel" aria-label="主なスキル">
        <div>
          <span className="metric">3</span>
          <span>公開作品</span>
        </div>
        <div>
          <span className="metric">Java</span>
          <span>Servlet / Spring Boot</span>
        </div>
        <div>
          <span className="metric">DB</span>
          <span>MySQL / SQL</span>
        </div>
      </div>
    </section>
  )
}
