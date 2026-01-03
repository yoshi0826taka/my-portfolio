# 📐 ブログシステム 基本設計書（React + Vite版）

## 1. システムアーキテクチャ

### 1.1 全体構成図

```
┌─────────────────────────────────────────┐
│          ユーザー / ブラウザ             │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Vite Dev Server / Build Output     │
│                                          │
│  ┌────────────────────────────────┐    │
│  │     React Application          │    │
│  │                                 │    │
│  │  ┌──────────────┐              │    │
│  │  │  Pages       │              │    │
│  │  │  - Home      │              │    │
│  │  │  - Blog List │              │    │
│  │  │  - Blog Post │              │    │
│  │  └──────────────┘              │    │
│  │                                 │    │
│  │  ┌──────────────────────────┐  │    │
│  │  │  Components              │  │    │
│  │  │  - BlogCard              │  │    │
│  │  │  - BlogSearch            │  │    │
│  │  │  - TableOfContents       │  │    │
│  │  │  - SocialShare           │  │    │
│  │  └──────────────────────────┘  │    │
│  │                                 │    │
│  │  ┌──────────────────────────┐  │    │
│  │  │  Markdown Parser         │  │    │
│  │  │  (remark + rehype)       │  │    │
│  │  └──────────────────────────┘  │    │
│  └────────────────────────────────┘    │
│                                          │
└────────────────┬─────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      Static Files / Public Assets       │
│                                          │
│  - content/blog/*.md                    │
│  - public/images/blog/*                 │
│                                          │
└─────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│      External Services (API連携)        │
│                                          │
│  ┌──────────┐        ┌──────────────┐  │
│  │Qiita API │        │ Zenn + GitHub│  │
│  └──────────┘        └──────────────┘  │
│                                          │
└─────────────────────────────────────────┘
```

### 1.2 技術スタック

```
フロントエンド:
  - React 18.2.0
  - Vite 5.0.8
  - TypeScript（将来実装推奨）
  - Tailwind CSS（スタイリング）

Markdownパース:
  - remark （Markdown処理）
  - rehype （HTML処理）
  - remark-gfm （GFM対応）
  - rehype-highlight （シンタックスハイライト）

ユーティリティ:
  - gray-matter （Front Matter解析）
  - reading-time （読了時間計算）
  - date-fns （日付フォーマット）

デプロイ:
  - Vercel / Netlify / GitHub Pages
  - GitHub Actions （外部連携自動化）
```

---

## 2. ディレクトリ構成

```
my-portfolio/
├── src/
│   ├── pages/
│   │   ├── BlogListPage.jsx           # ブログ一覧ページ
│   │   ├── BlogDetailPage.jsx         # ブログ詳細ページ
│   │   └── HomePage.jsx               # ホームページ（既存）
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx             # (既存)
│   │   │   ├── Footer.jsx             # (既存)
│   │   │   └── Layout.jsx             # (既存)
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx           # 記事カードコンポーネント
│   │   │   ├── BlogList.jsx           # 記事一覧（フィルター・検索）
│   │   │   ├── BlogSearch.jsx         # 検索バー
│   │   │   ├── BlogFilter.jsx         # フィルター（カテゴリー・タグ）
│   │   │   ├── BlogPagination.jsx     # ページネーション
│   │   │   ├── ArticleHeader.jsx      # 記事ヘッダー
│   │   │   ├── ArticleContent.jsx     # 記事本文（Markdownレンダリング）
│   │   │   ├── TableOfContents.jsx    # 目次コンポーネント
│   │   │   ├── SocialShare.jsx        # シェアボタン
│   │   │   └── ArticleNavigation.jsx  # 前後記事ナビゲーション
│   │   │
│   │   └── About.jsx                  # (既存)
│   │
│   ├── hooks/
│   │   ├── useArticles.js             # 記事データ取得・キャッシュ
│   │   ├── useBlogFilter.js           # フィルター・検索ロジック
│   │   └── useTableOfContents.js      # 目次生成・追従
│   │
│   ├── lib/
│   │   ├── markdown.js                # Markdown処理エンジン
│   │   ├── blog.js                    # ブログデータ取得
│   │   ├── qiita.js                   # Qiita API連携
│   │   ├── zenn.js                    # Zenn連携
│   │   ├── utils.js                   # 日付フォーマットなど
│   │   └── constants.js               # 定数定義
│   │
│   ├── styles/
│   │   ├── index.css                  # (既存)
│   │   ├── blog.css                   # ブログ用スタイル
│   │   └── markdown.css               # Markdown記事スタイル
│   │
│   ├── App.jsx                        # (既存)
│   └── main.jsx                       # (既存)
│
├── public/
│   ├── images/
│   │   ├── (既存画像)
│   │   └── blog/
│   │       ├── thumbnail-1.jpg
│   │       ├── thumbnail-2.jpg
│   │       └── ...
│   └── favicon.ico
│
├── content/
│   └── blog/
│       ├── first-post.md              # サンプル記事
│       ├── second-post.md
│       └── third-post.md
│
├── scripts/
│   ├── sync-to-qiita.js               # Qiita投稿スクリプト
│   └── sync-to-zenn.js                # Zenn投稿スクリプト
│
├── .github/
│   └── workflows/
│       └── publish.yml                # GitHub Actions定義
│
├── .env.local                         # 環境変数（Git管理外）
├── .env.example                       # 環境変数テンプレート
├── vite.config.js
├── package.json
├── tailwind.config.js                 # (将来追加)
├── postcss.config.js                  # (将来追加)
├── BLOG_DESIGN.md                     # このファイル
└── README.md
```

