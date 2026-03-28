// HeritageHK - 移除假圖片，改用簡單設計
// 等待用戶提供真實圖片

export interface HeritageImage {
  url: string;
  caption: string;
}

// 暫無圖片 - 等待用戶提供
export const heritageImages: Record<string, HeritageImage[]> = {};

// 獲取圖片（暫時返回空陣列）
export function getHeritageImages(heritageName: string): HeritageImage[] {
  return [];
}

// 獲取所有圖片
export function getAllImages(): Record<string, HeritageImage[]> {
  return {};
}
