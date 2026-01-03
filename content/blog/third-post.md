---
slug: "third-post"
title: "Web APIを使いこなす"
date: "2024-12-25"
updated: "2024-12-25"
category: "JavaScript"
tags: ["JavaScript", "API", "非同期処理"]
excerpt: "Fetch API、async/await、Promiseなど、Web APIを効果的に使う方法を実践例を交えて解説します。"
thumbnail: "/images/blog/web-api.jpg"
published: true
publishTo: ["zenn"]
---

# Web APIを使いこなす

## はじめに

モダンなWebアプリケーション開発では、サーバーとの通信は不可欠です。この記事では、Web APIを安全に使うコツを紹介します。

## Fetch APIの基本

### シンプルなGETリクエスト

```javascript
// データ取得
fetch('/api/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

### async/awaitを使った記述

```javascript
// モダンな書き方
async function getUsers() {
  try {
    const response = await fetch('/api/users')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

## エラーハンドリング

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url)
    
    // ステータスコードのチェック
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

## まとめ

Web APIを正しく使いこなすことは、堅牢で保守性の高いWebアプリケーション開発の基礎です。

