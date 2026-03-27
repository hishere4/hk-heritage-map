import { supabase } from '@/lib/supabase';
import AdminBookingList from './AdminBookingList';

export const dynamic = 'force-dynamic';

// 服務器端獲取預約數據
async function getBookings() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/bookings?select=*,workshop:workshop_id(title),heritage:heritage_id(name)&order=created_at.desc`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 }, // 無緩存
      }
    );

    if (!response.ok) {
      console.error('Error fetching bookings:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold text-gray-900">預約管理</h1>
            <p className="text-xs text-gray-500">管理所有工作坊和導賞預約</p>
          </div>
          <a 
            href="/hk" 
            className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 hover:bg-gray-50 rounded-lg transition-colors"
          >
            ← 返回地圖
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdminBookingList bookings={bookings} />
      </main>
    </div>
  );
}