---

## 3. データ設計

### 3.1 記事データ構造

**TypeScript型定義案 (types/blog.ts)**

```typescript
// 記事のメタデータ（Front Matter）
export interface ArticleFrontMatter {
  slug: string                    // URL用スラッグ（ユニーク）
  title: string                   // 記事タイトル
  date: string                    // 公開日 (ISO 8601: 2024-12-30)
  updated?: string                // 更新日
  category: string                // カテゴリー（1つ）
  tags: string[]                  // タグ配列（複数）
  excerpt: string                 // 記事概要（200字程度）
  thumbnail: string               // サムネイル画像パス
  published: boolean              // 公開/非公開フラグ
  publishTo?: ('qiita' | 'zenn')[] // 連携先設定
}

// 記事の完全データ
export interface Article extends ArticleFrontMatter {
  content: string                 // HTML化されたMarkdown本文
  readingTime: number             // 推定読了時間（分）
  headings: TableOfContentsItem[] // 目次データ
}

// 記事一覧用（軽量データ）
export interface ArticleSummary extends ArticleFrontMatter {
  readingTime: number
}

// 目次アイテム
export interface TableOfContentsItem {
  level: number                   // h1-h6の深さ (1-6)
  text: string                    // 見出しテキスト
  id: string                      // アンカーID
}

// カテゴリー
export interface Category {
  name: string
  count: number  // 該当記事数
}

// タグ
export interface Tag {
  name: string
  count: number  // 該当記事数
}

// ブログの統計情報
export interface BlogStats {
  totalArticles: number
  categories: Category[]
  tags: Tag[]
}
```

### 3.2 Markdownファイル構造

**記事ファイル例 (content/blog/first-post.md)**

```markdown
---
slug: "first-post"
title: "Next.jsからReactへの移行：フロントエンド刷新プロジェクト"
date: "2024-12-30"
updated: "2024-12-30"
category: "React"
tags: ["React", "Vite", "TypeScript", "パフォーマンス"]
excerpt: "HTMLで作成したポートフォリオサイトをReact + Viteでリニューアルしました。その過程で学んだReactのベストプラクティスと設計パターンを紹介します。"
thumbnail: "/images/blog/react-migration.jpg"
published: true
publishTo: ["qiita", "zenn"]
---

# React + Viteでポートフォリオをリニューアル

## はじめに

以前HTML/CSSで作成していたポートフォリオサイトを、React + Viteでリニューアルしました。

## リニューアルの背景

...（本文）

## 実装のポイント

### Viteの採用理由

...

## まとめ

React + Viteへの移行で開発効率が大幅に向上しました。
```

