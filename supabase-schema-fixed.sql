-- HeritageHK Database Schema

-- 地區表
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  center_lat DECIMAL(10, 8) NOT NULL,
  center_lng DECIMAL(11, 8) NOT NULL,
  zoom_level INTEGER DEFAULT 12,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 非遺項目類別
DO $$ BEGIN
  CREATE TYPE heritage_category AS ENUM (
    'performing_arts', 'crafts', 'festivals', 'oral_traditions', 'food_culture', 'martial_arts', 'folklore'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 非遺項目表
CREATE TABLE IF NOT EXISTS heritage_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_en TEXT,
  category heritage_category NOT NULL,
  description TEXT NOT NULL,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  address TEXT,
  workshop_available BOOLEAN DEFAULT false,
  tour_available BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入香港地區
INSERT INTO regions (slug, name, name_en, center_lat, center_lng, zoom_level) 
VALUES ('hk', '香港', 'Hong Kong', 22.3193, 114.1694, 11)
ON CONFLICT (slug) DO NOTHING;

-- 插入 20 項香港非遺（使用 INSERT INTO 語法）
INSERT INTO heritage_items (region_id, name, category, description, lat, lng, address, workshop_available, tour_available)
SELECT r.id, '粵劇', 'performing_arts'::heritage_category, '香港最主要的戲曲藝術，2009年列入聯合國教科文組織人類非物質文化遺產代表作名錄。', 22.3103, 114.1717, '油麻地戲曲中心', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '古琴藝術', 'performing_arts'::heritage_category, '中國最古老的彈撥樂器之一，有三千年以上歷史。', 22.2819, 114.1600, '中環大會堂', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '南音', 'performing_arts'::heritage_category, '香港傳統說唱藝術，以粵語演唱。', 22.3085, 114.1690, '油麻地紅磚屋', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '紮作技藝', 'crafts'::heritage_category, '傳統竹棚搭建技藝，用於戲棚、牌樓、花炮等。', 22.3285, 114.1603, '深水埗大南街', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '中式長衫製作', 'crafts'::heritage_category, '傳統中式服裝製作技藝，講究剪裁合身。', 22.2770, 114.1730, '灣仔太原街', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '圍棋木船製作', 'crafts'::heritage_category, '新界圍村傳統木船製作技藝。', 22.2480, 114.1547, '香港仔漁人碼頭', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '活字印刷', 'crafts'::heritage_category, '傳統鉛字排版印刷技術。', 22.3110, 114.2240, '觀塘駿業街', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '大坑舞火龍', 'festivals'::heritage_category, '中秋節傳統活動，火龍長達67米。', 22.2785, 114.1920, '大坑浣紗街', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '長洲太平清醮', 'festivals'::heritage_category, '長洲獨有的傳統節日，以搶包山聞名。', 22.2110, 114.0280, '長洲北帝廟', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '大澳端午遊湧', 'festivals'::heritage_category, '大澳獨特的端午節活動。', 22.2550, 113.8640, '大澳楊侯古廟', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '中秋綵燈會', 'festivals'::heritage_category, '維多利亞公園舉辦的大型綵燈展覽。', 22.2820, 114.1880, '銅鑼灣維多利亞公園', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '客家話', 'oral_traditions'::heritage_category, '新界客家人的母語。', 22.3770, 114.1930, '沙田曾大屋', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '圍頭話', 'oral_traditions'::heritage_category, '新界原居民的傳統方言。', 22.4330, 114.0660, '錦田吉慶圍', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '港式奶茶', 'food_culture'::heritage_category, '香港茶餐廳文化的代表，2017年列入香港非遺清單。', 22.2815, 114.1550, '中環蘭芳圍', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '盆菜', 'food_culture'::heritage_category, '新界傳統節慶食品。', 22.4460, 114.0050, '屏山聚星樓', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '雞蛋仔', 'food_culture'::heritage_category, '香港街頭小食代表。', 22.3190, 114.1690, '旺角弼街', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '洪拳', 'martial_arts'::heritage_category, '南少林武術重要流派。', 22.3680, 114.1170, '荃灣海壩村', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '詠春', 'martial_arts'::heritage_category, '著名的南拳流派，葉問將此拳術發揚光大。', 22.3160, 114.1720, '旺角詠春體育會', true, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '嫁囍禮儀', 'folklore'::heritage_category, '傳統中式婚嫁禮儀。', 22.2840, 114.1480, '上環文武廟', false, true FROM regions r WHERE r.slug = 'hk'
UNION ALL SELECT r.id, '殯葬儀式', 'folklore'::heritage_category, '傳統中式殯葬禮儀。', 22.3040, 114.1880, '紅磡萬國殯儀舘', false, true FROM regions r WHERE r.slug = 'hk';

-- 驗證結果
SELECT 'Regions: ' || COUNT(*)::text FROM regions
UNION ALL
SELECT 'Heritage Items: ' || COUNT(*)::text FROM heritage_items;
