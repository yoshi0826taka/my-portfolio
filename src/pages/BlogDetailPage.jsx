import React, { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useArticle } from '../hooks/useArticles'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { article, prevArticle, nextArticle, isLoading, error } = useArticle(slug)

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | My Blog`
      window.scrollTo(0, 0)
    }
  }, [article])

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2 className="error-title">エラーが発生しました</h2>
          <p className="error-message">{error.message}</p>
          <button
            onClick={() => navigate('/blog')}
            className="error-button"
          >
            ブログに戻る
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner"></div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2 className="error-title">記事が見つかりません</h2>
          <p className="error-message">該当する記事はありません</p>
          <button
            onClick={() => navigate('/blog')}
            className="error-button"
          >
            ブログに戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-detail">
      {/* 記事ヘッダー */}
      <div className="blog-header-bg">
        <div className="blog-header-content">
          <div>
            <span className="article-category">{article.category}</span>
            <h1 className="article-header h1">{article.title}</h1>
            <div className="article-header-meta">
              <span>📅 {article.date}</span>
              <span>⏱️ {article.readingTime}分</span>
              {article.updated && article.updated !== article.date && (
                <span>✏️ 更新: {article.updated}</span>
              )}
            </div>
          </div>

          {/* サムネイル */}
          {article.thumbnail && (
            <div className="blog-hero-image">
              <img
                src={article.thumbnail}
                alt={article.title}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="blog-content">
        <div className={`blog-grid ${article.headings && article.headings.length > 0 ? 'with-toc' : ''}`}>
          {/* 左サイドバー：目次 */}
          {article.headings && article.headings.length > 0 && (
            <aside>
              <div className="blog-toc">
                <h3>目次</h3>
                <ul>
                  {article.headings.map(({ level, text, id }) => (
                    <li key={id} style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}>
                      <a href={`#${id}`}>{text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}

          {/* メインコンテンツ */}
          <main>
            {/* 記事本文 */}
            <div className="article-wrapper">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* タグ */}
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
                  {article.tags.map(tag => (
                    <span
                      key={tag}
                      className="tag"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* シェアボタン */}
            <div className="share-section">
              <h3>この記事をシェア</h3>
              <div className="share-buttons">
                {['twitter', 'facebook', 'linkedin'].map(platform => {
                  const urls = {
                    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `${window.location.origin}/blog/${article.slug}`
                    )}&text=${encodeURIComponent(article.title)}`,
                    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${window.location.origin}/blog/${article.slug}`
                    )}`,
                    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      `${window.location.origin}/blog/${article.slug}`
                    )}`,
                  }

                  const colors = {
                    twitter: '#1DA1F2',
                    facebook: '#1877F2',
                    linkedin: '#0A66C2',
                  }

                  const labels = {
                    twitter: '𝕏で共有',
                    facebook: 'Facebookで共有',
                    linkedin: 'LinkedInで共有',
                  }

                  return (
                    <a
                      key={platform}
                      href={urls[platform]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        backgroundColor: colors[platform],
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '500',
                      }}
                    >
                      {labels[platform]}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* 記事ナビゲーション */}
            <div className="article-nav">
              {prevArticle ? (
                <Link to={`/blog/${prevArticle.slug}`} className="nav-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="nav-label">← 前の記事</div>
                  <h4 className="nav-title">{prevArticle.title}</h4>
                </Link>
              ) : (
                <div className="nav-card disabled">
                  <div className="nav-label">← 前の記事</div>
                  <p style={{ color: '#999' }}>ありません</p>
                </div>
              )}

              {nextArticle ? (
                <Link to={`/blog/${nextArticle.slug}`} className="nav-card" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
                  <div className="nav-label">次の記事 →</div>
                  <h4 className="nav-title">{nextArticle.title}</h4>
                </Link>
              ) : (
                <div className="nav-card disabled" style={{ textAlign: 'right' }}>
                  <div className="nav-label">次の記事 →</div>
                  <p style={{ color: '#999' }}>ありません</p>
                </div>
              )}
            </div>

            {/* ブログに戻る */}
            <button
              onClick={() => navigate('/blog')}
              className="back-button"
            >
              ← ブログ一覧に戻る
            </button>
          </main>
        </div>
      </div>
    </div>
  )
}
