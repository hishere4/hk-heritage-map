// HeritageHK - 圖片庫
// 暫時留空，等待用戶提供真實圖片

export interface HeritageImage {
  url: string;
  caption: string;
  source: string;
}

// 暫無圖片 - 用戶可之後上傳到 Supabase Storage
export const heritageImages: Record<string, HeritageImage[]> = {};

// 獲取特定非遺嘅圖片
export function getHeritageImages(heritageName: string): HeritageImage[] {
  return [];
}

// 獲取所有圖片
export function getAllImages(): Record<string, HeritageImage[]> {
  return {};
}
