-- 導賞團數據庫結構
-- 為 heritage_items 添加導賞相關欄位

-- 1. 添加導賞相關欄位到 heritage_items
ALTER TABLE heritage_items 
ADD COLUMN IF NOT EXISTS tour_available BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS tour_duration TEXT,
ADD COLUMN IF NOT EXISTS tour_max_participants INTEGER,
ADD COLUMN IF NOT EXISTS tour_price INTEGER,
ADD COLUMN IF NOT EXISTS tour_description TEXT,
ADD COLUMN IF NOT EXISTS tour_schedule JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS meeting_point TEXT,
ADD COLUMN IF NOT EXISTS guide_name TEXT;

-- 2. 創建 tours 表（導賞團場次）
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_participants INTEGER NOT NULL,
  price INTEGER NOT NULL,
  meeting_point TEXT NOT NULL,
  guide_name TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 創建 tour_bookings 表（導賞團預約）
CREATE TABLE IF NOT EXISTS tour_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  organization TEXT,
  participant_count INTEGER NOT NULL,
  booking_type TEXT DEFAULT 'individual',
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 創建索引
CREATE INDEX IF NOT EXISTS idx_tours_heritage_id ON tours(heritage_id);
CREATE INDEX IF NOT EXISTS idx_tours_date ON tours(date);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_tour_id ON tour_bookings(tour_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_status ON tour_bookings(status);

-- 5. 更新部分 heritage_items 開啟導賞
UPDATE heritage_items SET 
  tour_available = true,
  tour_duration = '2小時',
  tour_max_participants = 20,
  tour_price = 150,
  tour_description = '專業導賞員帶領，深入探索非遺背後嘅故事',
  meeting_point = '景點入口集合',
  guide_name = '資深導賞員'
WHERE name IN ('大澳端午遊涌', '長洲太平清醮', '大坑舞火龍', '黃大仙信俗', '天后誕');

-- 6. 驗證
SELECT name, tour_available, tour_duration, tour_price FROM heritage_items WHERE tour_available = true;
