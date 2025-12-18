import React, { useEffect, useRef } from 'react'

export default function Skills() {
  const skillsRef = useRef(null)

  useEffect(() => {
    const observerOptions = { threshold: 0.5 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress')
          progressBars.forEach((bar) => {
            const progress = bar.getAttribute('data-progress') || '0'
            bar.style.width = progress + '%'
          })
        }
      })
    }, observerOptions)

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  const skills = [
    { icon: 'fa-code', title: 'HTML/CSS', description: 'レスポンシブデザインに対応したWebページの構築', progress: 80 },
    { icon: 'fa-js', title: 'JavaScript', description: 'productiveかつefficientなフロントエンドの実装', progress: 70 },
    { icon: 'fa-java', title: 'Java', description: 'オブジェクト指向を活用したアプリケーション機能の実装', progress: 75 },
    { icon: 'fa-database', title: 'データベース(SQL)', description: '効率的なデータ管理とクエリの構築', progress: 65 },
    { icon: 'fa-mobile-alt', title: 'レスポンシブ', description: '様々なデバイスに対応したデザイン', progress: 85 },
  ]

  return (
    <section id="skills" ref={skillsRef}>
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <i className={`fas ${skill.icon}`}></i>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
            <div className="skill-bar">
              <div className="skill-progress" data-progress={skill.progress}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
