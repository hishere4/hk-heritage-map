import { supabase } from '@/lib/supabase';
import TourList from './TourList';

export const dynamic = 'force-dynamic';

// 獲取有導賞嘅非遺項目
async function getHeritageWithTours() {
  const { data, error } = await supabase
    .from('heritage_items')
    .select(`
      *,
      tours:tour_id(
        id,
        name,
        date,
        start_time,
        end_time,
        max_participants,
        price,
        meeting_point,
        guide_name
      )
    `)
    .eq('tour_available', true)
    .eq('is_published', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching heritage with tours:', error);
    return [];
  }
  
  return data || [];
}

export default async function ToursPage() {
  const heritageItems = await getHeritageWithTours();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <a href="/hk" className="text-2xl">🏛️</a>
            <div>
              <h1 className="text-base font-bold text-gray-900">導賞團預約</h1>
              <p className="text-xs text-gray-500 hidden sm:block">深入探索香港非物質文化遺產</p>
            </div>
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
        {heritageItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🚶</div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">暫時沒有導賞團</h2>
            <p className="text-gray-500">請稍後再來查看</p>
          </div>
        ) : (
          <TourList heritageItems={heritageItems} />
        )}
      </main>
    </div>
  );
}
