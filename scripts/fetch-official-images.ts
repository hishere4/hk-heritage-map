/**
 * 香港非遺官方圖片獲取工具
 * 用法: node fetch-official-images.ts
 * 
 * 此工具幫助你從官方網站獲取真實圖片連結
 */

const OFFICIAL_SOURCES = {
  // 香港非物質文化遺產辦事處
  heritage_office: {
    name: '香港非物質文化遺產辦事處',
    url: 'https://www.heritage.gov.hk/tc/index.html',
    heritage_pages: {
      '粵劇': '/tc/performing_arts/cantonese_opera.html',
      '詠春': '/tc/martial_arts/wing_chun.html',
      '長洲太平清醮': '/tc/festivals/cheung_chau_bun_festival.html',
      '大坑舞火龍': '/tc/festivals/tai_hang_fire_dragon.html',
      '大澳端午遊涌': '/tc/festivals/tai_o_dragon_boat.html',
      // ... 更多項目
    }
  },
  
  // 康文署
  lcsd: {
    name: '康樂及文化事務署',
    url: 'https://www.lcsd.gov.hk/',
  },
  
  // 香港旅遊發展局
  discover_hk: {
    name: '香港旅遊發展局',
    url: 'https://www.discoverhongkong.com/',
  }
};

// 已驗證嘅真實圖片連結（手動更新）
const VERIFIED_IMAGES: Record<string, string[]> = {
  // 請手動添加驗證過嘅圖片 URL
  // 格式：['https://...', 'https://...']
  
  // 示例（請替換為真實 URL）：
  // '粵劇': ['https://www.heritage.gov.hk/images/opera.jpg'],
};

console.log('官方圖片來源：');
console.log('================');
Object.entries(OFFICIAL_SOURCES).forEach(([key, source]) => {
  console.log(`\n${source.name}`);
  console.log(`網址: ${source.url}`);
});

console.log('\n\n獲取圖片步驟：');
console.log('================');
console.log('1. 訪問 https://www.heritage.gov.hk/tc/index.html');
console.log('2. 點擊你想獲取圖片嘅非遺項目');
console.log('3. 右鍵點擊圖片 → 複製圖片連結');
console.log('4. 將連結貼上到 src/data/heritageImages.ts');
console.log('5. 重新部署網站');

console.log('\n\n替代方案：');
console.log('================');
console.log('上傳自己拍攝嘅照片到 Supabase Storage：');
console.log('1. 登入 Supabase Dashboard');
console.log('2. 進入 Storage → 創建 bucket "heritage-images"');
console.log('3. 上傳圖片');
console.log('4. 獲取公開 URL');
console.log('5. 更新 heritageImages.ts');
