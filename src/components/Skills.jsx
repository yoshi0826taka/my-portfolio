import React from 'react'

export default function Skills() {
  const skills = [
    {
      icon: 'fa-java',
      iconStyle: 'fab',
      title: 'Java Backend',
      description: 'Servlet/JSPとSpring Bootで、Controller、Service、Repository、DTOを分けたWebアプリを実装。',
      proof: 'Task-ManagementSystem / weight_log'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Authentication',
      description: 'BCryptによるパスワードハッシュ化、JWT発行、認証フィルタの実装に取り組み中。',
      proof: 'weight_log'
    },
    {
      icon: 'fa-database',
      title: 'Database / SQL',
      description: 'MySQLを使ったマスタ・トランザクション構成、外部キー、サンプルデータ投入を扱えます。',
      proof: 'Task-ManagementSystem'
    },
    {
      icon: 'fa-react',
      iconStyle: 'fab',
      title: 'React Frontend',
      description: 'Vite + Reactでレスポンシブなポートフォリオサイトを構築し、GitHub Pagesで公開。',
      proof: 'my-portfolio'
    },
    {
      icon: 'fa-screwdriver-wrench',
      title: 'Maintenance Mindset',
      description: '既存コードの構成を読み、README、依存管理、ビルド再現性まで整えることを意識。',
      proof: '全リポジトリ'
    },
  ]

  return (
    <section id="skills">
      <h2>Skills</h2>
      <p className="section-lead">スキルは自己評価の点数ではなく、GitHub上の制作物とセットで見せる構成にしています。</p>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <i className={`${skill.iconStyle || 'fas'} ${skill.icon}`}></i>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <span className="proof-label">{skill.proof}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
