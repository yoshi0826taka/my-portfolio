import React from 'react'
import { Link } from 'react-router-dom'
import { useArticles } from '../hooks/useArticles'

export default function BlogListPage() {
  const { articles, categories, tags, isLoading, error } = useArticles()

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2 className="error-title">エラーが発生しました</h2>
          <p className="error-message">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-container">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        {/* ページヘッダー */}
        <div className="blog-header">
          <h1>Blog</h1>
          <p>技術記事やプロジェクトについて書いています</p>
        </div>

        {/* 記事統計情報 */}
        <div className="blog-stats">
          <div className="stat-card">
            <div className="stat-number">{articles.length}</div>
            <div className="stat-label">記事数</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{categories.length}</div>
            <div className="stat-label">カテゴリー</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{tags.length}</div>
            <div className="stat-label">タグ</div>
          </div>
        </div>

        {/* ローディング状態 */}
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* 記事一覧 */}
        {!isLoading && articles.length === 0 ? (
          <div className="empty-state">
            <p>記事がまだありません</p>
          </div>
        ) : (
          <div className="article-list">
            {articles.map(article => (
              <div key={article.slug} className="article-card">
                <div className="article-card-content">
                  {/* サムネイル（存在する場合） */}
                  {article.thumbnail && (
                    <div className="article-thumbnail">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* コンテンツ */}
                  <div className="article-body">
                    {/* メタ情報 */}
                    <div className="article-meta">
                      <span className="category-badge">{article.category}</span>
                      <span>📅 {article.date}</span>
                      <span>⏱️ {article.readingTime}分</span>
                    </div>

                    {/* タイトル */}
                    <h2 className="article-title">
                      <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {article.title}
                      </Link>
                    </h2>

                    {/* 概要 */}
                    <p className="article-excerpt">{article.excerpt}</p>

                    {/* タグ */}
                    <div className="article-tags">
                      {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">
                          #{tag}
                        </span>
                      ))}
                      {article.tags.length > 3 && (
                        <span style={{ color: '#999', fontSize: '0.875rem' }}>
                          +{article.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 外部リンク */}
                    {article.externalLinks && (
                      <div className="article-links">
                        {article.externalLinks.qiita && (
                          <a
                            href={article.externalLinks.qiita}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="qiita"
                          >
                            Qiitaで読む →
                          </a>
                        )}
                        {article.externalLinks.zenn && (
                          <a
                            href={article.externalLinks.zenn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="zenn"
                          >
                            Zennで読む →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
