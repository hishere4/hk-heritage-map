-- HeritageHK Database Schema
-- 可擴展的非物質文化遺產地圖數據庫

-- 地區表
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- 'hk', 'cn', 'jp'
  name TEXT NOT NULL, -- '香港'
  name_en TEXT NOT NULL, -- 'Hong Kong'
  center_lat DECIMAL(10, 8) NOT NULL,
  center_lng DECIMAL(11, 8) NOT NULL,
  zoom_level INTEGER DEFAULT 12,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 非遺項目類別
CREATE TYPE heritage_category AS ENUM (
  'performing_arts', -- 表演藝術
  'crafts', -- 工藝技術
  'festivals', -- 節慶活動
  'oral_traditions', -- 口述傳統
  'food_culture', -- 飲食文化
  'martial_arts', -- 武術
  'folklore' -- 民俗
);

-- 非遺項目表
CREATE TABLE heritage_items (
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

-- 工作坊表
CREATE TABLE workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT, -- '2小時', '半天'
  price DECIMAL(10, 2),
  max_participants INTEGER DEFAULT 10,
  available_dates DATE[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 預約表
CREATE TYPE booking_type AS ENUM ('individual', 'corporate', 'school');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE SET NULL,
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  organization TEXT,
  booking_type booking_type DEFAULT 'individual',
  preferred_date DATE,
  participant_count INTEGER DEFAULT 1,
  message TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 管理員用戶表（簡單版）
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- 實際應用使用 Supabase Auth
  is_super_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_heritage_items_region ON heritage_items(region_id);
CREATE INDEX idx_heritage_items_category ON heritage_items(category);
CREATE INDEX idx_heritage_items_location ON heritage_items(lat, lng);
CREATE INDEX idx_workshops_heritage ON workshops(heritage_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- 插入香港地區
INSERT INTO regions (slug, name, name_en, center_lat, center_lng, zoom_level) VALUES
('hk', '香港', 'Hong Kong', 22.3193, 114.1694, 11);

-- 插入 20 項香港非遺項目
INSERT INTO heritage_items (region_id, name, name_en, category, description, lat, lng, address, workshop_available, tour_available) VALUES
-- 表演藝術
((SELECT id FROM regions WHERE slug = 'hk'), '粵劇', 'Cantonese Opera', 'performing_arts', '香港最主要的戲曲藝術，結合唱、做、唸、打，2009年列入聯合國教科文組織人類非物質文化遺產代表作名錄。', 22.3103, 114.1717, '油麻地戲曲中心', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '古琴藝術', 'Guqin Art', 'performing_arts', '中國最古老的彈撥樂器之一，有三千年以上歷史，音色深沉，餘韻悠長。', 22.2819, 114.1600, '中環大會堂', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '南音', 'Naam Yam', 'performing_arts', '香港傳統說唱藝術，以粵語演唱，內容多反映民間生活，是省港地區重要的曲藝形式。', 22.3085, 114.1690, '油麻地紅磚屋', true, true),

-- 工藝技術
((SELECT id FROM regions WHERE slug = 'hk'), '紮作技藝', 'Bamboo Theatre Craft', 'crafts', '傳統竹棚搭建技藝，用於戲棚、牌樓、花炮等，是香港獨特的建築工藝。', 22.3285, 114.1603, '深水埗大南街', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '中式長衫製作', 'Cheongsam Making', 'crafts', '傳統中式服裝製作技藝，講究剪裁合身、手工細緻，展現東方美學。', 22.2770, 114.1730, '灣仔太原街', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '圍棋木船製作', 'Walled Village Boat Making', 'crafts', '新界圍村傳統木船製作技藝，用於端午競渡等活動，體現水上文化。', 22.2480, 114.1547, '香港仔漁人碼頭', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '活字印刷', 'Letterpress Printing', 'crafts', '傳統鉛字排版印刷技術，見證香港出版業的輝煌歷史。', 22.3110, 114.2240, '觀塘駿業街', true, true),

-- 節慶活動
((SELECT id FROM regions WHERE slug = 'hk'), '大坑舞火龍', 'Tai Hang Fire Dragon Dance', 'festivals', '中秋節傳統活動，以珍珠草紮製的火龍長達67米，由300人舞動，場面壯觀。', 22.2785, 114.1920, '大坑浣紗街', false, true),
((SELECT id FROM regions WHERE slug = 'hk'), '長洲太平清醮', 'Cheung Chau Bun Festival', 'festivals', '長洲獨有的傳統節日，以搶包山、飄色巡遊聞名，祈求島上平安。', 22.2110, 114.0280, '長洲北帝廟', false, true),
((SELECT id FROM regions WHERE slug = 'hk'), '大澳端午遊湧', 'Tai O Dragon Boat Water Parade', 'festivals', '大澳獨特的端午節活動，漁民駕駛神艇巡遊水道，驅邪祈福。', 22.2550, 113.8640, '大澳楊侯古廟', false, true),
((SELECT id FROM regions WHERE slug = 'hk'), '中秋綵燈會', 'Mid-Autumn Lantern Carnival', 'festivals', '維多利亞公園舉辦的大型綵燈展覽，展示傳統及現代花燈藝術。', 22.2820, 114.1880, '銅鑼灣維多利亞公園', false, true),

-- 口述傳統
((SELECT id FROM regions WHERE slug = 'hk'), '客家話', 'Hakka Dialect', 'oral_traditions', '新界客家人的母語，承載著客家人的歷史文化和生活智慧。', 22.3770, 114.1930, '沙田曾大屋', false, true),
((SELECT id FROM regions WHERE slug = 'hk'), '圍頭話', 'Weitou Dialect', 'oral_traditions', '新界原居民的傳統方言，保留了古代粵語的特色。', 22.4330, 114.0660, '錦田吉慶圍', false, true),

-- 飲食文化
((SELECT id FROM regions WHERE slug = 'hk'), '港式奶茶', 'Hong Kong Style Milk Tea', 'food_culture', '以多種茶葉沖泡的濃郁奶茶，是香港茶餐廳文化的代表，2017年列入香港非遺清單。', 22.2815, 114.1550, '中環蘭芳圍', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '盆菜', 'Poon Choi', 'food_culture', '新界傳統節慶食品，將多種食材層層疊疊放於大盆中，象徵圍結和豐盛。', 22.4460, 114.0050, '屏山聚星樓', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '雞蛋仔', 'Egg Waffles', 'food_culture', '香港街頭小食代表，外脆內軟，蛋香濃郁，是幾代香港人的集體回憶。', 22.3190, 114.1690, '旺角弼街', true, true),

-- 武術
((SELECT id FROM regions WHERE slug = 'hk'), '洪拳', 'Hung Kuen', 'martial_arts', '南少林武術重要流派，拳法剛勁有力，是香港最普及的傳統武術之一。', 22.3680, 114.1170, '荃灣海壩村', true, true),
((SELECT id FROM regions WHERE slug = 'hk'), '詠春', 'Wing Chun', 'martial_arts', '著名的南拳流派，以近身短打見稱，葉問將此拳術發揚光大。', 22.3160, 114.1720, '旺角詠春體育會', true, true),

-- 民俗
((SELECT id FROM regions WHERE slug = 'hk'), '嫁囍禮儀', 'Wedding Rituals', 'folklore', '傳統中式婚嫁禮儀，包括過大禮、安床、出門等儀式，寓意吉祥美滿。', 22.2840, 114.1480, '上環文武廟', false, true),
((SELECT id FROM regions WHERE slug = 'hk'), '殯葬儀式', 'Funeral Rituals', 'folklore', '傳統中式殯葬禮儀，體現慎終追遠的孝道精神。', 22.3040, 114.1880, '紅磡萬國殯儀舘', false, true);

-- 驗證數據
SELECT 'Regions: ' || COUNT(*)::text FROM regions
UNION ALL
SELECT 'Heritage Items: ' || COUNT(*)::text FROM heritage_items;
