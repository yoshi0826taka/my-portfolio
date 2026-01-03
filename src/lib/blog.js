import { renderMarkdown, generateTableOfContents } from './markdown'
import { ARTICLE_SLUGS } from './constants'

/**
 * Front Matter をブラウザで解析するシンプルなパーサー
 * @param {string} fileContent
 * @returns {{data: Object, content: string}}
 */
function parseFrontMatter(fileContent) {
  const lines = fileContent.split('\n')
  
  // 最初の行が --- である確認
  if (lines[0]?.trim() !== '---') {
    return { data: {}, content: fileContent }
  }

  let endIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]?.trim() === '---') {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) {
    return { data: {}, content: fileContent }
  }

  const frontMatterLines = lines.slice(1, endIndex)
  const content = lines.slice(endIndex + 1).join('\n')

  // YAML をシンプルにパース
  const data = {}
  for (const line of frontMatterLines) {
    const match = line.match(/^(\w+):\s*(.+)$/)
    if (match) {
      const key = match[1]
      let value = match[2].trim()

      // 配列を解析 [item1, item2, ...]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, ''))
      }
      // ブール値を解析
      else if (value === 'true' || value === 'false') {
        value = value === 'true'
      }
      // 文字列から引用符を削除
      else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      // その他は文字列のまま（dateも文字列として保持）

      data[key] = value
    }
  }

  return { data, content: content.trim() }
}

/**
 * 簡単な読取時間計算（日本語対応）
 * @param {string} text
 * @returns {number} 推定読了時間（分）
 */
function calculateReadingTime(text) {
  // 日本語：1分間に400字程度、英語：1分間に200語程度
  const japaneseChars = (text.match(/[\u4E00-\u9FFF\u3040-\u309F\u30A0-\u30FF]/g) || []).length
  const englishWords = (text.match(/\b\w+\b/g) || []).length
  
  const japaneseTime = japaneseChars / 400
  const englishTime = englishWords / 200
  
  return Math.max(1, Math.ceil(japaneseTime + englishTime))
}

/**
 * 記事ファイルを fetch で取得
 * @param {string} slug
 * @returns {Promise<string|null>}
 */
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
 * すべての記事のスラッグリストを取得
 * @returns {Promise<Array<string>>}
 */
export async function getArticleSlugs() {
  // constants.js から記事スラッグリストを取得
  return ARTICLE_SLUGS
}

/**
 * 全記事を取得（メタデータ付き）
 * @returns {Promise<{articles: Array, categories: Array, tags: Array}>}
 */
export async function getAllArticles() {
  const articles = []
  const categories = {}
  const tagsMap = {}

  // 記事スラッグリストを取得
  const articleSlugs = await getArticleSlugs()

  for (const slug of articleSlugs) {
    const fileContent = await fetchArticleFile(slug)
    if (!fileContent) continue

    const { data, content } = parseFrontMatter(fileContent)

    // required フィールドをチェック
    if (!data.slug || !data.title || !data.date) {
      console.warn(`Invalid article frontmatter for ${slug}`)
      continue
    }

    const readTime = calculateReadingTime(content)

    const article = {
      slug,
      title: data.title || '',
      date: data.date,
      updated: data.updated || data.date,
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
      thumbnail: data.thumbnail || '/images/blog/default.jpg',
      published: data.published !== false, // デフォルトは true
      publishTo: data.publishTo || [],
      readingTime: readTime,
      externalLinks: data.externalLinks || {},
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
    categories: Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    tags: Object.entries(tagsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  }
}

/**
 * 単一記事を取得（本文付き）
 * @param {string} slug
 * @returns {Promise<Object>}
 */
export async function getArticleBySlug(slug) {
  const fileContent = await fetchArticleFile(slug)
  if (!fileContent) throw new Error('Article not found')

  const { data, content } = parseFrontMatter(fileContent)

  if (!data.slug || !data.title || !data.date) {
    throw new Error('Invalid article frontmatter')
  }

  const readTime = calculateReadingTime(content)
  const headings = generateTableOfContents(content)
  const html = await renderMarkdown(content)

  return {
    slug,
    title: data.title,
    date: data.date,
    updated: data.updated || data.date,
    category: data.category || 'Uncategorized',
    tags: data.tags || [],
    excerpt: data.excerpt || '',
    thumbnail: data.thumbnail || '/images/blog/default.jpg',
    published: data.published !== false,
    publishTo: data.publishTo || [],
    content: html,
    readingTime: readTime,
    headings,
    externalLinks: data.externalLinks || {},
  }
}

/**
 * 前後の記事を取得
 * @param {string} slug
 * @returns {Promise<{prev: Object|null, next: Object|null}>}
 */
export async function getAdjacentArticles(slug) {
  const { articles } = await getAllArticles()
  const currentIndex = articles.findIndex(a => a.slug === slug)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
    next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
  }
}

/**
 * カテゴリーで記事をフィルター
 * @param {string} category
 * @returns {Promise<Array>}
 */
export async function getArticlesByCategory(category) {
  const { articles } = await getAllArticles()
  return articles.filter(article => article.category === category)
}

/**
 * タグで記事をフィルター
 * @param {string} tag
 * @returns {Promise<Array>}
 */
export async function getArticlesByTag(tag) {
  const { articles } = await getAllArticles()
  return articles.filter(article => article.tags.includes(tag))
}

/**
 * テキスト検索（タイトルと概要）
 * @param {string} query
 * @returns {Promise<Array>}
 */
export async function searchArticles(query) {
  const { articles } = await getAllArticles()
  const lowerQuery = query.toLowerCase()

  return articles.filter(
    article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery)
  )
}
