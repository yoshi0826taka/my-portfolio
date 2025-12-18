import React from 'react'

export default function Portfolio() {
  const portfolios = [
    {
      icon: 'fa-laptop-code',
      title: 'プロジェクト 1',
      description: '金融機関の発注管理及び金融データ管理システムの運用・保守開発を担当',
      tags: ['SQL', 'ExcelVBA']
    },
    {
      icon: 'fa-mobile-alt',
      title: 'プロジェクト 2',
      description: 'エネルギー会社の顧客向けサイト・アプリケーションの開発・保守を担当',
      tags: ['Java', 'SpringBoot', 'React', 'MySQL', '保守', '改修', '新規機能追加']
    }
  ]

  return (
    <section id="portfolio">
      <h2>Portfolio</h2>
      <div className="portfolio-grid">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="portfolio-item">
            <div className="portfolio-image">
              <i className={`fas ${portfolio.icon}`}></i>
            </div>
            <div className="portfolio-content">
              <h3>{portfolio.title}</h3>
              <p>{portfolio.description}</p>
              <div className="portfolio-tags">
                {portfolio.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
