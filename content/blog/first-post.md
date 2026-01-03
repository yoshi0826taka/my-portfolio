---
slug: "first-post"
title: "React + Viteでポートフォリオをリニューアル"
date: "2024-12-30"
updated: "2024-12-30"
category: "React"
tags: ["React", "Vite", "フロントエンド", "ポートフォリオ"]
excerpt: "HTMLで作成していたポートフォリオサイトをReact + Viteでリニューアルしました。その過程で学んだReactのベストプラクティスと設計パターンについて紹介します。"
thumbnail: "/images/blog/react-vite.jpg"
published: true
publishTo: ["qiita", "zenn"]
---

# React + Viteでポートフォリオをリニューアル

## はじめに

以前HTML/CSSで作成していたポートフォリオサイトを、React + Viteでリニューアルしました。この記事では、移行の背景と学んだことについて紹介します。

## リニューアルの背景

### 従来の方法の課題

- **再利用性の低さ**: HTMLで同じコンポーネントを何度も記述
- **状態管理の煩雑さ**: JavaScriptの手動管理が増加
- **スケーラビリティの限界**: 新機能追加時の保守が困難

### React採用の理由

1. **コンポーネント化**: 再利用可能な部品として実装
2. **効率的な開発**: ホットリロード（HMR）で開発速度が大幅向上
3. **良い開発体験**: 豊富なエコシステムと業界標準

## 実装のポイント

### Viteを選んだ理由

Viteは次世代のビルドツールで、以下の特徴があります：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
```

**メリット**：
- ⚡ 極速なHMR
- 📦 最適化されたビルド
- 🎯 シンプルな設定

### React Router導入

ページナビゲーションを実装するため、React Routerを採用しました：

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### コンポーネント設計

モジュール化されたコンポーネント構造を採用：

```
src/
├── pages/          # ページコンポーネント
├── components/     # 再利用可能なコンポーネント
├── hooks/          # カスタムフック
└── lib/            # ユーティリティ関数
```

## 学んだこと

### 1. ファイル構成の重要性

適切なディレクトリ構成により、プロジェクト全体の保守性が大幅に向上します。

### 2. Hooksの活用

`useState`、`useEffect`、`useContext`などのHooksを使い、関数型コンポーネントで十分な機能を実装できます。

### 3. パフォーマンス最適化

`React.memo`や`useMemo`を活用することで、不要なレンダリングを防ぐことができます。

## まとめ

React + Viteへの移行により：
- 開発効率が約40%向上
- コード量が約30%削減
- 新機能の追加が容易になった

エンジニアとして、技術選択と実装の質を常に意識することが、長期的なプロジェクト成功につながると改めて認識しました。

---

**関連記事**：
- [Viteの最適化テクニック](/blog/vite-optimization)
- [React Hooksの実践ガイド](/blog/react-hooks-guide)

