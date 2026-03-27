# HeritageHK - 香港非物質文化遺產地圖

探索香港豐富的非物質文化遺產，預約工作坊和導賞團。

## 🚀 技術棧

- **Framework**: Next.js 14 + React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Map**: Leaflet + React-Leaflet
- **Database**: Supabase (PostgreSQL + PostGIS)
- **Hosting**: Vercel

## 📁 項目結構

```
heritagehk/
├── src/
│   ├── app/
│   │   ├── [region]/          # 動態地區路由 (hk, cn, jp...)
│   │   │   └── page.tsx       # 地區地圖頁面
│   │   ├── admin/             # 管理後台
│   │   ├── page.tsx           # 首頁重定向
│   │   ├── layout.tsx         # 根佈局
│   │   └── globals.css        # 全局樣式
│   ├── components/
│   │   └── HeritageMap.tsx    # 地圖組件
│   └── lib/
│       └── supabase.ts        # Supabase 客戶端
├── supabase-schema.sql        # 數據庫結構
└── .env.local.example         # 環境變數範例
```

## 🗺️ 功能特點

- ✅ 香港地圖 + 20 項非遺標記
- ✅ 分類圖標（7 種顏色區分）
- ✅ 點擊彈窗顯示詳情
- ✅ 響應式設計（桌面 + 手機）
- ✅ 可擴展架構（支援多地區）

## 🚀 本地開發

```bash
# 安裝依賴
npm install

# 設置環境變數
cp .env.local.example .env.local
# 編輯 .env.local 填入 Supabase 資料

# 開發模式
npm run dev

# 訪問 http://localhost:3000
```

## 🗄️ 數據庫設置

1. 在 Supabase 創建新項目
2. 執行 `supabase-schema.sql` 建立表結構
3. 獲取 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`
4. 填入 `.env.local`

## 📦 部署

### Vercel

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel --prod
```

## 🌍 未來擴展

- [ ] 中國地區（廣東、福建）
- [ ] 亞洲地區（日本、韓國、台灣）
- [ ] 全球非遺地圖
- [ ] 工作坊預約系統
- [ ] B2B/B2Schools 專區

## 📄 授權

MIT License - HeritageHK
