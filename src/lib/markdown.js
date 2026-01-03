import { marked } from 'marked'
import hljs from 'highlight.js'

// marked設定
marked.setOptions({
  breaks: true,
  gfm: true,
})

// コードブロックのシンタックスハイライト設定
const renderer = {
  code(code, language) {
    const lang = language || 'plaintext'
    let highlighted

    try {
      highlighted = hljs.highlight(code, { language: lang }).value
    } catch (e) {
      highlighted = hljs.highlight(code, { language: 'plaintext' }).value
    }

    return `<pre><code class="language-${lang} hljs">${highlighted}</code></pre>\n`
  },

  heading({ tokens, depth }) {
    const text = tokens.map(t => t.text).join('')
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
    return `<h${depth} id="${id}">${text}</h${depth}>\n`
  },
}

marked.use({ renderer })

/**
 * Markdownを HTMLに変換
 * @param {string} markdown
 * @returns {Promise<string>}
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
 * @param {string} markdown
 * @returns {Array<{level: number, text: string, id: string}>}
 */
export function generateTableOfContents(markdown) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2]
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')

    headings.push({ level, text, id })
  }

  return headings
}

/**
 * HTML本文にidを追加（目次アンカー用）
 * @param {string} html
 * @returns {string}
 */
export function addHeadingIds(html) {
  return html.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (match, level, content) => {
    const id = content
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
    return `<h${level} id="${id}">${content}</h${level}>`
  })
}