---

## 4. コンポーネント設計

### 4.1 ページコンポーネント

#### **BlogListPage.jsx** - ブログ一覧ページ

```javascript
import React, { useState, useMemo } from 'react'
import BlogList from '../components/blog/BlogList'
import { useArticles } from '../hooks/useArticles'

export default function BlogListPage() {
  const { articles, categories, tags, isLoading } = useArticles()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // フィルター・検索ロジック
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // 検索条件
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      // カテゴリー条件
      const matchesCategory = selectedCategory === 'all' || 
        article.category === selectedCategory
      
      // タグ条件
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => article.tags.includes(tag))
      
      return matchesSearch && matchesCategory && matchesTags
    })
  }, [articles, searchQuery, selectedCategory, selectedTags])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <BlogList
          articles={filteredArticles}
          categories={categories}
          tags={tags}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
```

#### **BlogDetailPage.jsx** - ブログ詳細ページ

```javascript
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleHeader from '../components/blog/ArticleHeader'
import ArticleContent from '../components/blog/ArticleContent'
import TableOfContents from '../components/blog/TableOfContents'
import SocialShare from '../components/blog/SocialShare'
import ArticleNavigation from '../components/blog/ArticleNavigation'
import { useArticle } from '../hooks/useArticles'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { article, prevArticle, nextArticle, isLoading } = useArticle(slug)

  useEffect(() => {
    // ページタイトル・メタタグ更新
    if (article) {
      document.title = `${article.title} | My Blog`
      // OGP設定も追加可能
    }
  }, [article])

  if (isLoading) return <div className="text-center py-12">読み込み中...</div>
  if (!article) return <div className="text-center py-12">記事が見つかりません</div>

  return (
    <div className="min-h-screen">
      <ArticleHeader article={article} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左サイドバー：目次 */}
          <aside className="lg:col-span-1">
            <TableOfContents headings={article.headings} />
          </aside>
          
          {/* メイン：記事本文 */}
          <main className="lg:col-span-2">
            <ArticleContent article={article} />
            
            {/* シェアボタン */}
            <SocialShare article={article} />
            
            {/* 記事ナビゲーション */}
            <ArticleNavigation prev={prevArticle} next={nextArticle} />
          </main>
          
          {/* 右サイドバー：関連情報（オプション） */}
          <aside className="lg:col-span-1">
            {/* 将来的に関連記事やプロフィールなど */}
          </aside>
        </div>
      </div>
    </div>
  )
}
```

### 4.2 UI コンポーネント

#### **BlogCard.jsx** - 記事カード

```javascript
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../lib/utils'

export default function BlogCard({ article }) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* サムネイル */}
      <Link to={`/blog/${article.slug}`} className="block overflow-hidden h-48">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </Link>
      
      <div className="p-6">
        {/* カテゴリー */}
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
          <span className="text-sm text-gray-500">
            📅 {formatDate(article.date)}
          </span>
          <span className="text-sm text-gray-500">
            ⏱️ {article.readingTime}分
          </span>
        </div>
        
        {/* タイトル */}
        <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-purple-600">
          <Link to={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h2>
        
        {/* 概要 */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* 外部リンク */}
        {article.externalLinks && (
          <div className="flex gap-3 pt-3 border-t text-xs">
            {article.externalLinks.qiita && (
              <a
                href={article.externalLinks.qiita}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                Qiitaで読む
              </a>
            )}
            {article.externalLinks.zenn && (
              <a
                href={article.externalLinks.zenn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Zennで読む
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
```

#### **BlogSearch.jsx** - 検索バー

```javascript
import React, { useState } from 'react'

export default function BlogSearch({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="記事を検索..."
          className={`w-full px-6 py-4 pl-12 border-2 rounded-lg focus:outline-none transition ${
            isFocused 
              ? 'border-purple-600 ring-2 ring-purple-200' 
              : 'border-gray-300'
          }`}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
```

#### **TableOfContents.jsx** - 目次

