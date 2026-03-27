-- HeritageHK Database Schema
-- 請在 Supabase SQL Editor 執行

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
  description_en TEXT,
  lat DECIMAL(10, 8) NOT NULL,
  lng DECIMAL(11, 8) NOT NULL,
  address TEXT,
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  workshop_available BOOLEAN DEFAULT false,
  tour_available BOOLEAN DEFAULT false,
  contact_email TEXT,
  website_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入香港地區
INSERT INTO regions (slug, name, name_en, center_lat, center_lng, zoom_level) 
VALUES ('hk', '香港', 'Hong Kong', 22.3193, 114.1694, 11)
ON CONFLICT (slug) DO NOTHING;

-- 插入 20 項香港非遺（簡化版）
INSERT INTO heritage_items (region_id, name, name_en, category, description, lat, lng, address, workshop_available, tour_available)
SELECT 
  r.id,
  item.name,
  item.name_en,
  item.category::heritage_category,
  item.description,
  item.lat,
  item.lng,
  item.address,
  item.workshop_available,
  item.tour_available
FROM regions r
CROSS JOIN LATERAL (VALUES
  ('粵劇', 'Cantonese Opera', 'performing_arts', '香港最主要的戲曲藝術，2009年列入聯合國教科文組織人類非物質文化遺產代表作名錄。', 22.3103, 114.1717, '油麻地戲曲中心', true, true),
  ('古琴藝術', 'Guqin Art', 'performing_arts', '中國最古老的彈撥樂器之一，有三千年以上歷史。', 22.2819, 114.1600, '中環大會堂', true, true),
  ('南音', 'Naam Yam', 'performing_arts', '香港傳統說唱藝術，以粵語演唱。', 22.3085, 114.1690, '油麻地紅磚屋', true, true),
  ('紮作技藝', 'Bamboo Theatre Craft', 'crafts', '傳統竹棚搭建技藝，用於戲棚、牌樓、花炮等。', 22.3285, 114.1603, '深水埗大南街', true, true),
  ('中式長衫製作', 'Cheongsam Making', 'crafts', '傳統中式服裝製作技藝，講究剪裁合身。', 22.2770, 114.1730, '灣仔太原街', true, true),
  ('圍棋木船製作', 'Walled Village Boat Making', 'crafts', '新界圍村傳統木船製作技藝。', 22.2480, 114.1547, '香港仔漁人碼頭', true, true),
  ('活字印刷', 'Letterpress Printing', 'crafts', '傳統鉛字排版印刷技術。', 22.3110, 114.2240, '觀塘駿業街', true, true),
  ('大坑舞火龍', 'Tai Hang Fire Dragon Dance', 'festivals', '中秋節傳統活動，火龍長達67米。', 22.2785, 114.1920, '大坑浣紗街', false, true),
  ('長洲太平清醮', 'Cheung Chau Bun Festival', 'festivals', '長洲獨有的傳統節日，以搶包山聞名。', 22.2110, 114.0280, '長洲北帝廟', false, true),
  ('大澳端午遊湧', 'Tai O Dragon Boat Water Parade', 'festivals', '大澳獨特的端午節活動。', 22.2550, 113.8640, '大澳楊侯古廟', false, true),
  ('中秋綵燈會', 'Mid-Autumn Lantern Carnival', 'festivals', '維多利亞公園舉辦的大型綵燈展覽。', 22.2820, 114.1880, '銅鑼灣維多利亞公園', false, true),
  ('客家話', 'Hakka Dialect', 'oral_traditions', '新界客家人的母語。', 22.3770, 114.1930, '沙田曾大屋', false, true),
  ('圍頭話', 'Weitou Dialect', 'oral_traditions', '新界原居民的傳統方言。', 22.4330, 114.0660, '錦田吉慶圍', false, true),
  ('港式奶茶', 'Hong Kong Style Milk Tea', 'food_culture', '香港茶餐廳文化的代表，2017年列入香港非遺清單。', 22.2815, 114.1550, '中環蘭芳圍', true, true),
  ('盆菜', 'Poon Choi', 'food_culture', '新界傳統節慶食品。', 22.4460, 114.0050, '屏山聚星樓', true, true),
  ('雞蛋仔', 'Egg Waffles', 'food_culture', '香港街頭小食代表。', 22.3190, 114.1690, '旺角弼街', true, true),
  ('洪拳', 'Hung Kuen', 'martial_arts', '南少林武術重要流派。', 22.3680, 114.1170, '荃灣海壩村', true, true),
  ('詠春', 'Wing Chun', 'martial_arts', '著名的南拳流派，葉問將此拳術發揚光大。', 22.3160, 114.1720, '旺角詠春體育會', true, true),
  ('嫁囍禮儀', 'Wedding Rituals', 'folklore', '傳統中式婚嫁禮儀。', 22.2840, 114.1480, '上環文武廟', false, true),
  ('殯葬儀式', 'Funeral Rituals', 'folklore', '傳統中式殯葬禮儀。', 22.3040, 114.1880, '紅磡萬國殯儀舘', false, true)
) AS item(name, name_en, category, description, lat, lng, address, workshop_available, tour_available)
WHERE r.slug = 'hk'
ON CONFLICT DO NOTHING;

-- 驗證結果
SELECT 'Regions: ' || COUNT(*)::text FROM regions
UNION ALL
SELECT 'Heritage Items: ' || COUNT(*)::text FROM heritage_items;
