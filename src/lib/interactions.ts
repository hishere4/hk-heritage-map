// 用戶互動數據（localStorage 版本）

export interface Comment {
  id: string;
  heritageId: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Favorite {
  heritageId: string;
  addedAt: string;
}

// 獲取評論
export function getComments(heritageId: string): Comment[] {
  if (typeof window === 'undefined') return [];
  const key = `heritage_comments_${heritageId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// 添加評論
export function addComment(heritageId: string, userName: string, content: string, rating: number): Comment {
  const comments = getComments(heritageId);
  const newComment: Comment = {
    id: Date.now().toString(),
    heritageId,
    userName,
    content,
    rating,
    createdAt: new Date().toISOString()
  };
  
  const key = `heritage_comments_${heritageId}`;
  localStorage.setItem(key, JSON.stringify([newComment, ...comments]));
  return newComment;
}

// 獲取收藏列表
export function getFavorites(): Favorite[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('heritage_favorites');
  return data ? JSON.parse(data) : [];
}

// 檢查是否已收藏
export function isFavorite(heritageId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.heritageId === heritageId);
}

// 添加收藏
export function addFavorite(heritageId: string): void {
  const favorites = getFavorites();
  if (!isFavorite(heritageId)) {
    favorites.push({ heritageId, addedAt: new Date().toISOString() });
    localStorage.setItem('heritage_favorites', JSON.stringify(favorites));
  }
}

// 取消收藏
export function removeFavorite(heritageId: string): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f.heritageId !== heritageId);
  localStorage.setItem('heritage_favorites', JSON.stringify(filtered));
}

// 切換收藏狀態
export function toggleFavorite(heritageId: string): boolean {
  if (isFavorite(heritageId)) {
    removeFavorite(heritageId);
    return false;
  } else {
    addFavorite(heritageId);
    return true;
  }
}
