import React from 'react'

export default function About() {
  return (
    <section className="about" id="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>はじめまして、SESでWeb系システム・アプリケーションの開発・保守・改修に携わっているエンジニアです。</p>
          <p>日々の業務で培った経験を個人の活動に活かし、1人でも多くの方に知って使っていただける、価値のあるWebサービスの開発を目指して活動していきます。</p>
          <p>このポートフォリオページサイトをはじめ、様々なプロダクトを発信・共有していきたいと思います。</p>
        </div>
        <div className="profile-image">
          <i className="fas fa-user"></i>
        </div>
      </div>
    </section>
  )
}
