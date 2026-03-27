import HongKongPageClient from './HongKongPageClient';
import { HeritageItem } from '@/lib/supabase';

// 獲取數據 - 確保獲取所有欄位
async function getHeritageItems(): Promise<HeritageItem[]> {
  try {
    // 明確指定要獲取嘅欄位
    const selectFields = [
      'id', 'name', 'name_en', 'category', 'description',
      'history', 'cultural_significance', 'recognition_year',
      'references', 'fun_facts', 'wikipedia_url',
      'lat', 'lng', 'address', 'images',
      'workshop_available', 'tour_available'
    ].join(',');
    
    const res = await fetch(
      `https://xjslbsbvuwshdpghktad.supabase.co/rest/v1/heritage_items?select=${selectFields}&is_published=eq.true&order=name`,
      {
        headers: {
          'apikey': 'sb_publishable_1owGccOH1QFx3Bz4oopvfw_zM66U5B0',
          'Authorization': 'Bearer sb_publishable_1owGccOH1QFx3Bz4oopvfw_zM66U5B0',
        },
        cache: 'no-store',
      }
    );
    
    if (!res.ok) {
      console.error('API Error:', res.status, await res.text());
      return [];
    }
    
    const data = await res.json();
    
    // 調試：檢查第一項數據
    if (data[0]) {
      console.log('First item from API:', {
        name: data[0].name,
        hasHistory: !!data[0].history,
        hasCulturalSignificance: !!data[0].cultural_significance,
        hasImages: !!data[0].images?.length
      });
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function HongKongPage() {
  const items = await getHeritageItems();
  
  // 調試輸出
  console.log(`Loaded ${items.length} heritage items`);
  if (items[0]) {
    console.log('First item history:', items[0].history?.substring(0, 50));
  }
  
  return <HongKongPageClient items={items} />;
}