```javascript
import React, { useState, useEffect } from 'react'

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    // IntersectionObserverで現在見ている見出しを追跡
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -35% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  return (
    <nav className="sticky top-24 bg-gray-50 p-6 rounded-lg h-fit">
      <h3 className="font-bold text-lg mb-4">目次</h3>
      <ul className="space-y-2">
        {headings.map(({ level, text, id }) => (
          <li key={id} style={{ paddingLeft: `${(level - 1) * 1}rem` }}>
            <a
              href={`#${id}`}
              className={`block py-1 text-sm transition ${
                activeId === id
                  ? 'text-purple-600 font-bold'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

#### **SocialShare.jsx** - シェアボタン

```javascript
import React, { useState } from 'react'

export default function SocialShare({ article }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/blog/${article.slug}`
  const title = article.title

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 py-6 border-t border-b my-8">
      <span className="font-bold">シェア:</span>
      
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition"
        aria-label="Twitter"
      >
        𝕏
      </a>
      
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
        aria-label="Facebook"
      >
        f
      </a>
      
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
        aria-label="LinkedIn"
      >
        in
      </a>
      
      <button
        onClick={copyToClipboard}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition ${
          copied 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-600 text-white hover:bg-gray-700'
        }`}
        aria-label="URLをコピー"
      >
        {copied ? '✓' : '🔗'}
      </button>
    </div>
  )
}
```

---

## 5. ビジネスロジック（Hook & Lib）

### 5.1 useArticles Hook

**hooks/useArticles.js**

```javascript
import { useState, useEffect } from 'react'
import { getAllArticles, getArticleBySlug, getAdjacentArticles } from '../lib/blog'

// 全記事とメタデータを取得
export function useArticles() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getAllArticles()
        setArticles(data.articles)
        setCategories(data.categories)
        setTags(data.tags)
      } catch (error) {
        console.error('Failed to load articles:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  return { articles, categories, tags, isLoading }
}

// 単一の記事と前後の記事を取得
export function useArticle(slug) {
  const [article, setArticle] = useState(null)
  const [prevArticle, setPrevArticle] = useState(null)
  const [nextArticle, setNextArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const articleData = await getArticleBySlug(slug)
        const adjacentData = await getAdjacentArticles(slug)
        
        setArticle(articleData)
        setPrevArticle(adjacentData.prev)
        setNextArticle(adjacentData.next)
      } catch (error) {
        console.error('Failed to load article:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  return { article, prevArticle, nextArticle, isLoading }
}
```

### 5.2 Markdown処理エンジン

**lib/markdown.js**

```javascript
import { marked } from 'marked'
import hljs from 'highlight.js'

// marked設定
marked.setOptions({
  breaks: true,
  gfm: true,
})

// コードブロックのシンタックスハイライト
marked.setOptions({
  renderer: {
    code(code, language, isEscaped) {
      const lang = language || 'plaintext'
      let highlighted

      try {
        highlighted = hljs.highlight(code, { language: lang }).value
      } catch (e) {
        highlighted = hljs.highlight(code, { language: 'plaintext' }).value
      }

      return `<pre><code class="language-${lang} hljs">${highlighted}</code></pre>`
    },
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens)
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    }
  }
})

/**
 * Markdownを HTMLに変換
 */
export async function renderMarkdown(markdown) {
  try {
    return await marked.parse(markdown)
  } catch (error) {
    console.error('Markdown render error:', error)
    return '<p>エラーが発生しました</p>'
  }
}

/**
 * 目次を生成
 */
export function generateTableOfContents(markdown) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

    headings.push({ level, text, id })
  }

  return headings
}

/**
 * HTML本文にidを追加（目次アンカー用）
 */
export function addHeadingIds(html) {
  return html.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, content) => {
    const id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    return `<h${level} id="${id}">${content}</h${level}>`
  })
}
```

### 5.3 ブログデータ取得

**lib/blog.js**

```javascript
import matter from 'gray-matter'
import { renderMarkdown, generateTableOfContents } from './markdown'
import readingTime from 'reading-time'

// 記事ファイルを fetch で取得（Viteで動く想定）
async function fetchArticleFile(slug) {
  try {
    const response = await fetch(`/content/blog/${slug}.md`)
    if (!response.ok) throw new Error('Article not found')
    return await response.text()
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error)
    return null
  }
}

