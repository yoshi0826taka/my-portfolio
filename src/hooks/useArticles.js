import { useState, useEffect } from 'react'
import {
  getAllArticles,
  getArticleBySlug,
  getAdjacentArticles,
} from '../lib/blog'

/**
 * 全記事とメタデータを取得するフック
 * @returns {{articles: Array, categories: Array, tags: Array, isLoading: boolean, error: Error|null}}
 */
export function useArticles() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        const data = await getAllArticles()
        setArticles(data.articles)
        setCategories(data.categories)
        setTags(data.tags)
        setError(null)
      } catch (err) {
        console.error('Failed to load articles:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  return { articles, categories, tags, isLoading, error }
}

/**
 * 単一の記事と前後の記事を取得するフック
 * @param {string} slug - 記事のスラッグ
 * @returns {{article: Object|null, prevArticle: Object|null, nextArticle: Object|null, isLoading: boolean, error: Error|null}}
 */
export function useArticle(slug) {
  const [article, setArticle] = useState(null)
  const [prevArticle, setPrevArticle] = useState(null)
  const [nextArticle, setNextArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    const loadArticle = async () => {
      try {
        setIsLoading(true)
        const articleData = await getArticleBySlug(slug)
        const adjacentData = await getAdjacentArticles(slug)

        setArticle(articleData)
        setPrevArticle(adjacentData.prev)
        setNextArticle(adjacentData.next)
        setError(null)
      } catch (err) {
        console.error('Failed to load article:', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadArticle()
  }, [slug])

  return { article, prevArticle, nextArticle, isLoading, error }
}
