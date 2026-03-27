# 🔧 緊急修復：數據庫結構

## 問題
`images` 同其他新欄位唔存在喺數據庫入面。

## 解決方法

### 步驟 1：打開 Supabase SQL Editor
1. 訪問 https://app.supabase.com/project/xjslbsbvuwshdpghktad
2. 點擊左邊 **"SQL Editor"**
3. 點擊 **"New query"**

### 步驟 2：執行以下 SQL

```sql
-- 添加缺少嘅欄位
ALTER TABLE heritage_items 
ADD COLUMN IF NOT EXISTS history TEXT,
ADD COLUMN IF NOT EXISTS cultural_significance TEXT,
ADD COLUMN IF NOT EXISTS recognition_year INTEGER,
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS fun_facts JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS wikipedia_url TEXT,
ADD COLUMN IF NOT EXISTS official_website TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS tour_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS workshop_available BOOLEAN DEFAULT false;
```

### 步驟 3：點擊 "Run"

### 步驟 4：驗證
執行呢個查詢睇下有冇成功：
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'heritage_items'
ORDER BY column_name;
```

你應該見到 `history`, `cultural_significance`, `images` 等新欄位。

### 步驟 5：重新整理網站
執行完 SQL 後，喺瀏覽器按 `Ctrl + Shift + R` 重新整理網站。

---

**執行完後通知我，我再幫手更新數據！**
