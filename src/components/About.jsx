import React from 'react'

export default function About() {
  return (
    <section className="about" id="about">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
            SESでWeb系システム・アプリケーションの開発、保守、改修に携わっています。既存コードを読み解き、影響範囲を考えながら改善する経験を、個人開発でも再現できるように取り組んでいます。
          </p>
          <p>
            現在はJava、Spring Boot、Servlet/JSP、React、MySQLを中心に、ログイン認証、CRUD、DTO設計、DB連携、APIドキュメント化までを一つずつ成果物に落とし込んでいます。
          </p>
          <p>
            このサイトでは、学習内容だけでなく「何を作り、どこを工夫し、次に何を改善するか」が伝わるように公開しています。
          </p>
        </div>
        <div className="about-summary">
          <div>
            <strong>得意領域</strong>
            <span>業務系Webアプリ、DB連携、保守改修</span>
          </div>
          <div>
            <strong>学習中</strong>
            <span>Spring Security、テスト設計、CI/CD</span>
          </div>
          <div>
            <strong>重視していること</strong>
            <span>再現できるREADME、読みやすい構成、改善履歴</span>
          </div>
        </div>
      </div>
    </section>
  )
}
