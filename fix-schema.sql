-- 檢查並修復 heritage_items 表結構

-- 1. 檢查現有欄位
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'heritage_items';

-- 2. 添加缺少嘅欄位
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

-- 3. 驗證欄位
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'heritage_items'
ORDER BY column_name;