/**
 * 全記事を取得（メタデータ付き）
 */
export async function getAllArticles() {
  // Viteで content/ ディレクトリ内のファイルを取得
  // 注：実装方法は環境に応じて調整が必要
  // ここではMDファイルリストを手動管理するか、APIを使用
  
  const articles = []
  const categories = {}
  const tagsMap = {}

  // ファイルリストを動的に取得する場合、事前に定義するか
  // API endpoint を設ける必要があります
  const articleSlugs = await getArticleSlugs()

  for (const slug of articleSlugs) {
    const fileContent = await fetchArticleFile(slug)
    if (!fileContent) continue

    const { data, content } = matter(fileContent)
    const readTime = Math.ceil(readingTime(content).minutes)

    const article = {
      slug,
      ...data,
      readingTime: readTime,
    }

    if (article.published) {
      articles.push(article)

      // カテゴリーカウント
      categories[article.category] = (categories[article.category] || 0) + 1

      // タグカウント
      article.tags.forEach(tag => {
        tagsMap[tag] = (tagsMap[tag] || 0) + 1
      })
    }
  }

  // 新着順でソート
  articles.sort((a, b) => new Date(b.date) - new Date(a.date))

  return {
    articles,
    categories: Object.entries(categories).map(([name, count]) => ({ name, count })),
    tags: Object.entries(tagsMap).map(([name, count]) => ({ name, count })),
  }
}

/**
 * 単一記事を取得（本文付き）
 */
export async function getArticleBySlug(slug) {
  const fileContent = await fetchArticleFile(slug)
  if (!fileContent) throw new Error('Article not found')

  const { data, content } = matter(fileContent)
  const readTime = Math.ceil(readingTime(content).minutes)
  const headings = generateTableOfContents(content)
  const html = await renderMarkdown(content)

  return {
    slug,
    ...data,
    content: html,
    readingTime: readTime,
    headings,
  }
}

/**
 * 前後の記事を取得
 */
export async function getAdjacentArticles(slug) {
  const { articles } = await getAllArticles()
  const currentIndex = articles.findIndex(a => a.slug === slug)

  return {
    prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  }
}

/**
 * 記事のスラッグリストを取得（キャッシュ可能）
 */
export async function getArticleSlugs() {
  // TODO: content/blog内の.mdファイル一覧を取得
  // 実装方法：
  // 1. manifest を使用
  // 2. API endpoint を設ける
  // 3. 手動でリストを管理
  
  return [
    'first-post',
    'second-post',
    'third-post',
  ]
}
```

### 5.4 外部連携 - Qiita

**lib/qiita.js**

```javascript
/**
 * Qiitaに記事を投稿
 */
export async function publishToQiita(article, token) {
  if (!token) {
    throw new Error('Qiita API token is required')
  }

  // 本文にサイトリンクを追加
  const bodyWithLink = `${article.content}

---

この記事は[自分のブログ](${window.location.origin}/blog/${article.slug})でも公開しています。`

  const payload = {
    title: article.title,
    body: bodyWithLink,
    tags: article.tags.slice(0, 5).map(tag => ({ name: tag })),
    private: false,
    tweet: true,
  }

  try {
    const response = await fetch('https://qiita.com/api/v2/items', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      id: data.id,
      url: data.url,
    }
  } catch (error) {
    console.error('Qiita publish error:', error)
    throw error
  }
}

/**
 * Qiita記事の統計情報を取得
 */
export async function getQiitaStats(articleId) {
  try {
    const response = await fetch(`https://qiita.com/api/v2/items/${articleId}`)
    const data = await response.json()

    return {
      likes: data.likes_count,
      views: data.page_views_count,
    }
  } catch (error) {
    console.error('Failed to fetch Qiita stats:', error)
    return null
  }
}
```

---

## 6. スタイル設計

### 6.1 Tailwind CSS統合

**tailwind.config.js (新規作成)**

```javascript
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          600: '#9333ea',
        }
      },
      fontFamily: {
        code: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.8',
      }
    },
  },
  plugins: [],
}
```

### 6.2 Markdownスタイル

**styles/markdown.css**

```css
/* Markdown本文のスタイル */
.markdown-content {
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
}

