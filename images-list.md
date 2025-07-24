# さくらクリニック 必要画像リスト

## 画像ディレクトリ構造
```
/images/
├── logo/
├── staff/
├── clinic/
├── services/
└── blog/
```

## 必要な画像ファイル一覧

### 1. ロゴ・ブランディング
- `logo.png` - クリニックのロゴ（透過PNG推奨）
- `favicon.ico` - ファビコン

### 2. スタッフ写真
- `staff/tanaka-doctor.jpg` - 田中院長の写真
- `staff/sato-doctor.jpg` - 佐藤副院長の写真
- `staff/nurse1.jpg` - 看護師1の写真
- `staff/nurse2.jpg` - 看護師2の写真
- `staff/receptionist.jpg` - 受付スタッフの写真

### 3. クリニック施設
- `clinic/exterior.jpg` - クリニック外観
- `clinic/entrance.jpg` - エントランス
- `clinic/reception.jpg` - 受付
- `clinic/waiting-room.jpg` - 待合室
- `clinic/consultation-room1.jpg` - 診察室1（歯科）
- `clinic/consultation-room2.jpg` - 診察室2（皮膚科）
- `clinic/treatment-room.jpg` - 処置室

### 4. 診療サービス
- `services/dental-checkup.jpg` - 歯科検診
- `services/dental-treatment.jpg` - 歯科治療
- `services/whitening.jpg` - ホワイトニング
- `services/orthodontics.jpg` - 歯科矯正
- `services/skin-consultation.jpg` - 皮膚科診察
- `services/laser-treatment.jpg` - レーザー治療
- `services/skin-care.jpg` - スキンケア

### 5. ブログ用画像
- `blog/summer-holiday.jpg` - 夏季休診のお知らせ
- `blog/tooth-brushing.jpg` - 歯磨き方法
- `blog/uv-protection.jpg` - 紫外線対策
- `blog/new-equipment.jpg` - 新機器導入
- `blog/kids-dental.jpg` - 子どもの虫歯予防
- `blog/atopy-treatment.jpg` - アトピー治療
- `blog/implant.jpg` - インプラント
- `blog/acne-care.jpg` - ニキビケア

### 6. ヒーロー・バナー画像
- `hero-image.jpg` - トップページのメインビジュアル
- `hero-image-mobile.jpg` - モバイル用メインビジュアル

### 7. その他
- `map-placeholder.jpg` - 地図のプレースホルダー（Google Maps使用前）
- `calendar-bg.png` - カレンダーの背景パターン（オプション）

## 推奨画像仕様

### 画像サイズ
- スタッフ写真: 400x500px（縦長）
- 施設写真: 800x600px
- サービス写真: 600x400px
- ブログ画像: 800x450px（16:9）
- ヒーロー画像: 1920x800px

### ファイル形式
- 写真: JPG（圧縮率80-90%）
- ロゴ・アイコン: PNG（透過）
- 大きな背景画像: WebP（対応ブラウザ用）

### ファイルサイズ
- 各画像は最大300KB以下に圧縮
- ヒーロー画像は最大500KB以下

## 画像の配置場所

1. **index.html**
   - ヒーロー画像
   - スタッフ写真（田中院長、佐藤副院長）
   - クリニック外観

2. **services.html**
   - 各診療サービスの画像

3. **profile.html**
   - 全スタッフの写真
   - クリニック施設の写真

4. **blog.html**
   - 各記事のサムネイル画像

5. **contact.html**
   - クリニック外観
   - 受付の写真

## 注意事項
- 患者様のプライバシーに配慮し、顔が写っている場合は必ず許可を得る
- 医療機器や治療風景は清潔感を重視
- 桜（さくら）のテーマに合わせ、明るく温かみのある色調で統一