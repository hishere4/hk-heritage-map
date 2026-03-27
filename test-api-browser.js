// 直接在瀏覽器 console 測試
// 複製呢段代碼到網站 Console 執行

async function testAPI() {
  console.log('🔍 測試 API...');
  
  const res = await fetch(
    'https://xjslbsbvuwshdpghktad.supabase.co/rest/v1/heritage_items?select=*&name=eq.%E7%B2%B5%E5%8A%87',
    {
      headers: {
        'apikey': 'sb_publishable_1owGccOH1QFx3Bz4oopvfw_zM66U5B0',
        'Authorization': 'Bearer sb_publishable_1owGccOH1QFx3Bz4oopvfw_zM66U5B0',
      }
    }
  );
  
  const data = await res.json();
  console.log('API 返回:', data[0]);
  console.log('有 history?', !!data[0]?.history);
  console.log('有 images?', !!(data[0]?.images?.length > 0 || data[0]?.images === null));
}

testAPI();
