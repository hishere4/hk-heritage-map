-- Add workshops table to HeritageHK

CREATE TABLE IF NOT EXISTS workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  max_participants INTEGER DEFAULT 10,
  available_dates DATE[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入示例工作坊數據
INSERT INTO workshops (heritage_id, title, description, duration, price, max_participants, is_active)
SELECT 
  h.id,
  '粵劇化妝與戲服體驗',
  '親身體驗粵劇化妝過程，試穿精緻戲服，了解粵劇藝術的魅力。',
  '2小時',
  380,
  8,
  true
FROM heritage_items h WHERE h.name = '粵劇'
UNION ALL
SELECT 
  h.id,
  '古琴初體驗',
  '學習古琴基本指法，演奏簡單曲目，感受古琴的悠遠韻味。',
  '1.5小時',
  280,
  6,
  true
FROM heritage_items h WHERE h.name = '古琴藝術'
UNION ALL
SELECT 
  h.id,
  '港式奶茶沖調工作坊',
  '學習正宗港式奶茶的沖調技巧，品嘗不同茶葉的風味。',
  '1小時',
  180,
  12,
  true
FROM heritage_items h WHERE h.name = '港式奶茶'
UNION ALL
SELECT 
  h.id,
  '詠春拳體驗班',
  '學習詠春拳基本套路，了解武術文化與哲學。',
  '1.5小時',
  220,
  10,
  true
FROM heritage_items h WHERE h.name = '詠春';

-- 驗證
SELECT 'Workshops created: ' || COUNT(*)::text FROM workshops;