.markdown-content h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #9333ea;
  padding-bottom: 0.5rem;
}

.markdown-content h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1.8rem;
  margin-bottom: 0.8rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
}

.markdown-content p {
  margin-bottom: 1.2rem;
}

.markdown-content ul,
.markdown-content ol {
  margin-left: 2rem;
  margin-bottom: 1.2rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

.markdown-content code {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: var(--font-code);
  font-size: 0.9rem;
}

.markdown-content pre {
  background-color: #282c34;
  color: #abb2bf;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.2rem;
  line-height: 1.4;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.95rem;
}

.markdown-content blockquote {
  border-left: 4px solid #9333ea;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1.2rem;
  color: #666;
  font-style: italic;
}

.markdown-content a {
  color: #9333ea;
  text-decoration: underline;
  transition: color 0.2s;
}

.markdown-content a:hover {
  color: #7c3aed;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.2rem;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.markdown-content th {
  background-color: #f5f5f5;
  font-weight: 600;
}

/* シンタックスハイライト */
.hljs-attr { color: #d19a66; }
.hljs-string { color: #98c379; }
.hljs-number { color: #d19a66; }
.hljs-literal { color: #56b6c2; }
.hljs-function { color: #61afef; }
```

---

## 7. ルーティング設計

**App.jsx (主要ルート)**

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import HomePage from './pages/HomePage'
import BlogListPage from './pages/BlogListPage'
import BlogDetailPage from './pages/BlogDetailPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
```

---

## 8. 環境変数設定

**.env.example (テンプレート)**

```bash
# Qiita API
VITE_QIITA_API_TOKEN=your_qiita_token_here
VITE_QIITA_TEAM_NAME=optional_team_name

# Zenn
VITE_ZENN_REPO_PATH=../zenn-articles
VITE_ZENN_USERNAME=your_zenn_username

# サイトURL
VITE_SITE_URL=http://localhost:3000
```

**.env.local (ローカルのみ、Git管理外)**

```bash
# 実際の値を入力
```

---

## 9. 依存関係（package.json）

**追加が必要なパッケージ：**

```bash
npm install \
  react-router-dom \
  gray-matter \
  marked \
  highlight.js \
  reading-time \
  date-fns \
  tailwindcss \
  postcss \
  autoprefixer
```

**package.json の scripts を追加：**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "sync:qiita": "node scripts/sync-to-qiita.js",
    "sync:zenn": "node scripts/sync-to-zenn.js"
  }
}
```

---

## 10. 実装フェーズ

| フェーズ | 期間 | タスク |
|---------|------|--------|
| **Phase 1: 基本構造** | Week 1 | ・ディレクトリ構成・記事データ構造・Markdownパーサー実装 |
| **Phase 2: ブログ一覧** | Week 2 | ・BlogListPage・BlogCard・検索・フィルター・ページネーション |
| **Phase 3: ブログ詳細** | Week 3 | ・BlogDetailPage・目次・シェアボタン・ナビゲーション |
| **Phase 4: 外部連携** | Week 4 | ・Qiita API連携・Zenn連携・GitHub Actions自動化 |
| **Phase 5: 最適化** | Week 5 | ・パフォーマンス・SEO・アクセシビリティ |

---

## 11. デプロイ

### 11.1 Vercel へのデプロイ

```bash
# Vercel CLIをインストール
npm install -g vercel

# デプロイ
vercel
```

### 11.2 GitHub Actions 自動デプロイ

**.github/workflows/deploy.yml**

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod --token $VERCEL_TOKEN
```

---

## 12. 次のアクション

1. ✅ 基本設計書の確認
2. ⬜ Tailwind CSS + React Router のセットアップ
3. ⬜ ディレクトリ構成の作成
4. ⬜ BlogListPage・BlogDetailPage の実装
5. ⬜ 記事ファイル（content/blog/*.md）の管理方式の決定
6. ⬜ Qiita・Zenn 連携の実装

---

**作成日:** 2025年1月3日  
**ステータス:** ✅ 完成版
