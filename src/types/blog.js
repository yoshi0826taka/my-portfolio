/**
 * TypeScript型定義（JSDocコメント形式）
 */

/**
 * @typedef {Object} ArticleFrontMatter
 * @property {string} slug - URL用スラッグ（ユニーク）
 * @property {string} title - 記事タイトル
 * @property {string} date - 公開日 (ISO 8601: 2024-12-30)
 * @property {string} [updated] - 更新日
 * @property {string} [category] - カテゴリー（1つ）
 * @property {string[]} [tags] - タグ配列（複数）
 * @property {string} [excerpt] - 記事概要（200字程度）
 * @property {string} [thumbnail] - サムネイル画像パス
 * @property {boolean} [published] - 公開/非公開フラグ
 * @property {('qiita'|'zenn')[]} [publishTo] - 連携先設定
 * @property {Object} [externalLinks] - 外部リンク
 * @property {string} [externalLinks.qiita] - Qiitaのリンク
 * @property {string} [externalLinks.zenn] - Zennのリンク
 */

/**
 * @typedef {Object} Article
 * @extends ArticleFrontMatter
 * @property {string} content - HTML化されたMarkdown本文
 * @property {number} readingTime - 推定読了時間（分）
 * @property {TableOfContentsItem[]} headings - 目次データ
 */

/**
 * @typedef {Object} ArticleSummary
 * @extends ArticleFrontMatter
 * @property {number} readingTime - 推定読了時間（分）
 */

/**
 * @typedef {Object} TableOfContentsItem
 * @property {number} level - h1-h6の深さ (1-6)
 * @property {string} text - 見出しテキスト
 * @property {string} id - アンカーID
 */

/**
 * @typedef {Object} Category
 * @property {string} name
 * @property {number} count - 該当記事数
 */

/**
 * @typedef {Object} Tag
 * @property {string} name
 * @property {number} count - 該当記事数
 */

/**
 * @typedef {Object} BlogStats
 * @property {number} totalArticles
 * @property {Category[]} categories
 * @property {Tag[]} tags
 */

// エクスポート（JSのため実際には何もしない）
export {}
