import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// 類型定義
export interface Region {
  id: string;
  slug: string;
  name: string;
  name_en: string;
  center_lat: number;
  center_lng: number;
  zoom_level: number;
  is_active: boolean;
}

export interface HeritageImage {
  id: string;
  heritage_id: string;
  url: string;
  caption?: string;
  is_primary: boolean;
  source?: string;
  created_at: string;
}

export interface HeritageItem {
  id: string;
  region_id: string;
  name: string;
  name_en: string | null;
  category: 'performing_arts' | 'crafts' | 'festivals' | 'oral_traditions' | 'food_culture' | 'martial_arts' | 'folklore';
  description: string;
  description_en: string | null;
  
  // 新增欄位
  history?: string;
  cultural_significance?: string;
  recognition_year?: number;
  references?: { title: string; url: string }[];
  fun_facts?: string[];
  wikipedia_url?: string;
  official_website?: string;
  
  lat: number;
  lng: number;
  address: string | null;
  images: string[];
  video_url: string | null;
  workshop_available: boolean;
  tour_available: boolean;
  contact_email: string | null;
  website_url: string | null;
  is_published: boolean;
  
  // 關聯數據
  heritage_images?: HeritageImage[];
}

export const categoryLabels: Record<HeritageItem['category'], { zh: string; en: string; color: string }> = {
  performing_arts: { zh: '表演藝術', en: 'Performing Arts', color: 'bg-purple-500' },
  crafts: { zh: '工藝技術', en: 'Crafts', color: 'bg-amber-600' },
  festivals: { zh: '節慶活動', en: 'Festivals', color: 'bg-red-500' },
  oral_traditions: { zh: '口述傳統', en: 'Oral Traditions', color: 'bg-blue-500' },
  food_culture: { zh: '飲食文化', en: 'Food Culture', color: 'bg-orange-500' },
  martial_arts: { zh: '武術', en: 'Martial Arts', color: 'bg-green-600' },
  folklore: { zh: '民俗', en: 'Folklore', color: 'bg-teal-600' },
};

// 香港20項非遺清單（供參考）
export const HERITAGE_ITEMS_LIST = [
  { name: '粵劇', category: 'performing_arts', en: 'Cantonese Opera' },
  { name: '古琴藝術', category: 'performing_arts', en: 'Guqin Art' },
  { name: '南音', category: 'oral_traditions', en: 'Naamyam' },
  { name: '涼紮技藝', category: 'crafts', en: 'Paper Crafting' },
  { name: '港式奶茶製作技藝', category: 'food_culture', en: 'Hong Kong Style Milk Tea' },
  { name: '詠春拳', category: 'martial_arts', en: 'Wing Chun' },
  { name: '長洲太平清醮', category: 'festivals', en: 'Cheung Chau Bun Festival' },
  { name: '大澳端午遊涌', category: 'festivals', en: 'Tai O Dragon Boat Water Parade' },
  { name: '香港潮人盂蘭勝會', category: 'festivals', en: 'Hong Kong Yulan Festival' },
  { name: '大坑舞火龍', category: 'festivals', en: 'Tai Hang Fire Dragon Dance' },
  { name: '黃大仙信俗', category: 'folklore', en: 'Wong Tai Sin Belief' },
  { name: '天后誕', category: 'festivals', en: 'Tin Hau Festival' },
  { name: '中秋節—大坑舞火龍', category: 'festivals', en: 'Mid-Autumn Festival' },
  { name: '紥作技藝', category: 'crafts', en: 'Bamboo Theatre Crafting' },
  { name: '戲棚搭建技藝', category: 'crafts', en: 'Bamboo Theatre Construction' },
  { name: '跌打', category: 'folklore', en: 'Traditional Bone-setting' },
  { name: '廟宇建築', category: 'folklore', en: 'Traditional Temple Architecture' },
  { name: '中式長衫製作技藝', category: 'crafts', en: 'Cheongsam Making' },
  { name: '彩瓷', category: 'crafts', en: 'Famille Rose Porcelain' },
  { name: '涼船', category: 'crafts', en: 'Paper Boat Crafting' },
];
