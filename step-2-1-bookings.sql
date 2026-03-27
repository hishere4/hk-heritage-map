-- Step 2.1: Booking System Backend

-- 建立 bookings 表
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE SET NULL,
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  organization TEXT,
  booking_type TEXT DEFAULT 'individual', -- individual, corporate, school
  participant_count INTEGER DEFAULT 1,
  preferred_date DATE,
  message TEXT,
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at);

-- 驗證
SELECT 'Bookings table created' as status;
