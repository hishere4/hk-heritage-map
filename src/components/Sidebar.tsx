'use client';

import { useEffect } from 'react';
import { HeritageItem, categoryLabels } from '@/lib/supabase';

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

export default function Sidebar({ item, onClose }: SidebarProps) {
  // 調試：輸出 item 數據
  useEffect(() => {
    if (item) {
      console.log('Sidebar item:', {
        name: item.name,
        hasHistory: !!item.history,
        historyLength: item.history?.length,
        hasCulturalSignificance: !!item.cultural_significance,
        tourAvailable: item.tour_available,
        workshopAvailable: item.workshop_available
      });
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

  return (
    <>
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

          {/* 圖片區域 - 用類別圖標同顏色做視覺設計 */}
          <div className="mb-4">
            <div 
              className={`relative w-full h-48 rounded-xl overflow-hidden ${category?.color || 'bg-gray-500'} bg-opacity-10 flex items-center justify-center`}
              style={{ backgroundColor: category?.color ? undefined : '#f3f4f6' }}
            >
              {/* 背景漸變 */}
              <div className={`absolute inset-0 opacity-20 ${category?.color || 'bg-gray-400'}`} 
                style={{ 
                  background: category?.color 
                    ? `linear-gradient(135deg, ${category.color.replace('bg-', '')}40, ${category.color.replace('bg-', '')}20)` 
                    : 'linear-gradient(135deg, #e5e7eb, #f3f4f6)'
                }}
              />
              
              {/* 主要圖標 */}
              <div className="relative z-10 text-center">
                <span className="text-6xl">{icon}</span>
                
                {/* 提示用戶可以添加圖片 */}
                <div className="mt-4 text-xs text-gray-500">
                  {category?.zh}
                </div>
              </div>
            </div>
          </div>

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

          {/* 歷史 - 強制顯示 */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">歷史</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.history || '暫無歷史資料'}
            </p>
          </div>

          {/* 文化意義 - 強制顯示 */}
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
    </>
  );
}
