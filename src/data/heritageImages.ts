// HeritageHK - 圖片庫
// 暫時空置，等待真實香港非遺圖片

export interface HeritageImage {
  url: string;
  caption: string;
  source: string;
}

// 暫無圖片 - 請手動添加真實圖片
export const heritageImages: Record<string, HeritageImage[]> = {};

// 獲取特定非遺嘅圖片
export function getHeritageImages(heritageName: string): HeritageImage[] {
  return [];
}

// 獲取所有圖片
export function getAllImages(): Record<string, HeritageImage[]> {
  return {};
}

/*
如何添加真實圖片：

方法 1：上傳到 Supabase Storage
1. 登入 Supabase Dashboard
2. 進入 Storage → 創建 bucket "heritage-images"
3. 上傳圖片，設定為 public
4. 複製圖片 URL
5. 更新 heritageImages.ts：

'粵劇': [
  {
    url: '你嘅 Supabase 圖片連結',
    caption: '粵劇表演',
    source: '你的名稱'
  }
]

方法 2：使用官方圖片
1. 訪問 https://www.heritage.gov.hk/tc/index.html
2. 右鍵複製圖片連結
3. 更新 heritageImages.ts

方法 3：使用 WikiMedia Commons
1. 訪問 https://commons.wikimedia.org
2. 搜尋 "Hong Kong Cantonese opera" 等
3. 確保圖片為公有領域或 CC 授權
4. 使用 "原始檔案" 連結
*/
