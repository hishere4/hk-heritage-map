import { HeritageItem } from '@/lib/supabase';
import WorkshopList from './WorkshopList';

export const dynamic = 'force-dynamic';

// 服務器端獲取工作坊數據
async function getWorkshops() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/workshops?select=*,heritage_items(name,category)&is_active=eq.true&order=created_at.desc`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // 緩存 60 秒
      }
    );

    if (!response.ok) {
      console.error('Error fetching workshops:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data?.map((w: any) => ({
      ...w,
      heritage: w.heritage_items
    })) || [];
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <a href="/hk" className="text-2xl">🏛️</a>
            <div>
              <h1 className="text-base font-bold text-gray-900">工作坊預約</h1>
              <p className="text-xs text-gray-500 hidden sm:block">體驗香港非物質文化遺產</p>
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
        {workshops.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🎨</div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">暫時沒有工作坊</h2>
            <p className="text-gray-500">請稍後再來查看</p>
          </div>
        ) : (
          <WorkshopList workshops={workshops} />
        )}
      </main>
    </div>
  );
}
