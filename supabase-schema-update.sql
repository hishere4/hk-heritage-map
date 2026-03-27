-- HeritageHK 數據庫結構更新
-- 日期: 2026-03-25
-- 目標: 為 heritage_items 表添加詳細資料欄位

-- 1. 添加新欄位到 heritage_items 表
ALTER TABLE heritage_items 
ADD COLUMN IF NOT EXISTS history TEXT,
ADD COLUMN IF NOT EXISTS cultural_significance TEXT,
ADD COLUMN IF NOT EXISTS recognition_year INTEGER,
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS fun_facts JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS wikipedia_url TEXT,
ADD COLUMN IF NOT EXISTS official_website TEXT;

-- 2. 創建 heritage_images 表（存儲多張圖片）
CREATE TABLE IF NOT EXISTS heritage_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 創建索引
CREATE INDEX IF NOT EXISTS idx_heritage_images_heritage_id ON heritage_images(heritage_id);
CREATE INDEX IF NOT EXISTS idx_heritage_images_primary ON heritage_images(heritage_id, is_primary);

-- 4. 驗證
SELECT 'Schema update completed' as status;
