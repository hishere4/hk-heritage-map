'use client';

import { useEffect, useState } from 'react';
import { HeritageItem, categoryLabels } from '@/lib/supabase';
import { getHeritageImages } from '@/data/heritageImages';

interface SidebarProps {
  item: HeritageItem | null;
  onClose: () => void;
}

const categoryIcons: Record<string, string> = {
  performing_arts: '🎭',
  crafts: '🔨',
  festivals: '🎊',
  oral_traditions: '🗣️',
  food_culture: '🍜',
  martial_arts: '🥋',
  folklore: '🏮',
};

// 輔助函數：獲取類別顏色
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    performing_arts: '#8b5cf6',
    crafts: '#d97706',
    festivals: '#ef4444',
    oral_traditions: '#3b82f6',
    food_culture: '#f97316',
    martial_arts: '#22c55e',
    folklore: '#14b8a6',
  };
  return colors[category] || '#6b7280';
}

export default function Sidebar({ item, onClose }: SidebarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (item) {
      console.log('Sidebar item:', {
        name: item.name,
        hasHistory: !!item.history,
        hasCulturalSignificance: !!item.cultural_significance,
      });
      setImageError(false);
    }
  }, [item]);

  if (!item) {
    return (
      <div className="w-full md:w-80 bg-white h-full flex flex-col border-l border-gray-100">
        <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🏛️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">探索非遺</h3>
          <p className="text-sm text-gray-500">點擊地圖標記查看詳情</p>
        </div>
      </div>
    );
  }

  const category = categoryLabels[item.category];
  const icon = categoryIcons[item.category];
  const images = getHeritageImages(item.name);
  const hasImage = images.length > 0 && !imageError;

  return (
    <div className="w-full md:w-96 bg-white h-full flex flex-col border-l border-gray-100 overflow-hidden">
      {/* 頭部 */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full text-white ${category.color}`}>
            {category.zh}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      {/* 內容 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 標題 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-0.5">{item.name}</h2>
          {item.name_en && (
            <p className="text-sm text-gray-500">{item.name_en}</p>
          )}
        </div>

        {/* 真實圖片或類別圖標 */}
        {hasImage ? (
          <div className="mb-4">
            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={images[0].url}
                alt={images[0].caption}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-xs">{images[0].caption}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <div 
              className="relative w-full h-48 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${getCategoryColor(item.category)}15, ${getCategoryColor(item.category)}05)` 
              }}
            >
              <div className="text-center">
                <span className="text-6xl">{icon}</span>
                <div className="mt-2 text-xs text-gray-500">{category.zh}</div>
              </div>
            </div>
          </div>
        )}

        {/* 列入年份 */}
        {item.recognition_year && (
          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-amber-600">🏆</span>
              <span className="text-sm text-amber-800">
                {item.recognition_year}年列入非遺
              </span>
            </div>
          </div>
        )}

        {/* 簡介 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">簡介</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* 歷史 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">歷史</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {item.history || '暫無歷史資料'}
          </p>
        </div>

        {/* 文化意義 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">文化意義</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {item.cultural_significance || '暫無文化意義資料'}
          </p>
        </div>

        {/* 服務標籤 */}
        <div className="flex flex-wrap gap-2 mb-5">
          {item.workshop_available && (
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-md text-xs font-medium">
              工作坊
            </span>
          )}
          {item.tour_available && (
            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-medium">
              導賞團
            </span>
          )}
        </div>

        {/* 按鈕 */}
        <div className="space-y-2">
          {item.tour_available && (
            <a
              href={`/tours?heritage=${item.id}`}
              className="block w-full py-2.5 bg-blue-500 text-white text-center rounded-lg text-sm font-medium hover:bg-blue-600"
            >
              🚶 預約導賞團
            </a>
          )}
          
          {item.workshop_available && (
            <a
              href={`/workshops?heritage=${item.id}`}
              className="block w-full py-2.5 bg-emerald-500 text-white text-center rounded-lg text-sm font-medium hover:bg-emerald-600"
            >
              🎨 預約工作坊
            </a>
          )}
          
          {item.wikipedia_url && (
            <a
              href={item.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2.5 bg-gray-100 text-gray-700 text-center rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              📖 維基百科
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
