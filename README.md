
# My Portfolio

このリポジトリは個人用の静的ポートフォリオサイトです。HTML/CSS/JavaScript を使ったフロントエンドのみで構成され、以下の要素を持ちます。

- 自己紹介（About）
- スキル（Skills）
- 製作物（Portfolio）
- 問い合わせフォーム（ローカルでは送信機能はありません）

## 必要なもの
- Web ブラウザ（Chrome / Safari 等）
- 任意でローカル HTTP サーバ（Python や Node の簡易サーバ）

## ファイル構成
```
my-portfolio/
├─ index.html        # サイト本体
├─ css/
│  └─ style.css     # スタイル
├─ js/
│  └─ main.js       # フロントエンド用スクリプト
└─ images/           # 画像（任意）
```

## ローカルで確認する手順
1. このプロジェクトのルートに移動します:
```bash
cd /path/to/my-portfolio
```
2. 簡易サーバを立ててブラウザで確認します（推奨）。Python の場合:
```bash
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```
または Node の `http-server` を使う場合:
```bash
npx http-server -c-1
```

## VS Code で Markdown プレビューをサイドに出す方法
1. `README.md` を開く
2. コマンドパレット（Mac: `Cmd+Shift+P`）で `Markdown: Open Preview to the Side` を実行
3. もしくはファイルを開いた状態で `Cmd+K`、次に `V` を押す（環境により動作が異なることがあります）

## 修正済みの問題点（このリポジトリで対応済み）
- `index.html` のスタイル参照を `css/style.css` に修正しました。
- `js/main.js` に含まれていた Node 向けの `require` を削除し、ブラウザ向けに安全な DOM チェックとフォーム処理を実装しました。
- 問い合わせフォームの ID をスクリプト側で `contact-form` に合わせ、送信ボタン（`#submit-button`）でバリデーションを実行するようにしました。

## 変更したくないけれど注意が必要な点
- 問い合わせフォームは現在フロントエンドでのバリデーションとアラート表示のみです。実際にメール送信や保存を行うにはバックエンド（フォーム送信 API）を用意してください。

## 今後の改善案（任意）
- GitHub Pages や Netlify でのホスティング手順と CI を追加
- フォームを Netlify Forms / Formspree 等に連携して実運用化
- スクリーンショットやデモ GIF を `README.md` に追加

## 作者
- yoshi0826taka

---
他に追加したい情報（デプロイ手順、スクリーンショット、ライセンス等）があれば教えてください。
