import { formatDistanceToNow, format } from 'date-fns'
import { ja } from 'date-fns/locale'

/**
 * 日付をフォーマット（例: 2024-12-30 → 2024年12月30日）
 * @param {string} dateString - ISO 8601形式の日付
 * @returns {string}
 */
export function formatDate(dateString) {
  try {
    return format(new Date(dateString), 'yyyy年MM月dd日', { locale: ja })
  } catch (error) {
    console.error('Date format error:', error)
    return dateString
  }
}

/**
 * 相対的な時間を表示（例: 3日前）
 * @param {string} dateString - ISO 8601形式の日付
 * @returns {string}
 */
export function formatRelativeDate(dateString) {
  try {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ja,
    })
  } catch (error) {
    console.error('Relative date format error:', error)
    return dateString
  }
}

/**
 * テキストをスラッグに変換
 * @param {string} text
 * @returns {string}
 */
export function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

/**
 * テキストを指定文字数で切り詰める
 * @param {string} text
 * @param {number} length
 * @returns {string}
 */
export function truncate(text, length = 100) {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * 配列から重複を削除
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArray(arr) {
  return [...new Set(arr)]
}

/**
 * オブジェクトの特定のキーをフィルター
 * @param {Object} obj
 * @param {Array} keys
 * @returns {Object}
 */
export function pickKeys(obj, keys) {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {})
}
