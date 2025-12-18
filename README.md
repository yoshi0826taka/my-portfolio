# My Portfolio

このリポジトリは個人用の **React ベース** ポートフォリオサイトです。React + Vite を使ったモダンなフロントエンド構成で、以下の要素を持ちます。

- 自己紹介（About）
- スキル（Skills）- アニメーション対応
- 製作物（Portfolio）
- 問い合わせフォーム（フロントエンドバリデーション）

## 技術スタック

- **React 18** - UI フレームワーク
- **Vite** - 開発サーバ・ビルドツール
- **CSS** - スタイリング（レスポンシブ対応）

## 必要なもの

- Node.js 16+ および npm / yarn
- Web ブラウザ（最新版推奨）

## ファイル構成

```
my-portfolio/
├─ index.html           # エントリーポイント
├─ src/
│  ├─ App.jsx          # メインアプリケーション
│  ├─ main.jsx         # React ルート
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Hero.jsx
│  │  ├─ About.jsx
│  │  ├─ Skills.jsx
│  │  ├─ Portfolio.jsx
│  │  ├─ Contact.jsx
│  │  └─ Footer.jsx
│  └─ styles/
│     └─ index.css
├─ public/              # 静的資産（任意）
├─ vite.config.js       # Vite 設定
└─ package.json
```

## セットアップと実行

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 開発サーバの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、ホットリロード対応の開発環境が立ち上がります。

### 3. 本番ビルド

```bash
npm run build
```

`dist/` ディレクトリに最適化されたビルドが生成されます。

### 4. ビルド結果のプレビュー

```bash
npm run preview
```

## 機能

- ✅ **ハンバーガーメニュー** - レスポンシブナビゲーション
- ✅ **スムーススクロール** - セクション間の滑らかな移動
- ✅ **スキルバーアニメーション** - Intersection Observer を活用
- ✅ **フォームバリデーション** - React state で管理
- ✅ **レスポンシブデザイン** - タブレット・スマートフォン対応

## VS Code で Markdown プレビューをサイドに出す方法

1. `README.md` を開く
2. コマンドパレット（Mac: `Cmd+Shift+P`）で `Markdown: Open Preview to the Side` を実行
3. もしくはファイルを開いた状態で `Cmd+K` その後 `V` を押す

## デプロイ

### GitHub Pages でホスティング

1. `vite.config.js` に以下を追加:
```javascript
export default {
  base: '/my-portfolio/',
  // ... 其他設定
}
```

2. デプロイ用スクリプトをセットアップ（GitHub Actions など）

### Netlify / Vercel

1. `npm run build` でビルド
2. `dist/` ディレクトリをアップロード
3. 環境に応じて自動デプロイを設定

## 注意点

- 問い合わせフォームは現在フロントエンドのバリデーション・UI のみです。メール送信機能を追加するには、バックエンド API の構築や Netlify Forms / Formspree などの外部サービス利用を検討してください。
- 本番環境ではソースマップの生成を無効化してください（vite.config.js を参照）。

## 今後の改善案

- Tailwind CSS の導入でスタイル管理を効率化
- TypeScript への移行で型安全性を確保
- フォーム送信機能（バックエンド連携）
- ページネーション・無限スクロール対応
- ダークモード対応
- SEO 最適化（React Helmet など）

## 作者

- yoshi0826taka

---

質問やご提案があればお気軽にどうぞ！
