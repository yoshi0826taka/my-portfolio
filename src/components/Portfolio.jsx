import React from 'react'

export default function Portfolio() {
  const portfolios = [
    {
      icon: 'fa-list-check',
      title: 'Task-ManagementSystem',
      type: 'Java Servlet / JSP',
      description: '研修課題として作成したタスク管理システム。ログイン、タスク登録・編集・削除、コメント管理、マスタ参照をServlet/JSPとMySQLで実装しています。',
      highlights: ['Servlet/JSP', 'DAO / DTO / Entity', 'MySQL', 'Maven WAR'],
      github: 'https://github.com/yoshi0826taka/Task-ManagementSystem'
    },
    {
      icon: 'fa-weight-scale',
      title: 'weight_log',
      type: 'Spring Boot API',
      description: '体重記録アプリ。REST API、JPA、DTO、BCrypt、JWT、OpenAPIを取り入れ、バックエンド中心の設計と認証処理を学習しています。',
      highlights: ['Spring Boot', 'JPA', 'JWT', 'OpenAPI', 'MySQL'],
      github: 'https://github.com/yoshi0826taka/weight_log'
    },
    {
      icon: 'fa-display',
      title: 'my-portfolio',
      type: 'React / Vite',
      description: '制作物とスキルを整理して見せるためのポートフォリオサイト。Reactコンポーネント分割、レスポンシブ対応、GitHub Pages公開まで対応しています。',
      highlights: ['React', 'Vite', 'GitHub Pages', 'Responsive CSS'],
      github: 'https://github.com/yoshi0826taka/my-portfolio'
    }
  ]

  return (
    <section id="portfolio">
      <h2>Portfolio</h2>
      <p className="section-lead">学習内容を「動くもの」と「読めるリポジトリ」に変換した制作物です。</p>
      <div className="portfolio-grid">
        {portfolios.map((portfolio, index) => (
          <div key={index} className="portfolio-item">
            <div className="portfolio-image">
              <i className={`fas ${portfolio.icon}`}></i>
            </div>
            <div className="portfolio-content">
              <span className="project-type">{portfolio.type}</span>
              <h3>{portfolio.title}</h3>
              <p>{portfolio.description}</p>
              <div className="portfolio-tags">
                {portfolio.highlights.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <a className="project-link" href={portfolio.github} target="_blank" rel="noopener noreferrer">
                GitHubで見る
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
