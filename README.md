# さくらクリニック Webサイトテンプレート 🌸

歯科・皮膚科医院向けの完全レスポンシブWebサイトテンプレートです。

## 🌟 主な機能

### 1. **マルチページ構成**
- **ホーム** (`index.html`) - クリニックの概要と主要セクション
- **診療内容** (`services.html`) - 歯科・皮膚科の診療項目詳細
- **プロフィール** (`profile.html`) - 医師・スタッフ紹介、施設案内
- **メニュー・料金** (`menu.html`) - 保険診療・自費診療の料金表
- **ブログ** (`blog.html`) - お知らせとコラム記事
- **お問い合わせ** (`contact.html`) - 連絡先情報とお問い合わせフォーム
- **Web予約** (`reservation.html`) - カレンダー式予約システム

### 2. **デザイン特徴**
- 🌸 さくら色（ピンク）をメインカラーとした優しいデザイン
- 📱 完全レスポンシブ対応（PC・タブレット・スマートフォン）
- 🎨 モダンなカード型レイアウト
- ✨ スムーズなアニメーション効果
- 🔤 Zen Maru Gothicフォントで柔らかい印象

### 3. **機能的特徴**
- 📅 カレンダー型Web予約システム（24時間前まで予約可能）
- 🔗 スタッフカードから個人プロフィールへのリンク
- 📍 Google Maps連携
- 📧 お問い合わせフォーム
- 🔒 プライバシーポリシーモーダル
- 🍔 モバイル用ハンバーガーメニュー

## 🛠️ 技術仕様

### 使用技術
- HTML5
- CSS3（カスタムプロパティ使用）
- Vanilla JavaScript
- Google Fonts（Zen Maru Gothic）

### ブラウザ対応
- Chrome（推奨）
- Firefox
- Safari
- Edge
- モバイルブラウザ

## 📁 ファイル構成

```
clinic-website-template/
├── index.html              # ホームページ
├── services.html           # 診療内容
├── profile.html            # プロフィール
├── menu.html               # メニュー・料金
├── blog.html               # ブログ
├── contact.html            # お問い合わせ
├── reservation.html        # Web予約
├── css/
│   └── style.css          # スタイルシート
├── js/
│   ├── script.js          # 共通スクリプト
│   └── reservation.js     # 予約システム用スクリプト
├── images/                 # 画像フォルダ
└── README.md              # このファイル
```

## 🚀 使い方

### 1. ダウンロード
```bash
git clone https://github.com/cocoroai/clinic-website-template.git
```

### 2. カスタマイズ
以下の項目を編集してください：

#### クリニック情報
- クリニック名
- 住所・電話番号
- 診療時間
- 休診日

#### 画像の差し替え
`images/`フォルダ内の画像を差し替えてください：
- `logo.png` - ロゴ画像
- `hero-image.jpg` - メインビジュアル
- スタッフ写真（`tanaka-doctor.jpg`, `sato-doctor.jpg` など）
- 施設写真（`exterior.jpg`, `waiting-room.jpg` など）

#### カラーテーマの変更
`css/style.css`の最初にあるCSS変数を編集：
```css
:root {
    --primary-color: #F8BBD9;    /* メインカラー */
    --primary-dark: #E91E63;     /* 濃いピンク */
    --primary-light: #FCE4EC;    /* 薄いピンク */
}
```

## 📝 開発履歴

### 初期開発
- 基本的なマルチページ構成の実装
- ブルー系テーマでの初期デザイン

### デザイン改修
- さくら（ピンク）テーマへの全面リニューアル
- Zen Maru Gothicフォントの採用
- カード型レイアウトの導入

### 機能追加
- カレンダー式Web予約システムの実装
- スタッフ・サービスカードのリンク機能
- プライバシーポリシーモーダル
- レスポンシブナビゲーション改善

### バグ修正
- カレンダーの日付表示不具合の修正
- モバイルナビゲーションの視認性改善
- ページヘッダーの色調整
- HTMLタグ構造の修正

## 📞 サポート

ご質問やカスタマイズのご相談は、GitHubのIssuesまでお願いします。

## 📄 ライセンス

このテンプレートは自由にご使用いただけます。商用利用も可能です。

---

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>