-- HeritageHK 數據庫擴展 - 豐富內容欄位
-- 執行此 SQL 以添加更多內容欄位

-- 添加新欄位到 heritage_items 表
ALTER TABLE heritage_items
ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT NULL,              -- 必睇亮點（陣列）
ADD COLUMN IF NOT EXISTS how_to_experience TEXT,                      -- 體驗方式
ADD COLUMN IF NOT EXISTS best_time TEXT,                              -- 最佳時間
ADD COLUMN IF NOT EXISTS tips JSONB DEFAULT NULL,                     -- 體驗貼士（陣列）
ADD COLUMN IF NOT EXISTS transportation TEXT,                         -- 交通指南
ADD COLUMN IF NOT EXISTS nearby_attractions JSONB DEFAULT NULL,       -- 附近景點
ADD COLUMN IF NOT EXISTS master_quotes JSONB DEFAULT NULL,            -- 傳承人語錄
ADD COLUMN IF NOT EXISTS practical_info JSONB DEFAULT NULL;           -- 實用資訊

-- 添加索引（如果用於搜索/過濾）
CREATE INDEX IF NOT EXISTS idx_heritage_items_highlights ON heritage_items USING GIN (highlights);
CREATE INDEX IF NOT EXISTS idx_heritage_items_tips ON heritage_items USING GIN (tips);

-- 註釋
COMMENT ON COLUMN heritage_items.highlights IS '必睇亮點，JSON 陣列格式';
COMMENT ON COLUMN heritage_items.how_to_experience IS '點樣體驗此非遺';
COMMENT ON COLUMN heritage_items.best_time IS '最佳體驗時間';
COMMENT ON COLUMN heritage_items.tips IS '體驗貼士，JSON 陣列格式';
COMMENT ON COLUMN heritage_items.transportation IS '交通指南';
COMMENT ON COLUMN heritage_items.nearby_attractions IS '附近景點，JSON 陣列格式';
COMMENT ON COLUMN heritage_items.master_quotes IS '傳承人語錄，JSON 陣列格式';
COMMENT ON COLUMN heritage_items.practical_info IS '實用資訊（票價、時間等），JSON 格式';

-- 更新現有數據嘅範例（以粵劇為例）
UPDATE heritage_items 
SET 
  highlights = '[
    "欣賞傳統面譜化妝藝術",
    "聆聽獨特『梆黃』唱腔", 
    "觀賞水袖功同做手身段",
    "認識十大行當角色分類",
    "感受鑼鼓點帶嚟嘅緊張感"
  ]'::jsonb,
  how_to_experience = '西九戲曲中心係欣賞粵劇嘅最佳地點。建議首次體驗者選擇經典劇目如《帝女花》香夭。演出前可參加免費導賞，了解劇目背景。',
  best_time = '全年均有演出，農曆新年期間會有特別賀歲劇目。每年 11 月戲曲節更有多場國際級演出。',
  tips = '[
    "演出約 3 小時，建議預留充足時間",
    "場內禁止攝影錄音，請尊重版權",
    "提早 30 分鐘到場閱讀場刊",
    "建議穿著端莊，避免短褲拖鞋"
  ]'::jsonb,
  transportation = '港鐵柯士甸站 F 出口，經圓方商場天橋步行約 5 分鐘即達。巴士可選乘 260X、268B、269B 至「戲曲中心」站。',
  updated_at = NOW()
WHERE name = '粵劇';

-- 驗證欄位已添加
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'heritage_items' 
ORDER BY ordinal_position;
