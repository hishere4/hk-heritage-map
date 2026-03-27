# Supabase 數據庫更新指引

## 步驟 1：登入 Supabase Dashboard

打開：https://app.supabase.com/project/xjslbsbvuwshdpghktad

---

## 步驟 2：執行結構更新 SQL

1. 喺左邊選單點擊 **"SQL Editor"**
2. 點擊 **"New query"**
3. 複製貼上以下 SQL：

```sql
-- 添加新欄位到 heritage_items 表
ALTER TABLE heritage_items 
ADD COLUMN IF NOT EXISTS history TEXT,
ADD COLUMN IF NOT EXISTS cultural_significance TEXT,
ADD COLUMN IF NOT EXISTS recognition_year INTEGER,
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS fun_facts JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS wikipedia_url TEXT,
ADD COLUMN IF NOT EXISTS official_website TEXT;

-- 創建 heritage_images 表
CREATE TABLE IF NOT EXISTS heritage_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_heritage_images_heritage_id ON heritage_images(heritage_id);
```

4. 點擊 **"Run"** 按鈕

---

## 步驟 3：更新數據

執行完上面 SQL 後，再開一個新 Query，複製貼上以下內容：

（完整 SQL 喺 `update-heritage-full.sql` 檔案入面）

簡短版（更新幾項重點）：

```sql
-- 更新粵劇
UPDATE heritage_items SET
  history = '粵劇起源於明朝，喺清朝發展成熟。20世紀初傳入香港，融合咗本地特色。2009年，粵劇被聯合國教科文組織列入人類非物質文化遺產代表作名錄。',
  cultural_significance = '粵劇唔單止係娛樂，更承載咗廣東話嘅語言文化同埋傳統價值觀。',
  recognition_year = 2009,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/粵劇',
  references = '[{"title": "維基百科 - 粵劇", "url": "https://zh.wikipedia.org/wiki/粵劇"}]',
  fun_facts = '["粵劇行當分為十大行", "傳統粵劇化妝要化兩個鐘頭以上"]'
WHERE name = '粵劇';

-- 更新詠春
UPDATE heritage_items SET
  history = '詠春拳起源於清朝，20世紀50年代葉問宗師將詠春拳傳入香港，開館授徒。',
  cultural_significance = '詠春拳代表咗華人武術嘅精粹，成為香港文化輸出嘅重要符號。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/詠春拳',
  fun_facts = '["詠春拳嘅木人樁係獨特嘅練習工具", "葉問宗師喺香港開設第一間詠春武館"]'
WHERE name = '詠春';

-- 更新港式奶茶
UPDATE heritage_items SET
  history = '港式奶茶起源於英國下午茶文化傳入香港後嘅本地化。2014年列入香港非遺，2017年成為香港首項聯合國非遺。',
  cultural_significance = '港式奶茶係香港飲食文化嘅象徵，代表咗香港人嘅創意同工藝精神。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/港式奶茶',
  fun_facts = '["「港女」茶葉其實係斯里蘭卡紅茶", "傳統港式奶茶要用白布茶袋沖調"]'
WHERE name = '港式奶茶';
```

---

## 步驟 4：驗證

執行以下 SQL 驗證更新：

```sql
SELECT name, history IS NOT NULL as has_history, recognition_year 
FROM heritage_items 
ORDER BY name;
```

如果見到 `has_history` 係 `true`，就代表更新成功！

---

## 完成後

更新完數據庫後，網站 Sidebar 就會顯示豐富嘅非遺資料！
